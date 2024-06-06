import { IEarthWorm } from './IEarthWorm.js';

class EarthWorm extends IEarthWorm{
    constructor(width, height) {
        super(width, height);
        this.headDirection = 'RIGHT';       // 초기 방향
        this.worm = {x:10,y:10};            // 지렁이 좌표
        this.apple = this.createApple();    // 사과 좌표
        this.isGameOver = false;            // 종료 여부
    }
    
    // 게임 초기화
    gameReset(){
        this.headDirection = 'right';
        this.worm = {x:10,y:10};
        this.apple = this.createApple();
        this.isGameOver = false;
    }
    
    // 지렁이 방향 설정
    setHeadDirection(direction) {
        this.headDirection = direction;
    }
    
    // 음식 생성
    createApple() {
        const appleX = Math.floor(Math.random() * (this.width - 30));
        const appleY = Math.floor(Math.random() * (this.height - 30));
        return { x: appleX, y: appleY };
    }

    // 게임 상태 업데이트
    updateWormStatus() {
        const worm = this.worm;
        const apple = this.apple;

        // 키보드 클릭에 따른 방향 갱신
        switch (this.headDirection) {
            case 'UP':
                // console.log(worm.x, worm.y)
                worm.y -= 1;
                this.headDirection = 'UP';
                break;
            case 'DOWN':
                // console.log(worm.x, worm.y)
                worm.y += 1;
                this.headDirection = 'DOWN';
                break;
            case 'LEFT':
                // console.log(worm.x, worm.y)
                worm.x -= 1;
                this.headDirection = 'LEFT';
                break;
            case 'RIGHT':
                // console.log(worm.x, worm.y)
                worm.x += 1;
                this.headDirection = 'RIGHT';
                break;
        }

        // 벽에 닿았는지 체크
        if (worm.x <= 0) {
            worm.x = 0;
            this.isGameOver = true;
        } else if (worm.y < 0) {
            worm.y = 0;
            this.isGameOver = true;
        } else if (worm.x + 30 > this.width) {
            worm.x = this.width - 30;
            this.isGameOver = true;
        } else if (worm.y + 30 >= this.height) {
            worm.y = this.height - 30;
            this.isGameOver = true;
        }

        // 음식 닿았는지 체크
        if ((worm.x >= apple.x - 30 && worm.x <= apple.x + 30) 
                && (worm.y >= apple.y - 30 && worm.y <= apple.y + 30) ) {
            this.apple = this.createApple();
        }
    }

    getWorm(){
        return this.worm;
    }

    getApple(){
        return this.apple;
    }
    
    getIsGameOver(){
        return this.isGameOver;
   }
   
   getHeadDirection(){
       return this.headDirection;
   }

}