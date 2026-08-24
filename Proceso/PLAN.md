# Plan Técnico - App Fundacion SCP

## promt utilizado para generar el archivo plan.md

En base a lo el pdf dice y de como te digimos que seria la aplicacion podrias hacer un archivo llamado plan.md

## 1. Estructura del Proyecto

/app
/(tabs)/index.tsx # Pantalla de lista (CatalogScreen)
/[id].tsx # Pantalla de detalle (DetailScreen)
/create.tsx # Pantalla de creación (CreateScreen)
/edit/[id].tsx # Pantalla de edición (EditScreen)
/\_layout.tsx # Layout principal (Provider de contexto)
/components
/SCPCard.tsx # Tarjeta para cada ítem en la lista
/ClassificationBadge.tsx # Etiqueta de color para la clase
/LoadingSpinner.tsx # Indicador de carga reutilizable
/ErrorMessage.tsx # Mensaje de error con reintento
/constants
/colors.ts # Colores HEX centralizados (según Constitution)
/scpData.ts # Array inicial de mocks (SCPEntity[])
/types
/scp.ts # Interfaz SCPEntity
/context
/SCPContext.tsx # Contexto global para manejar los mocks (CRUD)
/services
/scpService.ts # Funciones async con latencia simulada (mocks)
/hooks
/useSCP.ts # Hook personalizado para acceder al contexto

text

---

## 2. Servicios (Mocks)

Todos los datos se manejan mediante funciones `async` en `services/scpService.ts`.  
**Cada función tendrá una latencia simulada de 500-800ms** con `setTimeout` para simular una llamada a una API real.

**Ubicación:** `/services/scpService.ts`

**Funciones:**

| Función      | Parámetros                              | Retorno                           | Descripción                                   |
| ------------ | --------------------------------------- | --------------------------------- | --------------------------------------------- |
| `getAllSCPs` | Ninguno                                 | `Promise<SCPEntity[]>`            | Devuelve todos los SCPs del array de mocks    |
| `getSCPById` | `id: string`                            | `Promise<SCPEntity \| undefined>` | Busca un SCP por su ID                        |
| `createSCP`  | `scp: Omit<SCPEntity, 'id'>`            | `Promise<SCPEntity>`              | Crea un nuevo SCP (genera un `id` automático) |
| `updateSCP`  | `id: string`, `scp: Partial<SCPEntity>` | `Promise<SCPEntity>`              | Actualiza un SCP existente                    |
| `deleteSCP`  | `id: string`                            | `Promise<void>`                   | Elimina un SCP por su ID                      |

**Reglas:**

- Los datos iniciales viven en `constants/scpData.ts` (array con al menos 5 SCPs de ejemplo).
- Las funciones `createSCP`, `updateSCP` y `deleteSCP` **modifican el array en memoria** (los cambios se pierden al recargar la app, como pide la actividad).
- Cada función **simula latencia** con `await new Promise(resolve => setTimeout(resolve, 500))`.

---

## 3. Estado Global (Context API)

Usaremos **Context API** de React para manejar el estado global de la aplicación.

**Ubicación:** `/context/SCPContext.tsx`

**Estado:**

| Campo     | Tipo             | Descripción                               |
| --------- | ---------------- | ----------------------------------------- |
| `scps`    | `SCPEntity[]`    | Lista de todos los SCPs                   |
| `loading` | `boolean`        | Indicador de carga (para mostrar spinner) |
| `error`   | `string \| null` | Mensaje de error si algo falla            |

**Funciones expuestas por el contexto:**

| Función     | Parámetros                              | Descripción                                                             |
| ----------- | --------------------------------------- | ----------------------------------------------------------------------- |
| `fetchSCPs` | Ninguno                                 | Carga los SCPs desde el servicio (actualiza `scps`, `loading`, `error`) |
| `getSCP`    | `id: string`                            | Devuelve un SCP del estado local (sin llamar al servicio)               |
| `createSCP` | `scp: Omit<SCPEntity, 'id'>`            | Llama al servicio, actualiza el estado y maneja errores                 |
| `updateSCP` | `id: string`, `scp: Partial<SCPEntity>` | Llama al servicio, actualiza el estado y maneja errores                 |
| `deleteSCP` | `id: string`                            | Llama al servicio, actualiza el estado y maneja errores                 |

**Reglas:**

- El `SCPProvider` debe envolver toda la app en `app/_layout.tsx`.
- Todas las llamadas a las funciones del contexto **actualizan automáticamente `loading` y `error`**.
- Si una operación falla, el error se guarda en el estado y se muestra en la UI (no se usa `Alert.alert` para errores de validación, solo para errores de red/inesperados).

---

## 4. Navegación (expo-router)

- Usamos **expo-router** con enrutamiento basado en archivos (carpeta `/app`).
- **Prohibido** usar `navigation.navigate` de React Navigation.
- **Reglas:**
  - `router.push()` para navegar a una nueva pantalla (ej: al pulsar una tarjeta).
  - `router.back()` para volver a la pantalla anterior (ej: tras guardar en creación).
  - `router.replace()` para redirigir sin guardar historial (ej: tras editar, volver al detalle).
  - `<Link>` para enlaces declarativos (si se usa).

**Rutas dinámicas:**

- `app/[id].tsx` recibe el `id` mediante `useLocalSearchParams()`.
- `app/edit/[id].tsx` recibe el `id` mediante `useLocalSearchParams()`.

---

## 5. Estilos (StyleSheet)

- Usamos **`StyleSheet.create`** de React Native (sin librerías externas).
- Todos los colores están centralizados en `/constants/colors.ts` (según la Constitution).
- **Colores definidos:**
  - Fondo: `#000000`
  - Texto principal: `#00FF41` (verde neón)
  - Safe: `#009600`
  - Euclid: `#FFD700`
  - Keter: `#FF0000`
  - Thaumiel: `#8A2BE2`
  - Error (validación): `#FF4444`

---

## 6. Manejo de Estados de UI (Carga, Vacío, Error)

Cada pantalla que muestre datos debe manejar estos tres estados:

| Estado    | Condición                       | UI a mostrar                                                                               |
| --------- | ------------------------------- | ------------------------------------------------------------------------------------------ |
| **Carga** | `loading === true`              | `ActivityIndicator` o componente `LoadingSpinner`                                          |
| **Vacío** | `scps.length === 0 && !loading` | Texto: "No hay SCPs registrados" (o similar)                                               |
| **Error** | `error !== null`                | Mensaje de error con un botón para reintentar (`fetchSCPs` o la operación correspondiente) |
| **Datos** | `scps.length > 0 && !loading`   | Mostrar la lista o el detalle normalmente                                                  |

---

## 7. Flujo de Datos (Ciclo de Vida)

1. **App inicia:** `SCPProvider` monta el estado inicial (`scps: []`, `loading: false`, `error: null`).
2. **Pantalla de lista (index):** Al montar, llama a `fetchSCPs()` del contexto.
   - `loading = true` → muestra spinner.
   - Servicio devuelve datos → `scps = [...]`, `loading = false`.
   - Si error → `error = mensaje`, `loading = false` → mostrar mensaje de error.
3. **Creación (create):** Usuario rellena formulario y guarda.
   - Validación local (campos obligatorios) → si falla, muestra error en rojo.
   - Si pasa, llama a `createSCP(scp)` del contexto.
   - Contexto llama al servicio, actualiza `scps` y navega atrás con `router.back()`.
4. **Edición (edit):** Usuario modifica formulario y guarda.
   - Validación local → si falla, muestra error en rojo.
   - Si pasa, llama a `updateSCP(id, scp)` del contexto.
   - Contexto llama al servicio, actualiza `scps` y navega al detalle con `router.replace(`/${id}`)`.
5. **Eliminación (opcional):** Botón "Eliminar" en detalle → confirmar con `Alert.alert` → llamar a `deleteSCP(id)` → volver a la lista con `router.back()`.

---

## 8. Reglas de Desarrollo (para todo el equipo)

- **Tareas atómicas:** Cada tarea de `tasks.md` debe poder completarse en una sesión y probarse en el teléfono.
- **Commits:** Un commit por tarea completada, con mensaje que referencia la tarea (ej: `feat: T04 - pantalla de lista`).
- **Código:** Todo el código generado debe ser revisado y entendido antes de committear.
- **Documentación:** Cada prompt y corrección debe registrarse en `PROCESO.md` en el momento de la implementación.
- **Pruebas:** Cada tarea se prueba en el teléfono real (Expo Go) antes de darse por terminada.

---

## 9. Tecnologías y Versiones (referencia)

- React Native 0.81.5
- Expo SDK 52
- expo-router ~6.0.24
- TypeScript ~5.9.2
- Estilos: StyleSheet.create (React Native)

---

## 10. Notas Adicionales

- **Sin backend real:** Todos los datos son mocks en memoria. No se usa `AsyncStorage` ni persistencia.
- **Imágenes:** No se implementan (solo texto). Si se muestran imágenes, serán URLs fijas o placeholders.
- **Latencia artificial:** Es obligatoria en todas las funciones del servicio para simular comportamiento real de red (500-800ms).
- **Errores de validación:** Siempre se muestran en la UI (texto en rojo), nunca en `Alert.alert` (excepto confirmación de eliminación).
