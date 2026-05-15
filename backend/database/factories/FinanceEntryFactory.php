<?php

namespace Database\Factories;

use App\Models\FinanceEntry;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<FinanceEntry>
 */
class FinanceEntryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'type' => $this->faker->randomElement(['income', 'expense']),
            'category' => $this->faker->randomElement(['Sales', 'Purchases', 'Utilities', 'Rent', 'Salaries', 'Equipment']),
            'amount' => $this->faker->randomFloat(2, 100, 10000),
            'description' => $this->faker->sentence(),
            'entry_date' => $this->faker->dateTimeBetween('-3 months'),
        ];
    }
}
