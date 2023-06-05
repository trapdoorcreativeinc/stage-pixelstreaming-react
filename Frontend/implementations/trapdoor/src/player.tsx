// Copyright Epic Games, Inc. All Rights Reserved.
import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './components/App';
import './player.scss';

document.body.onload = function () {
    // Attach the React app root component to document.body

    const root = createRoot(document.getElementById('root'));
    root.render(
      <App />
    );
};
