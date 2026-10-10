# admin-panel Specification

## Purpose

Proporciona un panel de control y pruebas en la ruta `/admin` protegido con clave maestra, permitiendo simular estados de cuenta regresiva, probar el sorteo sin restricciones cronológicas y reiniciar el progreso de regalos.

## Requirements

### Requirement: Acceso protegido a la ruta /admin
El sistema SHALL restringir las herramientas de control en la ruta `/admin` solicitando la clave maestra `admin290344` antes de desplegar el panel de administración.

#### Scenario: Acceso con clave maestra correcta
- **WHEN** se ingresa la clave `admin290344` en `/admin`
- **THEN** se desbloquean las herramientas de gestión y diagnóstico

#### Scenario: Acceso con clave incorrecta
- **WHEN** se ingresa una clave incorrecta en `/admin`
- **THEN** el sistema deniega el acceso y muestra un mensaje de advertencia

### Requirement: Bypass del bloqueo de cumpleaños
El sistema SHALL permitir al Administrador probar la experiencia completa de la ruleta y regalos en `/` o `/admin` sin verse restringido por la fecha límite del 14 de Octubre de 2026.

#### Scenario: Modo de prueba de administrador
- **WHEN** el usuario autenticado posee rol de administrador
- **THEN** la pantalla principal le muestra una barra superior de prueba y le permite interactuar libremente con la ruleta

### Requirement: Simulación del reloj de cuenta regresiva
El sistema SHALL ofrecer en el panel de administración opciones interactivas para previsualizar la pantalla de bloqueo tanto con el reloj en vivo como con el reloj en cero (`00:00:00:00`).

#### Scenario: Prueba del contador en cero
- **WHEN** el administrador presiona "Ver pantalla con contador en 0"
- **THEN** se despliega la pantalla con valores en 0 y el botón habilitado "¡Comenzar a descubrir tus regalos!"

#### Scenario: Prueba del contador en vivo
- **WHEN** el administrador presiona "Ver pantalla con contador en tiempo real"
- **THEN** se despliega la pantalla de bloqueo calculando la diferencia en tiempo real hasta la medianoche

### Requirement: Reinicio seguro del sorteo de regalos
El sistema SHALL proporcionar un botón exclusivo en `/admin` para restablecer el sorteo de regalos, limpiando el registro de `localStorage` y regresando la ruleta a su estado inicial.

#### Scenario: Confirmación de reinicio de ruleta
- **WHEN** el administrador presiona "Reiniciar Ruleta de Regalos"
- **THEN** se eliminan los regalos sorteados, la ruleta se resetea a 0 grados y se muestra una confirmación visual
