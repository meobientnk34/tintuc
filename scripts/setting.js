"use strict";

const inputNewsPerPage = document.getElementById("input-page-size");
const inputCategory = document.getElementById("input-category");
const SaveSettingsBtn = document.getElementById("btn-submit");

//Lấy thông tin user login
let isLogin = false;
isLogin = JSON.parse(getFromStorage("isLogin"));

//Validate input setting
function validate(data) {
  if (!isLogin) {
    alert("Bạn chưa đăng nhập, hãy đăng nhập rồi quay lại!");
    window.location.href = "../index.html";
  } else if (data.newsPerPage === "") {
    alert("Vui lòng nhập số bài mỗi trang!");
    return false;
  } else {
    return true;
  }
}

//Event input settings
SaveSettingsBtn.addEventListener("click", function () {
  const data = {
    newsPerPage: inputNewsPerPage.value,
    category: inputCategory.value,
  };
  console.log("data: ", data);
  if (validate(data)) {
    saveToStorage("dataSettings", JSON.stringify(data));
    alert("Setting succeed!");
    window.location.href = "news.html";
  }
});
