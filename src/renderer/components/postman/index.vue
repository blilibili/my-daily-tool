<template>
    <div>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>发起异步请求</span>
                <el-button size="mini" style="float: right;" type="primary" @click="addParams">添加参数</el-button>
            </div>
            <div class="text item">
                <el-form label-position="left" label-width="80px" :model="postman">
                    <el-form-item label="请求方法">
                        <el-select size="small" v-model="postman.methods" placeholder="请选择">
                            <el-option
                                    v-for="item in requestMethods"
                                    :key="item.id"
                                    :label="item.value"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="请求url">
                        <el-input size="small" v-model="postman.url"></el-input>
                    </el-form-item>

                    <el-card class="box-card">
                        <div style="margin-top: 10px;margin-bottom: 10px;" class="text item" v-for="(item , index) in fields">
                            <div style="width: 30%;display: inline-block;">
                                <el-input size="small" type="text" v-model="item.name"></el-input>
                            </div>
                            <span style="margin: 0 20px 0 20px">:</span>
                            <div style="width: 60%;display: inline-block;">
                                <el-input size="small" type="text" v-model="item.value"></el-input>
                            </div>
                        </div>

                        <div>
                            <el-button type="primary" size="small" @click="requestMockUrl">发起请求</el-button>
                        </div>
                    </el-card>

                    <el-card class="box-card" style="margin-top: 10px;">
                       <div>
                           {{errMsg}}
                       </div>
                    </el-card>

                </el-form>
            </div>
        </el-card>
    </div>
</template>

<script>
    import {axios} from 'axios'
    import {requestMockUrl} from '@/api/requestUrl';
    export default {
        name: "index",
        data(){
            return{
                errMsg:'',
                fields:[],
                postman:{
                    methods:'GET',
                    url:'',
                    param:{}
                },
                requestMethods:[
                    {
                        id:1,
                        value:'GET',
                        label:'GET'
                    },
                    {
                        id:2,
                        value:'POST',
                        label:'POST'
                    }
                ]
            }
        },
        methods:{
            addParams(){
                let obj = {
                    value:'',
                    name:''
                };

                this.fields.push(obj);
            },
            requestMockUrl(){

                let tmp = [];
                let demo = {};
                this.fields.forEach((v , k) => {
                    let field = v['name'];
                    let valueTmp = v['value'];
                    demo[field] = valueTmp
                })


                this.postman.param = demo;
                requestMockUrl(this.postman , this).then((res) => {
                    this.errMsg = res.data;
                }).catch((err) => {
                    this.errMsg = err;
                })
            }
        },
        mounted(){

        }
    }
</script>

<style scoped>

</style>