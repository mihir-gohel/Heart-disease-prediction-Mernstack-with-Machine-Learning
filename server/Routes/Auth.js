const express = require('express');
const router = express.Router();
const PORT = process.env.PORT;
const app = express()
require('../DB/conn');
const Patient = require('../Schema/userSchema');
const Appointment = require('../Schema/appoSchema')
const bcrypt = require('bcryptjs')
const authenticate = require('../middleware/authenticate')
const jwt = require('jsonwebtoken');



// Routes

router.post('/signup' , async (req, res) => {

    const { fname, lname, contact, email, password, cpassword } = req.body;

    if( !fname || !lname || !contact || !email || !password || !cpassword ) {
        return res.status(422).json({error: "Fill the fields properly"});
    }

    try{
        const userExist = await Patient.findOne({ email:email });

        if(userExist) {
            return res.status(423).json({error:"Email Already Exist!!"})
        }else{

        const patient = new Patient({ fname, lname, contact, email, password, cpassword });
        // encryption of password done here
        await patient.save();

        res.status(201).json({ messege : "User registered Successfully" });
        }

    } catch (err) {
        console.log(err);
    }

})

router.post('/appointments', authenticate, async (req, res) => {
    const { fname, lname, contact, email, appointment } = req.body;

    if( !fname || !lname || !contact || !email || !appointment ) {
        return res.status(422).json({error: "Fill the fields properly"});
    }

    const apt = new Appointment({ fname, lname, contact, email, appointment });
    await apt.save();

    res.status(201).json({ messege : "Appointment Sent!!" });
})
  
// router.get('/delete', (req, res) => {
//     Patient.remove({contact:"0"},(err , data) => {
//         console.log("User deleted")
//     })
// })

// const updateDocument = async (email) => {
//     const result = await Patient.updateOne({email}, {
//         $set : {
//             fname : "Mihir"
//         }
//     });
// }
    
// updateDocument("gohelmihir27@gmail.com");

router.post('/login' , async (req, res) => {
    try{
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({error : "please fill the data wecwcdwc properly"})
        }

        const userLogin = await Patient.findOne({email:email});

        if (userLogin) {
            const isMatch = await bcrypt.compare(password, userLogin.password);

            const token = await userLogin.generateAuthToken();
            console.log(token);

            res.cookie("jwtoken" , token, {
                expires: new Date(Date.now() + 25982000000),
                httpOnly:true
            });

        if(!isMatch){
            res.status(400).json({error:"user error"});
        } else {
            res.json({messege:"user login successfully"});
        }
        } else {
            res.status(400).json({error:"user error"});

        }

    }catch (err){
        console.log(err)
    }
})


router.get('/check', authenticate, (req, res) => {
    res.send(req.rootUser);
} );

router.get('/logout', (req, res) => {
    res.clearCookie('jwtoken' , { path : '/'})
    res.status(200).send('user logout');
} );


module.exports = router;