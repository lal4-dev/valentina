# Design

## Context

La aplicación es un proyecto sobre Next.js (App Router, React 19) con Tailwind CSS v4. Ofrece una experiencia web interactiva, responsive y estética con dos modos visuales (Pastel Gifts y Arirang Concierto Argentina en rojo/negro/blanco), acompañando la entrega de 7 regalos de cumpleaños para Valentina según sus preferencias de integrantes de BTS.

## Goals / Non-Goals

**Goals:**
- Pantalla de bloqueo con temporizador en tiempo real hasta el 14 de Octubre de 2026, 00:00:00 hs de Argentina (UTC-3).
- Login intuitivo con perfiles: Valentina (clave `14102026`) y Administrador (clave `admin290344`).
- Panel de control en `/admin` para probar la ruleta sin restricciones de fecha, simular el contador en vivo o en cero, y reiniciar el progreso.
- Orden predefinido de los 7 miembros:
  1. Yoongi (SUGA)
  2. Tae (V)
  3. Jimin
  4. Namjoon (RM)
  5. Jin
  6. Hobi (j-hope)
  7. Jungkook
- Lógica de sorteo con reglas determinísticas:
  - Giro 1: Siempre Namjoon (#4, carta del corazón).
  - Giros 2 al 6: Aleatorios entre los pendientes, excluyendo el #7.
  - Giro 7: Siempre Jungkook (#7, brindis final).
- Soporte dual de temas con botón flotante accesible en todo momento:
  - **Pastel Gifts**: Lavanda, violeta Borahae, rosa pastel, amarillo suave.
  - **Arirang Concierto**: Rojo rubí, negro mate, blanco puro.
- Persistencia sincrónica en `localStorage` libre de errores de hidratación mediante `useSyncExternalStore`.
- Código fuente, nombres de archivos, funciones y variables íntegramente en español con comentarios de sección estructurados.

**Non-Goals:**
- Base de datos externa o backend centralizado; la aplicación corre de forma reactiva y autónoma en el navegador.

## Decisions

### 1. Sistema de Temas: `ContextoTema` y Atributo `data-theme`
- **Decisión**: Un contexto de tema (`ProveedorTema`) que sincroniza el tema preferido en `localStorage` (`bts_valentina_theme`) y aplica el atributo `data-theme="pastel"` o `data-theme="arirang"` en la raíz del documento.
- **Botón Flotante (`BotonCambioTema`)**: Accesible en la esquina superior de todas las pantallas con animación suave y cambio reactivo instantáneo.

### 2. Bloqueo Temporal y Cuenta Regresiva (`PantallaBloqueoCumple`)
- **Decisión**: El timestamp objetivo está fijado en `1791946800000` (`2026-10-14T00:00:00-03:00`). Un intervalo de un segundo actualiza la cuenta regresiva formateada en Días, Horas, Minutos y Segundos.
- **Corazón Reactivo**: El avatar de Valentina en la pantalla de espera incluye un emblema de corazón que se tiñe de violeta en modo Pastel y de rojo en modo Arirang.
- **Desbloqueo**: Al alcanzar el tiempo objetivo o simularse en `/admin`, la pantalla habilita el botón de inicio festivo con confeti.

### 3. Ruleta de Sorteo y Selección Controlada (`ContextoRuleta`)
- **Decisión**: Ruleta circular en SVG con 7 sectores de 51.42 grados cada uno.
- **Fórmula de Giro**: Giro acumulativo `rotacion + 360 * 5 + desplazamiento` con física `cubic-bezier(0.15, 0.9, 0.2, 1)`.
- **Lógica de Asignación**:
  - `numerosSorteados.length === 0`: Garantiza selección del número 4.
  - `numerosSorteados.length === 6`: Garantiza selección del número 7.
  - Intermedios: Selección pseudoaleatoria filtrando el 7 (`numerosRestantes.filter(n => n !== 7)`).
- **Reinicio**: La acción de reinicio de la ruleta se removió de la vista principal de Valentina y se reservó exclusivamente al panel `/admin`.

### 4. Estructura de Datos en Español (`miembrosBts.ts` y `configuracionAutenticacion.ts`)
- **Decisión**: Modelos de TypeScript con tipado fuerte en español (`MiembroBTS`, `PerfilUsuario`, `PaletaColorTema`, `IdentificadorUsuario`).
- Las carpetas del proyecto se mantienen en inglés por convención de Next.js (`src/app`, `src/components`, `src/context`, `src/data`, `src/hooks`).

### 5. Tolerancia a Fallos en Carga de Imágenes
- **Decisión**: El componente `AvatarMiembro` itera sobre una lista de rutas candidatas (`/img/pastel/`, `/img/arirang/`, `/img/`). Si ninguna existe o falla la carga, conmuta a una photocard conmemorativa con el nombre, número de miembro y colores del tema activo.

## Risks / Trade-offs

- **[Diferencias de zona horaria local]** → El timestamp del cumpleaños está calculado explícitamente con desfase horario de Argentina (`-03:00`), garantizando que Valentina desbloquee a medianoche exacta en su país sin importar la zona horaria del navegador.
- **[Persistencia entre sesiones]** → El uso de `useSyncExternalStore` previene discrepancias de hidratación en Server Side Rendering (SSR) mientras mantiene sincronizados todos los componentes.
