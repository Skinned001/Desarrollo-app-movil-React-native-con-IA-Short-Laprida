# Lista de Tareas - App Catálogo SCP

**Orden estricto:** Cada tarea debe completarse y probarse en el teléfono antes de pasar a la siguiente.

---

## T01: Configurar tipos y mocks iniciales

- **Descripción:** Crear la interfaz `SCPEntity` en `types/scp.ts` y el array inicial de mocks en `constants/scpData.ts` con al menos 5 SCPs de ejemplo (con los campos: `id`, `ItemNumber`, `Class`, `ContainmentProcedures`, `Description`).
- **Verificación:** Importar el array en un archivo temporal y hacer un `console.log` para confirmar que los datos existen.
- **Dependencias:** Ninguna.

---

### Promt inicial

"Hola. Vamos a iniciar el desarrollo de la app siguiendo la metodología SDD.

Primero, lee detenidamente los archivos .clinerules y SPEC.md. Confírmame que entendiste las reglas (especialmente la prohibición de usar backend real).

Una vez que lo leas, empezá a crear la estructura base del proyecto para expo-router (carpeta app, \_layout.tsx, etc.).

Creá un archivo de "mocks" con datos falsos de 3 o 4 anomalías SCP para poder probar la app.

Desarrollá la primera historia de usuario (HU1): la pantalla del catálogo (index.tsx) que muestre la lista de SCPs usando los mocks.

Ve paso a paso. Mostrame qué archivos vas a crear o modificar."

## T02: Crear servicio de mocks (scpService)

- **Descripción:** Crear `services/scpService.ts` con funciones `async` que devuelvan datos desde `constants/scpData.ts`. Cada función debe tener una latencia simulada de 500ms con `setTimeout` (simulando red). Funciones: `getAllSCPs`, `getSCPById`, `createSCP`, `updateSCP`, `deleteSCP`.
- **Verificación:** Llamar a `getAllSCPs()` desde un componente de prueba y ver que devuelve datos con delay.
- **Dependencias:** T01.

---

### Promt inicial

Estamos desarrollando una app de catálogo SCP con React Native, Expo y TypeScript.

Ya tenemos la T01 completada:

- La interfaz `SCPEntity` está definida en `/types/scp.ts` con los campos: `id`, `ItemNumber`, `Class`, `ContainmentProcedures`, `Description`.
- El array inicial de mocks está en `/constants/scpData.ts` con al menos 5 SCPs de ejemplo.

Ahora necesito que implementes la T02: crear el servicio de mocks en `/services/scpService.ts`.

Requisitos:

1. El archivo debe estar en `services/scpService.ts`.
2. Debe exportar las siguientes funciones **async**:
   - `getAllSCPs(): Promise<SCPEntity[]>`
   - `getSCPById(id: string): Promise<SCPEntity | undefined>`
   - `createSCP(scp: Omit<SCPEntity, 'id'>): Promise<SCPEntity>`
   - `updateSCP(id: string, scp: Partial<SCPEntity>): Promise<SCPEntity>`
   - `deleteSCP(id: string): Promise<void>`
3. Cada función debe simular latencia de red con `await new Promise(resolve => setTimeout(resolve, 500))` (500ms).
4. Los datos deben leerse y modificarse **en memoria** a partir del array importado de `constants/scpData.ts`.
   - `getAllSCPs` devuelve una copia del array.
   - `getSCPById` busca por `id`.
   - `createSCP` genera un nuevo `id` (puede ser `Date.now().toString()` o un contador) y añade el elemento al array.
   - `updateSCP` busca el elemento por `id` y actualiza sus campos (usando spread).
   - `deleteSCP` filtra el array eliminando el elemento con ese `id`.
5. Los nombres de las funciones y variables deben estar en **inglés**. Los comentarios deben estar en **español**.
6. Maneja errores básicos: si en `getSCPById` no encuentra el id, debe devolver `undefined` (no lanzar error). En `updateSCP` y `deleteSCP`, si no encuentra el id, lanza un error con `throw new Error('SCP no encontrado')`.

Asegúrate de importar correctamente los tipos y los datos iniciales desde sus respectivos archivos.

Genera únicamente el código de `scpService.ts` y explícame brevemente cómo funciona.

## T03: Crear Contexto global (SCPContext)

- **Descripción:** Crear `context/SCPContext.tsx` con el estado global (lista de SCPs, loading, error) y las funciones CRUD que usan el servicio. Envolver la app con el Provider en `app/_layout.tsx`.
- **Verificación:** Consumir el contexto desde un componente de prueba y mostrar la lista en pantalla (aunque sea con un `<Text>`).
- **Dependencias:** T02.

---

## T04: Pantalla de lista (CatalogScreen)

- **Descripción:** Crear `app/(tabs)/index.tsx`. Mostrar todos los SCPs en una lista plana (`FlatList`) usando `SCPCard` como elemento. Manejar estados de carga (spinner), vacío (mensaje) y error (mensaje con botón reintentar). La tarjeta debe mostrar: `ItemNumber`, `Class` (con el color correspondiente) y un extracto de `Description` (primeros 100 caracteres).
- **Verificación:** Navegar a la pantalla y ver que se cargan los mocks con delay. Ver el estado de carga y luego los datos.
- **Dependencias:** T03.

---

## T05: Componente SCPCard

- **Descripción:** Crear `components/SCPCard.tsx`. Recibe un `SCPEntity` y muestra: número de ítem, clase con badge de color, y descripción corta. Al pulsar, navegar a `/[id]` usando `router.push()`.
- **Verificación:** Integrar en la lista de T04 y ver que las tarjetas se ven correctamente y al pulsar, cambia de pantalla (aunque el detalle aún no esté implementado).
- **Dependencias:** T04.

---

## T06: Pantalla de detalle (DetailScreen)

- **Descripción:** Crear `app/[id].tsx`. Obtener el `id` con `useLocalSearchParams()`, buscar el SCP con `getSCPById` del contexto. Mostrar todos los campos: `ItemNumber`, `Class` (con badge), `ContainmentProcedures` y `Description`. Añadir un botón "Editar" en el header que navegue a `edit/[id]`.
- **Verificación:** Al pulsar una tarjeta desde la lista, ir al detalle correcto. Ver que se muestran todos los datos. Manejar caso de SCP no encontrado.
- **Dependencias:** T05.

---

## T07: Pantalla de creación (CreateScreen)

- **Descripción:** Crear `app/create.tsx`. Formulario con campos: `ItemNumber` (input), `Class` (dropdown/selector con Safe, Euclid, Keter, Thaumiel), `ContainmentProcedures` (textarea multilínea), `Description` (textarea multilínea). Validación: todos los campos obligatorios, si están vacíos mostrar mensaje de error en rojo debajo de cada campo. Al guardar, llamar a `createSCP` del contexto y navegar atrás con `router.back()`. Si hay error, mostrarlo.
- **Verificación:** Crear un nuevo SCP, ver que aparece en la lista y que la validación funciona.
- **Dependencias:** T03.

---

## T08: Pantalla de edición (EditScreen)

- **Descripción:** Crear `app/edit/[id].tsx`. Obtener el `id` con `useLocalSearchParams()`, cargar los datos del SCP desde el contexto y prellenar el formulario. Validación igual que la creación. Al guardar, llamar a `updateSCP` y navegar al detalle con `router.replace(`/${id}`)`. Manejar caso de SCP no encontrado.
- **Verificación:** Editar un SCP existente, ver que los cambios se reflejan en la lista y en el detalle.
- **Dependencias:** T07.

---

## T09: Navegación y conexión entre pantallas

- **Descripción:** Conectar todas las pantallas:
  - Desde la lista, al pulsar una tarjeta -> `router.push(`/${id}`)`
  - Desde el detalle, botón "Editar" -> `router.push(`/edit/${id}`)`
  - Desde el detalle, botón "Volver" -> `router.back()`
  - Desde creación/edición, al guardar -> `router.back()` o `router.replace()`
- **Verificación:** Recorrer todo el flujo: lista -> detalle -> editar -> guardar -> volver al detalle. También crear un nuevo SCP y verlo en la lista.
- **Dependencias:** T06, T07, T08.

---

## T10: Aplicar estilos y colores finales

- **Descripción:** Aplicar los colores HEX definidos en la Constitution a todas las pantallas (fondo negro, texto verde neón, badges de colores para cada clase). Asegurar que la estética sea consistente y "técnica". Revisar márgenes, paddings, tipografías.
- **Verificación:** La app se ve uniforme y con la estética acordada.
- **Dependencias:** T01 a T09.
