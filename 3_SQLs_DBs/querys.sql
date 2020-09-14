-- Usuario
-- id integer
-- username varchar(255)
-- password varchar(255)

-- Persona
-- id integer
-- idUsuario integer
-- nombre varchar(255)
-- apellido varchar(255)
-- fechaNac date

-- Point a)
select U.username from Usuario as U inner join Persona as P on U.id = P.idUsuario where P.nombre = "Jorg";

-- Point b)
select MONTH(P.fechaNac) from Usuario as U inner join Persona as P on U.id = P.idUsuario GROUP BY MONTH(P.fechaNac) having count(U.id) > 0;
