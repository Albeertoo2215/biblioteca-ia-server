// archivo: Gym desde cero en 12 semanas - casi3.pdf
#import "casi3.typ": *
#let c = rgb("#d6456b")
#show: documento.with(titulo: "Gym desde cero en 12 semanas", subtitulo: "Programa completo de fuerza para principiantes: qué hacer cada día, cómo progresar, técnica de cada ejercicio, comida y registro.", seccion: "Deporte · casi3", color: c,
  fuentes: [
    - American College of Sports Medicine (ACSM), Position Stand «Progression models in resistance training for healthy adults» y guías de actividad física.
    - Organización Mundial de la Salud (2020): directrices sobre actividad física, al menos 2 días por semana de fortalecimiento muscular.
    - Morton y cols. (2018), British Journal of Sports Medicine: metaanálisis sobre proteína y ganancia de masa muscular (beneficio hasta unos 1,6 g por kg al día).
    - International Society of Sports Nutrition (ISSN), posicionamiento sobre la creatina (2017).
    - Fórmula de Epley para estimar la repetición máxima.
    #v(3mm)
    _Si tienes una lesión, una enfermedad cardiovascular o llevas años sin hacer deporte, consulta antes con tu médico. Para cualquier dolor agudo durante un ejercicio, para y no lo repitas sin revisarlo._
  ])

= Antes de empezar
#datos(dato("3 días", [por semana es todo lo que necesitas para ganar fuerza al principio.], color: c), dato("50–60 min", [por sesión, calentamiento incluido.], color: c), dato("12 sem.", [para notar cambios claros en fuerza y en el espejo.], color: c))
#v(3mm)
Empezar en el gimnasio da vergüenza y mucha información contradictoria. Este programa resuelve las dos cosas: un plan cerrado que solo tienes que seguir, con ejercicios básicos que existen en cualquier gimnasio y una forma sencilla de saber cuánto peso poner cada semana.

== Los cuatro principios
#grid(columns: (1fr, 1fr), gutter: 5mm,
  ficha("1. Constancia antes que intensidad", [Tres sesiones normales cada semana durante tres meses ganan a cinco sesiones heroicas durante dos semanas.], color: c),
  ficha("2. Sobrecarga progresiva", [Para mejorar tienes que pedirle un poco más al cuerpo cada semana: una repetición más o un poco más de peso.], color: c),
  ficha("3. Técnica primero", [Las primeras semanas el peso es lo de menos. Aprender bien el movimiento evita lesiones y te permite progresar años.], color: c),
  ficha("4. Recuperar también es entrenar", [El músculo crece descansando: dormir 7–9 horas y comer suficiente proteína son parte del programa.], color: c))

== Cómo medir el esfuerzo: RIR
RIR significa «repeticiones en reserva»: cuántas repeticiones más podrías haber hecho con buena técnica al terminar la serie.
#table(columns: (0.8fr, 2fr, 1.4fr),
  [RIR], [Cómo se siente], [Cuándo lo usamos],
  [4], [Fácil. Podrías hacer 4 más.], [Semanas 1 y 2],
  [3], [Cómodo pero exigente al final.], [Semanas 3 a 6],
  [2], [Las dos últimas cuestan. Técnica intacta.], [Semanas 7 a 11],
  [0], [No podrías hacer ni una más.], [Nunca en este programa])

= El calentamiento (10 minutos)
#table(columns: (1.6fr, 0.8fr, 2fr),
  [Ejercicio], [Tiempo], [Para qué],
  [Bici o cinta suave], [5 min], [Subir la temperatura y el pulso.],
  [Círculos de brazos y hombros], [30 s], [Movilidad del hombro.],
  [Sentadilla sin peso, lenta], [10 rep.], [Rodillas, cadera y tobillos.],
  [Puente de glúteo en el suelo], [10 rep.], [Activar glúteos.],
  [Gato-vaca (a cuatro patas)], [8 rep.], [Movilidad de la columna.],
  [Primer ejercicio con barra vacía o poco peso], [2 series], [Ensayar el movimiento.])

= El programa
Dos entrenamientos, A y B, que se alternan tres días por semana con al menos un día de descanso entre ellos: lunes A, miércoles B, viernes A; la semana siguiente lunes B, miércoles A, viernes B.

== Entrenamiento A
#table(columns: (2fr, 0.7fr, 0.9fr, 0.9fr, 2fr),
  [Ejercicio], [Series], [Repeticiones], [Descanso], [Alternativa],
  [Sentadilla goblet (con mancuerna)], [3], [8–12], [2 min], [Prensa de piernas],
  [Press de banca con mancuernas], [3], [8–12], [2 min], [Flexiones (inclinadas si cuestan)],
  [Remo en polea baja], [3], [10–12], [90 s], [Remo con mancuerna a una mano],
  [Peso muerto rumano con mancuernas], [3], [10–12], [2 min], [Puente de glúteo con peso],
  [Press militar con mancuernas sentado], [2], [10–12], [90 s], [Elevaciones laterales],
  [Plancha frontal], [3], [20–40 s], [60 s], [Plancha con rodillas apoyadas])
== Entrenamiento B
#table(columns: (2fr, 0.7fr, 0.9fr, 0.9fr, 2fr),
  [Ejercicio], [Series], [Repeticiones], [Descanso], [Alternativa],
  [Prensa de piernas], [3], [10–12], [2 min], [Zancadas con mancuernas],
  [Jalón al pecho], [3], [8–12], [2 min], [Dominadas asistidas],
  [Press inclinado con mancuernas], [3], [8–12], [2 min], [Máquina de press de pecho],
  [Curl femoral en máquina], [3], [10–12], [90 s], [Puente de glúteo a una pierna],
  [Curl de bíceps + extensión de tríceps en polea], [2], [12–15], [60 s], [Con mancuernas],
  [Pallof press (antirrotación en polea)], [3], [10 por lado], [60 s], [Bicho muerto (dead bug)])

== Las 12 semanas
#table(columns: (1fr, 1fr, 2.5fr),
  [Semanas], [Esfuerzo], [Objetivo],
  [1–2], [RIR 4], [Aprender técnica. Peso ligero. Apunta todo.],
  [3–6], [RIR 3], [Sube peso en cuanto completes el máximo de repeticiones en todas las series.],
  [7], [Descarga], [Mismos ejercicios con la mitad de series y un 10 % menos de peso.],
  [8–11], [RIR 2], [Sigue progresando. Puedes añadir una serie a los ejercicios principales.],
  [12], [Prueba], [Registra tu mejor serie en cada ejercicio y compárala con la semana 1.])

= Cómo progresar sin pensar
Usamos la *doble progresión*, la forma más sencilla y segura para principiantes:
#table(columns: (0.5fr, 3fr),
  [1], [Elige un peso con el que hagas el mínimo de repeticiones (por ejemplo, 8) con el RIR que toca.],
  [2], [Cada sesión intenta hacer una repetición más en alguna serie.],
  [3], [Cuando hagas el máximo (12) en *todas* las series, sube el peso el mínimo posible (1–2 kg en mancuernas, 2,5–5 kg en máquinas).],
  [4], [Con el peso nuevo volverás a hacer unas 8 repeticiones. Repite el ciclo.])
#aviso(titulo: "Ejemplo real", color: c)[Semana 3: press de banca con 12 kg, series de 12, 10 y 9. Semana 4: 12, 11 y 10. Semana 5: 12, 12 y 12. Semana 6: subes a 14 kg y haces 9, 8 y 8.]

== Estima tu fuerza máxima sin arriesgarte
No hace falta probar cuánto levantas a una repetición. Con la fórmula de Epley puedes estimarlo desde una serie normal:
#align(center, block(fill: fondo, radius: 3mm, inset: 5mm, text(font: sans, size: 13pt, weight: 700)[1RM ≈ peso × (1 + repeticiones ÷ 30)]))
Ejemplo: 40 kg × 10 repeticiones → 40 × (1 + 10 ÷ 30) = 53 kg aproximados.

= Técnica de los ejercicios clave
#grid(columns: (1fr, 1fr), gutter: 5mm,
  ficha("Sentadilla goblet", [Mancuerna pegada al pecho. Pies a la anchura de los hombros, puntas algo abiertas. Baja como si te sentaras entre los talones, rodillas en la dirección de las puntas, espalda neutra. Sube empujando el suelo. *Error típico:* levantar los talones o que las rodillas se cierren.], color: c),
  ficha("Press de banca con mancuernas", [Escápulas juntas y apoyadas en el banco, pies firmes. Baja las mancuernas a los lados del pecho con los codos a unos 45° del cuerpo. *Error típico:* abrir los codos a 90°, que carga el hombro.], color: c),
  ficha("Remo en polea", [Pecho alto. Tira con los codos hacia atrás pegados al cuerpo hasta que el agarre toque el abdomen. Junta las escápulas un segundo. *Error típico:* balancear el tronco para mover más peso.], color: c),
  ficha("Peso muerto rumano", [Rodillas ligeramente flexionadas y fijas. Lleva la cadera hacia atrás deslizando las mancuernas por los muslos hasta notar estiramiento detrás. Espalda recta siempre. *Error típico:* redondear la espalda o bajar doblando las rodillas.], color: c),
  ficha("Jalón al pecho", [Agarre algo más ancho que los hombros. Lleva la barra a la parte alta del pecho bajando los codos hacia los costados. *Error típico:* tirar detrás de la nuca o echarse muy atrás.], color: c),
  ficha("Press militar sentado", [Espalda apoyada, abdomen firme. Empuja las mancuernas desde la altura de las orejas hasta arriba sin bloquear de golpe. *Error típico:* arquear mucho la zona lumbar.], color: c))

= Comer para entrenar
== Proteína: el dato que importa
#datos(dato("1,6 g", [de proteína por kg de peso al día es lo que maximiza la ganancia muscular en la mayoría de personas.], color: c), dato("3–4", [tomas al día con una buena ración de proteína.], color: c), dato("70 kg", [→ unos 112 g de proteína al día.], color: c))
#v(3mm)
#table(columns: (2fr, 1.2fr, 1fr),
  [Alimento], [Ración], [Proteína aprox.],
  [Pechuga de pollo], [150 g], [33 g],
  [Huevos], [2 unidades], [13 g],
  [Atún al natural], [1 lata (80 g escurrido)], [20 g],
  [Yogur griego natural o skyr], [150 g], [10–15 g],
  [Lentejas o garbanzos cocidos], [200 g], [16–18 g],
  [Tofu firme], [150 g], [18–22 g],
  [Leche], [250 ml], [8 g],
  [Queso fresco batido], [250 g], [20 g])

== Según tu objetivo
#grid(columns: (1fr, 1fr), gutter: 5mm,
  ficha("Perder grasa", [Come un poco menos de lo que gastas (unas 300–500 kcal menos al día), mantén la proteína alta y entrena fuerza: así la pérdida es sobre todo grasa y no músculo.], color: c),
  ficha("Ganar músculo", [Come un poco más de lo que gastas (unas 200–300 kcal más). Si engordas más de medio kilo por semana, estás comiendo demasiado.], color: c))
== Suplementos: lo que tiene evidencia
- *Creatina monohidrato:* 3–5 g al día, todos los días, a cualquier hora. Es el suplemento deportivo más estudiado y seguro en personas sanas.
- *Proteína en polvo:* solo es comida cómoda. Útil si no llegas a tu proteína con alimentos.
- *Lo demás* (quemagrasas, precursores hormonales, mezclas «anabólicas»): no lo necesitas.

= Entrenar en casa
Si un día no puedes ir al gimnasio, haz este circuito: 3 vueltas, 40 segundos de trabajo y 20 de descanso.
#table(columns: (2fr, 2fr),
  [Ejercicio], [Versión fácil / difícil],
  [Sentadilla], [A una silla / búlgara con pie en el sofá],
  [Flexiones], [Con manos en la mesa / pies elevados],
  [Remo con mochila cargada], [Una mochila / dos mochilas],
  [Puente de glúteo], [Dos piernas / una pierna],
  [Plancha], [Rodillas apoyadas / levantando un brazo])

= Registro de entrenamientos
Apunta el peso y las repeticiones de cada serie. Es la única forma de saber si progresas.
#let semana(n) = table(columns: (2.2fr, 1fr, 1fr, 1fr, 1fr),
  [Semana #n · Ejercicio], [Serie 1], [Serie 2], [Serie 3], [Notas],
  [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [])
#for n in range(1, 13) { semana(n); v(3mm) }

== Mi antes y después
#table(columns: (2fr, 1fr, 1fr),
  [Medida], [Semana 1], [Semana 12],
  [Peso corporal], [], [], [Cintura (a la altura del ombligo)], [], [], [Sentadilla: mejor serie], [], [], [Press de banca: mejor serie], [], [], [Remo: mejor serie], [], [], [Jalón: mejor serie], [], [], [Cómo me siento (1–10)], [], [])
