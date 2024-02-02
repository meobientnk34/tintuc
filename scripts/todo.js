"use strict";

const inputTitle = document.getElementById("input-task");
const addBtn = document.getElementById("btn-add");
const todoList = document.getElementById("todo-list");
const deleteBtn = document.getElementsByClassName("close");
const listItems = todoList.getElementsByTagName("li");

//Lấy thông tin user login
let isLogin = false;
isLogin = JSON.parse(getFromStorage("isLogin"));

//Lấy dữ liệu todo Ar từ localStorage
let todoArr = JSON.parse(getFromStorage("todoArr")) || [];
// console.log("todoArr: ", todoArr);

//Lấy dữ liệu người dùng hiện tại
let currentUser = JSON.parse(getFromStorage("currentUser")) || {};
currentUser = parseUser(currentUser);

//Lọc arrTodo theo người dùng hiện tại
let todoCurrent;

function todoByUserCurrent() {
  if (todoArr) {
    todoCurrent = todoArr.filter((item) => item.owner === currentUser.username);
  }
  return todoCurrent;
}
//Hiển thị todo theo người dùng hiện tại
displayTodo(todoByUserCurrent());

//Validate add task
function validate(data) {
  let taskExits = false;
  todoCurrent.forEach((item) => {
    if (item.task === data.task) {
      taskExits = true;
    }
  });
  if (!isLogin) {
    alert("Bạn chưa đăng nhập. Hãy đăng nhập rồi quay lại!");
    window.location.href = "../index.html";
    return false;
  } else if (data.task === "") {
    alert("Vui lòng nhập thông tin task!");
    return false;
  } else if (taskExits) {
    alert("task đã tồn tại!");
    return false;
  } else {
    return true;
  }
}

//render task Todo
function displayTodo(arr) {
  todoList.innerHTML = "";
  arr.forEach((item) => {
    const html = `<li class="${item.isDone ? "checked" : ""}"> 
      ${item.task}
     <span class="close">×</span>
    </li>`;
    todoList.insertAdjacentHTML("beforeend", html);
  });

  //Toggle task
  for (let i = 0; i < listItems.length; i++) {
    listItems[i].addEventListener("click", function () {
      // console.log("clicked!");
      this.classList.toggle("checked");
      todoCurrent[i].isDone = !todoCurrent[i].isDone;
      saveToStorage("todoArr", JSON.stringify(todoArr));
    });
  }

  //Delete task
  for (let i = 0; i < deleteBtn.length; i++) {
    deleteBtn[i].addEventListener("click", function (event) {
      event.stopPropagation();
      if (confirm("Xác nhận delete task?")) {
        // console.log("clicked!");
        let task = todoCurrent[i].task;
        // console.log("task: ", task);
        if (task) {
          todoCurrent = todoCurrent.filter((item) => item.task !== task);
          console.log("todoCurrent: ", todoCurrent);
          displayTodo(todoCurrent);
        }
        todoArr = todoArr.filter(
          (item) => item.owner !== currentUser.username || item.task !== task
        );
        saveToStorage("todoArr", JSON.stringify(todoArr));
      }
    });
  }
}

//Event click add
addBtn.addEventListener("click", function () {
  const data = {
    task: inputTitle.value.trim(),
    owner: currentUser.username,
    isDone: false,
  };
  if (validate(data)) {
    alert("Thêm thành công!");
    let newTask = new Task(data.task, data.owner, data.isDone);
    todoArr.push(newTask);
    saveToStorage("todoArr", JSON.stringify(todoArr));
    inputTitle.value = "";
    displayTodo(todoByUserCurrent());
  }
});
