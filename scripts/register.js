"use strict";

const inputFirstname = document.getElementById("input-firstname");
const inputLastname = document.getElementById("input-lastname");
const inputusername = document.getElementById("input-username");
const inputPassword = document.getElementById("input-password");
const inputPasswordConfirm = document.getElementById("input-password-confirm");
const registerBtn = document.getElementById("btn-submit");

//Lấy dữ liệu từ localStorage
const KEY = "USER_ARRAY";
const userArr = JSON.parse(getFromStorage(KEY)) || [];

//Hàm xác nhận điều kiện
function validate(data) {
    let isValidate = true;
    //Không có trường nào bị bỏ trống.
    for (let key in data) {
        if (data[key] === null || data[key] === undefined || data[key] === "") {
            isValidate = false;
            alert("Vui lòng nhập đầy đủ thông tin!");
            return isValidate;
        }
    }
    //Username không được trùng với Username của các người dùng trước đó.
    for (let i = 0; i < userArr.length; i++) {
        if (userArr[i].username === data.username) {
            isValidate = false;
            alert("Username đã có người dùng, vui lòng chọn username khác!");
            return isValidate;
        }
    }
    // userArr.forEach((item) => {
    //   if (item.username === data.username) {
    //     isValidate = false;
    //     alert("Username đã có người dùng, vui lòng chọn username khác!");
    //   }
    // });

    //Password phải có nhiều hơn 8 ký tự.
    if (data.password.length <= 8) {
        isValidate = false;
        alert("Mật khẩu phải có nhiều hơn 8 ký tự!");
        return isValidate;
    }
    //Password và Confirm Password phải giống nhau.
    if (data.password !== data.passwordConfirm) {
        isValidate = false;
        alert("Xác nhận mật khẩu không đúng, vui lòng nhập lại!");
    }
    return isValidate;
}

//Xóa input
function clearInput() {
    inputFirstname.value = "";
    inputLastname.value = "";
    inputusername.value = "";
    inputPassword.value = "";
    inputPasswordConfirm.value = "";
}

//Event click Register
registerBtn.addEventListener("click", function() {
    const data = {
        firstName: inputFirstname.value.trim(),
        lastName: inputLastname.value.trim(),
        username: inputusername.value.trim(),
        password: inputPassword.value.trim(),
        passwordConfirm: inputPasswordConfirm.value,
    };

    if (validate(data)) {
        let newUser = new User(
            data.firstName,
            data.lastName,
            data.username,
            data.password
        );
        console.log("newUser: ", newUser);
        userArr.push(newUser);
        saveToStorage(KEY, JSON.stringify(userArr));
        clearInput();
        alert("Register succeed!");
        window.location.href = "login.html";
    }
});