---
title: "GitHub README 꾸미기 한 번에 끝내보자!"
slug: badge-generator
description: "GitHub 프로필/README 뱃지를 모아 미리보고 복사할 수 있는 Badge Generator 제작기"
date: 2025-12-10
authors: [junye0l]
tags:
  - GitHub
  - README
  - Badge
  - Side Project
keywords:
  - GitHub profile badge generator
  - README 꾸미기
  - Markdown badge preview
  - 프로필 카드
image: /img/projects/badge-generator/og.png
draft: false
toc_min_heading_level: 2
toc_max_heading_level: 4
---


## 시작하며

부트캠프를 수료하고 멍한채로 하루하루를 살아가던 중... 이대로는 시간을 보낼수 없다고 생각하여, 

평소에 만들고싶었지만 시도해보지 못했던 것들이 뭐가 있을까 고민하던 찰나에

깃허브 프로필을 꾸미는것에 항상 관심이 많았었는데 대부분 정보들이 영어로 적혀있거나, 일일히 마크다운 코드를 찾아서 작성하는 번거로움들이 있었습니다.

물론 저와 비슷한 생각을 가지신 분들이 만든 사이트들도 있었지만, 그것보다 더 많은 기능을 한 곳에 모아두고 싶은 생각으로 프로젝트를 시작하였습니다. 🤔

## 기능 소개

현재까지 구현된 기능은 아래와 같습니다!

**1. Shields.io를 활용한 기술스택 뱃지 제작** <br/>
**2. Skills Icons를 활용한 기술스택 뱃지 제작** <br/>
**3. readme-typing-svg를 활용한 텍스트 애니메이션 제작**

첫 번째 Shields.io를 활용한 기능부터 설명하자면

<img src="/img/projects/badge-generator/shield-style.png" alt="Shields.io 스타일 설정 화면"/>

총 5개의 스타일을 지정할 수 있으며, 1~4번째는 기술스택 뱃지에 대한 스타일 5번째는 소셜관련 뱃지에 대한 스타일입니다.

모든 스타일에 대한 확인은 아래의 사진처럼 미리보기 형식으로 확인할 수 있습니다.

<img src="/img/projects/badge-generator/shield-preview.png" alt="Shields.io 스타일 미리보기"/>

<br/>
<br/>

미리보기로 맘에드는 스타일을 선택한 후 아래의 이미지와 같이 생성된 마크다운 코드를 복사하여 자신의 깃허브 README.md에 붙혀넣으면 
빠르게 완성을 할 수 있습니다!

<img src="/img/projects/badge-generator/shield-markdown.png" alt="Shields.io 마크다운 코드 생성 결과"/>

<br/>
<br/>

두 번째 Skills Icons를 활용한 기능을 살펴보자면

Shields.io와 유사하지만 앱 아이콘과 같은 UI를 보여주기 때문에 또 다른 스타일의 느낌으로 꾸밀 수 있습니다.

조금 다른 점이라면 아래와 같이 `Dark` `Light` 테마를 설정할 수 있으며

한 줄에 표기할 뱃지 개수에 대한 설정도 가능합니다.

Shields.io보다 아쉬운점이라면 기본 제공 이미지가 다소 적어 설정하고자 하는 기술스택이 있는지 확인이 필요합니다!

또한 `light` 같은 경우 지원하는 뱃지와 지원이 안되는 뱃지가 있어 동일하게 확인 후 사용하시는게 좋습니다.

<img src="/img/projects/badge-generator/skills-all.png" alt="Skills Icons 테마 및 배치 설정 화면"/>
<img src="/img/projects/badge-generator/skills-light.png" alt="Skills Icons Light 테마 미리보기"/>

<br/>
<br/>

세 번째로는 프로필 소개말을 애니메이션 형태로 작성해주는 기능입니다.

<img src="/img/projects/badge-generator/typing-all.png" alt="텍스트 애니메이션 옵션 설정 화면"/>

<br/>
<br/>

프로필 소개말에 대한 부분은 하나하나 기능을 살펴보자면,

1. **타이핑할 텍스트 :** 표출하고자하는 텍스트를 작성해주는 부분 <br/>( 여러줄 작성시 애니메이션 타입에 따라 텍스트가 표출됩니다.)
2. **폰트 :** Google fonts에서 제공하는 폰트를 사용하고 있으며, 영어, 코딩, 한글 등 여러가지 폰트를 제공하고있습니다.
3. **폰트 크기, 폰트 색상 :** 크기는 드래그로 설정이 가능하며, 폰트 색상은 기본적인 컬러만 제공하고 있습니다.
4. **애니메이션 타입 :** 총 2가지의 애니메이션을 제공하며 한 번 반복 혹은 무한 반복 옵션을 선택할 수 있습니다.
5. **타이핑 속도, 줄 바꿈 대기시간 :** 애니메이션에 대한 속도 조절이 가능하며 숫자가 낮을수록 빠르게 반응합니다.
6. **너비, 높이 :** 텍스트가 표출되는 영역에 대한 크기조절로 폰트 22px 기준 높이가 70으로 맞춰져 있습니다.

<br/>
<br/>

옵션들을 설정하게되면 기술스택 뱃지와 동일하게 아래와 같이 미리보기 기능과 마크다운 코드를 제공하고 있습니다.

<img src="/img/projects/badge-generator/typing-preview.png" alt="텍스트 애니메이션 실시간 미리보기"/>
<img src="/img/projects/badge-generator/typing-markdown.png" alt="텍스트 애니메이션 마크다운 코드"/>

<br/>
<br/>

생각보다 글이 길었지만, 간단한 기능들로 이루어져 있어 방문해주시면 손쉽게 사용하실 수 있을 것 같습니다 ㅎㅎ

아래 레포지토리 통해 배포된 사이트로 이용해주시면 감사하겠습니다 ! 🙇🏻

<a
  href="https://github.com/junye0l/badge-generator"
  style={{ color: '#3B82F6', fontWeight: 600 }}
  target="_blank"
  rel="noreferrer"
>
  badge-generator
</a>


## 향후 계획

- 다른 위젯 기능들도 손쉽게 커스텀할 수 있는 기능 추가
- 기술스택 뱃지 순서를 드래그앤 드랍으로 변경할 수 있는 기능 추가
- 전체적인 UI 수정
