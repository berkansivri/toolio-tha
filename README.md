
This repository includes an API (express) & UI (vue) projects for products listing.

# API

To be able to get products from API project, you need to provide Shopify API credentials.

- .env
```
STORE_NAME=
API_VERSION=
API_KEY=
API_PASSWORD=
```

## Products
- ![#c5f015](https://via.placeholder.com/15/c5f015/000000?text=+) `GET` **/products**


| Parameter | Description |
| --- | ----------- |
| fields | Describe the returning fields of products |
| title | Filtering products by *title* field|

&nbsp;

#### Sample Request

* localhost:3000/products?**fields**=id,title&**title**=car

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