// Copyright Epic Games, Inc. All Rights Reserved.
import React from 'react';
import { createRoot } from 'react-dom/client';
import Switch from './routes';
import './index.scss';
import { BrowserRouter } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import { UserAuthContextProvider } from './contexts/UserAuthContext';
import { SideLoadingProvider } from './contexts/SideLoadingContext';
import { StreamStatusProvider } from './contexts/StreamStatusContext';

document.body.onload = function () {
    // Attach the React app root component to document.body

    const root = createRoot(document.getElementById('root'));
    root.render( 
      <SideLoadingProvider>
        <UserAuthContextProvider>
          <StreamStatusProvider>
            <BrowserRouter basename='/streamv2'>
              <MainLayout>
                <Switch />
              </MainLayout>
            </BrowserRouter>
          </StreamStatusProvider>
        </UserAuthContextProvider>
      </SideLoadingProvider>
    );
};
