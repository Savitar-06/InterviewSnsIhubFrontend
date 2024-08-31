import React from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import LoginForm from '../LoginForm/loginform'
import { AppRoutes } from './routes'
import SignupForm from '../SignupForm/signupform'
import UserList from '../UserList/userlist'
import PrivateRoute from './privateRouter'

const AppRouter = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Navigate to={AppRoutes.login} replace />} />
        <Route path={AppRoutes.login} element={<LoginForm />} />
        <Route path={AppRoutes.signup} element={<SignupForm />} />
        <Route 
            exact
            path={AppRoutes.userList}
            element={
                <PrivateRoute path={AppRoutes.userList}>
                    <UserList />
                </PrivateRoute>
            } 
            />
      </Routes>
    </Router>
  )
}

export default AppRouter