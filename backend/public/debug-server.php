<?php
// public/debug-server.php
// Visit https://msirms-backend.onrender.com/debug-server.php to see this output.

error_reporting(E_ALL);
ini_set('display_errors', 1);

echo "<h1>MSIRMS Debug Info</h1>";

echo "<h2>1. Environment</h2>";
echo "APP_ENV: " . (getenv('APP_ENV') ?: 'not set') . "<br>";
echo "APP_KEY: " . (getenv('APP_KEY') ? 'SET (Length: ' . strlen(getenv('APP_KEY')) . ')' : 'NOT SET') . "<br>";
echo "APP_DEBUG: " . (getenv('APP_DEBUG') ?: 'not set') . "<br>";

echo "<h2>2. PHP Extensions</h2>";
echo "MongoDB Extension: " . (extension_loaded('mongodb') ? 'INSTALLED' : 'MISSING') . "<br>";

echo "<h2>3. Filesystem</h2>";
$paths = [
    '../storage' => 0775,
    '../bootstrap/cache' => 0775,
    '../public/build' => 0755,
    '../resources/views/app.blade.php' => 0644
];

foreach ($paths as $path => $perm) {
    echo "$path: " . (file_exists($path) ? 'EXISTS' : 'MISSING');
    if (file_exists($path)) {
        echo " (Writable: " . (is_writable($path) ? 'YES' : 'NO') . ")";
    }
    echo "<br>";
}

echo "<h2>4. Database</h2>";
try {
    require __DIR__.'/../vendor/autoload.php';
    $app = require_once __DIR__.'/../bootstrap/app.php';
    $kernel = $app->make(Illuminate\Contracts\Http\Kernel::class);
    
    echo "Attempting to connect to MongoDB...<br>";
    $connection = Illuminate\Support\Facades\DB::connection('mongodb');
    $connection->getPdo(); // This might fail for MongoDB but triggers connection logic
    echo "Connection logic executed.<br>";
    
    $databases = $connection->getMongoDB()->listDatabases();
    echo "Successfully connected to MongoDB! Databases found: " . count(iterator_to_array($databases)) . "<br>";
} catch (\Exception $e) {
    echo "ERROR: " . $e->getMessage() . "<br>";
    echo "Line: " . $e->getLine() . "<br>";
}
