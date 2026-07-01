# Guía de Despliegue — Miens

Esta guía te ayudará a publicar tu sitio web en internet de forma **gratuita, rápida y segura**. Al ser una página web estática (HTML, CSS, JS y modelos 3D), las mejores opciones son Netlify y GitHub Pages.

---

## Opción 1: Netlify Drop (La forma más fácil y rápida, sin código)

Esta opción te permite publicar tu sitio web en menos de un minuto simplemente arrastrando y soltando la carpeta de tu proyecto.

1. Abre tu navegador y ve a [Netlify Drop](https://app.netlify.com/drop).
2. Abre el explorador de archivos de tu computadora y busca la carpeta raíz de tu proyecto (`MiensDetail`).
3. **Arrastra y suelta** toda la carpeta `MiensDetail` en la caja que dice *"Drag and drop your site folder here"*.
4. ¡Listo! Netlify subirá los archivos y te dará un enlace público temporal (por ejemplo, `https://random-name.netlify.app`).
5. **Recomendación:** Crea una cuenta gratuita en Netlify para poder cambiar el nombre del enlace (ejemplo: `https://miens.netlify.app`) y evitar que expire el sitio.

---

## Opción 2: Netlify con GitHub (Actualización automática)

Esta opción conecta Netlify con un repositorio de GitHub. Cada vez que subas cambios a GitHub, tu página web se actualizará automáticamente.

### Paso A: Subir el proyecto a GitHub
1. Crea una cuenta gratuita en [GitHub](https://github.com/) si no la tienes.
2. Descarga e instala [Git](https://git-scm.com/) y [GitHub Desktop](https://desktop.github.com/) (la forma visual más fácil).
3. En GitHub Desktop, ve a `File` -> `Add local repository` y selecciona tu carpeta `MiensDetail`.
4. Si no es un repositorio Git aún, te ofrecerá crearlo (`Create repository`). Asegúrate de que el nombre sea `MiensDetail` y presiona **Create**.
5. Haz clic en el botón **Publish repository** para subirlo a tu cuenta de GitHub (puedes elegir que sea público o privado).

### Paso B: Conectar con Netlify
1. Entra a tu panel de [Netlify](https://app.netlify.com/) e inicia sesión con tu cuenta de GitHub.
2. Haz clic en **Add new site** -> **Import an existing project**.
3. Selecciona **GitHub** como proveedor y autoriza el acceso.
4. Elige tu repositorio `MiensDetail`.
5. Deja la configuración de construcción por defecto (ya que es un sitio estático, no necesita comando de compilación).
6. Haz clic en **Deploy MiensDetail**. ¡Tu sitio ya está en línea y se actualizará cada vez que subas cambios a GitHub!

---

## Opción 3: GitHub Pages (Gratuito directamente en GitHub)

Si ya subiste tu repositorio a GitHub y quieres usar el hosting nativo de GitHub:

1. Ve a tu repositorio en [GitHub.com](https://github.com).
2. Haz clic en la pestaña **Settings** (Configuración) arriba a la derecha.
3. En el menú de la izquierda, bajo la sección *Code and automation*, haz clic en **Pages**.
4. En la sección *Build and deployment*, bajo *Source*, selecciona **Deploy from a branch**.
5. En la sección *Branch*, selecciona tu rama principal (usualmente `main` o `master`) y la carpeta `/ (root)`.
6. Haz clic en **Save** (Guardar).
7. Espera 1 o 2 minutos. Recarga la página de configuración y verás un banner arriba que dice: *"Your site is live at https://tu-usuario.github.io/MiensDetail/"*.

---

## Desarrollo y Pruebas Locales

Si deseas hacer pruebas en tu computadora antes de desplegar, puedes usar el servidor local que configuramos:

1. Abre una terminal en la carpeta del proyecto.
2. Ejecuta `npm install` (solo la primera vez) para instalar las herramientas necesarias.
3. Ejecuta `npm run dev`.
4. Abre tu navegador en la dirección que indique la consola (normalmente `http://localhost:5000` o `http://localhost:3000`).
