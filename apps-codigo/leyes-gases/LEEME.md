# Leyes de los gases

App de Fractalis hecha directamente con el kit común (`../_comun/`): React + Vite + Tailwind v4.

- `src/fisica.ts`: el modelo (gas ideal con P·V/T constante; referencia 1 atm, 2 L, 300 K), los textos de cada ley y los colores de las magnitudes (presión violeta, volumen turquesa, temperatura oro).
- `src/Recipiente.tsx`: recipiente con émbolo y partículas animadas (SVG). Los choques dejan un destello.
- `src/Instrumentos.tsx`: manómetro y termómetro.
- `src/Formula.tsx`: la ley con letras que cambian de tamaño y las cuentas.
- `src/Grafica.tsx`: gráfica en directo con las medidas anotadas.
- `src/App.tsx`: la página (elección de ley, laboratorio, ley, gráfica y tabla).

Para recompilar (con `node_modules` instalado: `npm install`):

```
npm run build
```

Deja la app en `static/apps/leyes-gases/`. La página de la web está en `content/proyectos/leyes-gases/`.
