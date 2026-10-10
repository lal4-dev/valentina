# Proposal

## Why

Se busca crear una experiencia digital interactiva y estética inspirada en BTS para acompañar la entrega de 7 regalos de cumpleaños para Valentina (uno por cada miembro de BTS). La aplicación ofrecerá una dinámica guiada, personal e íntima donde el ingreso se realiza mediante una contraseña significativa (su fecha de nacimiento) y la entrega de cada regalo se devela a través de un sorteo interactivo visual en tonos pasteles.

## What Changes

- Implementar un sistema de autenticación liviano con perfiles preconfigurados (Valentina como homenajeada y Admin para control/reinicio).
- Diseñar un módulo de sorteo interactivo (ruleta o bolillero visual animado) con números del 1 al 7.
- Descontar progresivamente los números sorteados garantizando que cada regalo se descubra exactamente una vez.
- Crear fichas interactivas y modales temáticos de revelación 1 a 1 entre cada número y un integrante de BTS (con foto, frase inspiradora, mensaje de cariño y detalles del regalo).
- Establecer una paleta de diseño pastel (lila/morado Borahae, rosa pastel, azul cielo, menta y crema) con microanimaciones suaves y diseño responsive.

## Capabilities

### New Capabilities
- `auth-profile`: Control de acceso con perfiles predefinidos y validación por contraseña (fecha de cumpleaños o clave admin).
- `gift-lottery`: Mecanismo de sorteo aleatorio (1-7), control de números ya extraídos, historial y persistencia local de la sesión.
- `bts-gift-reveal`: Visualización multimedia y artística de la revelación por integrante de BTS con estética pastel, citas y mensajes personalizados.

### Modified Capabilities
<!-- No existen capacidades previas -->

## Impact

- Nuevas rutas y componentes en `src/app/` y `src/components/`.
- Estado local (localStorage / React context) para conservar el progreso de los regalos sorteados.
- Assets multimedia temáticos en `public/`.
