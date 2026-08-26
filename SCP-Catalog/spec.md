# Especificación del Proyecto: App Catálogo SCP

## 1. Descripción General
El proyecto "Catálogo SCP" es una aplicación móvil diseñada para listar, visualizar detalles, crear y editar registros de entidades SCP (Secure, Contain, Protect). La aplicación simula una conexión a una base de datos mediante un servicio de mocks con latencia, permitiendo a los usuarios interactuar con un listado de entidades clasificadas.

## 2. Stack Tecnológico
- **Framework:** React Native
- **Herramienta de desarrollo:** Expo
- **Lenguaje:** TypeScript
- **Navegación:** Expo Router
- **Manejo de Estado Global:** React Context API

## 3. Estructura de Datos (Modelos)

### Entidad SCP (`SCPEntity`)
Representa la estructura fundamental de cada registro en el catálogo.

| Campo | Tipo | Descripción |
| :--- | :--- | :--- |
| `id` | `string` | Identificador único de la entidad. |
| `ItemNumber` | `string` | Número de designación oficial (ej. SCP-173). |
| `Class` | `enum` | Clasificación de la entidad (`Safe`, `Euclid`, `Keter`, `Thaumiel`). |
| `ContainmentProcedures` | `string` | Procedimientos especiales de contención. |
| `Description` | `string` | Descripción detallada de la entidad y sus propiedades. |

## 4. Requerimientos Funcionales y Fases de Desarrollo

El desarrollo se divide en las siguientes fases (T01 a T10), con un orden estricto de ejecución. **Cada tarea debe completarse y probarse en un dispositivo (ej. mediante Expo Go) antes de avanzar a la siguiente.**

### T01: Configuración de Tipos y Datos Simulados (Mocks)
**Objetivo:** Establecer la base de datos local y los tipos de TypeScript.
- Crear directorio `types` y definir la interfaz `SCPEntity` en `types/scp.ts`.
- Crear directorio `constants` y establecer los datos iniciales en `constants/scpData.ts` (mínimo 5 registros SCP).
- Implementar script temporal para verificar la correcta estructuración de los datos en consola.

### T02: Servicio de Datos (scpService)
**Objetivo:** Simular un backend con operaciones CRUD y latencia artificial.
- Crear directorio `services` y el archivo `services/scpService.ts`.
- Implementar funciones con retraso (ej. 500ms) para: `getAllSCPs`, `getSCPById`, `createSCP`, `updateSCP` y `deleteSCP`.
- Manejar posibles errores (ej. SCP no encontrado).
- Validar las operaciones CRUD mediante pruebas temporales.

### T03: Manejo de Estado Global (SCPContext)
**Objetivo:** Proveer los datos y el estado de la aplicación a todos los componentes.
- Crear directorio `context` y el archivo `context/SCPContext.tsx`.
- Definir el estado global (`scps`, `loading`, `error`).
- Implementar funciones para recargar, crear, actualizar y eliminar entidades usando el `scpService`.
- Exportar el proveedor (`SCPProvider`) y el hook (`useSCP`).
- Envolver la aplicación en `app/_layout.tsx`.

### T04 & T05: Pantalla Principal y Componente de Tarjeta
**Objetivo:** Mostrar la lista de entidades disponibles.
- **T04:** Crear la pantalla de catálogo (`app/(tabs)/index.tsx`). Consumir el `useSCP` para mostrar la lista usando `FlatList`. Manejar estados de carga, lista vacía y errores con opción de reintento.
- **T05:** Crear el componente `components/SCPCard.tsx` para cada elemento de la lista. Mostrar `ItemNumber`, clase (con badge de color según clasificación) y un extracto (max. 100 caracteres) de la descripción. Implementar navegación al detalle.

### T06: Pantalla de Detalle (DetailScreen)
**Objetivo:** Mostrar la información completa de una entidad seleccionada.
- Crear ruta dinámica `app/[id].tsx`.
- Obtener el ID de los parámetros de ruta (`useLocalSearchParams`).
- Mostrar estados de carga o mensaje de error si no existe.
- Renderizar todos los campos de la entidad (`ItemNumber`, badge de `Class`, `ContainmentProcedures` y `Description`).
- Proveer un botón de acceso a la pantalla de edición.

### T07: Pantalla de Creación (CreateScreen)
**Objetivo:** Permitir el registro de nuevas entidades SCP.
- Crear ruta `app/create.tsx`.
- Implementar formulario con campos: `ItemNumber` (texto), `Class` (selector: Safe, Euclid, Keter, Thaumiel), `ContainmentProcedures` (multilínea) y `Description` (multilínea).
- Incluir validación de campos obligatorios con mensajes de error en la UI.
- Conectar con la función `createSCP` del contexto.
- Navegar hacia atrás tras una creación exitosa.

### T08: Pantalla de Edición (EditScreen)
**Objetivo:** Permitir la modificación de entidades existentes.
- Crear ruta dinámica `app/edit/[id].tsx`.
- Cargar los datos actuales de la entidad seleccionada en el formulario.
- Validar las modificaciones y manejar errores.
- Conectar con la función `updateSCP`.
- Redirigir a la pantalla de detalle (`router.replace`) tras actualizar.

### T09: Flujos de Navegación
**Objetivo:** Asegurar una experiencia de usuario fluida entre pantallas.
- Verificar el enrutamiento:
  - Lista (`/`) -> Detalle (`/[id]`)
  - Detalle (`/[id]`) -> Editar (`/edit/[id]`)
  - Guardar edición -> Detalle actualizado (`/[id]`)
  - Crear -> Lista (con la nueva entidad)
- Asegurar el correcto funcionamiento del botón "Volver" (`router.back()`).

### T10: Diseño y UI/UX (Estilo Terminal/Oscuro)
**Objetivo:** Aplicar la identidad visual del proyecto.
- Definir paleta de colores: Fondo negro, texto principal verde neón.
- Asignar colores específicos a los badges de clases SCP.
- Estandarizar márgenes, paddings y tipografía.
- Estilizar elementos interactivos (botones, inputs).
- Revisar consistencia visual en estados de carga, error y listados.

## 5. Criterios de Aceptación
- La aplicación compila sin errores en Expo Go.
- El CRUD funciona completamente simulado localmente.
- La navegación no presenta bloqueos ni estados inconsistentes.
- La interfaz de usuario refleja el tema oscuro especificado.