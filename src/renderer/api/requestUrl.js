import qs from 'qs';
import {config} from './globalConfig'
export const requestMockUrl = (param , context) =>
{
    let tmp = param
    let url = tmp.url;
    let methods = tmp.methods;
    let submitData = tmp.param;

    if(methods == 'POST'){
        return context.axios.post(url , qs.stringify(submitData))
    }else if(methods == 'GET'){
        return context.axios.get(url , {params:submitData})
    }
};