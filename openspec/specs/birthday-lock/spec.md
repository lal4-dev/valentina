# birthday-lock Specification

## Purpose

Controla el bloqueo de la plataforma previa al cumpleaños de Valentina (14 de Octubre de 2026 a las 00:00:00 hs de Argentina, UTC-3), desplegando una pantalla de espera interactiva con cuenta regresiva en vivo, diseño festivo y confeti.

## Requirements

### Requirement: Bloqueo cronológico hasta la fecha del cumpleaños
El sistema SHALL restringir el acceso a la ruleta y al sorteo de regalos para Valentina hasta que la hora actual alcance o supere el timestamp oficial del cumpleaños (`1791946800000`, correspondiente a `2026-10-14T00:00:00-03:00`).

#### Scenario: Acceso anticipado antes de la fecha límite
- **WHEN** Valentina o un visitante sin rol de administrador ingresa a la aplicación antes del 14/10/2026 00:00:00 hs (Arg)
- **THEN** el sistema presenta la pantalla de bloqueo y oculta la ruleta de regalos

#### Scenario: Desbloqueo automático al cumplirse la hora
- **WHEN** la cuenta regresiva llega a cero en tiempo real
- **THEN** la pantalla de bloqueo habilita el botón festivo "¡Comenzar a descubrir tus regalos!" y permite la transición

### Requirement: Contador visual de 4 unidades de tiempo
El sistema SHALL mostrar un contador interactivo segmentado en cuatro tarjetas (Días, Horas, Minutos, Segundos) actualizado por segundo mediante `useSyncExternalStore`.

#### Scenario: Visualización del reloj en marcha
- **WHEN** la pantalla de bloqueo está activa
- **THEN** cada segundo se recalculan y formatean a 2 dígitos las unidades restantes hasta la medianoche de Argentina

### Requirement: Avatar conmemorativo y corazón dinámico reactivo
El sistema SHALL exhibir la foto de perfil de Valentina con un emblema de corazón en la esquina cuyo color y estilo se adaptan dinámicamente al tema activo.

#### Scenario: Emblema de corazón en Modo Pastel
- **WHEN** el tema activo es `'pastel'`
- **THEN** el emblema muestra un corazón violeta `💜` con borde y fondo en tonos lavanda

#### Scenario: Emblema de corazón en Modo Arirang
- **WHEN** el tema activo es `'arirang'`
- **THEN** el emblema muestra un corazón rojo `❤️` con borde carmesí y fondo oscuro

### Requirement: Efectos de celebración y lluvia de confeti
El sistema SHALL proporcionar interacción festiva con disparo de partículas de confeti en la pantalla de bloqueo adaptadas a la paleta del tema seleccionado.

#### Scenario: Disparo de confeti por botón o desbloqueo
- **WHEN** el usuario presiona el botón de confeti o activa el inicio tras completarse la cuenta
- **THEN** la pantalla lanza una lluvia de confeti multicolor (pasteles en modo Pastel, rojo/blanco/carmesí en modo Arirang)
