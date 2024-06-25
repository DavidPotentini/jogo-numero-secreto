let listaDeNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTexto(tag, mensagem){
    let texto = window.document.querySelector(tag);
    texto.innerHTML = mensagem;
    responsiveVoice.speak(mensagem, 'Brazilian Portuguese Female', {rate: 1.2});
}

function exibirMensagemInicial(){
    exibirTexto('h1', 'Jogo do numero secreto');
    exibirTexto('p', 'Escolha um numero de 1 a 10');
}

exibirMensagemInicial();

function gerarNumeroAleatorio(){
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

    if(quantidadeDeElementosNaLista == numeroLimite){
        listaDeNumerosSorteados = [];
    }
    
    if(listaDeNumerosSorteados.includes(numeroEscolhido)){
        return gerarNumeroAleatorio();
    }else{
        listaDeNumerosSorteados.push(numeroEscolhido);
        return numeroEscolhido;
    }
}

function verificarChute(){
    let chute = window.document.querySelector('input').value;
    if(chute == numeroSecreto){
        exibirTexto('h1', 'Acertou!');
        let palavraTentativa = tentativas > 1? 'tentativas': 'tentativa';
        let mensagemTentativas = `Você descobriu o numero secreto com ${tentativas} ${palavraTentativa}!`;
        exibirTexto('p', mensagemTentativas);
        window.document.getElementById('reiniciar').removeAttribute('disabled');
    }else{
        if(chute > numeroSecreto){
            exibirTexto('p', 'O número secreto é menor');
        }else{
            exibirTexto('p', 'O número secreto é maior');
        }
        tentativas++;
        limparTexto();
    }
    
}

function limparTexto(){
    chute = window.document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo(){
    numeroSecreto = gerarNumeroAleatorio();
    exibirMensagemInicial();
    limparTexto();
    tentativas = 1; 
    window.document.getElementById('reiniciar').setAttribute('disabled', true);
}