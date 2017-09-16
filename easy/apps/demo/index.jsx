// import './sass/index.scss'
import config from './config'
import xtore from './xtore'
import routes from './routes'
import {Application} from './Application'

const app = new Application(config)
app.container = 'application'
app.routes = routes
app.store = store
app.dispatch()
