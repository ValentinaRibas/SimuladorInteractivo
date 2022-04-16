alert("Tienda online de chocolates");
const productos = [];
let producto = 1;

function calcularSubtotal(productoElegido, cantidad){
    let subtotal=0;
    if(productoElegido==1){
        subtotal+=(140*cantidad)
    } else if(productoElegido==2){
        subtotal+=(150*cantidad)
    } else if(productoElegido==3){
        subtotal+=(120*cantidad)
    } else if(productoElegido==4){
        subtotal+=(100*cantidad)
    } else if(productoElegido==5){
        subtotal+=(150*cantidad)
    }
    return subtotal;
}

function consultarCantidad(arrayProductos){
    let total=0;
    for(let i=0; i<=arrayProductos.length; i++){
        if(arrayProductos[i]==1){
            let cantidad = prompt("Ingrese la cantidad que desea del producto Chocolate blanco Arcor");
            total+=calcularSubtotal(arrayProductos[i],cantidad);
        } else if(arrayProductos[i]==2){
            let cantidad = prompt("Ingrese la cantidad que desea del producto Chocolate negro Arcor");
            total+=calcularSubtotal(arrayProductos[i],cantidad);
        } else if(arrayProductos[i]==3){
            let cantidad = prompt("Ingrese la cantidad que desea del producto Bombones Bonobon blanco");
            total+=calcularSubtotal(arrayProductos[i],cantidad);
        } else if(arrayProductos[i]==4){
            let cantidad = prompt("Ingrese la cantidad que desea del producto Bombones Bonobon negro");
            total+=calcularSubtotal(arrayProductos[i],cantidad);
        } else if(arrayProductos[i]==5){
            let cantidad = prompt("Ingrese la cantidad que desea del producto Bombones Bonobon dulce de leche");
            total+=calcularSubtotal(arrayProductos[i],cantidad);
        }
    }

}

function elegirProductos() {
    while (producto > 0 && producto < 6) {
        producto = prompt("Los chocolates en stock son:\n1)Chocolate blanco Arcor\n2)Chocolate negro Arcor\n3)Bombones Bonobon blanco\n4)Bombones Bonobon negro\n5)Bombones Bonobon dulce de leche\nIngrese el numero de producto que desea o 0 si desea finalizar el pedido");
        productos.push(producto);
    }
    consultarCantidad(productos);
}

elegirProductos();