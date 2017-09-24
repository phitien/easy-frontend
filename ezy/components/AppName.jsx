import React from 'react'
import {Link} from 'react-router-dom'
import {RegCmp} from 'ezy/common'

export class AppName extends RegCmp {
    get cmpClassName() {return 'app-name'}
    get children() {
        return <Link to={this.config.apppath}><h3>{this.cmpData || this.props.APPNAME || this.config.APPNAME}</h3></Link>
    }
}
