import axios from 'axios';
import {BASE_URL} from '../Api/BaseUrl';

export const handleAPIRequest = async (method, url, data) => {
  let header = null;

  if (method === 'post') {
    header = {
      'Content-Type': 'application/json',
      Authorization:
        'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5NzBmYzQzZS0zNjdlLTQ5YzMtYTIzNS02ZGU4MjAxY2QxMmMiLCJqdGkiOiI0MTRiNTJmNzkyYzhjZWMyMmI4YmIwMGY0OGE3YTAwZjQyODQ0NDZmY2MwOGFjNDZmNjkwMTMxODAzYTQyZjgzYjFhMWVmZjE3YWVhOTNhNCIsImlhdCI6MTY4MTAzOTkwOC4wODkwMzE5MzQ3MzgxNTkxNzk2ODc1LCJuYmYiOjE2ODEwMzk5MDguMDg5MDM1OTg3ODU0MDAzOTA2MjUsImV4cCI6MTcxMjY2MjMwOC4wODQwMDM5MjUzMjM0ODYzMjgxMjUsInN1YiI6IjIiLCJzY29wZXMiOltdfQ.dM_Vz6gEZXrjL_a5vN8xTV8ctraGWAvsXIMuowdFejacZx9XYmmXDNy3a_I7hNCFt8YK3VDBeQVS3qv01ItXiFsi_egKP5CUTrhNILrKU2kI7zQ_xf_o9FyHh0ZFRyMfzIFvHVlz7ohhZQ-nVK98iGmZfDyfrxX1Kt0hDzL8zpZ51NkMzkxBL1FLf8TXWE70lePuzjzXMFBKLwmAFXwPpaAfx2P3XZU7sEGtArc523Qud05snv052qfJDlgrPwUFVISkwRP52DKelXNvM1LLlLR_mLH2eEEdxzKuBRqJ-PPyqv6xnHT5d3jpBUGVBX58VW4LJrSzgAb3VsnP6dOdSg6h31zjg5I0-YhXtYwdmnals5tzap2xX47VyM6gvzgt-dL-GcoJDlpJRcbI_JzbB8E2Nd5zIpNipEmXmLnqW33ufaVteAbTaaTWt6SOmnBG06jekxiV3s6mh8TIjpgZmouxDEhYd00sroqSVEFmpwxbPk-aql2gM2M4nyaNqdF3e17tnvynCfLnSP362VEPqc0qnMVzY4RTMq6G2NjXzhY402v9jRBbx-7LB7cQVJoMU_vngU6v4JUqP4X-o1WnFCo80cNlq0rlgfE0I21XH9eqD0JDrrXdbe0mvA-tIYoJgQo1vA0i_p4LpSWqU-aFYVowaG-Nffi3wfcjaFYon8o',
    };
  } else {
    header = {
      Authorization:
        'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5NzBmYzQzZS0zNjdlLTQ5YzMtYTIzNS02ZGU4MjAxY2QxMmMiLCJqdGkiOiI0MTRiNTJmNzkyYzhjZWMyMmI4YmIwMGY0OGE3YTAwZjQyODQ0NDZmY2MwOGFjNDZmNjkwMTMxODAzYTQyZjgzYjFhMWVmZjE3YWVhOTNhNCIsImlhdCI6MTY4MTAzOTkwOC4wODkwMzE5MzQ3MzgxNTkxNzk2ODc1LCJuYmYiOjE2ODEwMzk5MDguMDg5MDM1OTg3ODU0MDAzOTA2MjUsImV4cCI6MTcxMjY2MjMwOC4wODQwMDM5MjUzMjM0ODYzMjgxMjUsInN1YiI6IjIiLCJzY29wZXMiOltdfQ.dM_Vz6gEZXrjL_a5vN8xTV8ctraGWAvsXIMuowdFejacZx9XYmmXDNy3a_I7hNCFt8YK3VDBeQVS3qv01ItXiFsi_egKP5CUTrhNILrKU2kI7zQ_xf_o9FyHh0ZFRyMfzIFvHVlz7ohhZQ-nVK98iGmZfDyfrxX1Kt0hDzL8zpZ51NkMzkxBL1FLf8TXWE70lePuzjzXMFBKLwmAFXwPpaAfx2P3XZU7sEGtArc523Qud05snv052qfJDlgrPwUFVISkwRP52DKelXNvM1LLlLR_mLH2eEEdxzKuBRqJ-PPyqv6xnHT5d3jpBUGVBX58VW4LJrSzgAb3VsnP6dOdSg6h31zjg5I0-YhXtYwdmnals5tzap2xX47VyM6gvzgt-dL-GcoJDlpJRcbI_JzbB8E2Nd5zIpNipEmXmLnqW33ufaVteAbTaaTWt6SOmnBG06jekxiV3s6mh8TIjpgZmouxDEhYd00sroqSVEFmpwxbPk-aql2gM2M4nyaNqdF3e17tnvynCfLnSP362VEPqc0qnMVzY4RTMq6G2NjXzhY402v9jRBbx-7LB7cQVJoMU_vngU6v4JUqP4X-o1WnFCo80cNlq0rlgfE0I21XH9eqD0JDrrXdbe0mvA-tIYoJgQo1vA0i_p4LpSWqU-aFYVowaG-Nffi3wfcjaFYon8o',
    };
  }
  try {
    const response = await axios({
      method: method,
      url: `${BASE_URL}${url}`,
      headers: header,
      data: data,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};
