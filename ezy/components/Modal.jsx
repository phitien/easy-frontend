import React from 'react'
import {FlexCmp} from 'ezy/components/cmp'

export class Modal extends FlexCmp {
    static autoProps() {return super.autoProps().concat([
        {name: 'title', title: 'Title', type: 'Text', value: null},
        {name: 'headerCmps', title: 'Header components', type: 'Text', value: []},
        {name: 'bodyCmps', title: 'Header components', type: 'Text', value: []},
        {name: 'footerCmps', title: 'Footer components', type: 'Text', value: []},
        {name: 'showClose', title: 'Show Close Icon', type: 'Select', value: true, options: [true, false]},
        {name: 'canClose', title: 'Can Close', transform: true, type: 'Textarea', value: function() {
            this.utils.trigger('ask_to_remove_modal', this.cmpData, this)
            return true
        }},
        {name: 'escape', title: 'Press ESC to clode', type: 'Select', value: true, options: [true, false]},
        {name: 'enter', title: 'Press ENTER to clode', type: 'Select', value: true, options: [true, false]},
        {name: 'outside', title: 'Click outside to clode', type: 'Select', value: true, options: [true, false]},
        {name: 'beforeClose', title: 'Before Close', transform: true, type: 'Textarea', value: function() {}},
        {name: 'afterClose', title: 'After Close', transform: true, type: 'Textarea', value: function() {}},
        {name: 'time', title: 'Auto close time', type: 'Text', value: -1},
        {name: 'draggable', title: 'Draggable', type: 'Select', value: true, options: [true, false]},
    ])}
    get cmpClassName() {return `modal`}
    get pubsub() {
        return this.utils.assign(super.pubsub, {
            remove_modal_approved: (e) => {
                let [modal] = e.detail
                if (modal == this.cmpData) {
                    this.beforeClose()
                    this.utils.trigger('remove_modal', this.cmpData, this)
                    this.afterClose()
                }
            },
        })
    }
    onClose = e => this.canClose()
    cmpDidMount() {
        jQuery(`.modal-content`).draggable({handle: '.modal-title'})
        if (this.time > 0) jQuery(this.dom).fadeOut(this.time, this.onClose)
        if (this.outside) addEventListener('click', e => !e.target.closest(`#${this.cmpId} .modal-content`) ? this.onClose() : false, true)
        addEventListener('keydown', e => {
            (this.escape && e.key == 'Escape' || this.enter && e.key == 'Enter') ? this.onClose() : false
        }, true)
    }
    renderHeader() {
        return this.renderObject([
            this.title ? <div className='modal-title'>{this.title}</div> : null,
        ].concat(this.headerCmps))
    }
    renderBody() {
        return this.renderObject(this.bodyCmps)
    }
    renderFooter() {
        return this.renderObject(this.footerCmps)
    }
    get children() {
        return <div className='modal-content' tabIndex={1}>
            <div className='modal-header'>{this.renderHeader()}</div>
            <div className='modal-body'>{this.renderBody()}</div>
            <div className='modal-footer'>{this.renderFooter()}</div>
            {this.showClose === false ? null : <i className='material-icons modal-close-icon' onClick={this.onClose}>close</i>}
        </div>
    }
}
