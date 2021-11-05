<template>
    <div class="classify">
      <div class="classify-left">每日疯抢</div>
      <div class="classify-right">
        <div class="classify-right-top">生鲜区</div>
        <div class="classify-right-btn">
          <div>1</div>
          <div>2</div>
          <div>3</div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'Class'
}
</script>

<style lang="scss" scoped>
.classify {
  margin-top: 15px;
  width: 100%;
  height: 100%;
  display: flex;
  .classify-left {
    flex: 1;
    height: 200px;
    background: chartreuse;
  }
  .classify-right {
    flex: 2;
    height: 200px;
    background: chocolate;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    .classify-right-top {
      flex-grow: 1;
      height: 100px;
    }
    .classify-right-btn {
      flex-grow: 1;
      height: 100px;
      display: flex;
      div {
        flex: 1;
        background: cornsilk;
      }
    }
  }
}
</style>
