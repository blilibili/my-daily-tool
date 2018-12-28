<template>
    <div>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>启动vue项目服务</span>
                <el-button size="mini" style="float: right;" type="primary" @click="addVueProSrc">添加项目路径</el-button>
                <el-button size="mini" style="float: right;margin-right: 10px;" type="primary" @click="useConfigJson">使用已配置目录</el-button>
            </div>
            <div class="text item">
                当前路径: {{getRunNpmSrc}}
                <span style="float: right">
                    <el-button size="mini" @click="buildServer" v-show="serverPrecent != 100">唤醒jenkins</el-button>
                    <el-button size="mini" @click="startServer" v-show="serverPrecent != 100">开启npm服务</el-button>
                    <el-button size="mini" @click="closeServer" v-show="serverPrecent == 100" type="danger">关闭npm服务</el-button>
                     <el-button size="mini" @click="callCloseJenkinNode" v-show="callJenkinsStatus != 0" type="danger">关闭jenkins</el-button>
                </span>
            </div>

            <el-dialog
                    title="新增vue项目路径"
                    :append-to-body="true"
                    :visible.sync="condition.showAddVueSrc"
                    width="60%"
            >
                <el-form label-position="left" label-width="80px" :model="addData">
                    <el-form-item label="项目路径">
                        <el-input size="small" placeholder="请填写完整的项目路径" v-model="addData.url"></el-input>
                    </el-form-item>

                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="addRunNpmSrc">确 定</el-button>
                </span>
            </el-dialog>


            <el-dialog
                    title="配置文件的目录"
                    :append-to-body="true"
                    :visible.sync="condition.showConfigSrc"
                    width="60%"
            >
                <el-table
                        size="small"
                        :data="pro"
                        border
                        style="width: 100%">
                    <el-table-column
                            prop="name"
                            label="系统名称"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="src"
                            label="系统路径"
                    >
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button
                                    size="mini"
                                    @click="handleUseSrc(scope.$index, scope.row)">使用此项目路径</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-dialog>
        </el-card>

        <el-card class="box-card" style="margin-top: 10px;height: 390px;overflow: auto;">
            <el-progress :percentage="serverPrecent"></el-progress>
           {{returnMsg}}
        </el-card>
    </div>
</template>

<script>
    const iconv = require('iconv-lite')
    import proSrc from '@/config/proSrc.json'
    const exec = require('child_process').exec;
    const fs = require('fs');
    import {Message} from 'element-ui'
    import {requestShutDownJenkins} from '@/api/requestShutDownJenkins'
    import store from '@/store/index'
    export default {
        name: "index",
        mounted(){

        },
        data(){
            return {
                port:8899,
                callJenkinsStatus:0,
                updateCount:0,
                startCount:0,
                serverPrecent:0,
                returnMsg:'',
                condition:{
                    showAddVueSrc:false,
                    showConfigSrc:false
                },
                addData:{
                    url:''
                },
                pro:[]
            }
        },
        computed:{
            getRunNpmSrc(){
                return store.state.npm.proSrc;
            }
        },
        watch:{
            getRunNpmSrc(val){}
        },
        methods:{
            shutDownNodeServer(){
                let cmdStr = 'tskill node';
                let ns = exec(cmdStr , {cwd:'E://daniel_tool/daniel-tool/backend' , maxBuffer: 1024 * 500 * 1024} , (error, stdout, stderr) => {
                    if(error){
                        this.returnMsg = error;
                    }
                });
                this.callJenkinsStatus = 0;
                this.returnMsg = 'Jenkins关闭成功';
                store.dispatch('hideLoading');
            },
            callCloseJenkinNode(){
                store.dispatch('showLoading' , this);
                let cmdStr = 'node main.js'
                let cs = exec(cmdStr , {cwd:'E://daniel_tool/daniel-tool/backend' , maxBuffer: 1024 * 500 * 1024} , (error, stdout, stderr) => {
                    if(error){
                        this.returnMsg = error;
                    }
                });
                setTimeout(() => {
                    this.closeJenkinsServer();
                } , 2000)
            },
            closeJenkinsServer(){
                let tmp = {
                    url:'http://localhost:8899/exit'
                };
                requestShutDownJenkins(tmp , this).then((res) => {
                    setTimeout(() => {
                        this.shutDownNodeServer();
                    } , 2000)
                })
            },
            handleUseSrc(index , row){
                store.dispatch('addProSrcMethods' , {src:row.src});
                this.condition.showConfigSrc = false;
            },
            useConfigJson(){
                this.pro = proSrc.fileArr;
                // E:\work\SDKAdmin
                this.condition.showConfigSrc = true;
            },
            addVueProSrc(){
                this.condition.showAddVueSrc = true;
            },
            addRunNpmSrc(){
                store.dispatch('addProSrcMethods' , {src:this.addData.url});
                this.condition.showAddVueSrc = false;
            },
            closeServer(){
                let cmdStr = 'tskill node'
                let cs = exec(cmdStr , {cwd:store.state.npm.proSrc , maxBuffer: 1024 * 500 * 1024} , (error, stdout, stderr) => {
                    if(error){
                        this.returnMsg = error;
                    }
                });
                cs.on('close', (code) => {
                    this.returnMsg = '项目已关闭';
                    this.serverPrecent = 0;
                });
            },
            //执行打开谷歌浏览器
            runOpenChrome(src){
                if(this.startCount == 0){
                    let fileSrc = 'C://Program Files (x86)/Google/Chrome/Application';
                    let startServer = "start chrome.exe " + src;
                    //ls 启动服务
                    let ls = exec(startServer , {cwd:fileSrc , maxBuffer: 1024 * 500 * 1024} , (error, stdout, stderr) => {
                        if(error){
                            console.log(error);
                        }
                    });

                    ls.stdout.on('data', (data) => {

                    });
                    ls.stderr.on('data', (data) => {

                    });
                    ls.on('close', (code) => {
                        Message.success('浏览器启动成功');
                    });
                    this.startCount++;
                }else{
                    if(this.serverPrecent == 100){
                        this.returnMsg = '第' + this.updateCount +'次修改 ， 保存成功';
                        this.updateCount++;
                    }
                }
            },
            npmRunDevMethods(){
                this.returnMsg = '';
                let startServer = 'npm run dev';
                //设置30秒启动时间 若超时自动显示关闭node按钮
                setTimeout(() => {
                    this.serverPrecent = 100;
                } , 1000 * 30);
                //ls 启动服务
                let ls = exec(startServer , {cwd:store.state.npm.proSrc , maxBuffer: 1024 * 500 * 1024 , encoding: 'buffer'} , (error, stdout, stderr) => {
                    if(error){
                        console.log(error);
                    }
                });

                ls.stdout.on('data', (data) => {
                    store.dispatch('hideLoading');

                    this.returnMsg = this.returnMsg + iconv.decode(data , 'utf-8') + '\n';
                    if(this.serverPrecent == 100){
                        fs.readFile(store.state.npm.proSrc + '/config/index.js', {flag: 'r+', encoding: 'utf8'},  (err, data) => {
                            if(err) {
                                this.returnMsg = '找不到端口配置文件 , 请在项目配置文件里查看 然后输入http://localhost:端口';
                                return;
                            }
                            let port = parseInt(data.split('\n')[6].split('=')[1]) || 80;

                            let httpSrc = 'http://localhost:'+ port +'/';
                            this.returnMsg = '服务启动成功 请访问 http://localhost:'+ port +'/';
                            this.runOpenChrome(httpSrc)
                        });
                    }
                });
                ls.stderr.on('data', (data) => {
                    let tmp = iconv.decode(data , 'cp936').replace(/[^0-9]/ig,"");
                    if(tmp != ''){
                        tmp = parseInt(tmp.substr(0 , 2));
                    }else{
                        tmp = 100;
                    }
                    this.serverPrecent = tmp;
                    // this.returnMsg = this.returnMsg + data + '\n';
                });
            },
            npmRunInstall(){
                let cmdNpmInstall = 'npm install'
                //gs npm install
                let gs = exec(cmdNpmInstall , {cwd:store.state.npm.proSrc , maxBuffer: 1024 * 500 * 1024 , encoding: 'buffer'} , (error, stdout, stderr) => {
                    if(error){
                        this.returnMsg = error;
                    }
                });

                gs.stdout.on('data', (data) => {

                });
                gs.stderr.on('data', (data) => {
                    let tmp = iconv.decode(data , 'cp936').replace(/[^0-9]/ig,"");
                    if(tmp != ''){
                        tmp = parseInt(tmp.substr(0 , 2));
                    }else{
                        tmp = 100;
                    }
                    this.serverPrecent = tmp;
                    // this.returnMsg = this.returnMsg + data + '\n';
                });

                gs.on('close', (code) => {
                    this.returnMsg = 'npm安装执行成功';
                    this.npmRunDevMethods();
                });
            },
            startServer(){
                let tmp = []
                store.dispatch('showLoading' , this);
                let fileArr = 'dir /b';

                //gs npm install
                let fs = exec(fileArr , {cwd:store.state.npm.proSrc , maxBuffer: 1024 * 500 * 1024} , (error, stdout, stderr) => {
                    if(error){
                        this.returnMsg = error;
                    }
                });

                fs.stdout.on('data', (data) => {
                    if(data.indexOf('node_modules') > 0){
                        this.npmRunDevMethods();
                    }else{
                        this.npmRunInstall();
                    }
                });

            },
            buildServer(){
                this.port = 8899
                let cmdNpmBuild = 'java  -jar jenkins.war --httpPort=' + this.port;
                store.dispatch('showLoading' , this);

                //gs npm install
                let bs = exec(cmdNpmBuild , {cwd:proSrc.jenkins , maxBuffer: 1024 * 500 * 1024 , encoding: 'buffer'} , (error, stdout, stderr) => {
                    if(error){
                        this.returnMsg = error;
                    }
                });

                setTimeout(() => {
                    this.callJenkinsStatus = 1;
                    this.startCount = 0;
                    this.runOpenChrome('http://localhost:' + this.port);
                } , 5000)

                bs.stdout.on('data', (data) => {
                    store.dispatch('hideLoading');
                    this.returnMsg = iconv.decode(data , 'cp936');
                });
                bs.stderr.on('data', (data) => {
                   this.returnMsg = iconv.decode(data , 'cp936');
                });

                bs.on('close', (code) => {
                    Message.success('关闭jenkins');
                });
            }
        }
    }
</script>

<style scoped>

</style>