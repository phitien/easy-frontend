// import './sass/index.scss'
import config from './config'
import {Application, xtore, routes} from './components'

const app = new Application(config)
app.container = 'application'
app.routes = routes
app.store = xtore
app.dispatch()
