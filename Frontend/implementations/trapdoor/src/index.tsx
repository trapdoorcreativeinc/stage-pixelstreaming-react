// Copyright Epic Games, Inc. All Rights Reserved.
import React from 'react';
import { createRoot } from 'react-dom/client';
import Switch from './routes';
import './index.scss';
import { BrowserRouter } from 'react-router-dom';

document.body.onload = function () {
    // Attach the React app root component to document.body

    const root = createRoot(document.getElementById('root'));
    root.render( 
      <BrowserRouter basename='/stream'>
        <Switch />
      </BrowserRouter>
    );
};
