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
    libpq-dev \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    && rm -rf /var/lib/apt/lists/*

# Install PHP extensions
RUN docker-php-ext-install \
    pdo \
    pdo_pgsql \
    mbstring \
    exif \
    pcntl \
    bcmath

# Enable Apache mod_rewrite
RUN a2enmod rewrite

# Configure Apache for Laravel
RUN cat > /etc/apache2/sites-available/000-default.conf <<'EOF'
<VirtualHost *:80>
    DocumentRoot /app/public
    <Directory /app/public>
        Options Indexes FollowSymLinks
        AllowOverride All
        Require all granted
        <IfModule mod_rewrite.c>
            RewriteEngine On
            RewriteCond %{REQUEST_FILENAME} !-d
            RewriteCond %{REQUEST_FILENAME} !-f
            RewriteRule ^ index.php [QSA,L]
        </IfModule>
    </Directory>
    <FilesMatch \.php$>
        SetHandler "proxy:unix:/run/php-fpm.sock|fcgi://localhost"
    </FilesMatch>
</VirtualHost>
EOF

# Install Composer
COPY --from=composer:2.6 /usr/bin/composer /usr/bin/composer

# Copy only composer files first (for better caching)
COPY composer.json composer.lock ./

# Install PHP dependencies
RUN composer install --no-dev --no-scripts --no-autoloader

# Copy the rest of the application
COPY . .

# Create and secure Laravel directories BEFORE dump-autoload
RUN mkdir -p /app/bootstrap/cache /app/storage/logs /app/storage/app && \
    chmod -R 777 /app/bootstrap/cache /app/storage

# Run composer autoload (directory now writable)
RUN composer dump-autoload --optimize

# Set final permissions for Apache
RUN chown -R www-data:www-data /app && \
    chmod -R 755 /app && \
    chmod -R 775 /app/storage /app/bootstrap/cache

# Expose port
EXPOSE 80

# Start Apache
CMD ["apache2-foreground"]

# Run Laravel development server
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]
