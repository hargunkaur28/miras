<?php

namespace Database\Seeders;

use App\Models\Department;
use App\Models\Employee;
use App\Models\InventoryItem;
use App\Models\StockMovement;
use App\Models\Supplier;
use App\Models\PurchaseOrder;
use App\Models\PurchaseOrderItem;
use App\Models\Customer;
use App\Models\SalesOrder;
use App\Models\SalesOrderItem;
use App\Models\FinanceEntry;
use App\Models\Invoice;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create a default business
        $business = \App\Models\Business::create([
            'name' => 'Default Industry Corp',
            'slug' => 'default-industry',
            'email' => 'info@defaultindustry.com',
        ]);

        // Create a second business for testing multi-tenancy
        $otherBusiness = \App\Models\Business::create([
            'name' => 'Second Factory Ltd',
            'slug' => 'second-factory',
            'email' => 'contact@secondfactory.com',
        ]);

        // Create super admin
        User::factory()->create([
            'name' => 'Super Admin',
            'email' => 'superadmin@example.com',
            'role' => 'super_admin',
            'business_id' => null, // Super admin is global
        ]);

        // Create admin user for first business
        User::factory()->create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
            'role' => 'admin',
            'business_id' => $business->id,
        ]);

        // Create test users for first business
        User::factory(3)->create([
            'business_id' => $business->id,
            'role' => 'user',
        ]);

        // Create admin for second business
        User::factory()->create([
            'name' => 'Other Admin',
            'email' => 'other@example.com',
            'role' => 'admin',
            'business_id' => $otherBusiness->id,
        ]);

        // Create departments
        $departments = Department::factory(5)->create(['business_id' => $business->id]);

        // Create employees
        Employee::factory(20)->create(['business_id' => $business->id]);

        // Create inventory items
        $inventory = InventoryItem::factory(30)->create(['business_id' => $business->id]);

        // Create stock movements
        foreach ($inventory->random(15) as $item) {
            StockMovement::factory(3)->create([
                'inventory_item_id' => $item->id,
                'business_id' => $business->id,
            ]);
        }

        // Create suppliers
        $suppliers = Supplier::factory(10)->create(['business_id' => $business->id]);

        // Create purchase orders
        $purchaseOrders = PurchaseOrder::factory(15)->create(['business_id' => $business->id]);

        // Create purchase order items
        foreach ($purchaseOrders as $po) {
            PurchaseOrderItem::factory(3)->create([
                'purchase_order_id' => $po->id,
                'business_id' => $business->id,
            ]);
        }

        // Create customers
        $customers = Customer::factory(20)->create(['business_id' => $business->id]);

        // Create sales orders
        $salesOrders = SalesOrder::factory(25)->create(['business_id' => $business->id]);

        // Create sales order items
        foreach ($salesOrders as $so) {
            SalesOrderItem::factory(3)->create([
                'sales_order_id' => $so->id,
                'business_id' => $business->id,
            ]);
        }

        // Create invoices
        foreach ($salesOrders->random(20) as $so) {
            Invoice::factory()->create([
                'sales_order_id' => $so->id,
                'business_id' => $business->id,
            ]);
        }

        // Create finance entries
        FinanceEntry::factory(50)->create(['business_id' => $business->id]);

        // Seed a few items for the other business to prove isolation
        Department::factory()->create(['business_id' => $otherBusiness->id, 'name' => 'Other Dept 1']);
        Department::factory()->create(['business_id' => $otherBusiness->id, 'name' => 'Other Dept 2']);
        InventoryItem::factory(5)->create(['business_id' => $otherBusiness->id]);
    }
}
