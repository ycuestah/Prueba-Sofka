# ⚡ Performance Testing - JMeter Load Testing

Este documento contiene la documentación completa para las pruebas de rendimiento y carga utilizando Apache JMeter con la FakeStore API.

## 📋 Índice

- [Información General](#-información-general)
- [Tecnologías](#-tecnologías)
- [Prerequisitos](#-prerequisitos)
- [Configuración](#-configuración)
- [Plan de Pruebas](#-plan-de-pruebas)
- [Configuración del Test](#-configuración-del-test)
- [Ejecución](#-ejecución)
- [Métricas y Reportes](#-métricas-y-reportes)
- [Análisis de Resultados](#-análisis-de-resultados)
- [Troubleshooting](#-troubleshooting)

## 📊 Información General

### FakeStore API - Login Endpoint
- **URL Base**: `https://fakestoreapi.com`
- **Endpoint**: `/auth/login`
- **Método**: POST
- **Tipo**: REST API
- **Autenticación**: Username/Password
- **Documentación**: [FakeStore API](https://fakestoreapi.com/docs)

### Objetivo de las Pruebas
Evaluar el rendimiento del endpoint de login bajo diferentes condiciones de carga, midiendo tiempo de respuesta, throughput y capacidad de manejo de usuarios concurrentes.

## 🛠️ Tecnologías

- **Apache JMeter 5.6.3** - Herramienta principal de performance testing
- **JMX Files** - Archivos de configuración de JMeter
- **CSV DataSet** - Fuente de datos para usuarios de prueba
- **HTTP/HTTPS** - Protocolo de comunicación
- **JSON** - Formato de payload y respuesta

## 📋 Prerequisitos

### Software Requerido
- [Java JDK 8+](https://www.oracle.com/java/technologies/downloads/) - Requerido para JMeter
- [Apache JMeter](https://jmeter.apache.org/download_jmeter.cgi) - Versión 5.6.3 o superior
- Editor de texto para modificar archivos CSV

### Verificación de Instalación
```bash
# Verificar Java
java -version

# Verificar JMeter (desde directorio de instalación)
cd C:\JMETER\apache-jmeter-5.6.3\bin
jmeter.bat -v
```

## ⚙️ Configuración

### 1. Estructura de Archivos
```
Automatizaciones/
├── View Results Tree.jmx      # Plan de pruebas JMeter
├── user.csv                   # Datos de usuarios
└── README-PERFORMANCE.md      # Esta documentación
```

### 2. Configurar Datos de Usuario
**Archivo**: `user.csv`
```csv
mor_2314,83r5^_
kevinryan,kev02937@
donero,ewedon
derek,jklg*_56
```

**Formato**: `username,password` (sin cabeceras)

### 3. Modificar Rutas de Archivos
En el archivo JMX, actualizar la ruta del CSV:
```xml
<stringProp name="filename">E:\Trabajo\First Due\Automatizaciones\user.csv</stringProp>
```

## 🧪 Plan de Pruebas

### Configuración del Thread Group
- **👥 Usuarios Concurrentes**: 100 threads
- **⏱️ Ramp-up Period**: 5 segundos
- **🔄 Iteraciones**: 20 loops por usuario
- **📊 Total Requests**: 2,000 requests (100 × 20)

### Configuración de Carga
```xml
<ThreadGroup testname="Login Load Test">
  <intProp name="ThreadGroup.num_threads">100</intProp>
  <intProp name="ThreadGroup.ramp_time">5</intProp>
  <stringProp name="LoopController.loops">20</stringProp>
</ThreadGroup>
```

### Throughput Target
- **🎯 Throughput**: 1,200 requests/min (20 req/seg)
- **⏰ Duración Estimada**: ~1.67 minutos
- **📈 Escalamiento**: 20 usuarios/segundo durante 5 segundos

## 🔧 Configuración del Test

### HTTP Request Configuration
```json
{
  "domain": "fakestoreapi.com",
  "protocol": "https",
  "path": "/auth/login",
  "method": "POST",
  "headers": {
    "Content-Type": "application/json"
  },
  "body": {
    "username": "${user}",
    "password": "${passwd}"
  }
}
```

### Data Source (CSV Dataset)
```xml
<CSVDataSet testname="CSV Data Set Config">
  <stringProp name="filename">user.csv</stringProp>
  <stringProp name="variableNames">user,passwd</stringProp>
  <stringProp name="delimiter">,</stringProp>
  <boolProp name="recycle">true</boolProp>
</CSVDataSet>
```

### Assertions Configuradas
1. **Response Code**: Status 200
2. **Duration**: < 1,500ms
3. **Response Format**: JSON válido

## 🚀 Ejecución

### Ejecución en Modo GUI (Desarrollo)
```bash
# Navegar al directorio de JMeter
cd C:\JMETER\apache-jmeter-5.6.3\bin

# Ejecutar JMeter GUI
jmeter.bat

# Abrir archivo: View Results Tree.jmx
# Ejecutar: Run → Start
```

### Ejecución en Modo CLI (Producción)
```bash
# Ejecución básica
jmeter -n -t "View Results Tree.jmx" -l results.jtl

# Con reporte HTML
jmeter -n -t "View Results Tree.jmx" -l results.jtl -e -o html-report

# Con configuración de memoria
jmeter -n -t "View Results Tree.jmx" -l results.jtl -Xmx4g -Xms1g
```

### Scripts de Ejecución
**Windows (PowerShell)**:
```powershell
# run-performance-test.ps1
$jmeterPath = "C:\JMETER\apache-jmeter-5.6.3\bin"
$testFile = "View Results Tree.jmx"
$resultFile = "results-$(Get-Date -Format 'yyyyMMdd-HHmmss').jtl"
$reportDir = "html-report-$(Get-Date -Format 'yyyyMMdd-HHmmss')"

Set-Location $jmeterPath
.\jmeter.bat -n -t "$PSScriptRoot\$testFile" -l "$PSScriptRoot\$resultFile" -e -o "$PSScriptRoot\$reportDir"
```

## 📊 Métricas y Reportes

### Métricas Principales
| Métrica | Objetivo | Crítico |
|---------|----------|---------|
| **Response Time (Avg)** | < 500ms | < 1,000ms |
| **Response Time (95%)** | < 1,000ms | < 1,500ms |
| **Throughput** | > 15 req/seg | > 10 req/seg |
| **Error Rate** | < 1% | < 5% |
| **CPU Usage** | < 70% | < 90% |

### Listeners Configurados
1. **Summary Report** - Métricas generales
2. **View Results Tree** - Detalle de requests/responses
3. **Aggregate Report** - Estadísticas completas
4. **Response Times Over Time** - Gráfico temporal

### Reportes Generados
```
html-report/
├── index.html              # Dashboard principal
├── content/
│   ├── pages/
│   │   ├── ResponseTimes.html
│   │   ├── Throughput.html
│   │   └── Errors.html
│   └── js/dashboard.js
└── sbadmin2-1.0.7/        # Assets CSS/JS
```

## 📈 Análisis de Resultados

### Criterios de Aceptación
✅ **PASS Criteria**:
- Response Time promedio < 500ms
- 95% de requests < 1,000ms
- Error rate < 1%
- Throughput > 15 req/seg

❌ **FAIL Criteria**:
- Response Time promedio > 1,000ms
- Error rate > 5%
- Throughput < 10 req/seg

### Análisis de Performance
```bash
# Análisis de resultados con awk (Linux/WSL)
awk -F',' 'NR>1 {sum+=$2; count++} END {print "Avg Response Time:", sum/count "ms"}' results.jtl

# Contar errores
awk -F',' 'NR>1 && $8=="false" {errors++} END {print "Error Count:", errors+0}' results.jtl
```

### Interpretación de Métricas
- **Latency vs Response Time**: Diferencia entre tiempo de red y procesamiento
- **Connect Time**: Tiempo de establecimiento de conexión
- **Throughput**: Requests procesados por unidad de tiempo
- **Error %**: Porcentaje de requests fallidos

## 🐛 Troubleshooting

### Problemas Comunes

**1. Java no encontrado**
```bash
Error: JAVA_HOME not set
```
**Solución**:
```bash
# Windows
set JAVA_HOME=C:\Program Files\Java\jdk-11.0.x
set PATH=%JAVA_HOME%\bin;%PATH%
```

**2. Archivo CSV no encontrado**
```bash
Error: Cannot resolve file path
```
**Solución**:
- Verificar ruta absoluta en JMX
- Comprobar que user.csv existe
- Revisar permisos de lectura

**3. Out of Memory**
```bash
Error: Java heap space
```
**Solución**:
```bash
# Aumentar memoria heap
jmeter -n -t test.jmx -Xmx4g -Xms1g
```

**4. Connection timeout**
```bash
Error: Connect to fakestoreapi.com:443 timed out
```
**Solución**:
- Verificar conectividad a internet
- Comprobar firewall/proxy
- Aumentar timeout en HTTP Request

### Comandos de Diagnóstico

**Verificar conectividad**:
```bash
curl -I https://fakestoreapi.com/auth/login
```

**Test manual de login**:
```bash
curl -X POST https://fakestoreapi.com/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"mor_2314","password":"83r5^_"}'
```

**Verificar JMeter**:
```bash
jmeter -v
```

## 🔧 Personalización del Test

### Modificar Parámetros de Carga
```xml
<!-- Cambiar número de usuarios -->
<intProp name="ThreadGroup.num_threads">50</intProp>

<!-- Cambiar ramp-up time -->
<intProp name="ThreadGroup.ramp_time">10</intProp>

<!-- Cambiar iteraciones -->
<stringProp name="LoopController.loops">10</stringProp>
```

### Agregar Nuevos Usuarios
**user.csv**:
```csv
mor_2314,83r5^_
kevinryan,kev02937@
donero,ewedon
derek,jklg*_56
johndoe,password123
janedoe,securepass456
```

### Configurar Diferentes Throughput
```xml
<ConstantThroughputTimer>
  <doubleProp>
    <name>throughput</name>
    <value>600.0</value> <!-- Requests por minuto -->
  </doubleProp>
</ConstantThroughputTimer>
```

## 📝 Mejores Prácticas

### Preparación del Test
1. **Datos realistas**: Usar credenciales válidas
2. **Ambiente controlado**: Ejecutar en ambiente de pruebas
3. **Baseline establecido**: Ejecutar tests de referencia
4. **Monitoreo del sistema**: CPU, memoria, red

### Durante la Ejecución
1. **Modo CLI**: Evitar GUI para tests de carga
2. **Recursos suficientes**: Memoria y CPU adecuados
3. **Red estable**: Conexión confiable a internet
4. **Logs detallados**: Capturar toda la información

### Análisis de Resultados
1. **Múltiples ejecuciones**: Promedio de varios runs
2. **Comparación histórica**: Tendencias de performance
3. **Correlación con métricas**: Sistema y aplicación
4. **Documentación**: Registrar hallazgos y decisiones

## 📋 Checklist de Ejecución

### Pre-ejecución
- [ ] Java instalado y configurado
- [ ] JMeter instalado y funcional
- [ ] Archivo user.csv con datos válidos
- [ ] Ruta de CSV actualizada en JMX
- [ ] Conectividad a fakestoreapi.com verificada

### Durante ejecución
- [ ] Monitoreo de recursos del sistema
- [ ] Verificación de logs de error
- [ ] Seguimiento de métricas en tiempo real
- [ ] Documentación de incidencias

### Post-ejecución
- [ ] Generación de reportes HTML
- [ ] Análisis de métricas principales
- [ ] Comparación con criterios de aceptación
- [ ] Documentación de resultados
- [ ] Respaldo de archivos de resultados

---

## 👥 Autor

**Performance Testing Engineer**
- Evaluación Técnica - Sofka Technologies  
- Load Testing & Performance Analysis Specialist

---

*Última actualización: 22 de octubre de 2025*