import { NumberUtil } from './Util/NumberUtil.js';
import { Food } from './Food.js';
import { WormBody } from './WormBody.js';

class EarthWorm{
    static mapSize = {"small": 300, "medium": 500, "large": 800};
    static playSpeed = {"slow": 800, "medium": 500, "fast": 100};
    food;
    time;
    interval;
    random = new NumberUtil();

    constructor() {
        this.width = 0;
        this.height = 0;
        this.headDirection = 'RIGHT';
        this.worm = [{"worm1":[{x:0,y:0}]}];
        this.feedCoord = [{}];
        this.obstacle = [{}];
        this.isGameOver = false;
        this.score = 0;
        this.wormBodyArr = [];
        this.wormLength = 0;
    }

    setMapSize(size) {
        this.width = EarthWorm.mapSize[size];
        this.height = EarthWorm.mapSize[size];
    }
    
    setWormSpeed(speed) {
        EarthWorm.time = EarthWorm.playSpeed[speed];

        clearInterval(EarthWorm.interval);
        EarthWorm.interval = setInterval(() => {
            this.updateWormStatus(this.isGameOver);
            drawAll();
        }, EarthWorm.time);
    }

    gameStart(){
        EarthWorm.food = new Food(this.random.getRandomInt(), this.random.getRandomInt());
        EarthWorm.time = 500;
        
        this.worm = [{"worm1":[{x:this.random.getRandomInt(),y:this.random.getRandomInt()}]}];
        this.feedCoord = [{"feed1":[{x:EarthWorm.food.x, y:EarthWorm.food.y, type:Food.foodList[this.random.getRandomInt(4)]}]}];
        
        EarthWorm.interval = setInterval(() => {
            this.updateWormStatus(this.isGameOver);
            drawAll();
        }, EarthWorm.time);
    }

    setNumberOfPlayer(playerCnt, CompterCnt) {
        if (playerCnt == "1P") {
            this.worm = [{"worm1":[{x:this.random.getRandomInt(),y:this.random.getRandomInt()}]}];
        } else if (playerCnt == "2P") {
            this.worm = [{"worm1":[{x:this.random.getRandomInt(),y:this.random.getRandomInt()}]},
                        {"worm2":[{x:this.random.getRandomInt(),y:this.random.getRandomInt()}]}];
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
                    this.wormBodyArr.push(wormBody);
                }
            }
        } else if (direction === 'RIGHT') {
            if(wormHead.x < (this.width - 50)){
                wormHead.x += 50;
                if(this.worm.length > 0){
                    let wormBody = new WormBody(wormHead.x-50, wormHead.y);
                    this.wormBodyArr.push(wormBody);
                }
            }
        } else if (direction === 'DOWN') {
            if(wormHead.y < (this.height - 50)){
                wormHead.y += 50;
                if(this.worm.length > 0){
                    let wormBody = new WormBody(wormHead.x, wormHead.y-50);
                    this.wormBodyArr.push(wormBody);
                }
            }
        } else if (direction === 'UP') {
            if(wormHead.y > 0 ){
                wormHead.y -= 50;
                if(this.worm.length > 0){
                    let wormBody = new WormBody(wormHead.x, wormHead.y+50);
                    this.wormBodyArr.push(wormBody);
                }
            }
        }
        
        if (this.wormBodyArr.length > this.wormLength){
            this.wormBodyArr.splice(0, 1);
        }
        
        // 음식에 닿았을때
        if(wormHead.x == feed.x && wormHead.y == feed.y) {
            let feedType = this.feedCoord[0].feed1[0].type;
            if(feedType == "basic" || feedType == "disappear") {
                this.score +=1;
                this.wormLength += 1;
            } else if(feedType == "minusScore") {
                this.score -=1;
                this.wormLength += 1;
            } else if(feedType == "cutLength") {
                this.score +=1;
                if(!this.wormLength == 0) {
                    this.wormLength -= 1;
                    this.wormBodyArr.splice(0, 1);
                }
            }
            this.getGameScore(this.score);
            
            EarthWorm.food = new Food(this.random.getRandomInt(), this.random.getRandomInt());
            this.feedCoord = [{"feed1":[{x:EarthWorm.food.x, y:EarthWorm.food.y, type:Food.foodList[this.random.getRandomInt(4)]}]}];
        }

        // 벽에 닿았을때
        if(wormHead.x <= 0 || wormHead.y <= 0 
                            || wormHead.x >= (this.width - 50)
                            || wormHead.y >= (this.height - 50)) {
            this.isGameOver = true;
            // this.getIsGameOver(this.isGameOver);
        }

        // 머리와 꼬리 닿았을때
        if(this.wormBodyArr.length > 0) {
            if(wormHead.x == this.wormBodyArr[0].x && wormHead.y == this.wormBodyArr[0].y) {
                this.isGameOver = true;
            }
        }
        
        if(isGameOver) {
            // GameOver();
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
