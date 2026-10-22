// archivo: Dormir mejor en 14 dias - casi3.pdf
#import "casi3.typ": *
#let c = rgb("#4b4fb8")
#show: documento.with(titulo: "Dormir mejor en 14 días", subtitulo: "Un plan práctico para dormirte antes, despertarte menos y levantarte descansado. Con diario de sueño para rellenar.", seccion: "Guías de salud · casi3", color: c,
  fuentes: [
    - Organización Mundial de la Salud y American Academy of Sleep Medicine / Sleep Research Society: recomendación de 7 horas o más de sueño para adultos.
    - National Sleep Foundation (2015): duración recomendada del sueño por edades.
    - Sociedad Española de Neurología (SEN): información divulgativa sobre insomnio y hábitos de sueño.
    - Terapia cognitivo-conductual para el insomnio (TCC-I): tratamiento de primera elección según las guías clínicas europeas de insomnio (European Sleep Research Society, 2017 y actualización de 2023).
    - Agencia Española de Seguridad Alimentaria y Nutrición (AESAN): consumo de cafeína.
    #v(3mm)
    _Esta guía es divulgativa. No sustituye a tu médico. Si roncas fuerte, te despiertas ahogándote, tienes mucho sueño de día o el insomnio dura más de tres meses, consúltalo: puede haber un trastorno del sueño que necesita tratamiento._
  ])

= Por qué duermes mal
== Lo esencial
#datos(dato("7–9 h", [es lo que necesita la mayoría de adultos cada noche.], color: c), dato("90 min", [dura aproximadamente cada ciclo de sueño. Hacemos 4 o 5 por noche.], color: c), dato("14 días", [es lo que suele tardar en notarse un cambio de hábitos constante.], color: c))
#v(3mm)
Dormir mal casi nunca tiene una sola causa. Suele ser una suma de pequeñas cosas: horarios que cambian, pantallas, cafés de media tarde, una habitación demasiado caliente y, sobre todo, una cabeza que no se apaga. La buena noticia es que el sueño responde muy bien a los hábitos, y este plan trabaja sobre todos a la vez durante dos semanas.

== Cuántas horas necesitas según tu edad
#table(columns: (1.4fr, 1fr, 1.6fr),
  [Edad], [Recomendado], [Aceptable para algunas personas],
  [Adolescentes (14–17)], [8 a 10 h], [7 a 11 h],
  [Jóvenes (18–25)], [7 a 9 h], [6 a 11 h],
  [Adultos (26–64)], [7 a 9 h], [6 a 10 h],
  [Mayores de 65], [7 a 8 h], [5 a 9 h])
#text(size: 8.5pt, fill: gris)[Fuente: National Sleep Foundation. La mejor señal de que duermes lo suficiente es despertarte sin despertador los días libres a una hora parecida a la de diario.]

== Cómo funciona el sueño: dos relojes
#grid(columns: (1fr, 1fr), gutter: 5mm,
  ficha("El reloj interno (ritmo circadiano)", [Marca cuándo tienes sueño y cuándo estás despierto. Se ajusta sobre todo con la *luz*: la luz de la mañana lo adelanta y la de la noche lo retrasa. Por eso los horarios fijos y salir a la calle por la mañana ayudan tanto.], color: c),
  ficha("La presión de sueño", [Es el cansancio que se acumula desde que te levantas. Cuantas más horas despierto, más sueño. Las siestas largas y la cafeína la reducen, y por eso cuesta dormir de noche.], color: c))
#aviso(titulo: "La idea clave", color: c)[Para dormirte rápido necesitas los dos relojes alineados: llevar muchas horas despierto (presión alta) y que tu cuerpo «sepa» que es de noche (luz baja, temperatura que baja, rutina repetida).]

== Test rápido: ¿qué te quita el sueño?
Marca lo que te pasa al menos tres días por semana. Al final del test sabrás qué capítulos son los tuyos.
#checklist([Me acuesto y desayuno a horas muy distintas entre semana y el fin de semana. → Capítulo 2], [Tomo café, té, cola o bebidas energéticas después de las 14:00. → Capítulo 3], [Uso el móvil en la cama. → Capítulo 3], [Mi habitación tiene luz, ruido o hace calor. → Capítulo 4], [Me meto en la cama y empiezo a dar vueltas a todo. → Capítulo 5], [Me despierto de madrugada y no vuelvo a dormirme. → Capítulo 5], [Ceno mucho o tarde, o tomo alcohol para dormir. → Capítulo 3], [Hago la siesta más de 30 minutos. → Capítulo 2])

= Horarios: la base de todo
== Fija la hora de levantarte, no la de acostarte
Es el cambio que más funciona y el menos intuitivo. No puedes obligarte a dormir, pero sí a levantarte. Si te levantas cada día a la misma hora (también sábados y domingos, con un margen de una hora como mucho), en una o dos semanas tu cuerpo empezará a tener sueño a una hora estable.

=== Cómo calcularlo
#table(columns: (2fr, 1fr),
  [Paso], [Ejemplo],
  [Hora a la que necesitas levantarte], [07:00],
  [Horas de sueño que quieres (7,5 = 5 ciclos)], [7 h 30 min],
  [Tiempo que tardas en dormirte], [15 min],
  [Hora de estar en la cama con la luz apagada], [23:15])

== El «jet lag social» del fin de semana
Acostarte a las 2 y levantarte a las 11 el sábado equivale a volar a otro país y volver el lunes. Por eso el domingo por la noche no hay quien duerma y el lunes cuesta tanto. Si sales, intenta no levantarte más de una o dos horas más tarde de lo habitual y compensa con una siesta corta.

== La siesta: corta o nada
#datos(dato("20 min", [Siesta ideal: descansa sin entrar en sueño profundo.], color: c), dato("antes de las 16:00", [Más tarde, resta presión de sueño a la noche.], color: c), dato("0", [Si tienes insomnio, mejor sin siesta durante el plan.], color: c))

= Lo que haces durante el día
== Luz: tu mejor medicina gratis
- *Por la mañana:* sal a la calle o asómate a la ventana 15–30 minutos en la primera hora tras levantarte. La luz del exterior, incluso nublado, es mucho más intensa que la de casa.
- *Por la tarde:* baja las luces de casa a partir de dos horas antes de dormir. Usa lámparas cálidas y bajas en vez de la luz del techo.
- *Pantallas:* el problema no es solo la luz, es que te mantienen enganchado. Activa el modo noche y, sobre todo, deja el móvil fuera de la cama.

== Cafeína: cuánto y hasta cuándo
La cafeína tarda unas 5 o 6 horas en reducirse a la mitad en el cuerpo. Un café a las 17:00 sigue medio activo a las 23:00, aunque te duermas.
#table(columns: (2fr, 1fr),
  [Bebida (ración habitual)], [Cafeína aproximada],
  [Café expreso], [60–80 mg],
  [Café de filtro (taza grande)], [90–150 mg],
  [Té negro], [30–50 mg],
  [Refresco de cola (lata)], [30–40 mg],
  [Bebida energética (lata de 250 ml)], [80 mg])
#aviso(titulo: "Regla del plan", color: c)[Nada de cafeína después de las 14:00 durante los 14 días. La AESAN considera seguro para adultos sanos hasta unos 400 mg al día, pero el límite para dormir bien depende más de la hora que de la cantidad.]

== Ejercicio
Moverte mejora el sueño profundo. Lo ideal es hacer ejercicio por la mañana o por la tarde. El ejercicio intenso justo antes de acostarte activa a muchas personas: termina al menos 2 o 3 horas antes.

== Cena y alcohol
- Cena al menos 2 horas antes de acostarte y no te vayas a la cama con hambre ni muy lleno.
- El alcohol da sueño al principio pero fragmenta la segunda mitad de la noche: te despiertas más y descansas peor.
- Si te despiertas para orinar, bebe más agua por la mañana y menos en las dos últimas horas.

= Tu habitación
#grid(columns: (1fr, 1fr), gutter: 5mm,
  ficha("Temperatura", [Fresca: entre 17 y 19 °C es lo que mejor funciona para la mayoría. En verano, ventila de madrugada y usa ropa de cama de algodón o lino.], color: c),
  ficha("Oscuridad", [Total. Persianas bajadas o cortinas opacas, sin piloto de luces. Si no puedes, un antifaz.], color: c),
  ficha("Ruido", [Tapones de espuma o un ruido de fondo constante (ventilador, ruido blanco) que tape los ruidos sueltos.], color: c),
  ficha("La cama es para dormir", [Nada de trabajar, comer ni ver series en la cama. Tu cerebro debe asociarla solo con dormir.], color: c))
#v(3mm)
== Lista de la habitación
#checklist([Persianas o cortinas que oscurecen del todo.], [Termostato o ventilador para mantenerla fresca.], [Cargador del móvil fuera de la habitación o lejos de la cama.], [Despertador que no sea el móvil.], [Colchón y almohada cómodos (un colchón suele durar unos 8–10 años).], [Nada de luces de aparatos encendidas.])

= Cuando la cabeza no para
== La regla de los 20 minutos
Si llevas unos 20 minutos en la cama sin dormirte (no mires el reloj, calcúlalo a ojo), levántate. Ve a otra habitación con luz tenue y haz algo aburrido: leer algo en papel, doblar ropa. Vuelve a la cama solo cuando tengas sueño. Es una de las técnicas centrales de la terapia cognitivo-conductual para el insomnio, el tratamiento con más evidencia.

== El cuaderno de preocupaciones
Una o dos horas antes de dormir, dedica 10 minutos a escribir lo que te preocupa y, al lado, el siguiente paso pequeño para cada cosa. Cuando en la cama aparezca la preocupación, tu mente sabe que ya está anotada.
#table(columns: (1.6fr, 1.4fr),
  [Lo que me preocupa], [Siguiente paso (y cuándo)],
  [], [], [], [], [], [])

== Respiración 4-7-8
#grid(columns: (1fr, 1fr, 1fr), gutter: 4mm,
  dato("4 s", [Inspira por la nariz contando hasta 4.], color: c), dato("7 s", [Aguanta el aire contando hasta 7.], color: c), dato("8 s", [Suelta el aire por la boca despacio contando hasta 8.], color: c))
#v(2mm)
Repite 4 ciclos. Al principio puede marearte un poco: hazlo sentado o tumbado.

== Relajación muscular en 10 minutos
Tumbado, tensa cada grupo de músculos 5 segundos y suéltalo 15, empezando por los pies y subiendo: pies, piernas, glúteos, abdomen, manos, brazos, hombros, cara. Fíjate en la diferencia entre tensión y relajación.

== Si te despiertas de madrugada
- No mires la hora: calcular cuánto te queda aumenta la ansiedad.
- No cojas el móvil.
- Respira 4-7-8 y, si en 20 minutos no te duermes, aplica la regla de levantarte.

= El plan de 14 días
#table(columns: (0.7fr, 3fr),
  [Día], [Qué añades (mantén lo de los días anteriores)],
  [1], [Elige tu hora fija de levantarte y apúntala. Empieza el diario de sueño.],
  [2], [Luz de la mañana: 15 minutos fuera nada más levantarte.],
  [3], [Última cafeína a las 14:00.],
  [4], [Móvil fuera de la cama. Pon un despertador.],
  [5], [Rutina de 30 minutos antes de dormir: luces bajas, ducha templada, leer.],
  [6], [Revisa la habitación con la lista del capítulo 4.],
  [7], [Repaso de la semana: rellena la tabla de resultados del diario.],
  [8], [Cuaderno de preocupaciones cada tarde.],
  [9], [Cena al menos 2 horas antes de acostarte.],
  [10], [Regla de los 20 minutos si no te duermes.],
  [11], [Ejercicio o paseo de 30 minutos, mejor por la mañana o por la tarde.],
  [12], [Respiración 4-7-8 en la cama.],
  [13], [Fin de semana: no te levantes más de una hora más tarde.],
  [14], [Compara las dos semanas del diario y quédate con lo que más te ha funcionado.])

= Diario de sueño
Rellénalo cada mañana en un minuto. Al final de cada semana calcula tu media de horas dormidas y de cómo te sientes.
#let fila(d) = ([#d], [], [], [], [], [], [])
#table(columns: (0.6fr, 1fr, 1fr, 1fr, 1fr, 1.1fr, 1.3fr),
  [Día], [Me acosté], [Me dormí (aprox.)], [Desvelos], [Me levanté], [Descanso (1–5)], [Notas (café, ejercicio…)],
  ..range(1, 15).map(d => fila(d)).flatten())
#v(4mm)
== Resultado
#table(columns: (2fr, 1fr, 1fr),
  [], [Semana 1], [Semana 2],
  [Horas dormidas de media], [], [],
  [Minutos en dormirme de media], [], [],
  [Descanso medio (1–5)], [], [],
  [Lo que más me ha ayudado], [], [])

= Cuándo ir al médico
#cuidado(titulo: "Consulta si…")[
  - El insomnio dura más de tres meses o te afecta mucho durante el día.
  - Roncas fuerte y alguien te ha visto dejar de respirar o te despiertas ahogándote.
  - Te quedas dormido sin querer de día (conduciendo, en reuniones).
  - Tienes sensaciones molestas en las piernas que mejoran al moverlas.
  - Estás tomando pastillas para dormir desde hace semanas.]
#v(3mm)
Tu médico de cabecera puede valorar si hay un trastorno como la apnea del sueño o el insomnio crónico, que tienen tratamientos eficaces. Lleva este diario a la consulta: es justo la información que te pedirán.
