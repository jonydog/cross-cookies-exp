const express = require('express')
const https = require('https')
const fs = require('fs')
const http = require('http')
const cookieParser = require('cookie-parser')

const PORT = 443

const app = express()
app.use(cookieParser())

app.get('/', (req, res) => {
  res.sendFile('./index.html', { root: __dirname })
})

const DEMO_CF_POLICY_VALUE =
  'eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly92b2QudGVzdC5pbnRlcnByZWZ5LmNvbS8qIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNjQ2MDkyODAwfX19XX0='

app.get('/try', (req, res) => {
  console.log('try')
  res.header('Access-Control-Allow-Credentials', true)
  res.header('Access-Control-Allow-Origin', '*')
  res.send({
    cookies: req.cookies['test-cookie'],
  })
})

app.get('/cookie', (req, res) => {
  res.cookie('test-cookie', DEMO_CF_POLICY_VALUE, {
    domain: 'faturial.com',
    path: '/',
    sameSite: 'None',
    secure: true,
  })
  res.header('Access-Control-Allow-Credentials', true)
  res.header('Access-Control-Allow-Origin', 'https://interprefy.com')
  res.send()
})

app.get('/test', (req, res) => {
  res.send('hello')
})

/*https
  .createServer(
    {
      key: fs.readFileSync('key.key'),
      cert: fs.readFileSync('cert.crt'),
    },
    app
  )
  .listen(PORT, function () {
    console.log('Example app listening on port ' + PORT)
  })
*/
var server = app.listen(80, function () {
  console.log('Example app listening at http://%s')
})
