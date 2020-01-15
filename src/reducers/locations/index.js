import { FETCH_COUNTRIES, COUNTRY_REQUEST } from '../../actions/countries/types';


const initialState = {
  countries: [],
  loading: false
};

const locations = (state = initialState, action) => {
  switch (action.type) {
    case COUNTRY_REQUEST:
      return {
        ...state,
        loading: action.data
      };
    case FETCH_COUNTRIES:
      return {
        ...state,
        countries: action.payload
      }
    default:
      return state;
  }
};

export default locations;