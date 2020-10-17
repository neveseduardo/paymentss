import Layout from '@/layouts/Errors';

export default {
	path: '*',
	component: Layout,
	redirect: '404',
	children: [
		{
			path: '404',
			component: () => import('@/views/Errors/404.vue'),
			name: '404',
			meta: { auth: false, title: '404' },
		},
	],
}