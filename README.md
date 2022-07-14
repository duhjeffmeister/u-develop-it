# u-develop-it

To start MySQL run: "brew services start mysql"

By default there's not root password. To set one type: "mysql_secure_installation"

To connect run: "mysql -uroot" where root is the username here

npm init --y: Initializes Node.js

npm install express mysql2: Installs the npm package

npm install jest --save-dev: Installs Jest

Update package.json to:

"scripts": {
  "test": "jest",
  "start": "node server.js"
},