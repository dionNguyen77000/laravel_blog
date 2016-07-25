@extends('layouts.master')

@section('title')
  Blog index
@endsection

@section('content')
  <article class="blog-post">
      <h3>Post Title</h3>
      <span class="subtitle">Post author | Date</span>
      <p>Post Body</p>
      <a href="#">Read more</a>
  </article>
  <section class="pagination">
    Pagination
  </section>
@endsection
