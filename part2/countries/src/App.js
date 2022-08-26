import { useState, useEffect } from "react"
import axios from 'axios'

const Country = (props) => {
  return (
    <div>{props.name}</div>
  )
}

const Weather = (props) => {
  const [weather, setWeather] = useState({})

  const api_key = process.env.REACT_APP_API_KEY
  useEffect(() => {
    axios
      .get("https://api.openweathermap.org/data/2.5/weather?q=" + props.city + "&appid=" + api_key + "&units=metric")
      .then(response => {
        const weatherObject = {
          temp: response.data.main.temp,
          wind: response.data.wind.speed,
          icon: response.data.weather[0].icon}
        setWeather(weatherObject)
      })
  },[api_key, props.city])
  
  let iString = `http://openweathermap.org/img/wn/${weather.icon}@2x.png`
  return(
    <div>
      <h3>Weather in {props.city}</h3>
      <div>temperature {weather.temp} Celsius</div>
      <img alt='icon' src={iString}/>
      <div>wind {weather.wind} m/s</div> 
    </div>
  )

}
const SingleCountry = ({country}) => {

  return (
    <div>
      <h2>{country.name.common}</h2>
      <div>capital {country.capital}</div>
      <div>area {country.area}</div>
      <h4>languages:</h4>
      <ul>
        {Object.values(country.languages).map(language => <li key={language}>{language}</li>)}
      </ul>
      <img style={{maxWidth: "150px"}} src={country.flags.svg} alt='flag'/>

      <Weather city={country.capital}/>
    </div>
  )
}

const RenderCountries = ({value, search}) => {
  const countryNames = value.map(country => country.name.common).filter(country => country.toLowerCase().includes(search.toLowerCase()))
  const namesLen = countryNames.length
  
  if (namesLen === 250) {
    return <div> Enter filter term</div>
  } else if (namesLen > 10) {
    return ( <div>Too many matches, specify another filter</div> )
  } else if (namesLen <= 10 && namesLen > 1 ) {
    return (
      countryNames.map(country => <Country key={country} name={country}/>)
    )
  } else if (namesLen === 1) {
    const country = (value.filter(country => country.name.common === countryNames[0]))
    return (
      <SingleCountry country={country[0]}/>
    )
  } else {
    return (
      <div> No Countries Found</div>
    )
  }
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [searchCountry, setSearchCountry] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
       // setCountries(response.data.map(country => country.name.common))
      })
  },[])

  const handleSearchChange = event => {
    setSearchCountry(event.target.value)
  }

  return (
    <div>
      <form>
        <div>find countries <input value={searchCountry} onChange={handleSearchChange}/></div>
      </form>
      <RenderCountries value={countries} search={searchCountry}/>

    </div>
  )
}

export default App
