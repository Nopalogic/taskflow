<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Project extends Model
{
    use HasFactory, HasUuids, SoftDeletes;

    protected $table = 'projects';

    protected $fillable = [
        'user_id',
        'title',
        'description',
        'timeline_from',
        'timeline_to',
        'status',
        'priority',
        'archive',
        'note'
    ];

    protected $casts = [
        'timeline_from' => 'date',
        'timeline_to' => 'date',
        'archive' => 'boolean',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function tasks()
    {
        return $this->hasMany(Task::class);
    }
}
