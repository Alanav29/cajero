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
            cantidadCuenta: 1000,
        },
        {
            nombre: "Emilse",
            password: "emilse1234",
            cantidadCuenta: 0,
        },
        {
            nombre: "Lisset",
            password: "lisset1234",
            cantidadCuenta: 0,
        },
    ]

// Botones pantalla inicio

btnIngreso.addEventListener('click', function (){
    pantallaInicio.style.display = 'none';
    pantallaIngreso.style.display = 'block';

})

btnCrearCuenta.addEventListener('click', function (){
    pantallaInicio.style.display = 'none';
    pantallaIngreso.style.display = 'none';
    pantallaOpcionesUsuario.style.display = 'none';
    pantallaIngresarSaldo.style.display = 'none';
    pantallaRetirar.style.display = 'none';
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
        let NuevaCuenta = {nombre:document.getElementById('usuarioNuevaCuenta').value, password:document.getElementById('passwordNuevaCuenta').value, cantidadCuenta:0}
        usuarios.push(NuevaCuenta);

        document.getElementById('usuarioNuevaCuenta').value=''
        document.getElementById('passwordNuevaCuenta').value=''

        msgCuentaExitosa.style.display = 'block';
    }
})

btnRegresarDesdeCrearCuenta.addEventListener('click', function (){
    pantallaInicio.style.display = 'block';
    pantallaIngreso.style.display = 'none';
    pantallaOpcionesUsuario.style.display = 'none';
    pantallaIngresarSaldo.style.display = 'none';
    pantallaRetirar.style.display = 'none';
    pantallaCrearCuenta.style.display = 'none';

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
    
    pantallaIngreso.style.display = 'none';
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
    pantallaInicio.style.display = 'none';
    pantallaIngreso.style.display = 'none';
    pantallaOpcionesUsuario.style.display = 'none';
    pantallaIngresarSaldo.style.display = 'block';
})

btnRetirarSaldo.addEventListener('click', function (){
    pantallaInicio.style.display = 'none';
    pantallaIngreso.style.display = 'none';
    pantallaOpcionesUsuario.style.display = 'none';
    pantallaIngresarSaldo.style.display = 'none';
    pantallaRetirar.style.display = 'block';
})

// funciones pantalla ingresar saldo
function evaluaArimetica(fn) {
    return new Function('return ' + fn)();
}

btnIngresarMonto.addEventListener('click', function (e){
    e.preventDefault();
    pantallaInicio.style.display = 'none';
    pantallaIngreso.style.display = 'none';
    pantallaOpcionesUsuario.style.display = 'block';
    pantallaIngresarSaldo.style.display = 'none';
    usuarioEnUso.cantidadCuenta=document.getElementById('saldoIngresa').value + '+' + usuarioEnUso.cantidadCuenta
    let result = evaluaArimetica(usuarioEnUso.cantidadCuenta)
    usuarioEnUso.cantidadCuenta= result
    localStorage.setItem('user',usuarioIntroducido)
    document.getElementById('saldoUsuario').textContent=usuarioEnUso.cantidadCuenta;
    document.getElementById('saldoIngresa').value=''
})

// funciones pantalla retirar saldo

btnIngresaRetiro.addEventListener('click', function (e){
    e.preventDefault();
    pantallaInicio.style.display = 'none';
    pantallaIngreso.style.display = 'none';
    pantallaOpcionesUsuario.style.display = 'block';
    pantallaIngresarSaldo.style.display = 'none';
    pantallaRetirar.style.display = 'none';
    usuarioEnUso.cantidadCuenta= usuarioEnUso.cantidadCuenta + '-' +  document.getElementById('retiroSaldo').value
    let result = evaluaArimetica(usuarioEnUso.cantidadCuenta)
    usuarioEnUso.cantidadCuenta= result
    localStorage.setItem('user',usuarioIntroducido)
    document.getElementById('saldoUsuario').textContent=usuarioEnUso.cantidadCuenta;
    document.getElementById('retiroSaldo').value='';
})

// funcion cerrar sesion
btnCerrarSesion.addEventListener('click', _ => {
    pantallaInicio.style.display = 'block';
    pantallaIngreso.style.display = 'none';
    pantallaOpcionesUsuario.style.display = 'none';
    pantallaIngresarSaldo.style.display = 'none';
    pantallaRetirar.style.display = 'none';
    
    document.getElementById('usuarioIntroducido').value=''
    document.getElementById('passwordIntroducido').value=''
    usuarioEnUso=''
})


