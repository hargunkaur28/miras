<?php
// public/debug-server.php
error_reporting(E_ALL);
ini_set('display_errors', 1);

echo "<h1>MSIRMS Deep Diagnostic</h1>";
echo "PHP Version: " . PHP_VERSION . "<br>";
echo "Current User: " . get_current_user() . " (UID: " . getmyuid() . ")<br>";
echo "Document Root: " . $_SERVER['DOCUMENT_ROOT'] . "<br>";
echo "Real Path: " . realpath(__DIR__) . "<br>";
echo "<hr>";

echo "<h2>Full Public Directory Listing</h2>";
function listFiles($dir, $level = 0) {
    if (!is_dir($dir)) return;
    $files = scandir($dir);
    foreach ($files as $file) {
        if ($file === '.' || $file === '..') continue;
        $path = $dir . '/' . $file;
        $perms = substr(sprintf('%o', fileperms($path)), -4);
        $owner = posix_getpwuid(fileowner($path))['name'];
        echo str_repeat("&nbsp;&nbsp;", $level) . "- $file ($perms, $owner)" . (is_dir($path) ? " [DIR]" : "") . "<br>";
        if (is_dir($path) && $level < 3) {
            listFiles($path, $level + 1);
        }
    }
}
listFiles(realpath(__DIR__));

echo "<hr>";
echo "<h2>Environment Check</h2>";
echo "APP_ENV: " . getenv('APP_ENV') . "<br>";
echo "APP_URL: " . getenv('APP_URL') . "<br>";
echo "APP_KEY set: " . (getenv('APP_KEY') ? "✅ YES" : "❌ NO") . "<br>";
