
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
let cobraX=5,cobraY=5;
let velocidadeX=0, velocidadeY=0;
let contador=1
let grid=20;
let comeuMaca = false;
let gameover = false;
let cobraPosicao = 'baixo'

document.addEventListener('keydown',movimentaDragao)


document.addEventListener('DOMContentLoaded' ,()=>{
    containerJogo.style.width = `${width}%`;
    containerJogo.style.height = `${height}%`;
    localStorage.setItem('maiorPontuacao',0);
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
            console.log('entrou == se bateu')
            return
        }
    }

    if((arrayCobra[0][0] <= 0 || arrayCobra[0][0] > 20 || arrayCobra[0][1] <= 0 || arrayCobra[0][1] >20  )){
        gameover = true;
        console.log('entrou == bateuNoMuro')
        return
    }


    html+=`<div id='cobraCabeca' class='cobraCabeca' style="grid-area:${arrayCobra[0][1]}/${arrayCobra[0][0]};" ></div>`


for(let contador =1; contador<arrayCobra.length;contador++){
    
    html+=`<div id='cobra${contador}' class='cobraCorpo' style="grid-area:${arrayCobra[contador][1]}/${arrayCobra[contador][0]};" ></div>`

}


containerJogo.innerHTML = html
  pontuacao.innerHTML=`<h2>Pontuação: ${arrayCobra.length-1}</h2>`;
  pontuacao.innerHTML+=`<h2>Record: ${localStorage.getItem('maiorPontuacao')}</h2>`

  cobraCabeça = document.querySelector('#cobraCabeca');


   

  if(cobraPosicao == 'cima'){
      cobraCabeça.style.backgroundImage = 'url(./assets/images/dragao_frente.png)'
      
  }
  if(cobraPosicao == 'baixo'){
      cobraCabeça.style.backgroundImage= 'url(./assets/images/dragao_cima.png)'
  }
  if(cobraPosicao == 'direito'){
    cobraCabeça.style.backgroundImage= 'url(./assets/images/dragon_right.png)'
  }
  if(cobraPosicao == 'esquerdo'){
    cobraCabeça.style.backgroundImage= 'url(./assets/images/dragon_left.png)'
}


console.log(gameover)
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

    menuGame.style.display = 'none'
    setintervalId = setInterval(geraArmadilha,5000);
    setintervalId = setInterval(iniciaJogo,100);
    
}

function movimentaDragao(tecla){


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
    cobraX=5;
    cobraY=5;
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

    if(localStorage.getItem('maiorPontuacao') < arrayCobra.length-1){
        localStorage.setItem('maiorPontuacao',arrayCobra.length-1) 
    }
    modalDerrota.style.display = 'flex'
    pontuacaoDerrota.innerHTML = `<h2>${arrayCobra.length-1}</h2>`
    
}

function geraComida(){
    comidaX = Math.floor(Math.random(grid)*grid)+1;
    comidaY =  Math.floor(Math.random(grid)*grid)+1;
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



