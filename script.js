/* =============================== */
/*      CALCULADORA PADRÃO        */
/* =============================== */

function insert(num) {
    const res = document.getElementById('resultado1');
    res.innerHTML += num;
}

function clean() {
    document.getElementById('resultado1').innerHTML = "";
}

function back() {
    const res = document.getElementById('resultado1');
    res.innerHTML = res.innerHTML.slice(0, -1);
}

function calcular() {
    const res = document.getElementById('resultado1');
    try {
        if (res.innerHTML.trim() !== "") {
            res.innerHTML = eval(res.innerHTML);
        } else {
            res.innerHTML = "Nada para calcular";
        }
    } catch {
        res.innerHTML = "Erro";
    }
}

/* =============================== */
/*     CONVERSOR DE MOEDAS        */
/* =============================== */

// Elementos
const valorDigitado = document.querySelector('#valorEmReal');
const moedaSelecionada = document.getElementsByName('moedaEstrangeira');
const aviso = document.querySelector('#aviso');
const btnConverter = document.querySelector('#btnConverter');
const btnLimpar = document.querySelector('#btnLimpar');

// Cotação (valores fixos)
const valorDoDolar   = 4.6175001;
const valorDoEuro    = 5.0765003;
const valorDaLibra   = 6.0567995;
const valorDoBitcoin = 214570.54;

let valorEmReal = 0;
let moedaEstrangeira = '';
let moedaConvertida = 0;

// Exibir mensagem formatada
function mensagemFormatada(valor) {
    aviso.textContent =
        `O valor ${valorEmReal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} convertido em ${moedaEstrangeira} é ${valor}`;
}

// Ativar/Desativar botão dinamicamente
valorDigitado.addEventListener('input', () => {
    if (valorDigitado.value > 0) {
        btnConverter.disabled = false;
        btnConverter.style.opacity = "1";
    } else {
        btnConverter.disabled = true;
        btnConverter.style.opacity = "0.5";
    }
});

// Converter
btnConverter.addEventListener('click', () => {
    valorEmReal = parseFloat(valorDigitado.value);

    moedaEstrangeira = "";
    for (let radio of moedaSelecionada) {
        if (radio.checked) moedaEstrangeira = radio.value;
    }

    if (!moedaEstrangeira) {
        aviso.textContent = "Escolha uma moeda estrangeira";
        return;
    }

    switch (moedaEstrangeira) {
        case 'Dólar':
            moedaConvertida = valorEmReal / valorDoDolar;
            mensagemFormatada(moedaConvertida.toLocaleString('en-US', { style: 'currency', currency: 'USD' }));
            break;

        case 'Euro':
            moedaConvertida = valorEmReal / valorDoEuro;
            mensagemFormatada(moedaConvertida.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' }));
            break;

        case 'Libra':
            moedaConvertida = valorEmReal / valorDaLibra;
            mensagemFormatada(moedaConvertida.toLocaleString('en-GB', { style: 'currency', currency: 'GBP' }));
            break;

        case 'Bitcoins':
            moedaConvertida = valorEmReal / valorDoBitcoin;
            mensagemFormatada(parseFloat(moedaConvertida).toFixed(5));
            break;
    }
});

// Botão limpar
btnLimpar.addEventListener('click', () => {
    valorDigitado.value = "";
    valorDigitado.focus();

    aviso.textContent = 'Digite o valor, escolha a moeda e converter';

    moedaSelecionada.forEach(m => m.checked = false);
});
