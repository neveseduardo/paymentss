<template>
	<div>
		<auth-header />
		<auth-content />
		<auth-footer />
	</div>
</template>

<script>
import AuthHeader from './components/Header.vue'
import AuthContent from './components/Content.vue'
import AuthFooter from './components/Footer.vue'
export default {
	name: 'LoginLayout',
	components: {
		AuthHeader,
		AuthContent,
		AuthFooter,
	}
}
</script>