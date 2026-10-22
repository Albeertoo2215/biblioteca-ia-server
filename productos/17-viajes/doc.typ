// archivo: Planificador de viajes - casi3.pdf
#import "casi3.typ": *
#let c = rgb("#0e7490")
#show: documento.with(titulo: "Planificador de viajes", subtitulo: "Desde la idea hasta la vuelta: presupuesto, documentos, maleta, itinerario día a día y qué hacer si algo sale mal.", seccion: "Planificadores · casi3", color: c,
  fuentes: [
    - Comisión Europea: «Itinerancia como en casa» (roaming sin recargo en el Espacio Económico Europeo).
    - Seguridad Social: Tarjeta Sanitaria Europea.
    - Ministerio de Asuntos Exteriores: recomendaciones de viaje por país y Registro de Viajeros.
    - Reglamento (CE) 261/2004: derechos de los pasajeros aéreos.
    - Comisión Europea: Sistema Europeo de Información y Autorización de Viajes (ETIAS) y Sistema de Entradas y Salidas (EES), para viajeros de fuera de la UE.
    #v(3mm)
    _Los requisitos de entrada (pasaporte, visado, vacunas) cambian. Consulta siempre las recomendaciones del Ministerio de Asuntos Exteriores para tu destino antes de reservar. Revisado en octubre de 2026._
  ])

= Antes de reservar
#datos(dato("6 meses", [de validez del pasaporte piden muchos países fuera de la UE.], color: c), dato("0 €", [de roaming en el Espacio Económico Europeo con tu tarifa nacional.], color: c), dato("1 tarjeta", [sanitaria europea gratis: pídela antes de viajar por Europa.], color: c))
#v(3mm)
== Ficha del viaje
#table(columns: (1.4fr, 2fr), [Destino], [], [Fechas], [], [Viajeros], [], [Tipo de viaje (playa, ciudad, aventura…)], [], [Presupuesto total], [], [Lo que no nos queremos perder], [])
== Cuándo reservar
#table(columns: (1.4fr, 2.6fr),
  [Qué], [Consejo],
  [Vuelos], [Compara con buscadores y mira la web de la aerolínea antes de pagar. Revisa qué equipaje incluye: el precio barato puede no incluir maleta de mano grande.],
  [Alojamiento], [Mira la ubicación respecto al transporte, la política de cancelación y las opiniones recientes. Reserva con cancelación gratuita si no estás seguro.],
  [Transporte en destino], [Tarjetas de transporte turísticas, trenes con antelación, alquiler de coche con seguro a todo riesgo sin franquicia si lo necesitas.],
  [Entradas], [Museos y monumentos famosos suelen agotar: compra online con antelación.])

= Documentos y dinero
#grid(columns: (1fr, 1fr), gutter: 6mm,
  [== Documentos
  #checklist([DNI o pasaporte válido (mira la caducidad).], [Visado o autorización electrónica si el destino la pide.], [Tarjeta Sanitaria Europea (viajes por Europa).], [Seguro de viaje (imprescindible fuera de la UE).], [Reservas de vuelo y alojamiento descargadas en el móvil.], [Carné de conducir (y permiso internacional si hace falta).], [Copias en la nube de todo lo anterior.])],
  [== Dinero
  #checklist([Avisa al banco si tu tarjeta bloquea pagos en el extranjero.], [Lleva dos tarjetas en sitios distintos.], [Tarjeta sin comisiones por cambio de divisa, si viajas fuera del euro.], [Al pagar con tarjeta fuera del euro, elige pagar en la moneda local.], [Algo de efectivo para el primer día.])])
#aviso(titulo: "Registro de Viajeros", color: c)[Si viajas fuera de la UE, puedes inscribirte gratis en el Registro de Viajeros del Ministerio de Asuntos Exteriores. Si hay una emergencia en el país, el consulado sabrá que estás allí.]

= Presupuesto
#table(columns: (2fr, 1fr, 1fr, 1fr),
  [Concepto], [Previsto], [Real], [Diferencia],
  [Vuelos o transporte de ida y vuelta], [], [], [], [Alojamiento], [], [], [], [Transporte en destino], [], [], [], [Comidas], [], [], [], [Actividades y entradas], [], [], [], [Seguro de viaje], [], [], [], [Compras y recuerdos], [], [], [], [Imprevistos (10 %)], [], [], [], [*Total*], [], [], [])
#v(3mm)
== Gasto diario
#table(columns: (0.7fr, 1fr, 1fr, 1fr, 1fr, 1fr), [Día], [Comida], [Transporte], [Actividades], [Otros], [Total], ..range(1, 15).map(d => ([#d], [], [], [], [], [])).flatten())

= La maleta
#grid(columns: (1fr, 1fr), gutter: 6mm,
  [== Ropa
  #checklist([Ropa interior y calcetines (días + 1).], [Camisetas y pantalones combinables.], [Una prenda de abrigo ligera.], [Calzado cómodo ya usado.], [Pijama.], [Bañador si hay agua.], [Una muda en la mochila de mano.])
  == Aseo
  #checklist([Cepillo y pasta.], [Desodorante.], [Protector solar.], [Líquidos en envases de 100 ml en bolsa transparente (equipaje de mano).], [Medicación habitual con receta.])],
  [== Tecnología
  #checklist([Móvil y cargador.], [Batería externa (siempre en la cabina, nunca facturada).], [Adaptador de enchufe si cambia el país.], [Auriculares.], [Mapas y entradas descargados sin conexión.])
  == Mochila de mano
  #checklist([Documentos y tarjetas.], [Medicación.], [Botella vacía para rellenar tras el control.], [Algo de comer.], [Llaves de casa.])])

= Itinerario día a día
#let dia(n) = table(columns: (0.9fr, 3fr), [Día #n], [Fecha y ciudad:], [Mañana], [], [Mediodía], [], [Tarde], [], [Noche], [], [Reservas del día], [])
#for n in range(1, 11) { dia(n); v(3mm) }

= Si algo sale mal
#table(columns: (1.4fr, 2.6fr),
  [Problema], [Qué hacer],
  [Vuelo cancelado o con retraso de más de 3 h], [Pide por escrito el motivo. Tienes derecho a asistencia (comida, alojamiento) y, según el caso, a compensación de 250, 400 o 600 €.],
  [Maleta perdida o dañada], [Parte de irregularidad (PIR) en el mostrador del aeropuerto antes de salir. Guarda los tiques de lo que tengas que comprar.],
  [Te roban la documentación], [Denuncia en la policía local. Para salir del país, acude al consulado o embajada de España.],
  [Enfermedad o accidente], [En Europa, la Tarjeta Sanitaria Europea te da acceso a la sanidad pública en las mismas condiciones que a los locales. Fuera, llama a tu seguro de viaje antes de ir al médico si puedes.],
  [Robo o pérdida de tarjetas], [Bloquéalas desde la app o llamando al banco. Denuncia.])
== Contactos útiles
#table(columns: (1.4fr, 2fr), [Embajada o consulado de España en destino], [], [Teléfono de emergencias del país], [], [Seguro de viaje (24 h)], [], [Banco (bloqueo de tarjetas)], [], [Alojamiento], [])

= Diario del viaje
#for _ in range(0, 4) [ #table(columns: (1fr, 3fr), [Día], [Lo mejor de hoy], [], []) #lineas(4) #v(4mm) ]
