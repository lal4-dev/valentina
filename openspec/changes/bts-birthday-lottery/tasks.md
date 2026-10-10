# Tasks

## 1. Modelo de Datos y Configuración

- [x] 1.1 Definir interfaces de TypeScript y el array `miembrosBts.ts` con los 7 integrantes en el orden exacto (1: Yoongi, 2: Tae, 3: Jimin, 4: Namjoon, 5: Jin, 6: Hobi, 7: Jungkook), frases, pistas personalizadas y rutas de imagen.
- [x] 1.2 Configurar credenciales en `configuracionAutenticacion.ts` con contraseña `14102026` para Valentina y `admin290344` para Administrador, junto con el timestamp objetivo del cumpleaños.

## 2. Soporte Dual de Temas (Pastel vs Arirang Concierto)

- [x] 2.1 Implementar `ContextoTema` con soporte para temas `'pastel'` y `'arirang'`, persistencia en `localStorage` y atributos `data-theme`.
- [x] 2.2 Crear el botón flotante `BotonCambioTema` accesible en todas las pantallas principales.

## 3. Autenticación y Perfiles

- [x] 3.1 Crear el componente `TarjetaAutenticacion` con selector de perfil (Valentina / Admin), aclaración de formato numérico y validación reactiva.
- [x] 3.2 Implementar el contexto `ContextoAutenticacion` con persistencia en cliente y control de sesión.

## 4. Pantalla de Bloqueo y Cuenta Regresiva de Cumpleaños

- [x] 4.1 Implementar el componente `PantallaBloqueoCumple` con reloj en vivo de 4 unidades (Días, Horas, Minutos, Segundos) calculando la diferencia contra el 14/10/2026 00:00:00 (Arg UTC-3).
- [x] 4.2 Agregar avatar de Valentina con corazón reactivo (violeta en pastel, rojo en arirang) y confeti festivo.
- [x] 4.3 Diseñar el botón de inicio de regalos al finalizar el contador y soporte de prueba para forzar estado en 0.

## 5. Panel de Administración y Herramientas de Prueba

- [x] 5.1 Crear la página `/admin` protegida por clave maestra `admin290344`.
- [x] 5.2 Implementar selector de prueba de cuenta regresiva (reloj en tiempo real vs reloj en 00:00:00:00).
- [x] 5.3 Implementar botón exclusivo de reinicio del sorteo y bypass de seguridad para probar la ruleta.

## 6. Mecánica del Sorteo (Ruleta Interactiva)

- [x] 6.1 Implementar `ContextoRuleta` con rotación acumulativa `cubic-bezier` y persistencia en `localStorage`.
- [x] 6.2 Programar la regla especial de primer giro forzado en Namjoon (#4, dedicatoria de amor).
- [x] 6.3 Programar la regla especial de último giro forzado en Jungkook (#7, brindis final) y giros intermedios aleatorios (2 al 6).
- [x] 6.4 Retirar el botón de reinicio de la vista principal y reservarlo únicamente al panel de admin.

## 7. Modal de Revelación Temática y Galería de Regalos

- [x] 7.1 Crear el modal `ModalRevelacionMiembro` con confeti, foto del miembro, frases, dedicatorias y pistas afectuosas.
- [x] 7.2 Implementar la galería `SeguimientoRegalos` con las 7 tarjetas de los integrantes para inspección de regalos descubiertos.
- [x] 7.3 Implementar fallback con photocard conmemorativa en caso de ausencia de imágenes locales.

## 8. Refactorización Integral a Español y Limpieza

- [x] 8.1 Traducir todos los nombres de archivos, funciones, variables, constantes e interfaces a español, manteniendo nombres de carpetas en inglés.
- [x] 8.2 Estructurar el código con comentarios de sección numerados y documentación en español.
- [x] 8.3 Eliminar archivos duplicados en inglés garantizando cero errores en `npm run build` y `npm run lint`.
- [x] 8.4 Generar la suite canónica de especificaciones con OpenSpec (`openspec/specs/`).
