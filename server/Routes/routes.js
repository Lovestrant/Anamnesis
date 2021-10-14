const express= require('express');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const router = express.Router();
const dotenv = require('dotenv');
const { query } = require('express');
const session = require('express-session');
const saltRounds = 10;


dotenv.config({path: './.env'});
//create mysql connection

sqldb = mysql.createConnection({
    user: process.env.USER,
    host: process.env.HOST,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
})


//create routes 
//post route
router.post("/Signup", (req,res) => {
    let fullname = req.body.fullName;
    let password = req.body.password;
    let licence = req.body.licenceNumber;
    let phonenumber = req.body.phonenumber;
    let id = "";

    //checking if user exists

sqldb.query("SELECT * FROM authentication where phonenumber=? LIMIT 1",phonenumber,
     (error,result) => {
        if(error){
            console.log(error);
        }
       if(result >0){
            res.send({message: "A user with same phonenumber exists"});
        }
            //hashing password
            bcrypt.hash(password,saltRounds, (err,hash) => {
                if(err){
                    console.log(err);
                }  
                bcrypt.hash(licence,saltRounds, (err,hash2) => {
                    if(err){
                        console.log(err);
                    }
                    //save hashed password
                    sqldb.query("INSERT INTO authentication values(?,?,?,?,?)",
                    [id,fullname,hash2,hash,phonenumber], (error,result) =>{
                        console.log(error);
                        console.log(result);
                    });
                    if(query) {
                        res.send('We cool dude...');
                    
                    }
                })      
                  
            })
        
        
    })
})
    

//Reset Route
router.post('/Reset', (req, res) =>{
    let Password = req.body.password
    let licence = req.body.licenceNumber
    let phonenumber = req.body.phonenumber

    sqldb.query("SELECT * FROM authentication where phonenumber = ?",
    phonenumber, (error, result) => {
        if(error){
            console.log(error)
            res.send(error)
        }

        if(result.length >0){
            bcrypt.compare(licence, result[0].licence, (error, response) => {
              if(error){
                  console.log(error)
              }
               
                if(response){
                 console.log(result)
                 //hashing the password
                 bcrypt.hash(Password,saltRounds, (err, hash) => {
                   
                    sqldb.query("UPDATE authentication set password = ? where phonenumber= ?;",
                    [hash,phonenumber], 
                    (error, ResResult) =>{
                        if(error){
                        console.log(err);
                         }
                        
                        if(ResResult){
                            res.send("Reset success.")
                        }
                        
                    }) 
            
                })
              
              
              }else{
                    res.send( "wrong Licence Number.")
                }
            })

        }else{
            res.send("No such user in the system.");
        }
    })

})

//Login route
router.post("/Login", (req,res) => {
    let Password =req.body.password;
    let Phonenumber = req.body.phonenumber;

    sqldb.query("SELECT * FROM authentication where phonenumber = ? LIMIT 1;",
    Phonenumber, (error, result) => {
        if(error){
            console.log(error)
           
        }
        if(result.length > 0) {
            bcrypt.compare(Password, result[0].password, (error,response,rows) => {
              if(error) {
                  console.log(error);
              }
               
                if(response){
                 //console.log(result)
                  req.session.phonenumber = req.body.phonenumber;
                  
                  res.send( " Login success.");
                

                }else{
                    res.send("wrong phonenumber/password combination!");
                }
         })
           
              
        }else{
            res.send( "No such user in the system.")
            //tell user to register first
        }
    })

})


//retrieve details to doctor's profile

router.get("/docDetails", (req,res) => {
    let phone = "0791638771";
    sqldb.query("SELECT * FROM authentication WHERE phonenumber = ? LIMIT 1",phone, (error, result) => {
        if(error) {
            console.log(error);
            res.send(error);
        }
        if(result) {
            res.send(result);
        }
    })
})

//get patient data
router.get("/patientData", (req,res) => {
    sqldb.query("SELECT * FROM patientrecords",(error,result) => {
        if(error) {
            console.log(error);
        }
        if(result) {
            res.send(result);
            console.log(result);
        }
    })
})

//Insert patient Records
router.post("/insertRecords", (req, res) => {
    let id = "";
    let fullname = req.body.fullname;
    let record = req.body.record;

    sqldb.query("INSERT INTO patientrecords values(?,?,?)",[id,fullname,record],(error,result) => {
        if(error) {
            console.log(error);
            res.send("Not inserted");
        }
        if(result) {
            res.send('Record created successfuly');
        }
    })

})

module.exports = router