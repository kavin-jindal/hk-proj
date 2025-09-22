import mysql from 'mysql2/promise'
// setting up database
export const db = await mysql.createConnection({
    host: 'sql.freedb.tech',
    user: 'freedb_im_admin',
    password: 'd5AFjrWy7@3NFSG',
    database: 'freedb_im_users',
});

db.connect(err =>{
    if (err){
        console.log(`${err.message}, ${err.stack}`);

    } else {
        console.log("Connection successful!")
    }
})

