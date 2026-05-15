<?php

namespace Database\Factories;

use App\Models\PurchaseOrderItem;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<PurchaseOrderItem>
 */
class PurchaseOrderItemFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'purchase_order_id' => \App\Models\PurchaseOrder::factory(),
            'inventory_item_id' => \App\Models\InventoryItem::factory(),
            'quantity' => $this->faker->numberBetween(5, 200),
            'unit_price' => $this->faker->randomFloat(2, 10, 500),
        ];
    }
}
