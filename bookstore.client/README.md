# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
-http://localhost:5121/api/Book/books
-http://localhost:5121/api/book/adding
-http://localhost:5121/api/Book/book/{Id}
-http://localhost:5121/api/Book/deleting/{Id}
-http://localhost:5121/api/book/updating


-http://localhost:5121/api/Cart/{CartId}
-http://localhost:5121/api/Cart/{CartId}/adding/{ItemId}
-http://localhost:5121/api/cart/{CartId/updating/{ItemId}
-http://localhost:5121/api/cart/{CardId}/deleting/{ItemId}

test : 
curl -X POST http://localhost:5121/api/Auth/Customer/login ^
More?      -H "Content-Type: application/json" ^
More?      -d "{\"PhoneNumber\":\"0123456789\", \"Password\":\"123456\"}"

curl -X POST http://localhost:5121/api/Auth/Admin/login ^
More?      -H "Content-Type: application/json" ^
More?      -d "{\"UserName\":\"admin\", \"Password\":\"admin123\"}"

curl -X POST "http://localhost:5121/api/Auth/Customer/signup" 
-H "Content-Type: application/json"
-d "{\"firstName\":\"Son\",\"lastName\":\"Dang\",\"phoneNumber\":\"280925\",
\"password\":\"son\",\"address\":\"Ha Noi\",\"email\":\"dui@example.com\"}"

curl -X PATCH "http://localhost:5121/api/book/updating"
-H "Content-Type: application/json" 
-d "{\"id\":1,\"imageUrls\":[\"url1.jpg\",\"url2.jpg\"],\"name\":\"Sách mới\",\"isbn\":\"9781234567890\",
\"author\":\"Nguyễn Văn A\",\"publisher\":\"NXB Trẻ\",\"quantity\":100,\"salePrice\":90000,\"originalPrice\":120000,
\"pageNumber\":300,\"publishTime\":\"2024-05-01T00:00:00\",\"categoryId\":2,\"language\":\"Tiếng Việt\"}"

curl -X POST "http://localhost:5121/api/book/adding"
-H "Content-Type: application/json"
-d "{\"imageUrls\":[\"book1.jpg\",\"book2.jpg\"],\"name\":\"Lập trình C# nâng cao\",\"isbn\":\"9786041234567\",
\"author\":\"Nguyễn Văn A\",\"publisher\":\"NXB Trẻ\",\"quantity\":50,\"salePrice\":120000,\"originalPrice\":150000,
\"pageNumber\":350,\"publishTime\":\"2024-03-10T00:00:00\",\"categoryId\":3,\"language\":\"Tiếng Việt\"}"

curl -X POST http://localhost:5121/api/Cart/1/adding/2 ^
-H "Content-Type: application/json" ^
-d "{\"Id\":0,\"Quantity\":3}"

C:\Users\Admin>curl -X POST http://localhost:5121/api/Cart/1/adding/2 ^
More? -H "Content-Type: application/json" ^
More? -d "{\"Quantity\":3}"

C:\Users\Admin>curl -X Patch http://localhost:5121/api/Cart/1/updating/2 ^
More? -H "Content-Type: application/json" ^
More? -d "{\"Quantity\":3}"
{"success":true,"message":"Đã cập nhật"}

C:\Users\Admin>curl -X GET http://localhost:5121/api/Cart/1

C:\Users\Admin>curl -X DELETE http://localhost:5121/api/Cart/1/deleting/2

curl -X POST "http://localhost:5121/api/book/adding" ^
  -H "accept: */*" ^
  -H "Content-Type: multipart/form-data" ^
  -F "Name=Clean Code" ^
  -F "ISBN=9780132350884" ^
  -F "Author=Robert C. Martin" ^
  -F "Publisher=Pearson" ^
  -F "Quantity=10" ^
  -F "SalePrice=300000" ^
  -F "OriginalPrice=450000" ^
  -F "PageNumber=464" ^
  -F "PublishTime=2020-01-01" ^
  -F "CategoryId=1" ^
  -F "Language=English" ^
  -F "Images=@\"C:\Users\Admin\Downloads\Xác thực_m2.jpg\"" ^
  -F "Images=@\"C:\Users\Admin\Downloads\Thao tác với kq hoạt động _ m2.jpg\""

  C:\Users\Admin>curl -X PATCH "http://localhost:5121/api/book/updating/307" ^
  -H "accept: */*" ^
  -F "Name=Giáo trình Lập trình C#" -F "ISBN=12121567890" -F "Author=Nguyễn Văn A"^
  -F "Publisher=NXB Trẻ" ^
  -F "Quantity=50" -F "SalePrice=90000" ^
  -F "OriginalPrice=120000" ^
  -F "PageNumber=250" ^
  -F "PublishTime=2023-11-01T00:00:00" ^
  -F "CategoryId=2" ^
  -F "Language=Tiếng Việt" ^
  -F "ImageUrlsExit[]=http://localhost:5121/images/old1.jpg"^
  -F "ImageUrlsExit[]=http://localhost:5121/images/old2.jpg"^
  -F "Images=@\"C:\Users\Admin\Downloads\Xác thực_m2.jpg\""


  -http://localhost:5121/api/order/orders
  -http://localhost:5121/api/order/{UserId}
  -http://localhost:5121/api/order/Confirm/{OrderId}
  -http://localhost:5121/api/Order/Create/{CartId}

C:\Users\Admin>curl -X Patch http://localhost:5121/api/Order/Confirm/1
{"success":true,"message":"Đẫ xác nhận"}

C:\Users\Admin>curl -X GET http://localhost:5121/api/Order/orders
[{"ordersId":1,"fullName":"Sẹo đời","ordersStatus":"Pending","createTime":null,"toalPrice":180000,"booknames":["Sách mới","Giáo trình Lập trình C#"]}]

C:\Users\Admin>curl -X GET http://localhost:5121/api/Order/2
[{"ordersId":1,"ordersStatus":"Done","createTime":null,"fullName":" không","phone":" không","address":" không","email":" không","toalPrice":180000,"orderDetails":[
{"id":1,"imageLink":null,"name":"Sách mới","quantity":1,"totalPrice":90000},
{"id":5,"imageLink":null,"name":"Giáo trình Lập trình C#","quantity":1,"totalPrice":90000}]}]

C:\Users\Admin>curl -X POST "http://localhost:5121/api/Order/Create/1" ^ -H "Content-Type: application/json" ^
More? -d "{ \"FullName\": \"Nguyen Van A\", \"Phone\": \"0909123456\", \"Address\": \"123 Lê Lợi, Q1, TP.HCM\", \"Email\": \"nva@example.com\"}"
{"success":true,"message":"Đặt hàng thành công"}

C:\Users\Admin>curl -X GET http://localhost:5121/api/Order/2
[
  {
    "ordersId": 1,
    "ordersStatus": "Done",
    "createTime": null,
    "fullName": " không",
    "phone": " không",
    "address": " không",
    "email": " không",
    "toalPrice": 180000,
    "orderDetails": [
      {
        "id": 1,
        "imageLink": null,
        "name": "Sách mới",
        "quantity": 1,
        "totalPrice": 90000
      },
      {
        "id": 5,
        "imageLink": null,
        "name": "Giáo trình Lập trình C#",
        "quantity": 1,
        "totalPrice": 90000
      }
    ]
  },
  {
    "ordersId": 6,
    "ordersStatus": "Pending",
    "createTime": "2025-11-08T23:34:23.618618",
    "fullName": "Nguyen Van A",
    "phone": "0909123456",
    "address": "123 Lê Lợi, Q1, TP.HCM                                                                              ",
    "email": "nva@example.com                                   ",
    "toalPrice": 810000,
    "orderDetails": [
      {
        "id": 4,
        "imageLink": null,
        "name": "Rừng Na Uy",
        "quantity": 6,
        "totalPrice": 810000
      }
    ]
  }
]