const score=document.querySelector('.score');
const start=document.querySelector('.start');
const area=document.querySelector('.area');

start.addEventListener('click',gamestart);

let player= {speed: 5,score: 0};

document.addEventListener('keydown',keydown);
document.addEventListener('keyup',keyup);

let keys={ArrowUp: false,
     ArrowDown: false,
     ArrowLeft: false,
     ArrowRight: false};

function keydown(eve){
    eve.preventDefault();
    //console.log(eve.key);
    keys[eve.key]=true;
    //console.log(keys);
}

function keyup(eve){
    eve.preventDefault();
    //console.log(eve.key);
    keys[eve.key]=false;
    //console.log(keys);
}


function movelines(){
    let lines=document.querySelectorAll('.roadline');
    //console.log(lines);
    lines.forEach(function(item){
        if(item.height>=500){
            item.height-=550;
        }  
        item.height +=player.speed;
        //console.log(item.height);
        item.style.top=item.height + 'px';
    });
}

function isCollision(ele1,ele2){
    let ele1_dim=ele1.getBoundingClientRect();
    let ele2_dim=ele2.getBoundingClientRect();
    
    return !((ele1_dim.bottom<ele2_dim.top)||(ele1_dim.top>ele2_dim.bottom)||(ele1_dim.right<ele2_dim.left)||(ele1_dim.left>ele2_dim.right));
}

function endGame(){
    player.want_start=false;
    start.classList.remove('hide');
    score.classList.add('hide');
    start.innerHTML="Game Over <br><br> Your final Score is "+ player.score + "<br><br> Press here to restart the Game.";
}

function randomColor(){
    function Color(){
        let hex=Math.floor(Math.random()*256).toString(16);
        return ('0'+ hex).substr(-2);
    }
    return '#'+Color()+Color()+Color();
}


function moveenemy(car){
    let enemy=document.querySelectorAll('.enemycar');
    
    enemy.forEach(function(item){
        if(isCollision(car,item)){
            console.log("collision happen");
            endGame();
        }
        if(item.height>=500){
            item.height-=900;
        }  
        item.height +=player.speed;
        //console.log(item.height);
        item.style.top=item.height + 'px';
    });
}

function gameplay(){
    //console.log('clicked');

    let car=document.querySelector('.car');
    let road=area.getBoundingClientRect();

    //console.log(road);

    if(player.want_start==true){

    movelines();
    moveenemy(car);

    if(keys.ArrowUp==true && player.top+90+130<road.bottom){
      player.top+=player.speed;
    }
    if(keys.ArrowDown==true && player.top>0){
        player.top-=player.speed;
        console.log(player.top);
    }
    if(keys.ArrowLeft==true && player.left>0){
        player.left-=player.speed;
    }
    if(keys.ArrowRight==true && player.left<(road.width-50)){
        player.left+=player.speed;
    }

    car.style.left=player.left +"px";
    car.style.bottom=player.top +"px";

    window.requestAnimationFrame(gameplay);

    let score=document.querySelector('.score');
    score.innerHTML='Score : '+player.score++;
    }
}

function gamestart(){
    //area.classList.remove('hide');
    start.classList.add('hide');
    score.classList.remove('hide');
    area.innerHTML="";

    player.want_start=true;
    player.score=0;
    window.requestAnimationFrame(gameplay);
    
    for(let i=0;i<5;i++){
    let roadline=document.createElement('div');
    roadline.setAttribute('class','roadline');
    roadline.height=i*140;
    roadline.style.top=roadline.height +'px';
    area.appendChild(roadline);
    }

    let car=document.createElement('div');
    car.setAttribute('class','car');
    //car.innerText="hey i m your car";
    area.appendChild(car);
    
    player.top=car.offsetTop;
    player.left=car.offsetLeft;

    for(let i=0;i<3;i++){
        let enemycar=document.createElement('div');
        enemycar.setAttribute('class','enemycar');
        enemycar.height=i*300;
        enemycar.style.top=enemycar.height +'px';
        enemycar.style.backgroundColor=randomColor();
        enemycar.style.left= Math.floor(Math.random()*350)+"px";
        area.appendChild(enemycar);
    }

    //console.log("position from top",player.top);
    //console.log("position from left",player.left);
}