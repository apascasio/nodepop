# Nodepop 
**API que dará servicio a una app de venta de artículos de segunda mano**

##Instalando Dependencias
  * npm install

##Scripts
  * npm start: inicia servidor  por el puerto 3000.
  * npm run dev: inicia en modo *'desarrollo'*  y por el *'puerto 3000'*.
  * npm run installBD: inicializa Base de Datos, y carga datos

##Uso de API
  * http://domain/apiv1/anuncios
  *http://localhost:3000/apiv1/usuario/es?nombre=nombreusuario&email=email@domain.com&clave=clave (metodo post)
  *http://localhost:3000/usuario/authenticate/en (metodo post)


##API v1 info
GET /anuncios

Input Query:

start: {int} skip records
limit: {int} limit to records
sort: {string} field name to sort by
includeTotal: {bool} whether to include the count of total records without filters
tag: {string} tag name to filter
venta: {bool} filter by venta or not
precio: {range} filter by price range, examples 10-90, -90, 10-
nombre: {string} filter names beginning with the string
Input query example: ?start=0&limit=2&sort=precio&includeTotal=true&tag=mobile&venta=true&precio=-90&nombre=bi

**Result:** 
{

    "ok": true,
    "data": 

[

{

    "_id": "562d2596fb97ce7b0a0a6e07",
    "venta": false,
    "precio": 10,
    "foto": "http://localhost:3000/imagenes/anuncios/iphone4.jpg",
    "__v": 0,
    "tags": 

    [
        "iphone",
        "iphone 4"
    ]

},
{

    "_id": "562d25f4fb97ce7b0a0a6e08",
    "venta": false,
    "precio": 10,
    "foto": "http://localhost:3000/imagenes/anuncios/iphone4.jpg",
    "__v": 0,
    "tags": 

            [
                "iphone",
                "iphone 4"
            ]
        }
    ]

}


##Ver API desplegada 
  * http://apascasio.cloudapp.net/apiv1/anuncios
  * http://apascasio.cloudapp.net  este es el dominio principal
  * http://apascasio.cloudapp.net/images/anuncios/mac.jpg    esta es una imagen utilizada en los ejemplos
