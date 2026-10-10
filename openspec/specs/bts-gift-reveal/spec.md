# bts-gift-reveal Specification

## Purpose

Gestiona la presentación artística y multimedia de los 7 integrantes de BTS, sus frases célebres, dedicatorias de cumpleaños, pistas de regalos, modales de felicitación con confeti y la galería conmemorativa de seguimiento.

## Requirements

### Requirement: Mapeo de integrantes y regalos
El sistema SHALL vincular cada posición numérica del 1 al 7 a un integrante específico de BTS con sus datos biográficos y festivos:
1. Yoongi (SUGA / Agust D)
2. Taehyung (V)
3. Jimin
4. Namjoon (RM)
5. Jin
6. Hobi (j-hope)
7. Jungkook

#### Scenario: Identificación de integrante por número
- **WHEN** se extrae el número `N` en la ruleta
- **THEN** la aplicación asocia y despliega el perfil de BTS correspondiente a la posición `N`

### Requirement: Modal de revelación con celebración y confeti
El sistema SHALL abrir un modal a pantalla completa al concluir el giro de la ruleta, reproduciendo confeti festivo y presentando la foto del integrante, su frase célebre, dedicatoria afectuosa y la pista del regalo asignado.

#### Scenario: Apertura de modal tras giro exitoso
- **WHEN** la aguja de la ruleta se detiene en el integrante ganador
- **THEN** se despliega el modal temático con animación pop, confeti y botón de confirmación

### Requirement: Pistas de regalo afectuosas y temáticas
El sistema SHALL desplegar pistas afectuosas personalizadas para Valentina en la tarjeta o modal de cada integrante de BTS.

#### Scenario: Lectura de la pista del regalo
- **WHEN** el modal o tarjeta de un integrante está visible
- **THEN** la pista de regalo se presenta destacada con formato de badge y tipografía legible con el mensaje específico correspondiente al miembro

### Requirement: Tolerancia a fallos y fallback en retratos de integrantes
El sistema SHALL implementar una cascada de rutas candidatas para los archivos de imagen de cada integrante en `/img/pastel/`, `/img/arirang/` y `/img/`, mostrando una photocard conmemorativa estilizada si ninguna imagen externa se encuentra disponible.

#### Scenario: Ausencia de archivo de imagen local
- **WHEN** una ruta de imagen falla al cargar
- **THEN** el componente prueba la siguiente ruta candidata y, si todas fallan, despliega la photocard estilizada con nombre, número y colores del tema

### Requirement: Galería de seguimiento de regalos descubiertos
El sistema SHALL presentar un listado horizontal de 7 tarjetas correspondientes a los integrantes, permitiendo consultar el estado de cada regalo (bloqueado o descubierto) y reabrir sus mensajes en cualquier momento.

#### Scenario: Consulta de regalo ya desbloqueado
- **WHEN** la usuaria hace clic en una tarjeta de un integrante ya descubierto
- **THEN** se abre el modal temático con su dedicatoria y pista completa
