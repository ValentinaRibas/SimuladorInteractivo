alert("Tienda online de chocolates");

//Declaro las variables y constantes que voy a usar
let producto = 1;
const productosCliente = [];
const productosTienda = ["Chocolate blanco Arcor","Chocolate negro Arcor","Bombones Bonobon blanco","Bombones Bonobon negro","Bombones Bonobon dulce de leche"];


//Funcion calcularTotal
//Parametros: arrayProductos
//Suma todos los subtotales
function calcularTotal(arrayProductos){
    let total=0;
    for (prod of arrayProductos){
        if(prod.nombre == 1){
            total+=(140*prod.cantidad);
        } else if(prod.nombre == 2){
            total+=(150*prod.cantidad);
        } else if(prod.nombre == 3){
            total+=(120*prod.cantidad);
        } else if(prod.nombre == 4){
            total+=(100*prod.cantidad);
        } else if(prod.nombre == 5){
            total+=(150*prod.cantidad);
        }
    }
    alert("Su total es $"+total);
}

//Funcion elegirCantidad
//Parametros: numeroProducto
//Controla que el producto sea valido y toma el dato que ingresa el usuario
function elegirCantidad(numeroProducto){
    if (numeroProducto > 0){
        let nombreProducto = productosTienda[numeroProducto-1];
        let cantidad = prompt("Ingrese la cantidad que desea del producto: "+nombreProducto);
        return cantidad;
    }
    return -1;
}

//Funcion elegirProductos
//Toma los datos que ingresa el cliente y llama a calcular total
function elegirProductos() {
    while (producto > 0 && producto < 6) {
        producto = prompt("Los chocolates en stock son:\n1)Chocolate blanco Arcor\n2)Chocolate negro Arcor\n3)Bombones Bonobon blanco\n4)Bombones Bonobon negro\n5)Bombones Bonobon dulce de leche\nIngrese el numero de producto que desea, 0 si desea finalizar el pedido");
        let cantidadProducto = elegirCantidad(producto);
        if (cantidadProducto > 0){
            productosCliente.push({nombre: producto, cantidad: cantidadProducto});
        }
    }

    let mensajeFinal = "Su compra es:\n";
    for (prod of productosCliente){
        mensajeFinal = mensajeFinal+prod.cantidad+" "+productosTienda[parseInt(prod.nombre)+1]+"\n";
    }
    mensajeFinal = mensajeFinal+"Si desea finalizar ingrese 1, si desea volver a realizar el pedido ingrese 0";
    let finalizar = prompt(mensajeFinal);
    if(finalizar==1){
        calcularTotal(productosCliente);
    }
    else if(finalizar==0){
        producto=1;
        productosCliente.splice(0,(productosCliente.length));
        elegirProductos();
    }
}

elegirProductos();