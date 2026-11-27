# Ordena el método científico (app de Fractalis)

Código fuente de la app. La versión compilada que sirve la web está en `static/apps/ordena-metodo-cientifico/`
y se ve, incrustada, en la página de Proyectos `content/proyectos/ordena-metodo-cientifico/`.

Funciona solo en el navegador (React + Vite): no usa Gemini ni ningún servidor, aunque la plantilla de AI Studio
incluya esas dependencias.

## Para recompilarla después de cambiar algo

Necesitas Node.js. Desde esta carpeta (`apps-codigo/ordena-metodo-cientifico/`):

```
npm install
npx vite build --base=./ --outDir ../../static/apps/ordena-metodo-cientifico --emptyOutDir
```

`--base=./` es importante: hace que la app funcione dentro de la web (en `/fractalis/apps/…` o en el dominio propio).
Después, `hugo server` para comprobarla y commit como siempre.

## Kit común

La cabecera y el pie son los comunes de las apps de Fractalis (`apps-codigo/_comun/`, ver su LEEME.md). Para recompilar, esa carpeta tiene que estar al lado de esta.
