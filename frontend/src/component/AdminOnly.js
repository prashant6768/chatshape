import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { decodeToken, getAccessToken,getAdminToken } from './Auth';

const AdminOnly = ({ children }) => {
    const adminToken = getAdminToken();
    const token = getAccessToken()
    const isAuthenticated = token && decodeToken(token) && adminToken ==='admin';
    // const isAuthenticated = 
    console.log("adminnnnnnnnnnnn =======",adminToken ==='admin')
    return isAuthenticated ? (
      children
    ) : (
      <Navigate to="/login" replace />
    );
  };

export default AdminOnly