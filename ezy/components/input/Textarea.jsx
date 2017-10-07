import React from 'react'
import {Text} from './Text'

export class Textarea extends Text {
    get cmpClassName() {return 'ezy-textarea'}
    render = () => <textarea
        {...this.inputProps}
        {...{id: this.cmpId,
            ref: (e => this.input = e),
            onClick: this.onClick,
            onChange: this.onInputChange,
            onKeyPress: this.onKeyPress,
            className: this.className,
        }}
        />
}
