import dotenv from 'dotenv';
import app from './app.js';
import connectdb from './Database/Db.js';
dotenv.config({
    path:"/env"
});

// First connect to Database
connectdb()
.then(()=>{
    app.listen(process.env.PORT || 8000, () => {
        console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
    })
})
.catch((error)=>{
    console.log("MONGO db connection failed !!! ", error);
})
