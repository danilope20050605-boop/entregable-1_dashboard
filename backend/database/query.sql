-- 1. Crear la base de datos
CREATE DATABASE gestion_usuarios;

USE gestion_usuarios;

-- 2. Crear la tabla
CREATE TABLE IF NOT EXISTS usuario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    lastname VARCHAR(100) NOT NULL,
    user VARCHAR(50) NOT NULL UNIQUE,
    correo VARCHAR(150) NOT NULL,
    categoria ENUM('Administrador', 'Soporte', 'Cliente', 'Invitado') DEFAULT 'Cliente',
    estado ENUM('Activo', 'Inactivo', 'Pendiente') DEFAULT 'Pendiente',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 3. Insertar registros de prueba
INSERT INTO usuario (name, lastname, user, correo, categoria, estado) VALUES
('Piero', 'Cassano', 'cassx012', 'cassanopiero9@gmail.com', 'Administrador', 'Activo'),
('Jose', 'Ruiz', 'joser', 'jruiz@example.com', 'Soporte', 'Activo'),
('Maria', 'Gomez', 'mariag', 'mgomez@example.com', 'Cliente', 'Pendiente'),
('Carlos', 'Sánchez', 'csanchez', 'csanchez@example.com', 'Invitado', 'Inactivo'),
('Ana', 'Lucia', 'alucia', 'alucia@example.com', 'Cliente', 'Activo'),
('Luis', 'Fernández', 'lfernandez', 'luis.fer@gmail.com', 'Soporte', 'Pendiente'),
('Elena', 'Beltrán', 'ebeltran', 'elena_b@outlook.com', 'Cliente', 'Activo'),
('Roberto', 'Díaz', 'robertd', 'rdiaz@empresa.pe', 'Administrador', 'Inactivo'),
('Lucía', 'Mendoza', 'lu_men', 'lucia.m@senati.pe', 'Invitado', 'Activo'),
('Kevin', 'Torres', 'ktorres', 'kevin.t@soporte.com', 'Soporte', 'Activo');

SELECT * FROM usuario;