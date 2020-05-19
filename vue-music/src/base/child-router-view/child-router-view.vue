<template>
    <transition :name="name">
        <router-view />
    </transition>
</template>

<script type="text/ecmascrit-6">
export default {
	props: {
		name: {
			type: String,
			default: 'slide'
		}
	}
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable'


// .slide-enter-active, .slider-leave-active
//     transition transform .3s

// .slide-enter, .slide-leave-to
//     transform translateX(100%)

@keyframes show {
	0% {
		transform: translateX(100%);
	}
	100% {
		transform: translateX(0);
	}
}
@keyframes hide {
	0% {
		transform: translateX(0);
	}
	100% {
		transform: translateX(100%);
	}
}
.slide-enter-active {
	animation: show 0.15s;
  /*transition: transform 0.15s ease;*/
}
.slide-leave-active {
	animation: hide 0.15s;
  /*transition: transform 0.15s cubic-bezier(1.0, 0.5, 0.8, 1.0);*/
}
.slide-enter, .slide-leave-to
/* .slide-fade-leave-active 用于 2.1.8 以下版本 */ {
  transform: translateX(100%);
}
</style>