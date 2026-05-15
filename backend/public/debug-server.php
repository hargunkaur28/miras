<?php
// public/debug-server.php
error_reporting(E_ALL);
ini_set('display_errors', 1);

echo "<h1>MSIRMS Basic PHP Check</h1>";
echo "PHP Version: " . PHP_VERSION . "<br>";
echo "Server Software: " . $_SERVER['SERVER_SOFTWARE'] . "<br>";
echo "Document Root: " . $_SERVER['DOCUMENT_ROOT'] . "<br>";
echo "Current Time: " . date('Y-m-d H:i:s') . "<br>";
echo "<hr>";

echo "<h2>Checking for Core Files</h2>";
$files = [
    '../.env' => 'Environment file',
    '../vendor/autoload.php' => 'Composer autoload',
    '../artisan' => 'Laravel artisan',
    'build/manifest.json' => 'Vite manifest'
];

foreach ($files as $path => $desc) {
    echo "$desc ($path): " . (file_exists($path) ? "✅ FOUND" : "❌ MISSING") . "<br>";
}
