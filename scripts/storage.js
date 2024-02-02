"use strict";

//..luu data vao LocalStorage
function saveToStorage(key, value) {
  localStorage.setItem(key, value);
}

//..lay data tu LocalStorage
function getFromStorage(key) {
  return localStorage.getItem(key);
}
