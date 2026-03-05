Guía rápida para desplegar en Vercel

Resumen
- Cliente: tecsup-inventory-web (Vite + React).
- Backend: API desplegada en Render: https://tecsup-inventory-api.onrender.com/
- Despliegue en Vercel con PNPM y configuración estática de SPA.

Qué hay de nuevo
- Vercel config (vercel.json) para static-build y rutas SPA.
- Fallback seguro para la URL de API en src/api/client.ts.
- Engines Node para compatibilidad (>=18).
- Se describe cómo exponer VITE_API_URL a producción con variables de entorno.

Prerrequisitos
- Cuenta en Vercel y repositorio Git conectado.
- Node.js >= 18 instalado localmente (solo para pruebas locales).
- PNPM instalado si vas a testear localmente (opcional, pero recomendado).

Archivo clave
- vercel.json: configuración de build y rutas (SPA).
- vercel.json ya está incluido en el repo.
- src/api/client.ts: ahora soporta fallback a https://tecsup-inventory-api.onrender.com si VITE_API_URL no está definido.
- package.json: engines configurados para Node >=18 y PNPM manejado por Vercel.

Cómo configurarlo en Vercel (paso a paso)

Notas sobre el backend (CORS)
- El backend en Render debe permitir solicitudes desde el dominio de tu app en Vercel (por ejemplo, https://tu-app.vercel.app o *.vercel.app).
- Si no quieres restringir, puedes permitir origen '*' temporalmente para pruebas, pero evita en producción.

Pruebas post-despliegue
- Abre la URL de tu frontend en Vercel y verifica que las pantallas cargan.
- Realiza una operación que consuma la API (crear/consultar activos) para confirmar que la URL de API funciona correctamente.

Notas técnicas y archivos modificados
- src/api/client.ts: ahora usa un fallback a https://tecsup-inventory-api.onrender.com si VITE_API_URL no está definido.
- package.json: añade "engines": { "node": ">=18" } para compatibilidad de Node en Vercel.
- vercel.json: configuración para static-build y SPA routing.
- README-VERCEL.md: guía de despliegue (este archivo).

Guía rápida de verificación local (opcional)
Coloca este README en tu repo para futuras referencias.

Enlaces relevantes
- API Backend: https://tecsup-inventory-api.onrender.com/
- Vercel: https://vercel.com/
