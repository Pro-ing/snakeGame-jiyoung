class EarthWorm {
    constructor() {
        this.width = 0;
        this.height = 0;
        this.headDirection = 'RIGHT';
        this.worm = [{"worm1":[{x:0,y:0}]}];
        this.feedCoord = [{}];
        this.obstacle = [{}];
        this.isGameOver = false;
        this.score = 0;
    }

    gameReset(){
        const foodList = ["minusScore", "disappear", "cutLength"];

        food = new Food(this.getRandomInt(), this.getRandomInt());

        this.worm = [{"worm1":[{x:this.getRandomInt(),y:this.getRandomInt()}]}];
        this.feedCoord = [{"feed1":[{x:food.x, y:food.y, type:foodList[0]}]}];

        setInterval(() => {
            this.updateWormStatus(this.isGameOver);
            drawAll();
        }, 200);
    }

    setMapSize(mapSize) {
        let size;
        if (mapSize == "small") {
            size = 300;
        } else if (mapSize == "medium") {
            size = 500;
        } else if (mapSize == "large") {
            size = 800;
        }
        this.width = size;
        this.height = size;
    }

    setWormSpeed(playSpeed) {
        if (playSpeed == "slow") {
            
        } else if (playSpeed == "medium") {
            
        } else if (playSpeed == "fast") {
            
        }
    }

    setHeadDirection(direction) {
        if(direction === 'UP' && this.headDirection === 'DOWN' ||
            direction === 'DOWN' && this.headDirection === 'UP' ||
            direction === 'LEFT' && this.headDirection === 'RIGHT' ||
            direction === 'RIGHT' && this.headDirection === 'LEFT'
        ) {
            this.headDirection != direction;
        }else {
            this.headDirection = direction;
        }
    }

    updateWormStatus(isGameOver) {
        let wormHead = this.worm[0].worm1[0];
        let feed = this.feedCoord[0].feed1[0];
        let direction = this.headDirection;
        
        if(direction === 'LEFT') {
            if(wormHead.x > 0){
                wormHead.x -= 50;
                if(this.worm.length > 0){
                    let wormBody = new WormBody(wormHead.x+50, wormHead.y);
                    wormBodyArr.push(wormBody);
                }
            }
        } else if (direction === 'RIGHT') {
            if(wormHead.x < (this.width - 50)){
                wormHead.x += 50;
                if(this.worm.length > 0){
                    let wormBody = new WormBody(wormHead.x-50, wormHead.y);
                    wormBodyArr.push(wormBody);
                }
            }
        } else if (direction === 'DOWN') {
            if(wormHead.y < (this.height - 50)){
                wormHead.y += 50;
                if(this.worm.length > 0){
                    let wormBody = new WormBody(wormHead.x, wormHead.y-50);
                    wormBodyArr.push(wormBody);
                }
            }
        } else if (direction === 'UP') {
            if(wormHead.y > 0 ){
                wormHead.y -= 50;
                if(this.worm.length > 0){
                    let wormBody = new WormBody(wormHead.x, wormHead.y+50);
                    wormBodyArr.push(wormBody);
                }
            }
        }
    
        if(wormBodyArr.length > wormLength){
            wormBodyArr.splice(0, 1);
        }

        if(wormHead.x == feed.x && wormHead.y == feed.y) {
            wormLength += 1;
            food = new Food(this.getRandomInt(), this.getRandomInt());
            this.feedCoord = [{"feed1":[{x:food.x, y:food.y, type:"minusScore"}]}];
        }

        if (wormHead.x <= 0 || wormHead.y <= 0 
                            || wormHead.x >= (this.width - 50)
                            || wormHead.y >= (this.height - 50)) {
            this.isGameOver = true;

            this.getIsGameOver(this.isGameOver);
        }
    }

    getRandomInt() {
        return 50 * Math.floor(Math.random() * 10);
    }

    getIsGameOver(result) {
        if (result == true) {
            console.log("gameOver");
            return this.isGameOver;
        }
    }

    getMapSize() {
        return { width: this.width, height: this.height };
    }

    getWorm() {
        return this.worm;
    }

    getFeedCoord() {
        return this.feedCoord;
    }

    getHeadDirection() {
        return this.headDirection;
    }

    getGameScore() {
        return this.score;
    }

    getObstacleCoord () {
        return this.obstacle;
    }
}

class WormBody {
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.width = 50;
        this.height = 50;
    }
}

class Food {
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.width = 50
        this.height = 50
    }
}

let food;
let wormBodyArr = [];
let wormLength = 0;
let score;