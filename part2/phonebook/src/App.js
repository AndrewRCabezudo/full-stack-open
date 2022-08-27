import { useState, useEffect } from 'react'
import phoneService from './services/requests'

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
    {props.name} {props.num} <button value={props.name} id={props.id} onClick={props.deleteEntry}>delete</button>
    </dt>
  )
}

const EntryForm = (props) => {
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

  const [entries, setEntries] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchEntry, setSearchEntry] = useState('')

  useEffect(() => {
    phoneService
      .getAll()
      .then(initalEntries => {
        setEntries(initalEntries)
      })
  }, [])


  const addEntry = (event) => {
    event.preventDefault()

    if (entries.some(entry => entry.name === newName)) {
      if (window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)) {
        const entry = entries.find(e => e.name === newName)
        const changedEntry = {...entry, number: newNumber}

        phoneService
          .update(changedEntry.id, changedEntry)
          .then(returnedEntry => {
            setEntries(entries.map(e => e.id !== returnedEntry.id ? e : returnedEntry))
          })
          .catch(error => { 
            alert (
              `the entry ${entry.name} was already deleted from the server`
            )
            setEntries(entries.filter(e => e.id !== entry.id))
          })
      }
    } else {
      const entryObject = {name: newName, number: newNumber}

      phoneService
        .create(entryObject)
        .then(returnedEntry => {
          setEntries(entries.concat(returnedEntry))
          setNewName('')
          setNewNumber('')
        })
    }
  }

  const handleDeleteEntry = (id) => {
    const name = entries.filter(e => e.id === id)[0].name
    if (window.confirm(`Delete ${name} ?`)) {
      phoneService
      .remove(id)
      .then(()=> {
        setEntries(entries.filter(e => e.id !== id))
      })
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
      <EntryForm onSubmit={addEntry} value={newName} onChange={handleNameChange}
        value2={newNumber} onChange2={handleNumberChange}/>
      
      <h2>Numbers</h2>
      
      <dl>
        {entries.filter(entry => entry.name.toLowerCase().includes(searchEntry.toLowerCase())).map(entry =>
          <Entry key={entry.id} name={entry.name} num={entry.number} deleteEntry={() => handleDeleteEntry(entry.id)}/>
         )}
      </dl>
    </div>
  )
}

export default App
