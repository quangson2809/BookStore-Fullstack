
1. vào sql server tạo db tên BookstoreDb         
2. vào connected service , tạo kết nôi với server localdb và database đã tạo
3.cài và update entity framework core tools.
chạy trên bash các lệnh:
    -dotnet add package Microsoft.EntityFrameworkCore
    -dotnet add package Microsoft.EntityFrameworkCore.SqlServer
    -dotnet add package Microsoft.EntityFrameworkCore.Tools
    -dotnet tool update --global dotnet-ef
4, build dự án:
    - dotnet build
5, tạo các bảng trong DB 
    - dotnet ef migrations add InitialCreate --project bookstore.Server --startup-project bookstore.Server
    - dotnet ef database update --project bookstore.Server --startup-project bookstore.Server -v
6, thêm các trường dữ liệu
    - dotnet build
    -  dotnet ef migrations add <action><entity><field>Column --project bookstore.Server --startup-project bookstore.Server
    - dotnet ef migrations remove(nếu sai)
    - dotnet ef database update --project bookstore.Server --startup-project bookstore.Server -v
