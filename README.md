# Tripleten web_project_around

Proyecto 10 - Introducción a la programación orientada a objetos.

Este proyecto consiste en el desarrollo de una red social diseñada específicamente para fotógrafos. Su objetivo principal es proporcionar una plataforma donde los usuarios puedan compartir imágenes, editar su perfil, interactuar con otros fotógrafos y expresar apreciación mediante la funcionalidad de “me gusta”.

### Funcionalidades principales

• Edición de perfil: Los usuarios pueden actualizar su nombre y descripción personal mediante un formulario modal.

• Gestión de tarjetas: Cada tarjeta representa una fotografía. Se pueden agregar nuevas, eliminar o dar "me gusta".

• Actualización en tiempo real: Los cambios realizados en el perfil se reflejan dinámicamente sin necesidad de recargar la página.

• Validación de formularios: Se valida cada entrada del usuario para asegurar datos correctos antes del envío.

### Validación de Formularios

La validación se implementa utilizando JavaScript puro y actúa en tiempo real mientras el usuario interactúa con los campos.
Características:

- Verificación de longitud mínima, campos obligatorios y formato.

- Mensajes de error dinámicos.

- Retroalimentación visual inmediata.

- Adaptabilidad a distintos formularios del sitio.

- Este enfoque mejora notablemente la experiencia del usuario al garantizar precisión y completitud en los datos enviados.

### Arquitectura en JavaScript

El código está estructurado utilizando módulos ES6, permitiendo:
○ Reutilización de funciones y clases.
○ Separación de responsabilidades.
○ Mantenibilidad y escalabilidad del código.
○ Importación/exportación entre componentes de forma limpia y clara.

Cada módulo se encarga de una función específica, como manejo del DOM, gestión de tarjetas, interacción con la API o validación de formularios.

### Tecnologías y Técnicas Utilizadas

En este proyecto se utilizaron las siguientes tecnologías y técnicas:

- **HTML5**: Estructura semántica del contenido.
- **CSS3**: Estilizado y maquetación visual.
  • Flexbox y Grid Layout para diseño responsivo.
  • object-fit: cover para control de imágenes.
  • box-shadow y linear-gradient para efectos visuales.
  •:hover para mejorar interactividad.
  • media queries para adaptabilidad en múltiples resoluciones.
- **JavaScript**: Interactividad y lógica.
- **Git**: Control de versiones y colaboración en equipo.

Página de Github Pages: https://mafturner.github.io/web_project_around/
