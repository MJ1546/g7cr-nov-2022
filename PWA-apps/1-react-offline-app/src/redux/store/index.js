import { createStore, applyMiddleware, compose } from 'redux'
import { toDoReducer } from '../reducers/index'
import { offline } from "redux-offline";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";
import * as localforage from 'localforage'
import offlineConfig from 'redux-offline/lib/defaults'

offlineConfig.persistOptions = { storage: localforage };
createStore(toDoReducer,{},compose(applyMiddleware(thunk,createLogger())))