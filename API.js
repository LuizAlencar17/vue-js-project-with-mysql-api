const express = require('express');
const app = express();         
const bodyParser = require('body-parser');
const port = 3000; //Standard port
const mysql = require('mysql');
const router = express.Router();

//Database Credentials
function execSQLQuery(sqlQry, res){
    const connection = mysql.createConnection({
        host    :'xxxxxxx',
        port    :11111,
        user    :'xxxxxxx',
        password:'xxxxxxx',
        database:'xxxxxxx'
    });
   
    connection.query(sqlQry, function(error, results, fields){
        if(error) 
          res.json(error);
        else
          res.json(results);
        connection.end();
        console.log("Connection Made!");
    });
}

//API configuration to accept GRUD requests
app.use(function(req, res, next) { 
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//Start the server
app.listen(port);

//Configuring API to capture JSON data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', router);

router.get('/', async (req, res) => res.json({ message: 'Working!' }));

//Router GRUD of users
router.get('/user', async  (req, res) =>{
    execSQLQuery('SELECT * FROM user', res);
});

router.get('/user/:user_id', async  (req, res) =>{
    try{
        const id = req.params.user_id;
        execSQLQuery('SELECT * FROM user WHERE id='+id, res);
    }catch(err){

    }
});

router.post('/register_user', async (req, res) =>{
    try{
        const name = req.body.name;
        const address = req.body.address;
        const fone = req.body.fone;
    
        execSQLQuery(`INSERT INTO user(name, address, fone) VALUES ('${name}','${address}','${fone}')`, res);
    }catch(err){

    }
});

router.post('/update_user', async (req, res) =>{
    try{
        const name = req.body.name;
        const address = req.body.address;
        const fone = req.body.fone;
        const id = req.body.id;

        execSQLQuery(`UPDATE user SET name='${name}',address='${address}',fone='${fone}' WHERE id=`+id, res);
    }catch(err){

    }
});

router.delete('/delete_user/:user_id', async (req, res) =>{
    try{
        const id = req.params.user_id;
        execSQLQuery('DELETE FROM user WHERE id='+id, res);
    }catch(err){

    }
});
