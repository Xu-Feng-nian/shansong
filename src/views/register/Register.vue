<template>
  <div class="login">
    <div class="avatar">
      <img src="../../assets/i.jpg" alt="头像" />
    </div>
    <div class="account">
      <input type="text" placeholder="请输入手机号" v-model="username" />
    </div>
    <div class="password">
      <input type="password" placeholder="请输入密码" v-model="password" />
    </div>
    <div class="confirm">
      <input type="password" placeholder="确认密码" v-model="ensurement" />
    </div>
    <div class="sign" @click="handleRegister">
      <button>注册</button>
    </div>
    <div class="enroll" @click="handleLoginClick">
      <button>立即登录！</button>
    </div>
    <Toast v-if="show" :message="toastMessage" />
  </div>
</template>
<script>
import { useRouter } from 'vue-router'
import { post } from '../../untils/request'
import { reactive,toRefs } from 'vue'
import Toast,{ useToastEffrct } from "../../components/Toast"
//处理注册逻辑
const useRegisterEffect = (showToast)=>{
    const router = useRouter();
    const data = reactive({
        username:'',
        password:'',
        ensurement:''
    })
    const handleRegister = async ()=>{
        try{
            const result = await post('/api/user/register',{
                username:data.username,
                password:data.password
            })
            if(result.error===0){
                router.push({name:'Login'})
            }else{
                showToast('注册失败')
            }
        }catch(e){
            showToast('请求失败')
        }
    }
    const {username,password,ensurement} = toRefs(data);
    return {username,password,ensurement,handleRegister}
}
//处理注册跳转
const useLoginEffect = ()=>{
    const router = useRouter();
    const handleLoginClick = ()=>{
        router.push({name:'Login'});
    }
    return {handleLoginClick}
}
export default{
    name:'Register',
    computeds:{Toast},
    //setup职责就是告诉你代码执行的一个流程
    setup(){
        const {show,toastMessage,showToast} =  useToastEffrct();
        const {username,password,ensurement,handleRegister} = useRegisterEffect(showToast);
        const {handleLoginClick} =  useLoginEffect();
        return{
            show,toastMessage,
            username,password,ensurement,handleRegister,
            handleLoginClick
        }
    }
}
</script>
<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100%;
  // background: rgb(51, 184, 245);
  text-align: center;
  .avatar {
    width: 100%;
    height: 100%;
    margin-top: 130px;
    text-align: center;
    img {
      border-radius: 40px;
      width: 80px;
      height: 80px;
    }
  }
  .account {
    display: flex;
    height: 40px;
    margin-top: 30px;
    input {
      flex: 1;
      margin: 0 20px;
      height: 40px;
      line-height: 30px;
      font-size: 15px;
      border: 1px solid #333;
      background: rgb(226, 225, 225);
    }
    input::-webkit-input-placeholder {
      /* placeholder颜色 */
      color: rgb(27, 24, 24);
      /* placeholder字体大小 */
      // font-size: 12px;
    }
  }
  .password {
    display: flex;
    height: 40px;
    margin-top: 20px;
    input {
      flex: 1;
      margin: 0 20px;
      height: 40px;
      line-height: 30px;
      font-size: 15px;
      border: 1px solid #333;
      background: rgb(226, 225, 225);
    }
    input::-webkit-input-placeholder {
      /* placeholder颜色 */
      color: rgb(27, 24, 24);
      /* placeholder字体大小 */
      // font-size: 12px;
    }
  }
  .confirm {
    display: flex;
    height: 40px;
    margin-top: 20px;
    input {
      flex: 1;
      margin: 0 20px;
      height: 40px;
      line-height: 30px;
      font-size: 15px;
      border: 1px solid #333;
      background: rgb(226, 225, 225);
    }
    input::-webkit-input-placeholder {
      /* placeholder颜色 */
      color: rgb(27, 24, 24);
      /* placeholder字体大小 */
      // font-size: 12px;
    }
  }
  .sign {
    width: 100%;
    height: 100%;
    margin-top: 20px;
    text-align: center;
    button {
      width: 100px;
      height: 30px;
      font-size: 15px;
      background: rgb(81, 191, 241);
      border: 0px;
    }
  }
  .enroll {
    margin-top: 5px;
    width: 100%;
    height: 100%;
    text-align: center;
    font-size: 3px;
    background: rgba(255, 255, 255, 0);
    // border: 0px;
    button {
      width: 80px;
      height: 20px;
      // line-height: 20px;
      background: rgba(255, 255, 255, 0);
      border: 0px;
    }
  }
}
</style>
