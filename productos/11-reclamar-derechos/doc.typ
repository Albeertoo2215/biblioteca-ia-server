// archivo: Reclama y gana - tus derechos como consumidor - casi3.pdf
#import "casi3.typ": *
#let c = rgb("#2156b8")
#show: documento.with(titulo: "Reclama y gana", subtitulo: "Tus derechos como consumidor en España y cómo reclamar paso a paso: compras, garantías, vuelos, bancos, telefonía y suministros. Con modelos de carta.", seccion: "Guías · casi3", color: c,
  fuentes: [
    - Real Decreto Legislativo 1/2007, texto refundido de la Ley General para la Defensa de los Consumidores y Usuarios (TRLGDCU), en su redacción vigente: garantía de 3 años en bienes nuevos (desde 2022) y derecho de desistimiento de 14 días en compras a distancia.
    - Reglamento (CE) 261/2004 sobre los derechos de los pasajeros aéreos (compensaciones de 250, 400 y 600 euros).
    - Banco de España: Departamento de Conducta de Entidades (reclamaciones bancarias).
    - Ministerio para la Transformación Digital: Oficina de Atención al Usuario de Telecomunicaciones.
    - Agencia Estatal de Seguridad Aérea (AESA): reclamaciones de pasajeros.
    - Ley 1/2000, de Enjuiciamiento Civil: juicio verbal y reclamaciones de hasta 2.000 euros sin abogado ni procurador.
    #v(3mm)
    _Revisado en octubre de 2026. Las normas pueden cambiar y cada comunidad autónoma tiene su propia regulación de hojas de reclamaciones y arbitraje: consulta la oficina de consumo de tu comunidad o ayuntamiento._
  ])

= El método para reclamar
#datos(dato("3 años", [de garantía legal en productos nuevos comprados desde 2022.], color: c), dato("14 días", [para devolver sin dar explicaciones lo comprado por internet.], color: c), dato("600 €", [de compensación máxima por un vuelo cancelado o con gran retraso.], color: c))
#v(3mm)
Las empresas cuentan con que la mayoría de la gente no reclama, o reclama mal: por teléfono, sin pruebas y sin plazos. Este método sirve para casi cualquier problema.
#table(columns: (0.5fr, 2fr, 2.5fr),
  [], [Paso], [Cómo],
  [1], [Reúne pruebas], [Factura o tique, contrato, fotos, capturas, emails. Anota fechas y nombres de quien te atendió.],
  [2], [Reclama por escrito a la empresa], [Por su formulario, email o carta. Pide siempre un número de reclamación. Nunca solo por teléfono.],
  [3], [Espera el plazo], [Normalmente un mes. Si no responden o no te dan la razón, pasas al siguiente paso.],
  [4], [Reclama a un organismo], [Consumo (OMIC o tu comunidad), Banco de España, Telecomunicaciones o AESA, según el caso.],
  [5], [Arbitraje o juzgado], [El arbitraje de consumo es gratuito si la empresa está adherida. En el juzgado, hasta 2.000 € no necesitas abogado.])
#aviso(titulo: "La hoja de reclamaciones", color: c)[Todo comercio en España debe tener hojas de reclamaciones oficiales y dártelas si las pides. Rellénala allí, quédate tu copia y entrega la otra en la oficina de consumo si no te responden. Negarse a darla es una infracción.]

= Compras y garantías
== La garantía legal: 3 años
Si un producto nuevo falla o no es como te lo vendieron, tienes derecho a que lo *reparen o te lo cambien* gratis. Si no es posible o no lo hacen en un plazo razonable, puedes pedir una *rebaja o la devolución del dinero*.
#table(columns: (1.5fr, 2fr),
  [Situación], [Lo que dice la ley],
  [Falla en los 2 primeros años], [Se presume que el defecto ya existía: no tienes que demostrarlo.],
  [Falla en el tercer año], [Puede que tengas que demostrar que el defecto es de origen.],
  [Productos de segunda mano de un comercio], [Pueden pactar una garantía menor, pero no inferior a 1 año.],
  [Quién responde], [El vendedor, aunque te diga que vayas al fabricante.],
  [Contenidos digitales], [También tienen garantía legal de conformidad.])

== Comprar por internet: 14 días de desistimiento
Puedes devolver lo que compras a distancia en *14 días naturales* desde que lo recibes, sin justificarlo. La tienda debe devolverte el dinero, incluido el envío estándar, en 14 días como máximo desde que la informas.
#cuidado[No se aplica a productos personalizados, perecederos, precintados de higiene que abras, contenido digital que ya has descargado con tu consentimiento ni billetes y reservas con fecha concreta. Si la tienda no te informó de este derecho, el plazo se amplía hasta 12 meses.]

== Las rebajas también tienen garantía
Los productos rebajados tienen la misma garantía. Y si la tienda acepta devoluciones el resto del año, debe mantener las mismas condiciones en rebajas o avisar claramente de lo contrario.

= Vuelos
== Cuánto te corresponde
Con vuelos que salen de la Unión Europea, o que llegan a ella con una aerolínea europea:
#table(columns: (1.6fr, 1fr, 1fr, 1fr),
  [Distancia del vuelo], [Hasta 1.500 km], [1.500–3.500 km (y vuelos dentro de la UE de más de 1.500 km)], [Más de 3.500 km],
  [Compensación], [250 €], [400 €], [600 €])
#v(2mm)
- *Cancelación* avisada con menos de 14 días.
- *Retraso* de 3 horas o más a la llegada.
- *Denegación de embarque* por overbooking.
#aviso(titulo: "Además de la compensación", color: c)[Mientras esperas, la aerolínea debe darte comida y bebida, comunicación y alojamiento si toca pasar la noche. Guarda los tiques si los pagas tú: te los deben reembolsar.]
#cuidado[No hay compensación si la causa es una «circunstancia extraordinaria» (meteorología, huelga de controladores, motivos de seguridad). Las huelgas de la propia tripulación o los problemas técnicos normales, en general, no la eximen.]
== Equipaje
Si tu maleta llega dañada o no llega, rellena el parte de irregularidad (PIR) en el aeropuerto antes de salir. Reclama por escrito: 7 días para daños y 21 días desde que la recibes en caso de retraso.

= Bancos
#table(columns: (1.4fr, 2.6fr),
  [Problema], [Qué hacer],
  [Comisión que no te avisaron], [Reclama al servicio de atención al cliente del banco. Si en un mes no responden o lo rechazan, reclama al Banco de España.],
  [Cargo no autorizado en tu tarjeta], [Comunícalo al banco cuanto antes (y bloquea la tarjeta). Tienes hasta 13 meses. Salvo negligencia grave tuya, deben devolvértelo.],
  [Te han estafado por SMS o llamada], [Denuncia en la policía y comunícalo al banco con la denuncia. Pide por escrito que te expliquen por qué no reembolsan.],
  [Gastos de hipoteca o cláusulas abusivas], [Reclama por escrito y valora asesoramiento: son casos con mucha jurisprudencia.])

= Teléfono, internet y suministros
== Telefonía e internet
- Reclama primero a la operadora y guarda el número de reclamación.
- Si en un mes no se resuelve, reclama gratis a la *Oficina de Atención al Usuario de Telecomunicaciones* del Ministerio.
- *Portabilidad y baja:* pueden cobrarte la penalización por permanencia solo si estaba en el contrato y proporcional al tiempo que falte.
== Luz y gas
- Revisa en la factura la potencia contratada, el tipo de tarifa y si hay servicios añadidos que no pediste (mantenimientos, seguros).
- Reclama a la comercializadora. Si no responde, a consumo de tu comunidad.
- Antes de cambiar de compañía, compara en el comparador oficial de la CNMC.

= Si nada funciona
#grid(columns: (1fr, 1fr), gutter: 5mm,
  ficha("Arbitraje de consumo", [Gratuito y rápido. Lo resuelve un colegio arbitral y su decisión es obligatoria. Solo si la empresa está adherida (lo indica con un distintivo) o acepta tu solicitud.], color: c),
  ficha("Juicio verbal", [Para reclamaciones de hasta 2.000 € puedes presentar tú mismo una demanda con el formulario oficial en el juzgado, sin abogado ni procurador.], color: c))
#v(3mm)
== Los organismos útiles
#table(columns: (1.4fr, 2fr),
  [Organismo], [Para qué],
  [OMIC del ayuntamiento / consumo de tu comunidad], [Compras, servicios, hojas de reclamación, arbitraje.],
  [Banco de España], [Bancos y entidades de pago.],
  [Comisión Nacional del Mercado de Valores (CNMV)], [Inversiones.],
  [Dirección General de Seguros (DGSFP)], [Seguros y planes de pensiones.],
  [Oficina de Atención al Usuario de Telecomunicaciones], [Móvil, internet y televisión de pago.],
  [Agencia Estatal de Seguridad Aérea (AESA)], [Vuelos.])

= Modelos de carta
== Reclamar la garantía de un producto
#block(fill: fondo, radius: 3mm, inset: 6mm)[#set par(justify: false); #set text(size: 9.6pt)
  A la atención de [tienda], servicio de atención al cliente:

  El [fecha] compré en su establecimiento [producto], con factura o tique nº [número], por [importe] €. El [fecha] el producto ha dejado de funcionar: [describe el fallo].

  De acuerdo con el texto refundido de la Ley General para la Defensa de los Consumidores y Usuarios, el vendedor responde de la falta de conformidad durante 3 años. Les solicito la reparación o sustitución del producto sin coste y, si no fuera posible en un plazo razonable, la devolución del importe.

  Ruego me faciliten un número de reclamación. Adjunto la factura y fotografías.

  [Nombre, DNI, teléfono y fecha]]
== Reclamar la compensación de un vuelo
#block(fill: fondo, radius: 3mm, inset: 6mm)[#set par(justify: false); #set text(size: 9.6pt)
  A la atención de [aerolínea]:

  Viajé en el vuelo [número] del [fecha] de [origen] a [destino], con reserva [código]. El vuelo [fue cancelado el día X / llegó con X horas de retraso].

  Conforme al Reglamento (CE) 261/2004, solicito la compensación de [250/400/600] € por pasajero, así como el reembolso de los gastos que tuve que asumir, que justifico con los tiques adjuntos.

  Ruego ingresen la cantidad en la cuenta [IBAN] en un plazo de 30 días. Si no recibo respuesta, presentaré reclamación ante la Agencia Estatal de Seguridad Aérea.

  [Nombre, DNI y fecha]]
== Desistir de una compra por internet
#block(fill: fondo, radius: 3mm, inset: 6mm)[#set par(justify: false); #set text(size: 9.6pt)
  A la atención de [tienda]:

  Por la presente les comunico que desisto del contrato de compra del siguiente producto: [producto], pedido nº [número], recibido el [fecha].

  Solicito la devolución del importe pagado, incluidos los gastos de envío estándar, en el plazo de 14 días establecido en la ley.

  [Nombre, dirección y fecha]]

= Mi registro de reclamaciones
#table(columns: (1fr, 1.4fr, 1fr, 1fr, 1fr, 1.2fr),
  [Fecha], [Empresa y motivo], [Nº reclamación], [Plazo de respuesta], [Siguiente paso], [Resultado],
  ..range(0, 12).map(_ => ([], [], [], [], [], [])).flatten())
