
let menuGame = document.getElementById('menuGame');
let containerJogo = document.querySelector('.containerJogo');
let botoes =  document.querySelectorAll('.botoes');
let arrayCobra = [];
let gameover = false;
let macaX=0, macaY=0;
let bombaX=0, bombaY=0;
let width = 50, height= 80;
let setintervalId =0;
let setintervalId2 =0;
let cobraX=5,cobraY=5;
let velocidadeX=0, velocidadeY=0;
let comeuMaca = false;
let contador=1
let grid=30;

document.addEventListener('DOMContentLoaded' ,()=>{
    containerJogo.style.width = `${width}%`;
    containerJogo.style.height = `${height}%`;

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

function iniciaJogo(){
let html;

if(gameover){
    reiniciaJogo()
    return
}





    html =`
        <div id='maca' class='maca' style="grid-area:${macaY}/${macaX};" ></div>
    `   
    html +=`
    <div id='bomba' class='bomba' style="grid-area:${bombaY}/${bombaX};" ></div>
` 
      html+=`<div id='muro' class='muro' style=" grid-area:${1}/${7};" ></div>`

    if(cobraX === macaX && cobraY === macaY){
            console.log('Comeu')
            width+=1
            height+=1
            grid+=3
            containerJogo.style.width = `${width}%`;
            containerJogo.style.height = `${height}%`;

        geraMaca();
 
        let ultimaParte = arrayCobra[arrayCobra.length - 1];
        arrayCobra.push([ultimaParte]);
    }

    if(cobraX === bombaX && cobraY === bombaY){
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
    console.log(arrayCobra[0][0])

    if((arrayCobra[0][0] <= 0 || arrayCobra[0][0] >= 30 || arrayCobra[0][1] <= 0 || arrayCobra[0][1] >=30  )){
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
    macaX = Math.floor(Math.random(grid)*grid)+1;
    macaY =  Math.floor(Math.random(grid)*grid)+1;
}
function geraBomba(){
    bombaX = Math.floor(Math.random(grid)*grid)+1;
    bombaY =  Math.floor(Math.random(grid)*grid)+1;
}


function verificaComeuMaca(){
    console.log('entrou')
    console.log(comeuMaca)
        console.log('naoComeu')
        width-=contador
        height-=contador
        grid-=3;
        containerJogo.style.width = `${width}%`;
        containerJogo.style.height = `${height}%`;

    
}

setintervalId = setInterval(geraBomba,5000);

setintervalId = setInterval(iniciaJogo,200);
setintervalId = setInterval(verificaComeuMaca,3000);