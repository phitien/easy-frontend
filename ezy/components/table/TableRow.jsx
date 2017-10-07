import React from 'react'
import {Cmp} from 'ezy/components/cmp'
import {TableCell} from './TableCell'

export class TableRow extends Cmp {
    get cmpClassName() {return this.owner.rowClassName}
    get owner() {return this.props.owner}
    get cols() {return this.owner.cols}
    get actualCols() {return this.owner.actualCols}
    get rows() {return this.owner.rows}
    get row() {return this.props.row}
    get index() {return this.props.index}
    render() {
        return <tr className={`${this.className} ${this.row.selected ? 'selected' : ''}`} data-index={this.index} onClick={e => this.owner.onRowClick(e, this.row)}>
            {this.actualCols.map((c,i) => <TableCell className={c.type || ''} key={i} owner={this.owner} row={this.row} col={c} index={this.index}/>)}
        </tr>
    }
}
