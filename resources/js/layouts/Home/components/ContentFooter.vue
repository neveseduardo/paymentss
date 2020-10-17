<template>
    <footer class="footer">
        <p>{{ new Date().getFullYear() }} © SIG - Sistema Intergado de Gestão - V {{ version }}</p>
    </footer>
</template>
<script>
export default {
    data() {
        return {
            version: '0.0.1'
        }
    }
}
</script>
<style>
</style>
