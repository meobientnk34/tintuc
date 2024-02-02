"use strict";
const newsContainer = document.getElementById("news-container");
const pageNumber = document.getElementById("page-num");
const previousBtn = document.getElementById("btn-prev");
const nextBtn = document.getElementById("btn-next");
const newsContent = document.getElementById("content");

//Xử lý khi mới vào trang news
let dataRender;
let pageCurrent = 1;
let currentUser = JSON.parse(getFromStorage("currentUser"));
if (!currentUser) {
  alert("Bạn chưa đăng nhập, vui lòng đăng nhập rồi quay lại!");
  window.location.href = "../index.html";
} else {
  currentUser = parseUser(currentUser); //xử lý để lấy được phương thức của class User
  displayNews(); //Gọi hàm hiển thị tin tức
}

//Lấy giá trị newsPerPage từ localStorage
const dataSettings = JSON.parse(getFromStorage("dataSettings"));
let newsPerPage = dataSettings ? dataSettings.newsPerPage : 3;
//Hàm render data
const renderData = function (data) {
  //Render theo newsPerPage
  newsContainer.innerHTML = "";
  for (
    let i = newsPerPage * (pageCurrent - 1);
    i < newsPerPage * pageCurrent && i < data.length;
    i++
  ) {
    const html = `
				<div class="card flex-row flex-wrap">
					<div class="card mb-3" style="">
						<div class="row no-gutters">
							<div class="col-md-4">
								<img src="${data[i].urlToImage}"
									class="card-img"
									alt="${data[i].title}">
							</div>
							<div class="col-md-8">
								<div class="card-body">
									<h5 class="card-title">${data[i].title}</h5>
									<p class="card-text">${data[i].content}</p>
									<a href="${data[i].url}"
										class="btn btn-primary">View</a>
								</div>
							</div>
						</div>
					</div>
				</div>
`;
    newsContainer.insertAdjacentHTML("beforeend", html);
  }
};

//Hàm lấy dữ liệu từ fetch API rồi gọi hàm render

async function displayNews() {
  try {
    dataRender = await currentUser.getData();
    renderData(dataRender);
  } catch (error) {
    console.error(error);
  }
}

//Event click next
previousBtn.style.display = "none";
nextBtn.addEventListener("click", function () {
  pageCurrent += 1;
  pageNumber.textContent = pageCurrent;
  previousBtn.style.display = "block";
  displayNews();
  //Ẩn button Next
  if (pageCurrent === Math.floor(dataRender.length / newsPerPage) + 1) {
    nextBtn.style.display = "none";
  }
});

//Event click Previous
previousBtn.addEventListener("click", function () {
  pageCurrent -= 1;
  pageNumber.textContent = pageCurrent;
  nextBtn.style.display = "block";
  displayNews();
  //Ẩn button Previuos
  if (pageCurrent === 1) {
    previousBtn.style.display = "none";
  }
});
