import React from 'react'
import {Switch, Route} from 'react-router'
import {utils} from 'ezy/common'
import config from '../config'
import * as pages from '../pages'
import {wrap} from './wrapper'

const onRouteEntered = (...args) => dispatchEvent(new CustomEvent('route_changed', {detail: args}))
const onRouteChanged = (...args) => dispatchEvent(new CustomEvent('route_entered', {detail: args}))

export const routes = [
{path: `${config.apppath}/`, component: wrap(pages.HomePage)}
, {path: `${config.apppath}/table`, component: wrap(pages.TablePage)}
, {path: `${config.apppath}/messages`, component: wrap(pages.MessagesPage)}
, {path: `${config.apppath}/chart`, component: wrap(pages.ChartPage)}
, {path: `${config.apppath}/map`, component: wrap(pages.MapPage)}
, {path: `${config.apppath}/slider`, component: wrap(pages.SliderPage)}
, {path: `${config.apppath}/grid`, component: wrap(pages.GridPage)}
/**NEWPAGE**/
].map((r,i) => <Route key={i} exact {...r}/>)
