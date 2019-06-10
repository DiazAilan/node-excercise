import { DOMAIN } from "./configuration";

const axios = require('axios')

export function getResource(resource: string, queryParams?: Object) {
    return axios.get(`${DOMAIN}/${resource}`, {params: queryParams})
        .then(response => response.data)
        .catch(error => console.error(error));
}