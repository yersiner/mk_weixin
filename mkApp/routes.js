//import Foo from './components/views/Foo';
const Apply = () => import ('./components/views/Apply.vue');
const Combine = () => import ('./components/views/Combine.vue');
const MemberList = () => import ('./components/views/MemberList.vue');
const DoctorDetail = () => import ('./components/views/DoctorDetail.vue');
const HealthGuide = () => import ('./components/views/HealthGuide.vue');

import User from './components/views/User';
import NotFoundView from './components/NotFoundView';

const routers = [{
	path: '/apply',
	component: Apply,
	name: 'apply',
    meta: {title: '申请签约家庭医生', auth: true}
}, {
	path: '/doctorDetail',
	name: 'doctorDetail',
	component: DoctorDetail,
    meta: {title: '医生详情', auth: false}
},{
	path: '/combine',
	name: 'combine',
	component: Combine,
    meta: {title: '绑定健康档案', auth: false}
}, {
	name: 'memberlist',
	path: '/memberlist/:code',
	component: MemberList,
	meta: {title: '康复指导', auth: false}
}, {
	name: 'healthGuide',
	path: '/healthGuide',
	component: HealthGuide,
    meta: {title: '健康档案', auth: false}
}, {
	path: '/user/:id',
	name: 'user',
	component: User
}, {
	path: '/',
	name: 'apply',
	component: Apply
}]


export default routers;