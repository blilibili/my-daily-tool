/**
 * Created by Administrator on 2017/5/24.
 */
//移动端适配
import {Message} from 'element-ui'

export const config = {
    //本地开发路由
    // website:'https://dan.samxiao.cn/',
    website:'http://10.10.3.48:3003/',
    getRandomNum(count){
        let randomNum = '';
        for(let i=0;i<count;i++){
            randomNum = randomNum + (Math.round(Math.random() * 10)).toString();
        }
        return randomNum;
    },
    //数组删除
    removeArrById(arr , data){
        for(let i = 0; i < arr.length; i++) {
            if(arr[i] === arr['person2']) {
                delete arr['person2'];
                delete arr[i];
                break;
            }
        }
    },
    //新增成功的回调函数 path 新增成功跳转的路径 data 新增成功返回的数据 context 新增的上下文
    callResult(result , len){

        if(result.code == 200){
            if(len == 0){
                Message.warning('没有对应的数据');
                return true;
            }else{
                Message.success(result.msg);
                return true;
            }
        }else{
            Message.error(result.msg);
        }
    },
    changeTree(item){
        let gameZoneInfo={};
        let gameZoneParentAgents={};
        let ccuAgentId={};
        if (item.children.length > 0) {
            this.changeTree(item.children);
        }
        if(item.children==null || item.children == undefined || item.children.length==0) {
            //缓存区服信息
            const agentId = item.region;
            const parentId = item.parentId;
            const isCCU = item.isCCU;
            //缓存改代理商中CCU不是的区服Id
            if (isCCU == 1) {
                ccuAgentId[parentId] = item.id;
            }
            const agentInfo = {"agentName": item.name, "parentId": parentId, "gameZoneId": item.id};
            gameZoneInfo[agentId] = agentInfo;
            //缓存父节点对应的子节点Id
            if (gameZoneParentAgents[parentId] == null || gameZoneParentAgents[parentId] == undefined) {
                var agentIds = [];
                agentIds.push(agentId);
                gameZoneParentAgents[parentId] = agentIds;
            } else {
                gameZoneParentAgents[parentId].push(agentId);
            }
        }
        return gameZoneParentAgents;
    },
    changeTreeSaveAgentId(arr){
        let tmp = [];
        arr.children.forEach((v , k) => {
            v.children.forEach((val , key) => {
                if(val.isCCU){
                    tmp['server' + val.id] = {
                        id:val.id,
                        name:val.name,
                        region:val.region,
                        parentId:val.parentId
                    }
                }
            })
        })
        return tmp;
    },
    //判断类型
    typeOf(obj) {
        const toString = Object.prototype.toString;
        const map = {
            '[object Boolean]'  : 'boolean',
            '[object Number]'   : 'number',
            '[object String]'   : 'string',
            '[object Function]' : 'function',
            '[object Array]'    : 'array',
            '[object Date]'     : 'date',
            '[object RegExp]'   : 'regExp',
            '[object Undefined]': 'undefined',
            '[object Null]'     : 'null',
            '[object Object]'   : 'object'
        };
        return map[toString.call(obj)];
    },
    //时间戳转换 YY-MM-DD methods 设置返回的时间  day 日期  seconds 秒
    formatDateTime(inputTime , methods) {
        let date = new Date(inputTime);
        let y = date.getFullYear();
        let m = date.getMonth() + 1;
        m = m < 10 ? ('0' + m) : m;
        let d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        let h = date.getHours();
        h = h < 10 ? ('0' + h) : h;
        let minute = date.getMinutes();
        let second = date.getSeconds();
        minute = minute < 10 ? ('0' + minute) : minute;
        second = second < 10 ? ('0' + second) : second;
        switch (methods){
            case 'day':
                return y + '-' + m + '-' + d;
                break;
            case 'seconds':
                return y + '-' + m + '-' + d + ' ' + h + ':' +minute + ':' + second;
                break;
            default:
                return '参数错误请检查';
                break;
        }
    }

};
