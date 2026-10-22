// archivo: Botiquin y emergencias en casa - casi3.pdf
#import "casi3.typ": *
#let c = rgb("#c0261b")
#show: documento.with(titulo: "Botiquín y emergencias en casa", subtitulo: "Qué tener en casa, qué hacer en los primeros minutos de un accidente y cuándo llamar al 112. Para imprimir y tener a mano.", seccion: "Salud · casi3", color: c,
  fuentes: [
    - Consejo Europeo de Resucitación (ERC): Guías de soporte vital básico 2021 (compresiones de 5–6 cm a 100–120 por minuto, relación 30:2).
    - Cruz Roja Española: manuales divulgativos de primeros auxilios.
    - Instituto Nacional de Toxicología y Ciencias Forenses: Servicio de Información Toxicológica, 91 562 04 20 (24 horas).
    - Agencia Española de Medicamentos y Productos Sanitarios (AEMPS): conservación de medicamentos y punto SIGRE.
    #v(3mm)
    _Esta guía no sustituye a un curso de primeros auxilios: hacer uno práctico de unas horas (Cruz Roja, ayuntamientos, centros de salud) es la mejor inversión que puedes hacer. Ante cualquier duda, llama al 112._
  ])

= Teléfonos y datos
#datos(dato("112", [Emergencias en toda la Unión Europea. Gratis, también sin saldo.], color: c), dato("91 562 04 20", [Información toxicológica (intoxicaciones), 24 horas.], color: c), dato("024", [Atención a la conducta suicida.], color: c))
#v(3mm)
== Ficha de casa (rellénala y ponla en la nevera)
#table(columns: (1.5fr, 2fr),
  [Dirección completa y cómo llegar], [], [Centro de salud y teléfono], [], [Hospital más cercano], [], [Médico de cabecera], [], [Farmacia de guardia (web o app de tu colegio de farmacéuticos)], [], [Contacto de emergencia 1], [], [Contacto de emergencia 2], [])
#v(3mm)
== Fichas médicas de la familia
#table(columns: (1.2fr, 1.4fr, 1.4fr, 1.4fr, 1fr),
  [Nombre], [Alergias], [Enfermedades], [Medicación habitual], [Grupo sanguíneo],
  [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [])

= Cómo llamar al 112
#table(columns: (0.5fr, 3fr),
  [1], [Mantén la calma y asegúrate de que tú no corres peligro (tráfico, fuego, electricidad).],
  [2], [Llama al 112. Di *dónde* estás primero: dirección, piso, puntos de referencia.],
  [3], [Explica *qué* ha pasado y *cuántas* personas están afectadas.],
  [4], [Responde a las preguntas: ¿respira?, ¿está consciente?, ¿sangra?],
  [5], [No cuelgues hasta que te lo digan. Te guiarán en lo que debes hacer.],
  [6], [Si puedes, que alguien espere en el portal para guiar a la ambulancia.])

= Si alguien no responde
== Comprueba la consciencia y la respiración
Háblale fuerte y sacúdele suavemente los hombros. Si no responde, abre la vía aérea (mano en la frente, dos dedos en el mentón y lleva la cabeza hacia atrás) y comprueba durante no más de 10 segundos si respira normalmente: mira el pecho, escucha, siente el aire.
#grid(columns: (1fr, 1fr), gutter: 5mm,
  ficha("Respira", [Ponle en *posición lateral de seguridad*: de lado, con la pierna de arriba doblada y la cabeza hacia atrás para que no se ahogue si vomita. Llama al 112 y vigila que siga respirando.], color: c),
  ficha("No respira (o solo boquea)", [Llama al 112 (con el altavoz) y empieza la *reanimación* ya. Si hay un desfibrilador cerca, que alguien lo traiga.], color: c))
== Reanimación cardiopulmonar (adultos)
#datos(dato("30", [compresiones en el centro del pecho.], color: c), dato("5–6 cm", [de profundidad, dejando que el pecho vuelva.], color: c), dato("100–120", [compresiones por minuto (el ritmo de «La Macarena»).], color: c))
#v(3mm)
Talón de una mano en el centro del pecho, la otra encima, brazos rectos. Si sabes hacerlo, da 2 insuflaciones después de cada 30 compresiones. Si no sabes o no quieres, *haz solo compresiones sin parar*: es mucho mejor que no hacer nada. Continúa hasta que llegue la ayuda o la persona respire.
#aviso(titulo: "El desfibrilador (DEA)", color: c)[Hay en muchos centros comerciales, estaciones, polideportivos y farmacias. Enciéndelo y sigue sus instrucciones por voz: está pensado para que lo use cualquiera. No da descarga si no hace falta.]

= Atragantamiento
#table(columns: (1.4fr, 2.6fr),
  [Situación], [Qué hacer],
  [Tose con fuerza], [Anímale a seguir tosiendo. No le des golpes ni agua.],
  [No puede toser, hablar ni respirar], [Inclínale hacia delante y dale hasta 5 golpes fuertes entre los omoplatos. Si no sale, hasta 5 compresiones abdominales (maniobra de Heimlich): desde atrás, puño encima del ombligo y empuja hacia dentro y arriba. Alterna 5 y 5.],
  [Pierde el conocimiento], [Túmbale, llama al 112 y empieza la reanimación.],
  [Bebés menores de 1 año], [Boca abajo sobre tu antebrazo: 5 golpes en la espalda y 5 compresiones en el pecho con dos dedos. Nunca compresiones en el abdomen.])

= Los accidentes más comunes
#table(columns: (1.1fr, 2.5fr, 1.6fr),
  [Accidente], [Qué hacer], [Ve a urgencias si…],
  [Quemadura], [Agua fresca (no helada) del grifo 10–20 minutos. Quita anillos y ropa que no esté pegada. Cubre con gasa limpia. Nada de pasta de dientes, mantequilla ni hielo.], [Es más grande que la palma de la mano, en cara, manos o genitales, hay ampollas grandes o es por electricidad o químicos.],
  [Corte], [Presiona con una gasa limpia 10 minutos sin levantarla. Lava con agua y jabón. Cubre.], [No para de sangrar, es profundo, tiene bordes separados o lo hizo algo sucio u oxidado (vacuna antitetánica).],
  [Hemorragia fuerte], [Presión directa y fuerte con lo que tengas. Eleva la zona. Llama al 112.], [Siempre.],
  [Torcedura], [Reposo, hielo envuelto en un paño 15–20 minutos, compresión suave y elevar.], [No puedes apoyar, hay deformidad o mucho dolor.],
  [Golpe en la cabeza], [Hielo envuelto. Vigila 24 horas.], [Pierde el conocimiento, vomita, está confuso, muy somnoliento o le duele cada vez más.],
  [Sangrado de nariz], [Sentado, cabeza *hacia delante*, aprieta la parte blanda de la nariz 10 minutos.], [No para en 20 minutos o fue por un golpe fuerte.],
  [Intoxicación], [Llama al 91 562 04 20 o al 112 con el envase a mano. No provoques el vómito.], [Lo que te indiquen al llamar.],
  [Picadura], [Lava, hielo envuelto. Si hay aguijón, quítalo rascando con una tarjeta.], [Hinchazón de cara o lengua, dificultad para respirar o mareo: 112.])
#cuidado(titulo: "Reacción alérgica grave (anafilaxia)")[Dificultad para respirar, hinchazón de labios o lengua, ronchas por todo el cuerpo o mareo tras una comida, picadura o medicamento: llama al 112. Si la persona tiene un autoinyector de adrenalina, ayúdale a usarlo en el muslo.]

= Señales de alarma: no esperes
#grid(columns: (1fr, 1fr), gutter: 5mm,
  ficha("Posible ictus: test FAST", [*Cara:* pídele que sonría, ¿se le tuerce? *Brazos:* que levante los dos, ¿cae uno? *Habla:* ¿habla raro o no entiende? *Tiempo:* si hay cualquiera de estas, llama al 112 ya y anota la hora.], color: c),
  ficha("Posible infarto", [Dolor u opresión en el pecho que puede ir al brazo, cuello o mandíbula, con sudor frío, náuseas o falta de aire. En mujeres y mayores puede ser más difuso. Llama al 112, no conduzcas tú al hospital.], color: c))

= El botiquín de casa
#grid(columns: (1fr, 1fr), gutter: 6mm,
  [== Curas
  #checklist([Gasas estériles de varios tamaños.], [Esparadrapo de papel y tiritas.], [Vendas elásticas.], [Suero fisiológico en monodosis.], [Antiséptico (clorhexidina).], [Tijeras de punta redonda y pinzas.], [Guantes desechables.], [Termómetro digital.], [Manta térmica.], [Bolsa de frío instantáneo.])],
  [== Medicamentos de uso común
  #checklist([Analgésico y antitérmico (paracetamol).], [Antiinflamatorio (ibuprofeno), salvo contraindicación.], [Sales de rehidratación oral.], [Antihistamínico (consulta en la farmacia).], [Crema para quemaduras leves o aloe vera.], [Repelente de insectos.], [Protector solar.], [La medicación habitual de la familia.])])
#cuidado[Los medicamentos, siempre con su prospecto y fuera del alcance de los niños. Pregunta a tu farmacéutico o médico antes de tomar cualquiera si tomas otra medicación, estás embarazada o tienes una enfermedad crónica.]
== Revisión cada 6 meses
#table(columns: (2fr, 1fr, 1fr, 1fr), [Producto], [Caduca], [Revisado], [Reponer], ..range(0, 40).map(_ => []))
#text(size: 8.5pt, fill: gris)[Los medicamentos caducados o que no uses se llevan al punto SIGRE de cualquier farmacia. No los tires a la basura ni al váter.]

= Casa segura
#table(columns: (1.2fr, 2.6fr),
  [Riesgo], [Prevención],
  [Incendio], [Detector de humo en el pasillo de los dormitorios (pruébalo cada mes). Nunca dejes el fuego de la cocina solo. Ten un extintor pequeño o una manta ignífuga.],
  [Gas], [Si huele a gas: no enciendas ni apagues nada eléctrico, abre ventanas, cierra la llave y sal. Llama desde fuera.],
  [Monóxido de carbono], [Braseros, estufas de combustión y calderas mal revisadas. Ventila y revisa la caldera cuando toque.],
  [Caídas], [Alfombras fijas, buena luz en pasillos, barras en la ducha para mayores.],
  [Niños], [Productos de limpieza y medicamentos en alto y bajo llave, protectores en enchufes, ventanas con cierre.],
  [Electricidad], [No sobrecargues regletas. Nada eléctrico cerca del agua.])
