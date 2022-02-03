import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import SidebarWithHeader from './components/Sidebar';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ SidebarWithHeader } />
        <Route path="/login" component={ Login } />
        <Route path="/register" component={ Register } />
      </Switch>
    </BrowserRouter>
  )
}

export default App
