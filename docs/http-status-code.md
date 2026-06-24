# HTTP Status Codes

## Overview

Los códigos HTTP representan el resultado de una petición al servidor.

```ts
export const HTTP_STATUS = {
  // Success
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,

  // Client errors
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  TOO_MANY_REQUESTS: 429,

  // Server errors
  INTERNAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
} as const;
```

---

# Success Responses

## 200 OK

La petición fue exitosa.

### Casos comunes

```txt
Obtener productos
Obtener carrito
Obtener perfil
Obtener órdenes
```

### Ejemplo

```http
GET /products
```

```http
200 OK
```

---

## 201 CREATED

Se creó un nuevo recurso.

### Casos comunes

```txt
Crear pedido
Crear dirección
Registrar usuario
Crear reseña
```

### Ejemplo

```http
POST /orders
```

```http
201 Created
```

---

## 204 NO_CONTENT

La operación fue exitosa pero no devuelve información.

### Casos comunes

```txt
Eliminar producto del carrito
Eliminar dirección
Eliminar favorito
```

### Ejemplo

```http
DELETE /cart/items/1
```

```http
204 No Content
```

⚠️ No intentar ejecutar:

```ts
response.json();
```

porque no existe cuerpo de respuesta.

---

# Client Errors

## 400 BAD_REQUEST

La petición está mal construida.

### Casos comunes

```txt
Parámetros inválidos
Payload incorrecto
Tipos de datos incorrectos
```

### Ejemplo

```http
GET /products?page=abc
```

---

## 401 UNAUTHORIZED

El usuario no está autenticado.

### Casos comunes

```txt
Token expirado
Cookie inválida
Sesión inexistente
```

### Estrategia Frontend

```txt
401
↓
Refresh Token
↓
Reintentar Request
```

---

## 403 FORBIDDEN

El usuario sí está autenticado, pero no tiene permisos.

### Casos comunes

```txt
Cliente intentando acceder al panel admin
Usuario sin permisos suficientes
```

### Ejemplo

```http
GET /admin/orders
```

```http
403 Forbidden
```

---

## 404 NOT_FOUND

El recurso solicitado no existe.

### Casos comunes

```txt
Producto inexistente
Orden inexistente
Ruta inválida
```

### Ejemplo

```http
GET /products/999999
```

```http
404 Not Found
```

---

## 409 CONFLICT

Existe un conflicto con el estado actual del sistema.

### Casos comunes

```txt
Email ya registrado
SKU duplicado
Cupón ya utilizado
Username existente
```

### Ejemplo

```http
POST /register
```

```http
409 Conflict
```

---

## 422 UNPROCESSABLE_ENTITY

Error de validación.

Es probablemente el código más utilizado en Laravel.

### Casos comunes

```txt
Campo requerido faltante
Email inválido
Password inválida
Datos que no cumplen reglas de negocio
```

### Ejemplo

```json
{
  "message": "Validation failed",
  "errors": {
    "email": ["El campo email es obligatorio"]
  }
}
```

```http
422 Unprocessable Entity
```

### Uso Frontend

Ideal para mostrar errores por campo:

```ts
setErrors(response.errors);
```

---

## 429 TOO_MANY_REQUESTS

Se alcanzó el límite permitido de solicitudes.

### Casos comunes

```txt
Demasiados intentos de login
Rate limiting
Protección anti abuso
```

### Ejemplo

```http
429 Too Many Requests
```

---

# Server Errors

## 500 INTERNAL_SERVER_ERROR

Error inesperado del servidor.

### Casos comunes

```txt
Error SQL
Excepción no controlada
Bug de aplicación
```

### Acción Frontend

```txt
Mostrar mensaje genérico
Registrar error
Permitir reintento
```

---

## 502 BAD_GATEWAY

Error de comunicación entre servidores.

### Casos comunes

```txt
Nginx no puede comunicarse con PHP-FPM
Problemas de infraestructura
Proxy inválido
```

---

## 503 SERVICE_UNAVAILABLE

Servicio temporalmente no disponible.

### Casos comunes

```txt
Modo mantenimiento
Servidor saturado
Deploy en proceso
```

### Acción Frontend

```txt
Mostrar pantalla de mantenimiento
Permitir reintento posterior
```

---

# Status Más Utilizados en un Ecommerce

Los siguientes códigos cubren aproximadamente el 95% de los casos de uso:

```ts
HTTP_STATUS.OK;
HTTP_STATUS.CREATED;

HTTP_STATUS.UNAUTHORIZED;
HTTP_STATUS.FORBIDDEN;
HTTP_STATUS.NOT_FOUND;
HTTP_STATUS.CONFLICT;
HTTP_STATUS.UNPROCESSABLE_ENTITY;

HTTP_STATUS.INTERNAL_SERVER_ERROR;
```

---

# Guía Rápida

```txt
200 → Todo bien
201 → Recurso creado
204 → Éxito sin contenido

400 → Request inválido
401 → No autenticado
403 → Sin permisos
404 → No existe
409 → Conflicto
422 → Validación fallida
429 → Demasiadas solicitudes

500 → Error del servidor
502 → Error de infraestructura
503 → Servicio no disponible
```
