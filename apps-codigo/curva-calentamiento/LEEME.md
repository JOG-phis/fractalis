# Curva de calentamiento

App de Fractalis hecha con el kit común (`../_comun/`): React + Vite + Tailwind v4.

- `src/fisica.ts`: el modelo. 100 g de sustancia pura y potencia constante; la energía se reparte por tramos (calentar el sólido, fundir, calentar el líquido, hervir, calentar el gas) con calores específicos y latentes aproximados reales. También están las sustancias, las potencias y los textos de «¿Qué está pasando?».
- `src/Recipiente.tsx`: recipiente cerrado con las partículas (SVG animado): red que vibra, líquido en el fondo y gas por todo el recipiente. Las partículas cambian de estado una a una.
- `src/Grafica.tsx`: gráfica temperatura-tiempo en directo, con las experiencias anteriores en gris.
- `src/App.tsx`: la página (laboratorio, controles, gráfica, explicación y sustancia misteriosa).

Para recompilar (con `node_modules` instalado: `npm install`):

```
npm run build
```

Deja la app en `static/apps/curva-calentamiento/`. La página de la web está en `content/proyectos/curva-calentamiento/`.
