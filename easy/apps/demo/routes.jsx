import {wrap} from './wrapper'
import * as pages from './pages'
import Viewport from './Viewport'
import config from './config'

const onRouteEnter = (...args) => dispatchEvent(new CustomEvent('route_changed', {detail: args}))
const onRouteChanged = (...args) => dispatchEvent(new CustomEvent('route_entered', {detail: args}))

const subRoutes = [
{path: config.apppath + '/sub', component: wrap(pages.SubPage), onEnter: onRouteEnter, onChange: onRouteChanged},
/**NEWPAGE**/
]
export const routes = {
    path: config.apppath, component: wrap(Viewport), onEnter: onRouteEnter, onChange: onRouteChanged,
    indexRoute: {component: pages.HomePage},
    childRoutes: subRoutes,
}
