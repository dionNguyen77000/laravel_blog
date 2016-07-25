<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    public funtion categories()
    {
      return $this->belongsToMany('App\Category', 'posts_categories')
    }
}
