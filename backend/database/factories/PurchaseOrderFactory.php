<?php

namespace Database\Factories;

use App\Models\PurchaseOrder;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<PurchaseOrder>
 */
class PurchaseOrderFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'supplier_id' => \App\Models\Supplier::factory(),
            'status' => $this->faker->randomElement(['pending', 'confirmed', 'delivered', 'cancelled']),
            'total_amount' => $this->faker->randomFloat(2, 1000, 50000),
            'ordered_at' => $this->faker->dateTimeBetween('-6 months'),
        ];
    }
}
