# 🎂 Valentina BTS Birthday Experience ✨

Una aplicación web interactiva, moderna y personalizada creada como regalo de cumpleaños especial para **Valentina**, inspirada en los 7 integrantes de **BTS** (Bangtan Sonyeondan).

La experiencia guía a Valentina a través de una pantalla de bloqueo con cuenta regresiva oficial, autenticación íntima con su fecha de cumpleaños y una ruleta de sorteo interactiva para descubrir sus 7 regalos especiales, con soporte bitemático (**Modo Pastel Gifts** y **Modo Arirang Concierto Argentina**).

---

## 🧭 Especificaciones y Documentación OpenSpec

Este proyecto está completamente especificado y gobernado bajo el estándar **OpenSpec** en el directorio [`openspec/`](openspec/).

### 📦 Especificaciones Canónicas (`openspec/specs/`)

| Capacidad | Descripción | Archivo |
| :--- | :--- | :--- |
| **`birthday-lock`** | Bloqueo temporal hasta el 14/10/2026 00:00 hs (Arg UTC-3), reloj de 4 segmentos (Días/Horas/Min/Seg), confeti y avatar de Valentina con corazón reactivo. | [`openspec/specs/birthday-lock/spec.md`](openspec/specs/birthday-lock/spec.md) |
| **`auth-profile`** | Autenticación con perfiles predefinidos de Valentina (`14102026`) y Admin (`admin290344`), validación numérica e hidratación sincrónica. | [`openspec/specs/auth-profile/spec.md`](openspec/specs/auth-profile/spec.md) |
| **`gift-lottery`** | Ruleta interactiva SVG de 7 sectores. **Regla de 1er giro:** Namjoon (#4, carta de amor). **Regla de último giro:** Jungkook (#7, brindis final). Giros intermedios (2-6) aleatorios. Persistencia en `localStorage`. | [`openspec/specs/gift-lottery/spec.md`](openspec/specs/gift-lottery/spec.md) |
| **`bts-gift-reveal`** | Fichas de integrantes (1: Yoongi, 2: Taehyung, 3: Jimin, 4: Namjoon, 5: Jin, 6: Hobi, 7: Jungkook), frases célebres, dedicatorias, pistas redactadas y galería de regalos. | [`openspec/specs/bts-gift-reveal/spec.md`](openspec/specs/bts-gift-reveal/spec.md) |
| **`theme-system`** | Alternancia global entre **Pastel Gifts** (lavanda, Borahae, rosa) y **Arirang Concierto** (rojo carmesí, negro mate, blanco) con botón flotante reactivo. | [`openspec/specs/theme-system/spec.md`](openspec/specs/theme-system/spec.md) |
| **`admin-panel`** | Panel `/admin` con clave maestra `admin290344`, bypass de fecha, simulación del contador en tiempo real o en cero (`00:00:00:00`) y reinicio exclusivo de la ruleta. | [`openspec/specs/admin-panel/spec.md`](openspec/specs/admin-panel/spec.md) |

---

## 🎨 Modos Visuales y Temas

1. **Modo Pastel Gifts (`pastel`)**:
   - Inspirado en la estética suave y romántica del concepto *Borahae* (I Purple You).
   - Paleta: Lavanda suave, púrpura pastel, rosa tierno, acentos dorados y blanco marfil.
2. **Modo Arirang Concierto Argentina (`arirang`)**:
   - Inspirado en la energía escénica de BTS y los conciertos en vivo.
   - Paleta: Rojo carmesí fuego, negro carbón mate, blanco puro de alto contraste y acentos rubí.
   - Corazón del avatar en color rojo brillante.

---

## 🎁 Integrantes y Orden de Regalos de BTS

| # | Miembro | Rol | Frase / Concepto | Regalo y Pista |
| :---: | :--- | :--- | :--- | :--- |
| **1** | **Yoongi (SUGA)** | Rapero y Productor | *"In the end, we will always win"* | Para declarar la paz mundial dentro de la casa y que nadie pelee por la señal |
| **2** | **Taehyung (V)** | Vocalista y Visual | *"Borahae: confiaré en ti y te amaré por siempre"* | Para que nunca te apagues, incluso bajo el sol esperando el momento más esperado |
| **3** | **Jimin** | Vocalista Principal | *"Prometeme que siempre vas a recordar lo valiosa que sos"* | Secate las lágrimas… la música nunca se fue, solo esperaba volver a tus oídos |
| **4** | **Namjoon (RM)** | Líder y Poeta *(1° Giro)* | *"El amor verdadero se elige todos los días"* | Carta y palabras sinceras nacidas desde el corazón |
| **5** | **Jin** | Worldwide Handsome | *"La vida es más linda cuando nos reímos juntos"* | Para que juegues más y tu escritorio tenga un upgrade suave de comodidad |
| **6** | **Hobi (j-hope)** | Bailarín y Esperanza | *"Tu luz y tu energía hacen que cualquier día valga la pena"* | Flores eternas que nunca se marchitan para acompañar tus recuerdos |
| **7** | **Jungkook** | Golden Maknae *(7° Giro)* | *"Disfrutá la vida al máximo y brindemos por lo lindo"* | El toque final para brindar y celebrar la vida como se debe |

---

## 🚀 Puesta en Marcha

### Requisitos
- Node.js 18+ o superior
- npm, pnpm o yarn

### Instalación y Ejecución
```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Compilar para producción
npm run build

# Validar estándares y tipos
npm run lint

# Validar especificaciones con OpenSpec CLI
openspec validate --all
```

---

## 🔐 Credenciales y Accesos

- **Valentina**:
  - URL: `/`
  - Clave: `14102026` *(Fecha de cumpleaños en formato numérico DDMMAAAA)*
- **Administrador (Control y Pruebas)**:
  - URL directa: `/admin`
  - Clave maestra: `admin290344`
  - Funciones: Bypass de fecha de cumpleaños, simulación del contador en cero, prueba directa de la ruleta y reinicio del sorteo.

---

*Hecho con todo el amor del mundo para Valentina en su cumpleaños. Borahae! 💜*
