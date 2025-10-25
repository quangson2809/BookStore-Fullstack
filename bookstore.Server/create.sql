-- Dữ liệu mẫu cho bảng Role
SET IDENTITY_INSERT [Role] ON;
INSERT INTO Role (Role_id, Role_Name) VALUES (1, 'Admin');
INSERT INTO Role (Role_id, Role_Name) VALUES (2, 'Customer');
SET IDENTITY_INSERT [Role] OFF;

-- Dữ liệu mẫu cho bảng User
-- Chèn tài khoản Admin
SET IDENTITY_INSERT [User] ON;

INSERT INTO [User] (User_id, First_Name, Last_Name, PasswordHash, Email, Phone, Create_Time, Address, Role_id)
VALUES (
    1,
    N'admin',
    N'system',
    'admin123', -- Mật khẩu nên được hash trong thực tế
    'admin@bookstore.com',
    '0901234567',
    GETDATE(),
    N'123 Đường Quản Lý, Hà Nội',
    1 -- Role_id = Admin
);

-- Chèn tài khoản Customer (Khách hàng)
INSERT INTO [User] (User_id, First_Name, Last_Name, PasswordHash, Email, Phone, Create_Time, Address, Role_id)
VALUES (
    2,
    N'Sẹo đời',
    N'',
    '123456', -- Mật khẩu nên được hash trong thực tế
    'customerA@bookstore.com',
    '0123456789',
    GETDATE(),
    N'456 Phố Mua Sắm, TP.HCM',
    2 -- Role_id = Customer
);
SET IDENTITY_INSERT [User] off;

SET IDENTITY_INSERT [Category] on;
INSERT INTO Category (Category_id, Category_Name) VALUES (1, N'Khoa học');
INSERT INTO Category (Category_id, Category_Name) VALUES (2, N'Văn học');
INSERT INTO Category (Category_id, Category_Name) VALUES (3, N'Lập trình');
SET IDENTITY_INSERT [Category] off;

SET IDENTITY_INSERT [Book] on;
INSERT INTO Book ( Book_Name, Original_price, Sale_price, Stock_Quantity, Publish_Time, ISBN, Language, Page_number, Category_id)
VALUES
( N'Sự Sống 3.0', 300000, 270000,  50, GETDATE(), '978-604-941-792-5', N'Tiếng Việt', 450, 1),
(N'Vũ Trụ Trong Vỏ Hạt Dẻ', 250000, 225000,  30, GETDATE(), '978-055-380-539-7', N'Tiếng Anh', 280, 1),
(N'Nhà Giả Kim', 120000, 108000,  100, GETDATE(), '978-604-585-177-8', N'Tiếng Việt', 240, 2),
( N'Rừng Na Uy', 150000, 135000,  75, GETDATE(), '978-009-944-898-2', N'Tiếng Anh', 400, 2),
(N'Code Complete', 800000, 750000, 20, GETDATE(), '978-073-561-967-8', N'Tiếng Anh', 960, 3),
( N'Clean Code', 650000, 600000,  40, GETDATE(), '978-013-235-088-4', N'Tiếng Anh', 464, 3),
(N'Lược Sử Loài Người', 280000, 252000,  60, GETDATE(), '978-604-561-267-8', N'Tiếng Việt', 500, 1),
( N'Đắc Nhân Tâm', 99000, 89000,  120, GETDATE(), '978-604-001-234-5', N'Tiếng Việt', 300, 2),
( N'Design Patterns', 700000, 650000,  15, GETDATE(), '978-020-163-361-0', N'Tiếng Anh', 395, 3),
( N'Bắt Đầu Với SQL Server', 450000, 400000,  35, GETDATE(), '978-604-888-999-0', N'Tiếng Việt', 320, 3);
SET IDENTITY_INSERT [Book] off;

INSERT INTO Cart ( User_id) VALUES ( 2);
INSERT INTO CartDetail (Cart_id, Book_id, Quantity, Total_amount)
VALUES
(1, 3, 2, 2 * 108000), -- 2 cuốn Nhà Giả Kim
(1, 4, 1, 1 * 135000);  -- 1 cuốn Rừng Na Uy

INSERT INTO Orders ( User_id)
VALUES (
    -- Trạng thái đơn hàng
    2
  
);

INSERT INTO OrdersDetail (Order_id, Book_id, Quantity, Total_Price, Create_Time)
VALUES
(1, 1, 1, 270000, GETDATE()), -- Mua 1 cuốn Sách 1 (Sự Sống 3.0)
(1, 5, 1, 750000, GETDATE()); -- Mua 1 cuốn Sách 5 (Code Complete)