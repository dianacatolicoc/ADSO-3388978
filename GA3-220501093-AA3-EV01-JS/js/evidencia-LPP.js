/* ---------------------------------------------------------
   ENUNCIADO 1: SALARIO NETO

   1. Se reciben los datos del empleado.
   2. Se calcula el sueldo proporcional a los días laborados.
   3. Se verifica si tiene derecho al auxilio de transporte.
   4. Se calcula la comisión del 2% sobre las ventas.
   5. Se calcula el total devengado.
   6. Se descuentan los préstamos para obtener el salario neto.
   --------------------------------------------------------- */

const formSalario = document.getElementById("formSalario");

if (formSalario) {
  formSalario.addEventListener("submit", function (event) {
    event.preventDefault();

    const cedula = document.getElementById("cedula").value.trim();
    const nombre = document.getElementById("nombre").value.trim();
    const salario = Number(document.getElementById("salario").value);
    const dias = Number(document.getElementById("dias").value);
    const ventas = Number(document.getElementById("ventas").value);
    const prestamos = Number(document.getElementById("prestamos").value);
    const error = document.getElementById("errorSalario");

    error.textContent = "";

    if (dias < 1 || dias > 30) {
      error.textContent = "Los días laborados deben estar entre 1 y 30.";
      return;
    }

    // Datos de referencia
    const smlv = 737717;
    const auxilioMensual = 83140;

    // Fórmula: salario básico * días laborados / 30.
    const sueldoDevengado = salario * dias / 30;

    // Tiene derecho al auxilio si gana hasta 2 salarios mínimos.
    const auxilio = salario <= (smlv * 2)
      ? auxilioMensual * dias / 30
      : 0;

    // Comisión establecida por la empresa: 2% de las ventas.
    const comision = ventas * 0.02;

    // Total devengado = sueldo + auxilio + comisión.
    const totalDevengado = sueldoDevengado + auxilio + comision;

    // Salario neto = total devengado - préstamos.
    const salarioNeto = totalDevengado - prestamos;

    const dinero = valor => valor.toLocaleString("es-CO", {
      style: "currency",
      currency: "COP",
      maximumFractionDigits: 0
    });

    document.getElementById("resultadoSalario").innerHTML = `
      <h3>Resultado</h3>
      <p><strong>Cédula empleado:</strong> ${cedula}</p>
      <p><strong>Nombre empleado:</strong> ${nombre}</p>
      <p><strong>Salario básico:</strong> ${dinero(salario)}</p>
      <p><strong>Auxilio de transporte:</strong> ${dinero(auxilio)}</p>
      <p><strong>Comisión de ventas:</strong> ${dinero(comision)}</p>
      <p><strong>Préstamos:</strong> ${dinero(prestamos)}</p>
      <p><strong>Salario neto por recibir:</strong> ${dinero(salarioNeto)}</p>
    `;

    document.getElementById("resultadoSalario").classList.add("show");
  });
}


/* ---------------------------------------------------------
   ENUNCIADO 2: PRIMEROS 20 TÉRMINOS
  
   La serie es 1, 3, 6, 10, 15...
   El incremento cambia así: +2, +3, +4, +5...
   Se inicia en 1 y el incremento en 2.
   Después de cada término se aumenta el incremento en 1.
   --------------------------------------------------------- */

const btnSerie = document.getElementById("btnSerie");

if (btnSerie) {
  btnSerie.addEventListener("click", function () {
    let termino = 1;
    let incremento = 2;
    const terminos = [termino];

    // Se generan los términos del 2 al 20.
    for (let i = 2; i <= 20; i++) {
      termino = termino + incremento;
      terminos.push(termino);
      incremento++;
    }

    document.getElementById("resultadoSerie").innerHTML = `
      <h3>Primeros 20 términos</h3>
      <div class="values">
        ${terminos.map(valor => `<span class="value">${valor}</span>`).join("")}
      </div>
    `;

    document.getElementById("resultadoSerie").classList.add("show");
  });
}


/* ---------------------------------------------------------
   ENUNCIADO 3: DATOS DE UNA FIESTA
  
   1. Se registran personas una por una.
   2. No se aceptan menores de 18 años.
   3. Se cuentan hombres y mujeres.
   4. Se acumulan sus edades para calcular promedios.
   5. Se compara cada edad para encontrar la menor.
   6. "Finalizar registro".

   Nota: Se utilizar directamente el botón "Finalizar registro" para mostrar resultados.
   --------------------------------------------------------- */

let totalPersonas = 0;
let hombres = 0;
let mujeres = 0;
let sumaEdadHombres = 0;
let sumaEdadMujeres = 0;
let menorEdad = null;

const formFiesta = document.getElementById("formFiesta");

if (formFiesta) {
  formFiesta.addEventListener("submit", function (event) {
    event.preventDefault();

    const edad = Number(document.getElementById("edadFiesta").value);
    const sexo = document.getElementById("sexoFiesta").value;
    const error = document.getElementById("errorFiesta");

    error.textContent = "";

    // Indicar que debe presionar "Finalizar registro".
    if (edad === 0) {
      error.textContent = "La edad 0 finaliza el registro. Pulsa 'Finalizar registro'.";
      return;
    }

    // No se permiten menores de edad.
    if (edad < 18) {
      error.textContent = "No se permiten menores de 18 años.";
      return;
    }

    if (!sexo) {
      error.textContent = "Selecciona el sexo.";
      return;
    }

    totalPersonas++;

    // Se busca la edad mínima comparando cada edad ingresada.
    if (menorEdad === null || edad < menorEdad) {
      menorEdad = edad;
    }

    if (sexo === "H") {
      hombres++;
      sumaEdadHombres += edad;
    } else {
      mujeres++;
      sumaEdadMujeres += edad;
    }

    document.getElementById("edadFiesta").value = "";
    document.getElementById("sexoFiesta").value = "";
    error.textContent = "Persona agregada correctamente.";
  });
}

const finalizarFiesta = document.getElementById("finalizarFiesta");

if (finalizarFiesta) {
  finalizarFiesta.addEventListener("click", function () {
    // Se evita dividir entre cero cuando no hay personas de un sexo.
    const promedioHombres = hombres > 0 ? sumaEdadHombres / hombres : 0;
    const promedioMujeres = mujeres > 0 ? sumaEdadMujeres / mujeres : 0;

    document.getElementById("resultadoFiesta").innerHTML = `
      <h3>Resultado de la fiesta</h3>
      <p><strong>Total de asistentes:</strong> ${totalPersonas}</p>
      <p><strong>Hombres:</strong> ${hombres}</p>
      <p><strong>Mujeres:</strong> ${mujeres}</p>
      <p><strong>Promedio de edad de hombres:</strong> ${promedioHombres.toFixed(2)}</p>
      <p><strong>Promedio de edad de mujeres:</strong> ${promedioMujeres.toFixed(2)}</p>
      <p><strong>Persona más joven:</strong> ${
        menorEdad === null ? "No hay asistentes registrados" : menorEdad + " años"
      }</p>
    `;

    document.getElementById("resultadoFiesta").classList.add("show");
  });
}


/* ---------------------------------------------------------
   ENUNCIADO 4: COSTO DE LLAMADA
   
   - Hasta 3 minutos: $200.
   - Después de 3 minutos, cada minuto adicional cuesta $30.
   Fórmula para más de 3 minutos:
   costo = 200 + (minutos - 3) * 30.
   --------------------------------------------------------- */

const formLlamada = document.getElementById("formLlamada");

if (formLlamada) {
  formLlamada.addEventListener("submit", function (event) {
    event.preventDefault();

    const minutos = Number(document.getElementById("minutos").value);
    let costo;

    if (minutos <= 3) {
      costo = 200;
    } else {
      costo = 200 + (minutos - 3) * 30;
    }

    document.getElementById("resultadoLlamada").innerHTML = `
      <h3>Resultado</h3>
      <p><strong>Duración:</strong> ${minutos} minutos</p>
      <p><strong>Costo de la llamada:</strong> $${costo.toLocaleString("es-CO")}</p>
    `;

    document.getElementById("resultadoLlamada").classList.add("show");
  });
}
