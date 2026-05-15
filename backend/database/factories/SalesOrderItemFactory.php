<?php

namespace Database\Factories;

use App\Models\SalesOrderItem;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<SalesOrderItem>
 */
class SalesOrderItemFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'sales_order_id' => \App\Models\SalesOrder::factory(),
            'inventory_item_id' => \App\Models\InventoryItem::factory(),
            'quantity' => $this->faker->numberBetween(5, 200),
            'unit_price' => $this->faker->randomFloat(2, 15, 750),
        ];
    }
}
