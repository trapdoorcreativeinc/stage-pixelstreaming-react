import React from 'react';
import SideNav from '../components/SideNav';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({
  children
}: MainLayoutProps) => {

  return (
    <div className='main-layout'>
      <main>
        {children}
      </main>
      <SideNav />
      <div className='trapdoor-logo'>
        <img src={require('../assets/images/TD_Horizontal_White.svg')} />
      </div>
    </div>
  )
};

export default MainLayout;