import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';  
import ConnectionDB from './Connection/db.js';
import adminRouter from './routes/AdminRoutes.js';
import blogRouter from './routes/blogRoute.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
//Middleware
app.use(cors());
app.use(express.json());

 
// Routes
app.get('/', (req, res) => {
    res.send('Hello from the backend server!');
} 
);

app.use('/api/admin' , adminRouter)
app.use('/api/blog' , blogRouter)


ConnectionDB().then(() => {

    try {
        console.log("DB Connected  sucessfull" );
        app.listen(PORT, () => {
    
            console.log(`Server is running on http://localhost:${PORT}`);

        });
    } catch (error) {
         console.log( "Error  While   Connection in DataBase " + "" + error  )
        
    }
    
});
    
 

  

  export default app;
