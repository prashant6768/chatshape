import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { decodeToken, getAccessToken } from './Auth';

const PrivateRoute = ({ children }) => {
    const token = getAccessToken();
    const isAuthenticated = token && decodeToken(token);
  
    return isAuthenticated ? (
      children
    ) : (
      <Navigate to="/login" replace />
    );
  };

export default PrivateRoute;
