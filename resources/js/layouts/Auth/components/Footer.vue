<template>
    <div class="auth-footer">
        <p>{{ new Date().getFullYear() }} © Direitos autorais reservados - EDUARDO NEVES</p>
    </div>
</template>

<style lang="scss">
	.auth-footer{
		display: flex;
		justify-content: center;
		align-items: center;
		text-align: center;
		height: 61px;
		background-color: #fff;
		border-top: 1px solid #dedede;
		padding: 0 1rem;
	}
	.auth-footer p{
		margin: 0 !important;
	}
</style>