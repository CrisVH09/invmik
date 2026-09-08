# Angel · Level 18 Unlocked

Invitación pública en `/`, integrada con Laravel, React e Inertia existentes. Sin dependencias nuevas, RSVP ni formularios en la invitación.

## Personalización

Editar `config/birthday.php`: `name`, `age`, `playerNumber`, `date`, `timezone`, `time`, `venue`, `address`, `reference`, `mapsUrl` e `image`.

- `date`: fecha ISO 8601 con hora y zona; por ejemplo `2026-12-12T19:00:00-06:00`. Es solo un ejemplo, no la fecha real de Angel. El contador toma este valor y actualiza cada segundo; al llegar a cero muestra GAME TIME.
- `time`: texto opcional para mostrar; si está vacío, se obtiene de `date` en `timezone`.
- Sin fecha se muestran guiones y “Fecha por confirmar”. Sin lugar se muestra “Ubicación por confirmar”.
- Con `mapsUrl` HTTP/HTTPS se habilita CÓMO LLEGAR; también se puede generar el enlace de Google Maps automáticamente con `venue` y `address`.
- Tras cambiar configuración en producción: `php artisan config:cache`.

## Imagen

Se utiliza la imagen proporcionada en `storage/app/public/capy-8.png` (el nombre real tiene “y”), copiada a `public/images/capy-8.png`. Para reemplazarla, colocar el nuevo PNG directamente en esta última ruta. No hace falta un enlace simbólico de storage. El archivo proporcionado incluye fondo; una máscara CSS suaviza sus bordes sin modificar el original. Un PNG con transparencia real también funciona.

Inicialmente se generó una alternativa mediante la herramienta integrada imagegen. Esa alternativa no es la imagen publicada: se sustituyó por la proporcionada por el usuario. Prompt utilizado: “Create a transparent-background PNG cutout asset for a premium basketball birthday website. Full body anthropomorphic capybara basketball player with realistic detailed brown fur, cool black sunglasses, black basketball jersey and shorts with hot pink trim, clearly legible number 8 on jersey, black and pink high-top sneakers, holding an orange basketball at hip on viewer's right. Confident relaxed powerful standing pose, three quarter view facing slightly left. Mature sports videogame cinematic 3D character render, NOT childish cartoon. Pink rim lighting and neutral frontal lighting, crisp detail, entire body including feet visible, isolated on truly transparent alpha background, no floor, no scenery, no extra typography. Portrait composition.”

## Estructura

- `resources/js/pages/welcome.tsx`: Navigation, Hero, GameDetails, Countdown, PlayerProfile, Location y Closing (incluye footer). Datos compartidos desde Laravel.
- `resources/css/birthday.css`: estilos aislados, responsive, animaciones CSS, entradas con IntersectionObserver y reduced motion.
- `routes/web.php`: entrega configuración a la página pública.
- `resources/views/app.blade.php`: idioma español y metadatos sociales disponibles sin JavaScript.
- `resources/js/app.tsx`: título de la invitación sin el sufijo Laravel.
- `vite.config.ts`: tipografía Barlow Condensed descargada y servida localmente por Vite, junto a Instrument Sans.
- `tests/Feature/BirthdayInvitationTest.php`: acceso público, datos y SEO inicial.
- `.env`: se corrigió APP_URL, que tenía el puerto duplicado.

## Ejecución y validación

`npm run build` genera los recursos de producción. `php artisan serve --host=127.0.0.1 --port=8188` abre la vista local en http://127.0.0.1:8188 (el puerto 8000 estaba ocupado por otro proyecto).

Comprobaciones: `npm run types:check`, `npm run check`, `php artisan test --compact`. No se pudo realizar QA visual ni comprobar consola en navegador porque no hay un navegador conectado a las herramientas de la sesión. Revisar esa parte antes de publicar. Configurar la fecha, el lugar y APP_URL con el dominio final antes de compartir.
