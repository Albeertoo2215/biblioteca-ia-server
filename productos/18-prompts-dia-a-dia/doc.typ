// archivo: 100 prompts para el dia a dia - casi3.pdf
#import "casi3.typ": *
#let c = rgb("#6d5bd0")
#let p(t, x) = block(breakable: false, above: 4mm, below: 4mm, { text(font: sans, weight: 700, size: 10.5pt, fill: c)[#t]; v(-0.5mm); block(width: 100%, fill: marino, radius: 2.5mm, inset: 4mm, text(font: ("DejaVu Sans Mono",), size: 8.6pt, fill: rgb("#e6eefc"))[#x]) })
#show: documento.with(titulo: "100 prompts para el día a día", subtitulo: "100 instrucciones probadas para ChatGPT, Claude o Gemini: cocina, dinero, estudios, trabajo, salud, casa, viajes y escribir mejor.", seccion: "Packs de IA · casi3", color: c, fuentes: [_Los prompts son plantillas para usar con cualquier asistente de inteligencia artificial. Revisa siempre las respuestas: la IA puede equivocarse, sobre todo con cifras, leyes y datos recientes. No compartas datos personales sensibles (DNI, contraseñas, datos médicos con tu nombre)._])
= Cómo sacarles partido
#datos(dato("100", [instrucciones listas para copiar y pegar.], color: c), dato("9", [áreas de tu vida, de la cocina a las decisiones importantes.], color: c), dato("[ ]", [Lo que va entre corchetes es lo que cambias tú.], color: c))
#v(3mm)
Un buen prompt es la diferencia entre una respuesta genérica y una que de verdad te sirve. Estos están escritos para que la IA entienda el contexto, no se invente cosas y te dé algo que puedas usar al momento.
== Las 5 reglas
#table(columns: (0.5fr, 1.5fr, 2.5fr), [], [Regla], [Por qué], [1], [Da contexto], [Quién eres, para qué lo quieres y para quién es. Sin contexto, la respuesta es genérica.], [2], [Pide un formato], [Lista, tabla, 3 versiones, máximo 100 palabras… La IA lo cumple y te ahorra editar.], [3], [Pide que pregunte], [Añade: «Si te falta información, pregúntame antes de responder».], [4], [Itera], [La primera respuesta es un borrador. Pide «más corto», «más concreto», «otro tono».], [5], [Comprueba], [Cifras, leyes, fechas y datos médicos: verifícalos siempre en fuentes oficiales.])
#aviso(titulo: "Frase comodín", color: c)[Añade al final de cualquier prompt: «Antes de responder, hazme las preguntas que necesites para que la respuesta sea específica para mi caso».]
= Cocina y comida
#text(size: 11pt, fill: gris)[Comer mejor sin pensar cada día qué hacer.]
#p("Menú con lo que hay en la nevera", "Tengo en casa: [lista de ingredientes]. Propón 3 cenas para hoy que usen sobre todo esto, de menos de 30 minutos, con ingredientes y pasos. Indica qué me faltaría comprar.")
#p("Menú semanal con lista de la compra", "Hazme un menú de comidas y cenas de lunes a domingo para [número] personas, con presupuesto ajustado y legumbres 3 veces. Después, la lista de la compra agrupada por secciones del supermercado y qué cocinar el domingo para adelantar.")
#p("Adaptar una receta", "Adapta esta receta para que sea [sin gluten / vegetariana / para 6 personas / en freidora de aire]. Mantén el sabor lo más parecido posible: [pega la receta].")
#p("Aprovechar sobras", "Me han sobrado [sobras]. Dame 4 ideas para convertirlas en otro plato distinto mañana.")
#p("Fiambrera para el trabajo", "Dame 10 ideas de comidas para llevar al trabajo que aguanten bien en táper sin microondas, con ingredientes baratos.")
#p("Cena para invitados", "Voy a tener [número] invitados, uno de ellos [alergia o dieta]. Propón un menú de entrante, principal y postre que pueda dejar casi todo hecho antes y un horario de preparación.")
#p("Leer una etiqueta", "Te paso la lista de ingredientes y la tabla nutricional de este producto. Explícame en lenguaje claro si es buena opción para el día a día y con qué alternativa podría compararlo: [pega la etiqueta].")
#p("Desayunos rápidos", "Dame 7 desayunos distintos de menos de 5 minutos, con proteína y sin bollería.")
#p("Batch cooking", "Diseña una sesión de batch cooking de 2 horas para tener comidas de lunes a jueves para [número] personas. Orden exacto de tareas para aprovechar el horno y los fuegos a la vez.")
#p("Cocinar para niños", "Propón 5 cenas que gusten a niños de [edad] e incluyan verdura de forma que no se note demasiado.")
#p("Lista de la compra ordenada", "Ordena esta lista de la compra por las secciones habituales de un supermercado español: [lista].")
#p("Sustitutos", "Me falta [ingrediente] para esta receta. ¿Con qué lo sustituyo de lo que suele haber en casa y en qué cantidad?")
= Dinero
#text(size: 11pt, fill: gris)[Entender y controlar tus finanzas sin ser experto.]
#p("Analizar mis gastos", "Te pego mis movimientos del último mes (sin datos personales): [pega]. Agrúpalos por categorías, dime cuánto se va en cada una y 3 recortes concretos que podría hacer sin notarlo mucho.")
#p("Presupuesto 50/30/20", "Cobro [cantidad] netos al mes y pago [alquiler o hipoteca] de vivienda. Hazme un presupuesto con la regla 50/30/20 adaptado a mi caso y dime qué categorías vigilar.")
#p("Plan para salir de deudas", "Tengo estas deudas: [deuda, saldo, interés y cuota de cada una]. Explícame los métodos bola de nieve y avalancha con mis números y cuál me conviene.")
#p("Fondo de emergencia", "Mis gastos fijos son [cantidad] al mes y puedo ahorrar [cantidad]. ¿Cuánto debería tener en el fondo de emergencia y en cuánto tiempo lo consigo? Dame un plan mes a mes.")
#p("Entender un contrato", "Explícame en lenguaje claro este contrato o estas condiciones: qué me compromete, qué costes tiene, qué penalizaciones y qué debería preguntar antes de firmar. No me des asesoramiento legal, solo explícalo: [pega el texto].")
#p("Negociar una factura", "Escribe el guion de una llamada para pedir a mi compañía de [internet / luz / seguro] que me baje el precio. Pago [cantidad] y la competencia ofrece [oferta].")
#p("Comparar dos ofertas", "Compara estas dos ofertas teniendo en cuenta el coste total en 12 y 24 meses, permanencias y letra pequeña: [oferta A] y [oferta B].")
#p("Ahorrar para un objetivo", "Quiero ahorrar [cantidad] para [objetivo] antes de [fecha]. ¿Cuánto tengo que apartar al mes y qué podría recortar para conseguirlo?")
#p("Entender la nómina", "Explícame cada línea de esta nómina y por qué cobro lo que cobro (he quitado mis datos): [pega].")
#p("Conceptos de inversión", "Explícame como si no supiera nada qué es un fondo indexado, qué riesgos tiene y qué preguntas debería hacer antes de invertir. No me recomiendes productos concretos.")
= Estudios
#text(size: 11pt, fill: gris)[Aprender más en menos tiempo.]
#p("Profesor particular", "Explícame [tema] como si tuviera 15 años, con un ejemplo de la vida diaria. Después hazme 3 preguntas para comprobar que lo he entendido y corrígeme.")
#p("Test de repaso", "Con este texto, hazme 10 preguntas tipo test de 4 opciones. No inventes nada que no esté en el texto. Al final las soluciones con la frase que lo justifica: [pega el texto].")
#p("Resumen y esquema", "Convierte este tema en un esquema jerárquico con las ideas principales y, al final, un resumen de 10 líneas: [pega el tema].")
#p("Tarjetas de memoria", "Crea 20 tarjetas pregunta-respuesta de este contenido, en formato de dos columnas para copiar en una app de tarjetas: [pega].")
#p("Plan de estudio", "Tengo examen de [asignatura] el [fecha] y [horas] al día. Estos son los temas: [lista]. Hazme un calendario con repasos espaciados y simulacros.")
#p("Corregir una redacción", "Corrige esta redacción: señala los errores de ortografía, gramática y estilo, explica cada uno y dame una versión mejorada sin cambiar mis ideas: [pega].")
#p("Ejercicios de matemáticas", "Hazme 5 ejercicios de [tema] de dificultad creciente. No me des la solución hasta que te mande la mía, y entonces corrígeme paso a paso.")
#p("Aprender un idioma", "Vamos a practicar [idioma] a nivel [nivel]. Habla conmigo sobre [tema] y corrige mis errores al final de cada mensaje, explicando la regla.")
#p("Entender un texto difícil", "Explícame este texto párrafo a párrafo con palabras sencillas y dime cuál es la idea principal: [pega].")
#p("Preparar una exposición", "Tengo que exponer [tema] en [minutos] minutos. Hazme una estructura con tiempos, lo que diría en cada parte y las 5 preguntas que me pueden hacer.")
= Trabajo y productividad
#text(size: 11pt, fill: gris)[Menos tiempo con lo que no aporta.]
#p("Email difícil", "Ayúdame a escribir un email a [persona] para [objetivo]. El tono debe ser [firme / cercano / formal]. Contexto: [explica]. Dame 2 versiones.")
#p("Resumir una reunión", "Resume estas notas de reunión en: decisiones tomadas, tareas con responsable y fecha, y temas pendientes: [pega].")
#p("Organizar el día", "Estas son mis tareas de hoy: [lista]. Ordénalas por importancia y urgencia, estima cuánto lleva cada una y hazme un horario realista con descansos.")
#p("Decir que no", "Escribe una respuesta educada para rechazar [petición] sin quemar la relación y proponiendo una alternativa.")
#p("Preparar una reunión", "Tengo una reunión con [quién] para [objetivo]. Prepárame un orden del día, las preguntas clave y las objeciones que pueden salir.")
#p("Mejorar un texto", "Haz este texto más claro y más corto sin perder información. Explica qué has cambiado: [pega].")
#p("Fórmula de Excel", "En Excel tengo [describe las columnas]. Quiero [lo que quieres calcular]. Dame la fórmula y explícame cómo funciona.")
#p("Pedir un aumento", "Prepárame la conversación para pedir un aumento: argumentos con mis logros [lista], qué cifra pedir, cómo responder si dicen que no y un email previo para pedir la reunión.")
#p("Feedback a un compañero", "Ayúdame a dar feedback a un compañero sobre [situación] de forma constructiva, con el método situación-comportamiento-impacto.")
#p("Plan de proyecto", "Divide este proyecto en fases, tareas y plazos, con los riesgos principales: [describe el proyecto].")
#p("Responder a un cliente enfadado", "Un cliente me ha escrito esto: [pega]. Escribe una respuesta que reconozca el problema, explique la solución y mantenga al cliente.")
= Salud y deporte
#text(size: 11pt, fill: gris)[Información para organizarte, no para diagnosticarte.]
#p("Rutina de ejercicio", "Hazme una rutina de [días] días por semana de [minutos] minutos para [objetivo], en [casa / gimnasio], para principiante. Incluye calentamiento, ejercicios, series y cómo progresar.")
#p("Preparar una consulta médica", "Voy al médico por [síntoma]. Ayúdame a ordenar lo que me pasa (desde cuándo, cómo, qué lo empeora) y las preguntas que debo hacer. No me diagnostiques.")
#p("Entender un informe", "Explícame en lenguaje sencillo los términos de este informe médico, sin interpretar mi caso, para poder preguntar mejor a mi médico: [pega sin datos personales].")
#p("Rutina para dormir mejor", "Me acuesto a [hora], me cuesta dormirme y me levanto a [hora]. Propón una rutina de las dos horas antes de dormir y cambios de hábitos para 2 semanas.")
#p("Estiramientos para el trabajo", "Trabajo sentado muchas horas. Dame una rutina de 5 minutos de estiramientos para hacer en la silla cada dos horas.")
#p("Plan para caminar más", "Ahora camino unos [pasos] pasos al día. Hazme un plan de 8 semanas para llegar a [objetivo] de forma progresiva.")
#p("Lista de la compra saludable", "Hazme una lista de la compra semanal saludable y barata para [personas] con [preferencias].")
#p("Motivación", "Quiero hacer ejercicio pero siempre lo dejo a las dos semanas. Hazme preguntas para entender por qué y propón un plan para que esta vez dure.")
= Casa y familia
#text(size: 11pt, fill: gris)[Organizar lo de casa sin discusiones.]
#p("Reparto de tareas", "En casa vivimos [personas y edades]. Haz un reparto justo de las tareas semanales con un cuadro por días.")
#p("Limpieza por zonas", "Hazme un plan de limpieza de 15 minutos al día que deje la casa limpia sin dedicar el sábado entero.")
#p("Ordenar un armario", "Ayúdame a decidir qué guardar, donar o tirar de mi ropa. Hazme preguntas como un organizador profesional.")
#p("Planificar un cumpleaños", "Organiza un cumpleaños infantil para [número] niños de [edad] en casa, con presupuesto de [cantidad]: juegos, comida, horario y lista de la compra.")
#p("Actividades con niños", "Dame 10 planes gratis o baratos para hacer con niños de [edad] en [ciudad o tipo de lugar] un fin de semana de lluvia.")
#p("Reclamar algo", "Escribe una reclamación por escrito a [empresa] por [problema], citando mis derechos como consumidor de forma general y pidiendo una solución concreta.")
#p("Mudanza", "Me mudo el [fecha]. Hazme un plan semana a semana con todos los trámites y tareas.")
#p("Mascota", "Voy a adoptar un [animal]. Dame una lista de lo que necesito comprar, gastos aproximados al mes y rutina de las primeras semanas.")
#p("Discutir sin pelear", "Tengo que hablar con [persona] sobre [tema delicado]. Ayúdame a preparar cómo empezar la conversación sin que se ponga a la defensiva.")
= Viajes
#text(size: 11pt, fill: gris)[Planificar mejor y gastar menos.]
#p("Itinerario", "Hazme un itinerario de [días] días en [destino] para [tipo de viajero], con mañana, tarde y noche, agrupando por zonas para no perder tiempo en transporte.")
#p("Presupuesto de viaje", "Estima el presupuesto de un viaje de [días] días a [destino] para [personas] con estilo [económico / medio]. Desglosa por partidas.")
#p("Maleta", "Hazme una lista de maleta para [días] días en [destino] en [mes], solo con equipaje de mano.")
#p("Escapada cerca", "Propón 5 escapadas de fin de semana a menos de [horas] de [ciudad], con qué ver y presupuesto aproximado.")
#p("Frases útiles", "Dame las 30 frases más útiles en [idioma] para un viaje, con pronunciación aproximada.")
#p("Plan si llueve", "Estoy en [ciudad] y llueve. Dame un plan para el día bajo techo.")
= Escribir mejor
#text(size: 11pt, fill: gris)[Para cualquier mensaje que importe.]
#p("Corregir y mejorar", "Corrige este texto y hazlo más claro y natural sin cambiar mi estilo: [pega].")
#p("Cambiar el tono", "Reescribe este mensaje en un tono [más formal / más cercano / más firme]: [pega].")
#p("Felicitación", "Escribe una felicitación de [cumpleaños / boda / jubilación] para [persona y relación], cálida y personal, con estos detalles: [detalles].")
#p("Discurso corto", "Escríbeme un discurso de 2 minutos para [ocasión]. Datos: [detalles]. Que tenga una anécdota y un final emotivo.")
#p("Publicación para redes", "Escribe 3 versiones de una publicación sobre [tema] para [red social], cortas y sin emojis de más.")
#p("Carta formal", "Redacta una carta formal a [organismo] para [solicitud], con los datos que debo completar entre corchetes.")
#p("Resumir un texto largo", "Resume este texto en 5 puntos clave y una frase final: [pega].")
#p("Traducir con naturalidad", "Traduce este texto al [idioma] de forma natural, no literal, adaptando las expresiones: [pega].")
= Crecer y decidir
#text(size: 11pt, fill: gris)[Para pensar con más claridad.]
#p("Tomar una decisión", "Tengo que decidir entre [opción A] y [opción B]. Hazme preguntas para entender mis prioridades y luego un análisis de pros, contras y riesgos de cada una.")
#p("Objetivos del año", "Ayúdame a convertir estos deseos en 3 objetivos concretos y medibles para este año, con hábitos semanales para cada uno: [deseos].")
#p("Revisión semanal", "Te cuento cómo ha ido mi semana: [resumen]. Hazme 5 preguntas de revisión y propón 3 prioridades para la próxima.")
#p("Superar la procrastinación", "Llevo días posponiendo [tarea]. Ayúdame a dividirla en pasos de 10 minutos y a empezar ahora.")
#p("Aprender una habilidad", "Quiero aprender [habilidad] en 3 meses dedicando [horas] por semana. Hazme un plan con recursos gratuitos y cómo medir el progreso.")
#p("Preparar una conversación difícil", "Ayúdame a ensayar una conversación con [persona] sobre [tema]. Haz tú de esa persona y luego dame feedback.")
#p("Diario guiado", "Hazme 5 preguntas para escribir un diario esta noche, centradas en lo que ha ido bien y lo que quiero cambiar.")
= Trámites y papeleo
#text(size: 11pt, fill: gris)[Lo que da pereza, explicado y preparado.]
#p("Qué papeles necesito", "Voy a hacer este trámite en España: [trámite, por ejemplo renovar el DNI o empadronarme]. Hazme la lista de documentos que suelen pedir, dónde se pide cita y qué errores hacen perder el día. Avísame de lo que debo confirmar en la web oficial.")
#p("Escrito de reclamación", "Redacta una reclamación formal a [empresa] por [problema], con fecha de compra [fecha] e importe [importe]. Incluye los hechos en orden, lo que pido y un plazo de respuesta. Tono correcto y firme.")
#p("Recurrir una multa", "Me han puesto una multa por [motivo] el [fecha]. Explícame qué plazos suele haber para pagar con descuento o presentar alegaciones y ayúdame a ordenar mis argumentos: [explica]. No es asesoramiento legal.")
#p("Entender una carta oficial", "Te pego una carta de [Hacienda / Seguridad Social / ayuntamiento] sin mis datos. Dime qué me piden, qué plazo tengo y qué pasa si no respondo: [pega].")
#p("Darse de baja", "Escribe un mensaje para darme de baja de [servicio] pidiendo confirmación por escrito y que no me cobren más. Mi número de cliente es [número].")
#p("Calendario de trámites del año", "Hazme un calendario con los trámites que suele tener una persona en España a lo largo del año: renta, ITV, seguros, impuestos municipales y revisiones. Mi situación: [asalariado / autónomo, coche sí o no, vivienda propia o alquiler].")
#p("Ordenar papeles de casa", "Propón un sistema para guardar los papeles de casa (en carpeta y en el móvil): categorías, cuánto tiempo guardar cada tipo y qué tirar ya.")
= Ocio y relaciones
#text(size: 11pt, fill: gris)[Planes, regalos y conversaciones.]
#p("Regalo que acierta", "Busco un regalo para [persona] de [edad] a la que le gusta [gustos], presupuesto [importe]. Dame 10 ideas que no sean las típicas, con una frase de por qué encaja.")
#p("Plan de fin de semana", "Estoy en [ciudad] con [personas] y [presupuesto]. Propón 3 planes de sábado distintos (tranquilo, activo y con lluvia) con horario aproximado.")
#p("Conversación difícil", "Tengo que hablar con [persona] sobre [tema] y me cuesta. Ayúdame a preparar cómo empezar, qué decir sin culpar y cómo responder si se pone a la defensiva.")
#p("Mensaje de disculpa", "Quiero pedir perdón a [persona] por [lo que pasó]. Escríbelo sincero, sin excusas y sin exagerar, en 2 versiones de distinto tono.")
#p("Fiesta de cumpleaños infantil", "Organiza un cumpleaños para [número] niños de [edad] en casa o en un parque: horario, 4 juegos, merienda y lista de compra.")
#p("Libros o series a mi gusto", "Me han encantado [3 libros, series o películas]. Recomiéndame 8 parecidos explicando qué tienen en común con lo que me gustó.")
#p("Discurso corto", "Escribe un brindis de 1 minuto para [boda / jubilación / cumpleaños] de [persona]. Datos: [anécdotas, relación]. Que emocione sin ser cursi.")
= Tecnología útil
#text(size: 11pt, fill: gris)[Para que el móvil y el ordenador trabajen para ti.]
#p("Fórmula de Excel", "En Excel o Google Sheets tengo [explica columnas]. Quiero [resultado]. Dame la fórmula, explica cada parte y un ejemplo.")
#p("Ordenar el móvil", "Mi móvil va lento y lleno. Dame una lista de pasos en orden para liberar espacio y ordenar apps y fotos en [Android / iPhone] sin perder nada.")
#p("Copia de seguridad", "Explícame cómo tener copia de seguridad de fotos y documentos importantes con la regla 3-2-1, con opciones gratuitas y de pago, para alguien sin conocimientos.")
#p("Contraseñas seguras", "Explícame cómo organizar mis contraseñas con un gestor y la verificación en dos pasos, paso a paso, y qué cuentas proteger primero.")
#p("Detectar un timo", "He recibido este mensaje: [pega, sin datos personales]. Dime qué señales tiene de estafa y qué debo hacer y no hacer.")
