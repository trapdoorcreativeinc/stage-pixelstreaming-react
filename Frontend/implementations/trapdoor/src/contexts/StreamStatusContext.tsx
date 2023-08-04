
import React, { createContext, Dispatch, useReducer } from "react";

class StreamStatusData {
  ssUrl: string;
  ssStatus: string;

  constructor(ssUrl: string = "", ssStatus: string = "") {
    this.ssUrl = ssUrl;
    this.ssStatus = ssStatus;
  }
}

interface StreamStatusContextInterface {
  streamStatusData: StreamStatusData,
  setStreamStatusData: Dispatch<any>
}

const StreamStatusContext = createContext<StreamStatusContextInterface>({
  streamStatusData: new StreamStatusData(),
  setStreamStatusData: () => {}
});

type StreamStatusAction = 
  | { type: 'UPDATE_STREAM_URL', url: string }
  | { type: 'UPDATE_STREAM_STATUS', status: string }
  | { type: 'REMOVE_STREAM_STATUS' }


const StreamStatusReducer = ({ssUrl, ssStatus}: StreamStatusData, action: StreamStatusAction) => {
  switch (action.type) {
    case 'UPDATE_STREAM_URL':
      return new StreamStatusData(action.url, ssStatus);
    case 'UPDATE_STREAM_STATUS':
      return new StreamStatusData(ssUrl, action.status);
    case 'REMOVE_STREAM_STATUS':
      return new StreamStatusData();
    default:
      return new StreamStatusData();
  }
}

interface StreamStatusProviderProperties {
  children: React.ReactNode
}

const StreamStatusProvider = ({ children }: StreamStatusProviderProperties) => {
  const [streamStatusData, setStreamStatusData] = useReducer(StreamStatusReducer, new StreamStatusData());

  return (
    <StreamStatusContext.Provider value={{ streamStatusData, setStreamStatusData }}>
      {children}
    </StreamStatusContext.Provider>
  );
}

export { StreamStatusContext, StreamStatusProvider };

