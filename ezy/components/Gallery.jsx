import React from 'react'
import {RegCmp, FlexCmp} from 'ezy/components/cmp'
import {Autocomplete} from './input'

export class Gallery extends RegCmp {
    get cmpClassName() {return `ezy-gallery`}
    get data() {return this.utils.array(this.cmpData || this.props.children)}
    set data(v) {
        this.cmpData = v
        this.refresh(e => this.init())
    }
    get children() {
        return <div ref={e => this.photos = e } className='ezy-gallery-photos'>
            {this.data.map((c,i) => <GalleryImage key={i} cmpData={c}/>)}
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

export class GalleryImage extends RegCmp {
    static dfCmpData() {return {
        getUrl: (...args) => null,
        html_attributions: []
    }}
    static autoProps() {return super.autoProps().concat([
        {name: 'maxWidth', title: 'maxWidth', type: 'Number', value: null},
        {name: 'maxHeight', title: 'maxHeight', type: 'Number', value: 150},
    ])}
    get cmpClassName() {return `ezy-gallery-image`}
    get gallery() {return this.dom.closest('.ezy-gallery')}
    get children() {
        return [
            <div ref={e => this.image = e} className='ezy-gallery-image-photo'/>,
            <div ref={e => this.attrs = e} className='ezy-gallery-image-attrs'/>
        ]
    }
    cmpDidUpdate(prevProps, prevState) {
        let gallery = jQuery(this.gallery)
        let el = jQuery(this.dom), image = jQuery(this.image), attrs = jQuery(this.attrs)
        el.css({
            'width': gallery.width(),
            'height': gallery.height(),
        })
        attrs.html(this.cmpData.html_attributions.join())
        image.css('width', gallery.width())
        let url = this.cmpData.getUrl({
            maxWidth: gallery.width(),
            maxHeight: image.height(),
        })
        image.css('background-image', `url(${url})`)
    }
}
