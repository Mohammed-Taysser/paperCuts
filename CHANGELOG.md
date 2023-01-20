
# paperCuts changelog

## TODO

- [ ] add new image design for author details page
- [ ] refactor profile page 🙃

## Upcoming Features

- [ ] Create Review Video For Project Functionality
- [ ] Chat With Other Authors
- [ ] Add Followers & Notification & Likes & Dislike
- [ ] Add Reviews For Each Book
- [ ] Active Forget-Password Page [`see`](https://www.tutsmake.com/forgot-reset-password-in-node-js-express-mysql/)
- [ ] [`Admin Dashboard`](https://appseed.us/)
- [ ] Add Free Hand Drawer To Get Author Signature
- [ ] Crop Avatar Before Upload
- [ ] Add Toast For Login User
- [ ] Add Real Payment Methods
- [ ] Create Kids Page <https://chapterone.qodeinteractive.com/childrens-books/>
- [ ] Split Visitors To Users & Authors By Role (User By Default)
- [ ] Update UI Layout Use[`tabler`](https://preview.tabler.io)
- [ ] Create Better Documentation (Like StoryBook)
- [ ] Use UI Library Like [`Material UI`](https://mui.com/)
- [ ] Add Useful Ui Warning (Like No Cart Items With Cart Icon 💬)
- [ ] Add Require Option On Needed Schema Fields (Server)
- [ ] Redux Not Work As Token Variable At Api Call (Api/Index.Js)
- [ ] Is All Author Appear In `Author` Page. Why ?? (Use `Role` To Specify Use From Author)
- [ ] Checkbox Page Remove Input Values On Invalid Values
- [ ] Use Access Token & Refresh Token
- [ ] Update Exist Token (Api Call) As Update Avatar Use The Previous Token 😥
- [ ] Why Coupons Is Still Apply After Order Create 🥲, Is This A Feature !!
- [ ] In Auth Route User Can Use Bad Token. Add More Validation That User Already Auth 🤐
- [ ] Handel Load More Book In Book Page
- [ ] add pagination
- [ ] Handel Children Api Call (Only Parent Has Api Call)
- [ ] Use `useMemo` To Store Category & Quantity For Both Book-Details & Author-Details For. For Save Api Quota

## Useful Articles

### Token

- <https://stackoverflow.com/questions/27726066/jwt-refresh-token-flow>
- <https://www.loginradius.com/blog/identity/refresh-tokens-jwt-interaction/>
- <https://www.geeksforgeeks.org/jwt-authentication-with-refresh-tokens/>
- <https://medium.com/swlh/authentication-using-jwt-and-refresh-token-part-1-aca5522c14c8>
- <https://www.softwaresecured.com/security-issues-jwt-authentication/>
- <https://auth0.com/docs/secure/tokens/json-web-tokens>
- <https://www.permify.co/post/jwt-authentication-in-react>
- <https://www.bezkoder.com/react-jwt-auth/>
- <https://codesource.io/setting-up-react-authentication-using-jwt/>
- <https://dev.to/franciscomendes10866/how-to-use-axios-interceptors-b7d>

## 12 Jan 2023

- add new layout for book details taps
- refactor api calling using `redux` & `redux-toolkit`
- drop some api calling like testimonials and services and using theme as constants
- drop using `localStorage`
- replace `localStorage` with `js-cookie`for saving token
- move constants from page to single folder
- use `lazy-loading` for routing
- create `error-boundary` for handel untracked errors
- separate complex component to single directory like homepage
- fix bootstrap files bug
- fix token not recognize until reload the page
- refactor books details page as move cart item manipulate to cart page

## 16 Jun 2022

- Error While Two User Add Same Book To Cart Or Wishlist
- Make Author Dropdown In Auth With More Features
- Check Exist Cart Items Before Checkout
- Create Dropdown For Other Utilities Instead Of `Sitemap` Page
- Add Validation For Profile Page Input (Email, Username, Etc...)
- Refactor Api Call (Create Axios Instance 😈)
- Update Profile Setting (Page)
- Checkout (Form Not Appear With No Cart Items)

## 8 May 2022

- Introduce Redux & Node.Js
- Use Express As Api
- Restructure Sass Files As Pages
- Drop Reviews
- Drop Forget-Password Page
- Drop Book Types `[ "Paperback", "Hardcover", "Audiobook", "Audio", "Cd", "Kindle" ]`
- Remove Books From Profile (Only Add By Admin)
- Drop Crop Avatar In Profile Page
- Replace Coupon Context With Redux Cart Store
- Drop Author Signature
- Create Order Status (Progress, Etc...)

## 5 Apr 2022

- add 404 image for broken images
- update register with username & confirm password
- organize auth pages & noAuth pages
- empower book search page
- fix login page error loading not end
- remove user as reader from DB
- create tree with folder & files

## 1 Apr 2022

- update sign in to be `sign as author` or `sign as user`
- add back to top btn
- update profile page
- start using placeholder
- add delete feather for books comments
- create avatar cropper on profile page
- finish `add to cart` component
- make every user has it's own list of wishlist & orders
- update page title
- handel cart quantity change
- add review in book details page

## 13 Mar 2022

- create `routes.jsx` instead of `routes/index.jsx`
- remove `isJsonServerDown` context
- update search & filter books
- replace `search book` page with filter in `books` page
- update needed images
- update json-server data
- fix navbar & footer link
- reduce api data size and reduce it with static but dynamic data
- active comment for each book
- refactor how to get books by one component

## 12 Feb 2022

- Init Project With React
- use `localStorage` to save auth (login)
- const Context` to save applied coupon
