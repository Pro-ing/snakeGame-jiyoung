# snakeGame-jiyoung

# 지렁이 게임
## 참고 사이트
<https://lorecioni.github.io/snake/>

## 이력 관리
- 이력을 쌓을 때 커밋을 무조건 하루 단위로 한다.

> 오류가 나는 것 상관없이 내 이력을 쌓기 위해 커밋을 하고  <br />
> 결국 푸쉬를 할 때는 남들과 공유를 하게 된다.  <br />
> 불필요한 개인 이력을 지우기 위해서는 Squash Merge를 사용한다.

## 팀간 협업

- ui를 생각을 안 해볼 수가 없고 그 입장을 생각하면서 해야하기 때문에 어려움
- 인터페이스에 대해 필요한게 있을 경우 서로 소통하기
- PR 활성화 및 리뷰에 대한 응답 필요. 그냥 머지하지 않기
- 이슈 등록하고 PR에 이슈와 다른 내용 포함하지 않기

## 인터페이스

- [인터페이스 좋은 예제] <https://www.typescriptlang.org/docs/handbook/interfaces.html>
- 인터페이스는 정의를 해주는 것. 접점
- 규격화
- 어떤 요구사항을 받아도 구현 가능하도록 추상화
- API는 약어가 없고 이름만 보고 이해를 해야하기 때문에 구체적으로 메소드명을 지어준다.
- 내부적으로 쓰이는 메서드는 인터페이스에 적을 필요가 없다. -> 각자 구현체에서 사용하기
- 게임 오버 판단을 ui에서 하지않고 자체적으로 동기화해서 알려줄 필요가 있음
- 속도 조절

## 게임 오버를 어떻게 구현할지
- setInterval()을 계속 호출해서 사용하기 보단 라이브러리에서 속도나 움직임을 통해서 죽었다고 알려줘야함
- 그러려면 콜백으로 gameover 구현
- 함수는 객체이고 함수의 파라미터로서 객체를 전달할 수 있다.
- 그러면 함수의 파라미터로서 다른 함수에 전달하고 감싼 함수의 내부에서 그 함수를 호출한다.
  ```
  function print(callback) {
    callback();
  }
  ```
- 콜백은 task가 끝나기 전에 함수가 실행되지 않는 것을 보장하기 때문에 task가 끝난 직후에 실행이 되고 <br />
  이런 비동기 프로그래밍을 할 수 있도록 도와준다.
  ```
  document.queryselector("#callback-btn")
    .addEventListener("click", function() {
      console.log("User has clicked on the button!");
  });
  ```
- addEventListener 함수의 두번째 파라미터는 버튼이 클릭되었을때 메시지를 남기는 콜백 함수이다.
- 보기와 같이 콜백함수는 자바스크립트에서 이벤트 정의를 위해 사용되기도 한다.

## 객체화 필요
- 객체는 속성의 컬렉션이고, 속성은 이름('key')과 값('value') 사이의 연결 관계이다.
- 그래서 하나의 변수(식별자)에 여러 데이터들을 저장하여 관리할 수 있다.
- 사실 자바스크립트의 거의 모든 것들은 객체다.
- 배열, 함수, 날짜, 정규표현식 등 원시값을 제외한 값들은 모두 객체이다.
- 객체를 생성하는 방법에는 아래와 같은 종류가 있다.
1. 객체 리터럴
2. 생성자 패턴
3. 프로토타입을 이용한 객체
4. Object.create
5. 클래스 패턴

자바스크립트에서는 객체지향 프로그래밍을 어떻게 해야하는게 좋을까? <br />

### 객체 지향 프로그래밍
- 구조체가 생기면서 의미있는 데이터로 구조화시켜서 프로그래밍하니 동작보다는 데이터를 중심으로 코딩하게 되면 코드의 덩치가 커져도 일관성을 유지하기 좋다는 것을 알게된다. 그러면서 코드를 한데 모으다 보니 다음과 같은 패턴이 자주 만들어진다는 것을 알게 된다.
```
// struct
var character = {
  name: "teo.yu"
  hp: 300
  mp: 500
}

function character_attck(character) {...}
function character_useSkill(character) {...}
function character_moveTo(character, toX, toY) {...}
```
- 위와 같이 특정 구조체만 가지고 동작을 하는 함수가 만들어진다는 것을 알게 되었고 함수 역시 전역 namespace를 쓰고있다보니 character_와 같은 prefix를 달아야 한다는 것을 알게 되었다.
- 구조체에 항상 쓰이는 함수들도 하나로 합치는 것은 어떨까? = class
- struct + function(struct, ...) = class (구조체 + 구조체를 항상 인자로 가지는 함수 = 클래스)
```
// class
class Character {
  name = "teo.yu"
  hp = 300
  mp = 500

  attck() {...}
  useSkill() {...}
  moveTo(toX, toY) {...}
}

// object
var character = new Character();
character.attck();
character.useSkill()
character.jump();
```
- 기존의 절차식 프로그래밍과 달리 하나의 모듈로 관리되면서 작은 프로그램들이 독립적으로 돌아가는 형태를 띄게 되어 부품을 만드는 설계도를 만들어두고 이를 조립하고 결합하는 방식으로 개발할 수 있다는 것을 알게된다.
- 기존의 구조체와 함수를 합쳐서 선언하는 것을 Class라고 하고 Class를 통해 만들어진 결과물을 값과 동작을 함께 가지고 있는 것이 주위 사물과 유사하다고 하여 Object라고 부른다.
- 이런 식으로 작은 문제를 해결하는 것들을 모아서 하나의 문제를 해결하는 프로그램으로 개발하는 방식을 Bottom-up 방식이라고 하고 작은 문제를 해결하는 독립적인 객체를 먼저 만들고 조립하자라는 개발방식으로 개념이 확장되었다.
- 프로그램은 모두 객체로 만들어져 있고 객체들 간의 메시지를 주고받는 상호작용으로 이루어지고 이렇게 프로그램을 객체로 바라보는 관점으로 프로그래밍 하는 것을 Object-Oriented Programming(OOP)라고 부른다.

## 라이브러리 테스트코드
- 라이브러리도 테스트코드가 필요한데 ui코드가 그 예가 될 수 있다.
- 완성이 되면 올려보기
