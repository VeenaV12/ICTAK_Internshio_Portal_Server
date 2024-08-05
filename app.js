const express = require('express')
const cors = require('cors')
const path = require('path');
require('dotenv').config()
require('./DB/mongoDB')

const app = express()
app.use(express.json());
app.use(cors());
app.use('/Uploads', express.static(path.join(__dirname, 'Uploads')));


const authRouter = require('./Routers/authRouter');
const projectRouter = require('./Routers/projectRouter')
const referenceRouter = require('./Routers/referenceRouter')
const forumRouter = require('./Routers/forumRouter')
const submitRouter = require('./Routers/Postroutes');

app.get('/', (req, res) => {
  res.send('Hello, World!');
});


app.use('/', authRouter);
app.use('/', projectRouter);
app.use('/', referenceRouter)
app.use('/', forumRouter)


// app.get('/*',function(req,res){res.sendFile(path.join(__dirname,'../Frontend/index.html'));});

app.use('/', submitRouter);

const port = process.env.PORT || 4000
app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})