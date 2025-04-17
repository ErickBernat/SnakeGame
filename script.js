let menuGame = document.getElementById('menuGame');
let containerJogo = document.querySelector('.containerJogo');
let pontuacao =  document.getElementById('pontuacao');
let pergaminho = document.getElementById('pergaminho');
let regras = document.querySelector('.containerRegras');
let modalDerrota = document.querySelector('#derrota')
let dragaoCabeça = document.querySelector('#dragaoCabeca');
let containerItensPergaminho =  document.querySelector('#containerItensPergaminho');
let pontuacaoDerrota = document.getElementById('pontuacaoDerrota')
let arrayDragao = [];
let comidaX=0, comidaY=0;
let armadilhaX=0, armadilhaY=0;
let width = 50, height= 80;
let setintervalId =0;
let setintervalIdArmadilha =0;
let cobraX=10,cobraY=10;
let velocidadeX=0, velocidadeY=0;
let grid=20;
let comeuMaca = false;
let gameover = false;
let cobraDirecao = 'baixo'
let jogoAtivo = true;
let podeMover = true;



document.addEventListener('DOMContentLoaded' ,()=>{

    menuGame.innerHTML+=`
    <div class="infoMenu">
                    <div class="tituloGame">
        <h2>Snake Game</h2>
        <div class="version">
            <h3>Version Chinese</h3>
        </div>                    
    </div>
        <img src="./assets/images/DragaoMenu.webp" alt="imagemDragao" width="800" height="400">
    <div class="botoesGame">
            <button onclick="adicionaEventoIniciaJogo()" id="botaoStart" class="botoes">Start</button>
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
      
        let ultimaParte = arrayDragao[arrayDragao.length - 1];
        arrayDragao.push([ultimaParte]);
    }

    if(cobraX === armadilhaX && cobraY === armadilhaY){
        gameover = true
        return
    }

    for(let i = arrayDragao.length-1 ; i > 0; i--){
        arrayDragao[i] = arrayDragao[i-1]
    }
    
    arrayDragao[0]= [cobraX,cobraY];  

    cobraX += velocidadeX;
    cobraY += velocidadeY;
   
    
    for(let i=1; i< arrayDragao.length; i++){
        if(arrayDragao[0][0] == arrayDragao[i][0] && arrayDragao[0][1] == arrayDragao[i][1]){
            gameover = true
            return
        }
    }

    if((arrayDragao[0][0] <= 0 || arrayDragao[0][0] > 20 || arrayDragao[0][1] <= 0 || arrayDragao[0][1] >20  )){
        gameover = true;
        return
    }


    html+=`<div id='dragaoCabeca' class='dragaoCabeca' style="grid-area:${arrayDragao[0][1]}/${arrayDragao[0][0]};" ></div>`

    for (let contador = 1; contador < arrayDragao.length; contador++) {
        html += `<div id='dragao${contador}' class='dragaoCorpo' style="grid-area:${arrayDragao[contador][1]}/${arrayDragao[contador][0]};"></div>`;
    }


containerJogo.innerHTML = html

  pontuacao.innerHTML=`<h2>Pontuação: ${arrayDragao.length-1}</h2>`;


  

  dragaoCabeça = document.querySelector('#dragaoCabeca');


   

  if(cobraDirecao == 'cima'){
    dragaoCabeça.style.backgroundImage = 'url(./assets/images/dragao_frente.png)'
    dragaoCabeça.style.backgroundPosition = '-7px -7px';
  }
  if(cobraDirecao == 'baixo'){
    dragaoCabeça.style.backgroundImage= 'url(./assets/images/dragao_cima.png)'
  
    dragaoCabeça.style.backgroundPosition = '-10px -21px';
  }
  if(cobraDirecao == 'direito'){
    dragaoCabeça.style.backgroundImage= 'url(./assets/images/dragon_right.png)'
    dragaoCabeça.style.backgroundPosition = '-15px -20px';
  }
  if(cobraDirecao == 'esquerdo'){
    dragaoCabeça.style.backgroundImage= 'url(./assets/images/dragon_left.png)'
    dragaoCabeça.style.backgroundPosition = '-6px -10px'
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

function adicionaEventoIniciaJogo(){
    jogoAtivo = true
    menuGame.style.display = 'none'
    setintervalIdArmadilha = setInterval(geraArmadilha,5000);
    setintervalId = setInterval(iniciaJogo,200);
    
}

function movimentaDragao(tecla){
    if (!jogoAtivo || !podeMover) {
        return;
    }

    podeMover = false;
    setTimeout(() => {
        podeMover = true;
    }, 200);

    if(jogoAtivo == false){
        return
    }

    if(teclaAtiva = true){

    }

    if(tecla.key == 'ArrowUp' && velocidadeY != 1){
        velocidadeX = 0
        velocidadeY = -1
        cobraDirecao = 'cima'

    }
    if(tecla.key == 'ArrowDown' && velocidadeY != -1){
        velocidadeX = 0
        velocidadeY = 1
        cobraDirecao = 'baixo'
    }
    if(tecla.key == 'ArrowLeft' && velocidadeX != 1){
        velocidadeX = -1
        velocidadeY = 0
        cobraDirecao = 'esquerdo'
    }
    if(tecla.key == 'ArrowRight' && velocidadeX != -1){
        velocidadeX = 1
        velocidadeY =0
         cobraDirecao = 'direito'
    }
}

function reiniciaJogo(){
    gameover = false
    jogoAtivo = true
    cobraX=10;
    cobraY=10;
    velocidadeX=0, velocidadeY=0;
    arrayDragao = []
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

    if(localStorage.getItem('maiorPontuacao') < arrayDragao.length-1){
        localStorage.setItem('maiorPontuacao',arrayDragao.length-1) 
    }

    modalDerrota.style.display = 'flex'
    pontuacaoDerrota.innerHTML = `<h2>${arrayDragao.length-1}</h2>`
    
}

function geraComida(){
    comidaX = Math.floor(Math.random(grid)*grid)+1;
    comidaY =  Math.floor(Math.random(grid)*grid)+1;
    for(let contador=0; contador< arrayDragao.length; contador++){
        if(arrayDragao[contador][0] == comidaX && arrayDragao[contador][1] == comidaY){
            geraComida()
        }
    }
    if(comidaX == armadilhaX && comidaY == armadilhaY){
        geraComida()
    }
}
function geraArmadilha(){
    armadilhaX = Math.floor(Math.random(grid)*grid)+1;
    armadilhaY =  Math.floor(Math.random(grid)*grid)+1;
    for(let contador=1; contador< arrayDragao.length; contador++){
        if(arrayDragao[contador][0] == armadilhaX && arrayDragao[contador][1] == armadilhaY){
            geraArmadilha()
        }
    }

    if(armadilhaX == comidaX && armadilhaY == comidaY){
        geraArmadilha()
    }
}



