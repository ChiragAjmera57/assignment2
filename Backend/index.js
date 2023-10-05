const express = require('express');
const mysql = require('mysql2');
const app = express();
var cors = require('cors')

const bodyParser = require('body-parser'); 

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



 
app.use(cors())
 
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '9571289935c',
  database: 'fav',
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL: ' );
    return;
  }
  console.log('Connected to MySQL  ' );
});


app.get('/', (req, res) => {
    res.send('Welcome to the base route!');
  });
  


  app.post('/register', (req, res) => {
    var { favoriteMovies } = req.body;
    
    const favId = parseInt(favoriteMovies);
  
    console.log(favId);
  
    const query = `INSERT INTO user_fav (fav_id) VALUES (${favId})`;
    db.query(query, (err, result) => {
      if (err) {
        console.error('Error inserting user data: ' + err);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
      res.status(201).json({ message: 'Data saved' });
    });
  });
  


const PORT =  5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
