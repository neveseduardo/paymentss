import NProgress from "nprogress";
import {
    isLogged
} from '@/services/authentication'
let routeResolved = false;

function tryInitProgress() {
    routeResolved = false;
    setTimeout(() => {
        if (!routeResolved) {
            NProgress.start();
        }
    }, 100);
}
export default function initProgress(router) {
    router.beforeEach((to, from, next) => {
        tryInitProgress();
        let usuario = isLogged();
        if (to.meta.auth && usuario === undefined) {
            routeResolved = true;
            NProgress.done();
            return next({
                name: "Login"
            });
        } else if (to.name === 'Login') {
            return next({
                name: 'Dashboard'
            })
        } else {
            return next();
        }
    });
    router.afterEach(() => {
        routeResolved = true;
        NProgress.done();
    });
}
