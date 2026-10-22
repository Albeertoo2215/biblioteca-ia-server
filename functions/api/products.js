import { catalog, json } from '../_lib/stripe.js';

// Catálogo público: nunca expone la clave del archivo en R2, solo su formato (PDF, ZIP...).
export const onRequestGet = () =>
  json(catalog.map(({ file, ...pub }) => ({ ...pub, format: file.split('.').pop().toUpperCase() })));
