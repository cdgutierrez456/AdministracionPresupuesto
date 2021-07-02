// Variables y selectores
const formulario = document.querySelector('#agregar-gasto');
const gastoListado = document.querySelector('#gastos ul');


// Eventos
eventListeners();
function eventListeners() {
    document.addEventListener('DOMContentLoaded', preguntarPresupuesto);

    formulario.addEventListener('submit', agregarGasto);
}


// Clases
class Presupuesto {
    constructor(presupuesto) {
        this.presupuesto = Number(presupuesto);
        this.restante = Number(presupuesto);
        this.gastos = [];
    }

    nuevoGasto(gasto) {
        this.gastos = [...this.gastos, gasto];
        console.log(this.gastos);
    } 
}

class UI {
    insertarPresupuesto(cantidad) {
        // Extrayendo valores
        const {presupuesto, restante} = cantidad;

        // Agregando al html
        document.querySelector('#total').textContent = presupuesto;
        document.querySelector('#restante').textContent = restante;
    }

    imprimirAlerta(mensaje, tipo) {
        // Creando un div
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('text-center', 'alert');

        if(tipo === 'error') {
            divMensaje.classList.add('alert-danger');
        } else {
            divMensaje.classList.add('alert-success');
        }

        // Mensaje de error
        divMensaje.textContent = mensaje;

        // Insertando en html
        document.querySelector('.primario').insertBefore(divMensaje, formulario);

        // Quitar del html
        setTimeout(() => {
            divMensaje.remove();
        }, 1500);
    }
}

// Instanciando UI
const ui = new UI();
let presupuesto;

// Funciones
function preguntarPresupuesto() {
    const presupuestoUsuario = prompt('¿Cual es tu presupuesto?');

    if(presupuestoUsuario === '' || presupuestoUsuario === null || isNaN(presupuestoUsuario) || presupuestoUsuario <= 0) {
        window.location.reload();
    }

    presupuesto = new Presupuesto(presupuestoUsuario);
    // console.log(presupuesto);
    ui.insertarPresupuesto(presupuesto);
}

// Añade gastos
function agregarGasto(e) {
    e.preventDefault();

    // Leer datos del formulario
    const nombre = document.querySelector('#gasto').value;
    const cantidad = Number(document.querySelector('#cantidad').value);

    // Validando
    if(nombre === '' || cantidad === '') {
        ui.imprimirAlerta('Ambos campos son obligatorios', 'error');
        return;
    } else if (cantidad <= 0 || isNaN(cantidad)) {
        ui.imprimirAlerta('Cantidad no valida', 'error');
        return;
    }

    // Generar objeto con gasto
    const gasto = {nombre, cantidad, id: Date.now()} 

    // Añadiendo un nuevo gasto
    presupuesto.nuevoGasto(gasto);

    ui.imprimirAlerta('Gasto agregado correctamente')

}
