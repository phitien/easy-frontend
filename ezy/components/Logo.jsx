import React from 'react'
import {Link} from 'react-router-dom'
import {RegCmp} from 'ezy/common'

export class Logo extends RegCmp {
    get cmpClassName() {return 'logo'}
    get children() {
        return <Link to={this.config.apppath}>
            <img className='logo-img' alt={this.config.APPNAME} src={this.cmpData || this.props.applogo || this.config.applogo}/>
        </Link>
    }
}
