import Layout from '@/layouts/Dashboard';

export default {
	path: '/restrict',
	component: Layout,
	redirect: 'dashboard',
	children: [
		{
			path: 'dashboard',
			component: () => import('@/views/Dashboard/Dashboard.vue'),
			name: 'Dashboard',
			meta: { auth: true, title: 'Dashboard' },
		},
	],
}