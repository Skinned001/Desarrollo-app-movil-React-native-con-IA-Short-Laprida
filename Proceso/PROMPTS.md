# Primer Prompt

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
