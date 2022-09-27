import React from 'react'
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

export default Logout