// archivo: Calma - herramientas para la ansiedad y el estres - casi3.pdf
#import "casi3.typ": *
#let c = rgb("#1f8a7a")
#show: documento.with(titulo: "Calma", subtitulo: "Herramientas prácticas para el estrés y la ansiedad del día a día: entender qué te pasa, bajar la activación en minutos y cambiar lo que la alimenta.", seccion: "Salud mental · casi3", color: c,
  fuentes: [
    - Organización Mundial de la Salud: «Doing What Matters in Times of Stress» (guía de autoayuda para el estrés).
    - Técnicas de la terapia cognitivo-conductual (TCC): reestructuración cognitiva, exposición gradual, activación conductual y programación del tiempo de preocupación.
    - Relajación muscular progresiva de Jacobson y respiración diafragmática.
    - Ministerio de Sanidad: línea 024 de atención a la conducta suicida.
    #v(3mm)
    _Esta guía ofrece herramientas de autoayuda y no sustituye a un profesional. Si la ansiedad te impide hacer tu vida, dura semanas o tienes pensamientos de hacerte daño, pide ayuda: tu médico de cabecera, un psicólogo, el 024 o el 112 en una emergencia._
  ])

= Entender lo que te pasa
#datos(dato("024", [Línea de atención a la conducta suicida. Gratuita, 24 horas.], color: c), dato("112", [Emergencias.], color: c), dato("5 min", [es lo que tarda la respiración lenta en empezar a bajar la activación.], color: c))
#v(3mm)
La ansiedad no es tu enemiga: es el sistema de alarma del cuerpo. Sirve para reaccionar ante un peligro. El problema aparece cuando la alarma salta sin peligro real, demasiado fuerte o demasiado a menudo. Entonces el cuerpo se prepara para luchar o huir en mitad de una reunión, en el metro o en la cama.

== Lo que sientes tiene una explicación
#table(columns: (1.5fr, 2.5fr),
  [Lo que notas], [Para qué sirve en una alarma real],
  [Corazón acelerado], [Bombea más sangre a los músculos para moverte rápido.],
  [Respiración rápida, falta de aire], [Mete más oxígeno. Si no te mueves, sobra y causa mareo y hormigueo.],
  [Tensión en hombros y mandíbula], [Los músculos se preparan para actuar.],
  [Estómago revuelto], [La digestión se pausa: no es prioritaria ante un peligro.],
  [Mente que salta de una preocupación a otra], [Busca amenazas para anticiparse.])
#aviso(titulo: "Lo importante", color: c)[Estas sensaciones son desagradables pero no peligrosas. Un ataque de ansiedad alcanza su pico en unos minutos y baja solo. Saberlo ya reduce el miedo al miedo, que es lo que más alimenta la ansiedad.]

== Estrés, ansiedad y preocupación
#grid(columns: (1fr, 1fr, 1fr), gutter: 4mm,
  ficha("Estrés", [Reacción a una demanda concreta: un examen, un plazo, una mudanza. Baja cuando pasa la situación.], color: c),
  ficha("Ansiedad", [Activación que aparece ante algo que podría pasar. Puede continuar aunque no haya un problema real delante.], color: c),
  ficha("Preocupación", [La parte de pensamiento: el «¿y si…?» que da vueltas sin llegar a una solución.], color: c))

== Tu termómetro: ¿cómo estás hoy?
#table(columns: (0.6fr, 2fr, 2fr),
  [Nivel], [Cómo es], [Qué herramienta usar],
  [1–3], [Algo de tensión, funcionas bien.], [Hábitos (capítulo 4) y preocupación programada.],
  [4–6], [Te cuesta concentrarte, duermes peor.], [Respiración, relajación y registro de pensamientos.],
  [7–8], [Mucho malestar físico, evitas cosas.], [Técnicas rápidas del capítulo 2 y exposición gradual. Plantéate pedir ayuda.],
  [9–10], [Te desborda, no puedes con tu día.], [Técnicas rápidas ahora y contacta con un profesional.])

= Calmarte en minutos
== Respiración lenta (la base)
#grid(columns: (1fr, 1fr, 1fr), gutter: 4mm, dato("4 s", [Inspira por la nariz llevando el aire a la tripa, no al pecho.], color: c), dato("2 s", [Pausa breve.], color: c), dato("6 s", [Suelta despacio por la boca, como apagando una vela lejos.], color: c))
#v(2mm)
Hazlo 5 minutos. Lo que calma es soltar el aire más despacio de lo que lo coges: activa el sistema nervioso que frena el cuerpo. Practícalo cuando estés tranquilo para que te salga solo cuando lo necesites.

== Técnica 5-4-3-2-1 (anclarte al presente)
Nombra en voz baja:
#table(columns: (0.5fr, 3fr), [5], [cosas que ves], [4], [cosas que puedes tocar (y tócalas)], [3], [sonidos que oyes], [2], [olores], [1], [algo que puedas saborear o una respiración lenta])
Sirve cuando la mente se acelera o notas que «te vas». Obliga al cerebro a atender a los sentidos en vez de a las preocupaciones.

== Relajación muscular progresiva (10 minutos)
Tensa cada zona 5 segundos y suelta 15, fijándote en la diferencia: manos, brazos, hombros, cara, cuello, abdomen, glúteos, piernas, pies. Con práctica, aprendes a notar la tensión antes de que se acumule.

== Agua fría en la cara
En momentos de mucha activación, mojarte la cara con agua fría y aguantar la respiración unos segundos provoca un frenazo natural del ritmo cardiaco. Es un recurso de emergencia, no algo para todo el día.

= Cambiar lo que la alimenta
== Registro de pensamientos
La ansiedad se alimenta de pensamientos que parecen hechos. Escribirlos y revisarlos les quita fuerza.
#table(columns: (1fr, 1.2fr, 0.6fr, 1.4fr, 1.2fr, 0.6fr),
  [Situación], [Pensamiento automático], [Malestar (0–10)], [Pruebas a favor y en contra], [Pensamiento más realista], [Malestar ahora],
  [Mi jefa me pide hablar mañana.], [Me van a despedir.], [8], [A favor: el proyecto se retrasó. En contra: ayer me felicitó, a mis compañeros también los cita.], [Puede ser cualquier cosa; si es el retraso, tengo explicación.], [4],
  [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [])
== Las trampas del pensamiento más comunes
#table(columns: (1.3fr, 2fr, 2fr),
  [Trampa], [Ejemplo], [Pregunta que la desmonta],
  [Catastrofizar], [«Si suspendo, mi vida se arruina.»], [¿Qué es lo más probable que pase? ¿Y si pasa lo peor, cómo lo afrontaría?],
  [Leer la mente], [«Seguro que piensan que soy torpe.»], [¿Qué pruebas tengo? ¿Hay otras explicaciones?],
  [Todo o nada], [«Si no lo hago perfecto, es un desastre.»], [¿Hay un punto medio que también vale?],
  [Generalizar], [«Siempre me sale todo mal.»], [¿Siempre? ¿Cuándo salió bien?],
  [Etiquetarte], [«Soy un desastre.»], [¿Le hablaría así a un amigo en mi lugar?])

== El tiempo de preocupación
Elige 15 minutos al día, siempre a la misma hora y no antes de dormir. Cuando aparezca una preocupación fuera de ese rato, anótala y dite «ahora no, a las 19:00». En tu rato, repásalas: las que tienen solución, apunta el primer paso; las que no, practica dejarlas ir.

== Afrontar lo que evitas (exposición gradual)
Evitar alivia hoy y agranda la ansiedad mañana. Haz una escalera de situaciones de menos a más difíciles y sube un peldaño cuando el anterior te produzca poca ansiedad.
#table(columns: (0.6fr, 3fr, 1fr),
  [Peldaño], [Situación (ejemplo: miedo a hablar en público)], [Ansiedad (0–10)],
  [1], [Hablar un minuto en una videollamada con amigos.], [2],
  [2], [Hacer una pregunta en una reunión pequeña.], [4],
  [3], [Presentar 5 minutos a tu equipo.], [6],
  [4], [Presentar en una reunión grande.], [8],
  [], [Mi escalera:], [], [], [], [], [], [], [], [], [], [])

= Hábitos que protegen
#grid(columns: (1fr, 1fr), gutter: 5mm,
  ficha("Mover el cuerpo", [30 minutos de actividad que te acelere un poco (caminar rápido cuenta) la mayoría de días es de lo que más reduce la ansiedad.], color: c),
  ficha("Dormir", [Dormir mal dispara la ansiedad al día siguiente. Horarios fijos y nada de pantallas en la cama.], color: c),
  ficha("Cafeína y alcohol", [La cafeína imita los síntomas de la ansiedad. El alcohol calma esa noche y empeora los días siguientes.], color: c),
  ficha("Pantallas y noticias", [Pon horario a las redes y a las noticias. Desactiva notificaciones que no sean de personas.], color: c),
  ficha("Personas", [Hablar con alguien de confianza reduce la activación. Queda aunque no te apetezca.], color: c),
  ficha("Cosas que te gustan", [Agenda cada semana algo que disfrutes. La ansiedad tiende a quitarlo primero.], color: c))

= Tu plan de crisis
Rellénalo en un buen momento. Tenlo a mano para cuando la ansiedad suba.
#table(columns: (1.4fr, 2fr),
  [Mis señales de alarma (cómo sé que voy a más)], [],
  [Lo que me ayuda en el momento], [],
  [Lo que debo evitar hacer], [],
  [Personas a las que puedo llamar], [],
  [Mi profesional de referencia y teléfono], [],
  [Si estoy en peligro], [024 · 112])
#v(3mm)
#cuidado(titulo: "Pide ayuda profesional si…")[
  - La ansiedad dura más de unas semanas y te impide trabajar, estudiar o relacionarte.
  - Tienes ataques de pánico repetidos o evitas cada vez más situaciones.
  - Usas alcohol u otras sustancias para calmarte.
  - Tienes pensamientos de hacerte daño: llama al 024 o al 112.]

= Registro de 4 semanas
#table(columns: (0.6fr, 0.8fr, 1.5fr, 1.5fr, 1.5fr),
  [Día], [Nivel (0–10)], [Qué lo disparó], [Qué hice], [Cómo funcionó],
  ..range(1, 29).map(d => ([#d], [], [], [], [])).flatten())
