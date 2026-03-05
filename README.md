<div align="center">

# Tecsup Inventory Web

[![React](https://img.shields.io/badge/React-19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB&labelColor=20232A&color=2d2d2d)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-007ACC?style=for-the-badge&logo=typescript&logoColor=white&labelColor=007ACC&color=2d2d2d)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-v22-339933?style=for-the-badge&logo=nodedotjs&logoColor=white&labelColor=339933&color=2d2d2d)](https://nodejs.org/)
[![pnpm](https://img.shields.io/badge/pnpm-10-F69220?style=for-the-badge&logo=pnpm&logoColor=white&labelColor=F69220&color=2d2d2d)](https://pnpm.io/)
[![Vite](https://img.shields.io/badge/Vite-7-9B59B6?style=for-the-badge&logo=vite&logoColor=white&labelColor=9B59B6&color=2d2d2d)](https://vitejs.dev/)
[![Biome](https://img.shields.io/badge/Biome-2.4-1E293B?style=for-the-badge&logo=biome&logoColor=60A5FA&labelColor=1E293B&color=2d2d2d)](https://biomejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-0F172A?style=for-the-badge&logo=tailwindcss&logoColor=38BDF8&labelColor=0F172A&color=2d2d2d)](https://tailwindcss.com/)
[![MIT License](https://img.shields.io/badge/License-MIT-1A1A2E?style=for-the-badge&logo=opensourceinitiative&logoColor=F5C518&labelColor=1A1A2E&color=2d2d2d)](./LICENSE)

**Aplicación web móvil (PWA) para inventariado inteligente de dispositivos tecnológicos.**  
Escanea etiquetas con la cámara del celular o dicta por voz — sin instalar nada.

</div>

---

## Tabla de Contenidos

- [Tecsup Inventory Web](#tecsup-inventory-web)
  - [Descripción](#descripción)
  - [Tech Stack](#tech-stack)
  - [Pantallas de la Aplicación](#pantallas-de-la-aplicación)
  - [Estructura del Proyecto](#estructura-del-proyecto)
  - [Requisitos Previos](#requisitos-previos)
  - [Instalación y Configuración](#instalación-y-configuración)
  - [Inicialización y Tecnologías](#inicialización-y-tecnologías)
  - [Uso de shadcn/ui](#uso-de-shadcnui)
  - [Scripts Disponibles](#scripts-disponibles)
  - [Equipo](#equipo)
  - [Licencia](#licencia)

---

## Descripción

**Tecsup Inventory Web** es el frontend de un sistema de inventariado de dispositivos tecnológicos desarrollado como proyecto de pasantía en **Tecsup**.

El técnico abre la app desde su celular (sin instalación), configura su sesión con el laboratorio y armario donde trabaja, y puede inventariar dispositivos de dos formas: tomando una foto de la etiqueta para que la IA extraiga los datos automáticamente, o dictando la información por voz. Todos los activos registrados quedan disponibles en un dashboard de sesión con opción de exportar el resumen en PDF o Excel al finalizar la jornada.

Se conecta al backend [tecsup-inventory-api](https://github.com/JosepRivera/tecsup-inventory-api) que procesa imágenes con **Claude Vision** y audio con **Groq Whisper**.

---

## Tech Stack

**Core**
- **React 19**: Biblioteca UI principal.
- **TypeScript 5.9**: Tipado estático para robustez.
- **Vite 7**: Empaquetador rápido y moderno.

**UI & Estilos**
- **Tailwind CSS v4**: Estilos modernos y configurables.
- **shadcn/ui**: Componentes de UI accesibles y personalizables.
- **Lucide React**: Set de iconos optimizado.

---

## Pantallas de la Aplicación

La app consta de **7 pantallas** organizadas por flujo de trabajo. Una barra de navegación inferior fija (visible una vez iniciada la sesión) da acceso rápido a las cuatro pantallas principales: Escanear, Voz, Dashboard y Búsqueda.

| Ruta | Pantalla | Protegida |
| :--- | :--- | :---: |
| `/` | Configurar Sesión | — |
| `/camara` | Escanear Etiqueta (OCR) | ✓ |
| `/voz` | Dictado de Voz | ✓ |
| `/dashboard` | Dashboard de Jornada | ✓ |
| `/busqueda` | Búsqueda de Activos | ✓ |
| `/historial` | Historial de Sesiones | ✓ |
| `/estadisticas` | Estadísticas Globales | ✓ |

> Las rutas protegidas requieren una sesión activa. Sin ella, se redirige automáticamente a `/`.

---

### `/` — Configurar Sesión

Pantalla de inicio y único punto de entrada público. El técnico configura el contexto de trabajo antes de comenzar a inventariar.

**Campos del formulario:**
- **Nombre y Apellido** del técnico (se persiste en `localStorage` para la próxima jornada).
- **Pabellón** (selector con opciones A–G + campo libre "Otro").
- **Laboratorio** (selector con 8 opciones predefinidas + campo libre "Otro").
- **Armario / Fila** (campo opcional).

Al enviar, se crea la sesión en el backend y se redirige automáticamente a `/camara`.

---

### `/camara` — Escanear Etiqueta (OCR)

Permite registrar un activo fotografiando su etiqueta. La imagen se envía al backend donde **Claude Vision** extrae los datos.

**Flujo en dos pasos:**
1. **Captura**: Botón para abrir la cámara trasera del dispositivo directamente, o alternativamente subir una imagen desde la galería. Muestra previsualización de la foto tomada.
2. **Resultado OCR**: Formulario editable pre-rellenado con los datos extraídos (nombre, marca, modelo, tipo, número de serie, observaciones). Muestra el texto crudo detectado y un badge de nivel de **confianza** (alta / media / baja). El técnico puede corregir cualquier campo antes de confirmar.

Al confirmar, el activo se guarda y se redirige al Dashboard.

---

### `/voz` — Dictado de Voz

Permite registrar un activo o consultar el inventario de forma oral. El audio se transcribe con **Groq Whisper** y la IA interpreta la intención.

**Flujo en dos pasos:**
1. **Grabación**: Botón para iniciar/detener la grabación. El icono de micrófono pulsa en rojo mientras graba.
2. **Resultado** (dos modos según la intención detectada):
   - **Registro**: Si se dictan datos de un activo, se muestra un formulario editable pre-rellenado (igual que OCR) con la transcripción visible. El técnico confirma para guardar.
   - **Consulta**: Si se pregunta por un dispositivo (p. ej. *"¿Dónde está el Dell Latitude?"*), se muestran las coincidencias del inventario en tarjetas con nombre, marca, tipo, estado y ubicación.

---

### `/dashboard` — Dashboard de Jornada

Vista central de la sesión en curso. Muestra un resumen de los activos registrados y centraliza las acciones principales.

**Secciones:**
- **Resumen**: Tres contadores — Total de activos, registrados por OCR y registrados por Voz.
- **Navegación rápida**: Accesos directos a Historial y Estadísticas.
- **Exportar Sesión Actual**: Genera un PDF o Excel con los activos de la sesión en curso.
- **Exportación de Inventario Total**: Genera un PDF Global o Excel Global con todo el patrimonio registrado en el sistema.
- **Lista de activos**: Tarjetas por cada activo con acciones de **editar** (abre un diálogo modal con todos los campos: nombre, marca, modelo, tipo, serie, estado, ubicación, observaciones) y **eliminar** (con confirmación de alerta).

---

### `/busqueda` — Búsqueda de Activos

Buscador en tiempo real sobre el inventario completo (no solo la sesión activa).

- Búsqueda instantánea con debounce de 400 ms al escribir.
- Sin texto en el campo, muestra **todos los activos** del sistema paginados.
- Con texto, filtra por nombre, marca, modelo, serie, etc.
- Paginación tipo "Cargar más" (20 ítems por página).
- Indicador del número de resultados con badge numérico.

---

### `/historial` — Historial de Sesiones

Registro cronológico de todas las jornadas de inventariado realizadas.

Cada sesión aparece como una tarjeta con:
- **Fecha** de creación (formato largo en español peruano).
- **Badge de estado**: *En curso* (con animación pulse) o *Finalizada*.
- **Ubicación**: Pabellón y laboratorio.
- **Detalle**: Armario asignado.

---

### `/estadisticas` — Estadísticas Globales

Panel de métricas sobre todo el patrimonio tecnológico registrado en el sistema.

**Información mostrada:**
- **Total de activos** y **total de sesiones** registradas (tarjetas destacadas).
- **Distribución por Tipo**: Barras de progreso proporcionales para cada categoría de dispositivo (laptop, monitor, etc.).
- **Estado de Conservación**: Lista con conteo de activos por estado (Bueno, Regular, Malo, etc.).

---

## Estructura del Proyecto

A continuación se detalla la organización de las carpetas dentro de `src/`:

```
src/
├── api/              # Funciones de Axios para comunicación con el backend FastAPI.
├── components/       # Componentes React.
│   ├── shared/       # Componentes reutilizables propios (Layout, BottomNav, ActivoCard, etc).
│   └── ui/           # Componentes instalados desde shadcn/ui.
├── hooks/            # Hooks personalizados para lógica de negocio desacoplada.
├── lib/              # Tipos y utilidades compartidas (cn, validaciones).
├── pages/            # Pantallas o rutas completas de la aplicación.
│   ├── Busqueda/     # Búsqueda en tiempo real de activos.
│   ├── Camara/       # Captura de imagen y resultado OCR.
│   ├── Dashboard/    # Vista de jornada + exportación.
│   ├── Estadisticas/ # Métricas globales del inventario.
│   ├── Historial/    # Historial de sesiones pasadas.
│   ├── Session/      # Formulario de configuración de sesión.
│   └── Voz/          # Grabador de voz y resultado de dictado/consulta.
├── schemas/          # Definiciones de validación (Zod) para formularios.
├── store/            # Gestión de estado global con Zustand (sesiones).
├── types/            # Interfaces y tipos de TypeScript compartidos.
├── App.tsx           # Componente raíz.
├── main.tsx          # Punto de entrada de la aplicación.
├── router.tsx        # Configuración de rutas (React Router 7).
└── index.css         # Estilos globales y variables de Tailwind.
```

---

## Requisitos Previos

- **Node.js** 22 o superior.
- **pnpm** 10 o superior.

```bash
node -v
pnpm -v
```

---

## Instalación y Configuración

**1. Clonar el repositorio**
```bash
git clone https://github.com/JosepRivera/tecsup-inventory-web.git
cd tecsup-inventory-web
```

**2. Instalar dependencias**
```bash
pnpm install
```

**3. Configurar variables de entorno**
Copia el archivo de ejemplo y configura tu URL de API:
```bash
cp .env.example .env
```
Edita `.env` y apunta `VITE_API_URL` al backend (por defecto `http://localhost:8000`).

---

## Inicialización y Tecnologías

El proyecto ha sido inicializado con las mejores prácticas modernas:

- **Framework**: Vite con el plugin de React SWC para compilación ultra rápida.
- **Linter & Formatter**: Biome para un mantenimiento de código rápido y unificado.
- **Estilos**: Tailwind CSS v4, que permite una configuración más limpia y moderna.
- **Estado**: Zustand para una gestión de estado ligera sin el boilerplate de Redux.

---

## Uso de shadcn/ui

Este proyecto utiliza **shadcn/ui** para componentes de interfaz consistentes y accesibles.

### Para añadir un nuevo componente:
Si necesitas un componente que no está en `src/components/ui`, instálalo usando `npx`:

```bash
npx shadcn@latest add [nombre-del-componente]
```

### Personalización:
Los componentes se instalan directamente en tu código fuente (`src/components/ui`), lo que te permite modificarlos libremente si el diseño lo requiere.

---

## Scripts Disponibles

| Comando | Descripción |
| :--- | :--- |
| `pnpm dev` | Servidor de desarrollo con Hot Reload. |
| `pnpm dev --host` | Servidor accesible desde otros dispositivos en la red. |
| `pnpm build` | Compila el proyecto para producción. |
| `pnpm check` | Formatea el código y analiza errores con Biome. |
| `pnpm preview` | Previsualiza el build de producción localmente. |
| `pnpm test` | Ejecuta las pruebas automatizadas (Vitest + RTL). |

---

## Despliegue en Vercel

- Este proyecto está configurado para desplegarse como sitio estático con Vercel usando PNPM y Vite.
- Archivos clave para el despliegue ya están en el repo:
  - vercel.json: configuración de build estático y routing tipo SPA.
  - package.json: engines para Node >=18 y script de build que genera dist.
  - src/api/client.ts: incorpora fallback a la API pública si no se define VITE_API_URL.
- Backend de referencia: https://tecsup-inventory-api.onrender.com/

Pasos para desplegar:
   - VITE_API_URL (opcional si usas fallback): apunta a tu API pública. Si no lo haces, la app usará https://tecsup-inventory-api.onrender.com/ por defecto.
   - CORS en tu backend: añade tu dominio de Vercel (por ejemplo, https://tu-app.vercel.app o *.vercel.app) como origen permitido.
4) Despliega. Vercel ejecutará pnpm install y pnpm run build, generando el directorio dist asociado.
5) Verifica el sitio desplegado visitando la URL de tu proyecto en Vercel. Realiza pruebas de flujo (Login, OCR, búsqueda, exportación).

Notas útiles:
- Si el backend necesita credenciales, usa Environment Variables para no exponerlas en el código.
- Si cambias la URL de la API, actualiza VITE_API_URL en Vercel y reconstruye.
- Para pruebas locales, puedes simular la URL de la API en .env y correr pnpm run build seguido de pnpm run preview.


## Equipo

Desarrollado por estudiantes de **Diseño y Desarrollo de Software** — Tecsup, 2026.

| Nombre | GitHub |
| :--- | :--- |
| **Rivera Munarez, Josep Danton** | [JosepRivera](https://github.com/JosepRivera) |
| **Casapaico Aquino, Alex Luis** | [AlexCasapaico](https://github.com/AlexCasapaico) |
| **Ramos Chamorro, Milagros Madelein** | [MilagrosRamos](https://github.com/MilagrosRamos) |

---

## Licencia

Este proyecto está bajo la licencia **MIT**.
