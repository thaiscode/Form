let button = document.querySelector('.form__botao');

button.addEventListener('click', (e) => {
    e.preventDefault();

    const nome = document.querySelector('#nome');
    const sobrenome = document.querySelector('#sobrenome');
    const email = document.querySelector('#email');
    const mensagem = document.querySelector('#mensagem');

    const isNameValid = validateField(nome, "O nome é obrigatório");
    const isSobrenomeValid = validateField(sobrenome, "O sobrenome é obrigatório");
    const isEmailValid = validateField(email, "O email é obrigatório"); 
    const isMensagemValid = validateField(mensagem, "A mensagem é obrigatória");

    if (isNameValid && isEmailValid && isSobrenomeValid && isMensagemValid) {
        window.location.href = "success-page.html";
    }
});

function validateField(input, message) {
    const box = input.parentElement;
    const errorMsg = box.querySelector('.mensagem-erro');

    // Campo vazio
    if (input.value.trim() === "") {
        box.classList.add('error');
        errorMsg.textContent = message;
        return false;
    } 

    // Validação de email
    if (input.type === "email" && input.validity.typeMismatch) {
        box.classList.add('error');
        errorMsg.textContent = "Formato de email inválido";
        return false;
    }

    // Mínimo de caracteres
    if (input.minLength > 0 && input.value.length < input.minLength) {
        box.classList.add('error');
        errorMsg.textContent = `Mínimo de ${input.minLength} caracteres`;
        return false;
    }

    // Máximo de caracteres
    if (input.maxLength > 0 && input.value.length > input.maxLength) {
        box.classList.add('error');
        errorMsg.textContent = `Máximo de ${input.maxLength} caracteres`;
        return false;
    }
    
    // Limpa erro
    box.classList.remove('error');
    errorMsg.textContent = "";
    return true;
}

document.querySelectorAll('input').forEach(input => {
    input.addEventListener('input', () => {
        validateField(input, "Campo obrigatório");
    });
});

const celularInput = document.querySelector('#celular');

celularInput.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, ''); // remove tudo que não é número

    if (value.length > 11) value = value.slice(0, 11);

    if (value.length > 0) {
        value = value.replace(/^(\d{2})(\d)/g, '($1) $2');
    }

    if (value.length > 9) {
        value = value.replace(/(\d{5})(\d)/, '$1-$2');
    }

    e.target.value = value;
});