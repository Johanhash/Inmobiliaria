-- Crear la base de datos
CREATE DATABASE IF NOT EXISTS century21;

USE century21;

-- Tabla de usuarios
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('Admin', 'Agent', 'Client') DEFAULT 'Client',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de propiedades
CREATE TABLE properties (
    id INT AUTO_INCREMENT PRIMARY KEY,
    address VARCHAR(255) NOT NULL,
    price DECIMAL(15, 2) NOT NULL,
    type ENUM('Casa', 'Departamento', 'Terreno') NOT NULL,
    description TEXT,
    status ENUM('Disponible', 'Vendida', 'Alquilada', 'Bajo Oferta') DEFAULT 'Disponible',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de clientes
CREATE TABLE clients (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    phone VARCHAR(15) NOT NULL,
    comments TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de asociación cliente-propiedad
CREATE TABLE client_property (
    id INT AUTO_INCREMENT PRIMARY KEY,
    client_id INT NOT NULL,
    property_id INT NOT NULL,
    FOREIGN KEY (client_id) REFERENCES clients(id),
    FOREIGN KEY (property_id) REFERENCES properties(id)
);

-- Tabla de citas
CREATE TABLE appointments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    client_id INT NOT NULL,
    property_id INT NOT NULL,
    agent_id INT NOT NULL,
    date DATE NOT NULL,
    time TIME NOT NULL,
    status ENUM('Pendiente', 'Completada', 'Cancelada') DEFAULT 'Pendiente',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (client_id) REFERENCES clients(id),
    FOREIGN KEY (property_id) REFERENCES properties(id),
    FOREIGN KEY (agent_id) REFERENCES users(id)
);

-- Tabla de transacciones
CREATE TABLE transactions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    property_id INT NOT NULL,
    client_id INT NOT NULL,
    agent_id INT NOT NULL,
    transaction_type ENUM('Venta', 'Alquiler') NOT NULL,
    amount DECIMAL(15, 2) NOT NULL,
    date DATE NOT NULL,
    conditions TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (property_id) REFERENCES properties(id),
    FOREIGN KEY (client_id) REFERENCES clients(id),
    FOREIGN KEY (agent_id) REFERENCES users(id)
);

-- Tabla de documentos
CREATE TABLE documents (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(100) NOT NULL,
    path VARCHAR(255) NOT NULL,
    associated_id INT NOT NULL, -- Puede ser cliente, propiedad o transacción según el contexto
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de registros de actividad (logs)
CREATE TABLE user_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    action VARCHAR(255) NOT NULL,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

INSERT INTO users (name, email, password, role) 
VALUES ('Administrador', 'admin@example.com', 'password123', 'Admin');
