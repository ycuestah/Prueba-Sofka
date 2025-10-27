# Prueba Sofka - Automatización de Pruebas

Este repositorio contiene una suite de pruebas automatizadas desarrolladas para la evaluación técnica de Sofka Technologies, incluyendo pruebas end-to-end con Playwright y pruebas de API REST con Postman.

## 🚀 Descripción

Suite de automatización completa que incluye:
- **Pruebas E2E**: E-commerce, validación de formularios y flujos completos de usuario
- **Pruebas de API**: Testing de servicios REST utilizando PetStore API
- **Colecciones Postman**: Casos de prueba organizados para APIs

## 🛠️ Tecnologías Utilizadas

- **[Playwright](https://playwright.dev/)** - Framework de automatización web
- **[Postman](https://www.postman.com/)** - Testing de APIs REST
- **JavaScript/Node.js** - Lenguaje de programación
- **PetStore API** - API de demostración para testing
- **GitHub Actions** - CI/CD (opcional)

## 📋 Prerequisitos

Antes de ejecutar las pruebas, asegúrate de tener instalado:

- [Node.js](https://nodejs.org/) (versión 14 o superior)
- [Git](https://git-scm.com/)

## 🔧 Instalación

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/ycuestah/Prueba-Sofka.git
   cd Prueba-Sofka
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Instalar navegadores de Playwright:**
   ```bash
   npx playwright install
   ```

## 🎮 Ejecución de Pruebas

### Ejecutar todas las pruebas
```bash
npx playwright test
```

### Ejecutar una prueba específica
```bash
npx playwright test ecommerce-test.spec.js
```

### Ejecutar pruebas en modo debug
```bash
npx playwright test --debug
```

### Ejecutar pruebas con interfaz gráfica
```bash
npx playwright test --ui
```

## 📁 Estructura del Proyecto

```
Prueba-Sofka/
├── tests/
│   ├── ecommerce-test.spec.js    # Pruebas de e-commerce
│   └── ...                       # Otras pruebas
├── playwright.config.js          # Configuración de Playwright
├── package.json                  # Dependencias del proyecto
└── README.md                     # Documentación
```

## 🧪 Casos de Prueba Incluidos

### E-commerce Test Suite
- ✅ Navegación por catálogo de productos
- ✅ Añadir productos al carrito
- ✅ Proceso completo de checkout
- ✅ Validación de formularios
- ✅ Confirmación de compra

**Sitio de prueba:** [DemoBlaze](https://www.demoblaze.com/)

**Flujo de prueba:**
1. Selección de dos productos diferentes
2. Adición al carrito con manejo de diálogos
3. Proceso de checkout con datos de prueba
4. Finalización exitosa de la compra

## 📊 Reportes

Los reportes de ejecución se generan automáticamente en:
- `test-results/` - Screenshots y videos de fallos
- `playwright-report/` - Reporte HTML detallado

Para visualizar el reporte:
```bash
npx playwright show-report
```

## 🔍 Datos de Prueba

Los tests utilizan los siguientes datos de ejemplo:

| Campo | Valor |
|-------|-------|
| Nombre | Yas |
| País | Uruguay |
| Tarjeta de Crédito | 1234567898966355 |
| Mes | 12 |
| Año | 2025 |

## 📈 Configuración Avanzada

### Configurar diferentes navegadores
```javascript
// playwright.config.js
use: {
  browserName: 'chromium', // 'firefox', 'webkit'
  headless: false,         // true para modo headless
  viewport: { width: 1280, height: 720 },
}
```

### Timeouts personalizados
```javascript
test.setTimeout(60000); // 60 segundos
```

## 🐛 Troubleshooting

### Problemas comunes:

1. **Error: Cannot find module '@playwright/test'**
   ```bash
   npm install @playwright/test
   ```

2. **Navegadores no instalados**
   ```bash
   npx playwright install
   ```

3. **Timeouts en elementos**
   - Verificar selectores
   - Aumentar timeout si es necesario
   - Usar `waitForSelector()` para elementos dinámicos

## 🤝 Contribución

1. Fork el proyecto
2. Crear una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -am 'Añadir nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Crear un Pull Request

## 📋 Checklist de Pruebas

- [ ] Todas las pruebas pasan localmente
- [ ] Código sigue las convenciones establecidas
- [ ] Documentación actualizada
- [ ] Screenshots/videos de evidencia incluidos

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## 👤 Autor

**[Tu Nombre]**
- GitHub: [@ycuestah](https://github.com/ycuestah)
- LinkedIn: [Tu LinkedIn]

## 🙏 Agradecimientos

- Sofka Technologies por la oportunidad
- Playwright Team por la excelente herramienta de testing
- DemoBlaze por proporcionar el sitio de pruebas

---

⭐ Si este proyecto te ha sido útil, no olvides darle una estrella en GitHub!

## 📞 Contacto

Para cualquier pregunta o sugerencia, no dudes en contactar:
- 📧 Email: [tu-email@ejemplo.com]
- 💼 LinkedIn: [Tu perfil de LinkedIn]

---

**Desarrollado con ❤️ para Sofka Technologies**