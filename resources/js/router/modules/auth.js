import Layout from '@/layouts/Auth';

export default {
	path: '/auth',
	component: Layout,
	redirect: 'login',
	children: [
		{
			path: 'login',
			component: () => import('@/views/Auth/Login.vue'),
			name: 'Login',
			meta: { title: 'Loadin', auth: false },
		},
	],
}