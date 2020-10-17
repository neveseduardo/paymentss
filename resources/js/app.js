import Vue from "vue";
import VueRouter from "vue-router";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/pt-br'
import App from "./views/App.vue";
import GlobalComponents from "./globalComponents";
import GlobalDirectives from "./globalDirectives";
import SideBar from "./components/UIComponents/SidebarPlugin";
import initProgress from "./progressbar";
import router from '@/router';
import store from '@/store';
import "@/styles/sass/index.scss";
import "@/styles/sass/demo.scss";
import sidebarLinks from "./sidebarLinks";

Vue.use(VueRouter);
Vue.use(GlobalDirectives);
Vue.use(GlobalComponents);
Vue.use(SideBar, {
    sidebarLinks: sidebarLinks
});
Vue.use(ElementUI, {
    locale
})

initProgress(router);

new Vue({
    el: "#app",
    render: h => h(App),
    store,
    router,
});
