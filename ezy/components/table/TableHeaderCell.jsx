import React from 'react'
import {Cmp} from 'ezy/common'
import {Checkbox} from '../input'

export class TableHeaderCell extends Cmp {
    get cmpClassName() {return `ezy-table-cell`}
    get owner() {return this.props.owner}
    get cols(){return this.owner.cols}
    get rows() {return this.owner.rows}
    get col() {return this.props.col}
    get index() {return this.props.index}
    get type() {return this.col.type}
    get data() {return this.col.data}
    get checked() {
        return this.rows.find(r => !r.selected) ? false : true
    }
    get onSort() {
        return this.owner.onSort
    }
    renderCell() {
        if (this.type == 'checkbox') return <Checkbox checked={this.checked} onChange={this.owner.selectAll} data-index={this.index}/>
        else return <div className='ezy-table-cell-title' onClick={this.onSort} data-index={this.index}>{this.col.name || this.col.title || this.col.label}</div>
    }
    render() {
        let className = this.col == this.owner.sortby ? this.owner.sortdir : ''
        return <td className={`${this.className} ${className}`} data-index={this.index}><div className={`${this.cmpClassName}-wrapper`} data-index={this.index}>
            {this.renderCell()}
        </div></td>
    }
}
