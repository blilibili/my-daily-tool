<template>
    <div>
        <el-form ref="form" :model="line" label-width="120px">
            <el-form-item label="待换行内容:">
                <el-input type="textarea"
                          :rows="6"
                          v-model="line.content"
                ></el-input>
            </el-form-item>

            <el-form-item label="" style="text-align: center;">
                <img @click="changeBrContent" src="../../assets/down_arrow.png" alt="" style="width: 50px;height: 50px;cursor: pointer;">
            </el-form-item>

            <el-form-item label="转换内容:">
                <el-input type="textarea"
                          :rows="10"
                          v-model="line.changeContent"
                ></el-input>
            </el-form-item>
            
        </el-form>
    </div>
</template>

<script>
    export default {
        name: "index",
        data(){
            return {
                line:{
                    content:'',
                    changeContent:''
                }
            }
        },
        methods:{
            changeBrContent(){
                let waitChangeStr = this.line.content;
                let reg = new RegExp("\r\n","g");
                this.line.changeContent = waitChangeStr.replace(reg,",");
                reg = new RegExp("\r","g");
                this.line.changeContent = waitChangeStr.replace(reg,",");
                reg = new RegExp("\n","g");
                this.line.changeContent = waitChangeStr.replace(reg,",");
            }
        }
    }
</script>

<style scoped>

</style>