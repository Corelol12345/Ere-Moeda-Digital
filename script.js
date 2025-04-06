// Atualiza o valor total das moedas
const quantidadeInput = document.getElementById('quantidade');
const totalElement = document.getElementById('total');
const valorUnitario = 1.50;

function atualizarTotal() {
    const quantidade = quantidadeInput.value;
    const total = quantidade * valorUnitario;
    totalElement.textContent = `R$ ${total.toFixed(2)}`;
}

quantidadeInput.addEventListener('input', atualizarTotal);
atualizarTotal();

// Elementos do formulário do cartão
const nomeInput = document.getElementById('nome');
const numeroInput = document.getElementById('numero');
const validadeInput = document.getElementById('validade');
const cvvInput = document.getElementById('cvv');

// Elementos do cartão virtual
const numeroCartao = document.querySelector('.numeroCartao');
const nomeCartao = document.querySelector('.nomeCartao');
const validadeCartao = document.querySelector('.validadeCartao');
const cvvCartao = document.querySelector('.cvvCartao');
const cartao = document.querySelector('.cartao');

// Máscara para o número do cartão (formata em grupos de 4 dígitos)
numeroInput.addEventListener('input', (e) => {
    let numero = e.target.value.replace(/\s/g, '');
    if (numero.length > 16) {
        numero = numero.substring(0, 16);
    }
    numero = numero.replace(/(\d{4})/g, '$1 ').trim();
    e.target.value = numero;
    numeroCartao.textContent = numero || '#### #### #### ####';
});

// Atualiza nome no cartão
nomeInput.addEventListener('input', () => {
    nomeCartao.textContent = nomeInput.value || 'NOME DO TITULAR';
});

// Máscara e validação da validade (MM/AA)
validadeInput.addEventListener('input', (e) => {
    let valor = e.target.value.replace(/\D/g, '');
    if (valor.length > 4) {
        valor = valor.substring(0, 4);
    }
    if (valor.length > 2) {
        valor = valor.replace(/^(\d{2})(\d{0,2})/, '$1/$2');
    }
    e.target.value = valor;
    validadeCartao.textContent = valor || 'MM/AA';
});

// Validação do CVV e efeito de virar o cartão
cvvInput.addEventListener('focus', () => {
    cartao.classList.add('flip');
});

cvvInput.addEventListener('blur', () => {
    cartao.classList.remove('flip');
});

cvvInput.addEventListener('input', (e) => {
    let valor = e.target.value.replace(/\D/g, '');
    if (valor.length > 4) {
        valor = valor.substring(0, 4);
    }
    e.target.value = valor;
    cvvCartao.textContent = valor || '***';
});

/*
Cartoes validos para testar
4196916918022230
4485521293156437
4024007119941952
4716562928188024
4532153828532495
4556872350449452
*/
// Funções de validação
function validarNumeroCartao(numero) {
    const numeroLimpo = numero.replace(/\s/g, '');
    if (!/^\d{16}$/.test(numeroLimpo)) return false;
    
    // Algoritmo de Luhn
    let soma = 0;
    for (let i = 0; i < 16; i++) {
        let digito = parseInt(numeroLimpo[i]);
        if (i % 2 === 0) {
            digito *= 2;
            if (digito > 9) digito -= 9;
        }
        soma += digito;
    }
    return soma % 10 === 0;
}

function validarValidade(validade) {
    const [mes, ano] = validade.split('/').map(Number);
    if (!mes || !ano || mes < 1 || mes > 12) return false;
    
    const agora = new Date();
    const anoAtual = agora.getFullYear() % 100;
    const mesAtual = agora.getMonth() + 1;
    
    return (ano > anoAtual || (ano === anoAtual && mes >= mesAtual));
}

function validarCVV(cvv) {
    return /^\d{3,4}$/.test(cvv);
}

// Validação ao enviar o formulário
document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Valida todos os campos
    const isNumeroValido = validarNumeroCartao(numeroInput.value);
    const isValidadeValida = validarValidade(validadeInput.value);
    const isCVVValido = validarCVV(cvvInput.value);
    const isNomeValido = nomeInput.value.trim().length > 0;

    // Aplica estilos de erro
    numeroInput.style.borderColor = isNumeroValido ? '#4CAF50' : '#BE3144';
    validadeInput.style.borderColor = isValidadeValida ? '#4CAF50' : '#BE3144';
    cvvInput.style.borderColor = isCVVValido ? '#4CAF50' : '#BE3144';
    nomeInput.style.borderColor = isNomeValido ? '#4CAF50' : '#BE3144';

    if (isNumeroValido && isValidadeValida && isCVVValido && isNomeValido) {
        alert('Pagamento processado com sucesso!');
    } else {
        alert('Por favor, corrija os erros no formulário.');
    }
});

// Validação em tempo real (on blur)
numeroInput.addEventListener('blur', () => {
    const valido = validarNumeroCartao(numeroInput.value);
    numeroInput.style.borderColor = valido ? '#4CAF50' : '#BE3144';
});

validadeInput.addEventListener('blur', () => {
    const valido = validarValidade(validadeInput.value);
    validadeInput.style.borderColor = valido ? '#4CAF50' : '#BE3144';
});

cvvInput.addEventListener('blur', () => {
    const valido = validarCVV(cvvInput.value);
    cvvInput.style.borderColor = valido ? '#4CAF50' : '#BE3144';
});