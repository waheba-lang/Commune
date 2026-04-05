<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Resources\NewsResource;
use App\Models\News;

class NewsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return NewsResource::collection(News::latest()->get());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string',
            'content' => 'required|string',
            'image' => 'nullable|string',
        ]);

        $news = News::create($request->all());

        return new NewsResource($news);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return new NewsResource(News::findOrFail($id));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        \App\Models\News::findOrFail($id)->delete();
        return response()->json(null, 204);
    }
}
