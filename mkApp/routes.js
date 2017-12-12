//import Foo from './components/views/Foo';
const Apply = () => import ('./components/views/Apply.vue');
const Combine = () => import ('./components/views/Combine.vue');
const MemberList = () => import ('./components/views/MemberList.vue');

import Bar from './components/views/Bar';
import User from './components/views/User';
import NotFoundView from './components/NotFoundView';

const routers = [{
	path: '/apply',
	component: Apply,
}, {
	path: '/bar',
	component: Bar,
    meta: {description: '健康档案', auth: true}
}, {
	path: '/combine',
	component: Combine
}, {
	path: '/memberlist',
	component: MemberList
}, {
	path: '/user/:id',
	name: 'user',
	component: User
}, {
	path: '*',
	component: NotFoundView
}]


export default routers;