<?php

namespace Tests;

use Illuminate\Foundation\Testing\TestCase as BaseTestCase;
use Illuminate\Support\Facades\DB;

abstract class TestCase extends BaseTestCase
{
    protected function setUp(): void
    {
        parent::setUp();

        if (app()->environment('testing') && config('database.default') === 'mongodb') {
            foreach (['users', 'password_reset_tokens', 'cache', 'cache_locks'] as $collection) {
                DB::connection()->getCollection($collection)->deleteMany([]);
            }
        }
    }
}
