const express = require('express')
const cors = require('cors');
const { default: mongoose } = require('mongoose');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken')
const UserModal = require('./models/User');
const User=require('./models/User.js');
const Place = require('./models/Place');
const cookieParse=require('cookie-parser');
const app=express();
require('dotenv').config();
const bcryptSalt=bcrypt.genSaltSync(10);
const jwtSecret='23kek2e3i2ej3iji23ji3ejie23i3';
const imageDownloader=require('image-downloader');
const multer=require('multer');
const fs=require('fs');

app.use(cors({
    credentials:true,
    origin:'http://localhost:5173',
}));

app.use(express.json());
app.use(cookieParse());
app.use('/uploads',express.static(__dirname+'/uploads'));
mongoose.connect(process.env.MONGO_URL);

app.get('/test', (req, res) =>{

    res.json('test ok');
});

// app.get('/register', (req, res) =>{
    
//     res.json('hhihi');
// })

app.post('/register', async (req, res) =>{
    const {name,email,password}=req.body;
    
    try{
        const userDoc = await User.create({
            name,
            email,
            password:bcrypt.hashSync(password, bcryptSalt),
        })

        res.json(userDoc);
    }catch(e){
        res.status(422).json(e);
    }
});

app.post('/login', async (req, res) =>{
    const {email,password}=req.body;
    const userDoc= await User.findOne({email});
    if (userDoc){
        const passOk=bcrypt.compareSync(password, userDoc.password);
        if (passOk){
            jwt.sign({
                email:userDoc.email,
                id:userDoc._id,
                name:userDoc.name},jwtSecret,{},(err,token)=>{
                if(err)throw err;
                res.cookie('token',token).json(userDoc);
            })
        }else{
            res.status(422).json('pass not ok');
        }
    }else{
        res.json('not found');        
    }

    //res.json(userDoc);
});

app.get('/profile',(req,res) =>{
    const {token} = req.cookies;
    if (token){
        jwt.verify(token, jwtSecret, {}, async(err, userData) => {
            if(err) throw err;
            const {name,email,_id}=await User.findById(userData.id);
            // res.json(userData) 
            res.json({name,email,_id});
        });
    }else{
        res.json(null);
    }


})

app.post('/logout',(req,res)=>{
    res.cookie('token','').json(true)
})

app.post('/upload-by-link', async (req,res)=>{
    const {link} = req.body;

    let filename='photo_'+Date.now()+'.jpg';
    const options={
        url: link,
        dest: __dirname+'/uploads/'+filename,
    }
   
    await imageDownloader.image(options).then(({filename})=>{
        console.log('Save to ', filename);
    })
    .catch((err)=>console.error(err));
    res.json(filename);

});

const photoMiddleware=multer({dest:'uploads/'});
app.post('/upload',photoMiddleware.array('photos',100),(req,res)=>{

    const uploadedFiles=[];
    for (let i=0; i < req.files.length; i ++){
        const{path,originalname}=req.files[i];
        const parts=originalname.split('.');
        const ext=parts[parts.length-1];
        const newPath=path+'.'+ext;
        fs.renameSync(path,newPath);
        uploadedFiles.push(newPath.replace('uploads/',''));
    }
    res.json(uploadedFiles)
});

app.post('/places',(req,res)=>{
    const {token}=req.cookies;
    const {title,address,photos:addedPhotos,description,perks,checkIn,checkOut,maxGuests,price}=req.body;
    jwt.verify(token, jwtSecret, {}, async(err, userData) => {
        if(err) throw err;
        
        const placeDoc=Place.create({
            owner:userData.id,
            title,address,addedPhotos,description,perks,checkIn,checkOut,maxGuests,price
        })

        res.json({placeDoc});
    });

})

app.get('/places', (req,res)=>{
    const {token}=req.cookies;
    jwt.verify(token, jwtSecret, {}, async(err, userData) => {
        if(err) throw err;
        const {id}=userData;
        
        res.json(await Place.find());
        
    });
});

app.get('/userPlaces', (req,res)=>{
    const {token}=req.cookies;
    jwt.verify(token, jwtSecret, {}, async(err, userData) => {
        if(err) throw err;
        const {id}=userData;
        
        res.json(await Place.find({owner:id}));
        
    });
});

app.get('/places/:id', async (req,res)=>{
    const {id} = req.params;
    res.json( await Place.findById(id));
});

app.put('/places', async (req, res)=>{
    const {token}=req.cookies;
    const {id,title,address,addedPhotos,description,perks,checkIn,checkOut,maxGuests,price}=req.body;
    
    jwt.verify(token, jwtSecret, {}, async(err, userData) => {
        if(err) throw err;
        const placeDoc = await Place.findById(id);

        if (userData.id === placeDoc.owner.toString()){
            placeDoc.set({title,address,photos:addedPhotos,description,perks,checkIn,checkOut,maxGuests,price});
            placeDoc.save();
        }
        
        res.json('ok');
    });
});

app.listen(4000);