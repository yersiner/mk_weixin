//import Foo from './components/views/Foo';
const Foo = () =>
	import ('./components/views/Foo.vue');
import Bar from './components/views/Bar';
import User from './components/views/User';
import NotFoundView from './components/NotFoundView';

const routers = [{
	path: '/foo',
	component: Foo,
}, {
	path: '/bar',
	component: Bar,
    meta: {description: '健康档案', auth: true}
}, {
	path: '/user/:id',
	name: 'user',
	component: User
}, {
	path: '*',
	component: NotFoundView
}]


export default routers;