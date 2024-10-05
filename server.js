const express = require('express');
const { validate } = require('deep-email-validator');
const cors = require('cors')

const app = express();



app.use(express.json());
// Connect to MongoDB
// Replace 'your-connection-string-here' with your actual MongoDB connection string
// const uri = 'your-connection-string-here';
// mongoose.connect(uri)
//    .then(() => console.log('MongoDB connected'))
//    .catch((err) => console.error('Error connecting to MongoDB', err));


// // Define the User model
// const userSchema = new mongoose.Schema({
//    email: { type: String, required: true, unique: true },
//    password: { type: String, required: true }
// });
// const User = mongoose.model('User', userSchema);

const whiteList = ['http://localhost:3000', 'https://www.bing.com', 'https://www.brave.com','https://www.edge.com']
const corsOptions = {
    origin: (origin, callback)=>{
        if(whiteList.indexOf(origin)!==-1){
            callback(null, true) //first param defines the error
        }
        else{
            callback(new Error("Not allowed by cors"))
        }
    },
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions))
app.set("view engine", "ejs")

 app.get("/", (req, res)=>{
//    // console.log("in get function")
        res.send("Welcome to the site!")
//     //going to render some html:
//     res.render('index', {text: "Walt Disney"})
})

// register route
// app.post('/register', async (req, res) => {
//    const { email, password, passwordverify } = req.body;


//    // Validate the email
//    const validationResult = await validate(email);


//    if (!validationResult.valid) {
//        return res.status(400).send({
//            status: 'error',
//            message: 'Email is not valid. Please try again!',
//            reason: validationResult.reason
//        });
//    }


//    // Validate password similarity
//    if (password !== passwordverify) {
//        return res.status(400).json({
//            status: 'error',
//            message: 'Passwords do not match'
//        });
//    }


//    try {
//        // Check if user already exists
//        const foundUser = await User.findOne({ email });
//        if (foundUser) {
//            return res.status(409).json({
//                status: 'error',
//                message: 'Already a user! Please login to your account'
//            });
//        }


//        // Create new user
//        // please note that we shouldn't store plain passwords in a database
//        // it should first be hashes, but we keep it simple for the demo
//        const newUser = new User({ email, password });
//        await newUser.save();
//        res.status(201).json({
//            status: 'success',
//            message: 'User registered successfully'
//        });
//    } catch (err) {
//        res.status(500).json({
//            status: 'error',
//            message: 'Database error: ' + err.message
//        });
//    }
// });
app.post('/validate', async (req,res)=>{
    try{
        const email = req.body;
        const validationResult = await validate(email);
        if (!validationResult.valid) {
            return res.status(400).send({
                valid:false,
                status: 'error',
                message: 'Email is not valid. Please try again!',
                reason: validationResult.reason
            });
        }
       else { res.status(201).json({
                valid: true,
                status: 'success',
                message: 'User registered successfully'
            });
        }
    } 
    catch(err){
        res.status(500).json({
            status: 'error',
            message: 'Validation error: ' + err.message
        });
    }
    


});

// Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));