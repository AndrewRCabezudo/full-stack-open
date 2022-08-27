// import React from 'react'

const Notification = ({ errorMessage, successMessage }) => {
  console.log(errorMessage)
  console.log(successMessage)

    if (errorMessage === null && successMessage === null) {
      return null
    } else if (errorMessage != null) {
        return (
            <div className='error'>
              {errorMessage}
            </div>
          )
    } else {
        console.log('success not null')
        return (
            <div className='success'>
              {successMessage}
            </div>
          )
    }
}

export default Notification