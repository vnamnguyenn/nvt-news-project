<div id="top"></div>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/othneildrew/Best-README-Template">
    <img src="https://i.imgur.com/7X7BdRx.png" alt="Logo" width="80" height="80">
  </a>
  <h3 align="center">DynamoDB Blog App</h3>
  <p align="center">
    <a href="https://www.youtube.com/watch?v=2U7DpiqdBRo">Video Demo</a>
    ·
    <a href="https://github.com/othneildrew/Best-README-Template/issues">Live Demo</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">Giới thiệu chung</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
        <li><a href="#cấu-truc-thu-muc">Cấu trúc thư mục</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Hướng dẫn cài đặt</a></li>
      </ul>
    </li>
    <li><a href="#fix-bug">Fix Bug</a></li>
    <li><a href="#usage">Tài liệu tham khảo</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

<div align="center">
  <img align="center" src="https://i.imgur.com/aIFrtDV.png" />
</div>


### Built With

Dưới đây là các framework/library và các phần mềm được sự dụng trong project này.
* [NoSQL Workbench](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/workbench.settingup.html)
* [Node.js](https://nodejs.org/en/)
* [Node.js](https://nodejs.org/en/)
* [React.js](https://reactjs.org/)
* [Express.js](https://expressjs.com/)
* [MaterialUI](https://mui.com/material-ui/)

### Cấu trúc thư mục

    ├── admin                 # Quản trị hệ thống
    │   ├── public            # Development server file
    │   ├── src               # Chứa file code project
    |       ├── assets        # HTML, SASS file
    |       ├── components    # Chứa các component như: navigation bar, navbar, widget, chart,...
    |       ├── pages         # Các view cần hiển thị
    |       ├── redux
    |       ├── routes        # Định tuyến đường đi của các page
    |       ├── App.js
    |       ├── index.js
    |       ├── requestMethods.js # Tạo fileKết nối admin với api
    ├── api                   # Truy vấn cơ sở dữ liệu
    │   ├── config            # file cấu hình kết nối database
    │   ├── middleware        # Xác thực các quyền sau khi người dùng đăng nhập như: Được truy cập phần quản trị, cho phép tạo bài viết, xoá, chỉnh sửa
    │   ├── modules           # chưa các file truy vấn đến cơ sở dữ liệu, để truy vấn dữ được chia làm 3 phần
    |       ├── ...Controller # Quản lý request/response API.
    |       ├── ...Repository # Quản lý database (manages database operations.)
    |       ├── ...Service    # Manages business logic like manipulation data, validation, etc.
    │   ├── routes            # Định tuyến đường đi API
    │   ├── .env.sample       # file dùng để điền các client, access key, endpoint,...
    │   ├── index.js          # file run source source code
    |   └── ...           
    ├── client                # Người dùng
    │   ├── public            # Development server file
    │   ├── src               # Chứa file code project
    |       ├── assets        # HTML, SASS file
    |       ├── components    # Chứa các component như: navigation bar, navbar, widget, chart,...
    |       ├── layout        # Header, Footer layout
    |       ├── pages         # Các view cần hiển thị
    |       ├── redux
    |       ├── routes        # Định tuyến đường đi của các page
    |       ├── App.js
    |       ├── index.js
    |       ├── requestMethods.js # Tạo file Kết nối client đến api
    |       └── ...          
    ├── docker                # Run database với docker
    ├── dynamodb              # Run database local
    └── ... 

<p align="right">(<a href="#top">back to top</a>)</p>


<!-- GETTING STARTED -->
## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Những thứ cần cài đặt để chạy blog app / Prerequisites

This is an example of how to list things you need to use the software and how to install them.
* NPM & Nodejs
  ```sh
  https://nodejs.org/en/download/
  ```
* Visual Studio Code
  ```sh
  https://code.visualstudio.com/download
  ```
* JDK (Cài đặt nếu bạn muốn sử dụng DynamoDB Local)
  ```sh
  https://www.oracle.com/java/technologies/downloads/
   ```
* Docker (Cài đặt nếu bạn muốn chạy DynamoDB trên Docker)
  ```sh
  https://www.docker.com/products/docker-desktop/
   ```


### Cài đặt / Installation
Video hướng dẫn tải và cài đặt, xem chi tiết [tại đây](https://www.youtube.com/watch?v=2U7DpiqdBRo)
1. Clone the repo
   ```sh
   git clone https://github.com/vnamnguyenn/nvt-news-project.git
   ```
2. Tại thư mục API chúng ta đổi tên file `.env.sample` -> `.env`, xem chi tiết hướng dẫn [tại đây](https://youtu.be/2U7DpiqdBRo?t=279)
   ```js
   AWS_ACCESS_KEY_ID= 'ENTER YOUR ACCESS KEY ID'
   AWS_SECRET_ACCESS_KEY= 'ENTER YOUR SECRET KEY'
   AWS_DEFAULT_REGION = 'ENTER YOUR REGION'
   AWS_END_POINT_DDB_CONSOLE = 'ENTER YOUR ENPOINT'
   ```
3. Cài đặt các package trong thư mục API
   ```sh
   cd api
   npm install
   npm start
   ```  
4. Cài đặt các package trong thư mục Client
   ```sh
   cd ..
   cd client
   npm install
   npm start
   ```  
5. Cài đặt các package trong thư mục Admin
   ```sh
   cd ..
   cd admin
   npm install
   npm start
   ```  
6. Chạy lệnh này nếu bạn sử dụng DynamoDB                       
   ```sh
   java -Djava.library.path=./DynamoDBLocal_lib -jar DynamoDBLocal.jar -sharedDb
   ```

<p align="right">(<a href="#top">back to top</a>)</p>


<!-- USAGE EXAMPLES -->
## Fix Bug

Nếu bạn chạy thành công nhưng ứng dụng không hiển thị nội dung (nguyên do là bạn chưa tạo table và import data)
1. Mở trang admin tại                            
   ```sh
   http://localhost:3005/signin
   ```                         
2. Lúc này trang admin xuất hiện 2 button, bạn hãy bấm theo thứ tự 1.Create Table và 2. Import Data
<div align="center">
  <img align="center" src="https://i.imgur.com/A9c2t5R.png" />
</div>                                                           

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->
## Tài liệu tham khảo
* [NoSQL Workbench for DynamoDB](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/workbench.settingup.html)
* [Singgle Table DynamoDB](https://www.alexdebrie.com/posts/dynamodb-single-table/)
* [DynamoDB](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Introduction.html)
* [CRUD Mern Stack](https://www.youtube.com/watch?v=y66RgYMAgSo)
* [User HTML template](https://github.com/jlop007/FreeCodeCamp-NewsFlash)

<p align="right">(<a href="#top">back to top</a>)</p>



