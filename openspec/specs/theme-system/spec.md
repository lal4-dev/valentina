# theme-system Specification

## Purpose

Define el sistema de diseño visual dinámico y bitemático de la aplicación, permitiendo alternar instantáneamente entre la estética delicada Pastel Gifts y la estética enérgica Arirang Concierto Argentina con persistencia local.

## Requirements

### Requirement: Soporte dual de temas visuales
El sistema SHALL admitir dos modos temáticos globales:
1. **Modo Pastel Gifts (`pastel`)**: Paleta Borahae basada en lavanda, violeta, rosa suave, amarillo y blanco perlado.
2. **Modo Arirang Concierto Argentina (`arirang`)**: Paleta basada en rojo carmesí, negro azabache, acentos rubí y blanco puro.

#### Scenario: Activación de modo Pastel
- **WHEN** el tema activo es `'pastel'`
- **THEN** la raíz del documento recibe el atributo `data-theme="pastel"` y aplica clases `theme-pastel` con fondos suaves y textos púrpura

#### Scenario: Activación de modo Arirang
- **WHEN** el tema activo es `'arirang'`
- **THEN** la raíz del documento recibe el atributo `data-theme="arirang"` y aplica clases `theme-arirang` con fondos oscuros y contrastes en rojo fuego

### Requirement: Botón flotante de alternancia de tema
El sistema SHALL proporcionar un componente de botón interactivo (`BotonCambioTema`) visible en todas las pantallas principales (bloqueo, inicio, panel de administración) para alternar el tema con un solo clic.

#### Scenario: Clic en el botón de alternancia
- **WHEN** el usuario presiona el botón de cambio de tema
- **THEN** el tema cambia inmediatamente de pastel a arirang o viceversa, actualizando iconos, bordes, avatares y modales en tiempo real

### Requirement: Persistencia local y reactividad entre componentes
El sistema SHALL almacenar la preferencia de tema en `localStorage` bajo `bts_valentina_theme` y mantenerla sincronizada entre componentes y pestañas del navegador mediante `useSyncExternalStore`.

#### Scenario: Persistencia entre visitas
- **WHEN** el usuario configura el tema en modo Arirang y recarga la página
- **THEN** la interfaz se inicializa inmediatamente en modo Arirang sin parpadeos visuales
