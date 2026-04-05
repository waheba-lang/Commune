<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ComplaintResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'city' => $this->city,
            'address' => $this->address,
            'latitude' => (float) $this->latitude,
            'longitude' => (float) $this->longitude,
            'category' => $this->category,
            'description' => $this->description,
            'image' => $this->image,
            'image_url' => $this->image ? asset('storage/' . $this->image) : null,
            'status' => $this->status,
            'internal_note' => $this->internal_note,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'user' => [
                'id' => $this->user->id,
                'name' => $this->user->first_name . ' ' . $this->user->last_name,
                'phone' => $this->user->phone,
            ],
            'history' => $this->history->map(fn($h) => [
                'id' => $h->id,
                'status' => $h->status,
                'note' => $h->note,
                'created_at' => $h->created_at,
                'user_name' => $h->user->first_name . ' ' . $h->user->last_name,
            ]),
        ];
    }
}
