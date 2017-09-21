import React from 'react'
import {Switch, Route} from 'react-router'
import {utils} from 'ezy/common'
import config from '../config'
import * as pages from '../pages'
import {wrap} from './wrapper'
import {Viewport} from './Viewport'

const onRouteEntered = (...args) => dispatchEvent(new CustomEvent('route_changed', {detail: args}))
const onRouteChanged = (...args) => dispatchEvent(new CustomEvent('route_entered', {detail: args}))

const roots = [config.apppath + '/']
const children = [
{path: config.apppath + '/sub', component: wrap(pages.SubPage)},
/**NEWPAGE**/
].map((r,i) => <Route key={i} exact {...r}/>)
export const routes = roots.map((r,i) => <Route key={i} exact {...r} component={wrap(pages.HomePage)}><Switch>{children}</Switch></Route>)
