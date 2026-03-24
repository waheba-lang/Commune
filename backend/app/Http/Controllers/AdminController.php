<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Complaint;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    // Get stats
    public function stats()
    {
        return response()->json([
            'users_total' => User::count(),
            'users_admins' => User::where('role', 'admin')->count(),
            'complaints_total' => Complaint::count(),
            'complaints_pending' => Complaint::where('status', 'Pending')->count(),
            'complaints_progress' => Complaint::where('status', 'In Progress')->count(),
            'complaints_resolved' => Complaint::where('status', 'Resolved')->count(),
        ]);
    }

    // Get all users
    public function users()
    {
        return response()->json(User::all());
    }

    // Update user role etc
    public function updateUser(Request $request, $id)
    {
        $user = User::findOrFail($id);
        
        $request->validate([
            'role' => 'sometimes|in:user,admin',
        ]);

        if ($request->has('role')) {
            $user->role = $request->role;
        }
        
        $user->save();

        return response()->json($user);
    }

    // Delete user
    public function deleteUser($id)
    {
        $user = User::findOrFail($id);
        $user->delete();

        return response()->json(['message' => 'User deleted successfully']);
    }
}
