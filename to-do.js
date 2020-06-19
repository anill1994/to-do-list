const input = document.querySelector("#addToList")
const form = document.querySelector("form")
const taskList = document.querySelector("#taskList")
const DeleteAll = document.querySelector("#deleteAll")
const filter = document.querySelector("#addFilter")

eventListeners();

function eventListeners(){
    form.addEventListener("submit",addItem)
    taskList.addEventListener("click",deleteItem)
    DeleteAll.addEventListener("click",DeleteAllItem)
    document.addEventListener("DOMContentLoaded",loadAll)
    filter.addEventListener("keyup",addFilter)
}


function getItemFromLS(){
    let todos;
    if(localStorage.getItem("todos")===null){
        todos = [];
    }else{
      todos = JSON.parse(localStorage.getItem("todos"))
    }
    return todos;
}

function addItemToLS(text){
    let todos = getItemFromLS();
    todos.push(text);
    localStorage.setItem("todos",JSON.stringify(todos));
}
function deleteFromLS(deletetodo){
    let todos = getItemFromLS();
    todos.forEach(function(todo,index){
        if(todo === deletetodo){
            todos.splice(index,1)
        }
    })
    localStorage.setItem("todos",JSON.stringify(todos));
}
function deleteAllItemFromLS(){
    let todos = getItemFromLS();
    todos = [];
    localStorage.setItem("todos",JSON.stringify(todos));
}
function addFilter(e){
   let filtered = e.target.value.toLowerCase()
   let listItems = document.querySelectorAll(".list-group-item")
   listItems.forEach(function(item){
      const text =  item.textContent.toLowerCase();
        if(text.indexOf(filtered) === -1){
            item.setAttribute("style","display:none !important")
        }else{
            item.setAttribute("style","display:block")
        }
   })
}

function loadAll(){
    let todos = getItemFromLS()
    todos.forEach(element => {
        createElement(element)
    });
}

function createElement(text){
//create li 
const li = document.createElement("li")
li.className = "list-group-item list-group-item-secondary"
li.appendChild(document.createTextNode(text))
//a
const a = document.createElement("a")
a.classList = "delete-item float-right"
a.innerHTML = "<i class='fad fa-comment-alt-times'></i>"
a.setAttribute("href","#")

    li.appendChild(a)
    taskList.appendChild(li)
}
function addItem(e){
    if(input.value==""){
        alert("Bir değer giriniz.")
    }else{
       let text = input.value;
        addItemToLS(text);
        createElement(text)
    }
    input.value = "";
    e.preventDefault()
}
function deleteItem(e){
  if( e.target.className ==  "fad fa-comment-alt-times"){
      e.target.parentElement.parentElement.remove();
      deleteFromLS(e.target.parentElement.parentElement.textContent)
  }
  e.preventDefault()
}
function DeleteAllItem(){
   while(taskList.firstElementChild != null){
       taskList.removeChild(taskList.firstElementChild)
   }
   deleteAllItemFromLS()
}

