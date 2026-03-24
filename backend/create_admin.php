<?php
$user = App\Models\User::firstOrCreate(
    ['email' => 'admin@example.com'],
    [
        'first_name' => 'Admin',
        'last_name' => 'User',
        'password' => Hash::make('password123'),
        'role' => 'admin',
        'city' => 'Paris',
        'cin' => 'AB123456',
        'phone' => '0600000000'
    ]
);
$user->role = 'admin';
$user->save();
echo "Admin created: admin@example.com / password123\n";
