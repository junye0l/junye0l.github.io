---
slug: react-study-week6-2
title: "리액트 공식문서 스터디 6주차 - 2"
authors: [junye0l]
date: 2025-12-12T09:00:00+09:00
description: "reducer와 context를 같이 사용하는 방법"
---

<h2>6주차 두 번째</h2>

# Passing Data Deeply with Context

- 부모에서 자식으로 값을 전달할 때 props는 가장 확실하고 효과적인 방법이다.

- 하지만 여러 단계를 거치거나 여러 컴포넌트가 동일한 값을 필요로하면 중간 컴포넌트들이 실제로 사용하지 않는 props를 전달하게 되고, 이 과정에서 **prop drilling**이 발생할 수 있다.

- 이러한 **prop drilling**을 방지하는 방법 중 하나로 Context를 사용할 수 있다.

- **Context**는 부모 컴포넌트가 자신의 **하위 tree 전체**에 데이터를 제공할 수 있게 해준다.

  - 예시를 한 번 봐보자
  ```javascript
  export default function Page() {
    return (
      <Section>
        <Heading level={1}>Title</Heading>
        <Section>
          <Heading level={2}>Heading</Heading>
          <Heading level={2}>Heading</Heading>
          <Heading level={2}>Heading</Heading>
          <Section>
            <Heading level={3}>Sub-heading</Heading>
            <Heading level={3}>Sub-heading</Heading>
            <Heading level={3}>Sub-heading</Heading>
            <Section>
              <Heading level={4}>Sub-sub-heading</Heading>
              <Heading level={4}>Sub-sub-heading</Heading>
              <Heading level={4}>Sub-sub-heading</Heading>
            </Section>
          </Section>
        </Section>
      </Section>
    );
  }
  ```

  - 현재 코드에서는 **Heading** 컴포넌트에 **level** props를 일일이 전달하고 있다.

  ```javascript
    <Section>
      <Heading level={3}>About</Heading>
      <Heading level={3}>Photos</Heading>
      <Heading level={3}>Videos</Heading>
    </Section>
  ```

  - 첫 번째 방식보다는 **Section** 컴포넌트에 **level**을 한 번만 전달하면 더 효율적일 것이다.

  - 그렇다면 **Heading** 컴포넌트가 **Section** 컴포넌트의 **level** 값을 어떻게 알 수 있을까?

  - 이런 작은 props만으로는 할 수 없기에 자식이 tree 위쪽에서 데이터를 **가져올 수 있도록** 도와주는 **Context**가 등장한 것이다.

</br>

Context를 작성하는 방법

1. Create the context
  ```javascript
  import { createContext } from 'react';

  export const LevelContext = createContext(1)); // default value로 value or object 모두 가능
  ```

2. Use the context
  ```javascript
    import { useContext } from "react";
    import { LevelContext } from "./LevelContext.js";

    export default function Heading({ children }) {
      const level = useContext(LevelContext);
      ...
    }
  ```

  - 기존에 props로 전달하던 level 값을 useContext Hook을 통해 직접 가져오게 된다.
  
3. Provide the context
  ```javascript
  import { LevelContext } from "./LevelContext.js";

  export default function Section({ level, children }) {
    return (
      <section className="section">
        <LevelContext.Provider value={level}>
          {children}
        </LevelContext.Provider>
      </section>
    );
  }
  ```

- Section 컴포넌트는 이제 전달받은 level 값을 LevelContext.Provider을 통해 하위 컴포넌트에 제공한다.

- 이렇게 하면 Heading 컴포넌트는 useContext(LevelContext)를 통해 가장 가까운 Provider이 제공하는 level 값을 읽어온다.

- Context는 가까운 부모가 제공한 값을 읽을 수 있는데,
그 값을 다시 제공하면 트리의 깊이에 따라 값이 자연스럽게 변화한다.

</br>

Context를 사용하기전 고려해야 할 것

1. props로만 해결이 가능한지
2. children 패턴을 사용하기
3. 그래도 안된다면 context를 사용하기

</br>

Context를 언제 사용하면 좋을까?

- **Theming** : 앱 전체에서 같은 테마 정보를 쉽게 공유하고 적용할 수 있다.

- **Current account** : 여러 컴포넌트가 현재 로그인한 사용자 정보를 필요로 할 때 한 곳에서 관리할 수 있다.

- **Routing** : Link나 page 컴포넌트들이 **현재 어떤 경로인지** 알 수 있도록 router가 내부적으로 사용한다.

- **Managin state** : 여러 컴포넌트가 같은 상태를 읽고 변경해야 할 때, reducer + context로 함께 사용할 수 있다.

</br>

# Scaling Up with Reducer and Context

- **reducer**는 상태 업데이트 로직을 한 곳에서 관리해 컴포넌트를 깔끔하게 만든다.

- 하지만 상태와 dispatch는 기본적으로 **reducer**를 사용하는 최상위 컴포넌트에만 존재한다.

- 다른 컴포넌트가 상태를 읽거나 변경하려면 props로 계속 전달해야해서 **prop drilling** 문제가 발생한다.

- 이를 해결하기 위해 상태와 dispatch를 context에 넣으면, 하위 tree 모든 컴포넌트가 props 없이 상태를 읽고 dispatch를 호출할 수 있다.

</br>

1. Create the context

- 예시코드의 useReducer는 현재 task와 이를 업데이트하는 dispatch 함수를 반환한다.

```javascript
const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);
```

- 이 값들을 하위 tree로 전달하기 위해서는 아래 코드와 같이 두 개의 context를 만들어야 한다.

```javascript
import { createContext } from "react";

export const TasksContext = createContext(null);
export const TasksDispatchContext = createContext(null);
```

</br>

2. Put state and dispatch into context

- 앞서 선언한 context 두 개를 TaskApp 컴포넌트에서 사용할 수 있다.

- Context를 이용해 useReducer()이 반환하는 tasks와 dispatch를 하위 tree 전체에 context로 전달한다.

```javascript
import { TasksContext, TasksDispatchContext } from './TasksContext.js';

export default function TaskApp() {
  const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);
  // ...
  return (
    <TasksContext.Provider value={tasks}>
      <TasksDispatchContext.Provider value={dispatch}>
        ...
      </TasksDispatchContext.Provider>
    </TasksContext.Provider>
  );
}
```

3. Use context anywhere in the tree

- 하위 tree 전체가 context로 전달을 받기 때문에, 이제 더이상 tasks, event handler를 props로 하위 컴포넌트에 전달할 필요가 없다.

- 필요한 컴포넌트는 useContext()를 사용해 context에서 직접 값을 읽어온다.

```javascript
import { useContext, useState } from "react";
import { TasksContext, TasksDispatchContext } from "./TasksContext.js";

// tasks 읽기
export default function TaskList() {
  const tasks = useContext(TasksContext);
  ...
}

// dispatch 사용하기
function Task({ task }) {
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useContext(TasksDispatchContext);
  ...
}
```

</br>

Moving all wiring into a single file

- 점점 복잡해지는 상태를 관리하기 위해 reducer와 context를 한 파일로 통합하여 관리할 수 있다.

- TasksProvider로 컴포넌트를 감싸서 상태와 dispatch를 전역적으로 공유할 수 있다.

- 이를 통해 하위 어디에서든 useTasks와 useTasksDispatch로 가져와 사용할 수 있다.

```javascript
import { createContext, useContext, useReducer } from "react";

const TasksContext = createContext(null);
const TasksDispatchContext = createContext(null);

export function useTasks() {
  return useContext(TasksContext);
}

export function useTasksDispatch() {
  return useContext(TasksDispatchContext);
}

const initialTasks = [
  { id: 0, text: "React Docs 읽기", done: false },
  { id: 1, text: "Context 연습하기", done: false },
];

function tasksReducer(tasks, action) {
  switch (action.type) {
    case "added":
      return [...tasks, { id: action.id, text: action.text, done: false }];
    case "changed":
      return tasks.map((t) =>
        t.id === action.task.id ? action.task : t
      );
    case "deleted":
      return tasks.filter((t) => t.id !== action.id);
    default:
      throw new Error("Unknown action: " + action.type);
  }
}

export function TasksProvider({ children }) {
  const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);

  return (
    <TasksContext.Provider value={tasks}>
      <TasksDispatchContext.Provider value={dispatch}>
        {children}
      </TasksDispatchContext.Provider>
    </TasksContext.Provider>
  );
}
```
