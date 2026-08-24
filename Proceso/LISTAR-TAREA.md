# Lista de Tareas - App Catálogo SCP

**Orden estricto:** Cada tarea debe completarse y probarse en el teléfono antes de pasar a la siguiente.

---

## T01: Configurar tipos y mocks iniciales

- **T01.1:** Crear la carpeta `types`.
- **T01.2:** Crear `types/scp.ts`.
- **T01.3:** Definir la interfaz `SCPEntity` con los campos `id`, `ItemNumber`, `Class`, `ContainmentProcedures` y `Description`.
- **T01.4:** Crear la carpeta `constants`.
- **T01.5:** Crear `constants/scpData.ts`.
- **T01.6:** Agregar el primer SCP de prueba.
- **T01.7:** Agregar cuatro SCP adicionales.
- **T01.8:** Crear un archivo temporal de verificación.
- **T01.9:** Importar los mocks y ejecutar `console.log`.
- **T01.10:** Verificar los datos en la terminal.
- **T01.11:** Eliminar el archivo temporal.

---

## T02: Crear servicio de mocks (scpService)

- **T02.1:** Crear la carpeta `services`.
- **T02.2:** Crear `services/scpService.ts`.
- **T02.3:** Importar `SCPEntity` y `scpData`.
- **T02.4:** Crear la función auxiliar de latencia.
- **T02.5:** Implementar `getAllSCPs`.
- **T02.6:** Implementar `getSCPById`.
- **T02.7:** Implementar `createSCP`.
- **T02.8:** Implementar `updateSCP`.
- **T02.9:** Implementar `deleteSCP`.
- **T02.10:** Crear un archivo temporal de prueba.
- **T02.11:** Verificar la lectura de datos con retraso.
- **T02.12:** Verificar creación, edición y eliminación.
- **T02.13:** Verificar el manejo de errores.
- **T02.14:** Eliminar el archivo temporal.

---

## T03: Crear Contexto global (SCPContext)

- **T03.1:** Crear la carpeta `context`.
- **T03.2:** Crear `context/SCPContext.tsx`.
- **T03.3:** Definir el tipo del contexto.
- **T03.4:** Crear los estados `scps`, `loading` y `error`.
- **T03.5:** Implementar la carga inicial.
- **T03.6:** Implementar la función para recargar SCPs.
- **T03.7:** Implementar `createSCP`.
- **T03.8:** Implementar `updateSCP`.
- **T03.9:** Implementar `deleteSCP`.
- **T03.10:** Exportar `SCPProvider` y `useSCP`.
- **T03.11:** Envolver la aplicación con `SCPProvider` en `app/_layout.tsx`.
- **T03.12:** Crear una pantalla temporal de prueba.
- **T03.13:** Mostrar los SCPs desde el contexto.
- **T03.14:** Probar estados de carga, datos y error.

---

## T04: Pantalla de lista (CatalogScreen)

- **T04.1:** Crear la carpeta `app`.
- **T04.2:** Crear `app/(tabs)`.
- **T04.3:** Crear `app/(tabs)/index.tsx`.
- **T04.4:** Consumir `useSCP`.
- **T04.5:** Agregar el indicador de carga.
- **T04.6:** Agregar el mensaje de lista vacía.
- **T04.7:** Agregar el mensaje de error.
- **T04.8:** Agregar el botón de reintento.
- **T04.9:** Agregar la `FlatList`.
- **T04.10:** Crear una tarjeta provisional.
- **T04.11:** Mostrar `ItemNumber`, `Class` y un extracto de los primeros 100 caracteres de `Description`.
- **T04.12:** Verificar la carga con retraso de 500 ms.

---

## T05: Componente SCPCard

- **T05.1:** Crear la carpeta `components`.
- **T05.2:** Crear `components/SCPCard.tsx`.
- **T05.3:** Definir las propiedades del componente.
- **T05.4:** Mostrar el número de ítem.
- **T05.5:** Mostrar la clase.
- **T05.6:** Crear el color correspondiente a cada clase.
- **T05.7:** Mostrar los primeros 100 caracteres de la descripción.
- **T05.8:** Agregar la navegación con `router.push()`.
- **T05.9:** Reemplazar la tarjeta provisional en `index.tsx`.
- **T05.10:** Probar la tarjeta en el teléfono.
- **T05.11:** Verificar la navegación al pulsarla.

---

## T06: Pantalla de detalle (DetailScreen)

- **T06.1:** Crear `app/[id].tsx`.
- **T06.2:** Obtener el `id` mediante `useLocalSearchParams()`.
- **T06.3:** Buscar el SCP mediante `getSCPById` del contexto.
- **T06.4:** Mostrar el estado de carga.
- **T06.5:** Mostrar el mensaje de SCP no encontrado.
- **T06.6:** Mostrar `ItemNumber`.
- **T06.7:** Mostrar `Class` con su badge.
- **T06.8:** Mostrar `ContainmentProcedures`.
- **T06.9:** Mostrar `Description`.
- **T06.10:** Agregar el botón “Editar”.
- **T06.11:** Verificar la navegación desde una tarjeta.

---

## T07: Pantalla de creación (CreateScreen)

- **T07.1:** Crear `app/create.tsx`.
- **T07.2:** Crear el estado del formulario.
- **T07.3:** Crear el campo `ItemNumber`.
- **T07.4:** Crear el selector de `Class` con `Safe`, `Euclid`, `Keter` y `Thaumiel`.
- **T07.5:** Crear el campo multilínea `ContainmentProcedures`.
- **T07.6:** Crear el campo multilínea `Description`.
- **T07.7:** Crear el estado de errores.
- **T07.8:** Validar los campos obligatorios.
- **T07.9:** Mostrar los errores debajo de cada campo.
- **T07.10:** Llamar a `createSCP` del contexto.
- **T07.11:** Mostrar errores del servicio.
- **T07.12:** Regresar con `router.back()`.
- **T07.13:** Verificar la creación y la validación en el teléfono.

---

## T08: Pantalla de edición (EditScreen)

- **T08.1:** Crear `app/edit/[id].tsx`.
- **T08.2:** Obtener el `id` con `useLocalSearchParams()`.
- **T08.3:** Buscar el SCP seleccionado.
- **T08.4:** Mostrar el estado de carga.
- **T08.5:** Prellenar el formulario.
- **T08.6:** Crear los campos editables.
- **T08.7:** Validar los campos obligatorios.
- **T08.8:** Mostrar los errores de validación.
- **T08.9:** Llamar a `updateSCP`.
- **T08.10:** Mostrar errores del servicio.
- **T08.11:** Navegar con `router.replace(\`/\${id}\`)`.
- **T08.12:** Verificar que los cambios se reflejen en la lista y el detalle.

---

## T09: Navegación y conexión entre pantallas

- **T09.1:** Conectar la lista con el detalle.
- **T09.2:** Verificar `router.push(\`/\${id}\`)`.
- **T09.3:** Conectar el botón “Editar”.
- **T09.4:** Verificar `router.push(\`/edit/\${id}\`)`.
- **T09.5:** Agregar el botón “Volver” en el detalle.
- **T09.6:** Verificar `router.back()`.
- **T09.7:** Conectar la pantalla de creación.
- **T09.8:** Conectar la pantalla de edición.
- **T09.9:** Probar el flujo lista → detalle → editar → guardar.
- **T09.10:** Crear un SCP y comprobar que aparece en la lista.
- **T09.11:** Probar el flujo completo en el teléfono.

---

## T10: Aplicar estilos y colores finales

- **T10.1:** Definir los colores HEX de la aplicación.
- **T10.2:** Aplicar fondo negro.
- **T10.3:** Aplicar texto verde neón.
- **T10.4:** Aplicar colores a los badges.
- **T10.5:** Ajustar márgenes y paddings.
- **T10.6:** Ajustar tamaños de texto.
- **T10.7:** Aplicar estilos a botones e inputs.
- **T10.8:** Revisar los estados de carga y error.
- **T10.9:** Revisar la consistencia visual.
- **T10.10:** Probar la aplicación completa en el teléfono.
