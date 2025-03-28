
CREATE SCHEMA project;

SET search_path TO project, public;


CREATE TABLE Account (
    account_id SERIAL,
    email VARCHAR(320) UNIQUE NOT NULL,
    acc_password VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone_number VARCHAR(20),
    date_created TIMESTAMP NOT NULL,
    country VARCHAR(70) NOT NULL,
    city VARCHAR(120) NOT NULL,
    street VARCHAR(100) NOT NULL,
    zip VARCHAR(10) NOT NULL,
    floor_level VARCHAR(4),
    PRIMARY KEY (account_id)
);

/*Think about possible check constraints you can add*/

CREATE TABLE Cart (
    cart_id SERIAL,
    account_id INTEGER NOT NULL,
    cart_status VARCHAR(9) NOT NULL,
    total_price NUMERIC(7, 2) DEFAULT 0 NOT NULL, -- Default value of 0
    num_of_items INT DEFAULT 0 NOT NULL,         -- Default value of 0
    PRIMARY KEY (cart_id),
    FOREIGN KEY (account_id) REFERENCES Account (account_id),
    CHECK (cart_status = 'open' OR cart_status = 'completed'),
    CHECK (num_of_items >= 0)
);

CREATE TABLE Category (
    category_id SERIAL,
    category_name VARCHAR(100) NOT NULL,
    PRIMARY KEY (category_id)
);

CREATE TABLE Product (
    product_id SERIAL,
    product_name VARCHAR(255) NOT NULL,
    collection_name VARCHAR(100) NOT NULL,
    price NUMERIC(7, 2) NOT NULL,
    "size" VARCHAR(10) NOT NULL,
    color VARCHAR(50) NOT NULL,
    product_description TEXT,
    num_in_stock INT NOT NULL,
    release_time TIMESTAMP NOT NULL,
    termination_time TIMESTAMP,
    category_id INT NOT NULL,
    PRIMARY KEY (product_id),
    FOREIGN KEY (category_id) REFERENCES Category (category_id),
    CHECK (price > 0),
    CHECK (num_in_stock >= 0)
);

CREATE TABLE Product_images (
    product_id INT NOT NULL,
    img TEXT NOT NULL,
    PRIMARY KEY (product_id, img),
    FOREIGN KEY (product_id) REFERENCES Product (product_id)
);


CREATE TABLE Discount (
    discount_id SERIAL,
    discount_code VARCHAR(30),
    discount_name VARCHAR(300),
    discount_type VARCHAR(20) NOT NULL, -- e.g., percentage, fixed_amount
    discount_value NUMERIC(5, 2) NOT NULL,
    eligibility_criteria TEXT,
    release_time TIMESTAMP NOT NULL,
    duration INTERVAL NOT NULL,
    PRIMARY KEY (discount_id),
    CHECK (
        (discount_type = 'percentage' AND discount_value <= 100)  -- Percentage discounts must be <= 100
        OR (discount_type != 'percentage' AND discount_value > 0) 
    )
);

CREATE TABLE PaymentMethod (
    payment_method_id SERIAL,
    account_id INT NOT NULL,
    card_number VARCHAR(19) NOT NULL,
    exp_date DATE NOT NULL,
    security_code CHAR(3) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    PRIMARY KEY (payment_method_id),
    FOREIGN KEY (account_id) REFERENCES Account (account_id)
);

CREATE TABLE Orders (
    cart_id INT,
    account_id INT NOT NULL,
    order_timestamp TIMESTAMP NOT NULL,
    shipment_company VARCHAR(100),
    shipment_price NUMERIC(6, 2),
    expected_delivery TIMESTAMP,
    PRIMARY KEY (cart_id),
    FOREIGN KEY (account_id) REFERENCES Account (account_id),
    FOREIGN KEY (cart_id) REFERENCES Cart (cart_id)
);

CREATE TABLE Contains (
    cart_id INT,
    product_id INT,
    quantity INT NOT NULL CHECK (quantity > 0),
    PRIMARY KEY (cart_id, product_id),
    FOREIGN KEY (cart_id) REFERENCES Cart (cart_id),
    FOREIGN KEY (product_id) REFERENCES Product (product_id)
);

CREATE TABLE Reviews (
    account_id INT,
    product_id INT,
    review_id SERIAL,
    rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
    review_description TEXT,
    PRIMARY KEY (account_id, product_id, review_id),
    FOREIGN KEY (account_id) REFERENCES Account (account_id),
    FOREIGN KEY (product_id) REFERENCES Product (product_id)
);

CREATE TABLE Applied_on_cart (
    cart_id INT,
    discount_id INT,
    PRIMARY KEY (cart_id, discount_id),
    FOREIGN KEY (cart_id) REFERENCES Cart (cart_id),
    FOREIGN KEY (discount_id) REFERENCES Discount (discount_id)
);

CREATE TABLE Applied_on_product (
    discount_id INT,
    product_id INT,
    PRIMARY KEY (discount_id, product_id),
    FOREIGN KEY (discount_id) REFERENCES Discount (discount_id),
    FOREIGN KEY (product_id) REFERENCES Product (product_id)
);



