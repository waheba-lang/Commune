<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class DocumentRequestController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        return response()->json($request->user()->documentRequests()->latest()->get());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'type' => 'required|string',
            'notes' => 'nullable|string',
        ]);

        $docRequest = $request->user()->documentRequests()->create([
            'type' => $request->type,
            'notes' => $request->notes,
            'status' => 'pending',
        ]);

        return response()->json($docRequest, 201);
    }

    public function adminIndex()
    {
        return response()->json(\App\Models\DocumentRequest::with('user')->latest()->get());
    }

    public function update(Request $request, string $id)
    {
        $request->validate(['status' => 'required|in:pending,approved,rejected']);
        $docRequest = \App\Models\DocumentRequest::findOrFail($id);
        $docRequest->update(['status' => $request->status]);
        return response()->json($docRequest);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
