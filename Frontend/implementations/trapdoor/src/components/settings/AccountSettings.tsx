import { PixelStreaming } from '@epicgames-ps/lib-pixelstreamingfrontend-ue5.2';

import React from 'react';

interface AccountSettingsProperties {
  pixelStreamingInstance?: PixelStreaming,
}

const AccountSettings = ({
  pixelStreamingInstance,
}: AccountSettingsProperties) => {

  return (
    <div className="account-settings-wrapper">
      <h2>Account Settings</h2>
    </div>
  )
}

export default AccountSettings;