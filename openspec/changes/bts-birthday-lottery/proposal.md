# Proposal

## Why

Se busca crear una experiencia digital interactiva y estética inspirada en BTS para acompañar la entrega de 7 regalos de cumpleaños para Valentina (uno por cada miembro de BTS). La aplicación ofrecerá una dinámica guiada, personal e íntima donde el ingreso se realiza mediante una contraseña significativa (su fecha de nacimiento en formato numérico `14102026`) y la entrega de cada regalo se devela a través de un sorteo interactivo visual con soporte para doble temática (Pastel Gifts y Arirang Concierto Argentina).

## What Changes

- Implementar autenticación liviana con perfiles preconfigurados (Valentina con contraseña `14102026` y Admin para control/reinicio), incluyendo aclaración visual de formato numérico sin espacios.
- Diseñar un módulo de sorteo interactivo (ruleta estética animada) con números del 1 al 7.
- Establecer el orden de integrantes según las preferencias de Valentina:
  1. Yoongi (SUGA)
  2. Tae (V)
  3. Jimin
  4. Namjoon (RM)
  5. Jin
  6. Hobi (j-hope)
  7. Jungkook
- Descontar progresivamente los números sorteados garantizando que cada regalo se descubra exactamente una vez.
- Crear fichas interactivas y modales temáticos de revelación 1 a 1 entre cada número y el integrante de BTS (con foto PNG, frase, dedicatoria y detalles del regalo).
- Implementar un selector de temática con botón flotante accesible en todo momento para alternar entre:
  - **Pastel Gifts**: Rosa pastel, amarillo pastel, celeste, menta y lila Borahae.
  - **Arirang Concierto Argentina**: Rojo, negro mate y blanco de alto impacto.

## Capabilities

### New Capabilities
- `auth-profile`: Control de acceso con perfiles predefinidos y validación por contraseña numérica (`14102026` o clave admin).
- `gift-lottery`: Mecanismo de sorteo aleatorio (1-7), control de números ya extraídos, historial y persistencia local de la sesión.
- `bts-gift-reveal`: Visualización multimedia y artística de la revelación por integrante de BTS con soporte dual de temas visuales (Pastel vs Arirang Concierto) y galería de regalos.

### Modified Capabilities
<!-- No existen capacidades previas -->

## Impact

- Nuevas rutas y componentes en `src/app/` y `src/components/`.
- Soporte de temas CSS dinámicos (Pastel y Arirang).
- Estado local (localStorage / React context) para conservar el progreso de los regalos sorteados y el tema activo.
- Soporte para PNGs de los integrantes en `public/members/`.
