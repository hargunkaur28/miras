#!/bin/bash
set -e

# Generate .env from environment variables at runtime
cat > /app/.env <<EOF
APP_NAME="${APP_NAME:-MSIRMS}"
APP_ENV="${APP_ENV:-production}"
APP_DEBUG="${APP_DEBUG:-false}"
APP_KEY="${APP_KEY}"
APP_URL="${APP_URL:-https://msirms-backend.onrender.com}"

DB_CONNECTION="${DB_CONNECTION:-mongodb}"
DB_CONNECTION_STRING="${DB_CONNECTION_STRING}"
DB_DATABASE="${DB_DATABASE:-msirms}"

CACHE_STORE=file
SESSION_DRIVER=cookie

MAIL_MAILER=log
MAIL_FROM_ADDRESS="${MAIL_FROM_ADDRESS:-noreply@example.com}"
MAIL_FROM_NAME="${APP_NAME}"

FRONTEND_URL="${FRONTEND_URL:-https://msirms-frontend.vercel.app}"
SANCTUM_STATEFUL_DOMAINS="${SANCTUM_STATEFUL_DOMAINS:-msirms-frontend.vercel.app}"
SESSION_DOMAIN="${SESSION_DOMAIN:-msirms-frontend.vercel.app}"
EOF

# Ensure permissions are correct
chown www-data:www-data /app/.env
chmod 644 /app/.env

# Clear Laravel caches (now that .env is set up)
php artisan config:cache --quiet || true
php artisan view:cache --quiet || true

# Start Apache
exec apache2-foreground
