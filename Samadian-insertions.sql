
INSERT INTO Account VALUES (DEFAULT, 'testemail@gmail.com', 'TestPASS123', 'first', 'test', '111-111-1111' , NOW(), 'USA', 'Wilkes-Barre', '1 Main St.', '18702', null);

INSERT INTO Account VALUES (DEFAULT, 'john.doe1@gmail.com', 'Password123!', 'John', 'Doe', '123-456-7890', NOW(), 'USA', 'New York', '101 First Ave.', '10001', null);

INSERT INTO Account VALUES (DEFAULT, 'jane.smith2@gmail.com', 'Password456!', 'Jane', 'Smith', '234-567-8901', NOW(), 'USA', 'Los Angeles', '202 Second St.', '90001', null);

INSERT INTO Account VALUES (DEFAULT, 'bob.johnson3@gmail.com', 'BobPass789!', 'Bob', 'Johnson', '345-678-9012', NOW(), 'USA', 'Chicago', '303 Third Blvd.', '60601', null);

INSERT INTO Account VALUES (DEFAULT, 'alice.williams4@gmail.com', 'AlicePass321!', 'Alice', 'Williams', '456-789-0123', NOW(), 'USA', 'Houston', '404 Fourth Ave.', '77001', null);

INSERT INTO Account VALUES (DEFAULT, 'charlie.brown5@gmail.com', 'Charlie123!', 'Charlie', 'Brown', '567-890-1234', NOW(), 'USA', 'Phoenix', '505 Fifth St.', '85001', null);

INSERT INTO Account VALUES (DEFAULT, 'emily.davis6@gmail.com', 'EmilyPassword123!', 'Emily', 'Davis', '678-901-2345', NOW(), 'USA', 'Philadelphia', '606 Sixth Ave.', '19101', null);

INSERT INTO Account VALUES (DEFAULT, 'david.miller7@gmail.com', 'DavidPass654!', 'David', 'Miller', '789-012-3456', NOW(), 'USA', 'San Antonio', '707 Seventh Blvd.', '78201', null);

INSERT INTO Account VALUES (DEFAULT, 'laura.moore8@gmail.com', 'Laura1234Pass!', 'Laura', 'Moore', '890-123-4567', NOW(), 'USA', 'San Diego', '808 Eighth St.', '92101', '2');

INSERT INTO Account VALUES (DEFAULT, 'michael.taylor9@gmail.com', 'MikePassword987!', 'Michael', 'Taylor', '901-234-5678', NOW(), 'USA', 'Dallas', '909 Ninth Ave.', '75201', '1');

INSERT INTO Account VALUES (DEFAULT, 'susan.jackson10@gmail.com', 'SusanPass567!', 'Susan', 'Jackson', '012-345-6789', NOW(), 'USA', 'Austin', '1010 Tenth Blvd.', '73301', '4');



-- Completed cart with updated total_price and num_of_items
INSERT INTO Cart VALUES (DEFAULT, 1, 'completed', 198.00, 3); -- Ordered so it made an account for them
INSERT INTO Cart VALUES (DEFAULT, 1, 'open', DEFAULT, DEFAULT);

INSERT INTO Cart VALUES (DEFAULT, 2, 'open', DEFAULT, DEFAULT); -- Made account didn't order

INSERT INTO Cart VALUES (DEFAULT, 3, 'completed', 420.00, 5); -- Just ordered

INSERT INTO Cart VALUES (DEFAULT, 4, 'open', DEFAULT, DEFAULT); -- Made account didn't order

INSERT INTO Cart VALUES (DEFAULT, 5, 'completed', 105.00, 1); -- Just ordered

INSERT INTO Cart VALUES (DEFAULT, 6, 'completed', 395.00, 5); -- Just ordered
INSERT INTO Cart VALUES (DEFAULT, 6, 'open', DEFAULT, DEFAULT); -- Added something to a new cart

INSERT INTO Cart VALUES (DEFAULT, 9, 'open', DEFAULT, DEFAULT); -- Made an account
INSERT INTO Cart VALUES (DEFAULT, 9, 'completed', 263.00, 3); -- Changed cart and made an order

INSERT INTO Cart VALUES (DEFAULT, 10, 'open', DEFAULT, DEFAULT);




INSERT INTO Category VALUES (DEFAULT, 'T-Shirt');

INSERT INTO Category VALUES (DEFAULT, 'Jersey');

INSERT INTO Category VALUES (DEFAULT, 'Hoodies'); 

INSERT INTO Category VALUES (DEFAULT, 'Jacket');

INSERT INTO Category VALUES (DEFAULT, 'Sweatshirt');

INSERT INTO Category VALUES (DEFAULT, 'Socks');

INSERT INTO Category VALUES (DEFAULT, 'Hat');

INSERT INTO Category VALUES (DEFAULT, 'Chain');

INSERT INTO Category VALUES (DEFAULT, 'Backpack');

INSERT INTO Category VALUES (DEFAULT, 'Bandana');

INSERT INTO Category VALUES (DEFAULT, 'Boxers');

INSERT INTO Category VALUES (DEFAULT, 'Slides');

INSERT INTO Category VALUES (DEFAULT, 'Watch');

INSERT INTO Category VALUES (DEFAULT, 'Shorts');

INSERT INTO Category VALUES (DEFAULT, 'Pants');

-- General Note about this table. I won't change it for this class, 
-- but in general it would be best to have category just be an attribute of type enum 
-- and then list out all possible categories. 


-----------------------------------------  Products ------------------------------------

INSERT INTO Product VALUES (DEFAULT, 'SDMN x Hot Wheels Washed T-Shirt', 'SDMN x Hot Wheels', 40.00, 'XXS', 'Vintage Black', 
'SDMN x Hot Wheels front and rear print design',
100, '2023-10-27 12:00', null, 1);

--Put more combinations of this product
--Put other T-shirts


INSERT INTO Product VALUES (DEFAULT, 'Varsity Basketball Jersey', 'Imperial Varsity', 40.00, 'M', 'Red', 
'SDMN Varsity printed design. XIX woven tag. Lightweight & breathable fabric. SDMN 2013 patch',
50, '2024-08-13 12:00', '2026-08-13 12:00', 2);


--Put more combinations of this product
--Put other T-shirts

----------------

INSERT INTO Product VALUES (DEFAULT, 'W2S Hoodie', 'W2S Birthday', 79.00, 'XXS', 'W2S Blue', 
'SDMN™ raised 3D embroidery. Kangaroo pocket. XIX Woven Tag',
100, '2024-12-01 13:00', null, 3);

INSERT INTO Product VALUES (DEFAULT, 'W2S Hoodie', 'W2S Birthday', 79.00, 'XS', 'W2S Blue', 
'SDMN™ raised 3D embroidery. Kangaroo pocket. XIX Woven Tag',
100, '2024-11-01 13:00', null, 3);

INSERT INTO Product VALUES (DEFAULT, 'W2S Hoodie', 'W2S Birthday', 79.00, 'S', 'W2S Blue', 
'SDMN™ raised 3D embroidery. Kangaroo pocket. XIX Woven Tag',
100, '2024-11-01 13:00', null, 3);

INSERT INTO Product VALUES (DEFAULT, 'W2S Hoodie', 'W2S Birthday', 79.00, 'M', 'W2S Blue', 
'SDMN™ raised 3D embroidery. Kangaroo pocket. XIX Woven Tag',
100, '2024-11-01 13:00', null, 3);

INSERT INTO Product VALUES (DEFAULT, 'W2S Hoodie', 'W2S Birthday', 79.00, 'L', 'W2S Blue', 
'SDMN™ raised 3D embroidery. Kangaroo pocket. XIX Woven Tag',
100, '2024-11-01 13:00', null, 3);

INSERT INTO Product VALUES (DEFAULT, 'W2S Hoodie', 'W2S Birthday', 79.00, 'XL', 'W2S Blue', 
'SDMN™ raised 3D embroidery. Kangaroo pocket. XIX Woven Tag',
100, '2024-11-01 13:00', null, 3);

INSERT INTO Product VALUES (DEFAULT, 'W2S Hoodie', 'W2S Birthday', 79.00, 'XXL', 'W2S Blue', 
'SDMN™ raised 3D embroidery. Kangaroo pocket. XIX Woven Tag',
100, '2024-11-01 13:00', null, 3);

----------------
--Other Hoodies

INSERT INTO Product VALUES (DEFAULT, 'Astro Fleece Hoodie', 'AW24 Space', 105.00, 'L', 'Storm Blue/Mercury', 
'Custom XIX cord stoppers at hem. Elasticated cuff binding. YKK Zippers. Pongee silk lining. AW24',
0, '2024-11-15 12:00', null, 3);

--Other Hoodies

----------------------------

INSERT INTO Product VALUES (DEFAULT, 'Imperial Varsity Letterman Jacket', 'Imperial Varsity', 105.00, 'XS', 'Fossil/Stone', 
'SDMN Imperial embroidered logo. XIX embroidered designs. Quilted padded lining. Custom engraved snap buttons',
40, '2024-08-13 12:00', '2026-08-13 12:00', 4);




---------------
--Other Jackets


-------------------- Put products for collections 5-15 below -----------------------------------

------------------------------------------------------------------------------------------------


-- Black hotwheels T

INSERT INTO Product_images (product_id, img)
SELECT product_id, 
       'webapp/frontend/images/Product images/T-Shirts/sdmn x hot wheels washed t-shirt/HWT-ShirtBlack1.webp'
FROM Product
WHERE product_name = 'SDMN x Hot Wheels Washed T-Shirt' AND color = 'Vintage Black';


INSERT INTO Product_images (product_id, img)
SELECT product_id, 
       'webapp/frontend/images/Product images/T-Shirts/sdmn x hot wheels washed t-shirt/HWT-ShirtBlack2.webp'
FROM Product
WHERE product_name = 'SDMN x Hot Wheels Washed T-Shirt' AND color = 'Vintage Black';

---- red Varsity jersey

INSERT INTO Product_images (product_id, img)
SELECT product_id, 
       'webapp/frontend/images/Product images/Jerseys/varsity basketball jacket/red/VarsityJerseyRed1.webp'
FROM Product
WHERE product_name = 'Varsity Basketball Jersey' AND color = 'Red';

---- W2S hoodie

INSERT INTO Product_images (product_id, img)
SELECT product_id, 
       'webapp/frontend/images/Product images/Hoodies/W2S Hoodie/W2SHoodie1.webp'
FROM Product
WHERE product_name = 'W2S Hoodie' AND color = 'W2S Blue';


INSERT INTO Product_images (product_id, img)
SELECT product_id, 
       'webapp/frontend/images/Product images/Hoodies/W2S Hoodie/W2SHoodie2.webp'
FROM Product
WHERE product_name = 'W2S Hoodie' AND color = 'W2S Blue';


INSERT INTO Product_images (product_id, img)
SELECT product_id, 
       'webapp/frontend/images/Product images/Hoodies/W2S Hoodie/W2SHoodie3.webp'
FROM Product
WHERE product_name = 'W2S Hoodie' AND color = 'W2S Blue';


---- Astro Fleece Hoodie

INSERT INTO Product_images (product_id, img)
SELECT product_id, 
       'webapp/frontend/images/Product images/Hoodies/Astro Fleece Hoodie/AstroFleeceHoodie1_1f346f31-a797-47ea-a261-6bca28089d51.jpg'
FROM Product
WHERE product_name = 'Astro Fleece Hoodie' AND color = 'Storm Blue/Mercury';


INSERT INTO Product_images (product_id, img)
SELECT product_id, 
       'webapp/frontend/images/Product images/Hoodies/Astro Fleece Hoodie/AstroFleeceHoodie1_6b585ed3-7a80-4562-8aa9-90a8cdd6cb51.webp'
FROM Product
WHERE product_name = 'Astro Fleece Hoodie' AND color = 'Storm Blue/Mercury';

INSERT INTO Product_images (product_id, img)
SELECT product_id, 
       'webapp/frontend/images/Product images/Hoodies/Astro Fleece Hoodie/AstroFleeceHoodie2.webp'
FROM Product
WHERE product_name = 'Astro Fleece Hoodie' AND color = 'Storm Blue/Mercury';


INSERT INTO Product_images (product_id, img)
SELECT product_id, 
       'webapp/frontend/images/Product images/Hoodies/Astro Fleece Hoodie/AstroFleeceHoodie3.webp'
FROM Product
WHERE product_name = 'Astro Fleece Hoodie' AND color = 'Storm Blue/Mercury';

---- Imperial Varsity Jacket (fossil/stone color)

INSERT INTO Product_images (product_id, img)
SELECT product_id, 
       'webapp/frontend/images/Product images/Jackets/imperial varsity letterman jacket/IVJacketFossil1_c82e5f48-6666-454e-9114-9ef90ada9184.webp'
FROM Product
WHERE product_name = 'Imperial Varsity Letterman Jacket' AND color = 'Fossil/Stone';


INSERT INTO Product_images (product_id, img)
SELECT product_id, 
       'webapp/frontend/images/Product images/Jackets/imperial varsity letterman jacket/IVJacketFossil2_0f85cae6-ed50-4279-99d7-b8ff9f9d961d.webp'
FROM Product
WHERE product_name = 'Imperial Varsity Letterman Jacket' AND color = 'Fossil/Stone';


INSERT INTO Product_images (product_id, img)
SELECT product_id, 
       'webapp/frontend/images/Product images/Jackets/imperial varsity letterman jacket/IVJacketFossil3.webp'
FROM Product
WHERE product_name = 'Imperial Varsity Letterman Jacket' AND color = 'Fossil/Stone';


----------------------------  Discount  ------------------------------------------



INSERT INTO Discount VALUES (DEFAULT, 'FAT', 'Save 20% with code FAT', 'percentage', 20, 'only hoodies', NOW(), '1 week');

INSERT INTO Discount VALUES (DEFAULT, 'SNOW', 'Save 30% with code SNOW', 'percentage', 30, 'hoodies, jackets, beanies, socks', NOW(), '1 month');

INSERT INTO Discount VALUES (DEFAULT, 'YEAR10', 'Save $10 with YEAR10', 'fixed_number', 10, 'total price of cart is above $50', NOW(), '1 week');

INSERT INTO Discount VALUES (DEFAULT, 'FANTA LITE', 'Save 10% with FANTA LITE', 'percentage', 10, 'code entered', NOW(), '3 weeks');

INSERT INTO Discount VALUES (DEFAULT, null, '%10 off everything', 'percentage', 10, null, NOW(), '1 day');

-- Only discounts with null eligibility have no eligibility.


----------------------------  PaymentMethod  ------------------------------------------


INSERT INTO PaymentMethod VALUES (DEFAULT, 1, '0123456789123456', '2026-01-01', 111, 'first', 'test');

INSERT INTO PaymentMethod VALUES (DEFAULT, 2, '1234567812345678', '2026-05-15', '123', 'John', 'Doe');

INSERT INTO PaymentMethod VALUES (DEFAULT, 3, '2345678923456789', '2025-12-01', '456', 'Jane', 'Smith');

INSERT INTO PaymentMethod VALUES (DEFAULT, 4, '3456789034567890', '2027-07-20', '789', 'Robert', 'Brown');

INSERT INTO PaymentMethod VALUES (DEFAULT, 5, '4567890145678901', '2026-11-30', '321', 'Emily', 'Davis');

INSERT INTO PaymentMethod VALUES (DEFAULT, 6, '5678901256789012', '2028-03-10', '654', 'Michael', 'Wilson');

INSERT INTO PaymentMethod VALUES (DEFAULT, 7, '6789012367890123', '2025-08-25', '987', 'Sarah', 'Johnson');

INSERT INTO PaymentMethod VALUES (DEFAULT, 8, '7890123478901234', '2027-04-05', '112', 'Chris', 'Miller');

INSERT INTO PaymentMethod VALUES (DEFAULT, 9, '8901234589012345', '2026-09-18', '334', 'Sophia', 'Garcia');

INSERT INTO PaymentMethod VALUES (DEFAULT, 10, '9012345690123456', '2028-01-22', '556', 'Daniel', 'Martinez');

INSERT INTO PaymentMethod VALUES (DEFAULT, 11, '0123456701234567', '2025-06-14', '778', 'Olivia', 'Hernandez');


----------------------------------------------------------------------------------------


-- Orders  (I only selected the completed tables)

INSERT INTO Orders VALUES (1,1, NOW(), 'FedEx', 10.00, NOW() + INTERVAL '5 days');

INSERT INTO Orders VALUES (4,3, NOW(), 'UPS', 5.00, NOW() + INTERVAL '7 days');

INSERT INTO Orders VALUES (6, 5, NOW(), 'USPS', 2.00, NOW() + INTERVAL '5 days');

INSERT INTO Orders VALUES (7, 6, NOW(), 'USPS', 3.34, NOW() + INTERVAL '4 days');

INSERT INTO Orders VALUES (10, 9, NOW(), 'USPS', 6.34, NOW() + INTERVAL '2 days');


----------------------------------------------------------------------------------------

INSERT INTO Contains VALUES (1, 3, 2);
INSERT INTO Contains VALUES (1, 1, 1);

INSERT INTO Contains VALUES (2, 3, 1);

INSERT INTO Contains VALUES (3, 11, 4);
INSERT INTO Contains VALUES (3, 5, 1);

INSERT INTO Contains VALUES (4, 3, 2);

INSERT INTO Contains VALUES (5, 7, 1);

INSERT INTO Contains VALUES (6, 1, 5);

INSERT INTO Contains VALUES (7, 3, 1);
INSERT INTO Contains VALUES (7, 9, 1);
INSERT INTO Contains VALUES (7, 1, 1);

INSERT INTO Contains VALUES (8, 11, 1);

INSERT INTO Contains VALUES (9, 2, 2);

INSERT INTO Contains VALUES (10, 2, 1);

INSERT INTO Contains VALUES (11, 7, 1);


----------------------------------------------------------------------------------------

INSERT INTO Reviews VALUES (1, 2, DEFAULT, 5, 'Very nice fit!');
INSERT INTO Reviews VALUES (2, 1, DEFAULT, 1, 'absolutely horrible! colors wash out easily');
INSERT INTO Reviews VALUES (3, 4, DEFAULT, 5, 'beautiful!');
INSERT INTO Reviews VALUES (4, 6, DEFAULT, 4, 'Could be softer on the inside but overall good.');
INSERT INTO Reviews VALUES (5, 7, DEFAULT, 5, 'I like it');
INSERT INTO Reviews VALUES (5, 3, DEFAULT, 5, 'Very soft');
INSERT INTO Reviews VALUES (10, 3, DEFAULT, 5, 'How are you guys today?');
INSERT INTO Reviews VALUES (8, 4, DEFAULT, 5, 'Very nice fit!');

---------------------------------------------------------------------------------------------

-- FAT applies to hoodies
INSERT INTO Applied_on_product VALUES (1, 3);
INSERT INTO Applied_on_product VALUES (1, 4);
INSERT INTO Applied_on_product VALUES (1, 5);
INSERT INTO Applied_on_product VALUES (1, 6);
INSERT INTO Applied_on_product VALUES (1, 7);
INSERT INTO Applied_on_product VALUES (1, 8);

-- SNOW applies to hoodies, jackets, beanies, socks
INSERT INTO Applied_on_product VALUES (2, 3);
INSERT INTO Applied_on_product VALUES (2, 4);
INSERT INTO Applied_on_product VALUES (2, 5);
INSERT INTO Applied_on_product VALUES (2, 6);
INSERT INTO Applied_on_product VALUES (2, 7);
INSERT INTO Applied_on_product VALUES (2, 8);


---------------------------------------------------------------------------------------------

-- YEAR10 applies to carts with total price > $50
INSERT INTO Applied_on_cart VALUES (1, 3);
INSERT INTO Applied_on_cart VALUES (3, 3);
INSERT INTO Applied_on_cart VALUES (5, 3);
INSERT INTO Applied_on_cart VALUES (6, 3);
INSERT INTO Applied_on_cart VALUES (9, 3);

-- FANTA LITE applies to all carts
INSERT INTO Applied_on_cart VALUES (1, 4);
INSERT INTO Applied_on_cart VALUES (2, 4);
INSERT INTO Applied_on_cart VALUES (3, 4);
INSERT INTO Applied_on_cart VALUES (4, 4);
INSERT INTO Applied_on_cart VALUES (5, 4);
INSERT INTO Applied_on_cart VALUES (6, 4);
INSERT INTO Applied_on_cart VALUES (7, 4);
INSERT INTO Applied_on_cart VALUES (8, 4);
INSERT INTO Applied_on_cart VALUES (9, 4);
INSERT INTO Applied_on_cart VALUES (10, 4);
INSERT INTO Applied_on_cart VALUES (11, 4);

-- %10 off everything applies to all carts
INSERT INTO Applied_on_cart (cart_id, discount_id)
SELECT cart_id, 5
FROM Cart;