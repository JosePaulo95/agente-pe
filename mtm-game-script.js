


var secao_ativa = 1;

criaElementosDOM();

function criaElementosDOM(){
    var respostas_comport = document.getElementById("respostas");
    var pergunta_elm = document.getElementById("pergunta");
    var score_antigo = getUrlParam('score', 0);
    var score_novo = getUrlParam('score', 0);
    score_novo++;

    var parcela1, parcela2, resposta_certa_num;

    parcela1 = (score_novo)*random(1,10);
    parcela2 = (score_novo)*random(1,10);
    resposta_certa_num = parcela1+parcela2;

    pergunta_elm.innerHTML = "Quanto é "+parcela1+"+"+parcela2+"?";

    var respostas_dom_array = [];
    respostas_dom_array.push( criarRespostaDOM(resposta_certa_num, "c8-pergunta.html?score="+score_novo) );
    respostas_dom_array.push( criarRespostaDOM(random(1, resposta_certa_num-1), "c8-resposta-errada.html?score="+score_antigo) );
    respostas_dom_array.push( criarRespostaDOM(random(resposta_certa_num+1, Math.min(21,resposta_certa_num+5)), "c8-resposta-errada.html?score="+score_antigo) );

    console.log(respostas_dom_array);

    respostas_dom_array = shuffle(respostas_dom_array);

    console.log(respostas_dom_array);

    respostas_comport.appendChild(respostas_dom_array[0]);
    respostas_comport.appendChild(document.createElement("br")); 
    respostas_comport.appendChild(respostas_dom_array[1]);
    respostas_comport.appendChild(document.createElement("br")); 
    respostas_comport.appendChild(respostas_dom_array[2]);
}
function shuffle(array) {
    for (var i = 0; i < 30; i++) {
        var index1 = random(1, array.length)-1;
        var index2 = random(1, array.length)-1;
    
        var aux = array[index1];
        array[index1] = array[index2];
        array[index2] = aux;
    }

    return array;
}
function criarRespostaDOM(valor, link) {
    var resp = document.createElement("a");
    resp.href = link;
    var resp_txt = document.createTextNode(valor);
    resp.appendChild(resp_txt);
    return resp;
}
function random(inicio, fim) {
    var diferenca = fim-inicio+1;
    return inicio+Math.floor((Math.random()*diferenca));
}
function respondeu(){
	var score = getUrlParam('score', 0);
	score ++;
	window.location.replace("c8-pergunta.html?score="+score);
}

function getUrlParam(parameter, defaultvalue){
    var urlparameter = defaultvalue;
    if(window.location.href.indexOf(parameter) > -1){
        urlparameter = getUrlVars()[parameter];
        }
    return urlparameter;
}
function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}