let dineroTotal = 0
let productos = []
let carrito = []
let respuesta
let contadorCarrito = document.getElementById("cantidadProductos")
let precioTotal = document.getElementById("precioTotal")
let todoProductos = document.getElementById("productos")
todoProductos.className = "misProductos"

class Producto{
    constructor(nombre, precio, categoria, imagen, id, cantidad){
        this.nombre = nombre
        this.precio = precio
        this.categoria = categoria
        this.imagen = imagen
        this.id = id
        this.cantidad = 0 
    }
}

productos.push(new Producto( "Sillon", 9000,  "hogar", "./img/sillon.jpg", 1));
productos.push(new Producto( "Cama",  10000,  "hogar", "./img/cama.jpg", 2));
productos.push(new Producto( "Auricular", 5000,  "tecnologia", "./img/auricular.jpg", 3));
productos.push(new Producto( "Remera" , 2500, "Ropa", "./img/remera.jpg", 4));
productos.push(new Producto( "Pantalon" , 2000,  "Ropa", "./img/pantalon.jpg", 5));
productos.push(new Producto( "Computadora" , 15000,  "tecnologia", "./img/computadora.jpeg", 6));
productos.push(new Producto( "Telefono" , 13000,  "tecnologia", "./img/telefono.jpeg", 7));
productos.push(new Producto( "Zapatillas" , 8000,  "ropa", "./img/zapatillas.jpeg", 8));


document.addEventListener(`DOMContentLoaded`, () => {
    carrito = JSON.parse(localStorage.getItem(`carrito`)) || []
    actualizarCarrito()
})

renderProducts()

function agregarCarrito(id) {
    Toastify({
        text: `Agregado al carrito`,
        duration: 1000,
        gravity: `top`,
        position: `left`,
        close: true,
    }).showToast()

    const resultado = productos.find(prod => prod.id === id)
    console.log(resultado)

    if (carrito.some((prod) => prod.id === id)) {

    } else {
        carrito.push(resultado)
    }

    resultado.cantidad++


    actualizarCarrito()
}

function quitarCarrito(id) {
    Toastify({
        text: `Elminado del carrito`,
        duration: 1000,
        gravity: `top`,
        position: `left`,
        close: true,
        style: {
            background: `linear-gradient(25deg,#d64c7f,#ee4758 50%)`
        }
    }).showToast()

    const resultado = carrito.find(prod => prod.id === id)
    const indice = carrito.indexOf(resultado)
    carrito.splice(indice, 1)
    resultado.cantidad--
    actualizarCarrito()
    
}


const actualizarCarrito = () => {
    
    carritoHTML.innerHTML = ""

    carrito.forEach((prod) => {
        
        let carritoHTML = document.getElementById("carritoHTML")
        carritoHTML.className = `productoEnCarrito`
        carritoHTML.innerHTML += `<div class="productoEnCarrito ">
        <p>${prod.nombre}</p>
        <p>Precio: ${prod.precio}
        <p>Cantidad: <span id="cantidad">${prod.cantidad}</span></p>
        <button class="quitarCarrito" onclick=quitarCarrito(${prod.id} )><img src="./img/eliminar.png"></button>
        </div>
        `


    })

    if (carrito.length === 0) {
        carritoHTML.innerHTML = `<h4 class ="carritoVacio">Aun no se agrego nada!</h4>`
    }

    precioTotal.innerText = carrito.reduce((acc, prod) => acc + prod.cantidad * prod.precio, 0)

    contadorCarrito.textContent = carrito.length


    guardarStorage()
}

function vaciarCarrito() {
    carrito.length = []
    actualizarCarrito()
}

function buscarProductos() {
    let input = document.getElementById('barraBusqueda').value
    input = input.toLowerCase();
    let x = document.getElementsByClassName('categoriaProductos');
      
    for (i = 0; i < x.length; i++) { 
        if (!x[i].innerHTML.toLowerCase().includes(input)) {
            x[i].style.display="none";
        }else {
            x[i].style.display="block";                 
        }

    }
}

function guardarStorage() {
    localStorage.setItem("carrito", JSON.stringify(carrito))
}

function renderProducts(prod) {
    productos.forEach(prod => {

todoProductos.innerHTML += `<div  class="cadaProducto categoriaProductos"> 
<h3>${prod.nombre}</h3> 
<img class="imgProductos" src="${prod.imagen}">
<h4>$${prod.precio}</h5>
<button class="agregarCarrito" onclick=agregarCarrito(${prod.id})>Agregar al carrito</button> 
<button class="quitarCarrito" onclick=quitarCarrito(${prod.id})><img src="./img/eliminar.png"></button>

</div>`
});
}


function mostrarMensaje() {
    Swal.fire({
        title: '¿Estas ahi?',
        icon: 'question',
        showCancelButton: false,
        showConfirmButton: false
    })
}

let myTimeout = setTimeout(mostrarMensaje, 5000);

function cerrarMensaje() {
    Swal.close()
}

function reiniciarContador() {
    cerrarMensaje()
    clearTimeout(myTimeout);
    myTimeout = setTimeout(mostrarMensaje, 5000);
}
document.addEventListener("mousemove", reiniciarContador)