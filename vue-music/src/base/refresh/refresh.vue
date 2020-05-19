<template>
<div class="refresh">
    <div class="icon" :class="{'icon-up':ready}" v-show="!refreshing && !refreshed"></div>
    <div class="icon-loading" v-show="refreshing"></div>
    <div class="icon-success" v-show="refreshed"></div>
    <p class="desc">{{title}}</p>
</div>
</template>

<script type="text/ecmascrit-6">
export default {
    data() {
        return {
            ready: false,
            refreshing: false,
            refreshed: false,
            title: '下拉刷新'
        }
    },
    methods: {
        beforeRefresh() {
            this.ready = false
            this.title = '下拉刷新'
        },
        refreshReady() {
            this.ready = true
            this.title = '释放立即刷新'
        },
        refreStart() {
            this.refreshing = true
            this.title = '正在努力刷新中    '
        },
        refreshSuccess() {
            this.refreshing = false
            this.ready = false
            this.refreshed = true
            this.title = '刷新成功'
        },
        refreshEnd() {
            this.refreshed = false
            this.title = '下拉刷新'
        }
    }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "~common/stylus/variable"
@import "~common/stylus/mixin"

.refresh
    width: 100%
    text-align: center
    height 50px
    padding 10px 0
    .icon
        display inline-block
        position: relative
        width: 16px
        height: 35px
        top 10px
        bg-image('arrow')
        background-size 100% 100%
        transition transform 0.1s
    .icon-up
        transform rotate(180deg)
    .icon-loading
        display inline-block
        position: relative
        top 2px
        bg-imageGif('loading')
        background-size 100% 100%
        width: 15px
        height: 15px
    .icon-success
        display inline-block
        position: relative
        top 2px
        bg-image('success')
        background-size 100% 100%
        width: 15px
        height: 13.5px
    .desc
        display inline-block
        line-height: 50px
        font-size: $font-size-small
        color: $color-text-l
        margin-left 5px
</style>
