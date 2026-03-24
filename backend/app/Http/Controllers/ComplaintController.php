<?php

namespace App\Http\Controllers;

use App\Models\Complaint;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ComplaintController extends Controller
{
    public function index()
    {
        return Complaint::with('user')->latest()->get();
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'city' => 'required|string|max:255',
            'address' => 'required|string',
            'category' => 'required|string',
            'description' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('complaints', 'public');
        }

        $complaint = Complaint::create([
            'title' => $request->title,
            'city' => $request->city,
            'address' => $request->address,
            'category' => $request->category,
            'description' => $request->description,
            'image' => $imagePath,
            'user_id' => $request->user()->id,
            'status' => 'Pending',
        ]);

        return response()->json($complaint, 201);
    }

    public function show($id)
    {
        return Complaint::with('user')->findOrFail($id);
    }

    public function myComplaints(Request $request)
    {
        return Complaint::where('user_id', $request->user()->id)->latest()->get();
    }

    public function update(Request $request, $id)
    {
        $complaint = Complaint::findOrFail($id);

        if ($request->user()->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $request->validate([
            'status' => 'required|in:Pending,In Progress,Resolved',
        ]);

        $complaint->update(['status' => $request->status]);

        return response()->json($complaint);
    }

    public function destroy(Request $request, $id)
    {
        $complaint = Complaint::findOrFail($id);

        if ($request->user()->role !== 'admin' && $request->user()->id !== $complaint->user_id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        if ($complaint->image) {
            Storage::disk('public')->delete($complaint->image);
        }

        $complaint->delete();

        return response()->json(['message' => 'Complaint deleted']);
    }
}
