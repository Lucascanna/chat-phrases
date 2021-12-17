# Split Chat Phrases

This repo contains the implementation of a coding Kata whose requirements are stated in [ASSIGNMENT.md](./ASSIGNMENT.md)

## How to start the application

* Ensure you have installed the following software on your machine
  * [nvm](https://github.com/nvm-sh/nvm)
  * [npm](https://www.npmjs.com/)
* Clone this repository and execute the following command for launching the test suite
```sh
nvm i && npm ci && npm t
```
* Place the file containing the chat you want to parse in the `data` folder
* Execute the following command to parse it
```sh
npm start -- <filename>
```
For example:
```sh
npm start -- chat_example.txt
```

