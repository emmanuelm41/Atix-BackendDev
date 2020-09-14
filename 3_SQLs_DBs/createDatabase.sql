CREATE DATABASE `ATIX`;
USE `ATIX`;

create table Usuario
(
	id int not null
		primary key,
	username varchar(255) null,
	password varchar(255) null
);

create table Persona
(
	id int not null
		primary key,
	idUsuario int null,
	nombre varchar(255) null,
	apellido varchar(255) null,
	fechaNac date null,
	constraint Persona_Usuario_id_fk
		foreign key (idUsuario) references Usuario (id)
);

