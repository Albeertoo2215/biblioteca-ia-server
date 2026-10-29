# Reglas del proyecto

## Comunicación
- Todo en español: código comentado, commits, PRs, documentación y respuestas.
- Tono directo: sin relleno, al grano y con recomendaciones claras.

## Seguridad
- Nunca escribas secretos (API keys, tokens, contraseñas, service keys) en el código ni en el historial. Van en `.env` (ignorado) y se documentan vacíos en `.env.example`.
- Antes de cada commit, revisa el diff buscando secretos. Si se sube uno, se revoca de inmediato; borrarlo del repo no basta.
- Las claves privilegiadas (p. ej. Supabase `service_role`) solo se usan en el servidor, nunca en el frontend.

## Clientes
- Cada cliente tiene su propio repositorio **privado**, creado desde `plantilla-app-cliente`.
- Nunca se mezcla código, datos ni credenciales de clientes distintos.
- Los datos reales de clientes nunca se suben al repo (ni como fixtures ni como seeds).

## RGPD por defecto
- Minimización: recoger solo los datos necesarios.
- Consentimiento explícito y enlace a la política de privacidad en cada formulario.
- Nada de cookies de seguimiento ni analítica sin consentimiento previo.
- Proveedores con alojamiento en la UE siempre que se pueda, y DPA firmado con cada encargado del tratamiento.
- Prever exportación y borrado de datos de usuario (derechos ARSOPL).

## Acciones destructivas
- Pregunta antes de borrar ramas, repos o datos. Nunca `push --force` a `main`.
