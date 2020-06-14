require('dotenv').config();
const express =  require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');

const routes = require('./routes');
const {connectToDB} = require('./utils/db');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(morgan("common"));
app.use(cors());
app.use(express.json());

app.use('/api', routes);

connectToDB().then(() => {
    app.listen(PORT, () =>{
        console.log(`Server listening on port: ${PORT}`);
    });
}).catch(e => {
    console.log('DB connection failed');
    console.error(e.message);
    process.exit(1);
});
