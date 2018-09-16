# Contactbook app
A simple app for searching contacts and sending them SMS messages. 🧐 💌

## 🛠 Setup

### JSON server

Install [json-server]('https://github.com/typicode/json-server') globally to run a simple JSON server:

```
npm install -g json-server
```

The JSON server gets its data from the **db.json** file in the project root directory. Modify the DB file to add all contacts' information. A sample set of items is already provided.

Modify the **json-server.json** file in the project root directory in order to change the default port and other service properties (and don't forget to update the app config accordingly). See [json-server Github page](https://github.com/typicode/json-server) for more details about json-server.

### Contacts app
Make sure you have [yarn](https://yarnpkg.com/lang/en/) installed. The easiest way to do it is via Homebrew:

```
brew install yarn
```

Having installed yarn, download and install dependencies:

```
yarn install
```

_Note: In order to send SMS messages via app you need to setup a simple Twilio service (and also create a Twilio account) - see the next setup step for more details._

### Messaging service
The app is capable of sending POST messages to a configured URl, but does not take care of actually sending the messages as SMS. Thus, a simple messaging service is required to enable this feature. I've created a [simple Twilio-based microservice](https://github.com/rasmuslelumees/twilio-service) just for that purpose.

Follow the abovementioned service setup guidelines for a quick setup or build your own messaging service which would expose a `sendSMS` endpoint accepting `to` (receiver phone number) and `message` (message contents) parameters in the JSON body.

❗️ Make sure that the messaging service port and endpoint URL match the configuration in the contactbook app. By default the twilio-service uses port 3020 and has a router prefix `/api`, exposing the messaging on POST `http://localhost:3020/api/sendSMS` endpoint. ❗️

## 🦄 Run

### JSON server
To start the JSON server, run the following command in the project root directory:

```
json-server --watch db.json
```

The service starts on port 3010 by default so the contacts endpoint should be accessible at [http://localhost:3010/contacts](http://localhost:3010/contacts).

### Messaging service

Follow the guidelines of whichever solution (a [simple Twilio-based service]([simple Twilio-based microservice](https://github.com/rasmuslelumees/twilio-service)) or your own solution) you went for in the setup section.

### Contacts app

Run the app with hot reloading and sass preprocessing:

```
yarn start
```
The app should now run at [http://localhost:3000](http://localhost:3000).
