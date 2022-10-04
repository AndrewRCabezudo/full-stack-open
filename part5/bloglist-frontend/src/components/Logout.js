import React from 'react'
import PropTypes from 'prop-types'

const Logout = ({ name, handleSubmit }) => {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        {name} logged-in
        <button id='logout-button' type="submit" style={{ marginLeft: '.5rem' }}>logout</button>
      </form>
    </div>
  )
}

Logout.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired
}

export default Logout