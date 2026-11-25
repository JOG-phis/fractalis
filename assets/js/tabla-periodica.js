/* Tabla periódica interactiva de Fractalis.
   Lee los datos que la plantilla (layouts/shortcodes/tabla-periodica.html) deja en <script class="tp-datos">
   y dibuja: barra (buscador, modo de color, imprimir), la tabla, la leyenda y la ficha del elemento elegido.
   Se puede enlazar a un elemento y a un modo:  …/tabla-periodica/?modo=en_pauling#Fe  */
(function () {
  "use strict";
  const app = document.getElementById("tabla-periodica");
  if (!app) return;
  const datos = JSON.parse(app.querySelector(".tp-datos").textContent);
  const T = datos.textos, L = datos.lang, E = datos.elementos;
  const nf = (v, d) => new Intl.NumberFormat(L === "en" ? "en-GB" : "es-ES", { maximumFractionDigits: d }).format(v);
  const sig = (v, s) => nf(Number(v.toPrecision(s)), 10);
  const quitarTildes = (s) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
  const el = (tag, attrs, html) => { const n = document.createElement(tag); if (attrs) for (const k in attrs) n.setAttribute(k, attrs[k]); if (html != null) n.innerHTML = html; return n; };
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  /* ---------- Colores ---------- */
  const PALETAS = {
    familia: { alcalinos: "#f87171", alcalinoterreos: "#fb923c", transicion: "#fbbf24", lantanidos: "#f472b6", actinidos: "#c084fc",
               "otros-metales": "#94a3b8", semimetales: "#2dd4bf", "no-metales": "#4ade80", halogenos: "#38bdf8", "gases-nobles": "#818cf8" },
    bloque: { s: "#f87171", p: "#fbbf24", d: "#38bdf8", f: "#4ade80" },
    estado: { solido: "#94a3b8", liquido: "#38bdf8", gas: "#fbbf24" },
    tipo: { metal: "#fb923c", semimetal: "#2dd4bf", "no-metal": "#4ade80" },
  };
  const NOMBRES_CAT = { familia: T.familias, bloque: T.bloques, estado: T.estados, tipo: T.tipos };
  const CONTINUOS = {
    en_pauling: { unidad: "", d: 2 },
    radio: { unidad: "pm", d: 0 },
    ei1: { unidad: "kJ/mol", d: 0 },
    densidad: { unidad: "g/cm³", d: 2, log: true },
    fusion: { unidad: "°C", d: 0, conv: (k) => k - 273.15 },
  };
  const ESCALA = ["#440154", "#3b528b", "#21918c", "#5ec962", "#fde725"]; // viridis: se lee en claro, en oscuro y con daltonismo
  const hex = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
  function colorEscala(t) {
    const p = Math.max(0, Math.min(1, t)) * (ESCALA.length - 1), i = Math.min(Math.floor(p), ESCALA.length - 2), f = p - i;
    const a = hex(ESCALA[i]), b = hex(ESCALA[i + 1]);
    const c = a.map((v, k) => Math.round(v + (b[k] - v) * f));
    const lum = (0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2]) / 255;
    return { fondo: `rgb(${c.join(",")})`, texto: lum > 0.55 ? "#0f172a" : "#ffffff" };
  }

  /* ---------- Formato de los datos ---------- */
  const config = (c) => c ? esc(c).replace(/([spdf])(\d+)/g, "$1<sup>$2</sup>") : "—";
  const temp = (k) => k == null ? null : `${nf(k - 273.15, 1)} °C (${nf(k, 1)} K)`;
  function densidad(e) {
    if (e.densidad == null) return null;
    return e.estado === "gas" ? `${sig(e.densidad * 1000, 3)} g/L` : `${sig(e.densidad, 4)} g/cm³`;
  }
  const masa = (e) => e.masa_isotopo ? `[${e.masa}] <span class="tp-nota">(${T.masa_isotopo})</span>` : nf(e.masa, 3);
  const valor = (e, modo) => { const v = e[modo]; if (v == null) return null; const c = CONTINUOS[modo]; return c.conv ? c.conv(v) : v; };

  /* Estados de oxidación dentro de la casilla (interruptor). Si el elemento tiene alguno negativo
     (no metales, semimetales, H), los negativos van en una columna a la izquierda y los positivos a la derecha,
     en filas de dos; en los metales, los positivos van centrados. (Con el interruptor no se ve el número atómico.) */
  const signo = (o) => o.replace("-", "−");
  function htmlOx(e) {
    if (!e.oxidacion.length) return `<span class="tp-oxs">—</span>`;
    const neg = e.oxidacion.filter((o) => o[0] === "-"), pos = e.oxidacion.filter((o) => o[0] !== "-");
    const col = (lista) => lista.map((o) => `<span>${signo(o)}</span>`).join("");
    if (!neg.length) return `<span class="tp-oxs">${col(pos)}</span>`;
    return `<span class="tp-oxs tp-oxs-lados"><span class="tp-ox-izq tp-neg">${col(neg)}</span><span class="tp-ox-der">${col(pos)}</span></span>`;
  }

  /* ---------- Estructura ---------- */
  const params = new URLSearchParams(location.search);
  let modo = params.get("modo") in { ...PALETAS, ...CONTINUOS } ? params.get("modo") : "familia";
  let elegido = null;

  const barra = el("div", { class: "tp-barra" });
  const buscador = el("input", { type: "search", class: "tp-buscar", placeholder: T.buscar, "aria-label": T.buscar });
  const etiqueta = el("label", { class: "tp-modo" }, `<span>${esc(T.modo)}</span>`);
  const selector = el("select");
  for (const m of [...Object.keys(PALETAS), ...Object.keys(CONTINUOS)]) selector.append(new Option(T.modos[m], m, false, m === modo));
  etiqueta.append(selector);
  // Interruptor: en cada casilla, los estados de oxidación en lugar del nombre y la masa (?ox=1 en la URL)
  const interruptor = el("label", { class: "tp-interruptor" });
  const casillaOx = el("input", { type: "checkbox", role: "switch" });
  casillaOx.checked = params.get("ox") === "1";
  interruptor.append(casillaOx, el("span", { class: "tp-pista", "aria-hidden": "true" }), el("span", null, esc(T.ver_oxidacion)));
  const imprimir = el("button", { type: "button", class: "tp-imprimir" }, `<span aria-hidden="true">⎙</span> ${esc(T.imprimir)}`);
  barra.append(buscador, etiqueta, interruptor, imprimir);

  const imprimible = el("div", { class: "tp-imprimible" });
  const tituloImpresion = el("p", { class: "tp-titulo-impresion" }, esc(T.titulo_impresion));
  imprimible.append(tituloImpresion);
  const tabla = el("div", { class: "tp-tabla", role: "group", "aria-label": T.titulo_impresion });
  const resumen = el("div", { class: "tp-resumen", "aria-live": "polite" });
  tabla.append(resumen);
  const celdas = new Map();
  for (const e of E) {
    const b = el("button", { type: "button", class: "tp-celda", "data-n": e.n, "aria-label": `${e.nombre}, ${e.s}, ${e.n}` },
      `<span class="tp-num">${e.n}</span><span class="tp-sim">${esc(e.s)}</span><span class="tp-nom">${esc(e.nombre)}</span><span class="tp-masa">${e.masa_isotopo ? "[" + e.masa + "]" : nf(e.masa, 2)}</span>` +
      htmlOx(e));
    b.style.gridColumn = e.x; b.style.gridRow = e.y;
    celdas.set(e.n, b); tabla.append(b);
  }
  for (const [fila, texto, desde] of [[6, "57–71", T.lantanidos], [7, "89–103", T.actinidos]]) {
    const h = el("div", { class: "tp-hueco", title: desde }, `<span>${texto}</span>`);
    h.style.gridColumn = 3; h.style.gridRow = fila; tabla.append(h);
  }
  const leyenda = el("div", { class: "tp-leyenda" });
  imprimible.append(tabla, leyenda, el("p", { class: "tp-pie-impresion" }, esc(T.pie_impresion)));
  const ficha = el("section", { class: "tp-ficha", "aria-live": "polite", hidden: "" });
  app.append(barra, imprimible, ficha);

  /* ---------- Pintar según el modo ---------- */
  function pintar() {
    const cont = CONTINUOS[modo];
    let min = Infinity, max = -Infinity;
    if (cont) for (const e of E) { let v = valor(e, modo); if (v == null) continue; if (cont.log) v = Math.log10(v); min = Math.min(min, v); max = Math.max(max, v); }
    for (const e of E) {
      const b = celdas.get(e.n);
      b.classList.toggle("tp-continuo", !!cont);
      if (cont) {
        let v = valor(e, modo);
        if (v == null) { b.classList.add("tp-sin"); b.style.background = ""; b.style.color = ""; continue; }
        b.classList.remove("tp-sin");
        if (cont.log) v = Math.log10(v);
        const c = colorEscala((v - min) / (max - min || 1));
        b.style.background = c.fondo; b.style.color = c.texto;
      } else {
        b.classList.remove("tp-sin"); b.style.background = ""; b.style.color = "";
        b.style.setProperty("--c", PALETAS[modo][e[modo]] || "#94a3b8");
      }
    }
    // leyenda
    if (cont) {
      const fmt = (v) => nf(cont.log ? Math.pow(10, v) : v, cont.log ? 3 : cont.d);
      leyenda.innerHTML = `<span class="tp-ley-titulo">${esc(T.modos[modo])}${cont.unidad ? " (" + cont.unidad + ")" : ""}${cont.log ? " · " + esc(T.escala_log) : ""}</span>
        <span class="tp-ley-num">${fmt(min)}</span><span class="tp-degradado" style="background:linear-gradient(90deg,${ESCALA.join(",")})"></span><span class="tp-ley-num">${fmt(max)}</span>
        <span class="tp-ley-item"><i class="tp-muestra tp-muestra-sin"></i>${esc(T.sin_datos)}</span>`;
    } else {
      leyenda.innerHTML = Object.entries(PALETAS[modo]).map(([k, c]) =>
        `<span class="tp-ley-item"><i class="tp-muestra" style="--c:${c}"></i>${esc(NOMBRES_CAT[modo][k])}</span>`).join("");
    }
    mostrarResumen(elegido);
  }

  /* ---------- Resumen (recuadro central) y ficha ---------- */
  function mostrarResumen(e) {
    if (!e) { resumen.innerHTML = `<p class="tp-instruccion">${esc(T.instruccion)}</p>`; return; }
    const cont = CONTINUOS[modo];
    let extra = "";
    if (cont) { const v = valor(e, modo); extra = `<span class="tp-res-valor">${esc(T.modos[modo])}: <b>${v == null ? esc(T.sin_datos) : nf(v, cont.d) + (cont.unidad ? " " + cont.unidad : "")}</b></span>`; }
    else extra = `<span class="tp-res-valor">${esc(NOMBRES_CAT[modo][e[modo]] || "")}</span>`;
    resumen.innerHTML = `<span class="tp-res-sim" style="--c:${PALETAS.familia[e.familia]}">${esc(e.s)}</span>
      <span class="tp-res-texto"><b class="tp-res-nombre">${e.n} · ${esc(e.nombre)}</b>
      <span>${masa(e)} u · ${config(e.config)}</span>${extra}</span>`;
  }

  function fila(clave, html) { return html == null || html === "" ? "" : `<dt>${esc(T.campos[clave])}</dt><dd>${html}</dd>`; }
  function abrirFicha(e, desplazar) {
    elegido = e;
    celdas.forEach((b) => b.classList.toggle("tp-elegido", b === celdas.get(e.n)));
    mostrarResumen(e);
    const pos = [e.grupo ? `${T.grupo} ${e.grupo}` : null, `${T.periodo} ${e.periodo}`, `${T.bloque} ${e.bloque}`].filter(Boolean).join(" · ");
    const ox = e.oxidacion.length ? e.oxidacion.map((o) => `<span class="tp-ox">${o.replace("-", "−")}</span>`).join(" ") : esc(T.ninguno);
    const basicos = fila("numero", e.n) + fila("masa", masa(e) + " u") + fila("config", config(e.config)) +
      fila("capas", e.capas ? e.capas.join(", ") : null) + fila("oxidacion", ox) + fila("familia", esc(T.familias[e.familia])) +
      fila("posicion", esc(pos)) + fila("estado", e.estado ? esc(T.estados[e.estado]) : null) + fila("tipo", esc(T.tipos[e.tipo]));
    const avanzados = fila("en_pauling", e.en_pauling != null ? nf(e.en_pauling, 2) : null) +
      fila("radio", e.radio != null ? `${nf(e.radio, 0)} pm` : null) + fila("ei1", e.ei1 != null ? `${nf(e.ei1, 1)} kJ/mol` : null) +
      fila("afinidad", e.afinidad != null ? `${nf(e.afinidad, 1)} kJ/mol` : null) + fila("densidad", densidad(e)) +
      fila("fusion", temp(e.fusion)) + fila("ebullicion", temp(e.ebullicion));
    const enlaces = e.enlaces && e.enlaces.length ? `<div class="tp-enlaces"><h3>${esc(T.en_fractalis)}</h3><ul>${e.enlaces.map((x) =>
      `<li><a href="${esc(x.u)}"><span class="tp-enl-tipo">${esc([x.c, x.k].filter(Boolean).join(" · "))}</span>${esc(x.t)}</a></li>`).join("")}</ul></div>` : "";
    ficha.innerHTML = `<div class="tp-ficha-cab">
        <span class="tp-ficha-sim" style="--c:${PALETAS.familia[e.familia]}"><small>${e.n}</small>${esc(e.s)}</span>
        <div><h2 class="tp-ficha-nombre">${esc(e.nombre)}</h2><p class="tp-ficha-sub">${esc(T.familias[e.familia])}</p></div>
        <button type="button" class="tp-cerrar" aria-label="${esc(T.cerrar)}">×</button></div>
      ${e.predicho ? `<p class="tp-aviso">${esc(T.predicho)}</p>` : ""}
      <div class="tp-ficha-cuerpo"><dl class="tp-datos-lista">${basicos}</dl>
      <div><details class="tp-avanzados"${window.innerWidth > 900 ? " open" : ""}><summary>${esc(T.mas_datos)}</summary><dl class="tp-datos-lista">${avanzados}</dl></details>${enlaces}</div></div>`;
    ficha.hidden = false;
    ficha.querySelector(".tp-cerrar").addEventListener("click", cerrarFicha);
    history.replaceState(null, "", location.pathname + location.search + "#" + e.s);
    if (desplazar) ficha.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }
  function cerrarFicha() {
    const n = elegido && elegido.n; elegido = null; ficha.hidden = true;
    celdas.forEach((b) => b.classList.remove("tp-elegido")); mostrarResumen(null);
    history.replaceState(null, "", location.pathname + location.search);
    if (n) celdas.get(n).focus();
  }

  /* ---------- Eventos ---------- */
  const porN = new Map(E.map((e) => [e.n, e]));
  tabla.addEventListener("click", (ev) => { const b = ev.target.closest(".tp-celda"); if (b) abrirFicha(porN.get(+b.dataset.n), true); });
  tabla.addEventListener("mouseover", (ev) => { const b = ev.target.closest(".tp-celda"); if (b) mostrarResumen(porN.get(+b.dataset.n)); });
  tabla.addEventListener("focusin", (ev) => { const b = ev.target.closest(".tp-celda"); if (b) mostrarResumen(porN.get(+b.dataset.n)); });
  tabla.addEventListener("mouseleave", () => mostrarResumen(elegido));
  // flechas del teclado: moverse por la tabla
  const posicion = new Map(E.map((e) => [`${e.x},${e.y}`, e]));
  tabla.addEventListener("keydown", (ev) => {
    const b = ev.target.closest(".tp-celda"); if (!b) return;
    const d = { ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1] }[ev.key]; if (!d) return;
    ev.preventDefault();
    const e = porN.get(+b.dataset.n);
    for (let paso = 1; paso < 18; paso++) {
      const x = e.x + d[0] * paso, y = e.y + d[1] * paso;
      if (x < 1 || x > 18 || y < 1 || y > 10) break;
      const s = posicion.get(`${x},${y}`); if (s) { celdas.get(s.n).focus(); break; }
    }
  });
  selector.addEventListener("change", () => {
    modo = selector.value; pintar();
    const u = new URL(location.href); if (modo === "familia") u.searchParams.delete("modo"); else u.searchParams.set("modo", modo);
    history.replaceState(null, "", u);
  });
  buscador.addEventListener("input", () => {
    const q = quitarTildes(buscador.value.trim());
    for (const e of E) {
      const ok = !q || String(e.n) === q || e.s.toLowerCase() === q || quitarTildes(e.nombre).includes(q) || quitarTildes(e.en).includes(q);
      celdas.get(e.n).classList.toggle("tp-apagado", !ok);
    }
  });
  buscador.addEventListener("keydown", (ev) => {
    if (ev.key !== "Enter") return;
    const primero = E.find((e) => !celdas.get(e.n).classList.contains("tp-apagado"));
    if (primero) { abrirFicha(primero, true); celdas.get(primero.n).focus(); }
  });
  imprimir.addEventListener("click", () => window.print());
  function verOx() {
    app.classList.toggle("tp-ver-ox", casillaOx.checked);
    tituloImpresion.textContent = casillaOx.checked ? T.titulo_impresion_ox : T.titulo_impresion;
  }
  casillaOx.addEventListener("change", () => {
    verOx();
    const u = new URL(location.href); if (casillaOx.checked) u.searchParams.set("ox", "1"); else u.searchParams.delete("ox");
    history.replaceState(null, "", u);
  });
  verOx();
  // Al imprimir: solo la tabla. Se ocultan, con display:none, todos los
  // «hermanos» de la tabla y de cada uno de sus contenedores, para que no queden huecos ni páginas en blanco.
  let modoAntes = null;
  window.addEventListener("beforeprint", () => {
    // Los modos por categorías (familias, bloques, estado, metales) se imprimen tal cual; las tendencias, con familias
    modoAntes = modo; if (CONTINUOS[modo]) { modo = "familia"; pintar(); }
    for (let n = imprimible; n && n !== document.body; n = n.parentElement) {
      n.classList.add("tp-ruta-impresion");
      for (const h of n.parentElement.children) if (h !== n) h.classList.add("tp-oculto-impresion");
    }
  });
  window.addEventListener("afterprint", () => {
    document.querySelectorAll(".tp-oculto-impresion, .tp-ruta-impresion").forEach((x) => x.classList.remove("tp-oculto-impresion", "tp-ruta-impresion"));
    if (modoAntes && modoAntes !== modo) { modo = modoAntes; pintar(); }
  });

  pintar();
  const inicial = decodeURIComponent(location.hash.slice(1));
  const e0 = E.find((e) => e.s.toLowerCase() === inicial.toLowerCase());
  if (e0) abrirFicha(e0, false);
})();
