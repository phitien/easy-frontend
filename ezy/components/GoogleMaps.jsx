import React from 'react'
import {ToggleCmp, FlexCmp} from 'ezy/common'
import {Button, Text, Autocomplete} from './input'
import {Form} from './Form'

export class GoogleMapsInfoPanel extends ToggleCmp {
    get cmpClassName() {return `ezy-maps-info-panel`}
    get animation() {return {direction: 'up'}}
    get selector() {return `#${this.cmpId} > div`}
    get address() {
        return this.cmpData.address_components ? [
            (this.cmpData.address_components[0] && this.cmpData.address_components[0].short_name || ''),
            (this.cmpData.address_components[1] && this.cmpData.address_components[1].short_name || ''),
            (this.cmpData.address_components[2] && this.cmpData.address_components[2].short_name || ''),
        ].join(' ')
        : null
    }
    get children() {
        return [
            <div className='ezy-maps-info-panel-place-icon' style={{
                backgroundImage: `url(${this.cmpData && this.cmpData.icon || ''})`,
                display: this.cmpData && this.cmpData.icon ? 'block' : 'none'
            }}></div>,
            <div className='ezy-maps-info-panel-place-name'>{this.cmpData && this.cmpData.name || ''}</div>,
            <div className='ezy-maps-info-panel-place-address'></div>,
        ]
    }
}
export class GoogleMaps extends ToggleCmp {
    static autoProps() {return super.autoProps().concat([
        {name: 'locationFoundText', title: 'Current location', type: 'Text', value: 'Current location'},
        {name: 'noGeoText', title: 'No geolocation', type: 'Text', value: ``},
        {name: 'geoErrorText', title: 'Geolocation error', type: 'Text', value: ''},
        {name: 'zoom', title: 'Zoom', type: 'Number', value: 15}, // Why 15? Because it looks good.
        {name: 'detailzoom', title: 'Detail Zoom', type: 'Number', value: 17}, // Why 17? Because it looks good.
        {name: 'center', title: 'Center', type: 'Number', value: {lat: -34.397, lng: 150.644}},
        {name: 'search', title: 'Search', type: 'Select', value: true, options: [true, false]},
        {name: 'infoPanel', title: 'Info Panel', type: 'Component', value: <GoogleMapsInfoPanel/>},
    ])}
    get cmpClassName() {return `ezy-maps`}
    get children() {
        return [
            <div className='ezy-maps-container'></div>,
            this.search ? <Form ref={e => this.form = e}>
                <Autocomplete cmpId={`ezy-maps-autocomplete`}
                    onChange={e => !e.target.value ? this.infoPanelCmp.cmpDataR = {} : null}
                    forceOpen={true}
                    placeholder='Enter a location'
                    icon='search'/>
            </Form> : null,
            this.search && this.infoPanel ? React.cloneElement(this.infoPanel, {ref: (e => this.infoPanelCmp = e)}) : null
        ]
    }
    get pubsub() {
        return this.utils.assign(super.pubsub, {
            google_maps_loaded: this.google_maps_loaded,
        })
    }
    get map() {return this.__map = this.__map || new google.maps.Map(jQuery(this.dom).find('.ezy-maps-container').get(0), this.utils.assign({
        center: this.center,
        zoom: this.zoom
    }, this.props))}
    get autocomplete() {return this.__autocomplete = this.__autocomplete || new google.maps.places.Autocomplete(this.form.elements['ezy-maps-autocomplete'].input)}
    get infowindow() {return this.__infowindow = this.__infowindow || new google.maps.InfoWindow}
    get marker() {return this.__marker = this.__marker || new google.maps.Marker({
        map: this.map,
        anchorPoint: new google.maps.Point(0, -29)
    })}
    setLocation = (pos, content) => {
        this.infowindow.setPosition(pos)
        this.infowindow.setContent(content)
        this.infowindow.open(this.map)
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
        if (this.search) {
            this.autocomplete.bindTo('bounds', this.map)
            this.autocomplete.addListener('place_changed', e => {
                this.infowindow.close()
                this.marker.setVisible(false)
                let place = this.autocomplete.getPlace()
                if (!place.geometry) {
                    this.lastMessage = `No details available for input: '${place.name}'`
                    return
                }
                if (place.geometry.viewport) this.map.fitBounds(place.geometry.viewport)
                else {
                    this.map.setCenter(place.geometry.location)
                    this.map.setZoom(this.detailzoom)
                }
                this.marker.setPosition(place.geometry.location)
                this.marker.setVisible(true)
                this.infowindow.open(this.map, this.marker)

                if (this.infoPanelCmp) this.infoPanelCmp.cmpDataR = place
            })
        }
    }
    cmpDidMount() {
        this.utils.trigger('google_maps_init')
    }
}
