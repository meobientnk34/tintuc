"use strict";
const inputUsername = document.getElementById("input-username");
const inputPassword = document.getElementById("input-password");
const loginBtn = document.getElementById("btn-submit");

//Lấy dữ liệu từ localStorage
const KEY = "USER_ARRAY";
const userArr = JSON.parse(getFromStorage(KEY));
let currentUser = {};

//Validate Login
function validate(data) {
  let isLogin = true,
    userLogin = "";
  for (let key in data) {
    if (data[key] === null || data[key] === undefined || data[key] === "") {
      isLogin = false;
      alert("Vui lòng nhập đầy đủ thông tin!");
      return isLogin;
    }
  }
  //Check username
  if (userArr) {
    userLogin = userArr.filter((item) => {
      return item.username === data.username;
    });
  }

  if (userLogin.length === 0) {
    isLogin = false;
    alert("Username does not exist!");
  }
  //Check password
  else if (data.password !== userLogin[0].password) {
    isLogin = false;
    alert("Password is incorrect, please re-enter!!");
  } else {
    currentUser = userLogin[0];
    alert("Login succeed!");
  }
  return isLogin;
}

//Event click Login
loginBtn.addEventListener("click", function () {
  const dataLogin = {
    username: inputUsername.value.trim(),
    password: inputPassword.value.trim(),
  };
  if (validate(dataLogin)) {
    saveToStorage("currentUser", JSON.stringify(currentUser));
    saveToStorage("isLogin", true);
    window.location.href = "../index.html";
  }
});
