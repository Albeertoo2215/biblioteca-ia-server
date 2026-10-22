// archivo: Comer sano gastando poco - 30 recetas - casi3.pdf
#import "casi3.typ": *
#let c = rgb("#3f7d20")
#let receta(nombre, tipo, tiempo, raciones, ingredientes, pasos, truco: none) = block(breakable: false, width: 100%, above: 5mm, below: 5mm, stroke: 0.5pt + linea, radius: 3mm, inset: 5mm, {
  grid(columns: (1fr, auto), align: (left, right),
    text(font: sans, size: 13pt, weight: 800)[#nombre],
    text(font: sans, size: 8pt, weight: 700, fill: c)[#upper(tipo) · #tiempo · #raciones raciones])
  v(1mm)
  set par(justify: false)
  grid(columns: (1fr, 1.6fr), gutter: 5mm,
    [#text(font: sans, size: 9pt, weight: 700, fill: c)[Ingredientes] \ #set text(size: 9.3pt); #for i in ingredientes [- #i \ ]],
    [#text(font: sans, size: 9pt, weight: 700, fill: c)[Cómo se hace] \ #set text(size: 9.3pt); #enum(..pasos)])
  if truco != none { v(1mm); text(size: 8.8pt, fill: gris)[*Truco:* #truco] }
})
#show: documento.with(titulo: "Comer sano gastando poco", subtitulo: "30 recetas caseras con ingredientes baratos y de temporada, cómo comprar con cabeza y menús de 4 semanas que aprovechan las sobras.", seccion: "Comida · casi3", color: c,
  fuentes: [
    - Agencia Española de Seguridad Alimentaria y Nutrición (AESAN): recomendaciones dietéticas saludables y sostenibles para la población española (2022).
    - Escuela de Salud Pública de Harvard: modelo del plato saludable.
    - Reglamento (UE) 1169/2011 sobre la información alimentaria facilitada al consumidor (etiquetado).
    - AESAN: recomendaciones de conservación y seguridad alimentaria en el hogar.
    #v(3mm)
    _Recetas para población general sana. Si tienes alergias, intolerancias o una enfermedad que requiera dieta, adáptalas con tu profesional sanitario._
  ])

= Comer bien no es caro
#datos(dato("3–4", [raciones de legumbres por semana recomienda la AESAN. Son la proteína más barata.], color: c), dato("5", [raciones de fruta y verdura al día como mínimo.], color: c), dato("1", [lista de la compra cerrada evita la mitad de los gastos de impulso.], color: c))
#v(3mm)
La comida sana parece cara porque se asocia a productos «saludables» de marca. La realidad es que la base de una buena alimentación son algunos de los alimentos más baratos del supermercado: legumbres, huevos, arroz, patata, verduras de temporada, fruta, pescado congelado y aceite de oliva. Este recetario está construido sobre ellos.

== La despensa básica
#table(columns: (1.2fr, 2.8fr),
  [Grupo], [Qué tener siempre],
  [Legumbres], [Lentejas, garbanzos y alubias secas o en bote (aclara los de bote).],
  [Cereales y tubérculos], [Arroz, pasta, avena, pan integral, patatas.],
  [Proteína], [Huevos, atún y sardinas en lata, pescado y verdura congelados, muslos de pollo.],
  [Lácteos], [Leche, yogur natural, queso fresco.],
  [Verdura y fruta], [Cebolla, ajo, zanahoria, tomate triturado en lata, la verdura y la fruta de temporada.],
  [Básicos], [Aceite de oliva, especias (pimentón, comino, curry, orégano), caldo, vinagre.])

== Comprar con cabeza
#grid(columns: (1fr, 1fr), gutter: 5mm,
  ficha("Mira el precio por kilo", [El precio grande engaña. El precio por kilo o por litro que aparece en la etiqueta del lineal es el que permite comparar formatos.], color: c),
  ficha("Congelado no es peor", [La verdura y el pescado congelados mantienen sus nutrientes y no se estropean. Muchas veces son más baratos.], color: c),
  ficha("Temporada", [La fruta y la verdura de temporada está más rica y más barata. Hay una tabla en el capítulo 6.], color: c),
  ficha("Marca blanca", [En básicos (legumbres, arroz, tomate, leche) la diferencia de calidad suele ser mínima. Compara ingredientes.], color: c))

== Leer una etiqueta en 30 segundos
1. *Lista de ingredientes:* van de mayor a menor cantidad. Si el azúcar está entre los primeros, es un producto azucarado.
2. *Por 100 g:* compara siempre en esa columna, no «por ración», que cada marca define a su manera.
3. *Sal:* más de 1,25 g por 100 g es mucha sal.
4. *Azúcares:* más de 15 g por 100 g es mucho azúcar.

= Desayunos y meriendas
#receta("Porridge de avena y manzana", "Desayuno", "10 min", "2", ("80 g de copos de avena", "400 ml de leche o bebida vegetal", "1 manzana rallada", "Canela", "Un puñado de nueces"), ("Pon la avena con la leche y la canela a fuego medio.", "Remueve 5–6 minutos hasta que espese.", "Añade la manzana rallada al final y las nueces por encima."), truco: "Déjalo preparado la noche anterior en frío (overnight oats) y lo comes directamente.")
#receta("Tostada de tomate, aceite y huevo", "Desayuno", "10 min", "2", ("4 rebanadas de pan integral", "2 tomates maduros", "2 huevos", "Aceite de oliva y sal"), ("Ralla los tomates y sálalos.", "Tuesta el pan y cúbrelo con el tomate y un hilo de aceite.", "Haz los huevos a la plancha o cocidos y ponlos encima."))
#receta("Yogur con fruta y avena tostada", "Merienda", "5 min", "2", ("2 yogures naturales", "1 plátano o fruta de temporada", "2 cucharadas de avena", "1 cucharadita de miel (opcional)"), ("Tuesta la avena en una sartén sin aceite 2 minutos.", "Pon el yogur en un bol con la fruta troceada.", "Añade la avena tostada por encima."))
#receta("Bizcocho de plátano sin azúcar añadido", "Merienda", "45 min", "8", ("3 plátanos muy maduros", "2 huevos", "200 g de harina de avena (avena triturada)", "1 sobre de levadura", "50 ml de aceite de oliva suave", "Canela"), ("Precalienta el horno a 180 °C.", "Aplasta los plátanos y mézclalos con los huevos y el aceite.", "Añade la harina, la levadura y la canela.", "Hornea en un molde 35–40 minutos, hasta que un palillo salga limpio."), truco: "Los plátanos con manchas negras son los que más endulzan. Es la forma de aprovecharlos.")

= Platos de cuchara
#receta("Lentejas con verduras", "Comida", "40 min", "4", ("300 g de lentejas pardinas", "1 cebolla", "1 zanahoria", "1 pimiento", "2 dientes de ajo", "1 patata", "1 cucharadita de pimentón", "1 hoja de laurel", "Aceite y sal"), ("Pica cebolla, pimiento, ajo y zanahoria y sofríe 8 minutos.", "Añade el pimentón y remueve 30 segundos sin que se queme.", "Agrega las lentejas lavadas, la patata en trozos, el laurel y agua que cubra dos dedos.", "Cuece a fuego suave 25–30 minutos y ajusta de sal."), truco: "Las pardinas no necesitan remojo. Congelan perfectamente en raciones.")
#receta("Garbanzos con espinacas", "Comida", "20 min", "4", ("2 botes de garbanzos cocidos (800 g)", "300 g de espinacas frescas o congeladas", "3 dientes de ajo", "1 rebanada de pan", "1 cucharadita de comino y otra de pimentón", "Un chorrito de vinagre"), ("Fríe el pan y los ajos en aceite y tritúralos con el vinagre y las especias.", "Saltea las espinacas en la misma sartén.", "Añade los garbanzos aclarados y la majada con un poco de agua.", "Cuece 10 minutos a fuego suave."))
#receta("Potaje de alubias con calabaza", "Comida", "35 min", "4", ("2 botes de alubias blancas cocidas", "400 g de calabaza", "1 cebolla", "2 tomates o 200 g de tomate triturado", "Pimentón, laurel, aceite y sal"), ("Sofríe la cebolla 8 minutos y añade el tomate 5 minutos más.", "Agrega la calabaza en dados, el pimentón, el laurel y agua o caldo.", "Cuece 15 minutos y añade las alubias aclaradas 5 minutos más."))
#receta("Crema de verduras de aprovechamiento", "Cena", "30 min", "4", ("700 g de verduras variadas (calabacín, puerro, zanahoria, calabaza…)", "1 patata", "1 cebolla", "Caldo o agua", "Aceite y sal"), ("Sofríe la cebolla y el puerro 5 minutos.", "Añade el resto de verduras troceadas y la patata.", "Cubre con caldo justo y cuece 20 minutos.", "Tritura y ajusta de sal. Un chorrito de aceite crudo al servir."), truco: "Es la receta perfecta para la verdura que está a punto de estropearse.")
#receta("Sopa de fideos con huevo", "Cena", "20 min", "4", ("1 litro de caldo de pollo o verduras", "100 g de fideos", "2 huevos cocidos", "Perejil"), ("Calienta el caldo y añade los fideos.", "Cuece el tiempo del paquete.", "Sirve con el huevo cocido picado y perejil."))

= Arroces, pasta y patata
#receta("Arroz con verduras y huevo frito", "Comida", "30 min", "4", ("300 g de arroz", "1 calabacín", "1 pimiento rojo", "1 cebolla", "4 huevos", "Tomate triturado, pimentón, aceite y sal"), ("Sofríe cebolla, pimiento y calabacín en dados 10 minutos.", "Añade el tomate y el pimentón, y luego el arroz.", "Cubre con el doble de agua y cuece 18 minutos.", "Sirve con un huevo frito por persona."))
#receta("Pasta con lentejas a la boloñesa", "Comida", "30 min", "4", ("320 g de pasta", "1 bote de lentejas cocidas (400 g)", "1 cebolla y 1 zanahoria", "400 g de tomate triturado", "Orégano, aceite y sal"), ("Sofríe la cebolla y la zanahoria picadas 10 minutos.", "Añade el tomate y el orégano, cocina 10 minutos.", "Agrega las lentejas aclaradas y cocina 5 minutos más.", "Mezcla con la pasta cocida."), truco: "Si lo pasas por la batidora un momento, nadie nota que no es carne.")
#receta("Tortilla de patatas al horno", "Cena", "45 min", "4", ("4 patatas medianas", "1 cebolla", "6 huevos", "Aceite y sal"), ("Corta las patatas y la cebolla en láminas finas, mézclalas con un poco de aceite y sal.", "Hornea a 200 °C unos 25 minutos, removiendo a mitad.", "Bate los huevos, mezcla con la patata y cuaja en sartén por los dos lados."), truco: "Hacer la patata al horno usa mucho menos aceite que freírla.")
#receta("Patatas a la importancia (versión fácil)", "Comida", "40 min", "4", ("4 patatas", "2 huevos", "Harina", "1 cebolla", "2 dientes de ajo", "Caldo, azafrán o colorante, perejil"), ("Corta las patatas en rodajas gruesas, pásalas por harina y huevo y dóralas.", "Sofríe la cebolla y el ajo, añade el caldo y el azafrán.", "Mete las patatas en la salsa y cuece 20 minutos."))
#receta("Fideuá de verduras", "Comida", "30 min", "4", ("300 g de fideos gruesos", "Verduras variadas (judías, pimiento, alcachofa)", "Tomate triturado, pimentón, ajo", "Caldo"), ("Dora los fideos en la paellera con aceite.", "Añade las verduras y el sofrito de tomate y ajo.", "Cubre con el doble de caldo y cuece hasta que lo absorban, unos 12 minutos."))

= Pescado, huevo y pollo
#receta("Merluza congelada en salsa verde", "Comida", "20 min", "4", ("4 lomos de merluza congelada", "3 dientes de ajo", "1 cucharada de harina", "200 ml de caldo de pescado o agua", "Perejil abundante"), ("Dora el ajo laminado, añade la harina y remueve 1 minuto.", "Agrega el caldo poco a poco sin dejar de remover.", "Pon la merluza (descongelada) y cuece 6–8 minutos moviendo la cazuela.", "Termina con perejil picado."))
#receta("Sardinas en lata con ensalada de patata", "Cena", "25 min", "4", ("2 latas de sardinas en aceite", "4 patatas", "1 cebolleta", "1 pimiento", "Vinagre, aceite, sal"), ("Cuece las patatas con piel 20 minutos y córtalas en rodajas.", "Pica la cebolleta y el pimiento.", "Mezcla todo con vinagreta y las sardinas troceadas por encima."), truco: "Las sardinas en lata con espina aportan mucho calcio y omega 3 a precio bajo.")
#receta("Muslos de pollo al horno con patatas", "Comida", "60 min", "4", ("4 muslos de pollo", "4 patatas", "1 cebolla", "1 limón", "Ajo, tomillo, aceite y sal"), ("Corta patatas y cebolla, colócalas en la bandeja con aceite y sal.", "Pon encima los muslos aliñados con ajo, tomillo y limón.", "Hornea a 200 °C unos 50 minutos, dando la vuelta a mitad."))
#receta("Revuelto de champiñones y espárragos", "Cena", "15 min", "2", ("4 huevos", "200 g de champiñones", "1 manojo de espárragos trigueros", "Ajo, aceite y sal"), ("Saltea los champiñones y los espárragos troceados con ajo.", "Añade los huevos batidos y remueve a fuego bajo hasta cuajar suave."))
#receta("Pisto con huevo", "Cena", "40 min", "4", ("1 cebolla, 1 pimiento rojo, 1 pimiento verde", "2 calabacines", "400 g de tomate triturado", "4 huevos", "Aceite y sal"), ("Pocha la cebolla y los pimientos 10 minutos.", "Añade el calabacín en dados y cocina 10 minutos.", "Agrega el tomate y cocina 15 minutos.", "Haz huecos, casca los huevos y tapa hasta que cuajen."), truco: "Haz el doble: el pisto aguanta 4 días en la nevera y sirve para pasta, arroz o tostadas.")
#receta("Atún con tomate", "Comida", "25 min", "4", ("3 latas de atún al natural", "1 cebolla", "1 pimiento", "500 g de tomate triturado", "Aceite, sal y una pizca de azúcar"), ("Pocha la cebolla y el pimiento.", "Añade el tomate y cocina 15 minutos.", "Agrega el atún escurrido al final, solo para calentar."))

= Bowls y cenas rápidas
#receta("Bowl de garbanzos asados", "Cena", "25 min", "2", ("1 bote de garbanzos", "Pimentón y comino", "Arroz cocido", "Zanahoria rallada, tomate, pepino", "Yogur natural con limón y ajo"), ("Seca los garbanzos, alíñalos con especias y aceite y hornéalos 20 minutos a 200 °C.", "Monta el bol con el arroz, las verduras y los garbanzos.", "Aliña con la salsa de yogur."))
#receta("Quesadillas de verduras y alubias", "Cena", "15 min", "2", ("4 tortillas de trigo", "1 bote pequeño de alubias rojas", "Pimiento y cebolla", "Queso rallado", "Comino"), ("Saltea la verdura con comino y las alubias aplastadas.", "Rellena las tortillas con la mezcla y el queso.", "Dóralas en sartén por los dos lados."))
#receta("Ensalada de lentejas", "Comida", "10 min", "2", ("1 bote de lentejas cocidas", "Tomate, pimiento, cebolleta", "1 lata de atún", "Vinagreta de mostaza"), ("Aclara las lentejas.", "Pica las verduras.", "Mezcla todo con el atún y la vinagreta."))
#receta("Hummus casero con palitos de verdura", "Merienda", "10 min", "4", ("1 bote de garbanzos", "1 cucharada de tahini (o un chorro de aceite)", "Zumo de medio limón", "1 diente de ajo", "Comino, agua, sal"), ("Tritura todo añadiendo agua hasta que quede cremoso.", "Sirve con palitos de zanahoria, pepino o pan."))
#receta("Salteado de arroz de aprovechamiento", "Cena", "15 min", "2", ("Arroz cocido del día anterior", "2 huevos", "Verduras que queden en la nevera", "Salsa de soja"), ("Saltea las verduras a fuego fuerte.", "Añade el arroz frío y saltea 3 minutos.", "Haz un hueco, revuelve los huevos y mezcla con un poco de soja."))
#receta("Coliflor al horno con especias", "Cena", "35 min", "4", ("1 coliflor", "Curry o pimentón", "Aceite y sal", "Yogur natural"), ("Corta la coliflor en ramilletes y alíñala.", "Hornea a 210 °C 25–30 minutos hasta que se dore.", "Sirve con yogur aliñado."))

#receta("Lentejas al curry con arroz", "Comida", "25 min", "4", ("2 botes de lentejas cocidas", "1 cebolla", "1 cucharada de curry", "400 ml de tomate triturado", "200 ml de leche o bebida de coco", "Arroz para acompañar"), ("Sofríe la cebolla picada 8 minutos.", "Añade el curry 30 segundos y luego el tomate, 10 minutos.", "Agrega la leche y las lentejas aclaradas, 5 minutos más.", "Sirve con arroz blanco."))
#receta("Calabacín relleno de atún", "Cena", "35 min", "4", ("2 calabacines", "2 latas de atún", "1 cebolla", "Tomate triturado", "Queso rallado"), ("Parte los calabacines a lo largo, vacíalos y pica la pulpa.", "Sofríe la cebolla con la pulpa y el tomate, y mezcla con el atún.", "Rellena, pon queso y hornea a 200 °C 20 minutos."))
#receta("Huevos al plato con guisantes", "Cena", "20 min", "2", ("4 huevos", "200 g de guisantes congelados", "Tomate triturado", "1 cebolla pequeña", "Pimentón"), ("Sofríe la cebolla, añade el tomate y los guisantes 8 minutos.", "Reparte en cazuelitas o en una sartén, casca los huevos encima.", "Tapa o gratina hasta que la clara cuaje."))
#receta("Macarrones con brócoli y atún", "Comida", "20 min", "4", ("320 g de macarrones", "1 brócoli", "2 latas de atún", "2 dientes de ajo", "Aceite y guindilla (opcional)"), ("Cuece la pasta y añade el brócoli en ramilletes los últimos 4 minutos.", "Dora el ajo en aceite.", "Mezcla todo con el atún escurrido."))

= Menús de 4 semanas
Cada semana reutiliza ingredientes y sobras para no tirar nada. Las cenas usan lo que sobra de las comidas.
#let semana(n, filas) = { heading(level: 2, numbering: none)[Semana #n]; table(columns: (0.9fr, 2fr, 2fr), [Día], [Comida], [Cena], ..filas) }
#semana(1, ([Lunes], [Lentejas con verduras], [Revuelto de champiñones], [Martes], [Arroz con verduras y huevo], [Crema de verduras], [Miércoles], [Lentejas (sobras)], [Tortilla de patatas al horno], [Jueves], [Merluza en salsa verde con arroz], [Ensalada con tortilla (sobras)], [Viernes], [Pasta con lentejas a la boloñesa], [Quesadillas de verduras], [Sábado], [Muslos de pollo al horno], [Crema de verduras (sobras)], [Domingo], [Pollo (sobras) en ensalada], [Hummus y verduras]))
#semana(2, ([Lunes], [Garbanzos con espinacas], [Sopa de fideos con huevo], [Martes], [Fideuá de verduras], [Pisto con huevo], [Miércoles], [Garbanzos (sobras)], [Sardinas con ensalada de patata], [Jueves], [Atún con tomate y arroz], [Pisto (sobras) con pan], [Viernes], [Ensalada de lentejas], [Bowl de garbanzos asados], [Sábado], [Patatas a la importancia], [Salteado de arroz], [Domingo], [Potaje de alubias con calabaza], [Coliflor al horno]))
#semana(3, ([Lunes], [Potaje de alubias (sobras)], [Revuelto de champiñones], [Martes], [Pasta con lentejas], [Crema de verduras], [Miércoles], [Merluza con patatas], [Tortilla de patatas], [Jueves], [Lentejas con verduras], [Quesadillas], [Viernes], [Arroz con verduras y huevo], [Hummus y verduras], [Sábado], [Muslos de pollo al horno], [Ensalada de lentejas], [Domingo], [Lentejas (sobras)], [Salteado de arroz]))
#semana(4, ([Lunes], [Garbanzos con espinacas], [Pisto con huevo], [Martes], [Fideuá de verduras], [Sopa de fideos], [Miércoles], [Atún con tomate y arroz], [Coliflor al horno], [Jueves], [Potaje de alubias], [Sardinas con ensalada de patata], [Viernes], [Garbanzos (sobras)], [Bowl de garbanzos], [Sábado], [Patatas a la importancia], [Crema de verduras], [Domingo], [Pollo al horno], [Tortilla de patatas]))

= Temporada, conservación y sobras
== Fruta y verdura de temporada (España)
#table(columns: (1fr, 2fr, 2fr),
  [Estación], [Verdura], [Fruta],
  [Otoño], [Calabaza, coliflor, brócoli, setas, boniato, puerro], [Manzana, pera, uva, granada, caqui, mandarina],
  [Invierno], [Coles, alcachofa, acelga, espinaca, puerro, apio], [Naranja, mandarina, kiwi, pomelo, manzana],
  [Primavera], [Espárragos, guisantes, habas, alcachofa, lechuga], [Fresa, níspero, cereza (final), naranja],
  [Verano], [Tomate, pimiento, calabacín, berenjena, pepino, judía verde], [Melón, sandía, melocotón, nectarina, ciruela, higo])
== Cuánto dura en la nevera
#table(columns: (2fr, 1fr), [Alimento cocinado], [Días en nevera], [Legumbres y guisos], [3–4], [Arroz cocido], [1–2 (enfríalo rápido)], [Pescado cocinado], [1–2], [Pollo cocinado], [3], [Cremas de verdura], [3–4], [Tortilla], [2])
#cuidado[Enfría las sobras en menos de 2 horas y guárdalas en recipientes cerrados. Con el arroz cocido ten especial cuidado: no lo dejes a temperatura ambiente. Para guardar más tiempo, congela en raciones el mismo día.]

== Mi lista de la compra
#table(columns: (1fr, 1fr, 1fr), [Fruta y verdura], [Proteína], [Despensa], ..range(0, 36).map(_ => []))
