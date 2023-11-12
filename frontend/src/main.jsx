import React,{useState} from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router-dom'
import App from './App.jsx'
import store from './store'
import { Provider } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import HomeScreen from './screens/HomeScreen.jsx'
import LoginScreen from './screens/LoginScreen.jsx'
import RegisterScreen from './screens/RegisterScreen.jsx'
import ProfileScreen from './screens/ProfileScreen.jsx'
import AdminScreen from './screens/AdminScreen.jsx'
import PrivateAdminRoute from './components/PrivateAdminRoute'
import FindByBox from './screens/Admin/Box/FindByBox.jsx'
import FindByLocation from './screens/Admin/Location/FindByLocation.jsx'
import FindByUser from './screens/Admin/User/FindByUser.jsx'
import Settings from './screens/Admin/Settings/Settings.jsx'
import HomeAdmin from './screens/Admin/HomeAdmin.jsx'
import NoMatch from './screens/NoMatch.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route index={true} path='/login' element={<LoginScreen/>}/>
      <Route path='/' element={<HomeScreen/>}/>

      <Route path='admin' element={<PrivateAdminRoute/>}>
        <Route index element={<HomeAdmin/>}/>
        <Route path='box' element={<FindByBox/>}/>
        <Route path='location' element={<FindByLocation/>}/>
        <Route path='user' element={<FindByUser/>}/>
        <Route path='settings' element={<Settings/>}/>
        <Route path='register' element={<RegisterScreen/>}/>
        <Route path='profile' element={<ProfileScreen/>}/>
      </Route>
      <Route path="*" element={<NoMatch/>}/>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={ router }/>
    </React.StrictMode>
  </Provider>
)
