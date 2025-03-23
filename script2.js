document.addEventListener("DOMContentLoaded", function () {
    const quantidadeInput = document.getElementById("quantidade");
    const totalSpan = document.getElementById("total");
    const precoPorMoeda = 10.00;
    const form = document.querySelector("form");
    
    quantidadeInput.addEventListener("input", function () {
        let quantidade = parseInt(quantidadeInput.value);
        if (isNaN(quantidade) || quantidade < 1) {
            quantidade = 1;
            quantidadeInput.value = 1;
        }
        const total = quantidade * precoPorMoeda;
        totalSpan.textContent = `R$ ${total.toFixed(2)}`;
    });
    
    form.addEventListener("submit", function (event) {
        event.preventDefault();
        const nome = document.getElementById("nome").value.trim();
        const numero = document.getElementById("numero").value.trim();
        const validade = document.getElementById("validade").value.trim();
        const cvv = document.getElementById("cvv").value.trim();
        
        if (!nome || !numero || !validade || !cvv) {
            alert("Por favor, preencha todos os campos corretamente.");
            return;
        }
        
        if (!/^[0-9]{16}$/.test(numero)) {
            alert("Número do cartão inválido. Deve conter 16 dígitos.");
            return;
        }
        
        if (!/^(0[1-9]|1[0-2])\/[0-9]{2}$/.test(validade)) {
            alert("Validade inválida. Use o formato MM/AA.");
            return;
        }
        
        if (!/^[0-9]{3,4}$/.test(cvv)) {
            alert("CVV inválido. Deve conter 3 ou 4 dígitos.");
            return;
        }
        
        alert("Compra realizada com sucesso!");
        form.reset();
        totalSpan.textContent = "R$ 10,00";
    });
});
