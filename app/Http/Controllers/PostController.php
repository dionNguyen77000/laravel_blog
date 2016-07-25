<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;

class PostController extends Controller
{
    public function getBlogIndex(){
      // Fetch Posts and Paginate
      return view('frontend.blog.index');
    }

    public function getsinglePost($post_id, $end = 'frontend'){
      //fetch the Post
      return view($end. 'blog.single');
    }
}
