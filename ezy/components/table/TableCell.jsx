import React from 'react'
import {Cmp} from 'ezy/common'
import {Checkbox} from '../input'

export class TableCell extends Cmp {
    get cmpClassName() {return `ezy-table-cell`}
    get owner() {return this.props.owner}
    get cols() {return this.owner.cols}
    get rows() {return this.owner.rows}
    get row() {return this.props.row}
    get col() {return this.props.col}
    get index() {return this.props.index}
    get type() {return this.col.type}
    get data() {return this.col.data}
    get field() {return this.col.field}
    get selected() {return this.row.selected}
    set selected(v) {
        this.owner.onRowSelected(this.row, v)
    }
    renderCell() {
        if (this.type == 'checkbox') return <Checkbox checked={this.selected} onChange={v => this.selected = v} data-index={this.index}/>
        else return this.owner.celldata(this.row, this.col)
    }
    render() {
        return <td className={this.className} data-index={this.index}><div className={`${this.cmpClassName}-wrapper`} data-index={this.index}>
            {this.renderCell()}
        </div></td>
    }
}
