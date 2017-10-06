import React from 'react'
import {GoogleMaps} from 'ezy/components'
import {Page} from '../components/Page'

export class MapPage extends Page {
    get pageClassName() {return 'page-map'}
    get mainPanel() {
        return <GoogleMaps/>
    }
}
