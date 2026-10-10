# Spec Delta

## Purpose

Despliega la ficha temática y estética de cada miembro de BTS asociada al regalo correspondiente y soporta cambio de tema.

## ADDED Requirements

### Requirement: Mapeo uno a uno de regalos e integrantes según preferencias
El sistema SHALL asociar cada número del 1 al 7 estrictamente con el integrante de BTS correspondiente según el orden preferido:
1. Yoongi (SUGA)
2. Tae (V)
3. Jimin
4. Namjoon (RM)
5. Jin
6. Hobi (j-hope)
7. Jungkook

#### Scenario: Revelación del integrante correspondiente
- **WHEN** se extrae el número `N` durante el sorteo
- **THEN** se muestra la tarjeta o modal celebratorio con el integrante asignado a la posición `N`

### Requirement: Soporte dual de temas visuales (Pastel vs Arirang Concierto)
El sistema SHALL permitir alternar en cualquier momento entre dos temas estéticos: Pastel Gifts (rosa, amarillo, celeste, lila) y Arirang Concierto (rojo, negro, blanco).

#### Scenario: Cambio dinámico de tema
- **WHEN** el usuario presiona el botón flotante de cambio de tema
- **THEN** la interfaz completa actualiza sus estilos, paleta de colores y variantes de tarjetas visuales inmediatamente sin reiniciar el sorteo

### Requirement: Visualización multimedia por integrante
El sistema SHALL presentar para cada integrante su imagen/PNG, frase distintiva, dedicatoria de cumpleaños y pista del regalo con diseño responsive.

#### Scenario: Visualización de tarjeta temática
- **WHEN** se abre la ficha del integrante sorteado
- **THEN** la interfaz despliega los elementos visuales adaptados a la paleta activa (Pastel o Arirang) con mensaje afectuoso

### Requirement: Galería de regalos descubiertos
El sistema SHALL mostrar un panel resumen donde Valentina pueda revisar las tarjetas de los integrantes ya sorteados en cualquier momento.

#### Scenario: Consulta de regalos ya descubiertos
- **WHEN** la usuaria hace clic en un integrante ya sorteado de la galería
- **THEN** se vuelve a desplegar su tarjeta con el contenido y mensaje correspondiente
