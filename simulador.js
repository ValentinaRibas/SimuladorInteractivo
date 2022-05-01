alert("Tienda online de chocolates");

//Declaro las variables y constantes que voy a usar
let nombreProducto = 1;
const productosCliente = [];
const productosTienda = ["Chocolate blanco Arcor,140","Chocolate negro Arcor,150","Bombones Bonobon blanco,120","Bombones Bonobon negro,100","Bombones Bonobon dulce de leche,150"];

//Objeto Producto
//Tiene nombre y cantidad
class Producto {
    constructor (nombre, cantidad, precio){
        this.nombre = nombre;
        this.cantidad = cantidad;
        this.precio = this.precio;
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

//Funcion elegirCantidad
//Parametros: numeroProducto
//Controla que el producto sea valido y toma el dato que ingresa el usuario
function elegirCantidad(numeroProducto){
    if (numeroProducto > 0){
        let datosProducto = productosTienda[(numeroProducto-1)].split(",");
        let nombreProducto = datosProducto[0];
        let cantidad = prompt("Ingrese la cantidad que desea del producto: "+nombreProducto);
        return cantidad;
    }
    return -1;
}

//Funcion CalcularTotal
//Calcula el precio total
function calcularTotal(){
    let total = 0;
    for (prod of productosCliente){
        total += prod.precio;
    }
    return total;
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
    mensajeFinal = mensajeFinal+"Si desea finalizar ingrese 1, si desea volver a realizar el pedido ingrese 0";
    let finalizar = prompt(mensajeFinal);

    if(finalizar==1){
        let total = calcularTotal();
        alert("Su total es: $" + total +"\nGracias por su compra!");
    }
    else if(finalizar==0){
        nombreProducto=1;
        productosCliente.splice(0,(productosCliente.length));
        elegirProductos();
    }
}

//Funcion elegirProductos
//Toma los datos que ingresa el cliente y llama a calcular total
function elegirProductos() {
    while (nombreProducto > 0 && nombreProducto < 6) {
        let pedirProducto = "Los chocolates en stock son:\n";
        for (let p=0; p<(productosTienda.length); p++){
            let datosProducto =  productosTienda[p].split(",");
            pedirProducto = pedirProducto + (p+1) + ")" + datosProducto[0] + " $"+ datosProducto[1]+"\n";
        }

        pedirProducto = pedirProducto + "Ingrese el numero de producto que desea, 0 si desea finalizar el pedido";
        nombreProducto = prompt(pedirProducto);
        let cantidadProducto = elegirCantidad(nombreProducto);
        if (cantidadProducto > 0){
            let productoActual = new Producto(nombreProducto, cantidadProducto);
            productosCliente.push(productoActual);
        }
    }
    completarCompra();    
}

elegirProductos();