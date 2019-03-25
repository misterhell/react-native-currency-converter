import { AsyncStorage } from "react-native"

import {
  CURRENCY_FETCH_SUCCESS,
  CURRENCY_FETCH_BEGIN,
  CURRENCY_FETCH_ERROR,
  FILTER_CURRENCIES,
  SET_BASE_CURRENCY,
  CURRENCY_LOAD_SUCCESS,
  SET_BASE_CURRENCY_BY_COUNTRY,
  BASE_CURRENCY_ID,
  ONLY_FAVORITES,
  CHANGE_FAVORITE_STATUS_STATE,
  CONVERT_CURENCIES
} from '../../constants/action-types';


const initialState = {
  baseCurrency: {},
  favoriteCurrencies: [],
  allCurrenciesList: [],
  filteredCurrencies: [],
  onlyFavoriteCurrencies: false,

  loading: false,
};

/**
 * Find by function filtering
 * @param state
 * @param filterFunc function to filter
 * @return {T}
 */
const findInCurrenciesList = (state, filterFunc) => state.allCurrenciesList.find(filterFunc);

const isCurrencyFavorite = (currencyId, state) => state.favoriteCurrencies.indexOf(currencyId) !== -1;

/**
 * Sort AllCurrency list by name
 * @param currencies
 * @param oldState
 * @return {T}
 */
const sortCurrencies = (currencies, oldState) => {
  return currencies.sort((a, b) => {
    const aFavorite = isCurrencyFavorite(a.currencyId, oldState),
          bFavorite = isCurrencyFavorite(b.currencyId, oldState);

    if (aFavorite > bFavorite) {
      return -1;
    } else if (aFavorite < bFavorite) {
      return 1;
    }

    if (a.currencyName < b.currencyName) {
      return -1;
    } else if (a.currencyName > b.currencyName) {
      return 1;
    }
    return 0;
  });
};


/**
 *
 * @param oldState
 * @param action
 * @return {{[p: string]: *}}
 */
const changeFavoriteStatusState = (oldState, action) => {
  let favorite = [...oldState.favoriteCurrencies];
  const idx = favorite.indexOf(action.payload.currencyId);

  if (idx === -1)
    favorite.push(action.payload.currencyId);
  else
    favorite.splice(idx, 1);

  return {
    ...oldState,
    favoriteCurrencies: favorite
  }
};


const filterCurrencies = (oldState, action) => {
  let currencies = [...oldState.allCurrenciesList];

  if (oldState.onlyFavoriteCurrencies === true) {
    currencies = currencies.filter(el => oldState.favoriteCurrencies.indexOf(el.currencyId) !== -1);
  }

  return {
    ...oldState,
    filteredCurrencies: sortCurrencies(currencies, oldState)
  };
};

const setBaseCurrencyByCountry = (oldState, action) => {
  const currency = oldState.allCurrenciesList.find(el => el.id === action.payload.countryId);

  // set USD as base currency if there no country in list or country doesn't have currency id
  const currencyId = (!currency || !currency.hasOwnProperty('currencyId')) ? 'USD' : currency.currencyId;

  AsyncStorage.setItem(BASE_CURRENCY_ID, currencyId);

  return {
    ...oldState,
    baseCurrency: currency,
  };
};

const setBaseCurrency = (oldState, action) => {
  AsyncStorage.setItem(BASE_CURRENCY_ID, action.payload.currencyId);

  return {
    ...oldState,
    baseCurrency: findInCurrenciesList(oldState, el => el.currencyId === action.payload.currencyId),
  }
};

const currencyFetchError = (oldState, action) => {
  return {
    ...oldState,
    loading: false,
    error: action.payload.error,
    allCurrenciesList: [],
  }
};


const fetchingCurrencySuccess = (oldState, action) => {
  return {
    ...oldState,
    allCurrenciesList: sortCurrencies([...action.payload], oldState),
  };
};


/**
 * @param state
 * @param action
 * @return {*}
 */
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case CURRENCY_FETCH_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };

    case CURRENCY_FETCH_SUCCESS:
      return fetchingCurrencySuccess(state, action);

    case CURRENCY_LOAD_SUCCESS:
      return { ...state, loading: false };

    case CURRENCY_FETCH_ERROR:
      return currencyFetchError(state, action);

    case SET_BASE_CURRENCY:
      return setBaseCurrency(state, action);

    case SET_BASE_CURRENCY_BY_COUNTRY:
      return setBaseCurrencyByCountry(state, action);

    case FILTER_CURRENCIES:
      return filterCurrencies(state, action);

    case CHANGE_FAVORITE_STATUS_STATE:
      return changeFavoriteStatusState(state, action);

    case ONLY_FAVORITES:
      return { ...state, onlyFavoriteCurrencies: action.payload };

    case CONVERT_CURENCIES:
      return { ...state, onlyFavoriteCurrencies: action.payload };

    default:
      return state;
  }
};


export default rootReducer;