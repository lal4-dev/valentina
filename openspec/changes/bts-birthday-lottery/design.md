# Design

## Context

La aplicación es un proyecto sobre Next.js (App Router, React 19) con Tailwind CSS v4. Debe ofrecer una experiencia web interactiva, responsive y estética con dos modos visuales (Pastel Gifts y Arirang Concierto Argentina en rojo/negro/blanco), acompañando la entrega de 7 regalos de cumpleaños.

## Goals / Non-Goals

**Goals:**
- Implementar login amigable con perfiles: Valentina (clave `14102026`) y Admin.
- Orden predefinido de los 7 miembros:
  1. Yoongi (SUGA)
  2. Tae (V)
  3. Jimin
  4. Namjoon (RM)
  5. Jin
  6. Hobi (j-hope)
  7. Jungkook
- Soporte dual de temas con botón flotante accesible en todo momento:
  - **Pastel Gifts**: Rosa pastel, amarillo pastel, celeste, menta, lila Borahae.
  - **Arirang Concierto**: Rojo rubí, negro mate, blanco puro.
- Ruleta SVG interactiva que descuenta progresivamente los números del 1 al 7.
- Persistencia en `localStorage` (progreso de regalos y preferencia de tema).
- Soporte de imágenes en `public/members/` para que el usuario pueda colocar sus PNGs (con avatares ilustrados estilizados como fallback).

**Non-Goals:**
- Backend con base de datos externa; todo corre de forma reactiva y autónoma en cliente.

## Decisions

### 1. Sistema de Temas: `ThemeContext` y Clases CSS Variables
- **Decisión**: Un contexto de tema que aplica un atributo o clase de datos (`data-theme="pastel"` o `data-theme="arirang"`) al contenedor raíz o al elemento `html`. Tailwind CSS v4 y variables CSS adaptan los colores de fondo, gradientes, bordes y botones de inmediato sin recargar la página.
- **Botón Flotante**: Un componente `ThemeToggleFAB` ubicado en una esquina superior o inferior derecha, con icono animado y selector de modo ("🌸 Pastel Gifts" / "🔥 Arirang Concierto").

### 2. Estructura de Datos de Integrantes (`src/data/btsMembers.ts`)
- Mapeo estricto del 1 al 7:
  - `id`: 1 al 7
  - `name`: Nombre artístico
  - `realName`: Nombre real
  - `quote`: Frase icónica
  - `birthdayMessage`: Mensaje amoroso personalizado
  - `giftHint`: Pista o descripción del regalo
  - `pastelColor`: Color pastel distintivo
  - `arirangColor`: Color de acento estilo Arirang (rojo/blanco/negro)
  - `imagePath`: Ruta en `public/members/` (ej: `/members/yoongi.png`)

### 3. Animación de Ruleta y Extracción
- Ruleta SVG con 7 sectores. Cuando un número ya salió, su sector se atenúa o se marca con un check visual.
- El generador de números aleatorios selecciona exclusivamente entre los pendientes `remainingNumbers`. La ruleta gira con rotación acumulativa `currentRotation + 360 * spins + targetAngle` con curva `cubic-bezier(0.15, 0.9, 0.2, 1)`.

## Risks / Trade-offs

- **[Carga de imágenes PNG locales]** → Si los archivos PNG no existen aún en `public/members/`, el componente de imagen detecta el fallback y muestra una ilustración vectorial con el nombre y avatar estilizado del integrante para que la aplicación nunca se vea rota.
