//variables
const btnEnviar = document.querySelector('#enviar');
const btnReset = document.querySelector('#resetBtn');
const formulario = document.querySelector('#enviar-mail');
//variables para campos
const email = document.querySelector('#email');
const asunto = document.querySelector('#asunto');
const mensaje = document.querySelector('#mensaje');

const er = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;

eventListeners();

function eventListeners() {
    //cuando la app arranca
    document.addEventListener('DOMContentLoaded', iniciarApp);

    //campos del formulario
    email.addEventListener('blur', validarFormulario);
    asunto.addEventListener('blur', validarFormulario);
    mensaje.addEventListener('blur', validarFormulario);

    //reincicia el formulario
    btnReset.addEventListener('click', resetearFormulario);

    //enviar email
    btnEnviar.addEventListener('click', enviarEmail);

}



//functions
function iniciarApp(){
    btnEnviar.disabled = true
    btnEnviar.classList.add('cursor-not-allowed', 'opacity-50');

}
//valida el formulario
function validarFormulario(e){



    if(e.target.value.length > 0){
        const error=document.querySelector('p.error');
        if (error){
            error.remove();
        }
        e.target.classList.remove('border', 'border-red-500');
        e.target.classList.add('border', 'border-green-500');
    }else{
        e.target.classList.remove('border', 'border-green-500');
        e.target.classList.add('border', 'border-red-500');
        
        mostrarError('Todos los campos son obligatorios');
    }

    if(e.target.type ==='email'){
        
       
        if (er.test(e.target.value) ){
            const error = document.querySelector('p.error');
        if (error){
            error.remove();
        }    
            e.target.classList.remove('border', 'border-red-500');
            e.target.classList.add('border', 'border-green-500');
           
        }
        else {
            e.target.classList.remove('border', 'border-green-500');
            e.target.classList.add('border', 'border-red-500');
         
            mostrarError('El email no es válido');}

        
    } 


    if(er.test(email.value) && asunto.value !== '' && mensaje.value !== ''){
        btnEnviar.disabled = false;
        btnEnviar.classList.remove('cursor-not-allowed', 'opacity-50');
    } 

}

function mostrarError(mensaje){
    const mensajeError = document.createElement('p');
    mensajeError.textContent = mensaje;
    mensajeError.classList.add('boder', 'border-red-500', 'background-red-100', 'text-red-500', 'p-3', 'mt-5', 'text-center',
    'error');

    const errores = document.querySelectorAll('.error');
    if(errores.length === 0){
    formulario.appendChild(mensajeError);
    }

}


//envia el mail 
function enviarEmail(e){
    e.preventDefault();
    console.log('enviando')
    // mostrar el spinner
    const spinner = document.querySelector('#spinner');
    spinner.style.display = 'flex';


    // después de 3 segundos ocultar ele spinner y mostrar el mensaje
    setTimeout( () =>{
        spinner.style.display = 'none'; 
        const parrafo = document.createElement('p');
        parrafo.textContent = 'El mensaje se envió correctamente';
        parrafo.classList.add('text-center', 'my-10', 'p-5', 'bg-green-500', 'text-white', 'font-bold', 'uppercase')
        
        //inserta el parrafo antes del spinner
        formulario.insertBefore(parrafo, spinner);
        
        setTimeout(()=>{
            parrafo.remove(); //quita el mensaje de envio exitoso   
            resetearFormulario();
        }, 5000);
    }, 3000 );

}

//función que resetea formulario

function resetearFormulario(){
    formulario.reset();
    iniciarApp();
}