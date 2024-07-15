/*
 * 지렁이 게임 인터페이스 입니다.
 * @author kksk0530, jiyoung0822
 * @version 1.0.1
 * @since 1.0.1
 * @lastModifyDate 24.06.26
 */
class IEarthWorm {
    /*
      * 객체 기본 생성자 입니다.
      * width : 맵 너비 (int) 
      * height : 맵 높이 (int)
      * headDirection : 지렁이 방향 (String : UP,DOWN,LEFT,RIGHT)
      * worm : 지렁이 좌표 (Array) [{"worm1":[{x:int,y:int},{x:int,y:int},{x:int,y:int}]},
      *                             {"worm2":[{x:int,y:int},{x:int,y:int},{x:int,y:int}]}...]
      * feedCoord : 먹이 자표 (Array) [{"feed1":[{x:15,y:15,type:"minusScore"}]}]; //minusScore, disappear, cutLength
      * obstacle : 장애물 좌표 (Array) [{"obstacle1":[{x:10,y:10},{x:11,y:10},{x:12,y:10}]}];
      * isGameOver : 게임오버 여부 (boolean)
      * score : 점수 (int)
      */
    constructor() {
        this.width = 0;
        this.height = 0;
        this.headDirection = 'RIGHT';
        this.worm = [{"worm1":[{x:10,y:10}]}];
        this.feedCoord = [{}];
        this.obstacle = [{}];
        this.isGameOver = false;
        this.score = 0;
    }
    
    /*
    * 재시작 시 게임을 초기화 하는 함수입니다.
    * headDirection, worm, apple, isGameOver 초기화 합니다.
    */
    gameReset(){

    }

    /*
    * 맵의 크기를 설정합니다.
    * paramType : Int
    */
    setMapSize(mapSize) {

    }

    /*
    * 지렁이의 속도를 설정합니다.
    * paramType : Int
    */
    setWormSpeed(playSpeed) {

    }
    
    /*
    * 플레이어와 컴퓨터의 인원수를 설정합니다.
    * paramType : Int(playerCnt), Int(CompterCnt)
    */
    setNumberOfPlayer(playerCnt, CompterCnt) {

    }

    /*
    * 지렁이 진행 방향을 설정합니다.
    * paramType : String
    * String : UP,DOWN,LEFT,RIGHT 중 하나
    */
    setHeadDirection(direction) {

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
    * 맵의 크기 값을 반환합니다.
    */
    getMapSize(){
        return this.width, this.height;
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
    getFeedCoord(){
        return this.feedCoord;
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
    
    /* 
    * 게임 점수 값을 반환합니다.
    */
    getGameScore() {
        return this.score;
    }

    /* 
    *  장애물 좌표 값을 반환합니다.
    */
    getobstacleCoord () {
        return this.obstacle;
    }
}
