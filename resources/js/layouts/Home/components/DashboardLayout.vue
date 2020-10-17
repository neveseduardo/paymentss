<template>
    <div class="wrapper">
        <side-bar type="sidebar" :sidebar-links="$sidebar.sidebarLinks">
            <user-menu></user-menu>
        </side-bar>

        <div class="main-panel">
            <top-navbar></top-navbar>
			
            <dashboard-content @click.native="toggleSidebar"></dashboard-content>
        </div>
    </div>
</template>
<style lang="scss">
</style>
<script>
import TopNavbar from './TopNavbar.vue'
import DashboardContent from './Content.vue'
import UserMenu from '@/components/UIComponents/SidebarPlugin/UserMenu.vue'

export default {
    components: {
        TopNavbar,
        DashboardContent,
		UserMenu,
    },
    methods: {
        toggleSidebar() {
            if (this.$sidebar.showSidebar) {
                this.$sidebar.displaySidebar(false)
            }
        }
    }
}
</script>
