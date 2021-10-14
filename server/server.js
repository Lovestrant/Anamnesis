const express= require('express');
const session = require('express-session');
const MySQLStore  = require('express-mysql-session')(session);
const cors = require('cors');
const app = express();
const dotenv = require("dotenv");
const routesUrls = require("./Routes/routes");
const { Cookie } = require('express-session');
const cookieParser = require('cookie-parser');

dotenv.config({path: './.env'});
const port = process.env.PORT || 6000;
//connect to database


//middlewares
app.use(express.json());
app.use(cors());


const sessionStore = new MySQLStore(sqldb);
//sessions and cookies

app.use(cookieParser());
app.use(session({
    secret: "secret-key",
    saveUninitialized: true,
    resave: false,
    store: sessionStore,
    cookie: {
        maxAge: 24*60*60*1000
    }

}
));


app.use('/app', routesUrls);
//app listens to a certain Port
app.listen(port, () => {
    console.log(`server is running on port: ${port}`);
})