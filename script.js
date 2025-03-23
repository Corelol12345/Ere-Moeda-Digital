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

// Atualiza o cartão virtual
const nomeInput = document.getElementById('nome');
const numeroInput = document.getElementById('numero');
const validadeInput = document.getElementById('validade');
const cvvInput = document.getElementById('cvv');

const numeroCartao = document.querySelector('.numeroCartao');
const nomeCartao = document.querySelector('.nomeCartao');
const validadeCartao = document.querySelector('.validadeCartao');
const cvvCartao = document.querySelector('.cvvCartao');
const cartao = document.querySelector('.cartao');

// Atualiza o número do cartão
numeroInput.addEventListener('input', () => {
    let numero = numeroInput.value.replace(/\s/g, '');
    numero = numero.replace(/(\d{4})/g, '$1 ').trim();
    numeroCartao.textContent = numero || '#### #### #### ####';
});

// Atualiza o nome do titular
nomeInput.addEventListener('input', () => {
    nomeCartao.textContent = nomeInput.value || 'NOME DO TITULAR';
});

// Atualiza a validade
validadeInput.addEventListener('input', () => {
    validadeCartao.textContent = validadeInput.value || 'MM/AA';
});

// Atualiza o CVV e vira o cartão
cvvInput.addEventListener('focus', () => {
    cartao.classList.add('flip');
});

cvvInput.addEventListener('blur', () => {
    cartao.classList.remove('flip');
});

cvvInput.addEventListener('input', () => {
    cvvCartao.textContent = cvvInput.value || '***';
});