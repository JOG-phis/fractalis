// Fractalis: sustituye al katex-render.js de Blowfish. Dibuja las fórmulas cuando KaTeX
// y, si la página la carga, la extensión mhchem (\ce{...}) están listas.
(function () {
  var katexScript = document.getElementById("katex-render");
  if (!katexScript) return;
  var render = function () { renderMathInElement(document.body); };
  katexScript.addEventListener("load", function () {
    var mhchem = document.getElementById("katex-mhchem");
    if (mhchem) mhchem.addEventListener("load", render);
    else render();
  });
})();
