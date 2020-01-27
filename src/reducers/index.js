import { combineReducers } from "redux";

import authentication from "./authentication";
import stream from "./stream";
import data from "./data";
import locations from './locations';
import message from './message';

export default combineReducers({ authentication: authentication, stream: stream, data: data, locations: locations, message: message });
