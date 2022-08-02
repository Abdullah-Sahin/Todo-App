// -----------------------------------------  Choose necessary elements  ---------------------------------------------------------//
const form = document.querySelector("#form");
const todoInput = document.querySelector("#todoinput");
const filter = document.querySelector("#filter");
const todoList = document.querySelector("#todoList");
const clearButton = document.querySelector("#clearAll");

addEventListeners();
// ----------------------------------------- EventListeners  ---------------------------------------------------------//
function addEventListeners(){
    document.addEventListener("DOMContentLoaded", loadTodosToUI);
    form.addEventListener("submit", addTodo);
    todoList.addEventListener("click", deleteTodo);
    filter.addEventListener("keyup", filterTodos);
    clearButton.addEventListener("click", clearTodos);
    
}
// -----------------------------------------  Listener Functions  ---------------------------------------------------------//
function loadTodosToUI(){
    todos = getTodosFromStorage();
    todos.forEach(function(todo){
        addTodoToUI(todo);
    });
}

function addTodo(e){

    const toAdd = todoInput.value;

    if(toAdd.trim().length === 0){
        createAlert("danger", "Please type a todo!");
    }
    else{
        addTodoToUI(toAdd);
        addTodoToStorage(toAdd);
        createAlert("success", "Todo has successfully been added");
    }
    
    todoInput.value = "";
    e.preventDefault();
}

function addTodoToUI(toAdd){

    const listItem = document.createElement("li");
    listItem.className = "list-group-item d-flex justify-content-between";

    const deleteLink = document.createElement("a");
    deleteLink.id = "delete";
    deleteLink.href = "#";
    deleteLink.innerHTML = '<i class="fa-solid fa-trash-can"></i>';

    listItem.appendChild(document.createTextNode(toAdd));
    listItem.appendChild(deleteLink);
    todoList.appendChild(listItem);
}

function createAlert(type, message){
    const alert = document.createElement("div");
    alert.className = `alert alert-${type}`;
    alert.role = "alert";
    alert.appendChild(document.createTextNode(message));
    form.appendChild(alert);
    setTimeout(function(){
        alert.remove();
    }, 850)
    
}

function addTodoToStorage(toAdd){
    let todos = getTodosFromStorage();
    todos.push(toAdd);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodosFromStorage(){
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    return todos;  
}

function deleteTodo(e){
    if(e.target.parentElement.id === "delete"){
        const toDelete = e.target.parentElement.parentElement;
        toDelete.remove(toDelete);
        todos = getTodosFromStorage();
        todos.splice(todos.indexOf(toDelete.textContent), 1);
        localStorage.setItem("todos", JSON.stringify(todos));
    }
}

function filterTodos(e){
    const filterValue = e.target.value.trim().toLowerCase();
    const listItems = document.querySelectorAll("li");
    console.log(filterValue);
    listItems.forEach(function(item){
        const text = item.textContent.toLowerCase();
        if(text.indexOf(filterValue) === -1){
            item.className = "list-group-item d-none";
        }
        else{
            item.className = "list-group-item d-flex justify-content-between";
        }
    })

}

function clearTodos(){
    
    while(todoList.firstElementChild != null){
        todoList.firstElementChild.remove();
    }

    localStorage.removeItem("todos");
}



