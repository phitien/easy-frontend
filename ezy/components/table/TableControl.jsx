import React from 'react'
import {Cmp} from 'ezy/components/cmp'
import {Checkbox, Select, Text, Number} from '../input'
import {Space} from '../Space'

export class TableControl extends Cmp {
    static autoProps() {return super.autoProps().concat([
        {section: 'cmp', name: 'showColumnsSetting', title: 'showColumnsSetting', type: 'Select', value: null, required: false, desc: null, options: [true, false]},
        {section: 'cmp', name: 'columns', title: 'Columns', type: 'Text', value: [], required: false, desc: null},
    ])}
    get cmpClassName() {return this.owner.controlClassName}
    get owner() {return this.props.owner}
    get cols() {return this.owner.cols}
    get actualCols() {return this.owner.actualCols}
    get allcols() {return this.owner.allcols}
    get rows() {return this.owner.rows}
    get output() {
        return {
            page: this.page.output,
            pageSize: this.pageSize.output
        }
    }
    get goToStart() {
        return e => {
            this.page.valueR = 1
            this.owner.apiLoad()
        }
    }
    get goToEnd() {
        return e => {
            this.page.valueR = this.owner.totalPage
            this.owner.apiLoad()
        }
    }
    get goToPrev() {
        return e => {
            if (this.page.output > 1) {
                this.page.valueR = this.page.output - 1
                this.owner.apiLoad()
            }
        }
    }
    get goToNext() {
        return e => {
            if (this.page.output < this.owner.totalPage) {
                this.page.valueR = this.page.output + 1
                this.owner.apiLoad()
            }
        }
    }
    cmpDidMount() {
        addEventListener('click', e => {
            if (!e.target.closest(`.${this.cmpClassName}-columns-list`)) this.showColumnsSettingR = false
        }, true)
    }
    renderPageSize() {
        return <div className={`${this.cmpClassName}-page-size`}>
            <Number ref={e => this.pageSize = e} step={5} defaultValue={this.owner.pageSize}/> per page
        </div>
    }
    renderPageInfo() {
        return <div className={`${this.cmpClassName}-page-info`}>
                Total: <span className={`${this.cmpClassName}-page-info-total`}>{this.owner.total}</span>
            </div>
    }
    renderPagination() {
        return <div className={`${this.cmpClassName}-pagination`}>
                <i className='material-icons' onClick={this.goToStart}>first_page</i>
                <i className='material-icons' onClick={this.goToPrev}>chevron_left</i>
                <Select ref={e => this.page = e}
                    options={Array.from({length: this.owner.totalPage}, (c,i) => i + 1)}
                    defaultValue={this.owner.page}
                    searchable={true}/>
                <i className='material-icons' onClick={this.goToNext}>chevron_right</i>
                <i className='material-icons' onClick={this.goToEnd}>last_page</i>
            </div>
    }
    renderColumnsSetting() {
        return <div className={`${this.cmpClassName}-columns-settings`}>
                <i className='material-icons' onClick={e => this.showColumnsSettingR = true}>settings</i>
                {!this.showColumnsSetting ? null :
                <div className={`${this.cmpClassName}-columns-list`}>{this.allcols.map((c,i) =>
                <Checkbox key={i} defaultChecked={c.show} label={c.title || c.name || c.field}
                    onChange={v => {
                        c.show = v
                        this.owner.refresh()
                    }}/>)}</div>}
            </div>
    }
    get children() {
        return [].concat(
            this.owner.showPageSize ? this.renderPageSize() : <Space/>,
            <Space/>,
            this.owner.showPageInfo ? this.renderPageInfo() : <Space/>,
            <Space/>,
            this.owner.showPagination ? this.renderPagination() : null,
            this.owner.showColumnsSetting ? this.renderColumnsSetting() : null,
        )
    }
}
