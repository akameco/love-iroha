import express from 'express'
import bodyParser from 'body-parser'
import {tokenizer, filterToken} from './lib'

const app = express()

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

const port = process.env.PORT || 8080
const router = express.Router()

router.use((req, res, next) => {
  next()
})

router.get('/', (req, res) => {
  console.log(res.body);
  res.send('hello')
})

router.post('/', (req, res) => {
  let text = req.body.text
  tokenizer(text).then(arr => {
    let list = filterToken(arr)
    res.send(list)
  })
})

router.get('/speech', (req, res) => {
  res.send('speech')
})

app.use(router)
app.listen(port)
console.log('listen port', port)
