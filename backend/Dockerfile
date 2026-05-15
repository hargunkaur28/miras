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
    && curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs \
    && rm -rf /var/lib/apt/lists/*

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
    
    <IfModule mod_rewrite.c>
        RewriteEngine On
        RewriteCond %{REQUEST_FILENAME} !-d
        RewriteCond %{REQUEST_FILENAME} !-f
        RewriteRule ^ /index.php [QSA,L]
    </IfModule>
</VirtualHost>
EOF

# Install Composer
COPY --from=composer:2.6 /usr/bin/composer /usr/bin/composer

# Copy only composer files first (for better caching)
COPY composer.json composer.lock ./

# Install PHP dependencies (ignore ext-mongodb version - 2.3.1 is backward-compatible)
RUN composer install --no-dev --no-scripts --no-autoloader --ignore-platform-req=ext-mongodb

# Install NPM dependencies and build assets
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build

# Copy and make entrypoint executable
COPY docker-entrypoint.sh /usr/local/bin/
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

# Set final permissions for Apache
RUN chown -R www-data:www-data /app && \
    chmod -R 755 /app && \
    chmod -R 775 /app/storage /app/bootstrap/cache

# Expose port
EXPOSE 80

# Use entrypoint script to inject env vars and start Apache
ENTRYPOINT ["/usr/local/bin/docker-entrypoint.sh"]
