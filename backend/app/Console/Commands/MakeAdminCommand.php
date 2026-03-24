<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class MakeAdminCommand extends Command
{
    protected $signature = 'make:admin';
    protected $description = 'Creates a default admin';

    public function handle()
    {
        $user = User::firstOrCreate(
            ['email' => 'admin@example.com'],
            [
                'first_name' => 'Admin',
                'last_name' => 'User',
                'password' => Hash::make('password123'),
                'role' => 'admin',
                'address' => '123 Admin Street, Paris',
                'cin' => 'AB123456',
                'phone' => '0600000000'
            ]
        );
        $user->role = 'admin';
        $user->password = Hash::make('password123'); // force password reset
        $user->save();
        $this->info('Admin created successfully.');
    }
}
