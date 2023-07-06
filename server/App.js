const express = require('express');
const dotenv = require('dotenv')
const app = express();
dotenv.config({path:'./config.env'})
const PORT = process.env.PORT;
const cors = require('cors')
app.use(cors())
const cookieParser = require('cookie-parser');
app.use(cookieParser());
const jwt = require('jsonwebtoken');

require('./DB/conn.js');

app.use(express.json());

app.use(require('./Routes/Auth'));



//   ---------------------------TO INSERT A DATA IN DATABASE -----------------------------
// app.get('/insert', (req, res) => {
//     var patient = new Patient()
//     patient.name = "ghuntlo"
//     patient.contact = "1236549870"

//     patient.save((err,data)=>{
//         if (err) {
//             console.error(err)
//         }else{
//             res.status(200).send("Add thy gyo lodu")
//         }
//     })
// })

   

    // Patient.find({}, function(err, patients){
    //     if(err) console.warn(err);
    //     res.send(patients);
    // })



app.listen(PORT , (req, res) => {
    console.log(`Server is running at  ${PORT}` );

})


