create database ruta_magica
use ruta_magica

CREATE TABLE Propietarios (
    PropietarioID INT PRIMARY KEY,
    Nombre VARCHAR(255),
    CorreoElectronico VARCHAR(255)
);


CREATE TABLE Alojamientos (
    AlojamientoID INT PRIMARY KEY,
    Nombre VARCHAR(255),
    Ubicacion VARCHAR(255),
    Precio DECIMAL(10, 2),
    PropietarioID INT,
    FOREIGN KEY (PropietarioID) REFERENCES Propietarios(PropietarioID)
);

CREATE TABLE Reservas (
    ReservaID INT PRIMARY KEY,
    AlojamientoID INT,
    NombreCliente VARCHAR(255),
    CorreoElectronicoCliente VARCHAR(255),
    FechaInicio DATE,
    FechaFinalizacion DATE,
    CONSTRAINT FK_Alojamiento_Reserva FOREIGN KEY (AlojamientoID) REFERENCES Alojamientos(AlojamientoID)
);



INSERT INTO Propietarios (PropietarioID, Nombre, CorreoElectronico)
VALUES
    (1, 'Juan Pérez', 'juan.perez@example.com'),
    (2, 'María Rodríguez', 'maria.rodriguez@example.com'),
    (3, 'Carlos Sánchez', 'carlos.sanchez@example.com'),
    (4, 'Laura García', 'laura.garcia@example.com'),
    (5, 'Pedro López', 'pedro.lopez@example.com');


INSERT INTO Alojamientos (AlojamientoID, Nombre, Ubicacion, Precio, PropietarioID)
VALUES
    (1, 'Casa de Playa', 'Playa del Sol', 150.00, 1),
    (2, 'Cabaña en el Bosque', 'Bosque Encantado', 100.00, 2),
    (3, 'Apartamento en la Ciudad', 'Centro Urbano', 120.00, 3),
    (4, 'Casa Rural', 'Campo Tranquilo', 80.00, 4),
    (5, 'Villa en la Montaña', 'Montaña Alta', 200.00, 5);


INSERT INTO Reservas (ReservaID, AlojamientoID, NombreCliente, CorreoElectronicoCliente, FechaInicio, FechaFinalizacion)
VALUES
    (1, 1, 'Cliente 1', 'cliente1@example.com', '2023-09-15', '2023-09-20'),
    (2, 2, 'Cliente 2', 'cliente2@example.com', '2023-10-10', '2023-10-15'),
    (3, 3, 'Cliente 3', 'cliente3@example.com', '2023-11-05', '2023-11-10'),
    (4, 4, 'Cliente 4', 'cliente4@example.com', '2023-12-20', '2023-12-25'),
    (5, 5, 'Cliente 5', 'cliente5@example.com', '2024-01-08', '2024-01-15');
