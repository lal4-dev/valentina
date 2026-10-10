# Design

## Context

La aplicación es un proyecto nuevo sobre Next.js (App Router, React 19) con Tailwind CSS v4. Debe ofrecer una experiencia web móvil y de escritorio con temática de BTS y tonalidades pasteles, optimizada para ejecutarse localmente o desplegarse fácilmente. Consulta `proposal.md` para el contexto y motivación.

## Goals / Non-Goals

**Goals:**
- Implementar una interfaz de autenticación rápida y personalizada para Valentina (contraseña basada en fecha de cumpleaños) y un perfil de Administrador.
- Proveer un mecanismo interactivo estético (ruleta pastel con animaciones CSS suaves) para los 7 integrantes de BTS.
- Descontar y tachar automáticamente los regalos obtenidos hasta completar los 7.
- Persistir el estado del sorteo en `localStorage` con soporte para reiniciar en cualquier momento.
- Mantener una estructura modular limpia de componentes en `src/components/` y datos tipados en `src/data/btsMembers.ts`.

**Non-Goals:**
- No se requiere una base de datos externa ni backend con base de datos en esta primera etapa (se prioriza simplicidad, rapidez y funcionamiento autónomo con `localStorage`).
- No se implementa gestión de múltiples usuarios dinámicos más allá de los dos perfiles requeridos.

## Decisions

### 1. Mecanismo de Sorteo: Ruleta Interactiva SVG con Animación CSS
- **Decisión**: Implementar una ruleta estilizada en SVG/Canvas renderizada con segmentos en tonos pasteles y un indicador superior. El giro se controla mediante rotación calculada (CSS transition con función de timing `cubic-bezier(0.15, 0.9, 0.2, 1)`) asegurando que aterrice exactamente en uno de los números pendientes.
- **Alternativa considerada**: Un bolillero de pelotas estilo lotería. Se optó por la ruleta por brindar mayor suspense visual, feedback háptico/sonoro potencial y elegancia estética en pantallas de celular.

### 2. Manejo de Estado y Persistencia en Cliente
- **Decisión**: Usar un contexto de React (`LotteryContext`) acoplado a un hook de persistencia sincronizado con `localStorage`.
- **Alternativa considerada**: Cookies de sesión o servidor Next.js API Routes. La solución con `localStorage` es autosuficiente, funciona offline y resiste recargas accidentales sin requerir configuración de servidor externo.

### 3. Modelo de Datos de Integrantes BTS (`btsMembers.ts`)
- **Decisión**: Crear una estructura estricta en TypeScript con los 7 miembros:
  1. RM (Líder / Sabiduría)
  2. Jin (Alegría / Amor propio)
  3. SUGA (Pasión / Calma)
  4. j-hope (Esperanza / Energía)
  5. Jimin (Ternura / Afecto)
  6. V (Creatividad / Romanticismo)
  7. Jung Kook (Talento / Fortaleza)
  Cada entrada incluirá número asignado (1-7), nombre artístico, nombre real, frase característica, color pastel temático, mensaje personalizado de cumpleaños y referencia a imagen/avatar.

### 4. Sistema de Diseño Pastel y UI
- **Decisión**: Emplear clases de utilidad de Tailwind CSS v4 con variables semánticas para los tonos lila/morado Borahae, rosa rubor, menta y cielo pastel, con efectos de glassmorphism (`backdrop-blur-md bg-white/70`) y tipografía moderna redondeada.

## Risks / Trade-offs

- **[Riesgo: Hidratación de SSR con localStorage]** → Mitigación: Usar un estado de carga inicial (`isHydrated`) antes de renderizar para evitar desajustes de hidratación entre Next.js SSR y el estado del navegador.
- **[Riesgo: Selección repetida de números]** → Mitigación: El generador de números aleatorios filtra exclusivamente la lista de números `remainingNumbers`. Cuando queda solo 1, la ruleta apunta directamente al último.

## Migration Plan

No aplica migración; es una funcionalidad inicial.
