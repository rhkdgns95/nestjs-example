# Nestjs example


## Todo
- [x] Init Nestjs, Models(User, Product, Order)
- [x] Shared User Service Part 1.

## Install
```bash

npm i -g @nestjs/cli
npm i --save @nestjs/core @nestjs/common rxjs reflect-metadata
npm i --save @nestjs/typeorm typeorm postgres pg
npm i add bcryptjs
npm i --save-dev -D @types/bcryptjs
```

## Cmd

``` bash
# 1. 현재 디렉터리에서 프로젝트 생성
nest new ./

# 2. src/auth/에 auth.module.ts 생성
nest g module auth

# 3. src/auth/에 auth.controller.ts 생성
nest g controller auth
```

## Study

1. typeorm은 json형식을 제공해줌
  - type: simple-json
  ```ts
  // user.entity.ts
  @Column('simple-json')
  address: {
    addr1: string;
    addr2: string;
    zip: number;
  }

  // user add
  const user: User = new User();
  user.address = { add1: 'Dajeon', add2: 'Moksang', zip: 1470 };
  ```
  - 또한, DB에서 데이터를 로드할때JSON/parse를 통해 객체/배열/프리미티브를 다시 갖게 된다.

2. 

## Example
1. DI Functional
  - 의존성 주입은 의존성 인스턴스화를 IOC컨테이터(NestJS 런타임 시스템)에 위임하여, 자신의 코드에서 수행하는 대신 IoC(Invension of Control)기술이다. 
  - 먼저 공급자를 정의하는 @Injectable()데코레이터는 Service클래스를 공급자로 표시한다.

  <details>
  <summary>예시1</summary>
  <p>

  ```ts
  // cats.service.ts
  import { Injectable } from '@nestjs/common';
  import { Cat } from './interfaces/cat.interface';

  @Injectable()
  export class CatsService {
    private readonly cats: Cat[] = [];

    findAll(): Cat[] {
      return this.cats;
    }
  }
  ```
  </p>
  </details>

  <details>
  <summary>예시2</summary>
  <p>

  ```ts
  // cats.controller.ts
  import { Controller, Get } from '@nestjs/common';
  import { CatsService } from './cats.service';
  import { Cat } from './interfaces/cat.interface'

  @Controller('cats')
  export class CatsController {
    constructor(private catsService: CatsService){} // 싱글톤

    @Get()
    async findAll(): Promise<Cat[]> {
      return this.catsService.findAll();
    }
  }
  ```
  </p>
  </details>

  <details>
  <summary>예시3</summary>
  <p>

  ```ts
  // app.module.ts
  import { Module } from '@nestjs/common'
  import { CatsController } from './cats/cats.controller'
  import { CatsService } from './cats/cats.service.ts';

  @Module({
    controllers: [CatsController],
    providers: [CatsService],
  })
  export class AppModule {}
  ```
  </p>
  </details>

  - 예시 1:
    - cats.service.ts에서 @Injectable()데코레이터는 CatsService클래스를 Nest IoC 컨테이너가 관리할 수 있는 클래스로 선언함.
  - 예시 2: 
    - cats.controller.ts에서 CatsController는 생성자 삽입으로 CatsService 토큰에 대한 종속성을 선언함.
  - 예시 3:
    - app.module.ts에서 CatsService 토큰을 cats.service.ts 파일의 CatsService 클래스와 연결함(==등록함)
    - 연결순서:
      - 1. Nest IoC 컨테이너가 CatsController를 인스턴스화하면 먼저, 모든 종속성을 찾음.
      - 2. CatsService 종속성을 찾으면, CatsService클래스를 리턴하는 CatsService 토큰을 검색.
      - 3. 기본동작인 SINGLETON범위를 가정하면 Nest는 CatsService의 인스턴스를 작성하여 캐시하고 리턴하거나 이미 캐시 된 경우, 기존 인스턴스를 리턴함.
  
2. 
  