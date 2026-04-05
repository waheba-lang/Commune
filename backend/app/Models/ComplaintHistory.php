<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ComplaintHistory extends Model
{
    protected $fillable = [
        'complaint_id',
        'user_id',
        'status',
        'note',
    ];

    public function complaint()
    {
        return $this->belongsTo(Complaint::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
