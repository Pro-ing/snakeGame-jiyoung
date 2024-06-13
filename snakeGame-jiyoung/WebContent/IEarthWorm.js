/*
 * 지렁이 게임 인터페이스 입니다.
 * @author kksk0530, jiyoung0822
 * @version 1.0.0
 * @since 1.0.0
 */
class IEarthWorm {
    /*
      * 객체 기본 생성자 입니다.
      * 맵의 크기를 기본값으로 받아와 설정합니다.
      * width : 맵 너비 (int) 
      * height : 맵 높이 (int)
      * headDirection : 지렁이 방향 (String : UP,DOWN,LEFT,RIGHT)
      * worm : 지렁이 좌표 (Object) {x:int y:int, x:int y:int ...}
      * apple : 사과 자표 (Object) {x:int y:int}
      * isGameOver : 게임오버 여부 (boolean)
      */
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.headDirection = 'RIGHT';
        this.worm = {x:10,y:10};
        this.apple = ''; 
        this.isGameOver = false;
    }
    
    /*
    * 재시작 시 게임을 초기화 하는 함수입니다.
    * headDirection, worm, apple, isGameOver 초기화 합니다.
    */
    gameReset(){

    }

    /*
    * 지렁이 진행 방향을 설정합니다.
    * paramType : String
    * String : UP,DOWN,LEFT,RIGHT 중 하나
    */
    setHeadDirection(direction) {

    }
    
    /*
    * 지렁이가 먹을 사과가 생성될 좌표값을 랜덤으로 설정합니다.
    * 라이브러리에서 apple 인스턴스 변수 좌표 값을 설정할 때 사용합니다.
    */
    createApple() {

    }

    /*
    * 지속적인 호출을 통해
    * GameOver 여부 확인 후 인스턴스 객채 값 설정
    * headDirection 인스턴스 객체 방향 값으로 지렁이 좌표 갱신
    * --> 지렁이가 움직이는 방향과 사용자가 입력한 방향이 반대인 경우 방향키 입력 무시
    * 지렁이 사과 섭취 시 worm 길이 증가 및 애플 객채 랜덤 좌표 생성
    * 방향 값으로 지렁이 좌표가 변경 됩니다.
    * --> 해당 함수는 각각으로 분리하도록 하겠습니다.
    */
    updateWormStatus() {

    } 
    
    /* 
    * 지렁이의 좌표 값을 반환합니다.
    */
    getWorm(){
        return this.worm;
    }

    /* 
    * 사과의 좌표 값을 반환합니다.
    */
    getApple(){
        return this.apple;
    }

    /* 
    * 게임 종료 여부를 반환합니다.
    */
    getIsGameOver(){
        return this.isGameOver;
    }
    
    /* 
    * 지렁이의 진행 방향 값을 반환합니다.
    */
    getHeadDirection(){
        return this.headDirection;
    }
}

export {IEarthWorm}