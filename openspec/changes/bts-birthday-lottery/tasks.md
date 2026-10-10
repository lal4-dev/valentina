# Tasks

## 1. Modelo de Datos y Configuración

- [ ] 1.1 Definir interfaces de TypeScript y el array `btsMembers.ts` con los 7 integrantes (RM, Jin, SUGA, j-hope, Jimin, V, Jung Kook), números del 1 al 7, frases y paleta pastel, verificando que compile limpiamente.
- [ ] 1.2 Configurar perfiles y credenciales predefinidas en `authConfig.ts` para Valentina (con fecha de nacimiento por defecto) y perfil de Administrador.

## 2. Autenticación y Selección de Perfil

- [ ] 2.1 Crear el componente de login `AuthCard` con selector visual de perfil (Valentina / Admin), campo de contraseña y estética pastel con microinteracciones.
- [ ] 2.2 Implementar el estado de autenticación con control de sesión en cliente para proteger la visualización del sorteo.

## 3. Mecánica del Sorteo (Ruleta Interactiva)

- [ ] 3.1 Implementar `LotteryContext` para controlar los números pendientes (1 al 7), números ya obtenidos y sincronización segura con `localStorage`.
- [ ] 3.2 Desarrollar el componente de Ruleta SVG animada con sectores en tonalidades pasteles, puntero superior y animación de rotación que aterriza en un número pendiente válido.
- [ ] 3.3 Diseñar el panel de control del sorteo con botón de giro, contador de regalos restantes (ej. "3 de 7 entregados") y botón de reinicio para volver a comenzar.

## 4. Revelación Temática BTS y Galería de Regalos

- [ ] 4.1 Crear el modal de revelación `MemberRevealModal` con celebración visual, retrato/avatar del integrante, frase célebre, dedicatoria de cumpleaños y pista del regalo.
- [ ] 4.2 Implementar la galería/resumen `GiftProgressTrack` con las 7 tarjetas de los integrantes para inspeccionar los regalos ya descubiertos en cualquier momento.

## 5. Integración Global, Estética y Verificación

- [ ] 5.1 Integrar la experiencia completa en `src/app/page.tsx` con fondo pastel Borahae, fuentes redondeadas, efectos glassmorphism y diseño optimizado para celular y computadora.
- [ ] 5.2 Validar el flujo de principio a fin ejecutando `npm run build` y probando el ciclo de login, 7 giros sucesivos sin repetición, visualización de fichas y reinicio.
