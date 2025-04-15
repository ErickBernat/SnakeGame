
let menuGame = document.getElementById('menuGame');
let containerJogo = document.querySelector('.containerJogo');
let botoes =  document.querySelectorAll('.botoes');
let arrayCobra = [];
let gameover = false;
let macaX=0, macaY=0;

let setintervalId =0;
let cobraX=5,cobraY=5;
let velocidadeX=0, velocidadeY=0;


document.addEventListener('DOMContentLoaded' ,()=>{

    menuGame.innerHTML+=`
    <div class="tituloGame">
                        <h2>Snake Game</h2>
                        <div class="version">
                            <h3>Version Chinese</h3>
                        </div>
                        
                    </div>
                    <img src="./assets/images/pngtree-chinese-dragon-culture-mythological-animal-vector-png-image_23483686.png" alt="">
                    <div class="botoesGame">
                        <button onclick="adidionaEventoBotoes()" id="botaoStart" class="botoes">Start</button>
                        <button class="botoes">Menu</button>
                    </div>
    `

})


geraMaca()
adicionaMuros()
function iniciaJogo(){
let html;


if(gameover){
    reiniciaJogo()
    return
}
    html =`
        <div id='maca' class='maca' style="grid-area:${macaY}/${macaX};" ></div>
    `   

    if(cobraX === macaX && cobraY === macaY){
        geraMaca();
 
        let ultimaParte = arrayCobra[arrayCobra.length - 1];
        arrayCobra.push([ultimaParte]);
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

    if((arrayCobra[0][0] < 0 || arrayCobra[0][0] >30 || arrayCobra[0][1] < 0 || arrayCobra[0][1] >30  )){
        gameover = true;
    }


    html+=`<div id='cobra' class='cobraCabeca' style="grid-area:${arrayCobra[0][1]}/${arrayCobra[0][0]};" ></div>`

for(let contador =1; contador<arrayCobra.length;contador++){
    
    html+=`<div id='cobra' class='cobra' style="grid-area:${arrayCobra[contador][1]}/${arrayCobra[contador][0]};" ></div>`
}


containerJogo.innerHTML = html

}

function adidionaEventoBotoes(){
    menuGame.style.display = 'none'
}

function adicionaMuros(){
    containerJogo.innerHTML+=`
        <div id='muro${1}' class='muro' style="grid-area:${10}/${10}};"></div>
        `
    for (let cont =0 ;cont <=30 ;cont++){
        console.log('oi')
        
    }
}

document.addEventListener('keydown',movimentaCobra)

function movimentaCobra(tecla){
    console.log(tecla.key)

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

function geraMaca(){
    macaX = Math.floor(Math.random(30)*30)+1;
    macaY =  Math.floor(Math.random(30)*30)+1;
}

setintervalId = setInterval(iniciaJogo,100)