-- Script MySQL para la base de datos actualizada
DROP DATABASE IF EXISTS bd_panaderia;
CREATE DATABASE bd_panaderia;
USE bd_panaderia;

CREATE TABLE usuarios (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Creación de la tabla clientes con tipo ENUM
CREATE TABLE IF NOT EXISTS clientes (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    direccion VARCHAR(255) NOT NULL,
    dni VARCHAR(20) NOT NULL,
    metodo_pago ENUM('yape', 'plin', 'tarjeta', 'efectivo'),  -- Aquí usamos ENUM para los métodos de pago
    metodo_entrega ENUM('delivery', 'pickup'),  -- Aquí usamos ENUM para los métodos de entrega
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE pedidos (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    numero_pedido VARCHAR(100) UNIQUE,
    cliente_id BIGINT,
    subtotal DOUBLE,
    igv DOUBLE,
    envio DOUBLE,
    total DOUBLE,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (cliente_id) REFERENCES clientes(id)
);

CREATE TABLE detalle_pedidos (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    pedido_id BIGINT,
    producto_nombre VARCHAR(255),
    cantidad INT,
    precio_unitario DOUBLE,
    FOREIGN KEY (pedido_id) REFERENCES pedidos(id)
);

CREATE TABLE estado_pedidos (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  pedido_id BIGINT,
  estado VARCHAR(100) DEFAULT 'En preparación',
  tracking VARCHAR(100),
  fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (pedido_id) REFERENCES pedidos(id)
);

CREATE TABLE categorias (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  imagen_url TEXT
);

CREATE TABLE productos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  precio DECIMAL(6,2) NOT NULL,
  imagen_url TEXT,
  categoria_id INT,
  FOREIGN KEY (categoria_id) REFERENCES categorias(id)
);


SELECT * FROM productos WHERE categoria_id IS NULL;
SELECT * FROM productos;
SELECT * FROM categorias;
 select * from usuarios;
 select * from clientes;
  select * from pedidos;
 select * from detalle_pedidos;
   select * from estado_pedidos;
   