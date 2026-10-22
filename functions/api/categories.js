import categories from '../../data/categories.json';
import { json } from '../_lib/stripe.js';

export const onRequestGet = () => json(categories);
