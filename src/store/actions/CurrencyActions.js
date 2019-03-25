import api from '../../api/CurrencyAPI';
import { AsyncStorage } from 'react-native';
import DeviceInfo from 'react-native-device-info';

import {
  CURRENCY_FETCH_SUCCESS,
  CURRENCY_FETCH_BEGIN,
  CURRENCY_FETCH_ERROR,
  FILTER_CURRENCIES,
  SET_BASE_CURRENCY,
  BASE_CURRENCY_ID,
  SET_BASE_CURRENCY_BY_COUNTRY,
  ONLY_FAVORITES,
  CHANGE_FAVORITE_STATUS_STATE,
  CURRENCY_LOAD_SUCCESS,
  CONVERT_CURENCIES
} from '../../constants/action-types';


export const fetchCurrencyBegin = () => ({
  type: CURRENCY_FETCH_BEGIN
});

export const fetchCurrencyEnd = () => ({
  type: CURRENCY_LOAD_SUCCESS
});


export const convertCurrencies = (from, to) => ({
  type: CONVERT_CURENCIES,
  payload: {
    from: from,
    to: to
  }
});


export const fetchCurrencySuccess = currenciesList => ({
  type: CURRENCY_FETCH_SUCCESS,
  payload: currenciesList
});

export const changeFavoriteStatusState = currencyId => ({
  type: CHANGE_FAVORITE_STATUS_STATE,
  payload: {
    currencyId: currencyId
  }
});

export const fetchCurrencyFailure = error => ({
  type: CURRENCY_FETCH_ERROR,
  payload: error
});

export const setBaseCurrency = currencyId => ({
  type: SET_BASE_CURRENCY,
  payload: { currencyId: currencyId }
});

export const setBaseCurrencyByCountry = countryId => ({
  type: SET_BASE_CURRENCY_BY_COUNTRY,
  payload: {
    countryId: countryId
  }
});

export const filterCurrencies = filter => ({
  type: FILTER_CURRENCIES,
  payload: filter
});

export const onlyFavorite = onlyFavorite => ({
  type: ONLY_FAVORITES,
  payload: onlyFavorite
});


export function onlyFavoriteOptionChange (onlyFavoriteState) {
  return dispatch => {
    dispatch(onlyFavorite(onlyFavoriteState));
    dispatch(filterCurrencies());
  }
}


export function getBaseCurrency () {
  return async dispatch => {
    try {
      const currency = await AsyncStorage.getItem(BASE_CURRENCY_ID);
      currency !== null ? dispatch(setBaseCurrency(currency)) : dispatch(getCurrencyFromDeviceCountry())
    } catch (e) {

    }
  }
}

export function getCurrencyFromDeviceCountry () {
  return dispatch => {
    const countryLocale = DeviceInfo.getDeviceCountry();
    dispatch(setBaseCurrencyByCountry(countryLocale));
  }
}

export function fetchCurrenciesAndCounties () {
  return dispatch => {
    dispatch(fetchCurrencyBegin());
    api.loadCountriesList()
        .then(resp => {
          let currencies = [];
          for (const i in resp.data.results) currencies.push(resp.data.results[i]);

          dispatch(fetchCurrencySuccess(currencies));
          dispatch(filterCurrencies());

          dispatch(getBaseCurrency());
          dispatch(fetchCurrencyEnd());

        })
        .catch(err => {
          dispatch(fetchCurrencyFailure('API service is unavailable'))
        });

    return Promise.resolve();
  };
}


export function favoriteStateAndFilter (currencyId) {
  return dispatch => {
    dispatch(changeFavoriteStatusState(currencyId));
    dispatch(filterCurrencies());

    return Promise.resolve();
  }
}