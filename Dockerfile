FROM php:8.2-apache

WORKDIR /app

# Set composer memory limit
ENV COMPOSER_MEMORY_LIMIT=-1
ENV COMPOSER_ALLOW_SUPERUSER=1

# Install required system packages
RUN apt-get update && apt-get install -y --no-install-recommends \
    git \
    curl \
    wget \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    libcurl4-openssl-dev \
    libssl-dev \
    pkg-config \
    gnupg \
    ca-certificates \
    && curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs \
    && rm -rf /var/lib/apt/lists/*

# Verify files are present during build
RUN ls -la /app && ls -la /app/public || true

# Install PHP extensions
RUN docker-php-ext-install \
    mbstring \
    exif \
    pcntl \
    bcmath

# Install MongoDB PHP extension
RUN pecl install mongodb && docker-php-ext-enable mongodb

# Enable Apache mod_rewrite
RUN a2enmod rewrite

# Configure Apache for Laravel
RUN cat > /etc/apache2/sites-available/000-default.conf <<'EOF'
<VirtualHost *:80>
    DocumentRoot /app/public
    ErrorLog ${APACHE_LOG_DIR}/error.log
    CustomLog ${APACHE_LOG_DIR}/access.log combined
    
    <Directory /app/public>
        Options Indexes FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>
</VirtualHost>
EOF

# Install Composer
COPY --from=composer:2.6 /usr/bin/composer /usr/bin/composer

# Copy only composer files first
COPY backend/composer.json backend/composer.lock ./

# Install PHP dependencies
RUN composer install --no-dev --no-scripts --no-autoloader --ignore-platform-req=ext-mongodb

# Install NPM dependencies and build assets
COPY backend/package.json backend/package-lock.json ./
RUN npm ci --include=dev --no-audit --no-fund
COPY backend/ .
RUN npm run build

# Verify build manifest exists before continuing
RUN if [ ! -f public/build/manifest.json ]; then echo "Vite build failed: manifest.json not found" && exit 1; fi

# Copy and make entrypoint executable
COPY backend/docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

# Create and secure Laravel directories BEFORE dump-autoload
RUN mkdir -p /app/bootstrap/cache \
             /app/storage/logs \
             /app/storage/app/public \
             /app/storage/framework/views \
             /app/storage/framework/sessions \
             /app/storage/framework/cache \
    && chmod -R 777 /app/bootstrap/cache /app/storage

# Run composer autoload (directory now writable)
RUN composer dump-autoload --optimize

# Force clear all caches inside the container (now that autoloader exists)
RUN php artisan config:clear && \
    php artisan route:clear && \
    php artisan view:clear

# Set final permissions for Apache (ensure www-data can traverse /app and read /app/public)
RUN chmod 755 /app && \
    chown -R www-data:www-data /app/storage /app/bootstrap/cache /app/public && \
    chmod -R 775 /app/storage /app/bootstrap/cache && \
    chmod -R 755 /app/public

# Expose port
EXPOSE 80

# Use entrypoint script to inject env vars and start Apache
ENTRYPOINT ["/usr/local/bin/docker-entrypoint.sh"]
