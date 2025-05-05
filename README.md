# Tripleten web_project_around

Este proyecto es una aplicación web que simula una red social visual enfocada en fotografía. Permite a los usuarios interactuar con imágenes mediante tarjetas, editar su información personal y actualizar su avatar, todo implementado con principios sólidos de POO y arquitectura escalable en módulos de ES6.

### Funcionalidades principales

• Edición de perfil: Cambia dinámicamente nombre y profesión.
• Actualización de avatar: Permite cambiar la imagen de perfil del usuario.
• Gestión de tarjetas: Añadir, dar like o eliminar fotos. Cada tarjeta está conectada a un backend simulado mediante fetch.
• Visualización modal de imágenes: Amplía cualquier imagen en un modal estilizado.
• Eliminación con confirmación: Popup de confirmación antes de borrar una tarjeta.
• Validación de formularios: Implementación personalizada con retroalimentación en tiempo real.
• Efecto de opacidad: Foco visual durante interacción con popups.
• Carga de datos desde API: Datos iniciales de perfil y tarjetas se cargan desde una API REST simulada.

### Validación de Formularios

• Validación en tiempo real usando JavaScript nativo.

• Muestra errores dinámicos según la entrada del usuario.

• Reutilizable en múltiples formularios del proyecto.

• Mejora la accesibilidad y experiencia de usuario.

### Arquitectura en JavaScript basada en clases

- Card: Representa una tarjeta con imagen, título y botones de interacción.
- Section: Renderiza y administra listas de elementos.
- Popup: Control base para abrir/cerrar popups de tipo <dialog>.
- PopupWithImage: Extiende Popup, muestra imágenes ampliadas.
- PopupWithForm: Extiende Popup, gestiona formularios y sus valores.
- PopupWithConfirmation: Extiende Popup, controla lógica de confirmación.
- UserInfo: Administra la información del usuario (nombre, profesión, avatar).
- FormValidator: Clase independiente que valida inputs según configuración.

Todo el código está organizado en módulos ES6 (import/export), asegurando:
○ Reutilización clara y mantenible.
○ Separación de responsabilidades.
○ Escalabilidad para añadir nuevas funcionalidades.

### Tecnologías y Técnicas Utilizadas

En este proyecto se utilizaron las siguientes tecnologías y técnicas:

- **HTML5**: Estructura semántica del contenido.
- **CSS3**:
  ◘ Flexbox & Grid para diseño responsivo.
  ◘ Efectos visuales con box-shadow, :hover, linear-gradient.
  ◘ Media queries para múltiples dispositivos.

- **JavaScript**:
- Clases, arrow functions, módulos, fetch API.
- dialog HTML5 para ventanas emergentes.

- **Git & GitHub**: Control de versiones, deploy en GitHub Pages.

Página de Github Pages: https://mafturner.github.io/web_project_around/
