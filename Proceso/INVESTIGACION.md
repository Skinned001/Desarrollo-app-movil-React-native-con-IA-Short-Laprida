# Investigacion

# -- React Native --

## ¿Qué es y qué problema resuelve? ¿Cómo logra que código JavaScript termine mostrando componentes nativos en el teléfono?

Creado en Facebook y publicado en Febrero de 2015 React Native es un framework para la creación de aplicaciones nativas para iOS y Android. Para programar aplicaciones usando React Native usamos como lenguaje de programación JavaScript, en lugar de Swift, JAVA u otros lenguajes y por el resto usamos React para la creación de la interfaz del usuario.

React Native soluciona el problema de tener que crear y mantener dos aplicaciones móviles separadas (una para iOS y otra para Android). Permite a los programadores usar un solo lenguaje de programación, JavaScript, para construir aplicaciones que funcionen en ambos sistemas operativos al mismo tiempo.

React Native convierte tu código JavaScript en componentes móviles reales a través de un proceso llamado puente (o bridge) y un motor de JavaScript. En lugar de mostrar una página web (como hace una aplicación web móvil), la aplicación crea elementos reales del sistema operativo de tu teléfono (como iOS o Android).

## Fuentes:

https://codigofacilito.com/articulos/que-es-react-native

https://www.doonamis.com/react-native-que-es-ventajas-desventajas/

## ¿En qué se diferencia del desarrollo nativo puro (Kotlin/Swift) y de las apps híbridas basadas en web (Ionic, PWA)? Ventajas y desventajas de cada enfoque.

\*Una app nativa es la que se desarrolla específicamente para cada sistema operativo usando sus herramientas oficiales: Xcode con Swift para iOS, y Android Studio con Kotlin para Android. Es la opción más cara y la más lenta, pero también la que da el mejor rendimiento y la mejor experiencia de usuario.

Ventajas:

Rendimiento máximo: la app aprovecha al 100 % los recursos del dispositivo.

Acceso completo a hardware: cámara avanzada, sensores, biometría, NFC, ARKit, ARCore.
Experiencia de usuario perfectamente integrada con cada sistema operativo.

Mejor rendimiento en gráficos, animaciones complejas y procesos en tiempo real.

Desventajas:

Coste orientativo: alto.

Hay que desarrollar dos apps (una para iOS y otra para Android) y mantener dos bases de código en paralelo, lo que en una app de complejidad media puede suponer entre un 60 % y un 100 % más de coste frente a las otras opciones.

\*Una app híbrida es esencialmente una web empaquetada dentro de un contenedor nativo. El contenido se renderiza en un WebView (un mini-navegador escondido) y se publica en las stores como si fuera una app cualquiera. Tecnologías clásicas: Cordova, PhoneGap, Ionic (en su modo WebView).

Ventajas:

Coste de desarrollo muy bajo.

Tiempo de desarrollo rápido (cualquier equipo web puede hacerlo).

Una sola base de código para iOS y Android.

Desventajas:

Las apps híbridas suelen ofrecer una experiencia notablemente peor que las nativas o multiplataforma modernas. Notarás lags en las transiciones, problemas de rendimiento en listados largos y limitaciones serias para acceder a funcionalidades nativas del dispositivo. En 2026, con Flutter y React Native ya tan maduros, muy pocas empresas eligen híbrida clásica para producto profesional.

\*Una PWA (Progressive Web App) es una web moderna con superpoderes. Funciona en cualquier navegador, pero el usuario puede «instalarla» en la pantalla de inicio del móvil sin pasar por App Store ni Google Play. Una vez instalada, se comporta como una app: funciona offline, recibe notificaciones push, se abre en pantalla completa y carga muy rápido.

Ventajas:

Sin coste de stores: no hay que pagar el 99 € anual de Apple ni el 25 € de Google.

Actualización instantánea: los cambios se publican como en una web, sin esperar la revisión de Apple ni de Google.

Sin proceso de aprobación: evitas que Apple o Google rechacen tu app por motivos arbitrarios.

Un solo desarrollo que funciona en iOS, Android, escritorio y cualquier dispositivo con navegador.
SEO real: la PWA es indexable por Google, lo que la app nativa no consigue.

Desventajas:

No aparece en las stores, lo que limita el descubrimiento orgánico.
Acceso restringido a algunas funcionalidades nativas (biometría avanzada, Bluetooth LE complejo, NFC en iOS).
La experiencia, aunque muy buena, no llega al 100 % de fluidez de una app nativa.

## Nombren 3 apps conocidas construidas con React Native.

Apps creadas con React Native

Facebook: La red social utiliza este framework, el cual fue creado por ellos mismos, para optimizar el rendimiento de sus funciones principales y mantener un desarrollo ágil en iOS y Android.

Instagram: Implementó la tecnología para integrar código compartido entre plataformas de forma sencilla, permitiendo que funciones como las notificaciones push o la edición de perfiles se carguen de manera mucho más rápida.

Discord: La famosa plataforma de comunicación construyó su aplicación móvil utilizando casi en su totalidad el mismo código tanto para iOS como para Android, logrando un rendimiento fluido y libre de errores de forma masiva.

# -- Expo --

## ¿Qué agrega Expo sobre React Native "pelado"? ¿Qué es Expo Go y por qué facilita probar en el teléfono?

_Expo agrega herramientas y servicios que permiten eliminar la complejidad de gestionar código nativo, Expogo es un entorno de aprendizaje y también es un entorno de prueba para ejecutar código de reactNative o JavaScript sin que tenga que antes compilar el código_

_-cita La respuesta generada por el buscador de google, la propia pagina web de expoGo_

## ¿Qué es expo-router y cómo maneja la navegación?

_Expo-router es una biblioteca creada con expo y se la utiliza para el enrutamiento de archivo en aplicación universales de react native y web, expo-router utiliza una navegación por defecto llamada navegación por pilas que consiste en administa pantallas en una pila de ultima en entrar, primera en salir donde cada pantalla agregada a la pila representa una vista distinta de la aplicación y al navegar en una nueva pantalla la empuja hacia la pila pero si se navega hacia atrás elimina la pantalla superior de la pila_

_-Respuesta automática generada por el buscador de google, https://medium.com/@tahnyybelguith/exploring-stack-navigation-and-screens-in-react-native-32e38db3b213_

## ¿Cuándo conviene usar Expo y qué limitaciones tiene?

_Conviene usar Expo cuando se quiere desarrolla una aplicación móvil sin saber mucho de esta ya que este minimiza la complejidad inicial y también es recomendad si necesitas hacer una aplicación móvil en poco tiempo, pero si se quiere realizar aplicación que sea mucho mas grande además no puede utilizar librerías de terceros que contengan código nativo personalizado_

_-Vision genera por el buscador de google, https://www.reddit.com/r/reactnative/comments/1q9253d/is_expo_really_worth_it_coming_from_bare_react/?tl=es-419_

# --SDD — Spec-Driven Development--

## ¿Qué es el desarrollo guiado por especificaciones y por qué apareció junto con los agentes de IA? ¿Qué es el "vibe coding" y qué problemas trae?

El desarrollo basado en especificaciones (SDD) es una metodología de software en la que se crea y acuerda una especificación detallada de los datos de implementación antes de que comience el desarrollo. En otras palabras, sirve como una fuente única de información sobre qué construir y cómo hacerlo.
Apareció junto con los agentes de IA porque los modelos de lenguaje actuales son muy buenos escribiendo texto y código, pero pueden cometer errores, inventar información (alucinaciones) o desviarse de la tarea. Darles especificaciones claras actúa como un mapa estricto que los mantiene enfocados y garantiza que el resultado final sea seguro y exacto.

https://www.ibm.com/mx-es/think/topics/spec-driven-development

El vibe coding es una técnica donde una persona crea software dándole instrucciones en lenguaje natural a la inteligencia artificial (IA), sin necesidad de escribir el código fuente línea por línea. El usuario describe la idea o la funcionalidad que desea, y la IA genera el programa por él.
El uso de esta técnica sin supervisión técnica presenta múltiples desafíos:
Falta de comprensión: Al no escribir el código tú mismo, es muy difícil entender cómo funciona el sistema internamente. Cuando algo falla, es imposible repararlo.

Acumulación de errores: Al pedirle a la IA que arregle errores previos, a menudo genera otros nuevos. La IA no recuerda todas las decisiones pasadas, lo que da lugar a un código inmanejable y confuso (conocido como código espagueti).

Vulnerabilidades de seguridad: Las aplicaciones creadas de esta forma suelen tener la validación de datos únicamente en la parte visual (frontend), dejando las bases de datos y APIs expuestas a ataques externos.

Productos inestables: Pueden surgir problemas graves, como la pérdida de datos de usuarios, fallos al procesar pagos o un uso excesivo de recursos que termina tumbando la aplicación.

Escalabilidad nula: Es útil para crear prototipos rápidos, pero las aplicaciones grandes se vuelven imposibles de mantener sin conocimientos reales de arquitectura de software.

Respuestas generadas de videos explicativos de Youtube por Gemini

## ¿Cuál es el flujo típico de SDD? (reglas del proyecto → especificación → plan técnico → tareas →implementación)

Este enfoque secuencial es la metodología de oro cuando trabajas con agentes de IA. Si le pides a una IA que construya una aplicación de cero sin este flujo, terminará inventando arquitecturas o perdiendo el contexto. Al obligarla a seguir estos pasos, garantizas un código predecible y escalable.

Etapas en este flujo:

1. Reglas del Proyecto (El Contexto Global)
   Antes de escribir una sola línea de código, se establecen las "leyes" inmutables del proyecto. Esto le da al equipo (o al agente de IA) los límites dentro de los cuales debe trabajar.
   Qué incluye: El stack tecnológico exacto (ej. Next.js, Tailwind, PostgreSQL), convenciones de nomenclatura, patrones de arquitectura (ej. MVC), y reglas de linter.
   En la práctica: Suele ser un archivo estático en la raíz del proyecto (como .cursorrules, GEMINI.md o rules.md) que la IA lee automáticamente en cada interacción.

2. Especificación (El "Qué")

Aquí defines qué es exactamente lo que vas a construir desde la perspectiva del usuario y del negocio, sin entrar todavía en detalles de código.

Qué incluye: Historias de usuario, requisitos funcionales ("el usuario debe poder resetear su contraseña"), requisitos no funcionales (tiempos de carga, accesibilidad) y el alcance (qué no se va a hacer).

En la práctica: Un documento de Producto o un PRD (Product Requirements Document) claro que describe el comportamiento esperado del sistema.

3. Plan Técnico (El "Cómo")

Tomas la especificación y la traduces a arquitectura de software. Este es el núcleo del SDD.

Qué incluye: Esquemas de bases de datos, diseño de la API (endpoints y payloads), estructura de carpetas, gestión del estado de la aplicación e integraciones con servicios de terceros.

En la práctica: El agente de IA analiza la especificación y te propone este plan. Tú lo revisas, corriges las fallas lógicas y lo apruebas.

4. Tareas (La División Atómica)

Desglosas el Plan Técnico en pasos tan pequeños y específicos que no dejan margen a la ambigüedad.

Qué incluye: Una lista secuencial de hitos de desarrollo. El orden importa muchísimo (ej. no puedes construir el frontend del inicio de sesión sin antes tener la tabla de usuarios en la base de datos).

En la práctica: Un archivo de tareas (tasks.md o un tablero de tickets) con casillas de verificación. A los agentes de IA se les instruye leer este archivo y ejecutar solo la siguiente tarea no completada.

5 Implementación (La Ejecución)

Es la fase final donde el código se escribe, se prueba y se integra.

Qué incluye: Escribir el código de una sola tarea, crear las pruebas unitarias, revisar si rompe algo existente y marcar la tarea como completada.

En la práctica: Le dices a tu agente: "Ejecuta la tarea 3 de nuestro plan". El agente lee el contexto, escribe los archivos necesarios, los verifica y se detiene a esperar tu aprobación para la tarea 4.

## ¿Qué herramientas existen? Investiguen al menos GitHub Spec Kit y una alternativa (por ejemplo Kiro). ¿Con qué agentes de IA funcionan

El Desarrollo Orientado a Especificaciones (SDD - Spec-Driven Development) ha impulsado la creación de herramientas diseñadas específicamente para evitar el "vibe coding" (programar a ciegas basándose solo en prompts) y obligar a los agentes de IA a planificar antes de escribir código.

Spec Kit es un conjunto de herramientas de código abierto (un CLI y plantillas) creado por GitHub. Su objetivo principal no es ser un IDE, sino proporcionar el "andamiaje" o proceso estructurado que cualquier agente de IA puede seguir.

Funciona mediante una serie de comandos en tu terminal que generan artefactos en formato Markdown. El flujo predeterminado es:

/speckit.specify: Tomas una idea en lenguaje natural y la IA genera un documento de requisitos (spec.md) centrado en el usuario y el negocio, sin decisiones de código.

/speckit.plan: La IA lee las especificaciones y reglas del proyecto para crear un diseño técnico y de arquitectura (plan.md).

/speckit.tasks: El plan técnico se divide en una lista de tareas secuenciales (tasks.md).

/speckit.implement: El agente de IA finalmente escribe el código iterando sobre cada tarea de la lista.

La gran ventaja de Spec Kit es que no te ata a ningún proveedor. Cuenta con más de 35 integraciones oficiales. Cuando inicializas un proyecto, eliges tu agente y Spec Kit adapta sus comandos automáticamente para:

\*GitHub Copilot

\*Gemini CLI (de Google)

\*Claude Code (de Anthropic)

\*Cursor y Zed (IDE)

\*Codex, Forge e incluso Kiro

Kiro AI (Amazon Kiro)

Mientras que Spec Kit es un "complemento" para cualquier agente, Kiro es un entorno completo creado por Amazon Web Services (AWS) que tiene el concepto de SDD integrado nativamente en su ADN. Está disponible como un IDE (basado en VS Code), una aplicación web y un CLI.

El enfoque de Kiro asume que la mayoría de los errores de la IA no ocurren porque escriba mal código, sino porque malinterpreta lo que el desarrollador realmente quiere construir. En Kiro, antes de generar un solo archivo de código, la herramienta produce documentos de requisitos formales y diseños de sistema. Solo una vez que tú apruebas las especificaciones, los agentes de Kiro proceden a dividirlas en tareas y ejecutarlas.

Además de la programación, Kiro permite usar Agent Hooks (automatizaciones en segundo plano que, por ejemplo, actualizan las pruebas unitarias o la documentación cada vez que modificas un archivo) y soporta el Model Context Protocol (MCP) para conectarse con infraestructura cloud, bases de datos o servicios externos.

https://github.github.com/spec-kit/#:~:text=GitHub%20Spec%20Kit.%20Spec-Driven%20Development%20or%20your,your%20own%2C%20keeping%20intent%20at%20the%20center.}

https://blog.vibecoder.me/amazon-kiro-spec-driven-development-reviewed

# Agentes de código y skills

## ¿Qué es un agente de código (Claude Code, GitHub Copilot, Cursor, Gemini CLI) y en qué se diferencia de un chat común?

_los agentes de código son un sistema autónomo que se encargar de editar, comprender y de ejecutar comando en la termina y de resolver tareas complejas se diferencia de un chat común es que este actúa en todo el proyecto modificando o realizando entregas soluciones empaquetada a diferencia del chat ia que se encarga de responde y redactar framentos de texto o código que el usuario le pasa_

_-cita el generador de respuesta automática de google_

## ¿Para qué sirven los archivos de contexto como AGENTS.md o CLAUDE.md ?

_Sirven principalmente para darle las instrucciones básica al agente cada ves que se inicia sesión indicando como este debe de comportarse y que información necesita saber del proyecto_

_*-https://www-mindstudio-ai.translate.goog/blog/what-is-claude-md-file-ai-agents?_x_tr_sl=en&_x_tr_tl=es&_x_tr_hl=es&_x_tr_pto=tc*_

## ¿Qué son las skills de un agente? ¿Dónde se consiguen skills hechas por la comunidad y cómo se instalan?

_las skills son paquetes modulares y instrucciones portátiles de instrucciones que amplían las capacidad de un agente permitiendo realizar tareas mas especificas, para conseguir las skills de la comunidad se consigue principalmente en plataformas y repositorios abierto distribuidos por internet como puede ser GitHub,skills.sh entre otros, para la instalación dependerá de como utilices tu agentes pero la mas sencilla es la descargarlo de forma Manuel los archivo y colocarlo en las ruta donde el agente almacena las skills_

_-respuesta generada por el buscador de google de ia_

# --Mocks--

## ¿Qué es un mock y por qué permite desarrollar un frontend completo sin tener backend?

_Un mocks es un componente o objeto simulado que imita el comportamiento de uno real, porque al imitar los componente permite hacer la funciones de llamar a la base de datos y entregando algo falso haciendo que el sistema crea que lo hiso en realidad pero realmente no ocurrió_

_-cita respuesta generada por la ia del buscador de google_

## ¿Qué estrategias hay en React Native? (JSON estático, servicio simulado con Promise + setTimeout ,AsyncStorage )

_se podria utilizar los json estatico para realizar maquetacion rapida como puede ser la interfas visual tambien se puede utiliza promise + setTimeout si se necesita verificar como este se ve la pantalla de carga y tambien como reacciona la app si la conexio va lenta y por ultimo si se utiliza asyncStorage sirve para comprobar la persistencia como puede ser si se mantiene la configuracion de la app si esta se cierra y se vuelve abrir_

_-cita respuesta obtenida enbace a lo que la ia de deeepseek entrego_
