@extends('layouts.admin-master')

@section('styles')
  <link rel="stylesheet" href="{{URL::to('src/css/from.css')}}" type="text/css"/>
@endsection

@section('content')
  <div class="container">
      @include('includes.info-box')
      <form class="" action="" method="post">
        <div class="input-group">
          <label for="title">Title</label>
          <input type="text" name="title" id="title">
        </div>
        <div class="input-group">
          <label for="author">Author</label>
          <input type="text" name="author" id="author">
        </div>
        <div class="input-group">
          <label for="category_select">Add Categories</label>
          <select name="category_select" id="category_select">
              <!-- Loop to ouptut categories-->
              <option value="Dummy Category"> Dummy Category </option>
          </select>
          <button type="button" class="btn">Add Category</button>
          <div class="added-categories">
            <ul></ul>
          </div>
          <input type="hidden" name="categories" id="categories">
        </div>

        <div class="input-group">
          <label for="body">Body</label>
          <textarea name="body" id="body" rows="12"> </textarea>
        </div>
        <button type="submit" class="btn">Create Post</button>
      </form>
  </div>
@endsection
