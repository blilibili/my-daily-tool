<template>
  <div id="wrapper">
    <main>
      <el-row>
        <el-col :span="24">
          <div class="tool-header">
            <div class="logo">我的工作台</div>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4">
          <el-menu
                  :router="true"
                  style="height: 100vh;"
                  default-active="/banAccount"
                  class="el-menu-vertical-demo"
                  @select="selectRouter"
                  background-color="#545c64"
                  text-color="#fff"
                  active-text-color="#ffd04b">
            <!--<el-menu-item index="/postman">-->
              <!--<i class="el-icon-location"></i>-->
              <!--<span>请求工具</span>-->
            <!--</el-menu-item>-->
            <!--<el-menu-item index="/npmvue">-->
              <!--<i class="el-icon-setting"></i>-->
              <!--<span>npm服务</span>-->
            <!--</el-menu-item>-->
            <el-menu-item index="/banAccount">
              <i class="el-icon-setting"></i>
              <span>批量封号</span>
            </el-menu-item>
            <el-menu-item index="/tool">
              <i class="el-icon-bell"></i>
              <span>换行操作</span>
            </el-menu-item>
          </el-menu>
        </el-col>
        <el-col :span="20">
          <div class="tool-content">
            <router-view></router-view>
          </div>
        </el-col>
      </el-row>
    </main>
  </div>
</template>

<script>

  export default {
    name: 'landing-page',
    components: {},
      data() {
          return {
              activeIndex: '1',
              activeIndex2: '1'
          };
      },
      methods: {
          selectRouter(){

          }
      },
      mounted(){
        this.$router.replace('/banAccount');
      }
  }
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');

  .tool-header{
    padding: 0 40px;
    position: relative;
    height: 60px;
    background-color: #fff;
    box-shadow: 0 1px 2px rgba(150,150,150,0.3);
  }
  .logo{
    float: left;
    padding-top: 22px;
    font-size: 14px;
  }
  .tool-content{
    padding: 20px;
  }
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body { font-family: 'Source Sans Pro', sans-serif; }

  #wrapper {
    background:
      radial-gradient(
        ellipse at top left,
        rgba(255, 255, 255, 1) 40%,
        rgba(229, 229, 229, .9) 100%
      );
    height: 100vh;
    /*width: 100vw;*/
    overflow: hidden;
  }

  #logo {
    height: auto;
    margin-bottom: 20px;
    width: 420px;
  }

  main {
    /*display: flex;*/
    justify-content: space-between;
  }

  main > div { flex-basis: 50%; }

  .left-side {
    display: flex;
    flex-direction: column;
  }

  .welcome {
    color: #555;
    font-size: 23px;
    margin-bottom: 10px;
  }

  .title {
    color: #2c3e50;
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 6px;
  }

  .title.alt {
    font-size: 18px;
    margin-bottom: 10px;
  }

  .doc p {
    color: black;
    margin-bottom: 10px;
  }

  .doc button {
    font-size: .8em;
    cursor: pointer;
    outline: none;
    padding: 0.75em 2em;
    border-radius: 2em;
    display: inline-block;
    color: #fff;
    background-color: #4fc08d;
    transition: all 0.15s ease;
    box-sizing: border-box;
    border: 1px solid #4fc08d;
  }

  .doc button.alt {
    color: #42b983;
    background-color: transparent;
  }
</style>
