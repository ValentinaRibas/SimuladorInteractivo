//Declaro las variables y constantes que voy a usar
let nombreProducto = 1;
const productosCliente = [];
const productosTienda = ["Chocolate blanco Arcor,140","Chocolate negro Arcor,150","Bombones Bonobon blanco,120","Bombones Bonobon negro,100","Bombones Bonobon dulce de leche,150"];
let buttonComplete = document.getElementById("btn_complete");
let buttonListado = document.getElementById("btn_mostrarListado");
let buttonFin = document.getElementById("btn_fin");
let buttonVolver = document.getElementById("btn_volver");
let detalle = document.getElementById("detalle");
let fin = document.getElementById("final_msg");
let tienda = document.getElementById("tienda");
let listado = document.getElementById("listado");
let total = document.getElementById("total");
let final = document.getElementById("final");
let productosBody = document.getElementById("productosDetalle");


tienda.style.display = "block";
listado.style.display = "none";
total.style.display = "none";
final.style.display = "none";

fetch("./productos.json")
.then(response=> response.json())
.then(productosDetalle=> {
    productosDetalle.forEach(prod => {
        let {id, nombre, marca, precio} = prod;
        productosBody.innerHTML += `<div>
        <h2>${nombre}</h2>
        <h2>${marca}</h2>
        <h2>${precio}</h2><input type="text" id="cant_${id}" placeholder="Ingrese cantidad"/>
        </div>`
    });
})

//Objeto Producto
//Tiene nombre y cantidad
class Producto {
    constructor (nombre, cantidad, precio){
        this.nombre = nombre;
        this.cantidad = cantidad;
        this.precio = precio;
    }
}

//Funcion calcularSubtotal
//Parametros: arrayProductos
//Calcula los subtotales
function calcularSubtotal(arrayProductos){
    for (prod of arrayProductos){
        if(prod.nombre == 1){
            prod.precio = (140*prod.cantidad);
        } else if(prod.nombre == 2){
            prod.precio = (150*prod.cantidad);
        } else if(prod.nombre == 3){
            prod.precio = (120*prod.cantidad);
        } else if(prod.nombre == 4){
            prod.precio = (100*prod.cantidad);
        } else if(prod.nombre == 5){
            prod.precio = (150*prod.cantidad);
        }
    }
}

//Funcion CalcularTotal
//Calcula el precio total
function calcularTotal(){
    let total = 0;
    for (prod of productosCliente){
        total += prod.precio;
    }
    sessionStorage.setItem("total", total);
}

//Funcion completarCompra
//Llama a calcularSubtotal, toma el dato que ingresa el cliente y finaliza la compra
function completarCompra () {

    calcularSubtotal(productosCliente);

    let mensajeFinal = "Su compra es:\n";
    for (prod of productosCliente){
        let datosProducto = productosTienda[(parseInt(prod.nombre)-1)].split(",");
        let nombreProducto = datosProducto[0];
        mensajeFinal = mensajeFinal + prod.cantidad+" "+nombreProducto+" $" + prod.precio +"\n";
    }
    listado.style.display = "none";
    total.style.display = "block";
    detalle.innerHTML=mensajeFinal;

    buttonFin.addEventListener('click', function mostrarListado(){
        total.style.display = "none";
        final.style.display = "block";
        calcularTotal();
        let totalPrecio = sessionStorage.getItem("total");
        let msjFinal ="Su total es: $" + totalPrecio +"\nGracias por su compra!";
        swal.fire(msjFinal);
        sessionStorage.removeItem("total");
    })
    buttonVolver.addEventListener('click', function mostrarListado(){
        let cantidad1 = document.getElementById("cant_1");
        let cantidad2 = document.getElementById("cant_2");
        let cantidad3 = document.getElementById("cant_3");
        let cantidad4 = document.getElementById("cant_4");
        let cantidad5 = document.getElementById("cant_5");
        nombreProducto=1;
        cantidad1.value="";
        cantidad2.value="";
        cantidad3.value="";
        cantidad4.value="";
        cantidad5.value="";
        productosCliente.splice(0,(productosCliente.length));
        total.style.display = "none";
        final.style.display = "none";
        listado.style.display = "block";
    })
}

//Funcion tomarProductos
//Al clickear Completar compra se toman las cantidades ingresadas para cada producto
//y se llama a la funcion completarCompra
buttonComplete.addEventListener('click', function tomarProductos(){
    let cantidad1 = document.getElementById("cant_1");
    let cantidad2 = document.getElementById("cant_2");
    let cantidad3 = document.getElementById("cant_3");
    let cantidad4 = document.getElementById("cant_4");
    let cantidad5 = document.getElementById("cant_5");
    if (cantidad1.value != ""){
        let productoActual = new Producto(1, cantidad1.value);
        productosCliente.push(productoActual);
    }
    if (cantidad2.value != ""){
        let productoActual = new Producto(2, cantidad2.value);
        productosCliente.push(productoActual);
    }
    if (cantidad3.value != ""){
        let productoActual = new Producto(3, cantidad3.value);
        productosCliente.push(productoActual);
    }
    if (cantidad4.value != ""){
        let productoActual = new Producto(4, cantidad4.value);
        productosCliente.push(productoActual);
    }
    if (cantidad5.value != ""){
        let productoActual = new Producto(5, cantidad5.value);
        productosCliente.push(productoActual);
    }
    completarCompra();
})

buttonListado.addEventListener('click', function mostrarListado(){
    tienda.style.display = "none";
    listado.style.display = "block";
})