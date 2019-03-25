import { api } from '../../app.json';
import axios from 'axios';


const config = {
  params: {
    apiKey: api.key
  }
};


export const loadCurrenciesList = () => axios.get(api.path + 'currencies', config);


export const loadCountriesList = () => axios.get(api.path + 'countries', config);


export const convertCurrencies = (currenciesPairsToConvert) => {
  config.params.compact = 'ultra';
	config.params.q = currenciesPairsToConvert.join(',');
	return axios.get(api.path + 'convert', config);
};



export default {
  loadCurrenciesList,
  loadCountriesList,
  convertCurrencies
}