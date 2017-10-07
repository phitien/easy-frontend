import React from 'react'
import {RegCmp, FlexCmp} from 'ezy/components/cmp'
import {Autocomplete} from './input'

export class Slider extends RegCmp {
    get cmpClassName() {return `ezy-slider`}
    get data() {return this.utils.array(this.cmpData || this.props.children)}
    set data(v) {
        this.cmpData = v
        this.refresh(e => this.init())
    }
    get children() {
        return <div ref={e => this.photos = e } className='ezy-slider-photos'>
            {this.data.map((c,i) => <SliderImage key={i} cmpData={c}/>)}
        </div>
    }
    init() {
        let photos = jQuery(this.photos)
        if (this.slick) photos.slick('unslick')
        if (this.data.length) this.slick = photos.slick()
    }
    cmpDidUpdate(prevProps, prevState) {
        this.init()
    }
}

export class SliderImage extends RegCmp {
    static dfCmpData() {return {
        getUrl: (...args) => null,
        html_attributions: []
    }}
    static autoProps() {return super.autoProps().concat([
        {name: 'maxWidth', title: 'maxWidth', type: 'Number', value: null},
        {name: 'maxHeight', title: 'maxHeight', type: 'Number', value: 150},
    ])}
    get cmpClassName() {return `ezy-slider-image`}
    get slider() {return this.dom.closest('.ezy-slider')}
    get children() {
        return [
            <div ref={e => this.image = e} className='ezy-slider-image-photo'/>,
            <div ref={e => this.attrs = e} className='ezy-slider-image-attrs'/>
        ]
    }
    cmpDidUpdate(prevProps, prevState) {
        let slider = jQuery(this.slider)
        let el = jQuery(this.dom), image = jQuery(this.image), attrs = jQuery(this.attrs)
        el.css({
            'width': slider.width(),
            'height': slider.height(),
        })
        attrs.html(this.cmpData.html_attributions.join())
        image.css('width', slider.width())
        let url = this.cmpData.getUrl({
            maxWidth: slider.width(),
            maxHeight: image.height(),
        })
        image.css('background-image', `url(${url})`)
    }
}
