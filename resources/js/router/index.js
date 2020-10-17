import Vue from 'vue';
import Router from 'vue-router';
import AuthRoutes from './modules/auth'
import AdminRoutes from './modules/admin'
import ErrorsRoutes from './modules/errors'

Vue.use(Router);

export const routes = [
	{
		path: '',
		component: () => import('@/views/Home/Home.vue'),
		name: 'home',
		meta: { auth: false, admin: false, title: 'Home' },
	},
	AdminRoutes,
	AuthRoutes,
	ErrorsRoutes
]

const createRouter = () => new Router({
	//mode: 'history',
	scrollBehavior: () => ({ y: 0 }),
	base: process.env.MIX_BASE_PATH,
	routes: routes,
});

const router = createRouter();

export function resetRouter() {
	const newRouter = createRouter();
	router.matcher = newRouter.matcher; // reset router
}

export default router;