const btnIngreso = document.getElementById('btn-ingreso');
const pantallaInicio = document.getElementById('pantallaInicio');
const pantallaCrearCuenta = document.getElementById('pantallaCrearCuenta');
const btnCrearCuenta = document.getElementById('btn-crearCuenta');
const pantallaIngreso = document.getElementById('pantallaIngreso');
const btnIniciarSesion = document.getElementById('btn-iniciarSesion');
const pantallaOpcionesUsuario = document.getElementById('pantallaOpcionesUsuario');
const btnIngresarSaldo = document.getElementById('ingresarSaldo');
const btnRetirarSaldo = document.getElementById('retirarSaldo');
const btnCerrarSesion = document.getElementById('cerrarSesion');
const pantallaIngresarSaldo = document.getElementById('pantallaIngresarSaldo');
const btnIngresarMonto = document.getElementById('ingresarMonto');
const pantallaRetirar = document.getElementById('pantallaRetirar');
const btnIngresaRetiro = document.getElementById('ingresaRetiro');
const btnAgregarCuenta = document.getElementById('agregarCuenta');
const msgCuentaExitosa = document.getElementById('cuentaExito');
const btnRegresarDesdeCrearCuenta = document.getElementById('regresarDesdeCrearCuenta');
const msgEligeOtroUsuario = document.getElementById('eligeOtroUsuario');
const usuarioError = document.getElementById('usuarioError');
const saldoMaximo = document.getElementById('saldoMaximo');
const saldoMinimo = document.getElementById('saldoMinimo');
const saldoMaximoIngresar = document.getElementById('saldoMaximoIngresar');
const saldoMinimoIngresar = document.getElementById('saldoMinimoIngresar');
let usuarioEnUso='';
let usuarioIntroducido='';
let passwordIntroducido='';
let passwordNuevaCuenta='';
let nombreNuevaCuenta='';
let saldoNuevaCuenta='';

let usuarios = [
        {
            nombre: 'Alan',
            password: "alan1234",
            cantidadCuenta: 500,
        },
        {
            nombre: "Emilse",
            password: "emilse1234",
            cantidadCuenta: 10,
        },
        {
            nombre: "Lisset",
            password: "lisset1234",
            cantidadCuenta: 10,
        },
]

// funcion para esconder todas las pantallas
function esconderPantallas (){
    pantallaInicio.style.display = 'none';
    pantallaIngreso.style.display = 'none';
    pantallaOpcionesUsuario.style.display = 'none';
    pantallaIngresarSaldo.style.display = 'none';
    pantallaRetirar.style.display = 'none';
    pantallaCrearCuenta.style.display = 'none';
}

// Botones pantalla inicio

btnIngreso.addEventListener('click', function (){
    esconderPantallas();
    pantallaIngreso.style.display = 'block';
    usuarioError.style.display = 'none';
})

btnCrearCuenta.addEventListener('click', function (){
    esconderPantallas();
    pantallaCrearCuenta.style.display = 'block';

})

// funciones para crear cuenta
btnAgregarCuenta.addEventListener('click', function (e){
    e.preventDefault();
    let usuarioACrearIntroducido = document.getElementById('usuarioNuevaCuenta').value;
    let usuarioACrear = usuarios.find(usuario=> usuario.nombre === usuarioACrearIntroducido );

    if(usuarioACrear){
        msgEligeOtroUsuario.style.display = 'block';
    } else {
        let NuevaCuenta = {nombre:document.getElementById('usuarioNuevaCuenta').value, password:document.getElementById('passwordNuevaCuenta').value, cantidadCuenta:10}
        usuarios.push(NuevaCuenta);

        document.getElementById('usuarioNuevaCuenta').value=''
        document.getElementById('passwordNuevaCuenta').value=''

        msgCuentaExitosa.style.display = 'block';
    }
})

btnRegresarDesdeCrearCuenta.addEventListener('click', function (){
    esconderPantallas();
    pantallaInicio.style.display = 'block';
    document.getElementById('usuarioNuevaCuenta').value=''
    document.getElementById('passwordNuevaCuenta').value=''
    msgCuentaExitosa.style.display = 'none';
    msgEligeOtroUsuario.style.display = 'none';
})

// Funciones en ingreso

btnIniciarSesion.addEventListener('click', function (e){
    e.preventDefault();
    usuarioIntroducido = document.getElementById('usuarioIntroducido').value;
    passwordIntroducido = document.getElementById('passwordIntroducido').value;
    usuarioEnUso = usuarios.find(usuario=> usuario.nombre === usuarioIntroducido );

    if(usuarioEnUso){
        
    }else{
        usuarioError.style.display = 'block';
    }
    
    if( usuarioEnUso.nombre && usuarioEnUso.password==passwordIntroducido){
    
    esconderPantallas();
    pantallaOpcionesUsuario.style.display = 'block';

    }
    else{
    usuarioError.style.display = 'block';
    }

    localStorage.setItem('user',usuarioIntroducido)
    document.getElementById('saldoUsuario').textContent=usuarioEnUso.cantidadCuenta;
})

usuarioIntroducido= localStorage.getItem('user');
usuarioEnUso = usuarios.find(usuario=> usuario.nombre === usuarioIntroducido );

// funciones para opciones de usuario

btnIngresarSaldo.addEventListener('click', function (){
    if(usuarioEnUso.cantidadCuenta<=990){
    esconderPantallas();
    pantallaIngresarSaldo.style.display = 'block';
    saldoMaximo.style.display= 'none';
    saldoMinimo.style.display= 'none';
    } else {
        saldoMaximo.style.display= 'block';
    }
})

btnRetirarSaldo.addEventListener('click', function (){
    if(usuarioEnUso.cantidadCuenta<=10){
    saldoMinimo.style.display= 'block';
    } else {
    esconderPantallas();
    pantallaRetirar.style.display = 'block';
    saldoMinimo.style.display= 'none';
    saldoMaximo.style.display= 'none';
    }
})

// funciones pantalla ingresar saldo
function evaluaArimetica(fn) {
    return new Function('return ' + fn)();
}

        // funcion limitar a campo numerico entero
document.getElementById("saldoIngresa").addEventListener("input", (e) => {
    let value = e.target.value;
    e.target.value = value.replace(/[^0-9\d]/g, "");
  });

btnIngresarMonto.addEventListener('click', function (e){
    e.preventDefault();
    let pruebaIngresoSaldo=document.getElementById('saldoIngresa').value + '+' + usuarioEnUso.cantidadCuenta;
    let result = evaluaArimetica(pruebaIngresoSaldo)
    if(result>990){
        saldoMaximoIngresar.style.display='block';
    } else {
        esconderPantallas();
        pantallaOpcionesUsuario.style.display = 'block';
        saldoMaximoIngresar.style.display='none';
        usuarioEnUso.cantidadCuenta=document.getElementById('saldoIngresa').value + '+' + usuarioEnUso.cantidadCuenta
        result = evaluaArimetica(usuarioEnUso.cantidadCuenta)
        usuarioEnUso.cantidadCuenta= result
        localStorage.setItem('user',usuarioIntroducido)
        document.getElementById('saldoUsuario').textContent=usuarioEnUso.cantidadCuenta;
        document.getElementById('saldoIngresa').value=''
    }
})

// funciones pantalla retirar saldo
document.getElementById("retiroSaldo").addEventListener("input", (e) => {
    let value = e.target.value;
    e.target.value = value.replace(/[^0-9\d]/g, "");
  });

btnIngresaRetiro.addEventListener('click', function (e){
    e.preventDefault();
        let pruebaRetiroSaldo=usuarioEnUso.cantidadCuenta + '-' +  document.getElementById('retiroSaldo').value;
        let result = evaluaArimetica(pruebaRetiroSaldo)
        if(result>=10){
        esconderPantallas();
        pantallaOpcionesUsuario.style.display = 'block';
        saldoMinimoIngresar.style.display='none';
        usuarioEnUso.cantidadCuenta= usuarioEnUso.cantidadCuenta + '-' +  document.getElementById('retiroSaldo').value;
        let result = evaluaArimetica(usuarioEnUso.cantidadCuenta)
        usuarioEnUso.cantidadCuenta= result
        localStorage.setItem('user',usuarioIntroducido)
        document.getElementById('saldoUsuario').textContent=usuarioEnUso.cantidadCuenta;
        document.getElementById('retiroSaldo').value='';
        } else{
            saldoMinimoIngresar.style.display='block';
        }
})

// funcion cerrar sesion
btnCerrarSesion.addEventListener('click', _ => {
    esconderPantallas();
    pantallaInicio.style.display = 'block';
    document.getElementById('usuarioIntroducido').value=''
    document.getElementById('passwordIntroducido').value=''
    usuarioEnUso=''
})


