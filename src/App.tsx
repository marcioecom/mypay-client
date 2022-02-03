import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import SidebarWithHeader from './components/Sidebar';
import Login from './pages/Login';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ SidebarWithHeader } />
        <Route path="/login" component={ Login } />
      </Switch>
    </BrowserRouter>
  )
}

export default App
