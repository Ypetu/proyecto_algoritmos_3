# 🌩️ Thunder Client - API Testing para MockAPI

Esta carpeta contiene la colección de Thunder Client para probar la API de compras de MockAPI.

## 📋 Peticiones Incluidas

### 🔍 **Consultas (GET)**
- **📋 Obtener Todas las Compras**: Lista todas las compras en la base de datos
- **🔍 Obtener Compra por ID**: Obtiene una compra específica usando el compraId
- **👤 Obtener Compras por Usuario**: Filtra compras por userId
- **🔎 Buscar Compras por Estado**: Filtra por status (completed, pending, cancelled)

### ➕ **Creación (POST)**
- **➕ Crear Nueva Compra**: Compra con múltiples productos
- **🛒 Crear Compra Simple**: Compra con un solo producto

### ✏️ **Modificación**
- **✏️ Actualizar Compra**: Cambiar el estado de una compra (PUT)
- **🗑️ Eliminar Compra**: Eliminar una compra (DELETE)

## 🚀 Cómo Usar

### 1. **Activar Thunder Client**
- Abre VS Code
- Ve a la barra lateral izquierda
- Busca el ícono de Thunder Client (⚡)
- Haz clic para abrir el panel

### 2. **Importar la Colección**
- En Thunder Client, haz clic en "Collections"
- Selecciona "Import" 
- Navega a `thunder-tests/thunderclient.json`
- Importa también el environment desde `thunder-tests/thunderEnvironment.json`

### 3. **Usar las Variables**
Las peticiones usan variables que puedes modificar:
- `{{compraId}}` - ID de la compra (ejemplo: 12)
- `{{userId}}` - ID del usuario (ejemplo: user123)
- `{{status}}` - Estado de la compra (completed, pending, cancelled)

### 4. **Ejemplos de Uso**

#### 📋 **Ver todas las compras**
```
GET {{baseUrl}}
```
Respuesta esperada:
```json
[
  {
    "compraId": "12",
    "userId": "user123",
    "customerEmail": "cliente@ejemplo.com",
    "items": [...],
    "total": 154.55,
    "status": "completed",
    "date": "2025-10-27T17:30:00.000Z"
  }
]
```

#### ➕ **Crear una nueva compra**
```
POST {{baseUrl}}
Body:
{
  "userId": "user123",
  "customerEmail": "cliente@ejemplo.com",
  "items": [
    {
      "productId": 1,
      "title": "Producto de ejemplo",
      "price": 99.99,
      "quantity": 1
    }
  ],
  "total": 99.99,
  "status": "completed",
  "date": "2025-10-27T17:30:00.000Z"
}
```

#### 🔍 **Buscar compra por ID**
```
GET {{baseUrl}}/12
```

#### 👤 **Compras de un usuario específico**
```
GET {{baseUrl}}?userId=user123
```

## 🎯 **URL de la API**
```
Base URL: https://68ff8330e02b16d1753e48c8.mockapi.io/compras/Compras
```

## 📝 **Estructura de Datos**

### Purchase Object:
```json
{
  "compraId": "string", // Generado automáticamente por MockAPI
  "userId": "string",   // ID del usuario que realiza la compra
  "customerEmail": "string",
  "items": [
    {
      "productId": number,
      "title": "string",
      "price": number,
      "quantity": number
    }
  ],
  "total": number,
  "status": "completed" | "pending" | "cancelled",
  "date": "string" // ISO 8601 format
}
```

## 💡 **Tips**
- Cambia los valores de las variables en el Environment para probar diferentes casos
- Usa los tests automáticos para validar las respuestas
- Guarda las respuestas exitosas como ejemplos para documentación
- El `compraId` se genera automáticamente, no lo incluyas en los POST

---
**🛠️ Desarrollado para:** Tienda Beltran - Sistema de E-commerce
**🔗 Tecnologías:** Angular + MockAPI + Thunder Client