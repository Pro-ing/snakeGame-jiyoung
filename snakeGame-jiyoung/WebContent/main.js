const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

let width;
let height;
let worm;

//화면이 로드 되고 사용할 코드 입력 
window.onload = function(){
    worm = new EarthWorm();

    worm.gameReset();
    worm.setMapSize("medium");
    width = canvas.width = worm.getMapSize().width;
    height = canvas.height = worm.getMapSize().height;
    drawAll();
}

function drawAll(){
    ctx.clearRect(0, 0, worm.getWorm().x, worm.getWorm().y);
    // 맵
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, width, height);
    
    // 지렁이 머리
    let head = worm.getWorm();
    ctx.fillStyle = 'green';
    ctx.fillRect(head[0].worm1[0].x, head[0].worm1[0].y, 50, 50);

    // 지렁이 몸통
    if(wormBodyArr.length > 0){
        wormBodyArr.forEach((a)=>{
            ctx.fillStyle = 'green';
            ctx.fillRect(a.x, a.y, a.width, a.height);
        })
    }

    // 먹이
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, 50, 50);
}

document.addEventListener('keydown', (e)=>{
    if(e.code == 'ArrowLeft'){
        worm.setHeadDirection('LEFT');
        
    }else if(e.code == 'ArrowRight'){
        worm.setHeadDirection('RIGHT');

    }else if(e.code == 'ArrowDown'){
        worm.setHeadDirection('DOWN');

    }else if(e.code == 'ArrowUp'){
        worm.setHeadDirection('UP');
    }

    drawAll();
})