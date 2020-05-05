# Nestjs example


## Todo
- [x] Init Nestjs, Models(User, Product, Order)


## Install
```bash

npm i -g @nestjs/cli
npm i --save @nestjs/core @nestjs/common rxjs reflect-metadata
npm i --save @nestjs/typeorm typeorm postgres pg

```

## Cmd

``` bash
# 1. 현재 디렉터리에서 프로젝트 생성
nest new ./

# 2. 
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