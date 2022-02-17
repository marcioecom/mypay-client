import React from 'react';
import { BrowserRouter, Switch, Route, RouteProps, Redirect } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ProductsProvider } from './contexts/ProductsContext';
import { useAuth } from './hooks/useAuth';

import Home from './pages/Home';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Products from './pages/Products';
import Profile from './pages/Profile';
import Register from './pages/Register';

interface ICustomRoute extends RouteProps {
  isPrivate: boolean;
}

function CustomRoute({ isPrivate, ...rest }: ICustomRoute) {
  const { isAuthenticated, loading } = useAuth()

  if (loading) {
    return <h1>Loading...</h1>
  }

  if (isPrivate && !isAuthenticated) {
    return <Redirect to="/login" />
  }

  return <Route {...rest} />
}

function App() {
  return (
    <AuthProvider>
      <ProductsProvider>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={ Home } />
            <Route path="/login" component={ Login } />
            <Route path="/register" component={ Register } />
            <CustomRoute isPrivate path="/products" component={ Products } />
            <Route path="/profile" component={ Profile } />
            <Route component={ NotFound } />
          </Switch>
        </BrowserRouter>
      </ProductsProvider>
    </AuthProvider>
  )
}

export default App
