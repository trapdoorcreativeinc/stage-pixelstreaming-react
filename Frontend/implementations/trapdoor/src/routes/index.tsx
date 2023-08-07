import React, { Route, Routes, Navigate } from 'react-router-dom';
import LandingPage from '../pages/LandingPage';
import LoadingPage from '../pages/LoadingPage';
import { PixelStreamingWrapper } from '../components/PixelStreamingWrapper';
import { useContext } from 'react';
import { StreamStatusContext } from '../contexts/StreamStatusContext';

export default function Switch() {
  const currentPath = window.location.pathname;
  console.log("Current Path:",currentPath)
  const { streamStatusData, setStreamStatusData } = useContext(StreamStatusContext);
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path='/session' element={<LoadingPage />} />
      <Route path='/start' element={
        <PixelStreamingWrapper 
          initialSettings={{
            AutoPlayVideo: true,
            AutoConnect: true,
            ss: streamStatusData.ssUrl,
            StartVideoMuted: true,
            HoveringMouse: true,
          }}
        />
        } />
    </Routes>
  )
}