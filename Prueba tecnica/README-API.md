# 🔌 API Testing - PetStore REST Services

Este documento contiene la documentación completa para las pruebas de API automatizadas utilizando la PetStore API como servicio de ejemplo.

## 📋 Índice

- [Información General](#-información-general)
- [Tecnologías](#-tecnologías)
- [Prerequisitos](#-prerequisitos)
- [Configuración](#-configuración)
- [Colección Postman](#-colección-postman)
- [Casos de Prueba](#-casos-de-prueba)
- [Ejecución](#-ejecución)
- [Validaciones](#-validaciones)
- [Troubleshooting](#-troubleshooting)

## 📊 Información General

### PetStore API
- **URL Base**: `https://petstore.swagger.io/v2`
- **Tipo**: REST API
- **Formato**: JSON
- **Autenticación**: No requerida para endpoints básicos
- **Documentación**: [Swagger PetStore](https://petstore.swagger.io/)

### Objetivo de las Pruebas
Validar el correcto funcionamiento de los servicios REST de gestión de mascotas, incluyendo operaciones CRUD y filtros de búsqueda.

## 🛠️ Tecnologías

- **Postman** - Herramienta principal para testing de APIs
- **Newman** - CLI de Postman para ejecución automatizada
- **PetStore API** - Servicio REST de ejemplo
- **JSON** - Formato de intercambio de datos
- **HTTP/HTTPS** - Protocolo de comunicación

## 📋 Prerequisitos

### Software Requerido
- [Postman](https://www.postman.com/downloads/) - Versión desktop o web
- [Newman](https://www.npmjs.com/package/newman) - Para ejecución por CLI (opcional)
- [Node.js](https://nodejs.org/) - Para Newman CLI

### Instalación de Newman (Opcional)
```bash
npm install -g newman
```

## ⚙️ Configuración

### 1. Importar Colección en Postman

1. **Abrir Postman**
2. **Hacer clic** en "Import" (botón superior izquierdo)
3. **Seleccionar** el archivo `PetStore.postman_collection.json`
4. **Confirmar** la importación

### 2. Configurar Variables (Si es necesario)

```json
{
  "baseUrl": "https://petstore.swagger.io/v2",
  "petId": "12345",
  "status": "available"
}
```

## 📁 Colección Postman

### Estructura de la Colección
```
PetStore API Tests/
├── 📝 Adicionar pets          # POST /pet
├── 🔍 Status filter          # GET /pet/findByStatus
├── ✏️ Update pets            # PUT /pet
└── 🆔 ID filter              # GET /pet/{petId}
```

### Endpoints Incluidos

| Método | Endpoint | Descripción | Validaciones |
|--------|----------|-------------|--------------|
| POST | `/pet` | Crear nueva mascota | Status 200, ID generado |
| GET | `/pet/findByStatus` | Filtrar por estado | Status 200, Array response |
| PUT | `/pet/{petId}` | Actualizar mascota | Status 200, Datos actualizados |
| GET | `/pet/{petId}` | Buscar por ID | Status 200, Pet específico |

## 🧪 Casos de Prueba

### 1. Adicionar Pets (POST)
**Endpoint**: `POST /pet`

**Request Body**:
```json
{
  "id": 12345,
  "category": {
    "id": 1,
    "name": "Dogs"
  },
  "name": "Buddy",
  "photoUrls": [
    "https://example.com/photo1.jpg"
  ],
  "tags": [
    {
      "id": 1,
      "name": "friendly"
    }
  ],
  "status": "available"
}
```

**Validaciones**:
- ✅ Status Code: 200
- ✅ Response contiene ID
- ✅ Nombre correcto en response
- ✅ Status "available"

### 2. Status Filter (GET)
**Endpoint**: `GET /pet/findByStatus?status=available`

**Parámetros**:
- `status`: available, pending, sold

**Validaciones**:
- ✅ Status Code: 200
- ✅ Response es array
- ✅ Pets con status correcto
- ✅ Estructura JSON válida

### 3. Update Pets (PUT)
**Endpoint**: `PUT /pet`

**Request Body**:
```json
{
  "id": 12345,
  "category": {
    "id": 1,
    "name": "Dogs"
  },
  "name": "Buddy Updated",
  "photoUrls": [
    "https://example.com/photo_updated.jpg"
  ],
  "tags": [
    {
      "id": 1,
      "name": "very-friendly"
    }
  ],
  "status": "pending"
}
```

**Validaciones**:
- ✅ Status Code: 200
- ✅ Datos actualizados correctamente
- ✅ ID permanece igual
- ✅ Cambios reflejados

### 4. ID Filter (GET)
**Endpoint**: `GET /pet/{petId}`

**Path Parameters**:
- `petId`: ID numérico de la mascota

**Validaciones**:
- ✅ Status Code: 200
- ✅ Pet con ID correcto
- ✅ Estructura completa
- ✅ Datos consistentes

## 🚀 Ejecución

### Ejecución en Postman GUI

1. **Seleccionar la colección** "PetStore API Tests"
2. **Hacer clic** en "Run collection"
3. **Configurar parámetros** de ejecución:
   - Iterations: 1
   - Delay: 0ms
   - Data file: None (opcional)
4. **Ejecutar** y revisar resultados

### Ejecución con Newman CLI

**Ejecutar colección completa**:
```bash
newman run PetStore.postman_collection.json
```

**Ejecutar con reporte HTML**:
```bash
newman run PetStore.postman_collection.json -r html
```

**Ejecutar con variables**:
```bash
newman run PetStore.postman_collection.json --env-var "baseUrl=https://petstore.swagger.io/v2"
```

**Ejecutar caso específico**:
```bash
newman run PetStore.postman_collection.json --folder "Adicionar pets"
```

## ✅ Validaciones Implementadas

### Validaciones de Response
```javascript
// Status Code
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

// Response Time
pm.test("Response time is less than 2000ms", function () {
    pm.expect(pm.response.responseTime).to.be.below(2000);
});

// JSON Structure
pm.test("Response is valid JSON", function () {
    pm.response.to.be.json;
});

// Content Validation
pm.test("Pet has required fields", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData).to.have.property('id');
    pm.expect(jsonData).to.have.property('name');
    pm.expect(jsonData).to.have.property('status');
});
```

### Validaciones de Headers
```javascript
pm.test("Content-Type header is present", function () {
    pm.expect(pm.response.headers.get('Content-Type')).to.include('application/json');
});
```

## 📊 Resultados Esperados

### Métricas de Rendimiento
- **Response Time**: < 2000ms por request
- **Success Rate**: 100% (4/4 tests)
- **Total Execution Time**: < 10 segundos

### Estados de Response
- **200 OK**: Operación exitosa
- **404 Not Found**: Pet no encontrado (esperado en algunos casos)
- **400 Bad Request**: Datos inválidos (para testing negativo)

## 🐛 Troubleshooting

### Problemas Comunes

**1. Newman no instalado**
```bash
Error: newman: command not found
```
**Solución**:
```bash
npm install -g newman
```

**2. Colección no encontrada**
```bash
Error: collection could not be loaded
```
**Solución**:
```bash
# Verificar ruta del archivo
ls -la PetStore.postman_collection.json
```

**3. Timeout en requests**
```bash
Error: getaddrinfo ENOTFOUND
```
**Solución**:
- Verificar conexión a internet
- Comprobar URL de la API
- Revisar firewall/proxy

**4. Error 404 en PetStore**
```bash
Status: 404 Not Found
```
**Solución**:
- Verificar que el Pet ID existe
- Usar endpoint correcto
- Comprobar parámetros

### Comandos de Diagnóstico

**Verificar Newman**:
```bash
newman --version
```

**Test de conectividad**:
```bash
curl -I https://petstore.swagger.io/v2/pet/findByStatus?status=available
```

**Validar JSON de colección**:
```bash
node -e "console.log(JSON.parse(require('fs').readFileSync('PetStore.postman_collection.json')))"
```

## 📈 Reportes

### Reporte por Consola
```bash
newman run PetStore.postman_collection.json --reporters cli
```

### Reporte HTML
```bash
newman run PetStore.postman_collection.json --reporters html --reporter-html-export report.html
```

### Reporte JSON
```bash
newman run PetStore.postman_collection.json --reporters json --reporter-json-export report.json
```

## 🔧 Scripts Útiles

### Package.json Scripts
```json
{
  "scripts": {
    "api:test": "newman run PetStore.postman_collection.json",
    "api:report": "newman run PetStore.postman_collection.json -r html",
    "api:verbose": "newman run PetStore.postman_collection.json --verbose"
  }
}
```

### Ejecución con NPM
```bash
npm run api:test
npm run api:report
npm run api:verbose
```

## 📝 Notas de Desarrollo

### Variables de Entorno
- `PETSTORE_BASE_URL`: URL base de la API
- `PET_ID`: ID de mascota para pruebas
- `API_TIMEOUT`: Timeout para requests

### Mejores Prácticas
1. **Usar variables** para datos reutilizables
2. **Implementar cleanup** después de pruebas
3. **Validar tanto casos positivos como negativos**
4. **Mantener datos de prueba consistentes**
5. **Documentar cambios en la colección**

---

## 👥 Autor

**API Testing Specialist**
- Evaluación Técnica - Sofka Technologies
- REST API Testing & Automation

---

*Última actualización: 21 de octubre de 2025*