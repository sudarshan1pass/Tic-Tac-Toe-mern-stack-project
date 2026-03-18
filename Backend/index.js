require('dotenv').config();
const express =require('express');
const app=express();
const cors = require("cors");
const port =3000;

const gameRoutes = require("./Routers/gamerouter.js");


const {connectDB} =require("./Config/database.js")
connectDB()



app.use(cors({
    origin:"http://localhost:5173",
     credentials: true
}));


app.use(express.json());

app.use("/api", gameRoutes);
app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`);
}
);

