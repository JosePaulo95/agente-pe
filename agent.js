
var notas_estados_ = {};
var TAB_VAZIO = "vvvvvvvvv";
var vazio = "v";

//var a = "12345";

//console.log(jogadasPossiveis("xxxxxxxx-", "o"));

iterarAgente(1);
//estado inicial aleatorio/tabuleiro vazio
    //determinar acao pro estado vizinho mais leve
    //mudar o estado
    //checa se venceu
        //coloca +1 em todos os estados
    //checa se perdeu
        //coloca -1 em todos os estados
    //checa se deu velha
        //coloca 0.5 em todos os estados
function iterarAgente(qtde_rodadas) {
    //for (var i = 0; i < qtde_rodadas; i++) {
        var caminho = [TAB_VAZIO];

        for (var i = 0; i < 10; i++) {
        //while(!ehFimDeJogo(caminho)){
            var caminho = explorar(caminho);
        }
    //}
}
function explorar(caminho) {
    var estado_inicial = caminho[caminho.length-1];
    //logTab(estado_inicial);
    var valor_final_de_jogo = valorEstadoFinal(estado_inicial, "x");

    if(valor_final_de_jogo == 0){
        var proximo_estado = jogada(estado_inicial, "x");
        caminho.push(proximo_estado);
    }{
        aplicarPesoEmTodosEstadosPercorridos(caminho, valor_final_de_jogo);
    }
    return caminho;
}
function logTab(estado) {
    console.log(estado[0], estado[1], estado[2], '\n',
                estado[3], estado[4], estado[5], '\n',
                estado[6], estado[7], estado[8], '\n');
}
function ehFimDeJogo(jogadas) {
    return valorEstadoFinal(jogadas[jogadas.length-1]) != 0;
}
function valorEstadoFinal(estado, marca) {
    //return 0.5;
    for (var i = 0; i < estado.length; i++) {
        if(estado[i] == "-"){
            return 0;
        }
    }
    return 1;
}
function aplicarPesoEmTodosEstadosPercorridos(caminho, valor_final_de_jogo) {
    console.log(notas_estados_);
    for (var i = 0; i < caminho.length; i++) {
        notas_estados_[caminho[i]] = valor_final_de_jogo;
    }
    for (var i = 0; i < caminho.length; i++) {
        console.log(notas_estados_[caminho[i]]);
    }
}
function jogada(estado, marca) {
    var vizinhos_possiveis = jogadasPossiveis(estado, marca);
    var notas_vizinhos = [];
    for (var i = 0; i < notas_vizinhos.length; i++) {
        notas_vizinhos.push(valorEstado(vizinhos_possiveis[i]));
    }
    var index_melhor = 0;
    for (var i = 0; i < notas_vizinhos.length; i++) {
        if(notas_vizinhos[i] > notas_vizinhos[index_melhor]){
            index_melhor = i;
        }
    }
    return vizinhos_possiveis [index_melhor];
}
function valorEstado(estado) {
    return notas_estados_[estado];
}
function jogadasPossiveis(estado, marca) {
    var jogadas_possiveis = [];
    for (var i = 0; i < 9; i++) {
        if(estado.charAt(i) == vazio){
            jogadas_possiveis.push(
                estado.substring(0,i)+marca+estado.substring(i+1, estado.length)
            );
        }
    }
    return jogadas_possiveis;
}
function random(inicio, fim) {
    var diferenca = fim-inicio+1;
    return inicio+Math.floor((Math.random()*diferenca));
}