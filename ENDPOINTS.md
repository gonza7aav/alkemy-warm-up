# Endpoints

## Listar posts

```http
GET /posts
```

Posibles respuestas:

- `200 OK`

  ```json
  [
    {
      "id": 0,
      "title": "un_titulo",
      "image": "https://url.de.una.imagen.jpg",
      "creationDate": "2000-01-02T00:00:00.000Z",
      "Category": {
        "id": 0,
        "name": "una_categoria"
      }
    },
    {
      "id": 1,
      "title": "otro_titulo",
      "image": "https://url.de.otra.imagen.jpg",
      "creationDate": "2000-01-01T00:00:00.000Z",
      "Category": {
        "id": 1,
        "name": "otra_categoria"
      }
    }
  ]
  ```

- `500 Internal Server Error`

## Buscar post

```http
GET /posts/:id
```

Validaciones:

- id:
  - Requerido
  - Debe ser un número entero
  - Debe estar asociado a un post

Posibles respuestas:

- `200 OK`

  ```json
  {
    "id": 0,
    "title": "un_titulo",
    "content": "el_contenido",
    "image": "https://url.de.una.imagen.jpg",
    "creationDate": "2000-01-01T00:00:00.000Z",
    "category": 0,
    "Category": {
      "id": 0,
      "name": "una_categoria"
    }
  }
  ```

- `400 Bad Request` : Error al validar los datos

  ```json
  {
    "errors": ["algunos_mensajes_de_error"]
  }
  ```

- `404 Not Found` : No se encontró el post indicado
- `500 Internal Server Error`

## Crear post

```http
POST /posts

{
  "title":"un_titulo",
  "content":"el_contenido",
  "image":"https://url.de.una.imagen.jpg",
  "category":0
}
```

Validaciones:

- title:
  - Requerido
  - No puede ser vacío
- content:
  - Requerido
  - No puede ser vacío
- image:
  - Debe ser una URL válida
  - Debe terminar con una extensión soportada (ver [checkImageURL](middleware/util.js))
  - Debe ser un imagen alcanzable
- category:
  - Requerido
  - Debe ser un número entero
  - Debe estar asociado a una categoría

Posibles respuestas:

- `201 Created`
- `400 Bad Request` : Error al validar los datos

  ```json
  {
    "errors": ["algunos_mensajes_de_error"]
  }
  ```

- `404 Not Found` : No se encontró el elemento indicado
- `500 Internal Server Error`

## Editar post

```http
PATCH /posts/:id

{
  "title":"un_titulo",
  "content":"el_contenido",
  "image":"https://url.de.una.imagen.jpg",
  "category":0
}
```

Validaciones:

- id:
  - Requerido
  - Debe ser un número entero
  - Debe estar asociado a un post
- title:
  - Requerido
  - No puede ser vacío
- content:
  - Requerido
  - No puede ser vacío
- image:
  - Debe ser una URL válida
  - Debe terminar con una extensión soportada (ver [checkImageURL](middleware/util.js))
  - Debe ser un imagen alcanzable
- category:
  - Requerido
  - Debe ser un número entero
  - Debe estar asociado a una categoría

Posibles respuestas:

- `200 OK`
- `400 Bad Request` : Error al validar los datos

  ```json
  {
    "errors": ["algunos_mensajes_de_error"]
  }
  ```

- `404 Not Found` : No se encontró el elemento indicado
- `500 Internal Server Error`

## Borrar post

```http
DELETE /posts/:id
```

Validaciones:

- id:
  - Requerido
  - Debe ser un número entero
  - Debe estar asociado a un post

Posibles respuestas:

- `200 OK`
- `400 Bad Request` : Error al validar los datos

  ```json
  {
    "errors": ["algunos_mensajes_de_error"]
  }
  ```

- `404 Not Found` : No se encontró el post indicado
- `500 Internal Server Error`
