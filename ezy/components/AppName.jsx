import React from 'react'
import {Link} from 'react-router'
import {Cmp} from 'ezy/common'

export class AppName extends Cmp {
    get cmpClassName() {return 'app-name'}
    get children() {
        return <Link to={this.config.baseUrl}><h3>{this.cmpData || this.props.APPNAME || this.config.APPNAME}</h3></Link>
    }
}
