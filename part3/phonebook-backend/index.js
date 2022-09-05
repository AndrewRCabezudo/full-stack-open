const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')

app.use(express.json())
morgan.token('body', function getBody (req) {
  return JSON.stringify(req.body)
}) 
app.use(express.static('build'))

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body', {
  skip: function (req, res) {return req.method !== 'POST'}
}))
app.use(morgan('tiny', {
  skip: function (req, res) {return req.method === 'POST'}
}))
app.use(cors())

let Data = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('', (req, res) => {
    res.send('<h1>PhoneBook</h1>')
})
app.get('/api/persons', (req, res) => {
    res.json(Data)
})
app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = Data.find(person => person.id === id)

    res.statusMessage = "Current person does not exist"
    person ? res.json(person) : res.status(404).end()
})
app.get('/api/info', (req, res) => {
    const num = Data.length
    const date = new Date()
    const pst = date.toUTCString()
    // const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    //console.log(pst)
    res.send(`
        <div>
            Phone has info for ${num} people
            <br />
            <br />
            ${date}
        </div>`)
})
app.delete('/api/persons/:id', (req,res) => {
    const id = Number(req.params.id)
    Data = Data.filter(person => person.id !== id)

    res.status(204).end()
})
app.post('/api/persons', (req, res) => {
  // console.log(req.method)
  // console.log(req.body)

  const body = req.body
  if (!body.name) {
    return res.status(400).json({error: 'name missing'})
  } else if (!body.number ) {
    return res.status(400).json({error: 'number missing'})
  }

  if (Data.some(person => person.name === body.name)) {
    return res.status(400).json({error: 'name must be unique'})
  } 

  const person = {
    name: body.name,
    number: body.number,
    id: generateID()
  }

  Data = Data.concat(person)
  res.json(person)

})

const generateID = () => {
  const maxId = Data.length > 0
  ? Math.max(...Data.map(n => n.id))
  : 0
  return maxId + 1
}

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})