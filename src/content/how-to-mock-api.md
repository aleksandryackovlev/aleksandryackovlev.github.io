---

id: "how-to-mock-api"
date: "2024-04-03"
title: "How to create a mock API server with Openapi and JavaScript"
description: "Mocking API is what helps to speed up the UI development. The good news is that if you use openapi specs in your development process you've got everything what you need to generate API mocks with minimum or even without any effort."
metaDescription: "Mocking API is what helps to speed up the UI development. The good news is that if you use openapi specs in your development process you've got everything what you need to generate API mocks with minimum or even without any effort."
tags:

- swagger
- openapi
- mock

---

## Why do we need to mock API

Mocking API is what helps to speed up the UI development, because it allows front-end teams not to wait until the server-side part of a product is finished to start implementing user interface.

There are a lot of tools that you can use to create mock API servers like [Mock Service Worker](https://mswjs.io/), [Postman](https://www.postman.com/), [Mirage.js](https://miragejs.com/) etc.

Unfortunately all these solutions require a lot of manual work in order to keep mocks and real back-end paths, methods and responses in sync. The configuration of your mock server should be manually updated on every change in the server-side schemata.

It's no surprise that all these solutions are error-prone and difficult to maintain.

The good news is that if you use openapi specs in your development process you've got everything what you need to generate API mocks with minimum or even without any effort.


## Setting up a basic express server

To follow along in your editor, begin by cloning the [GitHub repository](https://github.com/aleksandryackovlev/mock-api-example).

Let's set up a simple express server as a basis for our API mock:

```bash
$ npm install express cors
```

Replace the contents of the `src/index.js` file with the following code:

```javascript
// src/index.js
const express = require('express');
const cors = require('cors');

const corsConfig = {
  origin: '*',
  maxAge: 31536000,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Origin', 'Accept'],
};

const port = process.env.APP_PORT || 8004;
const app = express();

app.use(cors(corsConfig));
app.options('*', cors(corsConfig));

app.use((req, res) => {
  res.status(404).send({ message: 'Not found' });
});

app.use((err, req, res) => {
  res.status(500).send({ message: 'Internal server error' });
});

app.listen(port, () => console.log(`Server listening on port ${port}`));
```

Now we set up the basic express server. It doesn't do much responding with 404 error on every request, but it's just the beginning.

## Setting up your mock server

In order to generate mock server from the API spec in the `/api` folder we have to install `openapi-mock-express-middleware`:

```bash
$ npm install openapi-mock-express-middleware
```

Let's configure installed middleware and add it to the previously created express server in `src/index.js`:

```javascript
// src/index.js
const express = require('express');
const cors = require('cors');
// highlight-start
const path = require('path');
const { createMockMiddleware } = require('openapi-mock-express-middleware');
// highlight-end

const corsConfig = {
  origin: '*',
  maxAge: 31536000,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Origin', 'Accept'],
};

const port = process.env.APP_PORT || 8004;
const app = express();

app.use(cors(corsConfig));
app.options('*', cors(corsConfig));

// highlight-start
app.use(
  createMockMiddleware({
    spec: path.resolve(__dirname, '../api/petstore.yaml'),
  })
);
// highlight-end

app.use((req, res) => {
  res.status(404).send({ message: 'Not found' });
});

app.use((err, req, res) => {
  res.status(500).send({ message: 'Internal server error' });
});

app.listen(port, () => console.log(`Server listening on port ${port}`));
```

Now you can start the server

```bash
$ npm start
```

and make sure that we've got a working mocked API by making a request to it:

```bash
$ curl --request GET --url 'http://localhost:8004/pet/findByStatus?status=available' --header 'Authorization: Bearer some-token'
```

You will see something like this in the response:

```json
[
  {
    "id": 10, // By default mock takes value from the example
    "name": "doggie", // By default mock takes value from the example
    "photoUrls": [
      "irure elit amet",
      "aliqua ut irure voluptate",
      "nisi Excepteur qui dolore et",
      "Ut",
      "laborum",
      "anim labore quis",
      "enim ullamco culpa consectetur",
      "pariatur laborum non",
      "quis amet labore et ullamco"
    ],
    "tags": [
      {
        "id": 64133274,
        "name": "occaecat Excepteur"
      },
      {
        "id": -19480626,
        "name": "esse sed ipsum"
      }
    ],
    "status": "available" // By default mock takes value from the enum
  },
  {
    "id": 10, // By default mock takes value from the example
    "name": "doggie", // By default mock takes value from the example
    "photoUrls": [
      "ipsum enim irure",
      "do",
      "sint Duis",
      "ullamco tempor eiusmod amet cupidatat",
      "enim laboris fugiat sunt"
    ],
    "tags": [
      {
        "id": 76654839,
        "name": "ullamco eiusmod laboris officia Ut"
      },
      {
        "id": 5808085,
        "name": "ullamco eiusmod laboris officia Ut"
      }
    ],
    "status": "pending"
  }
]
```

## Making mocked responses look more realistic

The response doesn't look very realistic for now, because the generated data is just a bunch of meaningless strings and numbers. With `openapi-mock-express-middleware` we can easily fix this issue by plugging some random data generator into it. For this example project I choose [Chance.js](https://chancejs.com/index.html), but it's possible to use any generator or even create your own.

Install `chance.js` which will produce more realistic results for mock responses:

```bash
$ npm install chance
```

Now change the `src/index.js` file like this:

```javascript
// src/index.js
const express = require('express');
const cors = require('cors');
const path = require('path');
const { createMockMiddleware } = require('openapi-mock-express-middleware');
// highlight-next-line
const Chance = require('chance');

const corsConfig = {
  origin: '*',
  maxAge: 31536000,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Origin', 'Accept'],
};

const port = process.env.APP_PORT || 8004;
const app = express();

app.use(cors(corsConfig));
app.options('*', cors(corsConfig));

app.use(
  createMockMiddleware({
    spec: path.resolve(__dirname, '../api/petstore.yaml'),
    // highlight-start
    configure: (jsf) => {
      jsf.extend('chance', () => new Chance());
    },
    // highlight-end
  })
);

app.use((req, res) => {
  res.status(404).send({ message: 'Not found' });
});

app.use((err, req, res) => {
  res.status(500).send({ message: 'Internal server error' });
});

app.listen(port, () => console.log(`Server listening on port ${port}`));
```

Start the server with `npm start` command. Now you are able to get more realistic responses from a generated mock server. All you have to do is to add some lines of code to the `api/petstore.yaml` file.
Change the schemas in the yaml file like this:

```yaml
# components/schemas/Category
Category:
  type: object
  required:
    - id
    - name
  properties:
    id:
      type: integer
      format: int64
      # Generates a natural number. See https://chancejs.com/basics/natural.html
      # highlight-start
      x-chance:
        natural:
          min: 2000
          max: 9999
      # highlight-end
    name:
      type: string
      # Generates a sentence. See https://chancejs.com/text/sentence.html
      # highlight-start
      x-chance:
        sentence:
          words: 3
      # highlight-end

# components/schemas/Tag
Tag:
  type: object
  required:
    - id
    - name
  properties:
    id:
      type: integer
      format: int64
      # Generates a natural number. See https://chancejs.com/basics/natural.html
      # highlight-start
      x-chance:
        natural:
          min: 2000
          max: 9999
      # highlight-end
    name:
      type: string
      # Generates a word. See https://chancejs.com/text/word.html
      # highlight-start
      x-chance: word
      # highlight-end

# components/schemas/Tag
Pet:
  required:
    - id
    - name
    - photoUrls
    - status
    - tags
  type: object
  properties:
    id:
      type: integer
      format: int64
      # Generates a natural number. See https://chancejs.com/basics/natural.html
      # highlight-start
      x-chance:
        natural:
          min: 5000
          max: 9999
      # highlight-end
    name:
      type: string
      # Generates a first name. See https://chancejs.com/person/first.html
      # highlight-start
      x-chance: first
      # highlight-end
    category:
      $ref: '#/components/schemas/Category'
    photoUrls:
      type: array
      items:
        type: string
        # Generates a gravatar url. See https://chancejs.com/web/avatar.html
        # highlight-start
        x-chance: avatar
        # highlight-end
    tags:
      type: array
      items:
        $ref: '#/components/schemas/Tag'
    status:
      type: string
      description: pet status in the store
      enum:
        - available
        - pending
        - sold
```

Now if you make the request again

```bash
$ curl --request GET --url 'http://localhost:8004/pet/findByStatus?status=available' --header 'Authorization: Bearer some-token'
```

you are going to get something that will look like a real response from the server:

```json
[
  {
    "id": 9533,
    "name": "John",
    "photoUrls": [
      "//www.gravatar.com/avatar/ab0359a88928ac60c98b8c41c77d52cf",
      "//www.gravatar.com/avatar/db1ad06b39ff51e7d94fe0056d6f2a7c",
      "//www.gravatar.com/avatar/279b035d208f97d46f8cf46c97cf6479",
      "//www.gravatar.com/avatar/9ee1931466c03ca3674422c412fd5d5d",
      "//www.gravatar.com/avatar/fc7676fcb4dd0b1d9c3f7caf0f713731",
      "//www.gravatar.com/avatar/8a37ca280f745f22afab36d7c8512773",
      "//www.gravatar.com/avatar/94d2038c6a691f190aec724aae16b8d5"
    ],
    "status": "available",
    "tags": [
      {
        "id": 8561,
        "name": "ziwolo"
      },
      {
        "id": 3201,
        "name": "cad"
      },
      {
        "id": 9004,
        "name": "bajmar"
      },
      {
        "id": 2076,
        "name": "satihma"
      },
      {
        "id": 8864,
        "name": "zelokib"
      },
      {
        "id": 5494,
        "name": "ovijubwa"
      },
      {
        "id": 6301,
        "name": "guvsaudo"
      },
      {
        "id": 2029,
        "name": "kovkobwok"
      },
      {
        "id": 2205,
        "name": "weceleh"
      },
      {
        "id": 8061,
        "name": "pewiben"
      },
      {
        "id": 9734,
        "name": "lohuke"
      }
    ],
    "category": {
      "id": 6783,
      "name": "Ultef nogzu oh."
    }
  },
  {
    "id": 6643,
    "name": "Caleb",
    "photoUrls": [
      "//www.gravatar.com/avatar/e7d74ac46f00a1d97c13112b3673aace",
      "//www.gravatar.com/avatar/fb4bd74692942ca37cbbd1fa05edcf98",
      "//www.gravatar.com/avatar/12f1ad9e1263691853dcad2e33e15103",
      "//www.gravatar.com/avatar/5ed0274c2fad16f482236742c6e06c90",
      "//www.gravatar.com/avatar/1ba356a218e96833375ddd8ce224518e",
      "//www.gravatar.com/avatar/ee14baaa4032a6786a89224e4ec896ef",
      "//www.gravatar.com/avatar/b12c46d923215f11e83bf3c6d2845e96",
      "//www.gravatar.com/avatar/39a41f1c12301072ebe770fd04ff5915",
      "//www.gravatar.com/avatar/aea8d689ba66a12f615caee2d77fc976"
    ],
    "status": "sold",
    "tags": [
      {
        "id": 2520,
        "name": "aki"
      },
      {
        "id": 6395,
        "name": "bil"
      },
      {
        "id": 9201,
        "name": "eghen"
      },
      {
        "id": 4082,
        "name": "fir"
      },
      {
        "id": 4251,
        "name": "no"
      },
      {
        "id": 2775,
        "name": "vagelgos"
      }
    ]
  },
  {
    "id": 5184,
    "name": "Catherine",
    "photoUrls": [
      "//www.gravatar.com/avatar/74b6f317f9ec3dc9e04ecf3e8c2791d7",
      "//www.gravatar.com/avatar/d33a38e362a86d81caff12785d869f5c",
      "//www.gravatar.com/avatar/dcbc95dd9d011d9a299fcdfcc8cd1906",
      "//www.gravatar.com/avatar/1c9b0611c5e582ceccf09c832328abc3",
      "//www.gravatar.com/avatar/21c07e675227e4ba2716a53d254f58ff",
      "//www.gravatar.com/avatar/f1cb161f86aa202a18fcc45c0c7f1a85",
      "//www.gravatar.com/avatar/dbf1d1caae8916f2093a0929e7ba455c",
      "//www.gravatar.com/avatar/d700bf8fa1bc2019e85ea58a664f3448",
      "//www.gravatar.com/avatar/d813ad6c18a3b3fce410ee2a98391f70",
      "//www.gravatar.com/avatar/24a9569d6775b71a4ccb219970de905c",
      "//www.gravatar.com/avatar/fdda561f4f2b1504db723fb229b5be08",
      "//www.gravatar.com/avatar/225343ffcd795d3efa4ef9e677ac3210"
    ],
    "status": "pending",
    "tags": [
      {
        "id": 5531,
        "name": "gozzewde"
      },
      {
        "id": 4057,
        "name": "udpapodt"
      },
      {
        "id": 9442,
        "name": "untoca"
      },
      {
        "id": 3770,
        "name": "piuk"
      },
      {
        "id": 2374,
        "name": "muuturot"
      },
      {
        "id": 8942,
        "name": "mamjuk"
      }
    ],
    "category": {
      "id": 4526,
      "name": "Wuco merir watzo."
    }
  }
]
```

## Conclusion

Now you can add custom random responses for every request in your spec file. This is just the basic setup. With [openapi-mock-express-middleware](https://github.com/aleksandryackovlev/openapi-mock-express-middleware) you actually can do much more: use other generators of random data, you can even create and use your own functions to produce meaningful responses.
