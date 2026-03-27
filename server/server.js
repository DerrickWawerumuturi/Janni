import 'dotenv/config'
import express from "express";
import cors from "cors";
import blogRoutes from './routes/blog.routes.js'



const app  = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/api/blogs", blogRoutes)



app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})
