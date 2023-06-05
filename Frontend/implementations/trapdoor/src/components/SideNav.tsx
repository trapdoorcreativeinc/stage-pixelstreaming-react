import React, { ReactHTMLElement, ReactNode, useCallback } from 'react';

enum SideNavViews {
  ACCOUNT,
  MODELS,
  RENDERS,

}

const SideNav = () => {
  const [selectedView, setSelectedView] = React.useState<SideNavViews | null>(null);

  const contentView = useCallback(() => {
    console.log('selectedView Changed')
    switch(selectedView) {
      case SideNavViews.ACCOUNT:
        return <div className="side-nav__content__account">Account</div>
      default:
        return <></>
    }
  }, [selectedView])

  const toggleSelectedView = useCallback((view: SideNavViews) => {
    setSelectedView(oldVal => {
      if (oldVal === view) {
        return null;
      }
      else return view;
    })
  }, [])

  const buttons = useCallback(() => {
    const buttonData = [{
      icon: 'person',
      view: SideNavViews.ACCOUNT
    }, {
      icon: 'category',
      view: SideNavViews.MODELS
    }, {
      icon: 'collections',
      view: SideNavViews.RENDERS
    }]
    return buttonData.map((buttonData, index) => (
      <button className={`side-nav__button ${selectedView === buttonData.view ? 'selected' : ''}`} onClick={() => toggleSelectedView(buttonData.view)} key={`side-nav-button-${index}`}>
        <span className={`material-icons`}>{buttonData.icon}</span>
      </button>
    ))
  }, [selectedView, toggleSelectedView])

  return (
    <div className="side-nav">
      <div className={`side-nav__content ${selectedView !== null ? '' : 'hidden'}`}>
        {contentView()}
      </div>
      <div className="side-nav__buttons">
        {buttons()}
      </div>
    </div>
  )

}

export default SideNav;