📡 **Microservicio de Gestión de Proyectos**  
Este microservicio desarrollado con NestJS permite gestionar proyectos académicos y trabajos dirigidos mediante WebSocket (Socket.IO). Consume endpoints HTTP externos para realizar búsquedas y generar estadísticas en tiempo real.

---

## 📁 **Estructura del Proyecto**  
```
nest-ws/
├── src/
│   ├── proyectos/                  # Módulo principal
│   │   ├── proyectos.gateway.ts    # Gateway WebSocket
│   │   ├── proyectos.service.ts    # Lógica de negocio y consumo HTTP
│   │   └── proyectos.module.ts     # Configuración del módulo
│   │
│   ├── app.module.ts               # Módulo raíz
│   └── main.ts                     # Punto de entrada
│
├── test/                           # Pruebas (pendientes)
└── ...                             # Configuraciones generales
```

---

## 🚀 **Instalación y Ejecución**  
**Requisitos previos:**  
- Node.js v18+  
- npm v9+  
- Backend externo corriendo en `http://localhost:3000` con:  
  - `POST /Proyectos` (Búsqueda de proyectos)  

**Pasos:**  
```bash
npm install     # Instalar dependencias
npm run start  # Iniciar microservicio (puerto 3009)
```

---

## 🔌 **Eventos WebSocket**  
### 📤 **Eventos emitidos por el cliente**  
| Evento | Acción | Ejemplo de Payload |
|--------|--------|--------------------|
| `buscarProyectos` | Busca proyectos por criterios | `{ "anio": 2025, "categoria": "investigacion", "titulo": "" }` |
| `contarProyectosPorCategoria` | Obtiene conteo por categoría | `{}` |
| `contarProyectosPorTipo` | Cuenta proyectos por tipo (1: Académico, 2: Trabajo Dirigido) | `{}` |

### 📥 **Eventos recibidos del servidor**  
| Evento | Descripción | Ejemplo de Respuesta |
|--------|-------------|----------------------|
| `resultadosProyectos` | Resultados de búsqueda | `[{ "titulo": "...", "categoria": "investigacion", ... }]` |
| `resultadoConteoCategorias` | Conteo por categoría | `{ "Investigación": 15, "Social": 8 }` |
| `resultadoConteoTipos` | Conteo por tipo | `{ "Académico": 20, "Trabajo Dirigido": 12 }` |
| `errorBusqueda` | Error en operaciones | `{ "status": "error", "message": "..." }` |

---

## 🌐 **Consumo de Endpoints Externos**  
El servicio consume estos recursos HTTP del backend:  
- **`POST /Proyectos`**:  
  ```json
  {
    "anio": 2025,
    "categoria": null,
    "titulo": null
  }
  ```

---

## 👨💻 **Ejemplo de Cliente WebSocket**  
```javascript
const socket = io('ws://localhost:3009');

// Buscar proyectos
socket.emit('buscarProyectos', {
  anio: 2025,
  categoria: "investigacion",
  titulo: ""
});

socket.on('resultadosProyectos', (data) => {
  console.log('Proyectos encontrados:', data);
});

// Obtener estadísticas
socket.emit('contarProyectosPorTipo');

socket.on('resultadoConteoTipos', (data) => {
  console.log('Conteo por tipo:', data);
});
```

---

## ⚙️ **Arquitectura**  
### 🧩 **Gateway (proyectos.gateway.ts)**  
- Escucha eventos WebSocket entrantes  
- Delega la lógica al servicio  
- Emite respuestas a todos los clientes conectados  

### 🧰 **Servicio (proyectos.service.ts)**  
- Realiza llamadas HTTP al backend  
- Procesa datos para generar estadísticas  
- Maneja errores y timeouts (5 segundos)  

---

## 🧪 **Pruebas y Depuración**  
1. **Herramientas recomendadas:**  
   - Postman (cliente WebSocket)  
   - `curl` para probar el backend directamente:  
     ```bash
     curl -X POST http://localhost:3000/Proyectos -H "Content-Type: application/json" -d '{"anio":2025}'
     ```

2. **Logs clave en desarrollo:**  
   ```bash
   [ProyectosGateway] Nueva búsqueda recibida...
   [ProyectosService] Proyectos encontrados: 15
   ```

---

## 📌 **Notas Importantes**  
- **Dependencias críticas:**  
  ```json
  "@nestjs/websockets": "^10.0.0",
  "socket.io": "^4.7.2",
  "@nestjs/axios": "^3.0.0"
  ```  
- El backend externo **debe estar activo** antes de iniciar este servicio.  
- Todos los filtros usan **año 2025** por configuración actual.  

---

👤 **Autor**  
[Christian Coronel] - 2025