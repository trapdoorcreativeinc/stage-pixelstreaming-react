import React, { ReactHTMLElement, ReactNode, useCallback, useState } from 'react';
import AccountSettings from './settings/AccountSettings';
import ModelsPage from './settings/ModelsPage';

enum SideNavViews {
  ACCOUNT,
  MODELS,
  RENDERS,

}


const SideNav = ({

}) => {
  const [selectedView, setSelectedView] = useState<SideNavViews | null>(null);
  const [showMenu, setShowMenu] = useState(false);

  const contentView = useCallback(() => {
    console.log('selectedView Changed')
    switch(selectedView) {
      case SideNavViews.ACCOUNT:
        return (
          <AccountSettings
            // pixelStreamingInstance={pixelStreaming}
          />
        )
      case SideNavViews.MODELS:
        return (
          <ModelsPage />
        )
      default:
        return <></>
    }
  }, [selectedView])

  const toggleSelectedView = useCallback((view: SideNavViews) => {
    setSelectedView(oldval => {
      if (oldval === view && showMenu) {
        setShowMenu(false);
      }
      else {
        setShowMenu(true);
      }
      return view
    })
  }, [showMenu, setSelectedView, setShowMenu])

  const buttons = useCallback(() => {
    const buttonData = [{
    //   icon: 'person',
    //   view: SideNavViews.ACCOUNT
    // }, {
      icon: 'category',
      view: SideNavViews.MODELS
    }, {
      icon: 'collections',
      view: SideNavViews.RENDERS
    }]
    return buttonData.map((buttonData, index) => (
      <div className={`side-nav__button ${selectedView === buttonData.view && showMenu ? 'selected' : ''}`} onClick={() => toggleSelectedView(buttonData.view)} key={`side-nav-button-${index}`}>
        <span className={`material-icons`}>{buttonData.icon}</span>
      </div>
    ))
  }, [selectedView, toggleSelectedView])

  return (
    <div className="side-nav">
      <div className={`side-nav__content ${showMenu ? '' : 'hidden'}`}>
        {contentView()}
      </div>
      <div className="side-nav__buttons">
        <div className='side-nav__buttons__top'>
          {buttons()}
        </div>
        <div className='side-nav__buttons__bottom'>
          <img className='side-nav__buttons__logo' src={require('../assets/images/StageIcon.svg')} />
        </div>
      </div>
    </div>
  )

}

export default SideNav;