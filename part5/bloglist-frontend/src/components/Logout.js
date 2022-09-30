import React from 'react'
import PropTypes from 'prop-types'

const Logout = ({ user, handleSubmit }) => {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        {user} logged-in
        <button type="submit" style={{ marginLeft: '.5rem' }}>logout</button>
      </form>
    </div>
  )
}

Logout.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  user: PropTypes.string.isRequired
}

export default Logout