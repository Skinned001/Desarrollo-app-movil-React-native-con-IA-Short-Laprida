# Especificación de Proyecto: Catálogo de Anomalías SCP

## Visión General
Aplicación móvil estilo catálogo para visualizar, registrar y editar anomalías de la Fundación SCP. El sistema está pensado para investigadores en campo. 
La interfaz debe tener una estética limpia, técnica y realista (estilo base de datos clasificada o terminal oscura). 
Los datos se manejarán estrictamente en memoria (mocks) sin conexión a un backend real.

## 1. Historias de Usuario

*   **HU1 - Catálogo Principal:** Como Investigador, quiero ver una lista de todos los SCPs registrados y buscar por número de ítem, para encontrar anomalías rápidamente.
*   **HU2 - Detalles de Anomalía:** Como Investigador, quiero entrar a un registro específico para leer sus "Procedimientos Especiales de Contención" y su "Descripción" detallada.
*   **HU3 - Registro de Anomalía:** Como Administrador de Datos, quiero un formulario para ingresar un nuevo SCP al sistema.
*   **HU4 - Edición de Registro:** Como Administrador de Datos, quiero poder editar la información de un SCP existente por si los protocolos de contención cambian.

## 2. Pantallas (Arquitectura expo-router)

*   `/(tabs)/index` **(CatalogScreen):** Pantalla principal. Muestra la lista completa de SCPs en tarjetas y una barra de búsqueda en la parte superior. Un botón flotante (FAB) para "Agregar nuevo".
*   `/[id]` **(DetailScreen):** Pantalla de lectura. Muestra toda la información del SCP seleccionado. Incluye un botón en el header para "Editar".
*   `/create` **(CreateScreen):** Pantalla con un formulario vacío para dar de alta una nueva anomalía.
*   `/edit/[id]` **(EditScreen):** Misma estructura que el formulario de creación, pero con los campos pre-llenados con la información del SCP actual.

## 3. Criterios de Aceptación

### Para HU1 (Catálogo):
*   La lista debe mostrar al menos: Número de ítem (ej. SCP-173), Clase (Safe, Euclid, Keter) y un extracto corto de la descripción.
*   La barra de búsqueda debe filtrar la lista en tiempo real escribiendo el número de SCP o palabras clave.

### Para HU2 (Detalles):
*   Debe mostrar claramente separados los títulos: "Ítem #", "Clase de Objeto", "Procedimientos Especiales de Contención" y "Descripción".
*   El texto debe ser scrolleable si es muy largo.

### Para HU3 y HU4 (Formularios de Creación/Edición):
*   Campos obligatorios: `ItemNumber` (texto), `Class` (Selector/Dropdown: Safe, Euclid, Keter, Thaumiel), `ContainmentProcedures` (área de texto multilinea), `Description` (área de texto multilinea).
*   Si se intenta guardar con campos obligatorios vacíos, debe mostrar un mensaje de error visual (texto en rojo).
*   Al guardar exitosamente, el estado global/mock debe actualizarse, y la app debe navegar automáticamente de regreso a la pantalla anterior.

## 4. Fuera de Alcance (Restricciones Estrictas)

*   **NO Backend/Bases de datos:** No se implementará Firebase, Supabase, SQLite, ni ninguna API REST externa. Todo funciona con un estado en memoria o archivos `.json`.
*   **NO Autenticación:** No habrá pantalla de Login ni sistema de roles (roles como "Investigador" o "Administrador" son solo contexto para las historias de usuario).
*   **NO Subida de imágenes reales:** Las imágenes (si se incluyen) funcionarán pegando URLs de internet, no habrá acceso a la galería ni a la cámara del dispositivo.
*   **NO Notificaciones:** El sistema de notificaciones push o alertas locales queda totalmente descartado.