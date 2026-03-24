<?php

use Illuminate\Support\Facades\Route;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/setup-admin', function () {
    $user = User::firstOrCreate(
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
    
    // Ensure role is admin if the user already existed
    $user->role = 'admin';
    $user->save();

    return "Admin account created successfully! You can now log in with Email: admin@example.com and Password: password123";
});
