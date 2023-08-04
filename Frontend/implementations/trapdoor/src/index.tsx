// Copyright Epic Games, Inc. All Rights Reserved.
import React from 'react';
import { createRoot } from 'react-dom/client';
import Switch from './routes';
import './index.scss';
import { BrowserRouter } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import { UserAuthContextProvider } from './contexts/UserAuthContext';

document.body.onload = function () {
    // Attach the React app root component to document.body

    const root = createRoot(document.getElementById('root'));
    root.render( 
      <UserAuthContextProvider>
        <BrowserRouter basename='/stream'>
          <MainLayout>
            <Switch />
          </MainLayout>
        </BrowserRouter>
      </UserAuthContextProvider>
    );
};
