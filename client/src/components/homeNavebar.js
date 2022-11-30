import React from 'react'
import { Link } from 'react-router-dom';

const Homenavebar = () => {
  return (
    <>
      <div>
        <div>
          <h1>Book's Lab</h1>
        </div>
        <div>
          <ul className>
            <li>
              <Link to="/signin">SignIn</Link>
            </li>
            <li>
              <Link to="/signup">SignUP</Link>
            </li>

          </ul>

        </div>
      </div>
    </>
  )
}

export default Homenavebar