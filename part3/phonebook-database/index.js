require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')
const Person = require('./models/person')
const { response } = require('express')

app.use(express.static('build'))
app.use(express.json())

morgan.token('body', function getBody (req) {
  return JSON.stringify(req.body)
}) 
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body', {
  skip: function (req, res) {return req.method !== 'POST'}
}))
app.use(morgan('tiny', {
  skip: function (req, res) {return req.method === 'POST'}
}))
app.use(cors())

app.get('', (req, res) => {
    res.send('<h1>PhoneBook</h1>')
})
app.get('/api/persons', (req, res) => {
  Person.find({}).then(persons => {
    res.json(persons)
  })
})
app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then(person => {
      if (person) {
        res.json(person)
      } else {
        res.status(404).end()
      }

    })
    .catch(error => next(error))
})
app.get('/api/info', (req, res) => {
 Person.find({}).countDocuments()
  .then(count => {
    const date = new Date()
    res.send(`
        <div>
            Phone has info for ${count} people
            <br />
            <br />
            ${date}
        </div>`)
  })
})
app.post('/api/persons', (req, res, next) => {
  const body = req.body
  if (body.name === undefined) {
    return res.status(400).json({error: 'name missing'})
  } else if (body.number === undefined) {
    return res.status(400).json({error: 'number missing'})
  }

  Person.findOne({ name: body.name})
    .then(foundPerson => {
      if (foundPerson) {
        res.status(404).send({ error: 'name exists in phonebook' })
      } else {
        const person = new Person({
          name: body.name,
          number: body.number,
        })
        person.save()
          .then(savedPerson => {
          res.json(savedPerson)
        })
          .catch(error => next(error))
      }
    })
})
app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body

  Person.findByIdAndUpdate(
    request.params.id, 
    {name, number}, 
    { new: true, runValidators: true, context: 'query' }
  )
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})
app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then(result => {
      res.status(204).end()
    })
    .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})