# gift-lottery Specification

## Purpose

Controla la dinámica lúdica del sorteo de los 7 regalos de cumpleaños a través de una ruleta interactiva SVG, aplicando reglas determinísticas para el inicio y el cierre, selección aleatoria intermedia y persistencia en almacenamiento local.

## Requirements

### Requirement: Ruleta interactiva de 7 sectores temáticos
El sistema SHALL presentar una ruleta circular SVG con 7 sectores diferenciados numerados del 1 al 7 con física de giro acumulativa y aguja superior de selección.

#### Scenario: Animación fluida de giro
- **WHEN** el usuario presiona el botón principal de giro
- **THEN** la rueda ejecuta una rotación animada de al menos 5 vueltas con desaceleración `cubic-bezier` durante 3.6 segundos hasta detenerse en el sector ganador

### Requirement: Regla especial de primer giro con Namjoon (#4)
El sistema SHALL garantizar que la primera vez que se sortee un regalo (cuando el historial de sorteados está vacío), el resultado sea estrictamente el número 4 (Namjoon / RM), correspondiente a la dedicatoria y carta de amor.

#### Scenario: Primer giro de la historia del sorteo
- **WHEN** la usuaria gira la ruleta sin regalos descubiertos previamente
- **THEN** la ruleta se detiene en el sector 4 y revela a Namjoon con su mensaje de bienvenida

### Requirement: Regla especial de último giro con Jungkook (#7)
El sistema SHALL garantizar que el séptimo y último regalo obtenido en la ruleta sea estrictamente el número 7 (Jungkook), correspondiente al brindis final de celebración.

#### Scenario: Sorteo del último regalo restante
- **WHEN** se han descubierto 6 regalos y se ejecuta el 7mo giro
- **THEN** el sorteo selecciona el número 7 y corona el cierre de la experiencia

### Requirement: Giros intermedios aleatorios con exclusión del regalo final
El sistema SHALL sortear los regalos intermedios (giros del 2 al 6) de forma aleatoria entre los números pendientes, manteniendo reservado el número 7 para que no salga antes del último giro.

#### Scenario: Giros del 2 al 6
- **WHEN** el usuario gira la ruleta habiendo extraído al menos 1 regalo y quedando más de 1 pendiente
- **THEN** el sistema selecciona al azar un número entre los restantes excluyendo el número 7

### Requirement: Descuento progresivo y no repetición de regalos
El sistema SHALL eliminar cada número sorteado de la lista de números disponibles para asegurar que cada regalo se obtenga exactamente una vez.

#### Scenario: Número ya entregado
- **WHEN** un número es revelado
- **THEN** su sector se atenúa visualmente y no vuelve a ser seleccionado en los giros posteriores

### Requirement: Persistencia del sorteo y reinicio restringido
El sistema SHALL almacenar los números ya extraídos en `localStorage` bajo `bts_valentina_drawn_numbers` y permitir reiniciar el juego únicamente desde el panel de administración.

#### Scenario: Persistencia al recargar
- **WHEN** se recarga el navegador tras haber sorteado 3 regalos
- **THEN** la ruleta conserva los 3 regalos descubiertos y solo permite sortear los 4 restantes

#### Scenario: Intento de reinicio por usuario estándar
- **WHEN** Valentina utiliza la aplicación
- **THEN** la interfaz principal no exhibe botones de reinicio para evitar borrados accidentales de su progreso
