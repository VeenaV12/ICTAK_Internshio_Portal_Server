const express = require('express')
const cors = require('cors')
const path = require('path');
require('dotenv').config()
require('./DB/mongoDB')

const app = express()
app.use(express.json());
//app.use(cors());


app.use(cors({
  origin:"https://ictak-internship-portal-client-two.vercel.app",
  credentials:true,
  methods:['POST','GET','DELETE','PUT']
}));


app.use(express.static(path.join(__dirname, 'frontend-build')));

// Catch-all route to serve the frontend app



app.use('/Uploads', express.static(path.join(__dirname, 'Uploads')));


const authRouter = require('./Routers/authRouter');
const projectRouter = require('./Routers/projectRouter')
const referenceRouter = require('./Routers/referenceRouter')
const forumRouter = require('./Routers/forumRouter')
const submitRouter = require('./Routers/Postroutes');

app.get('/', (req, res) => {
  res.send('Hello, World!');
});


/*app.use('/', authRouter);
app.use('/', projectRouter);
app.use('/', referenceRouter)
app.use('/', forumRouter)
app.use('/', submitRouter);*/

app.use('/api/auth', authRouter);
app.use('/api/projects', projectRouter);
app.use('/api/references', referenceRouter);
app.use('/api/forums', forumRouter);
app.use('/api/submissions', submitRouter);


// app.get('/*',function(req,res){res.sendFile(path.join(__dirname,'../Frontend/index.html'));});



app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend-build', 'index.html'));
});

const port = process.env.PORT || 4000
app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})