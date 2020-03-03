import axios from 'axios';

const api = axios.create({ baseURL: 'https://swapi.co/api/' });

export const getPlanetById = async planetId => 
    api.get(`planets/${ planetId }`);
