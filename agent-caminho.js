
var pesos_estados_ =
    [0,  -1, -1, -1,
    -1, -1, -1, -1,
    -1, -1, -1, -1,
    -1, -1, -1,  0];//a_, b_;

var CIMA_ =  -4;
var BAIXO_ = +4;
var ESQ_ =   -1;
var DIR_ =   +1;

iterarAgente(1000, 100);
//estado inicial aleatorio
    //determinar acao pro estado vizinho mais leve
    //mudar o estado
    //checa se chegou no fim
        //para

        //add estado ao caminho
        //pesa td o caminho
        //repete
function iterarAgente(qtde_rodadas, intervalo_mostrar) {
    var media_caminho;
    for (var i = 0; i < qtde_rodadas; i++) {
        var caminho = [random(1, 14)];
        var last_length = 0;
        do{
            last_length = caminho.length;

            var caminho = explorar(caminho);
        }while(caminho.length > last_length)

        //console.log(caminho.length);
        if(i == 0){
            media_caminho = caminho.length;
        }else{
            media_caminho = (media_caminho+caminho.length)/2;
        }

        //console.log(caminho.length);

        if(i%intervalo_mostrar == 0){
            //console.log(media_caminho);
            logAgente(i);
        }
    }
}
function explorar(caminho) {    
    var estado_inicial_index = caminho[caminho.length-1];
    //console.log(estado_inicial_index);
    var acao_agente_passo = acao(estado_inicial_index);
    //console.log(acao_agente_passo);
    var proximo_estado_index = estado_inicial_index+acao_agente_passo;
    //console.log(proximo_estado_index);
    if(!ehEstadoFinal(proximo_estado_index)){
        aplicarPesoEmTodosEstadosPercorridos(caminho);
        caminho.push(proximo_estado_index);
    }
    return caminho;
}
function ehEstadoFinal(estado_index) {
    return pesos_estados_[estado_index] == 0;
}
function aplicarPesoEmTodosEstadosPercorridos(caminho) {
    for (var i = 0; i < caminho.length; i++) {
        pesos_estados_[caminho[i]] -= 1;
    }
    //console.log(pesos_estados_);
}
function logAgente(index) {
    console.log(index+") matriz:");
    console.log(pesos_estados_[0], pesos_estados_[1], pesos_estados_[2], pesos_estados_[3],'\n');
    console.log(pesos_estados_[4], pesos_estados_[5], pesos_estados_[6], pesos_estados_[7],'\n');
    console.log(pesos_estados_[8], pesos_estados_[9], pesos_estados_[10], pesos_estados_[11],'\n');
    console.log(pesos_estados_[12], pesos_estados_[13], pesos_estados_[14], pesos_estados_[15],'\n');
}
function acao(estado) {
    var pesos_vizinhos = [
        pesoVizinhoCima(estado),
        pesoVizinhoBaixo(estado),
        pesoVizinhoEsquerda(estado),
        pesoVizinhoDireita(estado),
    ];
    //console.log(pesos_vizinhos);

    var index_melhor = 0;
    for (var i = 0; i < pesos_vizinhos.length; i++) {
        if(pesos_vizinhos[i] != 'x'){
            index_melhor = i;//acha um index inicial válido
            break;
        }
    }
    for (var i = 0; i < pesos_vizinhos.length; i++) {
        if(pesos_vizinhos[i] != 'x' && pesos_vizinhos[i] > pesos_vizinhos[index_melhor]){
            index_melhor = i;
        }
        //console.log(index_melhor);
    }
    var map_pesos_acao = [
        CIMA_,
        BAIXO_,
        ESQ_,
        DIR_
    ];

    return map_pesos_acao[index_melhor];
}
function pesoVizinhoCima(estado_index) {
    if((estado_index+CIMA_)>=0 && (estado_index+CIMA_) < pesos_estados_.length){
        return pesos_estados_[estado_index + CIMA_];
    }else{
        return 'x';
    }
}
function pesoVizinhoBaixo(estado_index) {
    if((estado_index+BAIXO_)>=0 && (estado_index+BAIXO_) < pesos_estados_.length){
        return pesos_estados_[estado_index + BAIXO_];
    }else{
        return 'x';
    }
}
function pesoVizinhoEsquerda(estado_index) {
    if((estado_index+ESQ_)>=0 && (estado_index+ESQ_) < pesos_estados_.length){
        return pesos_estados_[estado_index + ESQ_];
    }else{
        return 'x';
    }
}
function pesoVizinhoDireita(estado_index) {
    if((estado_index+DIR_)>=0 && (estado_index+DIR_) < pesos_estados_.length){
        return pesos_estados_[estado_index + DIR_];
    }else{
        return 'x';
    }
}
function random(inicio, fim) {
    var diferenca = fim-inicio+1;
    return inicio+Math.floor((Math.random()*diferenca));
}