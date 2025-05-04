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
├── test/                           # Pruebas
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

### 📥 **Eventos recibidos del servidor**  
| Evento | Descripción | Ejemplo de Respuesta |
|--------|-------------|----------------------|
| `resultadosProyectos` | Resultados de búsqueda | `[{ "titulo": "...", "categoria": "investigacion", ... }]` |
| `resultadoConteoCategorias` | Conteo por categoría | `{ "Investigación": 15, "Social": 8 }` |
| `errorBusqueda` | Error en operaciones | `{ "status": "error", "message": "..." }` |

---

## 🌐 **Consumo de Endpoints Externos**  
El servicio consume estos recursos HTTP del backend:  
- **`POST /Proyectos`**:  
  ```json
  {
    "anio": 2025,
    "categoria": "",
    "titulo": ""
  }
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