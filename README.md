# Contactbook app
A simple app for searching contacts. 🧐

## 🛠 Setup
Install [json-server]('https://github.com/typicode/json-server') globally to run a simplified JSON server service:
`npm install -g json-server`

The JSON server gets its data from the **db.json** file in the project root directory. Modify the DB file to add all contacts' information. A sample set of items is already provided.

## 🦄 Run
To start the JSON server, run the following command in the project root directory:
`json-server --watch db.json`

The service starts on port 300 by default so you should be able to see the home page on [http://localhost:3000/](http://localhost:3000/). The home page lists all resources by the key provided in the JSON DB file. Thus, the contacts endpoint should be accessible at [http://localhost:3000/contacts](http://localhost:3000/contacts).
