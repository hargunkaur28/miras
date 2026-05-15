<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        $tables = [
            'departments',
            'employees',
            'inventory_items',
            'stock_movements',
            'suppliers',
            'purchase_orders',
            'purchase_order_items',
            'customers',
            'sales_orders',
            'sales_order_items',
            'finance_entries',
            'invoices',
        ];

        foreach ($tables as $tableName) {
            Schema::table($tableName, function (Blueprint $table) {
                $table->foreignId('business_id')->nullable()->constrained()->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        $tables = [
            'departments',
            'employees',
            'inventory_items',
            'stock_movements',
            'suppliers',
            'purchase_orders',
            'purchase_order_items',
            'customers',
            'sales_orders',
            'sales_order_items',
            'finance_entries',
            'invoices',
        ];

        foreach ($tables as $tableName) {
            Schema::table($tableName, function (Blueprint $table) {
                $table->dropForeign(['business_id']);
                $table->dropColumn('business_id');
            });
        }
    }
};
