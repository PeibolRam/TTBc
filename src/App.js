import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute'
import Navbar from './components/Navbar'
import NewProperty from './pages/NewProperty'
import Home from './pages/Home'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import EditProperty from './pages/EditProperty'
import Certificado from './pages/Certifiado'
import Privacidad from './pages/Privacidad'
import Footer from './components/Footer'


import axios from 'axios'
const ApiUrl = process.env.REACT_APP_APIURL

function App() {
  const [Properties, setProperties] = useState([])

  useEffect(() => {
    getProperties()
    return () => {
      console.log('Remove from app')
    }
  }, [])

  const getProperties = async() => {
    let res = await axios.get(`${ApiUrl}/properties`) 
    setProperties(res.data)
  }
  return (
    <Router>
      <Navbar/>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <PrivateRoute exact path="/new/property" component={NewProperty} />
        {
          Properties.map(property => ( 
            <PrivateRoute key={property._id} exact path={`/edit/property/${property._id}`} component={ 
              () => <EditProperty id={property._id}/> }
            />
          ))
        }
        {
          Properties.map(property => ( 
            <Route key={property._id} exact path={`/certificado/${property._id}`} component={ 
              () => <Certificado id={property._id}/> }
            />
          ))
        }
        <Route exact path="/aviso" component={Privacidad} />
      </Switch>
      <Footer/>
    </Router>
  );
}

export default App;
