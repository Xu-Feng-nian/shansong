<template>
    <header>
      <div class="logo">闪送</div>
      <div class="inp">
        <i class="iconfont">&#xe651;</i>
        <input type="text" placeholder="搜&nbsp;索&nbsp;商&nbsp;品" />
      </div>
      <i class="iconfont">&#xe61d;</i>
    </header>
    <div class="photo">
      <img src="../../assets/1.jpg" />
    </div>
</template>
<script>
export default {
  name: 'Header'
}
</script>
<style lang="scss" scoped>
header {
    display: flex;
    width: 100%;
    height: 1.875rem;
    height: 3rem;
    background-color: crimson;
    color: #fff;
    .logo {
      margin-left: 0.3125rem;
      width: 20px;
      height: 20px;
      text-align: center;
      margin-top: 0.125rem;
      font-size: 1rem;
    }
    .inp {
      display: flex;
      flex: 1;
      margin-left: 0.3125rem;
      margin-top: 0.625rem;
      // width: 19.375rem;
      height: 1.25rem;
      height: 1.625rem;
      border: 1px solid #333;
      .iconfont {
        // margin-left: 0.3125rem;
        margin: 0;
        width: 1.25rem;
        height: 1.25rem;
        font-size: 1.25rem;
      }
      input {
        flex: 1;
        margin-left: 0.3125rem;
        // width: 17rem;
        height: 1.5rem;
        font-size: 1rem;
        text-align: center;
        background-color: crimson;
        // color: rgb(255, 255, 255);
      }
      input::-webkit-input-placeholder {
        /* placeholder颜色 */
        color: #fff;
        /* placeholder字体大小 */
        // font-size: 12px;
      }
    }
    .iconfont {
      margin-top: 0.625rem;
      margin-left: 0.3125rem;
      margin-right: 0.5rem;
      width: 1.25rem;
      height: 1.25rem;
      font-size: 1.25rem;
    }
  }
  .photo{
    width: 100%;
    height: 190px;
    display: flex;
    img{
      flex: 1;
      height: 190px;
    }
  }
</style>
