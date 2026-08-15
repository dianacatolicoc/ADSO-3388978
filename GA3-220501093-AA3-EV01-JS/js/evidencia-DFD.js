/* ---------------------------------------------------------
   ENUNCIADO 1: INTERÉS BANCARIO
   
   Valor Futuro = Valor Presente * (1 + interés) ^ meses
   El interés es 2% mensual y 5 años equivalen a 60 meses.
   --------------------------------------------------------- */

const formInteres = document.getElementById("formInteres");

if (formInteres) {
  formInteres.addEventListener("submit", function (event) {
    event.preventDefault();

    const valorPresente = Number(document.getElementById("valorPresente").value);
    const interes = 0.02;
    const meses = 5 * 12;

    // Aplicación de la fórmula.
    const valorFuturo = valorPresente * Math.pow(1 + interes, meses);

    const dinero = valor => valor.toLocaleString("es-CO", {
      style: "currency",
      currency: "COP",
      maximumFractionDigits: 2
    });

    document.getElementById("resultadoInteres").innerHTML = `
      <h3>Resultado</h3>
      <p><strong>Valor consignado:</strong> ${dinero(valorPresente)}</p>
      <p><strong>Interés mensual:</strong> 2%</p>
      <p><strong>Tiempo:</strong> 5 años = 60 meses</p>
      <p><strong>Valor futuro en 5 años:</strong> ${dinero(valorFuturo)}</p>
    `;

    document.getElementById("resultadoInteres").classList.add("show");
  });
}


/* ---------------------------------------------------------
   ENUNCIADO 2: DESCUENTO DE MANZANAS
   
   1. Precio por kilo = $4.200.
   2. Se determina el porcentaje según los kilos.
   3. Se calcula valor de compra = kilos * precio.
   4. Se calcula descuento = valor compra * porcentaje.
   5. Se calcula valor a pagar = compra - descuento.
   --------------------------------------------------------- */

const formManzanas = document.getElementById("formManzanas");

if (formManzanas) {
  formManzanas.addEventListener("submit", function (event) {
    event.preventDefault();

    const kilos = Number(document.getElementById("kilos").value);
    const precioKilo = 4200;
    let porcentajeDescuento;

    // Se aplican las condiciones de la tabla.
    if (kilos <= 2) {
      porcentajeDescuento = 0;
    } else if (kilos <= 5) {
      porcentajeDescuento = 0.10;
    } else if (kilos <= 10) {
      porcentajeDescuento = 0.15;
    } else {
      porcentajeDescuento = 0.20;
    }

    const valorCompra = kilos * precioKilo;
    const valorDescuento = valorCompra * porcentajeDescuento;
    const valorPagar = valorCompra - valorDescuento;

    const dinero = valor => valor.toLocaleString("es-CO", {
      style: "currency",
      currency: "COP",
      maximumFractionDigits: 0
    });

    document.getElementById("resultadoManzanas").innerHTML = `
      <h3>Resultado</h3>
      <p>La compra de <strong>${kilos}</strong> kilos tiene un valor de
      <strong>${dinero(valorCompra)}</strong>, pero tiene un descuento por valor de
      <strong>${dinero(valorDescuento)}</strong>, por lo tanto, el valor a pagar es:
      <strong>${dinero(valorPagar)}</strong>.</p>
      <p><strong>Descuento aplicado:</strong> ${porcentajeDescuento * 100}%</p>
    `;

    document.getElementById("resultadoManzanas").classList.add("show");
  });
}


/* ---------------------------------------------------------
   ENUNCIADO 3: FUNCIÓN Y = X² - 2X
  
   1. Se recorren los valores de X desde 1 hasta 10.
   2. Se calcula Y = X² - 2X.
   3. Se acumula la suma total de Y.
   4. Si Y MOD 3 = 0, se guarda como múltiplo de 3.
   5. Si el último dígito de Y es 5, se guarda.
   --------------------------------------------------------- */

const btnFuncion = document.getElementById("btnFuncion");

if (btnFuncion) {
  btnFuncion.addEventListener("click", function () {
    let sumaTotal = 0;
    let sumaMultiplos3 = 0;
    let sumaTerminados5 = 0;

    const valores = [];
    const multiplos3 = [];
    const terminados5 = [];

    // Recorremos X desde 1 hasta 10
    for (let x = 1; x <= 10; x++) {
      // Fórmula: Y = X² - 2X.
      const y = Math.pow(x, 2) - 2 * x;

      valores.push({ x, y });
      sumaTotal += y;

      // Un número es múltiplo de 3 cuando su residuo al dividir entre 3 es 0.
      if (y % 3 === 0) {
        multiplos3.push(y);
        sumaMultiplos3 += y;
      }

      // Para positivos, y % 10 === 5 identifica valores terminados en 5.
      if (Math.abs(y) % 10 === 5) {
        terminados5.push(y);
        sumaTerminados5 += y;
      }
    }

    document.getElementById("resultadoFuncion").innerHTML = `
      <h3>Resultados</h3>

      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>X</th>
              <th>Y = X² - 2X</th>
            </tr>
          </thead>
          <tbody>
            ${valores.map(item => `
              <tr>
                <td>${item.x}</td>
                <td>${item.y}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>

      <p><strong>Suma de todos los valores de Y:</strong> ${sumaTotal}</p>

      <div class="section">
        <p><strong>Valores de Y múltiplos de 3:</strong></p>
        <div class="values">
          ${multiplos3.map(valor => `<span class="value">${valor}</span>`).join("")}
        </div>
        <p><strong>Suma de los valores múltiplos de 3:</strong> ${sumaMultiplos3}</p>
      </div>

      <div class="section">
        <p><strong>Valores de Y cuyo último dígito es 5:</strong></p>
        <div class="values">
          ${terminados5.map(valor => `<span class="value">${valor}</span>`).join("")}
        </div>
        <p><strong>Suma de los valores cuyo último dígito es 5:</strong> ${sumaTerminados5}</p>
      </div>
    `;

    document.getElementById("resultadoFuncion").classList.add("show");
  });
}
