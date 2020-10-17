<template>
    <div class="auth-content">
        <transition name="fade" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>

<style lang="scss">
	.auth-content{
		display: flex;
		width: 100%;
		min-height: calc(100vh - 122px);
		justify-content: center;
		align-items: center;
	}
</style>