<template>
    <navbar v-model="showNavbar">
        <div class="navbar-wrapper">
            <div class="navbar-minimize">
                <button
                    id="minimizeSidebar"
                    class="btn btn-icon btn-round"
                    @click="minimizeSidebar"
                >
                    <i
                        class="fa fa-bars text-center visible-on-sidebar-mini"
                    ></i>
                    <i
                        class="fa fa-arrow-left text-center visible-on-sidebar-regular"
                    ></i>
                </button>
            </div>

            <div class="navbar-toggle">
                <navbar-toggle-button
                    @click.native="toggleSidebar"
                ></navbar-toggle-button>
            </div>
            <a class="navbar-brand" href="#pablo"></a>
        </div>

        <template slot="navbar-menu">
            <form>
                <div class="input-group no-border">
                    <el-input placeholder="Pesquisar..." v-model="input4">
                        <i
                            slot="sufix"
                            class="el-input__icon el-icon-search"
                        ></i>
                    </el-input>
                </div>
            </form>
            <ul class="navbar-nav">
                <li class="nav-item">
                    <a class="nav-link btn-magnify" href="#pablo">
                        <i class="nc-icon nc-layout-11"></i>
                        <p>
                            <span class="d-lg-none d-md-block">Stats</span>
                        </p>
                    </a>
                </li>
                <drop-down
                    icon="nc-icon nc-bell-55"
                    tag="li"
                    position="right"
                    direction="none"
                    class="nav-item btn-rotate dropdown"
                >
                    <a
                        slot="title"
                        slot-scope="{ isOpen }"
                        class="nav-link dropdown-toggle"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        :aria-expanded="isOpen"
                    >
                        <i class="nc-icon nc-bell-55"></i>
                        <p>
                            <span class="d-lg-none d-md-block"
                                >Some Actions</span
                            >
                        </p>
                    </a>
                    <a class="dropdown-item" href="#">Action</a>
                    <a class="dropdown-item" href="#">Another action</a>
                    <a class="dropdown-item" href="#">Something else here</a>
                </drop-down>
                <li class="nav-item">
                    <a class="nav-link btn-rotate" href="#pablo">
                        <i class="nc-icon nc-settings-gear-65"></i>
                        <p>
                            <span class="d-lg-none d-md-block">Account</span>
                        </p>
                    </a>
                </li>
            </ul>
        </template>
    </navbar>
</template>
<script>
import { Navbar, NavbarToggleButton } from '@/components/UIComponents';
import NProgress from 'nprogress';

export default {
    components: {
        Navbar,
        NavbarToggleButton,
    },
    data() {
        return {
            activeNotifications: false,
            showNavbar: false,
        };
    },
    methods: {
        logout() {
            return 'delogou';
        },
        capitalizeFirstLetter(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        },
        toggleNotificationDropDown() {
            this.activeNotifications = !this.activeNotifications;
        },
        closeDropDown() {
            this.activeNotifications = false;
        },
        toggleSidebar() {
            this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
        },
        hideSidebar() {
            this.$sidebar.displaySidebar(false);
        },
        minimizeSidebar() {
            this.$sidebar.toggleMinimize();
        },
        toggleNavbar() {
            this.showNavbar = !this.showNavbar;
        },
    },
};
</script>

