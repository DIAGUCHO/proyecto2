let listapuro = [];

//Se añade una id para la identificacion de los nombre de puros ya que estos pueden repetirse la id no

const objpuro = {
    id: '',
    nombre: '',
}

let editando = false;

const formulario = document.querySelector('#formulario');
const nombreInput = document.querySelector('#nombre');
const btnAgregarInput = document.querySelector('#btnAgregar');

formulario.addEventListener('submit', validarFormulario);

//Comprobacion de campos .El usurario debe añadir el valores.

function validarFormulario(e) {
    e.preventDefault();

    if(nombreInput.value === '' ) {
        alert('Todos los campos se deben llenar');
        return;
    }

    if(editando) {
        editar();
        editando = false;

 //se obtiene id

    } else {
        objpuro.id = Date.now();
        objpuro.nombre = nombreInput.value;

        agregar();
    }
}
//Se agregan los valores para al objeto y luego al  localStorage 

function agregar() {

    listapuro.push({...objpuro});

    localStorage.setItem("prueba",JSON.stringify(listapuro) )

    mostrar();

    formulario.reset();
    limpiarObjeto();
}

function limpiarObjeto() {
    objpuro.id = '';
    objpuro.nombre = '';
}

//presentacion del dato y cracion de botones

function mostrar() {
    limpiar();

    const peticiones = document.querySelector('.peticiones');
    
    listapuro.forEach(puro => {
        const {id, nombre} = puro;

        const parrafo = document.createElement('p');
        parrafo.textContent = `${nombre} `;
        parrafo.dataset.id = id;

        const editarBoton = document.createElement('button');
        editarBoton.onclick = () => cargar(puro);
        editarBoton.textContent = 'Editar';
        editarBoton.classList.add('btn', 'btn-editar');
        parrafo.append(editarBoton);

        const eliminarBoton = document.createElement('button');
        eliminarBoton.onclick = () => eliminar(id);
        eliminarBoton.textContent = 'Eliminar';
        eliminarBoton.classList.add('btn', 'btn-eliminar');
        parrafo.append(eliminarBoton);

        const hr = document.createElement('hr');

        peticiones.appendChild(parrafo);
        peticiones.appendChild(hr);
    });
}

//se añaden valores valor puro varible importante para lña ejecucion de borrado,editado,ect

function cargar(puro) {
    const {id, nombre} = puro;

    nombreInput.value = nombre;

    objpuro.id = id;

    formulario.querySelector('button[type="submit"]').textContent = 'Actualizar';
    
    editando = true;
}

//edita valos tantop pagina como localStorage

function editar() {

    objpuro.nombre = nombreInput.value;

    listapuro.map(puro => {

        if(puro.id === objpuro.id) {
            puro.id = objpuro.id;
            puro.nombre = objpuro.nombre;

        }

    });

    limpiar();
    mostrar();
    formulario.reset();

    formulario.querySelector('button[type="submit"]').textContent = 'Agregar';
    
    editando = false;
}

//se elimina el valor del localStorage

function eliminar(id) {

    listapuro = listapuro.filter(puro => puro.id !== id);

    localStorage.removeItem(listapuro)

    limpiar();
    mostrar();
}

function limpiar() {
    const peticiones = document.querySelector('.peticiones');
    while(peticiones.firstChild) {
        peticiones.removeChild(peticiones.firstChild);
    }
}