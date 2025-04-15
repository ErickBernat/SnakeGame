
let menuGame = document.getElementById('menuGame');
let containerJogo = document.querySelector('.containerJogo');
let botoes =  document.querySelectorAll('.botoes');
let pontuacao =  document.getElementById('pontuacao');
let regras = document.querySelector('.containerRegras')
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


document.addEventListener('DOMContentLoaded' ,()=>{
    containerJogo.style.width = `${width}%`;
    containerJogo.style.height = `${height}%`;
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
            <button onclick="adidionaEventoBotoes()" id="botaoStart" class="botoes">Start</button>
            <button onclick="visualizacaoModaRegras()" class="botoes">Regras</button>
    </div>
    </div>
    `
})


geraComida()

function iniciaJogo(){
let html;

if(gameover){
    reiniciaJogo()
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
        }
    }

    if((arrayCobra[0][0] <= 0 || arrayCobra[0][0] >= 30 || arrayCobra[0][1] <= 0 || arrayCobra[0][1] >=30  )){
        gameover = true;
    }


    html+=`<div id='cobra' class='cobraCabeca' style="grid-area:${arrayCobra[0][1]}/${arrayCobra[0][0]};" ></div>`
   
for(let contador =1; contador<arrayCobra.length;contador++){
    
    html+=`<div id='cobra' class='cobra' style="grid-area:${arrayCobra[contador][1]}/${arrayCobra[contador][0]};" ></div>`
}


containerJogo.innerHTML = html
  pontuacao.innerHTML=`<h2>pontuacao: ${arrayCobra.length-1}</h2>`;
}

function fechaRegras(){
    console.log('apertou')
   
}

function visualizacaoModaRegras(){
    console.log('apertou')
     regras.style.display = 'flex'
     console.log(regras)
}

function adidionaEventoBotoes(){
    menuGame.style.display = 'none'
    setintervalId = setInterval(geraArmadilha,5000);
    setintervalId = setInterval(iniciaJogo,200);
}



document.addEventListener('keydown',movimentaDragao)

function movimentaDragao(tecla){
    console.log(tecla.key)

    setTimeout(() => {
        
    }, 100);

    if(tecla.key == 'ArrowUp' && velocidadeY != 1){
        velocidadeX = 0
        velocidadeY = -1
    }
    if(tecla.key == 'ArrowDown' && velocidadeY != -1){
        velocidadeX = 0
        velocidadeY = 1
    }
    if(tecla.key == 'ArrowLeft' && velocidadeX != 1){
        velocidadeX = -1
        velocidadeY = 0
    }
    if(tecla.key == 'ArrowRight' && velocidadeX != -1){
        velocidadeX = 1
        velocidadeY =0
    }
}


function reiniciaJogo(){
    gameover = false
    alert('voce Perdeu')
    location.reload()
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



