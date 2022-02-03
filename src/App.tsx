import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import SidebarWithHeader from './components/Sidebar';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ SidebarWithHeader } />
      </Switch>
    </BrowserRouter>
  )
}

export default App
