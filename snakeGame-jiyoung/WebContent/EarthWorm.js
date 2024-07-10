class EarthWorm {
    static foodList = ["basic", "minusScore", "disappear", "cutLength"];
    
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
        food = new Food(this.getRandomInt(), this.getRandomInt());
        time = 500;
        
        this.width = 500;
        this.height = 500;
        this.worm = [{"worm1":[{x:this.getRandomInt(),y:this.getRandomInt()}]}];
        this.feedCoord = [{"feed1":[{x:food.x, y:food.y, type:EarthWorm.foodList[this.getRandomInt(4)]}]}];
        
        interval = setInterval(() => {
            this.updateWormStatus(this.isGameOver);
            drawAll();
        }, time);
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


    // 속력 = 거리/시간????
    setWormSpeed(playSpeed) {
        if (playSpeed == "slow") {
            time = 800;
        } else if (playSpeed == "medium") {
            time = 500;
        } else if (playSpeed == "fast") {
            time = 100;
        }
        clearInterval(interval);
        interval = setInterval(() => {
            this.updateWormStatus(this.isGameOver);
            drawAll();
        }, time);
    }

    setNumberOfPlayer(playerCnt, CompterCnt) {
        if (playerCnt == "1P") {
            this.worm = [{"worm1":[{x:this.getRandomInt(),y:this.getRandomInt()}]}];
        } else if (playerCnt == "2P") {
            this.worm = [{"worm1":[{x:this.getRandomInt(),y:this.getRandomInt()}]},
                        {"worm2":[{x:this.getRandomInt(),y:this.getRandomInt()}]}];
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

        // 음식에 닿았을때
        if(wormHead.x == feed.x && wormHead.y == feed.y) {
            let feedType = this.feedCoord[0].feed1[0].type;
            if(feedType == "basic" || feedType == "disappear") {
                this.score +=1;
                wormLength += 1;
            } else if(feedType == "minusScore") {
                this.score -=1;
                wormLength += 1;
            } else if(feedType == "cutLength") {
                this.score +=1;
                if(!wormLength == 0) {
                    wormLength -= 1;
                    wormBodyArr.splice(0, 1);
                }
            }
            this.getGameScore(this.score);
            
            food = new Food(this.getRandomInt(), this.getRandomInt());
            this.feedCoord = [{"feed1":[{x:food.x, y:food.y, type:EarthWorm.foodList[this.getRandomInt(4)]}]}];
        }

        // 벽에 닿았을때
        if(wormHead.x <= 0 || wormHead.y <= 0 
                            || wormHead.x >= (this.width - 50)
                            || wormHead.y >= (this.height - 50)) {
            this.isGameOver = true;

            // this.getIsGameOver(this.isGameOver);
        }

        // 머리와 꼬리 닿았을때
        if(wormBodyArr.length > 0) {
            if(wormHead.x == wormBodyArr[0].x && wormHead.y == wormBodyArr[0].y) {
            }
        }
    }

    getRandomInt(max) {
        if(max) {
            return Math.floor(Math.random() * max);
        } else {
            return 50 * Math.floor(Math.random() * 10);
        }
    }

    getIsGameOver(result) {
        if (result == true) {
            console.log("gameOver");
            clearInterval(interval);
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
        console.log("score" + this.score);
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
let interval;
let time;
