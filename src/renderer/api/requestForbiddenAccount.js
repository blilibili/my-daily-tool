import qs from 'qs';
import {config} from './globalConfig'
export const requestForbidden = (param , context) =>
{

    let url = config.website + 'account/forbidden';
    return context.axios.post(url , qs.stringify(param))
};