import React from 'react'
import {Search} from './Search'

export class Autocomplete extends Search {
    static autoProps() {return super.autoProps().concat([
        {section: 'cmp', name: 'api', title: 'API', type: 'Text', value: null},
    ])}
    get cmpClassName() {return 'ezy-text ezy-autocomplete'}
}
