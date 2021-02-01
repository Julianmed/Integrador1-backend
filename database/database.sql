/*CREATE DATABASE CONTROL_GASTOS;

USE CONTROL_GASTOS;

CREATE TABLE USUARIO(
    usuario VARCHAR(50) NOT NULL,
    nombre VARCHAR(100) NOT NULL
);

ALTER TABLE USUARIO ADD PRIMARY KEY (usuario);
ALTER TABLE USUARIO MODIFY usuario VARCHAR(50) NOT NULL AUTO_INCREMENT;

CREATE TABLE CATEGORIA(
    id_categoria INT NOT NULL,
    usuario VARCHAR(50) NOT NULL,
    nombre_categoria VARCHAR(50) NOT NULL,
    descripcion VARCHAR(255)
);

ALTER TABLE CATEGORIA ADD PRIMARY KEY (id_categoria);
ALTER TABLE CATEGORIA MODIFY id_categoria INT NOT NULL AUTO_INCREMENT;

CREATE TABLE CONCEPTO(
    id_concepto INT NOT NULL,
    id_categoria INT NOT NULL,
    usuario VARCHAR(50) NOT NULL,
    nombre_concepto VARCHAR(100) NOT NULL,
    descripcion VARCHAR(255)
);

ALTER TABLE CONCEPTO ADD PRIMARY KEY (id_concepto);
ALTER TABLE CONCEPTO MODIFY id_concepto INT NOT NULL AUTO_INCREMENT;

CREATE TABLE PRODUCTO_SERVICIO(
    id_producto_servicio INT NOT NULL,
    id_concepto INT NOT NULL,
    id_categoria INT NOT NULL,
    usuario VARCHAR(50) NOT NULL,
    nombre_producto_servicio VARCHAR(100) NOT NULL,
    unidad VARCHAR(20) NOT NULL,
    descripcion VARCHAR(255)
);

ALTER TABLE PRODUCTO_SERVICIO ADD PRIMARY KEY (id_producto_servicio);
ALTER TABLE PRODUCTO_SERVICIO MODIFY id_producto_servicio INT NOT NULL AUTO_INCREMENT;

CREATE TABLE PUNTO_ADQUISICION(
    id_punto INT NOT NULL,
    usuario VARCHAR(50) NOT NULL,
    nombre_punto VARCHAR(100) NOT NULL,
    direccion VARCHAR(60) NOT NULL,
    descripcion VARCHAR(255)
);

ALTER TABLE PUNTO_ADQUISICION ADD PRIMARY KEY (id_punto);
ALTER TABLE PUNTO_ADQUISICION MODIFY id_punto INT NOT NULL AUTO_INCREMENT;


CREATE TABLE MOVIMIENTO(
    consecutivo INT NOT NULL,
    id_punto INT NOT NULL,
    id_producto_servicio INT NOT NULL,
    id_concepto INT NOT NULL,
    id_categoria INT NOT NULL,
    usuario VARCHAR(100) NOT NULL,
    fecha DATE NOT NULL,
    cantidad INT NOT NULL,
    valor_unitario DECIMAL(10,2) NOT NULL,
    tipo_movimiento VARCHAR(15) NOT NULL,
    CHECK (tipo_movimiento IN('Adquirido', 'Estimado'))
);

ALTER TABLE MOVIMIENTO ADD PRIMARY KEY (consecutivo);
ALTER TABLE MOVIMIENTO MODIFY consecutivo INT NOT NULL AUTO_INCREMENT;
*/

/*Si hay grandes cambios a las tablas
DROP TABLE USUARIO;
DROP TABLE CATEGORIA;
DROP TABLE CONCEPTO;
DROP TABLE PRODUCTO_SERVICIO;
DROP TABLE PUNTO_ADQUISICION;
DROP TABLE MOVIMIENTO;*/
