//Declaro las variables y constantes que voy a usar
const productosCliente = [];
const productosLista = [];
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
        let {id, nombre, marca, precio, img} = prod;
        productosLista.push(prod);
        productosBody.innerHTML += `<tr>
        <td><img src="${img}" style="max-width: 225px; max-height: 225px;"></td>
        <td>${nombre}  ${marca}</td>
        <td style='margin-left: 5rem;'>$${precio}</td><td style='margin-left: 5rem; align-items: center; display: flex;'><button id="btn1${id}">-</button><h6 id="txt${id}"></h6><button id="btn2${id}">+</button></td>
        </tr>`
    });
    productosLista.forEach(prod => {
        let button2 = document.getElementById("btn2"+prod.id);
        button2.addEventListener('click', function sumarCantidad(){
            prod.cantidad+=1;
            let txtCantidad = document.getElementById("txt"+prod.id);
            txtCantidad.innerHTML = prod.cantidad;
        });
        let button1 = document.getElementById("btn1"+prod.id);
        button1.addEventListener('click', function sumarCantidad(){
            if(prod.cantidad >=1){
                prod.cantidad-=1;
                let txtCantidad = document.getElementById("txt"+prod.id);
                txtCantidad.innerHTML = prod.cantidad;
            }
        })
    })
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
    let totalAct = 0;
    for (prod of productosCliente){
        totalAct += prod.precio;
    }
    sessionStorage.setItem("total", totalAct);
}

//Funcion completarCompra
//Llama a calcularSubtotal, toma el dato que ingresa el cliente y finaliza la compra
function completarCompra () {

    calcularSubtotal(productosCliente);

    let mensajeFinal = "";
    for (prod of productosCliente){
        let datosProducto = productosTienda[(parseInt(prod.nombre)-1)].split(",");
        let nombreProducto = datosProducto[0];
        mensajeFinal = mensajeFinal + prod.cantidad+" "+nombreProducto+" $" + prod.precio +"<br>";
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
        Swal.fire(msjFinal);
        sessionStorage.removeItem("total");
        setTimeout(function(){
            window.location.reload();
        }, 2500);
    })
    buttonVolver.addEventListener('click', function mostrarListado(){
        let txt1 = document.getElementById("txt1");
        let txt2 = document.getElementById("txt2");
        let txt3 = document.getElementById("txt3");
        let txt4 = document.getElementById("txt4");
        let txt5 = document.getElementById("txt5");
        txt1.innerHTML="";
        txt2.innerHTML="";
        txt3.innerHTML="";
        txt4.innerHTML="";
        txt5.innerHTML="";
        productosLista.forEach(prod => {
            prod.cantidad = 0;
        })
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
    productosLista.forEach(prod => {
        if (prod.cantidad > 0){
            let productoActual = new Producto(prod.id, prod.cantidad);
            productosCliente.push(productoActual);
        }
    });
    completarCompra();
})

buttonListado.addEventListener('click', function mostrarListado(){
    tienda.style.display = "none";
    listado.style.display = "block";
})