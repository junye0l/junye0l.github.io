---
slug: core-javascript-week9
title: "프로토타입"
authors: [junye0l]
tags: [JavaScript, 프로토타입, 스터디]
---

# 프로토타입

:::info 정의
자바스크립트는 프로토타입 기반 언어입니다. 클래스 기반 언어에서 '상속'을 사용한다면, 프로토타입 기반 언어는 어떤 객체를 원형으로 삼아 이를 복제(참조)하는 방식으로 상속과 비슷한 효과를 만들어냅니다.
:::

## 프로토타입의 개념 이해

### constructor, prototype, instance

새로운 인스턴스를 생성할 때, `__proto__`라는 프로퍼티가 자동으로 부여됩니다.

```javascript
let instance = new Constructor();
```

`prototype`과 `__proto__`는 모두 객체입니다. prototype 객체 내부에는 인스턴스가 사용할 메서드를 저장합니다.

```javascript
let Person = function (name) {
  this.name = name;
};

// Person.prototype에 getName 메서드 추가
Person.prototype.getName = function () {
  return this.name;
};

let suzi = new Person("Suzi");
suzi.__proto__.getName(); // undefined
Person.prototype === suzi.__proto__; // true
```

위 코드에서 `undefined`가 출력되는 이유는 메서드 호출 시 바로 앞 객체가 `this`가 되기 때문입니다. `__proto__` 객체에는 `name` 프로퍼티가 없으므로 `undefined`가 반환됩니다.

`__proto__`는 생략 가능합니다. 이 덕분에 인스턴스에서 prototype의 메서드를 자신의 것처럼 사용할 수 있습니다.

```javascript
// 아래 세 표현은 동일합니다
suzi.__proto__.getName
suzi(.__proto__).getName
suzi.getName  // __proto__ 생략!
```

prototype 내부에 없는 메서드는 인스턴스가 직접 호출할 수 없습니다. 생성자 함수에서 직접 접근해야 합니다.

```javascript
let arr = [1, 2];
arr.forEach(function () {}); // (O) Array.prototype에 있음
Array.isArray(arr); // (O) true - Array 생성자 함수의 스태틱 메서드
arr.isArray(); // (X) TypeError - prototype에 없음
```

### constructor 프로퍼티

prototype 내부에는 `constructor` 프로퍼티가 있습니다. 이는 생성자 함수 자신을 참조하며, 인스턴스가 자신의 원형을 알 수 있는 수단이 됩니다.

```javascript
let arr = [1, 2];
Array.prototype.constructor === Array; // true
arr.__proto__.constructor === Array; // true
arr.constructor === Array; // true

// constructor로 새 인스턴스 생성 가능
let arr2 = new arr.constructor(3, 4);
console.log(arr2); // [3, 4]
```

:::warning constructor 변경 시 주의사항
constructor는 변경 가능하지만, 변경해도 인스턴스의 실제 타입이 바뀌지는 않습니다.
:::

```javascript
let NewConstructor = function () {
  console.log("this is new constructor!");
};

let obj = {};
obj.constructor = NewConstructor;
console.log(obj.constructor.name); // 'NewConstructor'
console.log(obj instanceof NewConstructor); // false!
```

위 예시에서 constructor를 변경해도 `instanceof`는 여전히 false를 반환합니다. 참조 대상만 변경되었을 뿐 실제 원형이나 데이터 타입은 변하지 않습니다.

**동일한 대상을 가리키는 표현:**

```javascript
[Constructor][instance].__proto__.constructor[instance].constructor;
Object.getPrototypeOf([instance]).constructor[Constructor].prototype
  .constructor;
```

**동일한 객체에 접근하는 방법:**

```javascript
[Constructor].prototype[instance].__proto__[instance];
Object.getPrototypeOf([instance]);
```

## 프로토타입 체인

### 메서드 오버라이드

인스턴스가 prototype과 동일한 이름의 메서드를 가지면 메서드 오버라이드가 발생합니다.

```javascript
let Person = function (name) {
  this.name = name;
};

Person.prototype.getName = function () {
  return this.name;
};

let iu = new Person("지금");

// 인스턴스에 같은 이름의 메서드 추가
iu.getName = function () {
  return "바로 " + this.name;
};

console.log(iu.getName()); // '바로 지금'
```

원본 메서드가 제거되는 것이 아니라 그 위에 덮어씌워지는 구조입니다. 자바스크립트 엔진은 다음 순서로 메서드를 찾습니다:

1. 인스턴스 자신의 프로퍼티 검색
2. 없으면 `__proto__` 검색

원본 prototype 메서드에 접근하려면 명시적으로 호출해야 합니다:

```javascript
// call로 this를 iu로 바인딩
console.log(iu.__proto__.getName.call(iu)); // '지금'
```

### 프로토타입 체인

배열의 내부 구조를 보면 `__proto__` 내부에 다시 `__proto__`가 있습니다. prototype 객체도 객체이기 때문입니다.

```javascript
let arr = [1, 2];

// __proto__ 생략 가능
arr.push(3); // arr.__proto__.push(3)와 동일

// 체인을 따라 올라감
arr.__proto__.__proto__.hasOwnProperty(2); // true
// arr → Array.prototype → Object.prototype
```

:::info 용어 정리

- **프로토타입 체인**: `__proto__`가 연쇄적으로 이어진 구조
- **프로토타입 체이닝**: 체인을 따라가며 검색하는 과정
  :::

메서드 오버라이드와 프로토타입 체이닝 예시:

```javascript
let arr = [1, 2];

// Array.prototype의 toString
Array.prototype.toString.call(arr); // '1,2'

// Object.prototype의 toString
Object.prototype.toString.call(arr); // '[object Array]'

// 기본적으로는 Array.prototype의 toString 사용
arr.toString(); // '1,2'

// 메서드 오버라이드
arr.toString = function () {
  return this.join("_");
};
arr.toString(); // '1_2'
```

어떤 생성자 함수든 prototype은 객체이므로, `Object.prototype`이 언제나 프로토타입 체인의 최상단에 존재합니다.

### 객체 전용 메서드의 예외사항

객체에서만 사용할 메서드를 `Object.prototype`에 정의하면 모든 데이터 타입에서 접근할 수 있게 되는 문제가 발생합니다.

```javascript
// 잘못된 예시: Object.prototype에 메서드 추가
Object.prototype.getEntries = function () {
  let res = [];
  for (let prop in this) {
    if (this.hasOwnProperty(prop)) {
      res.push([prop, this[prop]]);
    }
  }
  return res;
};

let data = [
  ["object", { a: 1, b: 2, c: 3 }], // [["a",1], ["b",2], ["c",3]]
  ["number", 345], // []
  ["string", "abc"], // [["0","a"], ["1","b"], ["2","c"]]
  ["boolean", false], // []
  ["array", [1, 2, 3]], // [["0",1], ["1",2], ["2",3]]
];

data.forEach(function (datum) {
  console.log(datum[1].getEntries());
});
```

의도는 객체에만 사용하는 것이었지만, 모든 데이터 타입이 프로토타입 체이닝을 통해 `getEntries`에 접근할 수 있습니다.

이러한 이유로 객체 전용 메서드는 `Object`에 **스태틱 메서드**로 부여됩니다.

```javascript
// 올바른 방식: 스태틱 메서드
Object.freeze(instance); // O
instance.freeze(); // X

// 인스턴스를 인자로 직접 전달
Object.keys(obj);
Object.values(obj);
Object.entries(obj);
```

생성자 함수 `Object`와 인스턴스 사이에는 `this` 연결이 불가능하므로, 대상 인스턴스를 인자로 받는 방식으로 구현됩니다.

`Object.prototype`에는 모든 데이터 타입에서 사용 가능한 범용 메서드만 존재합니다:

- `toString`
- `hasOwnProperty`
- `valueOf`
- `isPrototypeOf`

#### Object.create(null)

예외적으로 `Object.create(null)`을 사용하면 `Object.prototype`에 접근할 수 없는 객체를 만들 수 있습니다.

```javascript
// __proto__가 없는 객체 생성
let _proto = Object.create(null);
_proto.getValue = function (key) {
  return this[key];
};

// _proto를 __proto__로 하는 객체 생성
let obj = Object.create(_proto);
obj.a = 1;
console.log(obj.getValue("a")); // 1
console.dir(obj);
```

`obj`를 출력하면 `__proto__`에 오직 `getValue` 메서드만 존재하며, 일반적인 내장 메서드나 프로퍼티는 보이지 않습니다.

**장단점:**

- 장점: 내장 메서드가 제거되어 객체가 가벼워지고 성능 향상
- 단점: 기본 기능 제약 (toString, hasOwnProperty 등 사용 불가)

### 다중 프로토타입 체인

자바스크립트 기본 데이터 타입의 프로토타입 체인은 1-2단계로 끝나지만, 사용자가 더 긴 체인을 만들 수 있습니다.

방법: 생성자 함수의 prototype이 다른 생성자 함수의 인스턴스를 바라보게 합니다.

```javascript
// 유사배열객체를 반환하는 생성자 함수
let Grade = function () {
  let args = Array.prototype.slice.call(arguments);
  for (let i = 0; i < args.length; i++) {
    this[i] = args[i];
  }
  this.length = args.length;
};

let g = new Grade(100, 80);
```

`g`는 배열 형태(인덱스와 length 프로퍼티)를 가졌지만, 배열 메서드는 사용할 수 없는 유사배열객체입니다.

배열 메서드를 사용 가능하게 만들기:

```javascript
// Grade.prototype을 배열 인스턴스로 교체
Grade.prototype = [];

console.log(g); // Grade(2) [100, 80]

// 이제 배열 메서드 사용 가능
g.pop();
console.log(g); // Grade(1) [100]

g.push(90);
console.log(g); // Grade(2) [100, 90]
```

이제 `g`의 프로토타입 체인은 다음과 같습니다:

```
g 객체
 → Grade.prototype (배열 인스턴스)
  → Array.prototype
   → Object.prototype
```

`g`는 자신의 멤버, Grade.prototype, Array.prototype, Object.prototype의 모든 멤버에 접근할 수 있습니다.

## 정리

- 생성자 함수를 `new` 연산자와 함께 호출하면 인스턴스에 `__proto__` 프로퍼티가 자동 부여되며, 이는 생성자 함수의 `prototype`을 참조합니다.

- `__proto__`는 생략 가능하여, 인스턴스는 prototype의 메서드를 자신의 것처럼 호출할 수 있습니다.

- prototype의 `constructor` 프로퍼티는 생성자 함수 자신을 가리키며, 인스턴스가 자신의 생성자 함수를 알 수 있게 합니다.

- **프로토타입 체인**: `__proto__`가 연쇄적으로 이어진 것  
  **프로토타입 체이닝**: 체인을 따라 검색하는 것

- 객체 전용 메서드는 `Object.prototype`이 아닌 `Object`에 스태틱 메서드로 부여됩니다. 모든 데이터 타입이 `Object.prototype`을 상속받기 때문입니다.
