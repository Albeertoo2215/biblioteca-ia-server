// archivo: Correr tus primeros 5 km - casi3.pdf
#import "casi3.typ": *
#let c = rgb("#c2410c")
#show: documento.with(titulo: "Correr tus primeros 5 km", subtitulo: "De caminar a correr 30 minutos seguidos en 9 semanas, sin lesionarte y sin odiarlo.", seccion: "Deporte · casi3", color: c,
  fuentes: [
    - Organización Mundial de la Salud (2020): 150 a 300 minutos semanales de actividad aeróbica moderada para adultos.
    - Programa «Couch to 5K» del Servicio Nacional de Salud británico (NHS), en el que se inspira la progresión de caminar y correr.
    - Test del habla y escala de esfuerzo percibido (RPE) como métodos de control de la intensidad.
    - Recomendaciones habituales de prevención de lesiones por sobrecarga: aumentos graduales de volumen y días de descanso.
    #v(3mm)
    _Si tienes una enfermedad cardiaca, hipertensión no controlada, diabetes o más de 45 años y llevas tiempo sin hacer ejercicio, consulta antes con tu médico. Para si notas dolor en el pecho, mareo o falta de aire desproporcionada._
  ])

= Antes de la primera salida
#datos(dato("3", [salidas por semana, nunca dos días seguidos.], color: c), dato("30 min", [por salida, contando el calentamiento caminando.], color: c), dato("9 sem.", [hasta correr 5 km o 30 minutos seguidos.], color: c))
#v(3mm)
La mayoría de la gente que deja de correr lo hace por lo mismo: sale demasiado rápido, se ahoga a los dos minutos y piensa que «no vale para esto». El secreto de este plan es alternar correr y caminar e ir alargando lo de correr poco a poco. Y correr *despacio*: mucho más despacio de lo que crees.

== El test del habla
#table(columns: (1fr, 2fr),
  [Si puedes…], [Vas…],
  [Cantar], [Demasiado suave: puedes acelerar un poco.],
  [Hablar con frases completas], [Perfecto. Este es el ritmo del plan.],
  [Decir solo palabras sueltas], [Demasiado rápido: frena aunque te parezca que vas andando.])

== Lo que necesitas
#checklist([Zapatillas de correr cómodas. No hace falta gastar mucho: lo importante es que no te hagan rozaduras y que tengan algo de amortiguación.], [Ropa técnica o de algodón ligero (el algodón va bien en distancias cortas).], [Un reloj o el móvil con un temporizador de intervalos.], [Una ruta llana y segura, mejor con tierra o asfalto liso.])

= El plan de 9 semanas
Cada sesión empieza con *5 minutos caminando a paso vivo* y termina con *5 minutos caminando suave*. En la tabla solo aparece la parte central.
#table(columns: (0.7fr, 3fr, 1fr),
  [Semana], [Parte central (repite lo indicado)], [Correr total],
  [1], [Corre 1 min + camina 1 min 30 s, 8 veces], [8 min],
  [2], [Corre 1 min 30 s + camina 2 min, 6 veces], [9 min],
  [3], [Corre 1 min 30 s + camina 1 min 30 s + corre 3 min + camina 3 min, 2 veces], [9 min],
  [4], [Corre 3 min + camina 1 min 30 s + corre 5 min + camina 2 min 30 s, 2 veces], [16 min],
  [5], [Día 1: 5 min corriendo + 3 caminando, 3 veces. Día 2: 8 + 5 + 8. Día 3: 20 min seguidos], [15–20 min],
  [6], [Día 1: 5 + 3 + 8 + 3 + 5. Día 2: 10 + 3 + 10. Día 3: 25 min seguidos], [18–25 min],
  [7], [25 minutos seguidos los tres días], [25 min],
  [8], [28 minutos seguidos los tres días], [28 min],
  [9], [30 minutos seguidos. El último día, si quieres, mide tus 5 km], [30 min])
#aviso(titulo: "¿Una semana se te hace dura?", color: c)[Repítela. No pasa nada por tardar 11 o 12 semanas. Lo que no debes hacer es saltarte semanas para ir más rápido.]

== El día 3 de la semana 5
Es el gran salto: pasas de correr como mucho 8 minutos seguidos a 20. Es más mental que físico. Sal muy despacio, divide los 20 minutos en cuatro bloques de 5 y piensa solo en el bloque en el que estás.

= Correr bien sin complicarte
#grid(columns: (1fr, 1fr), gutter: 5mm,
  ficha("Pasos cortos y rápidos", [La zancada larga hace que el pie aterrice muy por delante del cuerpo y frena. Pasos cortos, como si corrieras sobre brasas, cargan menos rodillas y tibias.], color: c),
  ficha("Mirada al frente", [Mira 10–20 metros por delante, hombros relajados y brazos a unos 90°, moviéndose hacia delante y atrás, no cruzando el cuerpo.], color: c),
  ficha("Respira como te salga", [No hay una respiración «correcta». Si te ahogas, no es la respiración: es que vas rápido.], color: c),
  ficha("Cuesta arriba, más lento", [Mantén el esfuerzo, no el ritmo. En las subidas acorta el paso; si toca, camina.], color: c))

== Estiramientos después de correr
#table(columns: (1.6fr, 0.7fr, 2fr),
  [Estiramiento], [Tiempo], [Cómo],
  [Gemelo en la pared], [30 s cada pierna], [Manos en la pared, pierna atrás estirada y talón en el suelo.],
  [Cuádriceps de pie], [30 s cada pierna], [Coge el pie y llévalo al glúteo sin arquear la espalda.],
  [Isquiotibiales], [30 s cada pierna], [Pie en un escalón bajo, espalda recta, inclínate desde la cadera.],
  [Glúteo tumbado], [30 s cada lado], [Tobillo sobre la rodilla contraria y acerca las piernas al pecho.])

= Lesiones: prevenirlas y reconocerlas
#table(columns: (1.3fr, 2fr, 2fr),
  [Molestia], [Cómo se nota], [Qué hacer],
  [Periostitis tibial], [Dolor en la cara interna de la tibia que empeora al correr.], [Baja el volumen, superficie más blanda y pasos más cortos. Si no mejora en una semana, al médico.],
  [Rodilla del corredor], [Dolor alrededor de la rótula al bajar escaleras o tras correr.], [Reduce distancia, refuerza glúteos y cuádriceps (sentadillas, puente).],
  [Fascitis plantar], [Dolor en el talón con los primeros pasos de la mañana.], [Estira gemelo y planta del pie, revisa las zapatillas. Consulta si dura más de dos semanas.],
  [Agujetas], [Dolor muscular general 24–48 h después.], [Normal al empezar. Camina y muévete suave; desaparecen solas.])
#cuidado(titulo: "La regla del dolor")[Molestia que mejora al calentar y desaparece después: puedes seguir con cuidado. Dolor que empeora mientras corres, te hace cojear o sigue al día siguiente: para y descansa. Si dura más de una semana, que lo vea un profesional.]

= Comer, beber y dormir
- *Antes:* si sales por la mañana, no hace falta desayunar mucho para 30 minutos. Un plátano o una tostada basta si tienes hambre.
- *Agua:* para salidas de menos de una hora, bebe antes y después. Con calor, lleva agua.
- *Calor:* en verano sal a primera hora o al atardecer y ve aún más despacio.
- *Dormir:* dormir bien es la mitad de la recuperación. Lo notarás en las piernas.

= Después de los 5 km
#grid(columns: (1fr, 1fr, 1fr), gutter: 4mm,
  ficha("Mantener", [3 salidas de 30 minutos por semana. Suficiente para la salud según la OMS si sumas algo de fuerza.], color: c),
  ficha("Mejorar el tiempo", [Una vez por semana, cambia una salida por 6 × 1 minuto rápido con 2 minutos suaves.], color: c),
  ficha("Ir a por 10 km", [Alarga una salida a la semana 5 minutos cada semana hasta llegar a 60 minutos.], color: c))
#v(3mm)
#aviso(titulo: "Apúntate a una carrera", color: c)[Las carreras populares de 5 km se celebran casi todos los fines de semana en muchas ciudades. Tener una fecha en el calendario es la mejor motivación para no dejarlo.]

= Mi registro
#table(columns: (0.7fr, 0.7fr, 1.2fr, 1fr, 1fr, 2fr),
  [Sem.], [Día], [Fecha], [Completado], [Sensación (1–5)], [Notas],
  ..range(1, 10).map(s => range(1, 4).map(d => ([#s], [#d], [], [], [], []))).flatten())
#v(3mm)
== Mi primera vez corriendo 5 km
#table(columns: (1fr, 2fr), [Fecha], [], [Lugar], [], [Tiempo], [], [Cómo me sentí], [])
