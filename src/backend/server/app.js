const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const dotenv = require("dotenv");
dotenv.config();

const DatabaseConnection = require('./dbConnection.js'); // Assuming dbConnection.js exports the DatabaseConnection class

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST"],
}));

// Default port if an error occurred
let port = 3020;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/images', express.static(__dirname + '/images'));

async function startServer() {
  try {
    await DatabaseConnection.initConnection(process.argv[2]); // Initialize the connection

    switch (process.argv[2]) {
      case "shop":
        port = 3005;
        require('./routes/shop/routes')(app);
        require('./routes/session/session')(app);
        break;
      case "fastfood":
        port = 3010;
        require('./routes/fastfood/routes')(app);
        break;
      case "fitness":
        port = 3015;
        require('./routes/fitness/routes')(app);
        break;
      case "carrental":
        port = 3025;
        require('./routes/carrental/routes')(app);
        break;
      case "cookbook":
        port = 3030;
        require('./routes/cookbook/routes')(app);
        break;
      default:
        app.get('/', (req, res) => {
          res.send('something went wrong');
        });
    }

    app.listen(port, () => {
      console.log(`Example app listening at http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Error starting the server:', error);
  }
}

startServer();
