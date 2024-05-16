# Instrucciones de Uso

## Setup

1. Clonar el repositorio.
2. Ejecutar `npm install` en la carpeta clonada.
3. Configurar las variables de entorno en los siguientes archivos:
   - `apps/api/.env`
   - `apps/client/.env.local`
   - `apps/admin/.env.local`

## Desarrollo

- Para iniciar todas las apps, ejecutar `npm run dev`.
- Para iniciar una sola app, ejecutar `npm run dev -- --filter=@spin-spot/xyz`.
- Para instalar una nueva dependencia en una app o paquete, ejecutar `npm install -w @spin-spot/xyz nueva-dependencia`. Agregar el flag `-D` si es una dependencia de desarrollo (herramientas que no se reflejan en la app compilada).

## Colaboración

- Antes de hacer commit, ejecutar `npm run format` para formatear el código y `npm run lint` para revisar identificar errores.
- Usar conventional commits con mensajes descriptivos: [https://www.conventionalcommits.org/](https://www.conventionalcommits.org/).
- Antes de abrir un pull request, ejecutar `git pull` y `git pull origin development` para combinar los cambios remotos de la rama actual y de la rama development.
- Abrir un Pull Request al terminar una tarea en un estado estable, indicando la tarea que se terminó y un resumen de las nuevas funcionalidades o cambios realizados.
