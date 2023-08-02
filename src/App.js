//import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Nav from './components/Nav/Nav';
import Login from './components/Login/Login';
import Profile from './components/Profile/ProfileContainer';
import Dialogs from './components/Dialogs/Dialogs';
import Users from './components/Users/Users';
import MyProfile from './components/Profile/MyProfile';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { initApp } from './redux/appReducer';

const mstp = (state) => ({
  isInitialized: state.app.isInitialized,
  isLogged: state.auth.isLogged,
  user: state.auth.login
})

const App = ({ isInitialized, initApp }) => {
  useEffect(() => {
    if (!isInitialized) {
      initApp()
    }
  }, [ isInitialized, initApp ]);

  return (
    <div className='App'>
      <Header />
      <div className='container'>
        <div className='body-grid'>
          <Nav />
          {isInitialized ? (
          <div className='main'>
            <Routes>
              <Route path='/' element={<MyProfile />} />
              <Route path='/login' element={<Login />} />
              <Route path='/profile/:userId' element={<Profile />} />
              <Route path='/profile' element={<MyProfile />} />
              <Route path='/dialogs' element={<Dialogs />} />
              <Route path='/users' element={<Users />} />
              <Route path='*' element={<div>404</div>} />
            </Routes>
          </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}

export default connect(mstp, { initApp })(App);
