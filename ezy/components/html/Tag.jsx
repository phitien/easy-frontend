import React from 'react'
import {FlexCmp} from 'ezy/components/cmp'

export class Tag extends FlexCmp {
    static autoProps() {return super.autoProps().concat([
    ])}
    get tagName() {
        if (this.props.tagName) return this.props.tagName
        else throw 'There is not tagName'
    }
    get tagProps() {
        return this.utils.assign({}, this.utils.exclude(this.props, 'style', 'cmpId', 'className'))
    }
    get tagStyle() {
        return this.utils.assign({}, this.style)
    }
    get output() {return this.value}
    render = () => React.createElement(
        this.tagName,
        {...this.tagProps, id: this.cmpId, className: this.className, style: this.tagStyle}
    )
}
