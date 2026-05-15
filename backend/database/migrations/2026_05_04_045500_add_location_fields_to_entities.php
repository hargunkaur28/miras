<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('customers', function (Blueprint $table) {
            if (!Schema::hasColumn('customers', 'contact_person')) {
                $table->string('contact_person')->nullable();
            }
            if (!Schema::hasColumn('customers', 'city')) {
                $table->string('city')->nullable();
            }
            if (!Schema::hasColumn('customers', 'state')) {
                $table->string('state')->nullable();
            }
            if (!Schema::hasColumn('customers', 'country')) {
                $table->string('country')->nullable();
            }
        });

        Schema::table('suppliers', function (Blueprint $table) {
            if (!Schema::hasColumn('suppliers', 'city')) {
                $table->string('city')->nullable();
            }
            if (!Schema::hasColumn('suppliers', 'state')) {
                $table->string('state')->nullable();
            }
            if (!Schema::hasColumn('suppliers', 'country')) {
                $table->string('country')->nullable();
            }
        });

        Schema::table('employees', function (Blueprint $table) {
            if (!Schema::hasColumn('employees', 'address')) {
                $table->text('address')->nullable();
            }
            if (!Schema::hasColumn('employees', 'city')) {
                $table->string('city')->nullable();
            }
            if (!Schema::hasColumn('employees', 'state')) {
                $table->string('state')->nullable();
            }
            if (!Schema::hasColumn('employees', 'country')) {
                $table->string('country')->nullable();
            }
        });
    }

    public function down(): void
    {
        Schema::table('customers', function (Blueprint $table) {
            $table->dropColumn(['contact_person', 'city', 'state', 'country']);
        });

        Schema::table('suppliers', function (Blueprint $table) {
            $table->dropColumn(['city', 'state', 'country']);
        });

        Schema::table('employees', function (Blueprint $table) {
            $table->dropColumn(['address', 'city', 'state', 'country']);
        });
    }
};
