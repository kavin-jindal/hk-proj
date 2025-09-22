import express from 'express';
import {dbase} from './db.mjs';
import session from 'express-session';

import cors from 'cors';
const app = express();
app.use(session({
    secret: 'thisismysecretmf',
    resave: false,
    saveUninitialized: false
}));
app.use(cors());
app.use(express.json());
const port = process.env.PORT;


app.post("/signup", async (req, res) => {
    const {name, email, password} = req.body;
    const db = await dbase;
    const [rows] = await db.execute("SELECT id from creds where email=?", [email]);
    if (rows.length>0){
        return res.json({success:false, message:'Email already exists.'})
    }
    else {
        await db.execute("INSERT INTO creds (name, email, password) VALUES (?, ?, ?)", [name, email, password]);
        return res.json({success:true, message: "Account registered, kindly login"});
    }
});
app.post('/login', async (req, res) => {
    const {email, password} = req.body;
    const [rows] = await db.execute('SELECT id, name, email, password from creds where email=?', [email]);
    if (rows.length > 0){
        const row = rows[0];
        const user = {id: row.id, name: row.name, email: row.email};

        req.session.user = user;
        return res.json({success:true, message:"Successfully logged in!", user_info: JSON.stringify(user)});
        
        
        
    }
    else {
        return res.json({success:false, message:"Invalid credentials, please try again!"});
    }
});
app.post('/logout', async (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            res.send(`${err.message}`);
            //console.log(`${err.message}, ${err.stack}`)
        } else {
            res.send("Logged out!")
        }
    });
});



app.post('/profile', async (req, res) => {
    const data = req.body;
    console.log(data);
    const {id, name, email} = data;
    return res.json({id: id, name: name, email: email})
})


app.listen(port, ()=>{
    console.log(`Listening on ${port}!`)

})




