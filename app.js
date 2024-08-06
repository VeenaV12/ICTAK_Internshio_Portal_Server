const express = require('express')
const cors = require('cors')
const path = require('path');
require('dotenv').config()
require('./DB/mongoDB')

const app = express()
app.use(express.json());


const corsOptions = {
  origin: "https://ictak-internship-portal-client-two.vercel.app",
  credentials: true,
  methods: ['POST', 'GET', 'DELETE', 'PUT'],
  allowedHeaders: ['Content-Type', 'Authorization','token']
};



//app.use(cors());

app.use(cors(corsOptions));
/*app.use(cors({
  origin:"https://ictak-internship-portal-client-two.vercel.app",
  credentials:true,
  methods:['POST','GET','DELETE','PUT'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));*/


app.use(express.static(path.join(__dirname, 'public','static')));



app.use('/Uploads', express.static(path.join(__dirname, 'Uploads')));
//app.use('/Uploads', cors(corsOptions), express.static(path.join(__dirname, 'Uploads')));
app.get('/api/download/:filename', (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(__dirname, 'Uploads', filename);

  res.sendFile(filePath, (err) => {
    if (err) {
      console.error('File send error:', err);
      res.status(404).send('File not found');
    }
  });
});


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
  res.sendFile(path.join(__dirname, 'public','static', 'index.html'));
});

const port = process.env.PORT || 4000
app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})