import React from 'react'
import {Link} from 'react-router-redux'
import {Cmp} from 'ezy/common'

export class Logo extends Cmp {
    get cmpClassName() {return 'logo'}
    renderCmp() {
        return <Link to={this.config.baseUrl}>
            <img className='logo-img' alt={this.config.APPNAME} src={this.cmpData || this.props.applogo || this.config.applogo}/>
        </Link>
    }
}
