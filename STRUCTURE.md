# Estructura del Proyecto

## Aplicaciones

### `@spin-spot/api`

Es la app de backend del sistema. Define una interfaz para conectar las apps de usuario con la base de datos y la lógica de negocio. Los componentes del sistema se guardan en la carpeta `src`, organizados en carpetas por cada componente donde se definen tres elementos principales:

- **Servicios** (`service`): los servicios se encargan de ejecutar transacciones y operaciones CRUD a la base de datos.
- **Controladores** (`controller`): los controladores responden a peticiones específicas y se encargan de aplicar la lógica de negocio, correspondiente, modificando o retornando información a través de los servicios.
- **Enrutadores** (`route`): los enrutadores definen los endpoints y métodos [REST](https://restfulapi.net/) asociados a cada controlador.

También se definen componentes de `middleware` encargados de hacer operaciones intermedias en cada petición, tales como validación de usuarios, traducción de datos o manejo de errores.

El archivo `.env` define las variables de entorno de esta app.

### `@spin-spot/client` y `@spin-spot/admin`

Son las apps de frontend del sistema. Los elementos de la app se guardan en la carpeta `src`, principalmente en la carpeta `src/app` que usa el [App Router](https://nextjs.org/docs/app/building-your-application/routing) de Next.js para el enrutamiento automático de páginas y layouts. También se pueden definir otros elementos que no sean reutilizables en otras apps, pero preferiblemente se debe guardar lo mayor posible en los paquetes compartidos.

El archivo `.env.local` define las variables de entorno de cada app.

## Paquetes

Son librerías de componentes, funciones, tipos y objetos usados internamente en el proyecto.

Cada paquete guarda su contenido dentro de la carpeta `src`. Todos los elementos que se desean acceder externamente deben ser re-exportados desde el archivo `src/index.ts` para facilitar su uso desde las otras apps y paquetes.

### `@spin-spot/components`

En este paquete se guardan los componentes de UI usados por las apps de frontend.

Se organizan los componentes siguiendo el patrón de Atomic Design, agrupando principalmente según el tipo de componente (templates, layouts, sections, cards, etc.) y opcionalmente según su uso o tipo de dato asociado.

Se debe pensar en la reusabilidad siguiendo el patrón de composición y el principio de separación de responsabilidades. Los componentes deben aceptar las props necesarias y cumplir un único propósito. Para funcionalidades complejas, es preferible escribir distintos componentes de UI independientes y envolverlos en un componente encargado de coordinar la funcionalidad.

### `@spin-spot/services`

En este paquete se guardan las funciones usadas por el frontend para interactuar con la API. También se pueden guardar hooks, contexts y funciones lógicas usadas internamente por el frontend.

### `@spin-spot/models`

En este paquete se guardan interfaces, schemas y validadores de objetos usados repetidamente por components de frontend o entidades generadas por el backend.

### `@spin-spot/utils`

En este paquete se guardan funciones, interfaces y constantes generales que se puedan reutilizar en varios paquetes o aplicaciones, tales como transformadores de datos, formatos de fecha y hora, condicionales, etc.

## Paquetes de Configuración

### `@spin-spot/eslint-config` y `@spin-spot/typescript`

Definen las configuraciones base de ESLint y TypeScript para todas las apps y paquetes del proyecto.

### `@spin-spot/tailwindcss`

Definen la configuración base de TailwindCSS y DaisyUI para las apps frontend y el paquete de componentes. Incluye configuración del tema (paleta de colores, tamaños, etc.), plugins y otras utilidades generales.
