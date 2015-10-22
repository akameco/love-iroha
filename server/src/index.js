import express from 'express'
import bodyParser from 'body-parser'
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
  console.log(req.body)
  res.send(req.body)
})

router.get('/speech', (req, res) => {
  res.send('speech')
})

app.use(router)
app.listen(port)
console.log('listen port', port)
