import {InjectionToken } from '@angular/core';

export let APP_CONFIG = new InjectionToken ('app.config');
const BASE_URL = 'https://jsonplaceholder.typicode.com';

export interface AppConfig {
  BASE_URL: string;
}

export const AppConfig: AppConfig = {  
  BASE_URL: BASE_URL
};