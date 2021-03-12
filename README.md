
This repository includes an API (express) & UI (vue) projects for products listing.

# API

To be able to get products from API project, you need to provide Shopify API credentials.

- .env
```
STORE_NAME=
API_VERSION=
API_KEY=
API_PASSWORD=
CACHE_DURATION=   // (minute) default 30 min
```

## Products
- ![#c5f015](https://via.placeholder.com/15/c5f015/000000?text=+) `GET` **/products**


| Parameter | Description |
| --- | ----------- |
| fields | Describe the returning fields of products |
| limit | expected items limit for pagination |
| page | expected page items for pagination |
| **{field}** | Search products by *field* value (sample: **title=car**) | 

&nbsp;

#### Sample Request

* localhost:3000/products?**fields**=id,title&**title**=car&**limit**=10&**page**=1

---

### Install
```
yarn install
```

### Start
```
yarn start
```

### Test
```
yarn test
```

### Lint
```
yarn lint
```

&nbsp;
# UI

### Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Run unit tests
```
yarn test
```