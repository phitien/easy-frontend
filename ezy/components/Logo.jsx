import React from 'react'
import {Link} from 'react-router-dom'
import {RegCmp} from 'ezy/common'

export class Logo extends RegCmp {
    get cmpClassName() {return 'logo'}
    get children() {
        return <Link className='logo-image' to={this.config.apppath}
            style={{backgroundImage: `url(${this.cmpData || this.props.applogo || this.config.applogo})`}}
            />
    }
}
