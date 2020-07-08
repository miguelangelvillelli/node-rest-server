Usuario.find

Dentro del primer parámetro es para poner un filtro
Ejemplo: Usuario.find({ google: true })
Si lo dejo vació trae todos.

El segundo parámetro es un string y sirve para poner los campos que queremos que muestre el query.
ejemplo "nombre mail"

Despues tiene parámetros para hacer paginación como ser

.skip
.limit

y con el comando
.exec se ejecuta

.exec tiene un callback y recibe o un error o la lista de usuarios en este caso.
