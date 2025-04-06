Shopa is a nodejs backend application for shopa ecommerce app

Prerequisites
Make sure you have the following installed:

Node.js (version >=14.x)

npm (comes with Node.js)

Check your versions:
```
node -v
npm -v
```
Installation
1. Clone the repository:
```
git clone https://github.com/ahmvddddd/shopa_backend.git

```
2. Navigate into the project directory:
```
cd shopa_backend

```
3. Install dependencies:
```
npm install
```

Running the App
```
node server.js
```
Or 
```
nodemon server.js
```

Environment Variables
Create a .env file in the root of the project and add your environment-specific variables. For example:
```
PORT=3000
MONGO_URI=mongodb://yourmongodb/url
JWT_SECRET=yourjwtsecret
```

Project Structure:
├── server.js
├── package.json
├── .env
├── /middlewares
├── /routes
├── /controllers
├── /models
└── /node_modules

