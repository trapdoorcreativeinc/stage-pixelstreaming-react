import React, { Route, Routes } from 'react-router-dom';
import App from '../components/App';

export default function Switch() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
    </Routes>
  )
}