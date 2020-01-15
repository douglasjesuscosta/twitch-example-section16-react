import countries from  '../../apis/countries';
import { COUNTRY_REQUEST, FETCH_COUNTRIES } from './types.js';


export const countries_request = () => dispatch => {
    dispatch({type: COUNTRY_REQUEST, payload: true })
}

export const fetchCountries = () => async dispatch => {

    dispatch(countries_request());
    const response = await countries.get();

    dispatch({type: FETCH_COUNTRIES, payload: response.data })

}