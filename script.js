
let menuGame = document.getElementById('menuGame');
let containerJogo = document.querySelector('.containerJogo');
let botoes =  document.querySelectorAll('.botoes');
let pontuacao =  document.getElementById('pontuacao');
let pergaminho = document.getElementById('pergaminho');
let regras = document.querySelector('.containerRegras');
let modalDerrota = document.querySelector('#derrota')
let cobraCabeça = document.querySelector('#cobraCabeca');
let containerItensPergaminho =  document.querySelector('#containerItensPergaminho');
let pontuacaoDerrota = document.getElementById('pontuacaoDerrota')
let arrayCobra = [];
let comidaX=0, comidaY=0;
let armadilhaX=0, armadilhaY=0;
let width = 50, height= 80;
let setintervalId =0;
let setintervalId2 =0;
let cobraX=10,cobraY=10;
let velocidadeX=0, velocidadeY=0;
let contador=1
let grid=20;
let comeuMaca = false;
let gameover = false;
let cobraPosicao = 'baixo'
let jogoAtivo = true;



document.addEventListener('DOMContentLoaded' ,()=>{

    menuGame.innerHTML+=`
                          
    <div class="infoMenu">
                    <div class="tituloGame">
        <h2>Snake Game</h2>
        <div class="version">
            <h3>Version Chinese</h3>
        </div>                    
    </div>
        <img src="./assets/images/pngtree-chinese-dragon-culture-mythological-animal-vector-png-image_23483686.png" alt="">
    <div class="botoesGame">
            <button onclick="adidionaEventoIniciaJogo()" id="botaoStart" class="botoes">Start</button>
            <button onclick="visualizacaoModaRegras()" class="botoes">Regras</button>
    </div>
    </div>
    `
});
document.addEventListener('keydown',movimentaDragao);

geraComida()
geraArmadilha()

function iniciaJogo(){
let html;


if(gameover == true){
    gameOver()
    return
}


    html =`
        <div id='comida' class='comida' style="grid-area:${comidaY}/${comidaX};" ></div>
    `   
    html +=`
    <div id='armadilha' class='armadilha' style="grid-area:${armadilhaY}/${armadilhaX};" ></div>
    ` 

    if(cobraX ===comidaX && cobraY === comidaY){
        geraComida();
      
        let ultimaParte = arrayCobra[arrayCobra.length - 1];
        arrayCobra.push([ultimaParte]);
    }

    if(cobraX === armadilhaX && cobraY === armadilhaY){
        gameover = true
        console.log('entrou == comida')
        return
    }

    for(let i = arrayCobra.length-1 ; i > 0; i--){
        arrayCobra[i] = arrayCobra[i-1]
    }
    
    arrayCobra[0]= [cobraX,cobraY];  

    cobraX += velocidadeX;
    cobraY += velocidadeY;
   
    
    for(let i=1; i< arrayCobra.length; i++){
        if(arrayCobra[0][0] == arrayCobra[i][0] && arrayCobra[0][1] == arrayCobra[i][1]){
            gameover = true
            return
        }
    }

    if((arrayCobra[0][0] <= 0 || arrayCobra[0][0] > 20 || arrayCobra[0][1] <= 0 || arrayCobra[0][1] >20  )){
        gameover = true;
        return
    }


    html+=`<div id='dragaoCabeca' class='dragaoCabeca' style="grid-area:${arrayCobra[0][1]}/${arrayCobra[0][0]};" ></div>`

    for (let contador = 1; contador < arrayCobra.length; contador++) {
        html += `<div id='dragao${contador}' class='dragaoCorpo' style="grid-area:${arrayCobra[contador][1]}/${arrayCobra[contador][0]};"></div>`;
    }


containerJogo.innerHTML = html

  pontuacao.innerHTML=`<h2>Pontuação: ${arrayCobra.length-1}</h2>`;
  pontuacao.innerHTML+=`<h2>Record: ${localStorage.getItem('maiorPontuacao')}</h2>`

  cobraCabeça = document.querySelector('#dragaoCabeca');


   

  if(cobraPosicao == 'cima'){
    cobraCabeça.style.backgroundImage = 'url(./assets/images/dragao_frente.png)'
    cobraCabeça.style.backgroundPosition = '-7px -7px';
  }
  if(cobraPosicao == 'baixo'){
    cobraCabeça.style.backgroundImage= 'url(./assets/images/dragao_cima.png)'
  
    cobraCabeça.style.backgroundPosition = '-10px -21px';
  }
  if(cobraPosicao == 'direito'){
    cobraCabeça.style.backgroundImage= 'url(./assets/images/dragon_right.png)'
    cobraCabeça.style.backgroundPosition = '-15px -20px';
  }
  if(cobraPosicao == 'esquerdo'){
    cobraCabeça.style.backgroundImage= 'url(./assets/images/dragon_left.png)'
    cobraCabeça.style.backgroundPosition = '-6px -10px'
}

}

function fechaRegras(){
    regras.style.display = 'none' 
}

function visualizacaoModaRegras(){
     regras.style.display = 'flex'  
}

regras.addEventListener('click',()=>{
    regras.style.display = 'none'

 })

function adidionaEventoIniciaJogo(){
    jogoAtivo = true
    menuGame.style.display = 'none'
    setintervalId = setInterval(geraArmadilha,5000);
    setintervalId = setInterval(iniciaJogo,100);
    
}
let podeMover = true; // controla se pode ou não mover
function movimentaDragao(tecla){
    if (!jogoAtivo || !podeMover) {
        return;
    }

    // Bloqueia movimentações por 100ms
    podeMover = false;
    setTimeout(() => {
        podeMover = true;
    }, 100); // tempo em milissegundos

    if(jogoAtivo == false){
        return
    }

    if(teclaAtiva = true){

    }

    if(tecla.key == 'ArrowUp' && velocidadeY != 1){
        velocidadeX = 0
        velocidadeY = -1
        cobraPosicao = 'cima'

    }
    if(tecla.key == 'ArrowDown' && velocidadeY != -1){
        velocidadeX = 0
        velocidadeY = 1
        cobraPosicao = 'baixo'
    }
    if(tecla.key == 'ArrowLeft' && velocidadeX != 1){
        velocidadeX = -1
        velocidadeY = 0
        cobraPosicao = 'esquerdo'
    }
    if(tecla.key == 'ArrowRight' && velocidadeX != -1){
        velocidadeX = 1
        velocidadeY =0
         cobraPosicao = 'direito'
    }
}

function reiniciaJogo(){
    gameover = false
    jogoAtivo = true
    cobraX=10;
    cobraY=10;
    velocidadeX=0, velocidadeY=0;
    arrayCobra = []
    geraArmadilha()
    geraComida()
    modalDerrota.style.display = 'none'
    iniciaJogo()
}

function voltaMenu(){
    location.reload()
}

function gameOver(){
    gameover = false
    jogoAtivo = false; 

    if(localStorage.getItem('maiorPontuacao') < arrayCobra.length-1){
        localStorage.setItem('maiorPontuacao',arrayCobra.length-1) 
    }

    modalDerrota.style.display = 'flex'
    pontuacaoDerrota.innerHTML = `<h2>${arrayCobra.length-1}</h2>`
    
}

function geraComida(){
    comidaX = Math.floor(Math.random(grid)*grid)+1;
    comidaY =  Math.floor(Math.random(grid)*grid)+1;
    for(let contador=0; contador< arrayCobra.length; contador++){
        if(arrayCobra[contador][0] == comidaX && arrayCobra[contador][1] == comidaY){
            geraArmadilha()
        }
    }
    if(comidaX == armadilhaX || comidaY == armadilhaY){
        geraComida()
    }
}
function geraArmadilha(){
    armadilhaX = Math.floor(Math.random(grid)*grid)+1;
    armadilhaY =  Math.floor(Math.random(grid)*grid)+1;
    for(let i=1; i< arrayCobra.length; i++){
        if(arrayCobra[0][0] == armadilhaX && arrayCobra[0][1] == armadilhaY){
            geraArmadilha()
        }
    }

    if(armadilhaX == comidaX || armadilhaY == comidaY){
        geraArmadilha()
    }
}



