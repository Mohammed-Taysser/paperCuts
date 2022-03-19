# [paperCuts][vercel-live]

<div style='text-align:center;'>
  <a href='https://papercuts.vercel.app/'>
    <img src='src/assets/images/icons/favicon.png' height='150px' style='display:block;margin: auto;'>
  </a>
</div>

paperCuts is a site that lists free eBooks 📚 and online books related to programming, computer science, software engineering, web design and more which are provided by publishers or authors on their websites legally. We do not host pirated books or we do not link to sites that host pirated books.

for live demo

- [![vercel](https://img.shields.io/badge/-vercel-05122A?style=plastic&logo=vercel)][vercel-live]
- [![Netlify Status](https://api.netlify.com/api/v1/badges/e892e00f-462d-447b-8941-f45d11701c94/deploy-status)][netlify-live]

[vercel-live]: https://papercuts.vercel.app/
[netlify-live]: https://papercuts-project.netlify.app/

## Used tools

- [`Bootstrap`](https://getbootstrap.com/)
- [`Axios`](https://axios-http.com/)
- [`React.js`](https://reactjs.org/)
- [`React-Router-Dom`](https://reactrouter.com/docs/en/v6/getting-started/tutorial)
- [`React-Icons`](https://react-icons.github.io/react-icons)
- [`sass`](https://sass-lang.com/)

## Quick start 🚀

### First Step

Download the files from [releases](https://github.com/Mohammed-Taysser/paperCuts/releases) or clone it with **git** version control:

```shell
git clone https://github.com/Mohammed-Taysser/paperCuts.git
```

### Second Step

Inside Papercuts Directory Install Dependencies By

```shell
npm install
```

### Pre Last Step

Start Json Server

```shell
npm run json-server
```

### Last Step

Start The Development Server

```shell
npm start
```

## Features 💬

- Designed with progressive enhancement in mind.
- Standalone With Only React
- Using Hooks & Context & localStorage To Save And Deal With Data

## Adding Bootstrap

```shell
npm install bootstrap
```

Import Bootstrap CSS and optionally Bootstrap theme CSS in the beginning of your `src/index.js` file:

```js
import 'bootstrap/dist/css/bootstrap.css';
// Put any other imports below so that CSS from your
// components takes precedence over default styles.
```

### Using a Custom Theme

To enable `scss` in Create React App you will need to install `sass`.

```shell
npm install sass
```

To customize Bootstrap, create a file called `src/custom.scss` (or similar) and import the Bootstrap source stylesheet. Add any overrides before the imported file(s). You can reference [Bootstrap's documentation](https://getbootstrap.com/docs/4.6/getting-started/theming/#variable-defaults) for the names of the available variables.

```scss
// Override default variables before the import
$body-bg: #000;

// Import Bootstrap and its default variables
@import '~bootstrap/scss/bootstrap.scss';
```

Finally, import the newly created `.scss` file instead of the default Bootstrap `.css` in the beginning of your `src/index.js` file, for example:

```js
import './custom.scss';
```

## Json Server

Thanks to [`json server`](https://www.npmjs.com/package/json-server) for create a full fake REST API with zero coding in less than 30 seconds

please make sure it work to enable update via server

### how to start it

inside paperCuts directory

1. using node directly `node src/json_server/server.js`
2. with npm task `npm run json-server`

## deside to use only json-server

in this case you need to the [`db.json`](src/api/db.json) that provide the needed api call like authors, coupon ..

so let's numerate waht we need

- install `json-server`
- use `db.json` as db call
- make sure server run on `8080` port

### how to change live port

inside [`src/json_server/server.js`](https://github.com/Mohammed-Taysser/paperCuts/blob/a6a2357d838063f6641a75b98485f388d8d608f3/src/json_server/server.js#L1) in first line you can change the port to any one you want

also create fake json using [`mockaroo`](https://mockaroo.com/)

Used Public Dataset

- [authors](https://mockaroo.com/8b7588a0)
- [books](https://mockaroo.com/2ae647e0)
- [cart](https://mockaroo.com/b5bf7990)
- [categories](https://mockaroo.com/386903)
- [coupons](https://mockaroo.com/fb04ecc0)
- [reviews](https://mockaroo.com/2ae647e0)
- [wishlist](https://mockaroo.com/b5bf7990)

for image url use [`picsum.photos`](https://picsum.photos/)

## Special Thanks For Inspiration To

- [chapter-one-bookstore](https://themeforest.net/item/chapterone-bookstore-and-publisher-theme/24715791)
- [dbooks](https://www.dbooks.org/)

## additional tips

### create tree map

you can use `tree`

the `.` to use the current directory(don't forget to use it inside our project directory which call `paperCuts`)

[`TREE.md`](TREE.md) is the output file name

`-I "directory name"` use to exclude un-needed directory like `node_modules`

```shell
tree  . > TREE.md  -I "node_modules"
```
