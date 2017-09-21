import React from 'react'
import {Link} from 'react-router-dom'
import {Cmp} from 'ezy/common'

export class Logo extends Cmp {
    get cmpClassName() {return 'logo'}
    get children() {
        return <Link to={this.config.apppath}>
            <img className='logo-img' alt={this.config.APPNAME} src={this.cmpData || this.props.applogo || this.config.applogo}/>
        </Link>
    }
}
