/**
 * This module contains the provider and reducers for the SideLoadingContext Module
 * @packageDocumentation
 */

import React, { createContext, Dispatch, Reducer, ReducerAction, ReducerState, useReducer } from "react";

class SideLoadingData {
  isLoading: boolean;
  loadingMessage: string;
  loadingProgress: number;
  showLoadingProgress: boolean;
  numLoadingDependents: number;

  constructor(isLoading: boolean = false, loadingMessage: string = "", loadingProgress: number = -1) {
    this.isLoading = isLoading;
    this.loadingMessage = loadingMessage;
    this.loadingProgress = loadingProgress;
    this.showLoadingProgress = loadingProgress >= 0;
    this.numLoadingDependents = 0;
  }
  
  setIsLoading(newLoadingVal: boolean) {
    this.isLoading = newLoadingVal;
  }

  setLoadingMessage(message: string) {
    this.loadingMessage = message;
  }

  setLoadingProgress(progress: number) {
    this.loadingProgress = progress;
    this.showLoadingProgress = progress >= 0;
  }

  getNewVal() {
    const newVal = new SideLoadingData(this.isLoading, this.loadingMessage, this.loadingProgress);
    newVal.numLoadingDependents = this.numLoadingDependents;
    return newVal;
  }
}

/**
 * This interface is an interface
 */
interface SideSideLoadingContextInterface {
  sideLoadingData: SideLoadingData,
  setSideLoadingData: Function
}

const SideLoadingContext = createContext<SideSideLoadingContextInterface>({
  sideLoadingData: new SideLoadingData(),
  setSideLoadingData: (newValue: SideLoadingData, action = { type: '' }) => newValue,
});

type LoadingAction = 
  | { type: 'STOP_LOADING' }
  | { type: 'START_LOADING' }
  | { type: 'START_LOADING_WITH_MESSAGE', message: string }
  | { type: 'START_LOADING_WITH_PROGRESS', progress: number }
  | { type: 'START_LOADING_WITH_MESSAGE_AND_PROGRESS', message: string, progress: number}
  | { type: 'UPDATE_LOADING_MESSAGE', message: string }
  | { type: 'UPDATE_LOADING_PROGRESS', progress: number }
  | { type: 'UPDATE_LOADING_MESSAGE_AND_PROGRESS', message: string, progress: number}
  | { type: 'REMOVE_LOADING_MESSAGE'}
  | { type: 'REMOVE_LOADING_PROGRESS'};


function loadingReducer (oldVal: SideLoadingData, action: LoadingAction): SideLoadingData {
  // console.log("loadingReducer -- Old value:", oldVal)
  let newVal = oldVal.getNewVal();
  // console.log("loadingReducer -- New value:", newVal)
  // console.log("loadingReducer -- Called with action type:", action.type)
  // Handle settings loading dependencies.
  // console.log("loadingReducer -- Dependents before adjustment:", newVal.numLoadingDependents)
  switch (action.type) {
    case "START_LOADING":
    case "START_LOADING_WITH_MESSAGE":
    case "START_LOADING_WITH_PROGRESS":
    case "START_LOADING_WITH_MESSAGE_AND_PROGRESS":
      newVal.numLoadingDependents++;
      break;
    case "UPDATE_LOADING_MESSAGE":
    case "UPDATE_LOADING_PROGRESS":
    case "UPDATE_LOADING_MESSAGE_AND_PROGRESS":
      if (newVal.numLoadingDependents === 0) newVal.numLoadingDependents++;
      break;
    case "STOP_LOADING":
      newVal.numLoadingDependents--;
      break;
    default:
      break;
  }
  // console.log("loadingReducer -- Dependents after adjustment:", newVal.numLoadingDependents);

  // console.log("Setting loading data:", newVal)
  // Set the values of the new SideLoadingData object based on the action type
  switch (action.type) {
    case "STOP_LOADING":
      if (newVal.numLoadingDependents <= 0) {
        newVal = new SideLoadingData();
        newVal.numLoadingDependents = 0;
      }
      break;
    case "START_LOADING":
      newVal = new SideLoadingData(true);
      break;
    case "START_LOADING_WITH_MESSAGE":
    case "UPDATE_LOADING_MESSAGE":
      newVal.setIsLoading(true);
      newVal.setLoadingMessage(action.message);
      break
    case "START_LOADING_WITH_PROGRESS":
    case "UPDATE_LOADING_PROGRESS":
      newVal.setIsLoading(true);
      newVal.setLoadingProgress(action.progress);
      break
    case "START_LOADING_WITH_MESSAGE_AND_PROGRESS":
    case "UPDATE_LOADING_MESSAGE_AND_PROGRESS":
      newVal.setIsLoading(true);
      newVal.setLoadingMessage(action.message);
      newVal.setLoadingProgress(action.progress);
      break
    case "REMOVE_LOADING_MESSAGE":
      newVal.setLoadingMessage("");
      break;
    case "REMOVE_LOADING_PROGRESS":
      newVal.setLoadingProgress(-1);
      break;
    default:
      console.log("Invalid use of setSideLoadingContext.");
      break;
  }
  return newVal;
}

interface LoadingProviderProps {
  children: React.ReactNode
}

function LoadingProvider ({children}: LoadingProviderProps) {
  const [sideLoadingData, setSideLoadingData] = useReducer(loadingReducer, new SideLoadingData());

  return (
    <SideLoadingContext.Provider 
      value={{sideLoadingData, setSideLoadingData}}>
      {children}
    </SideLoadingContext.Provider>
  )
}

export { SideLoadingContext, LoadingProvider };