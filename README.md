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
  - [Tabla de Contenidos](#tabla-de-contenidos)
  - [Descripción](#descripción)
  - [Tech Stack](#tech-stack)
  - [Funcionalidades](#funcionalidades)
  - [Estructura del Proyecto](#estructura-del-proyecto)
  - [Variables de Entorno](#variables-de-entorno)
  - [Requisitos Previos](#requisitos-previos)
  - [Instalación y Setup](#instalación-y-setup)
  - [Scripts Disponibles](#scripts-disponibles)
  - [Backend Requerido](#backend-requerido)
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

![React](https://img.shields.io/badge/React_19-20232A?style=flat-square&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite_SWC-9B59B6?style=flat-square&logo=vite&logoColor=white)

**UI & Estilos**

![Tailwind](https://img.shields.io/badge/Tailwind_v4-0F172A?style=flat-square&logo=tailwindcss&logoColor=38BDF8)
![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-18181B?style=flat-square&logoColor=white)
![Lucide](https://img.shields.io/badge/Lucide_React-1E293B?style=flat-square&logoColor=white)

**Formularios & Validación**

![React Hook Form](https://img.shields.io/badge/React_Hook_Form-EC5990?style=flat-square&logo=reacthookform&logoColor=white)
![Zod](https://img.shields.io/badge/Zod-1E3A5F?style=flat-square&logoColor=white)

**Estado & Navegación**

![Zustand](https://img.shields.io/badge/Zustand-2C2C2C?style=flat-square&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router_v7-CA4245?style=flat-square&logo=reactrouter&logoColor=white)

**HTTP & Cámara**

![Axios](https://img.shields.io/badge/Axios-372B8C?style=flat-square&logo=axios&logoColor=white)
![react-webcam](https://img.shields.io/badge/react--webcam-20232A?style=flat-square&logo=react&logoColor=61DAFB)

**Calidad de Código**

![Biome](https://img.shields.io/badge/Biome-1E293B?style=flat-square&logo=biome&logoColor=60A5FA)

---

## Funcionalidades

| Módulo                                                                                     | Estado         |
| ------------------------------------------------------------------------------------------ | -------------- |
| **Sesión de trabajo** — Configura pabellón, laboratorio y armario antes de inventariar     | ✅ Listo        |
| **OCR de etiquetas** — Toma foto con el celular → formulario prellenado con IA             | ✅ Listo        |
| **Dictado de voz** — Habla para registrar o consultar un activo                            | ✅ Listo        |
| **Dashboard de sesión** — Listado en tiempo real con opción de deshacer el último registro | ✅ Listo        |
| **Búsqueda rápida** — Busca activos por nombre, modelo o número de serie                   | ✅ Listo        |
| **Exportar PDF / Excel** — Descarga el resumen de la jornada al finalizar                  | ✅ Listo        |
| **PWA** — Instalable en pantalla de inicio del celular, funciona sin conexión parcialmente | 🔜 Próximamente |

---

## Estructura del Proyecto

```
src/
├── api/                        # Funciones axios organizadas por feature
│   ├── client.ts               # Instancia base de axios con baseURL e interceptors
│   ├── ocr.ts                  # Llamadas a /api/ocr/*
│   ├── voz.ts                  # Llamadas a /api/voz/*
│   ├── sesion.ts               # Llamadas a /api/sesion/*
│   ├── dashboard.ts            # Llamadas a /api/dashboard/*
│   ├── busqueda.ts             # Llamadas a /api/busqueda
│   └── exportar.ts             # Llamadas a /api/exportar/*
│
├── components/
│   ├── ui/                     # Componentes generados por shadcn (no editar a mano)
│   └── shared/                 # Componentes reutilizables propios
│       ├── Layout.tsx
│       ├── PageHeader.tsx
│       ├── FormField.tsx
│       ├── LoadingSpinner.tsx
│       └── ErrorMessage.tsx
│
├── pages/                      # Una carpeta por pantalla
│   ├── Sesion/
│   │   ├── index.tsx
│   │   └── SesionForm.tsx
│   ├── Camara/
│   │   ├── index.tsx
│   │   ├── CamaraCaptura.tsx
│   │   └── ResultadoOCR.tsx
│   ├── Voz/
│   │   ├── index.tsx
│   │   ├── GrabadorVoz.tsx
│   │   └── ResultadoVoz.tsx
│   ├── Dashboard/
│   │   ├── index.tsx
│   │   └── ActivoCard.tsx
│   └── Busqueda/
│       └── index.tsx
│
├── schemas/                    # Validaciones Zod por feature
│   ├── sesion.schema.ts
│   ├── dispositivo.schema.ts
│   └── busqueda.schema.ts
│
├── store/
│   └── sesionStore.ts          # Zustand: sesion_id, laboratorio y armario activos
│
├── types/
│   └── index.ts                # Interfaces TypeScript (Dispositivo, Sesion, etc.)
│
├── hooks/                      # Lógica de negocio desacoplada de la UI
│   ├── useOCR.ts
│   ├── useVoz.ts
│   └── useSesion.ts
│
├── lib/
│   └── utils.ts                # cn() de shadcn y utilidades generales
│
├── router.tsx                  # Definición de rutas con react-router-dom
├── App.tsx
├── main.tsx
└── index.css
```

---

## Variables de Entorno

Copia el archivo de ejemplo antes de iniciar:

```bash
cp .env.example .env
```

| Variable       | Descripción                  | Ejemplo                 |
| -------------- | ---------------------------- | ----------------------- |
| `VITE_API_URL` | URL base del backend FastAPI | `http://localhost:8000` |

> Solo se necesita esta variable. Toda la lógica de IA vive en el backend.

---

## Requisitos Previos

- **Node.js** 22+
- **pnpm** 10+

```bash
# Verificar versiones
node -v
pnpm -v
```

---

## Instalación y Setup

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

```bash
cp .env.example .env
# Edita .env y apunta VITE_API_URL al backend
```

**4. Levantar el servidor de desarrollo**

```bash
pnpm dev
```

La app estará disponible en `http://localhost:5173`.

Para acceder desde el celular en la misma red WiFi:

```bash
pnpm dev --host
# Abre la IP local que muestra Vite (ej: http://192.168.1.x:5173)
```

> El backend debe estar corriendo antes de usar la app. Ver [tecsup-inventory-api](https://github.com/JosepRivera/tecsup-inventory-api).

---

## Scripts Disponibles

| Comando           | Descripción                                         |
| ----------------- | --------------------------------------------------- |
| `pnpm dev`        | Servidor de desarrollo con hot-reload               |
| `pnpm dev --host` | Servidor accesible desde el celular en la misma red |
| `pnpm build`      | Build de producción (TypeScript + Vite)             |
| `pnpm preview`    | Preview del build de producción                     |
| `pnpm lint`       | Linter con Biome                                    |
| `pnpm format`     | Formatea el código con Biome                        |
| `pnpm check`      | Lint + format + organiza imports en un solo comando |

---

## Backend Requerido

Este frontend no funciona de forma standalone — requiere el backend [tecsup-inventory-api](https://github.com/JosepRivera/tecsup-inventory-api) corriendo localmente o en un servidor accesible.

Consulta el README del backend para instrucciones de instalación.

---

## Equipo

Desarrollado por estudiantes de **Diseño y Desarrollo de Software** — Tecsup, 2026.

| Nombre                                | GitHub                                                                                                                                  |
| ------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| **Rivera Munarez, Josep Danton**      | [![GitHub](https://img.shields.io/badge/GitHub-JosepRivera-181717?style=for-the-badge&logo=github)](https://github.com/JosepRivera)     |
| **Casapaico Aquino, Alex Luis**       | [![GitHub](https://img.shields.io/badge/GitHub-AlexCasapaico-181717?style=for-the-badge&logo=github)](https://github.com/AlexCasapaico) |
| **Ramos Chamorro, Milagros Madelein** | [![GitHub](https://img.shields.io/badge/GitHub-MilagrosRamos-181717?style=for-the-badge&logo=github)](https://github.com/MilagrosRamos) |

---

## Licencia

Este proyecto está bajo la licencia **MIT**.