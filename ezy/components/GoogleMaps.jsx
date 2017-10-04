import React from 'react'
import {ToggleCmp} from 'ezy/common'
import {Button, Text} from './input'

export class GoogleMaps extends ToggleCmp {
    static autoProps() {return super.autoProps().concat([
        {name: 'locationFoundText', title: 'Current location', type: 'Text', value: 'Current location'},
        {name: 'noGeoText', title: 'No geolocation', type: 'Text', value: ``},
        {name: 'geoErrorText', title: 'Geolocation error', type: 'Text', value: ''},
        {name: 'zoom', title: 'Zoom', type: 'Number', value: 14},
        {name: 'center', title: 'Center', type: 'Number', value: {lat: -34.397, lng: 150.644}},
    ])}
    get cmpClassName() {return `ezy-maps`}
    get children() {
        return [
        ]
    }
    get pubsub() {
        return this.utils.assign(super.pubsub, {
            google_maps_loaded: this.google_maps_loaded,
        })
    }
    get map() {return this.__map = this.__map || new google.maps.Map(this.dom, this.utils.assign({
        center: this.center,
        zoom: this.zoom
    }, this.props))}
    get infoWindow() {return this.__infoWindow = this.__infoWindow || new google.maps.InfoWindow}
    setLocation = (pos, content) => {
        this.infoWindow.setPosition(pos)
        this.infoWindow.setContent(content)
        this.infoWindow.open(this.map)
    }
    google_maps_loaded = e => {
        // Try HTML5 geolocation.
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(pos => {
                let p = {
                    lat: pos.coords.latitude,
                    lng: pos.coords.longitude
                }
                this.setLocation(p, this.locationFoundText)
                this.map.setCenter(p)
            }, e => this.setLocation(this.map.getCenter(), this.geoErrorText))
        }
        else {// Browser doesn't support Geolocation
            this.setLocation(this.map.getCenter(), this.noGeoText)
        }
    }
    cmpDidMount() {
        this.utils.trigger('google_maps_init')
    }
}
