
CREATE TABLE transportation_type (
    id SERIAL PRIMARY KEY,
    type_name VARCHAR(255) NOT null,
    transportation_img_id INT REFERENCES transportation_img(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    craeted_by VARCHAR(255) NOT null,
    updated_by VARCHAR(255) NOT null,
    is_active BOOLEAN DEFAULT true
);

CREATE TABLE transportation_img (
    id SERIAL PRIMARY KEY,
    img_url VARCHAR,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    craeted_by VARCHAR(255) NOT null,
    updated_by VARCHAR(255) NOT null,
    is_active BOOLEAN DEFAULT true
);

CREATE TABLE transportation (
    id SERIAL PRIMARY KEY,
    bill_number VARCHAR(255) NOT NULL,
    send_date DATE NOT NULL,
    receive_date DATE,
    province_id INT REFERENCES tb_mas_province(id),
    status VARCHAR(255) NOT NULL,
    type_id INT REFERENCES transportation_type(id),
    size_id INT REFERENCES PackageSize(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    craeted_by VARCHAR(255) NOT null,
    updated_by VARCHAR(255) NOT null,
    is_active BOOLEAN DEFAULT true
);

CREATE TABLE package_size (
    id SERIAL PRIMARY KEY,
    size_name VARCHAR(255) NOT null,
    Width DECIMAL(10, 2) NOT NULL,
    length DECIMAL(10, 2) NOT NULL,
    height DECIMAL(10, 2) NOT NULL,
    total_dimension DECIMAL(10, 2) NOT NULL,
    weight DECIMAL(10, 2) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    craeted_by VARCHAR(255) NOT null,
    updated_by VARCHAR(255) NOT null,
    is_active BOOLEAN DEFAULT true
);

CREATE TABLE distance (
    id SERIAL PRIMARY KEY,
    to_province_id INT REFERENCES tb_mas_province(id),
    transportation_id INT REFERENCES transportation(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    craeted_by VARCHAR(255) NOT null,
    updated_by VARCHAR(255) NOT null,
    is_active BOOLEAN DEFAULT true
);

CREATE TABLE within_bangkok_metro (
    id SERIAL PRIMARY KEY,
    details VARCHAR(255) NOT NULL,
    distance_id INT REFERENCES distance(id),
    transportation_rate_id INT REFERENCES transportation_rate(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    craeted_by VARCHAR(255) NOT null,
    updated_by VARCHAR(255) NOT null,
    is_active BOOLEAN DEFAULT true
);

CREATE TABLE from_bangkok_metro_to_other_provinces (
    id SERIAL PRIMARY KEY,
    details VARCHAR(255) NOT NULL,
    distance_id INT REFERENCES distance(id),
    transportation_rate_id INT REFERENCES transportation_rate(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    craeted_by VARCHAR(255) NOT null,
    updated_by VARCHAR(255) NOT null,
    is_active BOOLEAN DEFAULT true
);

CREATE TABLE mst_within_bangkok_metro (
    id SERIAL PRIMARY KEY,
    details VARCHAR(255) NOT NULL,
    destination_province_id INT REFERENCES tb_mas_province(id),
    transportation_rate_id INT REFERENCES transportation_rate(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    craeted_by VARCHAR(255) NOT null,
    updated_by VARCHAR(255) NOT null,
    is_active BOOLEAN DEFAULT true
);

CREATE TABLE mst_from_bangkok_metro_to_other_provinces (
    id SERIAL PRIMARY KEY,
    details VARCHAR(255) NOT NULL,
    destination_province_id INT REFERENCES tb_mas_province(id),
    transportation_rate_id INT REFERENCES transportation_rate(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    craeted_by VARCHAR(255) NOT null,
    updated_by VARCHAR(255) NOT null,
    is_active BOOLEAN DEFAULT true
);

CREATE TABLE transportation_rate (
    id SERIAL PRIMARY KEY,
    transportation_type_id INT REFERENCES transportation_type(id),
    size_id INT REFERENCES package_size(id),
    origin_province_id INT REFERENCES tb_mas_province(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(255) NOT NULL,
    updated_by VARCHAR(255) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE
);

CREATE TABLE transportation_rate_package_size (
    id SERIAL PRIMARY KEY,
    transportation_rate_id INT REFERENCES transportation_rate(id),
    package_size_id INT REFERENCES package_size(id),
    rate_bangkok_metro DECIMAL(10, 2) NOT NULL,
    rate_bangkok_metro_to_other_provinces DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(255) NOT NULL,
    updated_by VARCHAR(255) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE
);