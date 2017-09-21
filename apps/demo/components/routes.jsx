import config from '../config'
import * as pages from '../pages'
import {wrap} from './wrapper'
import {Viewport} from './Viewport'

const onRouteEntered = (...args) => dispatchEvent(new CustomEvent('route_changed', {detail: args}))
const onRouteChanged = (...args) => dispatchEvent(new CustomEvent('route_entered', {detail: args}))

const subRoutes = [
{path: config.apppath + '/sub', component: wrap(pages.SubPage), onEnter: onRouteEntered, onChange: onRouteChanged},
/**NEWPAGE**/
]
export const routes = {
    path: config.apppath, component: wrap(Viewport), onEnter: onRouteEntered, onChange: onRouteChanged,
    indexRoute: {component: pages.HomePage},
    childRoutes: subRoutes,
}
