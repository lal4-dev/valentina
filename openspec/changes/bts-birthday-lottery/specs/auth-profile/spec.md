# Spec Delta

## Purpose

Permite autenticar de forma sencilla a Valentina y al administrador para acceder a la experiencia del cumpleaños.

## ADDED Requirements

### Requirement: Perfil predefinido de Valentina
El sistema SHALL permitir el acceso a Valentina seleccionando su perfil e ingresando su fecha de cumpleaños (`14102026`) como contraseña numérica sin espacios.

#### Scenario: Inicio de sesión exitoso de Valentina
- **WHEN** Valentina selecciona su perfil e ingresa la contraseña `14102026`
- **THEN** el sistema concede acceso inmediato y redirige a la pantalla principal del sorteo

#### Scenario: Indicador de formato numérico
- **WHEN** Valentina visualiza el formulario de inicio de sesión
- **THEN** el sistema muestra una indicación clara: "Solo números sin espacios (ej: DDMMAAAA)"

#### Scenario: Contraseña incorrecta
- **WHEN** se ingresa una contraseña errónea para el perfil de Valentina
- **THEN** el sistema muestra un mensaje amigable indicando que la clave no es válida sin bloquear el intento

### Requirement: Perfil predefinido de Administrador
El sistema SHALL permitir al Administrador iniciar sesión con una clave maestra para gestionar y reiniciar el sorteo.

#### Scenario: Acceso de administrador para control
- **WHEN** el usuario selecciona el perfil Admin e ingresa la contraseña maestra
- **THEN** el sistema permite el ingreso y habilita controles adicionales de gestión y reinicio del sorteo
