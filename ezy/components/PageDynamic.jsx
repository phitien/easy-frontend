import React from 'react'
import {Page} from './Page'

export class PageDynamic extends Page {
    get pageClassName() {return 'cpage'}
}
