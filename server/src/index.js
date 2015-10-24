import express from 'express'
import bodyParser from 'body-parser'
import path from 'path'
import {tokenizer, filterToken} from './lib'

const app = express()

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.set('view engine', 'jade');
app.set('views', path.resolve( __dirname, '../views'));

const port = process.env.PORT || 8080
const router = express.Router()

router.use((req, res, next) => {
  next()
})

router.get('/', (req, res) => {
  console.log(res.body)
  res.render('index', {title: 'hey'})
})

router.get('/speech', (req, res) => {
  console.log('speech');
  res.render('speech')
})

router.post('/', (req, res) => {
  let text = req.body.text
  tokenizer(text).then(arr => {
    let list = filterToken(arr)
    res.send(list)
  })
})


app.use(router)
app.listen(port)
console.log('listen port', port)
