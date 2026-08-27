<<<<<<< HEAD
# Primer Prompt 
=======
# Primer Prompt

>>>>>>> 546a6e32c4c4926ebfb0a3db9a70ca5e30d006be
Hola. Vamos a comenzar con el desarrollo del proyecto "SCP-Catalog".

Antes de escribir código, por favor revisa el archivo spec.md para entender la arquitectura general, y guíate estrictamente por las convenciones, colores y reglas definidas en nuestro archivo CLAUDE.md. Todo el código debe estar pensado para ejecutarse en la app de Expo Go.

Tu objetivo en este momento es ejecutar única y exclusivamente la fase T01. Por favor, sigue los pasos al pie de la letra y no avances a la fase T02 bajo ningún concepto. Una vez que termines la T01, avísame para que yo pueda probarlo.

Aquí tienes las tareas para esta fase:

T01: Configurar tipos y mocks iniciales

T01.1: Crear la carpeta types.

T01.2: Crear types/scp.ts.

T01.3: Definir la interfaz SCPEntity con los campos id, ItemNumber, Class, ContainmentProcedures y Description.

T01.4: Crear la carpeta constants.

T01.5: Crear constants/scpData.ts.

T01.6: Agregar el primer SCP de prueba.

T01.7: Agregar cuatro SCP adicionales.

T01.8: Crear un archivo temporal de verificación.

T01.9: Importar los mocks y ejecutar console.log.

T01.10: Verificar los datos en la terminal.

T01.11: Eliminar el archivo temporal.

Por favor, procede a crear y modificar los archivos correspondientes.

# Segundo Prompt

## A partir de ahora, los prompts abarcaran subtareas de forma mas controlada y fragmentda, para manejar y revisar el codigo de mejor manera.
<<<<<<< HEAD
=======

>>>>>>> 546a6e32c4c4926ebfb0a3db9a70ca5e30d006be
Vamos a comenzar con la Fase T02. Para asegurarme de que el código sea exacto, vamos a trabajar paso a paso.

Sigue teniendo en cuenta las reglas de nuestro .github/copilot-instructions.md y la arquitectura del spec.md.

Por favor, ejecuta única y exclusivamente las siguientes subtareas. No implementes el CRUD todavía. Solo quiero la estructura inicial del servicio:

T02.1: Crear la carpeta services.

T02.2: Crear el archivo services/scpService.ts.

T02.3: Importar la interfaz SCPEntity desde nuestro archivo de tipos y la data de scpData desde constantes.

T02.4: Crear una función auxiliar (ej. delay) que use Promesas y setTimeout para simular latencia de red (ej. 500ms).

Escribe el código para estas tareas y detente. Avísame cuando esté listo.

## Prompt para finalizar el testeo de la fase 2

Para finalizar completamente la Fase T02, vamos a probar que la lógica y la latencia funcionen correctamente antes de pasar a la interfaz.

Por favor, ejecuta las siguientes subtareas:

T02.10: Crear un archivo temporal de prueba (ej. services/testService.ts).

T02.11: En ese archivo, escribir una función autoejecutable o script que primero llame a getAllSCPs e imprima el resultado en consola, verificando que la latencia funcione.

T02.12: En el mismo script, probar la creación de un nuevo SCP ficticio, luego actualizarlo, y finalmente eliminarlo, imprimiendo mensajes de éxito en cada paso.

T02.13: Probar que el manejo de errores funciona intentando buscar (getSCPById) un ID que no exista y capturando el error (try/catch).

Escribe el código de este archivo temporal y dime qué comando debo ejecutar en mi terminal para ver los resultados (por ejemplo, usando npx tsx o node). La subtarea T02.14 (eliminar el archivo) la haré yo manualmente una vez que confirme que todo funciona.

T03.1:Continua con fase 3 y unicamnete as hastas el punto 3.1 y para comprobar que todo esta bien

T03.2:ok ahora continuemos con la T03.2

T03.3:esta todo bien continua con la T03:3

T03.4:continua ahora con la subfase T03.4

T03.5:continuemos con T03.5:Implementar la carga inicial.

T03.6:bien parece esta todo en orden continuemos con la subface T03.6

T03.7:ahora continuemos con la siguiente sub face -T03.7: Implementar createSCP.

T03.8:continuemos con la siguiente el T03.8: Implementar updateSCP.

T03.9:Continuemos con la subface T03.9

T03.10:ok todo parece esta bien ahora continuemos con la subface T03.10: Exportar SCPProvider y useSCP

T03.11:ahora realiza la subface T03.11: Envolver la aplicación con SCPProvider en app/\_layout.tsx. ademas otra cosa que quiero que haga durante todo este proceso que estamos haciendo de realizar las face es que expliques que esta haciendo

T03.12:bien ahora debes de hacer la siguiente subface la T03.12: Crear una pantalla temporal de prueba.

T03.13:ahora hagamos la siguiente subface T03.13: Mostrar los SCPs desde el contexto.

T03.14:bien ahora queda la ultima subface,realiza la T03.14

T04:bien parece que esta todo correcto ahora vamos con la siguiente face la 4 manteniendo todo las reglas que estuvimos haciendo con la 3

las subfase T04.1,2,3 ya fueron creada tras la instalacion de expo go por eso no son mensionado en este archivo

T04.4:ok bien realiza la subfase T04.4

T04.5:bien ahora continuemos con la siguiente subface la T04.5 Agregar el indicador de carga.

T04.6:todo esta bien,realiza la subface T04.6

T04.7:para la siguiente subface T04.7 puedes ademas de añadir el error añadir un boton que permita mostrar una lista vacia para validar el mensaje de la anterio subface

T04.8:Bien ahora continuemos con la subface - T04.8: Agregar el botón de reintento.

T04.9:Bien continuemos ahora con la Subface T04.9: Agregar la FlatList.

T04.10:continua ahora con subfase T04.10

T04.11:ok entiendo ahora bien entonce esta bien ahora realiza la siguiente subface - T04.11 Mostrar ItemNumber, Class y un extracto de los primeros 100 caracteres de Description.

T04.12:continuemos con la ultima subfase la T04.12

T05:bien vamos a continuar ahora con la fase T05: Componente SCPCard

T05.2:ok entonce vamos por la siguiente la subfase T05.2

T05.3:bien continuemos con la subfase T05.3: Definir las propiedades del componente.

T05.4:bien ademas de continuar la siguiente fase -T05.4: Mostrar el número de ítem, quiero que saque las funciones que utilizamos de prueba en la anterio fase

T05.5:ok entonces continuemos con la subfase - T05.5: Mostrar la clase.

T05.6:continua ahora con la subfase T05.6: Crear el color correspondiente a cada clase

T05.7:me equivo esta subfase debe de hacer primero T05.7: Mostrar los primeros 100 caracteres de la descripción.

T05.8:bien ahora continuea con las siguiente subfase T05.8: Agregar la navegación con router.push()

T05.9:ok tiene que seguir la siguiente subfases T05.9: Reemplazar la tarjeta provisional en index.tsx.

T05.10 y la .11 son actividad de verificacion asi que no necesitan de un prompt

T06:bien ya termino entonce la fase 5 continuemos con la fase 6 la primera subfase dice T06.1: Crear app/[id].tsx.

T06.2:seguimo con la siguiente subfase - T06.2: Obtener el id mediante useLocalSearchParams().

T06.3:ok entonce ahora haremos la subfase T06.3: Buscar el SCP mediante getSCPById del contexto.

T06.4:has ahora la subfase T06.4: Mostrar el estado de carga.

# Siguiente set de promps para terminar el proyecto

Manteniendo estrictamente las reglas de nuestro .github/copilot-instructions.md (fondo negro, texto verde neón), ejecuta única y exclusivamente estas subtareas sobre ese archivo:

T06.5: Mostrar un mensaje claro de "SCP no encontrado" en caso de que la búsqueda no retorne datos.

T06.6: Mostrar el ItemNumber en la parte superior como título principal (tamaño grande).

T06.7: Mostrar la Class justo debajo, utilizando un badge (un contenedor con fondo o borde de color específico según sea Safe, Euclid, Keter o Thaumiel).

Escribe el código necesario para integrar solo estos tres elementos visuales. Asegúrate de usar StyleSheet.create para los estilos. Muestra cómo queda el componente y detente ahí para que pueda revisarlo.

# Ya verificado

El encabezado y los mensajes de estado se ven perfectos. Sigamos trabajando sobre el mismo archivo app/[id].tsx.

Ahora quiero que agregues el contenido principal del SCP, manteniendo nuestras reglas de estilo (.github/copilot-instructions.md): fondo negro, texto verde neón y uso de StyleSheet.

Ejecuta única y exclusivamente las siguientes subtareas:

T06.8: Mostrar la sección de ContainmentProcedures. Asegúrate de ponerle un subtítulo claro (ej. "Procedimientos de Contención") y un margen/espaciado adecuado para que el texto largo sea legible.

T06.9: Mostrar la sección de Description. Al igual que el punto anterior, agrégale su subtítulo (ej. "Descripción") y buena separación del bloque anterior.

Nota: Como estos campos pueden contener mucho texto, asegúrate de que el contenedor principal de la pantalla sea un ScrollView si aún no lo es.

Actualiza el código del componente con estas dos secciones y detente ahí para que pueda probar la lectura en el dispositivo.

# Comenzando con la tarea 7

Vamos a comenzar con la Fase T07 (Pantalla de creación). Como los formularios pueden ser complejos, vamos a construirlo paso a paso.

Siguiendo estrictamente nuestras reglas de estilo en .github/copilot-instructions.md (fondo negro, texto verde neón, StyleSheet y componentes funcionales), ejecuta única y exclusivamente estas subtareas:

T07.1: Crear el archivo app/create.tsx.

T07.2: Crear el estado inicial del formulario usando useState. (Puede ser un objeto que contenga los campos ItemNumber, Class, ContainmentProcedures y Description, o estados separados, lo que consideres más limpio).

T07.3: Renderizar el campo ItemNumber. Debe ser un TextInput con estilo de terminal, con un texto tipo label arriba que diga "Número de Ítem (ej. SCP-173)".

Nota: Asegúrate de envolver la vista principal en un KeyboardAvoidingView y ScrollView para que el teclado no tape el formulario más adelante.

Escribe el código de este archivo con estas configuraciones iniciales y detente ahí para que pueda revisarlo.

# Siguiente set de pasos

Vamos a seguir agregando los campos visuales al formulario en app/create.tsx.

Manteniendo nuestras reglas de estilo en .github/copilot-instructions.md (fondo negro, texto/bordes verde neón), ejecuta única y exclusivamente las siguientes subtareas:

T07.4: Crear el selector de Class. Como no queremos añadir dependencias extra, implementa esto como un grupo de 4 botones (chips) usando Pressable o TouchableOpacity para las opciones: Safe, Euclid, Keter y Thaumiel. El botón seleccionado debe cambiar de estilo (por ejemplo, fondo verde neón y texto negro) para indicar que está activo.

T07.5: Crear el campo ContainmentProcedures. Debe ser un TextInput con la propiedad multiline={true} y un alto mínimo para que el usuario pueda escribir varios párrafos. Añade su respectivo label.

T07.6: Crear el campo Description. Igual que el anterior, un TextInput multilínea con su label.

Actualiza el código de la vista y los estilos (StyleSheet) para incluir estos tres elementos y detente ahí. Aún no agregues la lógica de guardado ni las validaciones de error.

# Ya implementado el formulario de creacion, procedemos a crear los mensajes de validacion y errores

La interfaz del formulario y los campos multilínea funcionan perfecto. Ahora, trabajando sobre el mismo archivo app/create.tsx, vamos a implementar la lógica de validación visual antes de conectarlo con el estado global.

Mantén las reglas de estilo de .github/copilot-instructions.md. Para los textos de error, utiliza un color que resalte adecuadamente en el fondo negro (por ejemplo, rojo o un naranja/amarillo de alerta).

Ejecuta única y exclusivamente las siguientes subtareas:

T07.7: Crear un nuevo estado (useState) para manejar los errores del formulario. Puede ser un objeto que guarde el mensaje de error específico para cada campo.

T07.8: Crear una función (ej. validateForm) que evalúe el estado actual. Debe verificar que los campos ItemNumber, ContainmentProcedures y Description no estén vacíos, y que se haya seleccionado una Class. Si un campo falla, debe actualizar el estado de errores.

T07.9: Modificar la vista para renderizar de forma condicional los mensajes de error debajo de su respectivo campo si es que existen en el estado