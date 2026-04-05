<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Complaint extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'city',
        'address',
        'latitude',
        'longitude',
        'category',
        'description',
        'image',
        'status',
        'internal_note',
        'user_id',
    ];

    public function history()
    {
        return $this->hasMany(ComplaintHistory::class)->latest();
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
