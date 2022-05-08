
# DB architecture

## tables

```json
{
  "authors": [],
  "users": [],
  "services": [],
  "category": [],
  "books": [],
  "testimonials": [],
  "reviews": [],
  "team": [],
  "cart": [],
  "wishlist": [],
  "coupons": [],
  "orders": [],
  "events": []
}
```

## schemas

- [`authors`](https://mockaroo.com/952c7990)
- [`users`](https://mockaroo.com/a6ddfa30)
- [`category`](https://mockaroo.com/aea860d0)
- [`books`](https://mockaroo.com/2ae647e0)
- [`reviews`](https://mockaroo.com/ef2a8590)
- [`team`](https://mockaroo.com/806f9af0)
- [`cart`](https://mockaroo.com/9b7b9d90)
- [`wishlist`](https://mockaroo.com/3f7d4690)
- [`coupon`](https://mockaroo.com/f80efe30)
- [`orders`](https://mockaroo.com/3c68b940)
- [`events`](https://mockaroo.com/e606e610)

## sample

```json
{
  "authors": [
    {
      "id": 1,
      "firstName": "Carmella",
      "lastName": "O'Caherny",
      "username": "cocaherny0",
      "email": "cocaherny0@icq.com",
      "password": "fXxbmha",
      "gender": "F",
      "avatar": "https://robohash.org/voluptasmolestiaeid.png?size=200x200&set=set1",
      "info": ".",
      "extraInfo": ".",
      "socialMedia": {
        "twitter": "https://irs.gov/blandit/ultrices/enim/lorem.png",
        "facebook": "http://mapquest.com/in/felis/donec.html",
        "telegram": "http://bandcamp.com/pellentesque/eget/nunc/donec/quis/orci.html",
        "instagram": "https://g.co/quis/odio/consequat.png"
      },
      "category": [
        1,
        5,
        6
      ],
      "books": [
        1,
        19,
        20
      ],
      "signature": "https://cdn.jsdelivr.net/gh/Mohammed-Taysser/rakm1@master/paperCuts/signatures/signature-3.png"
    }
  ],
  "users": [
    {
      "id": 1,
      "firstName": "Lilli",
      "lastName": "Rowlin",
      "email": "lrowlin0@hubpages.com",
      "gender": "F",
      "password": "VYJUSkOW",
      "image": "https://picsum.photos/id/430/200/200",
      "info": "Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.\n\nCurabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.\n\nPhasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum."
    }
  ],
  "services": [
    {
      "id": 1,
      "title": "Bestsellers",
      "info": "Actors and the Art of Performance: Under Exposure combines the author's two main biographical paths ",
      "img": "https://cdn.jsdelivr.net/gh/Mohammed-Taysser/rakm1@master/paperCuts/services/img/img-1.png"
    }
  ],
  "category": [
    {
      "id": 1,
      "title": "Art",
      "slug": "art",
      "img": "https://cdn.jsdelivr.net/gh/Mohammed-Taysser/rakm1@master/paperCuts/categories/img/img-1.ico",
      "books": [
        2,
        3,
        4
      ]
    }
  ],
  "books": [
    {
      "id": 1,
      "title": "Idiot's Delight",
      "slug": "idiots-delight",
      "info": "",
      "extraInfo": "",
      "image": "https://cdn.jsdelivr.net/gh/Mohammed-Taysser/rakm1@master/paperCuts/books/img/img-1.jpg",
      "price": 99.94,
      "types": [
        "Audiobook",
        "Hardcover",
        "Paperback",
        "CD"
      ],
      "stars": 2,
      "publisher": "Gigazoom",
      "publishedAt": "2004-08-28T17:40:21Z",
      "pages": 700,
      "edition": 7,
      "language": "Hebrew",
      "pdfSize": 38.75,
      "category": [
        2
      ],
      "author": {
        "id": 14,
        "name": "Jedediah Downing"
      },
      "reviews": [
        14,
        17
      ]
    }
  ],
  "testimonials": [
    {
      "id": 1,
      "customer": "Ernest Hemingway",
      "img": "https://cdn.jsdelivr.net/gh/Mohammed-Taysser/rakm1@master/paperCuts/authors/img/avatar-1.png",
      "info": "",
      "rate": 4
    }
  ],
  "reviews": [
    {
      "id": 1,
      "name": "Nerissa Mickleburgh",
      "bookId": 5,
      "userId": 2,
      "info": "",
      "stars": 4,
      "date": "2021-03-28T12:53:49Z",
      "image": "https://picsum.photos/id/905/200/200",
      "email": "nmickleburgh0@aboutads.info"
    }
  ],
  "team": [
    {
      "id": 1,
      "first_name": "Simmonds",
      "avatar": "https://cdn.jsdelivr.net/gh/Mohammed-Taysser/rakm1@master/paperCuts/authors/img/avatar-3.png",
      "email": "sjone0@cnet.com",
      "position": "Mechanical Systems Engineer",
      "socialMedia": {
        "twitter": "http://spiegel.de/lobortis/ligula.html",
        "facebook": "https://noaa.gov/sodales/sed.html",
        "telegram": "https://smh.com.au/ut/erat/curabitur/gravida/nisi.png",
        "instagram": ""
      }
    }
  ],
  "cart": [
    {
      "id": 1,
      "userId": 16,
      "title": "Aliens of the Deep",
      "slug": "aliens-of-the-deep",
      "image": "https://cdn.jsdelivr.net/gh/Mohammed-Taysser/rakm1@master/paperCuts/books/img/img-1.jpg",
      "price": 185.43,
      "quantity": 20,
      "type": "CD"
    }
  ],
  "wishlist": [
    {
      "id": 1,
      "userId": 18,
      "title": "Unleashed (Danny the Dog)",
      "slug": "unleashed-danny-the-dog",
      "image": "https://cdn.jsdelivr.net/gh/Mohammed-Taysser/rakm1@master/paperCuts/books/img/img-1.jpg"
    }
  ],
  "coupons": [
    {
      "id": 1,
      "label": "system engine",
      "start": "9/8/2021",
      "end": "5/5/2021",
      "value": 117.83,
      "users": 892,
      "userId": 16
    }
  ],
  "orders": [
    {
      "id": 1,
      "userId": 19,
      "firstName": "Nicoline",
      "lastName": "Clifforth",
      "email": "nclifforth0@zdnet.com",
      "country": "Philippines",
      "address": "8 Sunfield Trail",
      "phone": "+63 673 260 0411",
      "additionalNote": "",
      "paymentMethod": "visa",
      "cartItems": [
        {
          "id": 1,
          "title": "Sinivalkoinen valhe",
          "price": 18.65,
          "quantity": 6,
          "image": "https://cdn.jsdelivr.net/gh/Mohammed-Taysser/rakm1@master/paperCuts/books/img/img-1.jpg"
        }
      ]
    }
  ],
  "events": [
    {
      "id": 1,
      "title": "Making Love",
      "slug": "making-love",
      "hosting": "Jatri",
      "venue": "Tillman Inc",
      "price": 99.4,
      "start": "7:15 AM",
      "end": "3:29 AM",
      "info": "",
      "address": "594 Esker Point",
      "email": "lcockle0@arizona.edu",
      "phone": "+95 526 476 1697",
      "image": "https://picsum.photos/id/305/1000/1000",
      "date": "2022-12-05T22:34:33Z",
      "map": ""
    }
  ]
}
```
