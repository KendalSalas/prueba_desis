# Prueba desis

## Versión Php: 8.1.10 

## Versión MySQL: 8.0.32

Se realizó un pequeño formulario para registrar los votos de un usuario.

El código válida que **todos** los campos sean validos (según los requerimientos dados en la prueba) y que el RUT sea único en la tabla \'votos_usuario\' antes de guardar. Caso contrario, mostrará un error. 

El select \"comuna\" depende de la región,
primero debe elegir una y en base a esta elección, se cargarán las
comunas que pertenecientes a la opción elegida.

Para poder revisar y ejecutar la prueba, debe realizar los siguientes pasos:

- Ejecutar el código SQL del archivo sql/prueba_desis, el cual contiene todas las tablas con los datos correspondientes ya cargados. 
- Luego, deberá modificar el archivo conexion/conn.php, debe ajustar las variables \$server_name, \$database, \$username, \$password con los valores correspondientes a su base de datos para poder conectarse con éxito. 
- Una vez hecho eso, levantar el servidor con el comando php -S localhost:su_puerto (este debe ser ejecutado dentro de la carpeta donde se encuentra el proyecto, con un puerto elegido por ustedes).
- Finalmente, redirigirse a la página indicada en la terminal (o a http://localhost:su_puerto) para poder ver la prueba.
