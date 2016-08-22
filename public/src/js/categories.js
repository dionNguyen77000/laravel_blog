
var createCatBtn = document.getElementsByClassName('btn')[0];
createCatBtn.addEventListener('click', createNewCategory);

// addEventListener for each edit button
var editSections = document.getElementsByClassName('edit');
var i;
for (i = 0; i < editSections.length; i++) {
    var editBtn = editSections[i].firstElementChild.firstElementChild.children[1].firstChild;
    editBtn.addEventListener('click',startEdit);
    var deleteBtn = editSections[i].firstElementChild.firstElementChild.children[2].firstChild;
    deleteBtn.addEventListener('click',startDelete);
}

/*
 // every 100 milisecond the function will fire
var docReady = setInterval(function () {
    if(document.readystate !== "complete"){
        return; // if the readystate is not complete, I will return and wait for the next interation when the function get fire
    }
    // If the readystate is comeplete
    clearInterval(docReady);// the interval will no longer fire the event
    document.getElementsByClassName('btn')[0].addEventListener('click', createNewCategory1); // getElementsByClassName('btn')[0] : get the 1st button in webpage
}, 100);*/

function createNewCategory(event){
    event.preventDefault();
    var name = event.target.previousElementSibling.value; //name of the category field - right before the button Create New Category
    // Do validation
    if (name.length ===0){
        alert("Please enter a valid category name");
        return;
    }
    ///admin/blog/category/create : route
    ajax("POST", "/admin/blog/category/create", "name=" + name, newCategoryCreated, [name]);
}

function newCategoryCreated(params, success, responseObj) {
    location.reload(); // refresh the page
}

function startEdit(event) {

    event.preventDefault();
    event.target.innerText = "Save"; //change the Edit Button to Save Button
    //event.path[2] go back 2 level --> get ul element
    // .children[0] get the 1st child --> get li element
    var li = event.path[2].children[0];

    li.children[0].value = event.path[4].previousElementSibling.children[0].innerText;
    li.style.display = "inline-block";
    setTimeout(function(){
        li.children[0].style.maxWidth = "110px";
    }, 10);
    event.target.removeEventListener('click', startEdit);
    event.target.addEventListener('click',saveEdit);
}

function saveEdit(event){
    event.preventDefault();
    var li = event.path[2].children[0];
    var categoryName = li.children[0].value;
    var categoryId = event.path[4].previousElementSibling.dataset['id'];
    if (categoryName.length === 0) {
        alert("Please enter a valid category name");
        return;
    }
    ajax("POST", "/admin/blog/categories/update", "name=" + categoryName + "&category_id=" + categoryId, endEdit, [event]);
}

function endEdit(params, success, responseObj) {
    var event = params[0];
    var newName = responseObj.new_name;
    if (success) {
        var newName = responseObj.new_name;
        var article = event.path[5];
        article.style.backgroundColor = "#afefac";
        setTimeout(function(){
           article.style.backgroundColor = "white";
        }, 900);

        article.firstElementChild.firstElementChild.innerHTML = newName;
    }
    event.target.innerText="Edit";
    var li = event.path[2].children[0];
    li.children[0].style.maxWidth = "0px";
    setTimeout(function(){
        li.style.display = "none";
    }, 300);
    event.target.removeEventListener('click', saveEdit);
    event.target.addEventListener('click',startEdit);
}


function startDelete(event){
    /*Open Modal to ask if user is sure -- */
    deleteCategory(event);
}

function deleteCategory(event){
    event.preventDefault();
    event.target.removeEventListener('click', startDelete);
    var categoryId = event.path[4].previousElementSibling.dataset['id'];
    //event.path[5] : to get the article element
    ajax("GET", "/admin/blog/category/" + categoryId + "/delete", null, categoryDeleted,[event.path[5]])
}

function categoryDeleted(params,success, responseObj){
    var article = params[0];
    if(success) {
        article.style.backgroundColor = "#ffc4be";
        setTimeout(function(){
           article.remove();
            location.reload();
        }, 300);
    }
}

function ajax(method, url, params, callbackFunction, callbackParams) {
    var http;
    if(window.XMLHttpRequest) {
      http = new XMLHttpRequest();
    } else {
      http = new ActiveXObject("Microsoft.XMLHTTP");
    }

    http.onreadystatechange = function(){
        if(http.readyState == XMLHttpRequest.DONE){
            if(http.status == 200){  //200 ok
                var obj = JSON.parse(http.responseText);
                callbackFunction(callbackParams, true, obj);
            } else if (http.status == 400){ //400 page not found
                alert("Category could not be saved. Please try again.");
                callbackFunction(callbackParams, false);
            }else {
                var obj = JSON.parse(http.responseText);
                if (obj.message){ //check the message of obj
                    alert(obj.message);
                } else {
                    alert ("Please check the name");
                }
            }
        }
    }
    // AJAX request http://www.w3schools.com/ajax/ajax_xmlhttprequest_send.asp
    http.open(method,baseUrl + url, true);
    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    http.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    http.send(params + "&_token=" + token);
}
