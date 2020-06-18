# TT 20-007 Aplicación de Registro de propiedad en Blockchain

### Run Project

- To run this the front-end of this project properly, please **use npm** instead of yarn due to *create-react-app* and *babel* troubleshots 

```bash

npm i

npm start

```

also for comfort open as many tabs or terminal windows as you need.

- To run contracts, follow 

```bash
truffle compile
```

Once you observe contracts are correctly compiled, They can be deployed to blockchain, truffle-config.js is setted to adapt to a bc with this config 👀

```js
development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*" // Match any network id
    }
```

so you before deploying Smart Contracts to the blockchain, be sure that Ganache is up and running, then

```bash
truffle migrate

##If changes are made to SmCtcs and want to deploy to Bc run

truffle migrate --reset
```
