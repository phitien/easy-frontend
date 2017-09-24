import React from 'react'
import {Cmp} from 'ezy/common'
import {Checkbox, Select, Text, Number} from '../input'
import {Space} from '../Space'

export class TableControl extends Cmp {
    get cmpClassName() {return `ezy-table-control`}
    get owner() {return this.props.owner}
    get cols(){return this.owner.cols}
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
    renderPageSize() {
        return <div className='ezy-table-page-size'>
            <Number ref={e => this.pageSize = e} step={5} defaultValue={this.owner.pageSize}/> per page
        </div>
    }
    renderPageInfo() {
        return <div className='ezy-table-page-info'>
                Total: <span className='ezy-table-page-info-total'>{this.owner.total}</span>
            </div>
    }
    renderPagination() {
        return <div className='ezy-table-pagination'>
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
        return <div className='ezy-table-columns-settings'>
                <i className='material-icons'>settings</i>
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
