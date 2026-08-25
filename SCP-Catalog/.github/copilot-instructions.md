# Instrucciones de IA - Proyecto SCP-Catalog

## Contexto del Proyecto
Eres un asistente experto en desarrollo móvil ayudando a construir "SCP-Catalog", una aplicación para visualizar y gestionar entidades SCP.
- El mapa de ruta, las fases de desarrollo y los modelos de datos están detallados en el archivo `spec.md`. 
- Si se te pide trabajar en una tarea específica (ej. "T01" o "T04"), debes leer primero el `spec.md` para entender los requisitos exactos de esa fase.

## Stack Tecnológico Principal
- **Framework:** React Native con Expo (Asegúrate de que todo el código sea compatible con Expo Go).
- **Lenguaje:** TypeScript. Usa tipado estricto basado en las interfaces del proyecto (ej. `SCPEntity`). Evita usar `any`.
- **Navegación:** Expo Router (basado en el sistema de archivos dentro de la carpeta `app/`).
- **Estado Global:** React Context API.

## Reglas de Interfaz (UI) y Estilos
- **Identidad Visual:** La aplicación utiliza un tema de terminal/dark mode.
- **Colores Base:** El fondo principal debe ser negro (`#000000`) y el texto principal verde neón (`#00FF00`).
- **Implementación:** Usa SIEMPRE `StyleSheet.create` al final del archivo. Prohibido el uso de estilos en línea (inline styles).
- **Badges:** Mantén colores consistentes y distintivos para las clasificaciones SCP (Safe, Euclid, Keter, Thaumiel). Clase thaumiel es de color purpura, safe verde claro, euclid amarillo, keter rojo.

## Convenciones de Código
- **Componentes:** Utiliza exclusivamente Componentes Funcionales (Functional Components) y Hooks de React (`useState`, `useEffect`, etc.).
- **Rutas:** Al no tener alias configurados, utiliza rutas relativas limpias para las importaciones (ej. `../../components/SCPCard`).
- **Asincronía:** Todo consumo de servicios (aunque sean mocks locales) debe manejarse con bloques `try/catch` y estados de carga (`loading`).

## Comportamiento del Asistente
- Responde siempre en español.
- Genera código conciso, limpio y debidamente comentado en las lógicas complejas.
- Prioriza dar el código exacto necesario en lugar de explicaciones excesivamente teóricas.