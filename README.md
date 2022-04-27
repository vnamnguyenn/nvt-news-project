# Blog App sử dụng CSDL DynamoDB
Đây là dự án đầu tiên mình sử dụng cơ sở dữ liệu NoSQL của AWS (Amazone Web Service) nên có còn nhiều sai sót.

Giới thiệu chung về các công nghệ được sử dụng trong project:
* Giao diện người dùng: Sử dụng framework chính là [ReactJS](https://reactjs.org/), thư viện [Material UI](http://mui.com/)
* API: [NodeJS](https://nodejs.org/en/), [ExpressJS](https://expressjs.com/)
* Database: [DynamoDB](https://aws.amazon.com/vi/dynamodb/)
* Cloud AWS: [EC2](https://aws.amazon.com/vi/ec2/), [Route53](https://aws.amazon.com/vi/route53/),...

## Cấu trúc thư mục và file

    ├── admin                 # Phần quản trị hệ thống
    │   ├── public            # Development server file
    │   ├── src               # Chứa file code project
    |       ├── assets        # HTML, SASS file
    |       ├── components    # Chứa các component như: navigation bar, navbar, widget, chart,...
    |       ├── pages         # Các view cần hiển thị
    |       ├── redux         
    |       ├── routes        # Định tuyến đường đi của các page
    |       ├── App.js        
    |       ├── index.js
    |       ├── requestMethods.js Kết nối admin với api
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
    |   └── ...           # v.v.. 
    ├── client                # Phần quản trị hệ thống
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
    |       ├── requestMethods.js Kết nối client với api
    |       └── ...           # v.v.. 
    ├── docker                # Chứa file Database
    └── ...           # v.v.. 
    
## Hướng dẫn cài đặt và sử dụng
Yêu cầu:
* Cài đặt NodeJS nếu chưa có có thể tải [tại đây](https://nodejs.org/en/)
* Cài đặt [Docker](https://www.docker.com/products/docker-desktop/) để chạy DynamoDB Local, nếu bạn sử dụng DynamoDB AWS Console thì không cần phải cài Docker nữa
* Cài đặt phần mềm [NoSQL Workbench](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/workbench.settingup.html) để truy vấn dữ liệu DynamoDB, bạn có thể tham khảo tài liệu sử dụng [tại đây](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/workbench.html)
* Cài đặt [Visual Studio Code](https://code.visualstudio.com/) để soạn thảo và run source code.


 Để chạy các lệnh dưới đây chúng ta cần mở Terminal của Visual Studio Code bằng tổ hợp phím
 ```sh
ctrl + shift + `
```
<p align="center">
  <img align="center" src="https://i.imgur.com/5hYIdEr.png" alt="open terminal visual studio code"/>
</p>

Kết nối và khởi chạy Database với docker.
```sh
docker compose up
```
Đổi tên file .env.sample trong thư mục api
```sh
.env.sample -> .env
```

Đầu tiên để run source code phần API chúng ta cần thực hiện các lệnh dưới đây.
```sh
cd api
npm install
npm run server
```
Sau khi run source code thành công bạn có thể test API bằng trình duyệt hoặc phần mềm test API như [Postman](https://www.postman.com/downloads/) bằng cách dán đường dẫn sau [http://localhost:9000/](http://localhost:9000/)/đường_dẫn_của_bạn, chúng ta có thể tham khảo video test api với Postman [tại đây](https://youtu.be/E9XeiPn6ZWo)
<p align="center">
  <img align="center" src="https://i.imgur.com/rt9c7ra.png" alt="open terminal visual studio code"/>
</p>


Sau đó tiếp tục làm với phần Client để hiển thị dữ liệu từ API.
```sh
cd ..
cd client
npm install
npm start
```

Cuối dùng phần Admin cũng làm tương tự như Client.
```sh
cd ..
cd admin
npm install
npm start
```

## Giao diện người dùng
<div align="center">
  <p>Client:</p>
  <img align="center" src="https://i.imgur.com/Ns0QJFT.png" />
</div>

<div align="center">
  <p>Admin:</p>
  <img align="center" src="https://i.imgur.com/YYov5h4.png" />
</div>

## Demo sản phẩm
Video demo sản phẩm [https://youtu.be/gc82dTiQcj4](https://youtu.be/gc82dTiQcj4)
