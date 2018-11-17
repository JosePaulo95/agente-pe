
var a_, b_;
var a_correto_, b_correto_;
var taxa_aprendizado_ = 0.5;

iterarAgente(10, 1);

function iterarAgente(qtde_rodadas, intervalo_mostrar) {
    inicializar_agente_ambiente();
    for (var i = 0; i < qtde_rodadas; i++) {
        var estado_atual = random(0, 10);

        var acao_agente = acao(estado_atual);

        var diferenca = feedbackAcao(acao_agente, estado_atual);

        console.log("diferenca = "+diferenca);
        consertarParametros(diferenca);

        if(i%intervalo_mostrar == 0){
            logAgente(i, estado_atual, diferenca);
        }
    }
}
function logAgente(index, estado, nota) {
    console.log(index+") a:"+a_+", b: "+b_+" => "+estado+" = "+nota)
}
function feedbackAcao(acao, estado) {
    return acao-oraculo(estado);
}
function oraculo(estado) {
    return (a_correto_*estado) + b_correto_;
}
function consertarParametros(diferenca, i=0){
    i++;
    if(i<10){
        var diferenca_inicial = diferenca;

        if(diferenca < 0){
            console.log("diferenca negativa a- b+");
            a_ = Math.max(a_-1, 0);
            b_ = Math.min(b_+1, 10);
        }
        if(diferenca > 0){
            console.log("diferenca positiva a+ b-");
            a_ = Math.min(a_+1,10);
            b_ = Math.max(b_-1,0);
        }
    }
}
function acao(estado) {
    return (a_*estado) + b_;
}
function inicializar_agente_ambiente() {
    a_ = 1;//random(0, 10);
    b_ = 8;//random(0, 10);

    a_correto_ = 3;//random(0, 10);
    b_correto_ = 2;//random(0, 10);

    console.log("par correto: "+a_correto_+", "+b_correto_);
    console.log("par inicial: "+a_+", "+b_);
}
function random(inicio, fim) {
    var diferenca = fim-inicio+1;
    return inicio+Math.floor((Math.random()*diferenca));
}