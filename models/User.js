"use strict";

//Chuyển từ Object  sang Class Instance
function parseUser(userData) {
  const user = new User(
    userData.firstName,
    userData.lastName,
    userData.username,
    userData.password
  );
  return user;
}

//Tạo Class User
class User {
  constructor(firstName, lastName, username, password) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.username = username;
    this.password = password;
  }

  //Hàm fetchAPI + xử lý data
  async getData(keyGet) {
    const dataSettings = JSON.parse(getFromStorage("dataSettings"))
      ? JSON.parse(getFromStorage("dataSettings"))
      : {
          newsPerPage: 3,
          category: "General",
        };
    const keySearch = JSON.parse(getFromStorage("keySearch"));
    const resNews = await fetch(
      keyGet === "search"
        ? `
https://newsapi.org/v2/everything?q="${keySearch}"&sortBy=relevancy&pageSize=30&At&apiKey=ca548d3fc9644e898493d91b0fc37f8e`
        : ` 
https://newsapi.org/v2/top-headlines?country=us&pageSize=30&category=${dataSettings.category}&apiKey=ca548d3fc9644e898493d91b0fc37f8e`
    );
    const data = await resNews.json();

    //Lọc lấy dữ liệu articles
    const dataArtices = data.articles.filter(
      (item) =>
        item.title !== null &&
        item.content !== null &&
        item.url !== null &&
        item.urlToImage !== null
    );
    return dataArtices;
  }
}

//Tạo class Task
class Task {
  constructor(task, owner, isDone) {
    this.task = task;
    this.owner = owner;
    this.isDone = isDone;
  }
}
