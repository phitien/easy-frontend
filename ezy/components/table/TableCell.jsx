import React from 'react'
import {Cmp} from 'ezy/components/cmp'
import {Checkbox, Button} from '../input'
import {Img} from '../html'

export class TableCell extends Cmp {
    get cmpClassName() {return this.owner.cellClassName}
    get owner() {return this.props.owner}
    get cols() {return this.owner.cols}
    get actualCols() {return this.owner.actualCols}
    get rows() {return this.owner.rows}
    get row() {return this.props.row}
    get col() {return this.props.col}
    get index() {return this.props.index}
    get type() {return this.col.type}
    get data() {return this.col.data}
    get field() {return this.col.field}
    get selected() {return this.row.selected}
    renderCell() {
        if (this.type == 'checkbox') return <Checkbox checked={this.selected} data-index={this.index}/>
        else if (this.type == 'group') return null
        else if (this.type == 'action') return <Button icon={this.col.action} data-index={this.index}/>
        else if (this.type == 'image') return <Img
            src={this.owner.celldata(this.row, this.col, 'url')}
            alt={this.owner.celldata(this.row, this.col)}
            style={this.col.style || {height: '100%'}}
            />
        else return this.owner.celldata(this.row, this.col)
    }
    render() {
        return <td className={this.className} data-index={this.index}>
            <div className={`${this.cmpClassName}-wrapper`} data-index={this.index}>
                {this.renderCell()}
            </div>
        </td>
    }
}
