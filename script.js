let botao = document.querySelector('.form__botao');

botao.addEventListener('click', (e) => {
    e.preventDefault();

    const nome = document.querySelector('#nome');
    const sobrenome = document.querySelector('#sobrenome');
    const email = document.querySelector('#email');
    const mensagem = document.querySelector('#mensagem');

    const valiNome = validate(nome, "Preencha este campo.");
    const valiSobrenome = validate(sobrenome, "Preencha este campo.");
    const valiEmail = validate(email, "Preencha este campo.");
    const valiMensagem = validate(mensagem, "Preencha este campo.");

    if (valiNome && valiSobrenome && valiEmail && valiMensagem) {
        window.location.href = "success-page.html";
    }
});

function validate(input, message) {
    const box = input.parentElement;
    const errorMsg = box.querySelector('.mensagem-erro');

    if (input.value.trim() === "") {
        box.classList.add('error');
        errorMsg.textContent = message;
        return false;
    } 

    if (input.type === "email" && input.validity.typeMismatch) {
        box.classList.add('error');
        errorMsg.textContent = "Formato de email inválido.";
        return false;
    }

    if (input.minLength > 0 && input.value.length < input.minLength) {
        box.classList.add('error');
        errorMsg.textContent = `Mínimo de ${input.minLength} caracteres.`;
        return false;
    }

    if (input.maxLength > 0 && input.value.length > input.maxLength) {
        box.classList.add('error');
        errorMsg.textContent = `Máximo de ${input.maxLength} caracteres.`;
        return false;
    }
    
    box.classList.remove('error');
    errorMsg.textContent = "";
    return true;
}

document.querySelectorAll('input').forEach(input => {
    input.addEventListener('input', () => {
        validate(input, "Campo obrigatório.");
    });
});

const celular = document.querySelector('#celular');

celular.addEventListener('input', (e) => {
    let celularVal = e.target.value.replace(/\D/g, ''); 

    if (celularVal.length > 11) celularVal = celularVal.slice(0, 11);

    if (celularVal.length > 0) {
        celularVal = celularVal.replace(/^(\d{2})(\d)/g, '($1) $2');
    }

    if (celularVal.length > 9) {
        celularVal = celularVal.replace(/(\d{5})(\d)/, '$1-$2');
    }

    e.target.value = celularVal;
});