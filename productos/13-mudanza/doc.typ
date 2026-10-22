// archivo: Mudanza sin caos - casi3.pdf
#import "casi3.typ": *
#let c = rgb("#b7791f")
#show: documento.with(titulo: "Mudanza sin caos", subtitulo: "Plan de 8 semanas, todos los trámites que hay que cambiar, cómo embalar y presupuesto. Para que el día D sea solo cargar cajas.", seccion: "Planificadores · casi3", color: c,
  fuentes: [
    - Ley 7/1985 de Bases del Régimen Local: obligación de inscribirse en el padrón del municipio donde se vive.
    - Reglamento General de Vehículos y Reglamento General de Conductores: obligación de comunicar a la DGT el cambio de domicilio.
    - Agencia Tributaria: modelo 030 para comunicar el cambio de domicilio fiscal (personas físicas no empresarias).
    #v(3mm)
    _Los trámites concretos (padrón, centro de salud, ayudas) dependen de tu ayuntamiento y tu comunidad autónoma. Revisado en octubre de 2026._
  ])

= Antes de empezar
#datos(dato("8 sem.", [antes empieza el plan. Con menos tiempo, comprime los pasos.], color: c), dato("1 caja", [«de primera noche» con lo imprescindible. La más importante.], color: c), dato("15 días", [para comunicar a la DGT tu nuevo domicilio.], color: c))
#v(3mm)
Una mudanza se complica cuando todo se deja para la última semana. Este plan reparte el trabajo en pequeñas tareas semanales y te da la lista completa de los sitios donde cambiar la dirección, que es lo que más se olvida.

== Empresa de mudanzas o hacerlo tú
#table(columns: (1.2fr, 2fr, 2fr),
  [], [Con empresa], [Por tu cuenta],
  [Cuándo compensa], [Muchos muebles, pisos altos sin ascensor, distancias largas, poco tiempo.], [Estudio o piso pequeño, ayuda de amigos, misma ciudad.],
  [Pide], [Al menos 3 presupuestos por escrito tras una visita o videollamada.], [Furgoneta con antelación, carretilla, mantas y cinchas.],
  [Revisa], [Qué incluye (embalaje, desmontaje), seguro y qué pasa si algo se rompe.], [Que tu seguro de hogar o el de la furgoneta cubra la mudanza.])

= El plan de 8 semanas
#table(columns: (1fr, 3.5fr),
  [Cuándo], [Tareas],
  [8 semanas antes], [Fija la fecha. Avisa al casero si estás de alquiler (mira el preaviso del contrato). Empieza a pedir presupuestos.],
  [7 semanas], [Haz inventario por habitaciones. Decide qué tirar, vender o donar.],
  [6 semanas], [Vende y dona lo que no te llevas. Reserva empresa o furgoneta.],
  [5 semanas], [Consigue cajas (supermercados, tiendas) y material. Empieza por lo que no usas: trasteros, libros, ropa de otra temporada.],
  [4 semanas], [Pide el alta de internet en la casa nueva (puede tardar). Organiza el colegio de los niños si cambian.],
  [3 semanas], [Cambia luz, agua y gas: alta o cambio de titular en la nueva, baja en la antigua para el día después de irte.],
  [2 semanas], [Embala todo salvo lo diario. Etiqueta cada caja. Confirma la empresa, el horario y el aparcamiento.],
  [1 semana], [Prepara la caja de primera noche. Descongela la nevera. Haz fotos de contadores en las dos casas.],
  [Día D], [Revisa que no queda nada. Foto de cada habitación vacía. Lectura de contadores. Entrega de llaves.],
  [Primera semana], [Empadrónate y cambia la dirección en todos los sitios de la lista.])

= Embalar como un profesional
#grid(columns: (1fr, 1fr), gutter: 5mm,
  ficha("Cajas pequeñas para lo pesado", [Libros, vajilla y herramientas en cajas pequeñas. Las grandes, para ropa y cojines. Una caja no debería pesar más de lo que puedas levantar cómodo.], color: c),
  ficha("Vajilla de canto", [Los platos van de pie, como discos, envueltos uno a uno en papel. Los vasos, con papel dentro y fuera.], color: c),
  ficha("Etiqueta en dos lados", [Habitación de destino y contenido, en el lateral y arriba. Usa un color por habitación.], color: c),
  ficha("Tornillos en bolsas", [Al desmontar un mueble, mete tornillos y herrajes en una bolsa pegada al propio mueble.], color: c),
  ficha("Fotos de los cables", [Antes de desconectar la televisión o el router, haz una foto de dónde va cada cable.], color: c),
  ficha("Ropa en su percha", [Usa bolsas de basura grandes al revés: mete la ropa colgada y ata las perchas.], color: c))

== La caja de primera noche
#checklist([Cargadores del móvil y una regleta.], [Papel higiénico, jabón y toallas.], [Sábanas y una almohada por persona.], [Neceser con medicinas.], [Una muda por persona.], [Vasos, platos y cubiertos para un día, y algo de comer.], [Herramientas básicas: destornillador, cúter, cinta.], [Bombillas y una linterna.], [Documentos importantes y llaves de la casa nueva.])

= Todos los sitios donde cambiar la dirección
#table(columns: (1.5fr, 2fr, 1fr),
  [Dónde], [Cómo], [Hecho],
  [Padrón municipal], [En tu nuevo ayuntamiento, con el contrato de alquiler o escritura. Te da de baja en el anterior.], [],
  [Centro de salud], [Con el certificado de empadronamiento, solicita el cambio de centro o médico.], [],
  [DGT (permiso y vehículos)], [Por internet o cita previa. Obligatorio en 15 días. Si te empadronas, muchos ayuntamientos lo comunican solos: compruébalo.], [],
  [Agencia Tributaria], [Modelo 030 o en tu declaración de la renta.], [],
  [Seguridad Social], [En su sede electrónica.], [],
  [Banco y tarjetas], [App o web del banco.], [],
  [Seguros], [Hogar (nueva póliza), coche, salud y vida.], [],
  [Trabajo], [Recursos humanos, para nóminas y certificados.], [],
  [Colegio y actividades], [Matrícula y comunicaciones.], [],
  [Compañía de móvil e internet], [Dirección de facturación.], [],
  [Suscripciones y tiendas online], [Direcciones guardadas de envío.], [],
  [Correos], [Puedes contratar el reenvío de cartas de la dirección antigua a la nueva.], [],
  [Censo electoral], [Se actualiza con el padrón.], [])

= Presupuesto de la mudanza
#table(columns: (2fr, 1fr, 1fr),
  [Concepto], [Previsto], [Real],
  [Empresa de mudanzas o furgoneta], [], [], [Cajas y material de embalaje], [], [], [Combustible y peajes], [], [], [Limpieza de la casa antigua], [], [], [Limpieza de la nueva], [], [], [Fianza y primer mes (si alquilas)], [], [], [Altas de suministros], [], [], [Muebles y cosas nuevas], [], [], [Comidas fuera esos días], [], [], [Imprevistos (10 %)], [], [], [*Total*], [], [])

= Inventario de cajas
#table(columns: (0.6fr, 1.2fr, 2.6fr, 0.8fr),
  [Caja], [Habitación], [Contenido], [Frágil],
  ..range(1, 41).map(n => ([#n], [], [], [])).flatten())

= El día D
#grid(columns: (1fr, 1fr), gutter: 6mm,
  [== Casa antigua
  #checklist([Fotos de los contadores con fecha.], [Revisa armarios, trastero y buzón.], [Fotos de cada habitación vacía y limpia.], [Entrega de llaves por escrito, con fecha.], [Deja una dirección para la fianza y el correo.])],
  [== Casa nueva
  #checklist([Fotos de los contadores al llegar.], [Prueba agua caliente, luz y calefacción.], [Indica a los de la mudanza dónde va cada color de caja.], [Monta primero las camas.], [Abre la caja de primera noche.])])
