<?php

namespace Database\Factories;

use App\Models\InventoryItem;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<InventoryItem>
 */
class InventoryItemFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->words(3, true),
            'sku' => $this->faker->unique()->ean13(),
            'category' => $this->faker->randomElement(['Raw Materials', 'Semi-finished', 'Finished Goods', 'Supplies']),
            'unit' => $this->faker->randomElement(['PCS', 'KG', 'LTR', 'BOX', 'PACK']),
            'quantity' => $this->faker->numberBetween(50, 1000),
            'reorder_level' => $this->faker->numberBetween(10, 50),
            'cost_price' => $this->faker->randomFloat(2, 10, 500),
            'sell_price' => $this->faker->randomFloat(2, 15, 750),
        ];
    }
}
