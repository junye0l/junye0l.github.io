---
slug: core-javascript-week10
title: "클래스"
authors: [junye0l]
tags: [JavaScript, 클래스, 스터디]
---

# 클래스

## 1. 클래스와 인스턴스의 개념 이해

#### `클래스` 는 붕어빵 틀, `인스턴스` 는 붕어빵이라고 생각하면 편하다.

- **상위클래스** - superclass
- **하위클래스** - subclass -> 부모의 특징을 물려받음

<br />

## 2. 자바스크립트의 클래스

### 프로토타입 기반 상속

#### 자바스크립트에서는 생성자 함수와 프로토타입을 이용해 클래스를 구현한다.

- 생성자 함수 Array를 new 연산자와 호출하면 인스턴스가 생성된다.
- 이때 Array를 일종의 클래스라고 하면, Array의 prototype 객체 내부 요소들이 인스턴스에 상속된다고 볼 수 있다.
- 인스턴스에 상속되는지(인스턴스가 참조하는지) 여부에 따라 스태틱 멤버와 인스턴스 멤버로 나뉜다.

```javascript
// 생성자 함수
var Rectangle = function (width, height) {
  this.width = width;
  this.height = height;
};

// 프로토타입 메서드 정의 (모든 인스턴스가 공유)
Rectangle.prototype.getArea = function () {
  return this.width * this.height;
};

// 스태틱 메서드 정의 (클래스 자체에 속함)
Rectangle.isRectangle = function (instance) {
  return (
    instance instanceof Rectangle && instance.width > 0 && instance.height > 0
  );
};

var rect1 = new Rectangle(3, 4);
console.log(rect1.getArea()); // 정상 작동, 출력: 12

// 잘못된 호출: rect1은 스태틱 메서드를 호출할 수 없다.
console.log(rect1.isRectangle(rect1)); // TypeError: rect1.isRectangle is not a function

// 올바른 호출: 스태틱 메서드는 클래스 이름을 통해 호출해야 한다.
console.log(Rectangle.isRectangle(rect1)); // true
```

<br />
<br />

## 3. 클래스 상속

- ES5까지의 자바스크립트에는 클래스가 없다. ES6에서 클래스가 도입됐지만 역시나 prototype을 기반으로 한 것이다.
- 자바스크립트에서 클래스 상속을 구현했다는 것은 결국 프로토타입 체이닝을 잘 연결한 것이다.

<br />

:::info
단순히 `SubClass.prototype = new SuperClass()` 를 하면, 부모의 인스턴스 프로퍼티까지 상속되는 문제가 발생한다.
:::

<br />

### 하위클래스의 프로토타입이 상위클래스의 인스턴스 프로퍼티를 가지지 않게 하는 방법

<br />

#### 방법 1: 인스턴스 생성 후 프로퍼티 제거

상속을 통해 자식 클래스가 부모 클래스의 메서드를 활용하면서도 자식 클래스의 고유한 메서드를 가질 수 있도록 설정할 수 있음

```javascript
var extendClass1 = function (SuperClass, SubClass, subMethods) {
  // SubClass의 프로토타입을 SuperClass의 인스턴스로 설정하여 상속 구조를 만든다.
  SubClass.prototype = new SuperClass();

  // 상속된 프로토타입에서 자신의 프로퍼티(인스턴스 프로퍼티)를 제거
  for (var prop in SubClass.prototype) {
    if (SubClass.prototype.hasOwnProperty(prop)) {
      delete SubClass.prototype[prop];
    }
  }

  // subMethods가 제공된 경우, 이를 SubClass의 프로토타입에 추가한다.
  if (subMethods) {
    for (var method in subMethods) {
      SubClass.prototype[method] = subMethods[method];
    }
  }

  // SubClass의 프로토타입을 동결하여 변경 불가능하게 만든다.
  Object.freeze(SubClass.prototype);
  return SubClass;
};

// Rectangle 클래스 정의
var Rectangle = function (width, height) {
  this.width = width;
  this.height = height;
};

// Rectangle 클래스의 프로토타입 메서드 정의
Rectangle.prototype.getArea = function () {
  return this.width * this.height;
};

// Square 클래스 정의 및 Rectangle 클래스 상속
var Square = extendClass1(Rectangle, function (width) {
  // Rectangle 생성자를 호출하여 너비와 높이를 동일하게 설정
  Rectangle.call(this, width, width);
});

// Square 인스턴스 생성
var sq = new Square(5);

// Square 인스턴스에서 Rectangle 클래스의 메서드 사용
console.log(sq.getArea()); // 25
```

<br />

#### 방법 2: 빈 함수를 활용

빈 함수를 브리지(Bridge)로 사용해 프로토타입 체인을 설정한다. 이를 통해 자식 클래스가 부모 클래스의 프로토타입을 상속받으면서도 새로운 메서드를 추가할 수 있게 된다.

```javascript
var extendClass2 = (function () {
  // 빈 함수를 브리지로 사용
  var Bridge = function () {};

  // 클로저를 사용하여 상속 함수 반환
  return function (SuperClass, SubClass, subMethods) {
    // Bridge의 프로토타입을 SuperClass의 프로토타입으로 설정
    Bridge.prototype = SuperClass.prototype;

    // SubClass의 프로토타입을 Bridge의 인스턴스로 설정
    SubClass.prototype = new Bridge();

    // subMethods가 제공된 경우, 이를 SubClass의 프로토타입에 추가
    if (subMethods) {
      for (var method in subMethods) {
        SubClass.prototype[method] = subMethods[method];
      }
    }

    // SubClass의 프로토타입을 동결하여 변경 불가능하게 설정
    Object.freeze(SubClass.prototype);
    return SubClass;
  };
})();

// Rectangle 클래스 정의
var Rectangle = function (width, height) {
  this.width = width;
  this.height = height;
};

// Rectangle 클래스의 프로토타입 메서드 정의
Rectangle.prototype.getArea = function () {
  return this.width * this.height;
};

// Square 클래스 정의 및 Rectangle 클래스 상속
var Square = extendClass2(Rectangle, function (width) {
  Rectangle.call(this, width, width); // Rectangle 생성자를 호출하여 너비와 높이를 동일하게 설정
});

// Square 인스턴스 생성
var sq = new Square(5);

// Square 인스턴스에서 Rectangle 클래스의 메서드 사용
console.log(sq.getArea()); // 출력: 25
```

<br />

#### 방법 3: Object.create 활용

부모 클래스의 프로토타입을 자식 클래스의 프로토타입으로 설정해 상속구조를 만든다.

```javascript
var Rectangle = function (width, height) {
  this.width = width;
  this.height = height;
};

// Rectangle 클래스의 프로토타입 메서드 정의
Rectangle.prototype.getArea = function () {
  return this.width * this.height;
};

// Square 클래스 정의
var Square = function (width) {
  Rectangle.call(this, width, width); // Rectangle 생성자를 호출하여 너비와 높이를 동일하게 설정
};

// Square 클래스의 프로토타입을 Rectangle 클래스의 프로토타입을 상속받도록 설정
Square.prototype = Object.create(Rectangle.prototype);

// Square 클래스의 프로토타입을 동결하여 변경되지 않도록 설정
Object.freeze(Square.prototype);

// Square 인스턴스 생성
var sq = new Square(5);

// Square 인스턴스에서 Rectangle 클래스의 메서드 사용
console.log(sq.getArea()); // 출력: 25
```

<br />

### constructor 복구하기

위의 방법들은 기본적인 상속에는 성공했지만,<br />
`constructor` 참조가 여전히 상위클래스를 가리키고 있다. 그렇기에 명시적으로 아래처럼 복구해야 한다.

```javascript
SubClass.prototype.constructor = SubClass;
```

<br />

### 상위 클래스에서 접근 수단 제공

#### super 흉내내보기

- superclass의 생성자 함수에 직접 접근하고자 할 때는 `this.super()`,
- superclass의 프로토타입 메서드에 접근하고자 할 때는 `this.super(propName)`와 같이 사용하면 된다.

```javascript
var extendClass = function (SuperClass, SubClass, subMethods) {
  SubClass.prototype = Object.create(SuperClass.prototype);
  SubClass.prototype.constructor = SubClass;

  SubClass.prototype.super = function (propName) {
    // 추가된 부분 시작
    var self = this;
    if (!propName)
      return function () {
        SuperClass.apply(self, arguments);
      };
    var prop = SuperClass.prototype[propName];
    if (typeof prop !== "function") return prop;
    return function () {
      return prop.apply(self, arguments);
    };
  }; // 추가된 부분 끝

  if (subMethods) {
    for (var method in subMethods) {
      SubClass.prototype[method] = subMethods[method];
    }
  }

  Object.freeze(SubClass.prototype);
  return SubClass;
};

var Rectangle = function (width, height) {
  this.width = width;
  this.height = height;
};

Rectangle.prototype.getArea = function () {
  return this.width * this.height;
};

var Square = extendClass(
  Rectangle,
  function (width) {
    this.super()(width, width); // super 사용 (1)
  },
  {
    getArea: function () {
      console.log("size is :", this.super("getArea")()); // super 사용 (2)
    },
  }
);

var sq = new Square(10);
sq.getArea(); // size is : 100
console.log(sq.super("getArea")()); // 100
```

<br />
<br />

## 4. ES6의 클래스 및 클래스 상속

### ES5와 ES6의 클래스 문법 비교

```javascript
// ES5 클래스 정의
var ES5 = function (name) {
  this.name = name;
};

// 정적 메서드 추가
ES5.staticMethod = function () {
  return this.name + " staticMethod";
};

// 프로토타입 메서드 추가
ES5.prototype.method = function () {
  return this.name + " method";
};

// ES5 인스턴스 생성과 메서드 호출
var es5Instance = new ES5("es5");
console.log(ES5.staticMethod()); // 출력: es5 staticMethod
console.log(es5Instance.method()); // 출력: es5 method

// ES6 클래스 정의
var ES6 = class {
  constructor(name) {
    this.name = name;
  }

  // 정적 메서드 정의
  static staticMethod() {
    return this.name + " staticMethod";
  }

  // 프로토타입 메서드 정의
  method() {
    return this.name + " method";
  }
};

// ES6 인스턴스 생성과 메서드 호출
var es6Instance = new ES6("es6");
console.log(ES6.staticMethod()); // 출력: es6 staticMethod
console.log(es6Instance.method()); // 출력: es6 method
```

<br />

### 주요 차이점

- **ES5**에서는 생성자 함수와 프로토타입을 사용하여 클래스를 정의하고 메서드를 추가한다. 정적 메서드는 직접 클래스 함수에 추가된다.
- **ES6**에서는 `class` 문법을 사용하여 클래스를 정의하고 `constructor`, 정적 메서드, 인스턴스 메서드를 명시적으로 정의한다. 코드가 더 간결하고 이해하기 쉽다.
- **ES6**은 클래스 상속을 보다 직관적으로 지원하며, `super` 키워드를 사용하여 부모 클래스의 생성자와 메서드를 호출할 수 있다.
