import './App.css'
import Laskuri from './laskuri'
import React, { useState, useEffect } from 'react'
import Posts from './Posts'
import CustomerList from './CustomerList'
import UserList from './UserList'
import Message from './Message'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import Login from './Login'


const App = () => {

  const [showLaskuri, setShowLaskuri] = useState(false)

  const [showMessage, setShowMessage] = useState(false)
  const [message, setMessage] = useState('')
  const [isPositive, setIsPositive] = useState(false)
  const [loggedInUser, setLoggedInUser] = useState('')

  useEffect(() => {
    let storedUser = localStorage.getItem("username")
    if (storedUser !== null)
    setLoggedInUser(storedUser)
  }, [])

  const logout = () => {
    localStorage.clear()
    setLoggedInUser('')
  }

  const huomio = () => {
    alert("Huomio!")
  }

  return (
    <div className="App">

      {!loggedInUser && <Login setMessage={setMessage} setIsPositive={setIsPositive}
        setShowMessage={setShowMessage} setLoggedInUser={setLoggedInUser} />}

      {loggedInUser &&

        <Router>

          <Navbar className='navBar' bg="dark" variant="dark">
            <Nav className="mr-auto">
              <Link to={'/Customers'} className='nav-link'>Asiakkaat</Link>
              <Link to={'/Users'} className='nav-link'>Käyttäjät</Link>
              <Link to={'/Laskuri'} className='nav-link'>Laskuri</Link>
              <Link to={'/Posts'} className='nav-link'>Typicode-julkaisut</Link>
              <button onClick={() => logout()}>Logout</button>
            </Nav>
          </Navbar>

          <h2>Northwind Traders</h2>

          {showMessage && <Message message={message} isPositive={isPositive} />}

          <Switch>
            <Route path="/Customers"> <CustomerList setMessage={setMessage} setIsPositive={setIsPositive}
              setShowMessage={setShowMessage} /></Route>
            <Route path="/Users"><UserList setMessage={setMessage} setIsPositive={setIsPositive}
              setShowMessage={setShowMessage} /></Route>
            <Route path="/Laskuri"> <Laskuri /></Route>
            <Route path="/Posts"> <Posts /></Route>


          </Switch>

        </Router>
      }
    </div>
  )
}

export default App
