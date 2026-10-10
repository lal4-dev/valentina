# Spec Delta

## Purpose

Despliega la ficha temática y estética de cada miembro de BTS asociada al regalo correspondiente.

## ADDED Requirements

### Requirement: Mapeo uno a uno de regalos e integrantes
El sistema SHALL asociar cada número del 1 al 7 con un integrante específico de BTS (RM, Jin, SUGA, j-hope, Jimin, V y Jung Kook).

#### Scenario: Revelación del integrante correspondiente
- **WHEN** se extrae un número durante el sorteo
- **THEN** se muestra la tarjeta o modal celebratorio con el integrante de BTS vinculado a ese número

### Requirement: Contenido multimedia y estético por integrante
El sistema SHALL presentar para cada integrante una imagen o ilustración, su frase o lema distintivo, y un mensaje personalizado de cumpleaños en una paleta pastel.

#### Scenario: Visualización de tarjeta temática
- **WHEN** se abre la ficha del integrante sorteado
- **THEN** la interfaz despliega los elementos visuales en tonos pasteles (lila Borahae, menta, rosa suave, crema) junto a un mensaje afectuoso para Valentina

### Requirement: Galería o resumen de regalos descubiertos
El sistema SHALL mostrar un panel resumen donde Valentina pueda revisar las tarjetas de los integrantes ya sorteados en cualquier momento.

#### Scenario: Consulta de regalos ya descubiertos
- **WHEN** la usuaria hace clic en un integrante ya sorteado de la lista o galería
- **THEN** se vuelve a desplegar su tarjeta con el contenido y mensaje correspondiente
