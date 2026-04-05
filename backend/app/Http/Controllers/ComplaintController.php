<?php

namespace App\Http\Controllers;

use App\Models\Complaint;
use App\Models\ComplaintHistory;
use App\Http\Resources\ComplaintResource;
use App\Mail\ComplaintSubmitted;
use App\Mail\ComplaintResolved;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Mail;

class ComplaintController extends Controller
{
    public function index()
    {
        return ComplaintResource::collection(Complaint::with(['user', 'history.user'])->latest()->get());
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'city' => 'required|string|max:255',
            'address' => 'required|string',
            'latitude' => 'nullable|numeric',
            'longitude' => 'nullable|numeric',
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
            'latitude' => $request->latitude,
            'longitude' => $request->longitude,
            'category' => $request->category,
            'description' => $request->description,
            'image' => $imagePath,
            'user_id' => $request->user()->id,
            'status' => 'Pending',
        ]);

        // Create initial history record
        ComplaintHistory::create([
            'complaint_id' => $complaint->id,
            'user_id' => $request->user()->id,
            'status' => 'Pending',
            'note' => 'Complaint submitted by citizen.',
        ]);

        // Send confirmation email
        Mail::to($request->user()->email)->send(new ComplaintSubmitted($complaint->load('user')));

        return new ComplaintResource($complaint->load(['user', 'history.user']));
    }

    public function show($id)
    {
        return new ComplaintResource(Complaint::with(['user', 'history.user'])->findOrFail($id));
    }

    public function myComplaints(Request $request)
    {
        return ComplaintResource::collection(Complaint::where('user_id', $request->user()->id)->latest()->get());
    }

    public function update(Request $request, $id)
    {
        $complaint = Complaint::findOrFail($id);

        if ($request->user()->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $request->validate([
            'status' => 'required|in:Pending,In Progress,Resolved',
            'internal_note' => 'nullable|string',
            'history_note' => 'nullable|string',
        ]);

        $oldStatus = $complaint->status;
        
        $complaint->update([
            'status' => $request->status,
            'internal_note' => $request->internal_note ?? $complaint->internal_note,
        ]);

        // Log history if status changed or note provided
        if ($oldStatus !== $request->status || $request->history_note) {
            ComplaintHistory::create([
                'complaint_id' => $complaint->id,
                'user_id' => $request->user()->id,
                'status' => $request->status,
                'note' => $request->history_note ?? "Status changed from {$oldStatus} to {$request->status}.",
            ]);
        }

        // Send resolution email if status changed to Resolved
        if ($oldStatus !== 'Resolved' && $request->status === 'Resolved') {
            Mail::to($complaint->user->email)->send(new ComplaintResolved($complaint->load('user')));
        }

        return new ComplaintResource($complaint->load(['user', 'history.user']));
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
