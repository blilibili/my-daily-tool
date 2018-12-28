import qs from 'qs';
import {config} from './globalConfig'
export const requestShutDownJenkins = (param , context) =>
{
    let url = 'http://localhost:3000/cloesJen';
    return context.axios.post(url , qs.stringify(param))
};