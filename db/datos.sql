create database ruta_magica;
use ruta_magica;

create table propietarios (
    propietario_id int primary key,
    nombre_propietario varchar(255),
    correo_electronico_propietario varchar(255)
);

CREATE TABLE alojamientos (
    alojamiento_id INT AUTO_INCREMENT PRIMARY KEY,
    nombre_alojamiento VARCHAR(255),
    ubicacion_alojamiento VARCHAR(255),
    precio_alojamiento DECIMAL(10, 2),
    propietario_id INT,
    FOREIGN KEY (propietario_id) REFERENCES propietarios(propietario_id)
);


create table reservas (
    reserva_id int AUTO_INCREMENT primary key,
    alojamiento_id int,
    nombre_cliente_reserva varchar(255),
    correo_electronico_cliente_reserva varchar(255),
    fecha_inicio_reserva date,
    fecha_finalizacion_reserva date,
    constraint fk_alojamiento_reserva foreign key (alojamiento_id) references alojamientos(alojamiento_id)
);

insert into propietarios (propietario_id, nombre_propietario, correo_electronico_propietario)
values
    (1, 'Juan Pérez', 'juan.perez@example.com'),
    (2, 'María Rodríguez', 'maria.rodriguez@example.com'),
    (3, 'Carlos Sánchez', 'carlos.sanchez@example.com'),
    (4, 'Laura García', 'laura.garcia@example.com'),
    (5, 'Pedro López', 'pedro.lopez@example.com');

insert into alojamientos (alojamiento_id, nombre_alojamiento, ubicacion_alojamiento, precio_alojamiento, propietario_id)
values
    (1, 'Casa de Playa', 'Playa del Sol', 150.00, 1),
    (2, 'Cabaña en el Bosque', 'Bosque Encantado', 100.00, 2),
    (3, 'Apartamento en la Ciudad', 'Centro Urbano', 120.00, 3),
    (4, 'Casa Rural', 'Campo Tranquilo', 80.00, 4),
    (5, 'Villa en la Montaña', 'Montaña Alta', 200.00, 5);

insert into reservas (reserva_id, alojamiento_id, nombre_cliente_reserva, correo_electronico_cliente_reserva, fecha_inicio_reserva, fecha_finalizacion_reserva)
values
    (1, 1, 'Cliente 1', 'cliente1@example.com', '2023-09-15', '2023-09-20'),
    (2, 2, 'Cliente 2', 'cliente2@example.com', '2023-10-10', '2023-10-15'),
    (3, 3, 'Cliente 3', 'cliente3@example.com', '2023-11-05', '2023-11-10'),
    (4, 4, 'Cliente 4', 'cliente4@example.com', '2023-12-20', '2023-12-25'),
    (5, 5, 'Cliente 5', 'cliente5@example.com', '2024-01-08', '2024-01-15');
