-- Tạo database
CREATE DATABASE BookstoreDb;
GO
USE BookstoreDb;
GO

-- CATEGORY
CREATE TABLE Category (
    Category_Id INT PRIMARY KEY IDENTITY(1,1),
    Category_Name NVARCHAR(100) NOT NULL UNIQUE
);

-- PUBLISHER
CREATE TABLE Publisher (
    Publisher_Id INT PRIMARY KEY IDENTITY(1,1),
    Publisher_Name NVARCHAR(150) NOT NULL UNIQUE
);

-- AUTHOR
CREATE TABLE Author (
    Author_Id INT PRIMARY KEY IDENTITY(1,1),
    Author_Name NVARCHAR(150) NOT NULL
);

-- BOOK
CREATE TABLE Book (
    Book_Id INT PRIMARY KEY IDENTITY(1,1),
    Book_Name NVARCHAR(200) NOT NULL,
    Original_price DECIMAL(10,2) NOT NULL,
    Sale_price DECIMAL(10,2),
    Book_Status NVARCHAR(50),
    Publish_Time DATE,
    Stock_Quantity INT DEFAULT 0,
    ISBN NVARCHAR(20) UNIQUE,
    Page_number INT,
    Category_Id INT,
    Publisher_Id INT,
    Author_Id INT,
    FOREIGN KEY (Category_Id) REFERENCES Category(Category_Id),
    FOREIGN KEY (Publisher_Id) REFERENCES Publisher(Publisher_Id),
    FOREIGN KEY (Author_Id) REFERENCES Author(Author_Id)
);

-- BOOKIMAGE
CREATE TABLE BookImage (
    BookImage_Id INT PRIMARY KEY IDENTITY(1,1),
    BookImage_Url NVARCHAR(300) NOT NULL,
    Is_Main BIT DEFAULT 0,
    Book_Id INT,
    FOREIGN KEY (Book_Id) REFERENCES Book(Book_Id) ON DELETE CASCADE
);

-- ROLE
CREATE TABLE Role (
    Role_Id INT PRIMARY KEY IDENTITY(1,1),
    Role_Name NVARCHAR(50) NOT NULL UNIQUE
);

-- USER
CREATE TABLE [User] (
    User_Id INT PRIMARY KEY IDENTITY(1,1),
    First_Name NVARCHAR(100),
    Last_Name NVARCHAR(100),
    PasswordHash NVARCHAR(200) NOT NULL,
    Email NVARCHAR(150) UNIQUE,
    Phone NVARCHAR(20),
    Create_Time DATETIME DEFAULT GETDATE(),
    Address NVARCHAR(255),
    Role_Id INT,
    FOREIGN KEY (Role_Id) REFERENCES Role(Role_Id)
);

-- CART
CREATE TABLE Cart (
    Cart_Id INT PRIMARY KEY IDENTITY(1,1),
    User_Id INT,
    FOREIGN KEY (User_Id) REFERENCES [User](User_Id)
);

-- CARTDETAIL
CREATE TABLE CartDetail (
    Cart_Id INT,
    Book_Id INT,
    Quantity INT NOT NULL,
    Total_amount DECIMAL(10,2),
    PRIMARY KEY (Cart_Id, Book_Id),
    FOREIGN KEY (Cart_Id) REFERENCES Cart(Cart_Id) ON DELETE CASCADE,
    FOREIGN KEY (Book_Id) REFERENCES Book(Book_Id)
);

-- PAYMENT
CREATE TABLE Payment (
    Payment_Id INT PRIMARY KEY IDENTITY(1,1),
    Method_Name NVARCHAR(100) NOT NULL
);

-- ORDERS
CREATE TABLE Orders (
    Orders_Id INT PRIMARY KEY IDENTITY(1,1),
    Orders_Status NVARCHAR(50),
    User_Id INT,
    Payment_Id INT,
    FOREIGN KEY (User_Id) REFERENCES [User](User_Id),
    FOREIGN KEY (Payment_Id) REFERENCES Payment(Payment_Id)
);

-- ORDERSDETAIL
CREATE TABLE OrdersDetail (
    Order_Id INT,
    Book_Id INT,
    Quantity INT NOT NULL,
    Total_Price DECIMAL(10,2),
    Create_Time DATETIME DEFAULT GETDATE(),
    PRIMARY KEY (Order_Id, Book_Id),
    FOREIGN KEY (Order_Id) REFERENCES Orders(Orders_Id) ON DELETE CASCADE,
    FOREIGN KEY (Book_Id) REFERENCES Book(Book_Id)
);

------------------------------------------------------
-- DỮ LIỆU MẪU
------------------------------------------------------

-- CATEGORY
INSERT INTO Category (Category_Name) VALUES
(N'Fiction'),
(N'Science'),
(N'Technology'),
(N'History');

-- PUBLISHER
INSERT INTO Publisher (Publisher_Name) VALUES
(N'Penguin Random House'),
(N'O’Reilly Media'),
(N'Oxford University Press');

-- AUTHOR
INSERT INTO Author (Author_Name) VALUES
(N'George Orwell'),
(N'Stephen Hawking'),
(N'Robert C. Martin');

-- ROLE
INSERT INTO Role (Role_name) VALUES
(N'Admin'),
(N'Customer');

-- USER
INSERT INTO [User] (First_name, Last_name,PasswordHash, Email, Phone, Address, Role_Id)
VALUES
(N'John', N'Doe', N'123456', N'john.doe@example.com', N'0123456789', N'123 Main St', 2),
(N'Alice', N'Smith', N'123456', N'alice.smith@example.com', N'0987654321', N'456 High St', 2),
(N'Admin', N'System', N'admin123', N'admin@example.com', N'0111111111', N'Head Office', 1);

-- BOOK
INSERT INTO Book (Book_Name, Original_price, Sale_price, Book_Status, Publish_Time, Stock_Quantity, ISBN, Page_number, Category_Id, Publisher_Id, Author_Id)
VALUES
(N'1984', 150000, 120000, N'Available', '1949-06-08', 50, N'9780451524935', 328, 1, 1, 1),
(N'A Brief History of Time', 200000, 180000, N'Available', '1988-04-01', 30, N'9780553380163', 212, 2, 3, 2),
(N'Clean Code', 300000, 270000, N'Available', '2008-08-01', 40, N'9780132350884', 464, 3, 2, 3);

-- BOOKIMAGE
INSERT INTO BookImage (BookImage_Url, Is_main, Book_Id) VALUES
(N'https://example.com/images/1984.jpg', 1, 1),
(N'https://example.com/images/brief_history.jpg', 1, 2),
(N'https://example.com/images/clean_code.jpg', 1, 3);

-- PAYMENT
INSERT INTO Payment (Method_name) VALUES
(N'Credit Card'),
(N'PayPal'),
(N'Cash on Delivery');

-- CART
INSERT INTO Cart (User_Id) VALUES (1), (2);

-- CARTDETAIL
INSERT INTO CartDetail (Cart_Id, Book_Id, Quantity, Total_amount) VALUES
(1, 1, 2, 240000),
(1, 3, 1, 270000),
(2, 2, 1, 180000);

-- ORDERS
INSERT INTO Orders (Orders_Status, User_Id, Payment_Id)
VALUES
(N'Pending', 1, 1),
(N'Completed', 2, 2);

-- ORDERSDETAIL
INSERT INTO OrdersDetail (Order_Id, Book_Id, Quantity, Total_Price)
VALUES
(1, 1, 2, 240000),
(1, 3, 1, 270000),
(2, 2, 1, 180000);
