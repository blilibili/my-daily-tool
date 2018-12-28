<template>
    <div>
        <el-tag type="danger">接口错误数: {{errCount}}</el-tag>
        <el-tag>已封账号: {{forbidCount}}</el-tag>
        <el-form label-position="left" label-width="80px" :model="addNewBlack">
            <el-form-item label="文件路径">
                <el-input size="small" placeholder="请填写完整的项目路径" v-model="file.url"></el-input>
            </el-form-item>
            <el-form-item label="验证头">
                <el-input size="small" placeholder="请填写完整验证头" v-model="Authorization"></el-input>
            </el-form-item>
            <el-form-item label="username">
                <el-input size="small" placeholder="请填写完整的username" v-model="username"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" size="mini" @click="startForbiden">开始封号</el-button>

            <el-button type="primary" size="mini" @click="startUnseal">开始封号</el-button>
        </span>
    </div>
</template>

<script>
    import {Message} from 'element-ui'
    import axios from 'axios'
    const fs = require('fs');
    import {requestForbidden} from '@/api/requestForbiddenAccount'
    export default {
        name: "index",
        mounted(){

        },
        data(){
            return {
                username:'daniel',
                Authorization:'',
                file:{
                    url:''
                },
                addNewBlack:{
                    appId:10122,
                    blackKey:'',
                    type:1,
                    level:0,
                    forbidTimeParam:2145891661000,
                    blackDesc:'工作室封号'
                },
                errCount:0,
                forbidCount:0
            }
        },
        methods:{
            startUnseal(){
                fs.readFile(this.file.url , {flag: 'r+', encoding: 'utf8'},  (err, data) => {
                    if(err) {
                        this.returnMsg = '找不到端口配置文件 , 请在项目配置文件里查看 然后输入http://localhost:端口';
                        return;
                    }
                    let arrTmp = data.split(',');
                    let tmp = {
                        keys:data,
                        addData:this.addData,
                        url:'http://119.28.112.166:4101/platform-user/user/manage/add/blackList',
                        auto:this.Authorization,
                        username:this.username
                    }
                });
            },
            startForbiden(){
                fs.readFile(this.file.url , {flag: 'r+', encoding: 'utf8'},  (err, data) => {
                    if(err) {
                        this.returnMsg = '找不到端口配置文件 , 请在项目配置文件里查看 然后输入http://localhost:端口';
                        return;
                    }
                    let arrTmp = data.split(',');
                    let tmp = {
                        keys:data,
                        addData:this.addData,
                        url:'http://119.28.112.166:4101/platform-user/user/manage/add/blackList',
                        auto:this.Authorization,
                        username:this.username
                    }
                    this.requestForbiden(tmp)
                });
            },
            requestForbiden(data){
                requestForbidden(data , this).then((res) => {
                    if(res.data.code == 0){
                        console.log(res.data);
                        this.forbidCount = res.data.count;
                        Message.success(res.data.msg);
                    }
                }).catch((err) => {
                    this.errCount = this.errCount + 1;
                })
            }
        }
    }
</script>

<style scoped>

</style>