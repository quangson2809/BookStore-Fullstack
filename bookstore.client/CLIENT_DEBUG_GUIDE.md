# ?? CLIENT DEBUGGING GUIDE

## ? ?Ã THÊM VALIDATION & LOGGING

### 1. **Validation Improvements**
- ? Ki?m tra fullName không tr?ng
- ? Ki?m tra phone không tr?ng
- ? Ki?m tra email không tr?ng
- ? Các tr??ng ??a ch? (address, ward, district, city)

### 2. **Form Changes**
- ? Lo?i b? `readOnly` t? fullName, phone, email
- ? Thêm error messages cho t?t c? tr??ng b?t bu?c
- ? Cho phép user ch?nh s?a n?u thông tin không ??y ??

### 3. **Enhanced Logging**
M? **Browser Console (F12)** ?? xem:

```javascript
=== FORM VALIDATION ===
Current shippingInfo: {
  fullName: "Nguyen Van A",
  phone: "0909123456",
  email: "nva@example.com",
  address: "123 Le Loi",
  ward: "Ward 1",
  district: "District 1",
  city: "Ho Chi Minh"
}
========================

=== CHECKOUT DEBUG ===
CartId: 1
Order Data: {
  "fullName": "Nguyen Van A",
  "phone": "0909123456",
  "address": "123 Le Loi, Ward 1, District 1, Ho Chi Minh",
  "email": "nva@example.com"
}
Full Address: 123 Le Loi, Ward 1, District 1, Ho Chi Minh
====================

API Response: {
  "success": true,
  "message": "??t hàng thành công"
}
```

## ?? CÁCH TEST

### B??c 1: Làm s?ch Database (N?u c?n)
N?u có orders l?i trong database:
```sql
-- Xóa order l?i
DELETE FROM OrdersDetail WHERE Order_Id = 1
DELETE FROM Orders WHERE Orders_Id = 1
```

### B??c 2: Ki?m tra User ?ã ??ng nh?p
1. M? Console (F12)
2. Ch?y:
```javascript
localStorage.getItem('userInfo')
localStorage.getItem('isLoggedIn')
```
3. N?u null, ??ng nh?p l?i

### B??c 3: Ki?m tra Cart có items
1. Vào trang Cart
2. Console s? hi?n:
```javascript
Cart loaded with X items
```

### B??c 4: Test Checkout Flow
1. Click "??t hàng"
2. **CheckoutModal m?**
3. Ki?m tra thông tin:
   - H? tên ?ã ???c ?i?n?
   - S? ?i?n tho?i ?ã ???c ?i?n?
   - Email ?ã ???c ?i?n?
4. ?i?n ??a ch?:
   - ??a ch? c? th?
   - Ph??ng/Xã
   - Qu?n/Huy?n
   - T?nh/Thành ph?
5. Click "Xác nh?n ??t hàng"
6. Xem Console logs

## ?? TROUBLESHOOTING

### Case 1: Validation Failed
**Console:**
```
=== FORM VALIDATION ===
Current shippingInfo: { fullName: "", phone: "", ... }
Validation failed with errors: { fullName: "Vui lòng nh?p h? tên", ... }
```

**Nguyên nhân:** localStorage không có userInfo ho?c userInfo b? l?i

**Gi?i pháp:**
1. ??ng xu?t
2. ??ng nh?p l?i
3. Th? l?i

### Case 2: CartId Missing
**Console:**
```
CartId is missing: undefined
```

**Nguyên nhân:** Cart context không load cartId

**Gi?i pháp:**
1. Check localStorage:
```javascript
JSON.parse(localStorage.getItem('userInfo')).cartId
```
2. N?u undefined, ??ng nh?p l?i

### Case 3: API Returns Error
**Console:**
```
API Response: {
  "success": false,
  "message": "Gi? hàng tr?ng!"
}
```

**Nguyên nhân:** Cart không có items trong database

**Gi?i pháp:**
```sql
SELECT * FROM CartDetail WHERE Cart_Id = <your_cart_id>
```
Thêm items vào cart r?i th? l?i

### Case 4: Empty fullName/phone/email
**Console:**
```
Current shippingInfo: {
  fullName: "",
  phone: "",
  email: ""
}
```

**Nguyên nhân:** localStorage userInfo không ?úng format

**Gi?i pháp:**
1. Check format:
```javascript
const userInfo = JSON.parse(localStorage.getItem('userInfo'));
console.log('firstName:', userInfo.firstName);
console.log('lastName:', userInfo.lastName);
console.log('phone:', userInfo.phone);
console.log('email:', userInfo.email);
```

2. N?u thi?u, ??ng nh?p l?i

## ? EXPECTED SUCCESS FLOW

### Console Output:
```
=== FORM VALIDATION ===
Current shippingInfo: {
  fullName: "Nguyen Van A",
  phone: "0909123456",
  email: "nva@example.com",
  address: "123 Le Loi",
  ward: "Ward 1",
  district: "District 1",
  city: "Ho Chi Minh",
  note: "",
  paymentMethod: "cod"
}
========================

=== CHECKOUT DEBUG ===
CartId: 1
Order Data: {
  "fullName": "Nguyen Van A",
  "phone": "0909123456",
  "address": "123 Le Loi, Ward 1, District 1, Ho Chi Minh",
  "email": "nva@example.com"
}
Full Address: 123 Le Loi, Ward 1, District 1, Ho Chi Minh
====================

API Response: {
  "success": true,
  "message": "??t hàng thành công"
}
```

### Alert:
```
? ??t hàng thành công!
```

### Database After Success:
```sql
-- New Order Created
SELECT TOP 1 * FROM Orders ORDER BY Orders_Id DESC
-- Orders_Status = 'Pending'
-- FullName = 'Nguyen Van A'
-- Phone = '0909123456'
-- Address = '123 Le Loi, Ward 1, District 1, Ho Chi Minh'
-- Email = 'nva@example.com'

-- OrdersDetails Created
SELECT * FROM OrdersDetail WHERE Order_Id = <new_order_id>
-- All items from cart

-- Cart Cleared
SELECT * FROM CartDetail WHERE Cart_Id = 1
-- Should be empty
```

## ?? KEY CHANGES

| Before | After |
|--------|-------|
| fullName, phone, email readOnly | ? Editable |
| No validation for customer info | ? Validates all required fields |
| Minimal logging | ? Detailed logging at each step |
| No error messages | ? Shows specific error for each field |

## ?? IF STILL FAILS

**G?I CHO TÔI:**

1. **Full Console Log** (copy all t? "=== FORM VALIDATION ===" ??n h?t)
2. **localStorage content:**
```javascript
localStorage.getItem('userInfo')
localStorage.getItem('isLoggedIn')
```
3. **Network Tab** (F12 ? Network):
   - Request URL
   - Request Payload
   - Response
4. **Database state:**
```sql
SELECT * FROM CartDetail WHERE Cart_Id = <your_cart_id>
SELECT TOP 5 * FROM Orders ORDER BY Orders_Id DESC
```

V?i thông tin này, tôi s? fix chính xác! ??
