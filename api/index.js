const express = require('express')
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const morgan = require('morgan')
const cors = require('cors')
var multer = require('multer')

const authRouter = require('./routes/authRouter')
const usersRouter = require('./routes/usersRouter')
const dataRouter = require('./routes/dataRouter')
const manageRouter = require('./routes/manageRouter')

mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/store', { useNewUrlParser: true })

const app = express();

app.use(express.static(__dirname + '/public'))
app.use(cors());
app.use(morgan('dev'))
app.use(bodyParser.json());
app.use(multer({ dest: "api/uploads/docs/tmp/" }).single('image'))

app.use(authRouter);
app.use(usersRouter);
app.use(dataRouter);
app.use(manageRouter);

app.get('/', (req, res) => {
    res.redirect('/signin')
})
app.set('views', __dirname + '/views')
app.set('view engine', 'ejs')

app.set('port', (process.env.PORT || 5000))

app.listen(app.get('port'), () => {
    console.log(`Server listening at ${app.get('port')}`)
})

