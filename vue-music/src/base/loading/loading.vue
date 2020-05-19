<template>
    <div class="loading">
        <div class="loader">
        </div>
        <p class="desc">{{title}}</p>
    </div>
</template>

<script type="text/ecmascrit-6">
export default {
    props: {
        title: {
            type: String,
            default: '正在载入'
        }
    }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "~common/stylus/variable"

.loading
    width: 100%
    text-align: center
    .loader
        display inline-block
        border-radius 50%
        color: $color-text-l
        font-size: 0.5px
        background $color-background
        text-indent: -0.3px
        position: relative
        width: 50px
        height: 50px
        box-shadow: inset 0 0 0 2.5px
        transform: translateZ(0)
        animation: load 2.5s infinite ease
        &::before, &::after
            border-radius 50%
            position absolute
            content ''
            background $color-background
            width 26px
            height 51px
        &::before
            border-radius: 51px 0 0 51px
            top: -0.5px
            left: -0.5px
            transform-origin: 25.5px 25.5px
            animation: load 2.5s infinite ease 2s
        &::after
            border-radius: 0 51px 51px 0
            top: -0.5px
            left: 24.5px
            transform-origin: 0.5px 25.5px
            animation: load 2.5s infinite ease
    .desc
        line-height: 20px
        font-size: $font-size-small
        color: $color-text-l
@keyframes load {
  0% {
    transform: rotate(0deg)
  }
  100% {
    transform: rotate(360deg)
  }
}
</style>
