import React from 'react'

const Notification = ({ errorMessage, successMessage }) => {

    if (errorMessage === null && successMessage === null) {
      return null
    } else if (errorMessage != null) {
        return (
            <div className='error'>
              {errorMessage}
            </div>
          )
    } else {
        return (
            <div className='success'>
              {successMessage}
            </div>
          )
    }
}

export default Notification