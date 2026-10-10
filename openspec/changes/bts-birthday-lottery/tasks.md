# Tasks

## 1. Modelo de Datos y Configuración

- [ ] 1.1 Definir interfaces de TypeScript y el array `btsMembers.ts` con los 7 integrantes en el orden exacto (1: Yoongi, 2: Tae, 3: Jimin, 4: Namjoon, 5: Jin, 6: Hobi, 7: Jungkook), frases, pistas de regalo y soporte de imágenes en `/members/*.png`.
- [ ] 1.2 Configurar credenciales predefinidas en `authConfig.ts` con contraseña `14102026` para Valentina y contraseña maestra para Admin.

## 2. Soporte Dual de Temas (Pastel vs Arirang Concierto)

- [ ] 2.1 Implementar `ThemeContext` con soporte para temas `'pastel'` y `'arirang'`, persistencia en `localStorage` y clases de estilo asociadas.
- [ ] 2.2 Crear el botón flotante `ThemeToggleFAB` accesible en todo momento para alternar rápidamente entre ambos modos.

## 3. Autenticación y Selección de Perfil

- [ ] 3.1 Crear el componente `AuthCard` con selector de perfil (Valentina / Admin), campo de contraseña con la aclaración explícita "Solo números sin espacios (ej: DDMMAAAA)" y validación reactiva.
- [ ] 3.2 Implementar el estado de autenticación (`AuthContext`) protegiendo el acceso al sorteo.

## 4. Mecánica del Sorteo (Ruleta Interactiva)

- [ ] 4.1 Implementar `LotteryContext` para controlar los números pendientes (1 al 7), historial de extraídos y sincronización con `localStorage`.
- [ ] 4.2 Desarrollar el componente de Ruleta SVG animada con sectores temáticos, puntero de extracción y física de rotación fluida con `cubic-bezier`.
- [ ] 4.3 Diseñar el panel de control del sorteo con botón de giro, contador de regalos descubiertos (ej: "3 de 7") y opción de reinicio.

## 5. Modal de Revelación Temática y Galería de Regalos

- [ ] 5.1 Crear el modal `MemberRevealModal` con confeti/destellos, retrato o avatar fallback del integrante, frase célebre, dedicatoria afectuosa y pista del regalo, adaptando su diseño al tema activo (Pastel o Arirang).
- [ ] 5.2 Implementar la galería `GiftProgressTrack` con las 7 tarjetas de los integrantes para volver a inspeccionar los regalos ya descubiertos.

## 6. Integración Global y Verificación

- [ ] 6.1 Integrar toda la experiencia en `src/app/page.tsx` garantizando total coherencia estética, diseño responsive móvil/desktop y transiciones suaves.
- [ ] 6.2 Probar con `npm run build` y validar el flujo completo: autenticación con `14102026`, cambio de tema en vivo con el botón flotante, 7 giros de ruleta sin repeticiones y reinicio.
