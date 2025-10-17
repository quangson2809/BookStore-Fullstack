
------------------------------------------------------------
-- 2️⃣ XÓA TOÀN BỘ DỮ LIỆU
------------------------------------------------------------
DELETE FROM Book;
DELETE FROM Author;
DELETE FROM Publisher;
DELETE FROM Category;

------------------------------------------------------------
-- 3️⃣ RESET IDENTITY (ĐẢM BẢO ID CHẠY LẠI TỪ 1)
------------------------------------------------------------
DBCC CHECKIDENT ('Category', RESEED, 0);
DBCC CHECKIDENT ('Publisher', RESEED, 0);
DBCC CHECKIDENT ('Author', RESEED, 0);
DBCC CHECKIDENT ('Book', RESEED, 0);

------------------------------------------------------------
------------------------------------------------------------
-- 5️⃣ INSERT DỮ LIỆU CATEGORY
------------------------------------------------------------
INSERT INTO Category (Category_Name)
VALUES
('Văn học'),
('Trinh thám - Huyền bí'),
('Phát triển bản thân'),
('Kinh tế - Kỹ năng sống'),
('Fantasy'),
('Tiểu thuyết lãng mạn'),
('Tâm lý học'),
('Thiếu nhi'),
('Khoa học - Tri thức'),
('Lịch sử - Văn hóa');

------------------------------------------------------------
-- 6️⃣ INSERT DỮ LIỆU PUBLISHER
------------------------------------------------------------

INSERT INTO Publisher (Publisher_Name)
VALUES
('Bloomsbury Publishing'),
('HarperCollins'),
('Doubleday'),
('HarperOne'),
('Penguin Random House'),
('NXB Trẻ'),
('NXB Tổng Hợp TP.HCM'),
('NXB Kim Đồng'),
('NXB Lao Động'),
('NXB Văn Học');

------------------------------------------------------------
-- 7️⃣ INSERT DỮ LIỆU AUTHOR
------------------------------------------------------------
INSERT INTO Author (Author_Name)
VALUES
('J.K. Rowling'),
('J.R.R. Tolkien'),
('Dan Brown'),
('Paulo Coelho'),
('James Clear'),
('Nguyễn Nhật Ánh'),
('Dale Carnegie'),
('Rosie Nguyễn'),
('Tony Buổi Sáng'),
('Nguyễn Phong Việt');

------------------------------------------------------------
-- 8️⃣ INSERT DỮ LIỆU BOOK
------------------------------------------------------------
INSERT INTO Book 
(Book_Name, Original_price, Sale_price, Book_Status, Publish_Time, Stock_Quantity, ISBN, Page_number, Category_Id, Publisher_Id, Author_Id, Language)
VALUES
-- Quốc tế
('Harry Potter and the Philosopher''s Stone', 220000, 180000, 'Available', '1997-06-26', 300, '9780747532743', 223, 5, 1, 1, 'English'),
('The Hobbit', 250000, 210000, 'Available', '1937-09-21', 200, '9780007458424', 310, 5, 2, 2, 'English'),
('The Da Vinci Code', 270000, 230000, 'Available', '2003-03-18', 350, '9780385504201', 454, 2, 3, 3, 'English'),
('The Alchemist', 180000, 150000, 'Available', '1988-04-15', 400, '9780061122415', 197, 1, 4, 4, 'English'),
('Atomic Habits', 300000, 260000, 'Available', '2018-10-16', 500, '9780735211292', 320, 3, 5, 5, 'English'),

-- Việt Nam
('Cho tôi xin một vé đi tuổi thơ', 95000, 75000, 'Available', '2008-05-15', 250, '9786042079638', 220, 8, 6, 6, 'Tiếng Việt'),
('Tôi thấy hoa vàng trên cỏ xanh', 105000, 89000, 'Available', '2010-10-10', 280, '9786042079639', 350, 8, 6, 6, 'Tiếng Việt'),
('Đắc Nhân Tâm', 120000, 99000, 'Available', '1936-01-01', 450, '9786049223034', 320, 3, 7, 7, 'Tiếng Việt'),
('Tuổi trẻ đáng giá bao nhiêu', 130000, 115000, 'Available', '2016-06-01', 300, '9786046848681', 280, 4, 8, 8, 'Tiếng Việt'),
('Trên đường băng', 110000, 95000, 'Available', '2017-09-10', 220, '9786047742650', 250, 4, 8, 9, 'Tiếng Việt');

-- ROLE
INSERT INTO Role (Role_name) VALUES
(N'Admin'),
(N'Customer');

-- USER
INSERT INTO [User] (First_name, Last_name,PasswordHash, Email, Phone, Address, Role_Id)
VALUES
(N'John', N'Doe', N'123456', N'john.doe@example.com', N'0123456789', N'123 Main St', 2),
(N'Alice', N'Smith', N'123456', N'alice.smith@example.com', N'0987654321', N'456 High St', 2),
(N'admin', N'system', N'admin123', N'admin@example.com', N'0111111111', N'Head Office', 1);
