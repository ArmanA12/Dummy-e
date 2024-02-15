import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import ProductDetails from './component/ProductDetails.jsx'
import Home from './component/Home.jsx'
import Electronics from './component/Electronics.jsx'
import BeautAndSkinkare from './component/BeautAndSkinkare.jsx'
import Grosery from './component/Grosery.jsx'
import Othersalls from './component/Othersalls.jsx'
import { Provider } from 'react-redux';
import store from './store/store.jsx'
import Buyproduc from './component/Buyproduc.jsx'
import Login from './user/Login.jsx'
import Signup from './user/Signup.jsx'
import UserProfile from './user/UserProfile.jsx'
import Admin from './admin/admin.jsx'
import ViewAllDetails from './admin/ViewAllDetails.jsx'
import ViewAnalytic from './admin/ViewAnalytic.jsx'

const routers = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: `products/:id`,
    element: <ProductDetails />
  },
  {
    path: `electronic`,
    element: <Electronics />
  },
  {
    path: `beautyandskincare`,
    element: <BeautAndSkinkare />
  },
  {
    path: `groceries`,
    element: <Grosery />
  },
  {
    path: `othersalls`,
    element: <Othersalls />
  },
  {
    path: 'orderprodect',
    element: <Buyproduc />
  },
  {
    path: 'login',
    element: <Login />
  }
  ,
  {
    path: 'signup',
    element: <Signup />
  },
  {
    path: 'userprofile',
    element: <UserProfile />
  },
  {
    path: 'admin',
    element: <Admin />
  },
  {
    path: 'viewallproduct',
    element: <ViewAllDetails />
  },
  {
    path: 'analysis',
    element: <ViewAnalytic />
  }

])

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={routers} />
  </Provider>
)
