# Spec Delta

## Purpose

Gestiona la mecánica de sorteo de números del 1 al 7 con reducción progresiva y animación estética.

## ADDED Requirements

### Requirement: Mecánica interactiva del sorteo
El sistema SHALL presentar un mecanismo visual interactivo (ruleta o bolillero animado) para extraer un número disponible del 1 al 7.

#### Scenario: Giro y extracción de número
- **WHEN** la usuaria activa el sorteo presionando el botón principal
- **THEN** el sistema ejecuta una animación visual fluida y selecciona de forma aleatoria un número disponible entre los pendientes

### Requirement: Descuento y eliminación de números sorteados
El sistema SHALL descontar el número seleccionado del conjunto disponible para que ningún regalo se sortee más de una vez.

#### Scenario: Número agotado tras ser seleccionado
- **WHEN** un número es revelado exitosamente
- **THEN** dicho número queda marcado como entregado y se inhabilita para futuros giros

### Requirement: Persistencia del avance
El sistema SHALL conservar en el almacenamiento local el estado de los números ya revelados para evitar pérdidas al recargar la página.

#### Scenario: Recarga de página con regalos pendientes
- **WHEN** el usuario recarga o regresa a la aplicación tras haber sorteado algunos regalos
- **THEN** el sistema recupera el estado conservando los regalos ya descubiertos y la lista de números restantes

### Requirement: Reinicio del sorteo
El sistema SHALL permitir restablecer los 7 regalos al estado inicial cuando el usuario lo solicite (o desde el perfil Admin).

#### Scenario: Restablecimiento completo
- **WHEN** se confirma la acción de reiniciar el sorteo
- **THEN** los 7 números vuelven a estar disponibles y el historial de revelaciones se limpia
