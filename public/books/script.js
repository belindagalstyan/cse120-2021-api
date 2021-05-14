var requiredFields = [
 "fullname", "title", "author", "nofpages", "publisher", "date", "genre", 
]

var bookForm = {
  "project" : "Books",
  "owner" : "Belinda Galstyan",
  "fullname" : "",
  "title" : "",
  "author" : "",
  "colour" : "",
  "covertype" : "",
  "othercovervalue" : "",
  "nofpages" : "",
  "price" : "",
  "currency" : "",
  "language" : "",
  "otherlanguagevalue" : "",
  "orglanguage" : "",
  "otherorglanguagevalue" : "",
  "edition" : "",
  "dimensions" : "",
  "publisher" : "",
  "date" : "",
  "orgdate" : "",
  "genre" : "",
  "agerestr" : ""
}

function HandleFullnameChange() {
  bookForm.fullname = document.getElementById("fullname").value
}

function HandleTitleChange() {
  bookForm.title = document.getElementById("title").value
}

function HandleAuthorChange() {
  bookForm.author = document.getElementById("author").value
}

function HandleColourchange() {
  bookForm.colour = document.getElementById("colour").value
}

function HandleCovertypechange(e) {
  bookForm.covertype=e.target.value;
  if (bookForm.covertype!="other") {
    bookForm.othercovervalue="";
    document.getElementById("othercovertype").style.display="none";
  }
  else{
    document.getElementById("othercovertype").style.display="block";
  }
}

function HandleCovermaterialchange() {
  if (bookForm.covertype == "other") {
    bookForm.othercovervalue = document.getElementById("othercovertype").value;
    document.getElementById("othercovertype").style.display="block";
  }
}

function HandleNofpageschange() {
  bookForm.nofpages = document.getElementById("nofpages").value
}

function HandlePricechange() {
  bookForm.price = document.getElementById("price").value
}

function HandleCurrencyChange() {
  bookForm.currency = document.getElementById("currency").value
}

function Handlelanguagechange(e) {
  bookForm.language=e.target.value;
  if (bookForm.language!="other") {
    bookForm.otherlanguagevalue="";
    document.getElementById("otherlanguage").style.display="none";
  }
  else{
    document.getElementById("otherlanguage").style.display="block";
  }
}

function Handleotherlanguagechange() {
  if (bookForm.language == "other") {
    bookForm.otherlanguagevalue = document.getElementById("otherlanguage").value;
    document.getElementById("otherlanguage").style.display="block";
  }
}

function HandleOrglanguagechange(e) {
  bookForm.orglanguage=e.target.value;
  if (bookForm.orglanguage!="other") {
    bookForm.otherorglanguagevalue="";
    document.getElementById("otherorglanguage").style.display="none";
  }
  else{
    document.getElementById("otherorglanguage").style.display="block";
  }
}

function HandleOrglanguagetextchange() {
  if (bookForm.orglanguage == "other") {
    bookForm.otherorglanguagevalue = document.getElementById("otherorglanguage").value;
    document.getElementById("otherorglanguage").style.display="block";
  }
}

function HandleEditionChange() {
  bookForm.edition = document.getElementById("edition").value
}

function HandleDimensionsChange() {
  bookForm.dimensions = document.getElementById("dimensions").value
}

function HandlePublisherChange() {
  bookForm.publisher = document.getElementById("publisher").value
}

function HandleDatechange() {
  bookForm.date = document.getElementById("date").value
}

function HandleOrgdatechange() {
  bookForm.orgdate = document.getElementById("orgdate").value
}

function HandleGenreChange() {
  bookForm.genre = document.getElementById("genre").value
}

function HandleAgerestrchange() {
  bookForm.agerestr = document.getElementById("agerestr").value
}

function validateBookFormData() {
  var isFormValid = true;
  var keys = Object.keys(bookForm);
  keys.forEach(key => {
      if (requiredFields.indexOf(key) > -1 && bookForm[key] == "") { console.log(key, " is a required field, please add a value") 
      if(document.getElementById(key)) {
        document.getElementById(key).style.backgroundColor = "red"; 
        isFormValid = false;
      }
    }   
  })
  return isFormValid;
}

function SaveData(e) {
  if(validateBookFormData() == false) {
    	return;
  } else {
  console.log(bookForm);

  $.ajax({
    type: 'POST',
    url: "https://cse120-2021-api-belinda.herokuapp.com/data",
    data: bookForm,
    cache: false,
    dataType : 'json',
    success: function (data) {
      console.log("success");
      document.location="https://cse120-2021-api-belinda.herokuapp.com/books/thankyou.html";
    },
    error: function (xhr) {
      console.error("Error in post", xhr);
    },
    complete: function () {
      console.log("Complete");  
    }
  });
}


function complete () {
  console.log("Complete");  
}

function loadExistingData() {
	var existingData = [];
  $.ajax({
    type: 'GET',
    url: "https://cse120-2021-api-belinda.herokuapp.com/data",
    data: bookForm,
    cache: false,
    dataType : 'json',
    success: function (data) {
      console.log("success", data);
      existingData = data;
      displayData(existingData.data);
    },
    error: function (data) {
      console.error("Error in post");
    }
  });

}


/*

function displayData(existingData) {
  document.getElementById("existingData").innerHTML = "<ul>";
  for (var i = 0; i < existingData.length; i++) {
    currentBook = existingData[i];
    document.getElementById("existingData").innerHTML += "<li><i>" + currentBook.fullname + "</li> : <b>" + currentBook.title + "</b></li>";
  }
  document.getElementById("existingData").innerHTML += "</ul>"
  document.getElementById("existingData").innerHTML += "</ul>"
  var edit_button = document.createElement("button");
    edit_button.innerHTML = "Edit";
    edit_button.id = "edit_" + elem["fullname"];
    edit_button.className = "edit";
    edit_button.addEventListener("click", function(e){
      editData(e.target.id);
    }, false);
    item.appendChild(edit_button);

    var button = document.createElement("button");
    button.innerHTML = "Delete";
    button.id = elem["_id"];
    button.addEventListener("click", function(e){
      deleteData(e.target.id);
    }, false);
    item.appendChild(button);
    document.getElementById("existingData").appendChild(item);
}

function deleteData(id) {

  var r = confirm("Are you sure you want to delete the item with the following ID? " + id);
  if (r == true) {
    
  } else {
    return;
  }

  var tmp = {
    "id": id
  }

  $.ajax({
    type: 'POST',
    url: "https://cse120-2021-api.herokuapp.com/data/delete",
    data: tmp,
    cache: false,
    dataType : 'json',
    success: function (data) {
      console.log("success");
      document.getElementById("div" + id).style.display = "none";
    },
    error: function (xhr) {
      console.error("Error in post", xhr);
    },
    complete: function () {
      console.log("Complete");  
    }
  });
}


function displayData(data) {
  document.getElementById("dataContainer").innerHTML = "";
  data.forEach(elem => {
    var item = document.createElement("div");
    item.id = "div" + elem["_id"];
    item.className = "item";
    if (Object.keys(elem).length == 1) {
      var span = document.createElement("span");
      span.innerHTML = "<i>Empty Element with autogenerated ID: </i>" + elem["_id"];
      item.appendChild(span);
    }
    Object.keys(elem).forEach(key => {
      if (key != "_id") {
        var span = document.createElement("span");

        var b = document.createElement("b");
        b.innerHTML = key + ": ";
        span.appendChild(b);
        
        span.className = "item";
        if (elem[key]) {
          span.innerHTML += elem[key];
        } else {
          var span1 = document.createElement("span");
          span1.className = "undefined";
          span1.innerHTML = "N/A";
          span.appendChild(span1)
        }
        item.appendChild(span);

        var br = document.createElement("br");
        item.appendChild(br);
      }
    })
    var button = document.createElement("button");
    button.innerHTML = "Delete";
    button.id = elem["_id"];
    button.addEventListener("click", function(e){
      deleteData(e.target.id);
    }, false);
    item.appendChild(button);
    document.getElementById("dataContainer").appendChild(item);
  })
}

function displayData(data) {
  loadedData = data;
  document.getElementById("dataContainer").innerHTML = "";
  data.forEach(elem => {
    var item = document.createElement("div");
    item.id = "div" + elem["_id"];
    item.className = "item";
    if (Object.keys(elem).length == 1) {
        var span = document.createElement("span");
        span.innerHTML = "<i>Empty Element with autogenerated ID: </i>" + elem["_id"];
        item.appendChild(span);
    }
    Object.keys(elem).forEach(key => {
        if (key != "_id") {
            var span = document.createElement("span");

            var b = document.createElement("b");
            b.innerHTML = key + ": ";
            span.appendChild(b);
            
            span.className = "item";
            if (elem[key]) {
                span.innerHTML += elem[key];
            } else {
                var span1 = document.createElement("span");
                span1.className = "undefined";
                span1.innerHTML = "N/A";
                span.appendChild(span1)
            }
            item.appendChild(span);

            var br = document.createElement("br");
            item.appendChild(br);
        }
    })
    var edit_button = document.createElement("button");
    edit_button.innerHTML = "Edit";
    edit_button.id = "edit_" + elem["_id"];
    edit_button.className = "edit";
    edit_button.addEventListener("click", function(e){
        editData(e.target.id);
    }, false);
    item.appendChild(edit_button);

    var button = document.createElement("button");
    button.innerHTML = "Delete";
    button.id = elem["_id"];
    button.addEventListener("click", function(e){
        deleteData(e.target.id);
    }, false);
    item.appendChild(button);
    document.getElementById("dataContainer").appendChild(item);
  })
}



/* console.log("code works")

console.log(document)

console.log(document.getElementsByClassName("div-form"))

console.log(document.getElementById("author")) 

e.preventDefault();
*/
