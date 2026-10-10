# Proposal

## Why

Se busca crear una experiencia digital interactiva y estética inspirada en BTS para acompañar la entrega de 7 regalos de cumpleaños para Valentina (uno por cada miembro de BTS). La aplicación ofrece una dinámica guiada, personal e íntima donde:
1. El acceso está protegido por una pantalla de bloqueo con cuenta regresiva en vivo hasta el cumpleaños oficial (14 de Octubre de 2026, 00:00:00 hs Argentina / UTC-3).
2. El ingreso de Valentina se realiza mediante su fecha de nacimiento en formato numérico (`14102026`).
3. El administrador cuenta con bypass y panel de pruebas en `/admin` con clave maestra (`admin290344`).
4. La entrega de cada regalo se devela a través de una ruleta interactiva con reglas determinísticas para el primer giro (#4 Namjoon) y el último (#7 Jungkook), manteniendo los intermedios aleatorios.
5. Se incluye soporte completo para doble temática (Pastel Gifts y Arirang Concierto Argentina) y código 100% en español.

## What Changes

- **Pantalla de bloqueo y cuenta regresiva (`birthday-lock`)**: Reloj en vivo de 4 unidades (Días, Horas, Minutos, Segundos), confeti, foto de Valentina y corazón dinámico que cambia de color según el tema activo (violeta en Pastel, rojo en Arirang).
- **Autenticación liviana (`auth-profile`)**: Perfiles predefinidos de Valentina (`14102026`) y Admin (`admin290344`), con indicación de formato DDMMAAAA y detección automática.
- **Panel de administración (`admin-panel`)**: Ruta `/admin` protegida para bypass del bloqueo cronológico, previsualización del reloj en tiempo real y en 00:00:00:00, y reinicio del sorteo.
- **Mecánica del sorteo (`gift-lottery`)**: Ruleta SVG con 7 sectores. Primer giro garantizado para Namjoon (#4), giros 2 al 6 aleatorios excluyendo el #7, y séptimo giro garantizado para Jungkook (#7). Reinicio exclusivo para Administrador.
- **Revelación de integrantes y galería (`bts-gift-reveal`)**: Fichas temáticas, frases, dedicatorias cariñosas y pistas de regalos personalizadas para cada integrante, con fallback estético y galería de seguimiento de 7 tarjetas.
- **Sistema de temas dinámico (`theme-system`)**: Alternancia instantánea entre Pastel Gifts (lavanda, violeta, rosa Borahae) y Arirang Concierto Argentina (rojo carmesí, negro mate, blanco) mediante botón flotante en todas las vistas.
- **Refactorización integral a español**: Código, variables, estados, componentes y comentarios completamente en español, conservando nombres de carpetas en inglés (`src/app`, `src/components`, `src/context`, `src/data`, `src/hooks`).

## Capabilities

### New Capabilities
- `auth-profile`: Control de acceso con perfiles predefinidos, validación por contraseña numérica (`14102026` o clave admin) y persistencia.
- `birthday-lock`: Bloqueo previo al cumpleaños (14/10/2026 00:00:00 hs Argentina), contador visual en tiempo real, efectos de confeti y corazón dinámico.
- `admin-panel`: Panel de diagnóstico en `/admin` con bypass de fecha, simulación de estados de cuenta regresiva y reinicio de ruleta.
- `gift-lottery`: Mecanismo de sorteo interactivo con ruleta, reglas especiales para primer (#4) y último (#7) giro, y persistencia local.
- `bts-gift-reveal`: Visualización multimedia por integrante, pistas afectuosas de regalos, fotos con fallback y galería de seguimiento.
- `theme-system`: Gestión reactiva bitemática (Pastel vs Arirang Concierto) con persistencia sincrónica libre de errores de hidratación.

### Modified Capabilities
<!-- No existen capacidades previas -->

## Impact

- Rutas en `src/app/` (`/` y `/admin`).
- Componentes modulares y reactivos en `src/components/`.
- Contextos globales de estado en `src/context/` (`ContextoTema`, `ContextoAutenticacion`, `ContextoRuleta`).
- Modelo de datos estructurado en `src/data/` (`configuracionAutenticacion.ts` y `miembrosBts.ts`).
- Soporte de imágenes en `public/img/` (`pastel`, `arirang`, `fotoPerfil`).
- Cero dependencias externas complejas; funcionamiento 100% autónomo y offline en el cliente.
