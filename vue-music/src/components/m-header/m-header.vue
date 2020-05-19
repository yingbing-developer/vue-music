<template>
<div class="m-header">
  <div class="icon"></div>
  <h1 class="text">好用云音乐</h1>
  <router-link to="/user" class="mine" tag="div">
    <span class="text-mine">
      我的收藏
    </span>
  </router-link>
</div>
</template>

<script type="text/ecmascrit-6">
export default {}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .m-header
    position: relative
    height: 80px
    text-align: left
    color: $color-theme-w
    font-size: 0
    background $color-background-red
    .icon
      display:inline-block
      vertical-align: top
      margin-top: 28.5px
      width:22px;
      height: 22px;
      margin-right:9px
      margin-left 9px
      bg-image('logo')
      background-size: 100% 100%
    .text
      display: inline-block
      vertical-align: top
      line-height 80px
      font-size $font-size-large
    .mine
      position absolute
      top 50%
      transform translateY(-50%)
      right 20px
      width 85px
      height 35px
      border-radius 30px
      background $color-background
      color $color-theme
      text-align center
      line-height 35px
      .text-mine
        font-size 15px
</style>
