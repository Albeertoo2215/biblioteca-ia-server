// archivo: Paga menos en casa - luz, gas, agua e internet - casi3.pdf
#import "casi3.typ": *
#let c = rgb("#0e7490")
#show: documento.with(titulo: "Paga menos en casa", subtitulo: "Cómo leer tus facturas de luz, gas, agua, móvil e internet y recortarlas sin pasar frío ni quedarte sin datos.", seccion: "Dinero · casi3", color: c,
  fuentes: [
    - Comisión Nacional de los Mercados y la Competencia (CNMC): comparador oficial de ofertas de energía (comparador.cnmc.gob.es) y estructura de los peajes de acceso 2.0TD.
    - Red Eléctrica y CNMC: precio voluntario para el pequeño consumidor (PVPC).
    - Ministerio para la Transición Ecológica: bono social eléctrico y tarifa de último recurso (TUR) de gas.
    - Instituto para la Diversificación y Ahorro de la Energía (IDAE): consejos de ahorro en el hogar.
    #v(3mm)
    _Los precios de la energía, los porcentajes del bono social y las condiciones de las tarifas cambian a menudo. Esta guía explica cómo funcionan y cómo comparar; consulta siempre los valores vigentes en las fuentes oficiales. Revisado en octubre de 2026._
  ])

= Por dónde empezar
#datos(dato("3 tramos", [horarios tiene la luz: punta, llano y valle. Mover consumo al valle ahorra.], color: c), dato("2 opciones", [de tarifa de luz: regulada (PVPC) o de mercado libre.], color: c), dato("1 tarde", [al año revisando contratos es lo que más dinero ahorra.], color: c))
#v(3mm)
Las facturas de casa se pagan por inercia: contratos que se renuevan solos, potencias que nadie revisa, ofertas que caducan sin aviso. Esta guía va factura por factura con lo que hay que mirar y una hoja para anotar lo que ahorras.

== Tu auditoría en una tarde
#checklist([Reúne las últimas facturas de luz, gas, agua, móvil e internet.], [Anota en la tabla del capítulo 6 cuánto pagas y qué tienes contratado.], [Revisa la potencia de la luz (capítulo 2).], [Compara la luz y el gas en el comparador oficial de la CNMC.], [Mira la fecha de fin de permanencia de móvil e internet.], [Busca servicios que pagas y no usas (mantenimientos, seguros de factura, líneas extra).])

= La luz
== Cómo se compone tu factura
#table(columns: (1.4fr, 2.6fr),
  [Parte], [Qué es y qué puedes hacer],
  [Término de potencia], [Lo que pagas por tener disponible una potencia (kW), la uses o no. Puedes bajarla si te sobra.],
  [Término de energía], [Lo que consumes (kWh). Depende del precio y de la hora.],
  [Impuesto eléctrico e IVA], [Se aplican sobre lo anterior.],
  [Alquiler del contador], [Pequeño importe fijo al mes.],
  [Servicios añadidos], [Mantenimientos o seguros. Revísalos: muchos no se pidieron conscientemente.])

== Los tramos horarios (tarifa 2.0TD)
#table(columns: (1fr, 2fr, 2fr),
  [Tramo], [Lunes a viernes], [Fines de semana y festivos nacionales],
  [Punta (más caro)], [10:00–14:00 y 18:00–22:00], [—],
  [Llano], [08:00–10:00, 14:00–18:00 y 22:00–24:00], [—],
  [Valle (más barato)], [00:00–08:00], [Todo el día])
#aviso(titulo: "Lo que más se nota", color: c)[Lavadora, lavavajillas, secadora y horno en horas valle o en fin de semana. Programar la lavadora para que acabe a las 7 de la mañana no cuesta nada.]

== ¿Te sobra potencia?
Mira en la factura o en la web de tu distribuidora tu consumo máximo real. Si nunca pasas de, por ejemplo, 3 kW y tienes contratados 5,75, estás pagando de más cada mes. Una casa media sin aire acondicionado ni placa de inducción potente suele ir bien con 3,3–4,6 kW.
#cuidado[Si bajas demasiado, saltará el automático al encender varios aparatos a la vez. Bájala por escalones. Cada cambio de potencia puede tener un pequeño coste.]

== PVPC o mercado libre
#table(columns: (1fr, 2fr, 2fr),
  [], [PVPC (regulada)], [Mercado libre],
  [Precio], [Cambia cada hora según el mercado.], [Fijo o por tramos durante el contrato.],
  [A favor], [Suele ser competitivo a largo plazo. Da acceso al bono social.], [Sabes lo que pagas. Hay ofertas con descuentos.],
  [En contra], [Meses caros si sube el mercado.], [Revisiones de precio al renovar. Fíjate en la letra pequeña.],
  [Para quién], [Quien puede mover consumo a horas baratas.], [Quien prefiere estabilidad.])

== El bono social
Es un descuento en la factura de la luz para hogares vulnerables (por renta, familias numerosas, pensionistas con la pensión mínima). Solo se puede tener con el PVPC y una comercializadora de referencia. Si crees que puedes cumplir los requisitos, solicítalo: los porcentajes de descuento vigentes se publican en la web del Ministerio.

= El gas y la calefacción
- *Tarifa de último recurso (TUR):* precio regulado del gas que se revisa periódicamente. Compárala con las ofertas libres en el comparador de la CNMC.
- *Termostato:* 19–21 °C de día y 15–17 °C de noche es lo recomendado. Cada grado de más se nota en la factura.
- *Caldera:* las revisiones obligatorias las hace un técnico autorizado; no contrates mantenimientos «obligatorios» que te ofrezcan por teléfono sin comprobarlo.
- *Ventanas:* burletes y cortinas gruesas por la noche reducen pérdidas sin obras.

== Agua caliente y agua
#checklist([Ducha de 5 minutos en vez de baño.], [Aireadores en grifos y ducha: reducen el caudal sin que lo notes.], [Lavadora y lavavajillas llenos y en programa eco.], [Revisa fugas: con todos los grifos cerrados, el contador no debe moverse.])

= Móvil, internet y suscripciones
== Lo que suele sobrar
#table(columns: (1.6fr, 2.4fr),
  [Gasto], [Qué revisar],
  [Gigas que no usas], [Mira tu consumo real de los últimos 3 meses en la app. La mayoría usa menos de la mitad de lo contratado.],
  [Fin de la oferta], [Las promociones duran 6 o 12 meses y luego la cuota sube. Llama antes de que acabe.],
  [Televisión de pago dentro del paquete], [¿La ves? Quitarla puede abaratar mucho la cuota.],
  [Líneas adicionales], [Líneas de familiares o datos para la tablet que ya no se usan.],
  [Seguro del móvil], [Compara su coste anual con el precio de la reparación.],
  [Suscripciones digitales], [Plataformas, apps y nubes. Haz una lista y cancela las que no usaste el mes pasado.])
== Cómo negociar con tu compañía
1. Mira qué ofrecen otras compañías por lo mismo.
2. Llama al servicio de bajas o retención, no al de atención general.
3. Di que te vas a ir y por qué precio. Pide que te igualen.
4. Si te ofrecen algo, pídelo por escrito antes de aceptar.

= Tu hoja de ahorro
#table(columns: (1.4fr, 1.6fr, 1fr, 1fr, 1fr),
  [Servicio], [Compañía y contrato], [Pago al mes antes], [Pago al mes después], [Ahorro al año],
  [Luz], [], [], [], [], [Gas], [], [], [], [], [Agua], [], [], [], [], [Móvil], [], [], [], [], [Internet y TV], [], [], [], [], [Suscripciones], [], [], [], [], [Seguro del hogar], [], [], [], [], [*Total*], [], [], [], [])
#v(3mm)
== Calendario de revisión
#table(columns: (1.6fr, 1fr, 2fr), [Contrato], [Vence o se revisa], [Recordatorio], [Luz], [], [], [Gas], [], [], [Móvil e internet], [], [], [Seguro del hogar], [], [], [Seguro del coche], [], [])
