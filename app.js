const express = require('express')
const app = express()

const mongoose = require('mongoose')
const connection_url = process.env.MONGODB_URI || 'mongodb://localhost:27017/qa'
mongoose.connect(connection_url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(`URL Shortner app listening at http://localhost:${PORT}`)
})

const { Server } = require("socket.io");
const io = new Server(server,{
    cors: {
      origins: ["http://localhost:3001"]
    }
});
const questions_controller = require('./controllers/questions_controller')(io)
const answers_controller = require('./controllers/answers_controller')(io)
const cors = require('cors')

const jsonParser = express.json();


app.set("view options", {layout: false});
app.use(express.static(__dirname + '/public'));

app.use(cors())
app.get('/',(req,res) =>{
  res.render('index.html');
})


io.on('connection',(socket) => {
  socket.on('subscribe',  (room)=>{
     socket.join(room)
  })
})


app.get('/questions/all',questions_controller.all)
app.post('/questions',jsonParser,questions_controller.create)
app.get('/questions/top',questions_controller.top)
app.get('/questions/:id/answers',answers_controller.all)
app.post('/questions/:id/answers',jsonParser,answers_controller.create)
app.get('/questions/:id/answers/top',answers_controller.top)


