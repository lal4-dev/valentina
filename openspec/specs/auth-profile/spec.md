# auth-profile Specification

## Purpose

Define el mecanismo de autenticación liviana en cliente para Valentina y el Administrador, permitiendo controlar el acceso a la experiencia de cumpleaños y asegurar la persistencia de la sesión en el navegador.

## Requirements

### Requirement: Perfil predefinido de Valentina
El sistema SHALL permitir el acceso de Valentina seleccionando su perfil e ingresando su fecha de cumpleaños (`14102026`) como contraseña numérica en formato DDMMAAAA sin espacios.

#### Scenario: Inicio de sesión exitoso de Valentina
- **WHEN** Valentina selecciona su perfil e ingresa la clave `14102026`
- **THEN** el sistema valida las credenciales, persiste su sesión en `localStorage` y concede acceso a la experiencia

#### Scenario: Indicador de formato numérico de clave
- **WHEN** el usuario visualiza el campo de contraseña para el perfil de Valentina
- **THEN** la interfaz muestra una pista explícita: "Solo números sin espacios (ej: DDMMAAAA)"

#### Scenario: Clave incorrecta
- **WHEN** se ingresa una contraseña errónea para el perfil de Valentina
- **THEN** el sistema muestra un mensaje de error amigable indicando la discrepancia sin bloquear intentos subsiguientes

### Requirement: Perfil predefinido de Administrador
El sistema SHALL permitir al Administrador iniciar sesión mediante la clave maestra `admin290344` tanto desde el selector de perfil como por detección automática en el formulario.

#### Scenario: Inicio de sesión con clave maestra
- **WHEN** el usuario ingresa la clave `admin290344`
- **THEN** el sistema concede rol de administrador y habilita herramientas de control y reinicio

### Requirement: Persistencia y sincronización de sesión
El sistema SHALL persistir la identidad del usuario autenticado en `localStorage` bajo la clave `bts_valentina_auth_user` y sincronizarla en tiempo real entre componentes utilizando `useSyncExternalStore`.

#### Scenario: Recarga de la página manteniendo sesión
- **WHEN** el usuario recarga la página o abre una nueva pestaña
- **THEN** la sesión activa se restaura de forma instantánea sin parpadeos ni discrepancias de hidratación en SSR

### Requirement: Cierre de sesión
El sistema SHALL permitir cerrar la sesión activa eliminando las credenciales guardadas y devolviendo la interfaz al formulario de acceso.

#### Scenario: Usuario presiona cerrar sesión
- **WHEN** el usuario confirma la acción de cerrar sesión
- **THEN** se elimina el registro en `localStorage`, se resetea el estado global y se despliega la pantalla de login
