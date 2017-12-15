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
    meta: {title: '申请签约家庭医生', auth: false}
}, {
	path: '/bar',
	component: Bar,
    meta: {title: '健康档案', auth: false}
}, {
	path: '/combine',
	component: Combine,
    meta: {title: '绑定健康档案', auth: false}
}, {
	name: 'memberlist',
	path: '/memberlist/:code',
	component: MemberList,
	meta: {title: '康复指导', auth: false}
}, {
	path: '/user/:id',
	name: 'user',
	component: User
}, {
	path: '*',
	component: NotFoundView
}]


export default routers;