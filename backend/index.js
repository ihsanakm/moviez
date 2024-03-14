require("dotenv").config();

const express = require("express");
const connectToDb = require("./dbConfig/connectToDB");
const movieRoute = require("./routes/movieRoute");
const userRoute = require("./routes/userRoute")
const cors = require("cors")
var cookieParser = require('cookie-parser')
var requireAuth = require('./middleware/auth')


const app = express();


app.use(cors({
  origin:true,
  credentials: true,
}))
app.use(express.json());
app.use(cookieParser());




connectToDb();

app.post("/signup", userRoute.signup);
app.post("/login", userRoute.login);
app.get("/logout", userRoute.logout);
app.get("/check-auth", requireAuth, userRoute.checkAuth);



app.get("/my-movie", requireAuth,movieRoute.getMovies);

app.post("/movie/add",requireAuth, movieRoute.createMovie);

app.post("/my-movie/add", requireAuth,movieRoute.addMovie);


app.put("/my-movie/update/:id",requireAuth, movieRoute.updateMovie);



app.get("/my-movie/read/:id",requireAuth, movieRoute.getMovie );

app.delete("/my-movie/delete/:id",requireAuth, movieRoute.deleteMovie);

app.listen(process.env.PORT, () => {
  console.log(`I am working on ${process.env.PORT}`);
});
