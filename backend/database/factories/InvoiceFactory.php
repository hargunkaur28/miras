<?php

namespace Database\Factories;

use App\Models\Invoice;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Invoice>
 */
class InvoiceFactory extends Factory
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
            'invoice_number' => 'INV-' . $this->faker->unique()->numerify('######'),
            'issued_at' => $this->faker->dateTimeBetween('-3 months'),
            'due_at' => $this->faker->dateTimeBetween('now', '+30 days'),
            'paid' => $this->faker->boolean(30),
        ];
    }
}
