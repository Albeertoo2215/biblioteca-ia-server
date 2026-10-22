// archivo: Guia para alquilar piso 2026 - casi3.pdf
#import "casi3.typ": *
#let verde = rgb("#1f8a7a")
#show: documento.with(
  titulo: "Alquilar piso sin sustos",
  subtitulo: "Guía práctica para inquilinos en España: buscar, visitar, firmar, vivir y marcharte sin perder dinero.",
  seccion: "Guías · casi3", color: verde,
  fuentes: [
    - Ley 29/1994, de 24 de noviembre, de Arrendamientos Urbanos (LAU), en su redacción vigente tras la Ley 12/2023, de 24 de mayo, por el derecho a la vivienda. Artículos 8, 9, 10, 11, 14, 16, 18, 20, 21, 22, 23, 25 y 36.
    - Instituto Nacional de Estadística (INE): Índice de Referencia de Arrendamientos de Vivienda (IRAV), valores mensuales de 2026 recogidos en prensa económica. Consulta el valor oficial del mes en ine.es.
    - Real Decreto 390/2021, de 1 de junio, procedimiento de certificación de la eficiencia energética de los edificios.
    - Ley 1/2000, de Enjuiciamiento Civil, artículos 23 y 31 (reclamaciones de hasta 2.000 euros sin abogado ni procurador).
    - Comparador de ofertas de energía de la CNMC: comparador.cnmc.gob.es.
    #v(3mm)
    _Esta guía es información general revisada en octubre de 2026. No sustituye el consejo de un abogado para tu caso concreto. Las comunidades autónomas tienen normas propias (registro de fianzas, zonas tensionadas, ayudas): consulta siempre la de la tuya._
  ])

= Antes de empezar
== Lo esencial en una página
#datos(
  dato("5 años", [de duración mínima si el casero es una persona. 7 si es una empresa. Aunque el contrato diga un año.], color: verde),
  dato("1 mes", [de fianza obligatoria. Garantías extra: como máximo 2 mensualidades más.], color: verde),
  dato("0 €", [de gastos de agencia para ti. Los paga el propietario desde la Ley 12/2023.], color: verde))
#v(4mm)
Alquilar una vivienda es probablemente el contrato más importante que firmarás en años, y casi nadie lo lee entero. Esta guía te acompaña en orden: desde calcular cuánto puedes pagar hasta recuperar tu fianza al irte, con lo que dice la ley en cada paso y lo que conviene revisar.

#aviso(titulo: "Cómo leer esta guía", color: verde)[Cada capítulo termina con una lista de comprobación. Si tienes prisa, salta directamente a las listas y a las plantillas del último capítulo.]

== Qué ley se aplica a tu alquiler
La norma principal es la *Ley de Arrendamientos Urbanos (LAU)*. Desde mayo de 2023 la modificó la *Ley de vivienda (Ley 12/2023)*, que cambió cosas importantes: quién paga la agencia, el límite de garantías y el índice para subir la renta.

#table(columns: (1fr, 2fr),
  [Si tu contrato es…], [Se rige por…],
  [Firmado desde el 26 de mayo de 2023], [La LAU con todos los cambios de la Ley de vivienda. Es lo que explica esta guía.],
  [Firmado entre marzo de 2019 y mayo de 2023], [La LAU tras el Real Decreto-ley 7/2019: también 5 o 7 años de duración mínima.],
  [Anterior a 2019], [La versión de la LAU vigente cuando se firmó. Revisa tu contrato: los plazos eran más cortos.],
  [Habitación en piso compartido], [Normalmente el Código Civil y lo pactado, no la LAU de vivienda. Tienes menos protección: léelo con más cuidado.],
  [Alquiler de temporada (estudios, trabajo)], [Las normas de arrendamiento de temporada. No tiene prórrogas obligatorias.])

= Cuánto puedes pagar
== La regla del 30 %
Lo habitual es no dedicar al alquiler más del *30 % de tus ingresos netos*. A partir del 40 % cualquier imprevisto (una avería, un mes sin extras) te pone en apuros. No es una ley, es un margen de seguridad.

#block(fill: fondo, radius: 3mm, inset: 5mm)[
  #text(font: sans, weight: 700)[Alquiler máximo recomendado según tu sueldo neto mensual]
  #v(3mm)
  #barras((("1.200 €", 360), ("1.500 €", 450), ("1.800 €", 540), ("2.100 €", 630), ("2.500 €", 750), ("3.000 €", 900)), color: verde, sufijo: " €")
]

== Los gastos que no salen en el anuncio
#table(columns: (1.1fr, 2fr),
  [Gasto], [Qué comprobar antes de firmar],
  [Luz, agua y gas], [Pide una factura reciente. La letra del certificado energético (de la A a la G) te dice cuánto costará calentar la casa.],
  [Comunidad e IBI], [Por defecto los paga el propietario. Solo puedes asumirlos si el contrato lo dice por escrito con el importe anual.],
  [Internet], [Pregunta qué operadoras llegan con fibra al edificio.],
  [Seguro], [El del continente (la vivienda) es del propietario. El de tus cosas y tu responsabilidad civil es recomendable para ti.],
  [Mudanza], [Furgoneta, cajas, alta de suministros. Reserva un 10 % del primer mes para imprevistos.])

== El dinero que necesitas el día de la firma
#datos(
  dato("1 mes", [de renta por adelantado (el primer mes).], color: verde),
  dato("1 mes", [de fianza legal.], color: verde),
  dato("0 a 2", [meses de garantía adicional, si te la piden.], color: verde))
#v(3mm)
Para un piso de 800 € al mes, prepara entre *1.600 € y 3.200 €* el día de la firma, más la mudanza.

== Documentación que suelen pedirte
#checklist([DNI o NIE.], [Contrato de trabajo y últimas tres nóminas, o declaración de la renta si eres autónomo.], [Informe de vida laboral (se descarga gratis en la sede de la Seguridad Social).], [Si eres estudiante: datos de un avalista y su documentación.])
#cuidado[Nunca envíes fotos del DNI ni nóminas por WhatsApp a alguien que no has visto. Si lo haces, tápales una marca de agua con «Solo para el alquiler de la calle X, fecha». Evita que las usen para otra cosa.]

= Buscar sin que te timen
== Dónde buscar
Los portales grandes concentran la mayoría de anuncios. Pon alertas con tu precio máximo y tu zona: los pisos buenos y baratos duran horas. Mira también carteles en los portales del barrio y grupos locales.

== Las señales de una estafa
#table(columns: (1.3fr, 2fr),
  [Señal], [Por qué es sospechosa],
  [Precio muy por debajo de la zona], [Es el cebo más usado. Compara con 5 pisos parecidos.],
  [El dueño está fuera y no puede enseñarlo], [Excusa clásica para pedirte dinero sin que veas nada.],
  [Te piden una señal antes de la visita], [Nunca pagues nada sin haber visto el piso y sin contrato.],
  [Pago por servicios de envío de dinero o criptomonedas], [Son irrecuperables. Paga solo por transferencia a una cuenta a nombre del propietario.],
  [Prisa y presión], [«Hay otros cinco interesados, decide hoy». La prisa es para que no compruebes.])
#aviso(titulo: "Comprueba quién es el dueño", color: verde)[Puedes pedir una *nota simple* en el Registro de la Propiedad (se solicita por internet y cuesta unos pocos euros). Te dice quién es el propietario y si el piso tiene cargas. Si quien te alquila no es el titular, debe acreditar que puede hacerlo.]

= La visita
Lleva esta lista impresa y haz fotos de todo. En 15 minutos sabrás si el piso esconde problemas.
#grid(columns: (1fr, 1fr), gutter: 6mm,
  [== El piso
  #checklist([Manchas de humedad en techos y esquinas.], [Olor a cerrado en armarios.], [Presión del agua y tiempo hasta que sale caliente.], [Ventanas: cierre y ruido de la calle.], [Enchufes suficientes y cuadro eléctrico.], [Calefacción y aire: tipo y si funcionan.], [Electrodomésticos incluidos y su estado.], [Persianas y puertas que cierran bien.])],
  [== El edificio y el barrio
  #checklist([Ascensor y estado de la escalera.], [Cobertura del móvil dentro del piso.], [Ruido a la hora en que estarás en casa.], [Transporte, supermercado y centro de salud.], [Aparcamiento si tienes coche.], [Vecinos: pregunta al portero o a quien te cruces.])
  == Pregunta siempre
  #checklist([¿Por qué se va el inquilino anterior?], [¿Se admiten mascotas? Que conste en el contrato.], [¿Qué incluye el precio exactamente?])])
#aviso(titulo: "Certificado energético", color: verde)[Es obligatorio que el anuncio y el contrato indiquen la calificación energética del piso (Real Decreto 390/2021). Pídelo: es la mejor pista de lo que pagarás en calefacción.]

= El contrato, cláusula a cláusula
== Duración y prórrogas
Aunque firmes por un año, *tú decides* si sigues: el contrato se prorroga año a año hasta los 5 años (7 si el propietario es una empresa). El casero solo puede recuperarlo antes si lo necesita para vivir él o un familiar directo y eso estaba previsto en el contrato. Terminados esos años, si nadie avisa, se prorroga año a año hasta 3 años más.
#cuidado[Una cláusula en la que «renuncias a la prórroga» no es válida. La duración mínima es un derecho que no se puede quitar por contrato.]

== Irte antes de tiempo
Puedes marcharte a partir de los *6 meses* avisando con *30 días*. El contrato puede fijar una indemnización de hasta un mes de renta por cada año que quede por cumplir (proporcional si queda menos).

== Lo que debe decir tu contrato
#table(columns: (1fr, 2.2fr),
  [Cláusula], [Qué revisar],
  [Identificación], [Nombres, DNI y la dirección exacta de la vivienda con su referencia catastral.],
  [Renta], [Importe, día de pago y cuenta. Paga siempre por transferencia: es tu justificante.],
  [Actualización], [Si sube cada año y con qué índice. Si no dice nada, no puede subir.],
  [Fianza y garantías], [Cuantías exactas. La fianza es un mes; las garantías extra, dos meses como máximo.],
  [Gastos], [Quién paga comunidad, IBI y suministros. Lo no dicho, lo paga el propietario.],
  [Estado de la vivienda], [Mejor con inventario y fotos fechadas como anexo.],
  [Mascotas, obras y subarriendo], [Lo que esté permitido, por escrito.])

== Lo que no pueden cobrarte
#checklist([Honorarios de la inmobiliaria por gestionar o formalizar el contrato (los paga el propietario).], [Más de un mes de fianza ni más de dos de garantía adicional.], [El seguro de impago del propietario, salvo pacto expreso, y aun así revísalo.])

= Fianza, garantías y subidas
== La fianza
Es *un mes de renta* en vivienda. El propietario debe depositarla en el organismo de tu comunidad autónoma (se llama de distintas formas: registro de fianzas, instituto de vivienda). No es para pagar las últimas mensualidades: está para cubrir daños o deudas al final.

== Cuánto puede subir tu alquiler: el IRAV
En los contratos firmados desde el 26 de mayo de 2023, la renta solo puede actualizarse una vez al año y con el *Índice de Referencia de Arrendamientos de Vivienda (IRAV)* que publica el INE. Los contratos anteriores siguen el índice que diga su contrato, normalmente el IPC.

#block(fill: fondo, radius: 3mm, inset: 5mm)[
  #text(font: sans, weight: 700)[IRAV en 2026 (meses disponibles)]
  #v(3mm)
  #barras((("Enero", 2.14), ("Mayo", 2.48), ("Julio", 2.49), ("Agosto", 2.47), ("Septiembre", 2.54)), color: verde, sufijo: " %")
  #v(1mm)
  #text(size: 8pt, fill: gris)[Valores recogidos en prensa económica a partir de los datos del INE. Comprueba siempre el del mes de tu actualización en ine.es.]
]
== Calcula tu subida
#table(columns: (2fr, 1fr),
  [Paso], [Ejemplo],
  [Renta actual], [800,00 €],
  [IRAV del mes que toca actualizar], [2,47 %],
  [Subida: renta × IRAV], [19,76 €],
  [Nueva renta], [819,76 €])
#aviso(titulo: "Pide la subida por escrito", color: verde)[Con el índice usado y la cuenta hecha. Si tu contrato no prevé actualización, la renta no puede subir mientras dure.]

== Zonas tensionadas
En los municipios declarados «zona de mercado residencial tensionado» hay límites al precio de los contratos nuevos. Consulta en la web de vivienda de tu comunidad si tu zona lo está.

= Vivir de alquiler
== Reparaciones: quién paga qué
#table(columns: (1fr, 1fr),
  [Paga el propietario], [Pagas tú],
  [Las reparaciones necesarias para que la vivienda siga siendo habitable: caldera, tuberías, instalación eléctrica, humedades estructurales.], [Las pequeñas reparaciones por el uso diario: una bombilla, el sifón, una persiana que rompes, la junta de un grifo.],
  [Averías de electrodomésticos incluidos por desgaste normal.], [Daños que causes tú o tus invitados.])
#aviso(titulo: "Comunica las averías por escrito", color: verde)[Un email o un mensaje con fotos y fecha. Si es urgente y no responde, puedes hacer la reparación imprescindible para evitar un daño mayor y reclamarle el coste.]

== Tus derechos en casa
- *Es tu domicilio.* El propietario no puede entrar sin tu permiso, aunque tenga llaves.
- *Obras.* Necesitas su consentimiento por escrito para hacer obras que cambien la configuración del piso.
- *Subarrendar o ceder* el piso o una habitación requiere consentimiento escrito del propietario.
- *Si venden el piso*, el nuevo dueño debe respetar tu contrato durante la duración mínima. Además, salvo que lo hayas renunciado en el contrato, tienes preferencia para comprarlo en las mismas condiciones.
- *Si fallece el inquilino*, su cónyuge o pareja y otros familiares que convivían pueden seguir con el contrato.

== Ayudas al alquiler
Cambian cada año y casi siempre las gestiona tu comunidad autónoma, con convocatorias para jóvenes y para rentas bajas. Revisa también las deducciones autonómicas por alquiler en tu declaración de la renta. Para pedirlas necesitarás el contrato, estar empadronado y los justificantes de pago por banco.

= Al irte
#checklist([Avisa por escrito con 30 días como mínimo (o lo que diga el contrato).], [Pide una cita para la entrega de llaves y revisad juntos el piso.], [Deja el piso limpio y como lo recibiste (el desgaste normal no se cobra).], [Haz fotos y vídeo fechados de todas las estancias.], [Firma un documento de entrega de llaves con la fecha.], [Da de baja o cambia de titular los suministros a tu nombre.], [Facilita una cuenta para la devolución de la fianza.])
== La devolución de la fianza
El propietario tiene *un mes* desde la entrega de llaves para devolverte la fianza. Si se retrasa, la cantidad devenga el interés legal del dinero. Solo puede quedarse con la parte que corresponda a daños o deudas que pueda justificar: el desgaste normal por el uso no cuenta.

= Si hay un conflicto
#datos(dato("1", [Habla y deja todo por escrito: mensajes y emails con fecha.], color: verde), dato("2", [Envía un burofax: es la prueba más fuerte de que reclamaste.], color: verde), dato("3", [Juicio verbal: hasta 2.000 € no necesitas abogado ni procurador.], color: verde))
== Modelo de reclamación de la fianza
#block(fill: fondo, radius: 3mm, inset: 6mm)[
  #set par(justify: false)
  #set text(size: 9.6pt)
  Estimado/a [nombre del propietario]:

  El [fecha] le entregué las llaves de la vivienda situada en [dirección], de la que he sido arrendatario/a desde el [fecha de inicio], según consta en el documento de entrega firmado ese día.

  Han transcurrido más de 30 días sin que me haya devuelto la fianza de [importe] €, como establece el artículo 36.4 de la Ley de Arrendamientos Urbanos. La vivienda se entregó en buen estado, como acreditan las fotografías de esa fecha, que adjunto.

  Le ruego que me abone la cantidad en la cuenta [IBAN] en un plazo de 10 días. Transcurrido ese plazo, iniciaré las acciones legales oportunas para su reclamación, incluidos los intereses legales.

  Atentamente,\
  [nombre, DNI y fecha]
]

== Mis datos del alquiler
#table(columns: (1fr, 1.6fr),
  [Dato], [Apunta aquí],
  [Fecha de firma], [], [Duración y fin previsto], [], [Renta mensual], [], [Mes de actualización anual], [],
  [Fianza y garantías entregadas], [], [Organismo donde está la fianza], [], [Contacto del propietario o agencia], [], [Contacto para averías], [])
