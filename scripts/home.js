"use strict";
//Selecting element
const loginModalContainer = document.getElementById("login-modal");
const mainContentContainer = document.getElementById("main-content");
const welcomeMsg = document.getElementById("welcome-message");
const btnLogout = document.getElementById("btn-logout");

//Lấy dữ liệu login
const currentUser = JSON.parse(getFromStorage("currentUser"));
let isLogin = JSON.parse(getFromStorage("isLogin"));

if (isLogin) {
  //Người dùng đã đăng nhập
  loginModalContainer.hidden = true;
  welcomeMsg.textContent = `Welcome ${currentUser.firstName}`;
} else {
  // Người dùng chưa đăng nhập
  mainContentContainer.hidden = true;
}
//Event Click Logout
btnLogout.addEventListener("click", function () {
  if (confirm("Are you sure logout?")) {
    localStorage.removeItem("currentUser");
    saveToStorage("isLogin", false);
    window.location.href = "pages/login.html";
  }
});

// Xóa currentUser khi tắt web
// window.addEventListener("beforeunload", function () {
//   localStorage.removeItem("currentUser");
// });

// Xoa du lieu localStorage
// localStorage.clear();
