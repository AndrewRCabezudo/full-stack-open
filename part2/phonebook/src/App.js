import { useState } from 'react'

const FilterForm = (props) => {
  return (
    <form>
      <div>filter shown with <input value={props.value} onChange={props.onChange}/></div>
    </form>
  )
}

const Entry = (props) => {
  
  return (
    <dt>
    {props.name} {props.num}
    </dt>
  )
}

const PersonForm = (props) => {
  return (
    <form onSubmit={props.onSubmit}>
      <div>name: <input value={props.value} onChange={props.onChange}/></div>
      <div>number: <input value={props.value2} onChange={props.onChange2}/></div>
      <div>
          <button type='submit'>add</button>
        </div>
    </form>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchEntry, setSearchEntry] = useState('')


  const addPerson = (event) => {
    event.preventDefault()

    if (persons.some(person => person.name === newName)) {
      window.alert(`${newName} is already added to the phonebook`)
    } else {
      const nameObject = {name: newName, number: newNumber}
      setPersons(persons.concat(nameObject))
    }
  }
  
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleSearch = (event) => {
    setSearchEntry(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <FilterForm value={searchEntry} onChange={handleSearch}/>
      
      <h2>add a new</h2>
      <PersonForm onSubmit={addPerson} value={newName} onChange={handleNameChange}
        value2={newNumber} onChange2={handleNumberChange}/>
      
      <h2>Numbers</h2>
      
      <dl>
        {persons.filter(person => person.name.toLowerCase().includes(searchEntry.toLowerCase())).map(person =>
          <Entry key={person.name} name={person.name} num={person.number}/>
         )}
      </dl>
    </div>
  )
}

export default App
