// Container
import MainContainer from '../container/MainContainer';

// Views
import Home from '../views/Home'

export default {
    path: '/',
    component: MainContainer,
    redirect: '/',
    children: [{
        path: '/',
        component: Home,
    }, ]
}