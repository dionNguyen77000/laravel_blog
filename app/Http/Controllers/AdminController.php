<?php

namespace App\Http\Controllers;
use App\Post;

use Illuminate\Http\Request;

use App\Http\Requests;

class AdminController extends Controller
{
    public function getIndex()
    {
      // Fetch Posts & messages
      $posts = Post::orderBy('created_at','desc')->take(3)->get();
      return view('admin.index',['posts'=> $posts]);
    }
}
