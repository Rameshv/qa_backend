
# General Info

As advised in the specification, there are different repos for each client & server. 

1. Server is written in Node/ExpressJs/SocketIO and MongoDB.
2. Client is written in React/Tailwind & SocketIO client

## How to run in development mode

Since server & run in 2 different repos, first you can start backend server with `npm start`. And make sure `mongod` is running.

This would start the server in `http://localhost:3000`

Now you `cd frotnend` and make sure to change the `app_url` variable in `App.js` to point correctly. And start the client app by `npm run start`. This will run the react & tailwind & socketio app with fast refresh (HMR). Since the port 3000 is already in use by backend, it will start the client in `http://localhost:3001`

Since these 2 are in two different ports, `CORS` will throw all kinds of errors in client side. To fix that I have already enable `CORS` in backend to allow localhost whitelisted for socket io.

## How to run in deployment

Run `npm run build` in frontend repo, and this will produce a `build` folder with everything baked in.

Copy the `build` folder into backend app, and rename it to `public`. Thats it. Now you can deploy in any hosting platform.

# Demo

You can access the demo here https://qa-pickfu.herokuapp.com/

Since it has realtime updates enabled with socket io, you can open the same URL another tab and start asking & answering.

You will see the new questions & answers will be updated immediately in all the instances as they have added in the database.



