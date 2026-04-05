<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        \App\Models\User::updateOrCreate(
            ['email' => 'admin@oujda.ma'],
            [
                'first_name' => 'Admin',
                'last_name' => 'Municipalite',
                'cin' => 'ADMIN123',
                'phone' => '0600000000',
                'password' => \Illuminate\Support\Facades\Hash::make('admin123'),
                'address' => 'Oujda Mairie',
                'role' => 'admin',
            ]
        );
    }
}
