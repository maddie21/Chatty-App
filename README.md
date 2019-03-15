# Chatty App Project 

=============================

Chatty will allow users to communicate with each other without having to register accounts. It uses React, a popular front-end library created and used heavily by Facebook as well as modern tools for Node including Webpack and Babel.

### Gettin Started

Clone the boilerplate and create your own git repo.

```
git clone git@github.com:lighthouse-labs/react-simple-boilerplate.git
cd react-simple-boilerplate
git remote rm origin
git remote add origin [YOUR NEW REPOSITORY]
# Manually update your package.json file
```

Install the dependencies and start the server.

```
npm install
npm start
open http://localhost:3000
```

### Final Product 

!["Screenshot of Final Chatty App"](https://github.com/maddie21/Chatty-App/blob/master/docs/chattyapp.png?raw=true)

- When any connected user sends a chat message, all     connected users receive and display the message
- When any connected user changes their name, all       connected users are notified of the name change
    - Notifications are styled differently from chat messages
- Header will display the count of connected users
- When the number of connected users changes, this      count will be updated for all connected users



### Dependencies

* React
* Webpack
* [babel-loader](https://github.com/babel/babel-loader)
* [webpack-dev-server](https://github.com/webpack/webpack-dev-server)
