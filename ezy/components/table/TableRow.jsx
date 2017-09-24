import React from 'react'
import {Cmp} from 'ezy/common'
import {TableCell} from './TableCell'

export class TableRow extends Cmp {
    get cmpClassName() {return `ezy-table-row`}
    get owner() {return this.props.owner}
    get cols(){return this.owner.cols}
    get rows() {return this.owner.rows}
    get row() {return this.props.row}
    get index() {return this.props.index}
    render() {
        return <tr className={this.className} data-index={this.index}>
            {this.cols.map((c,i) => <TableCell key={i} owner={this.owner} row={this.row} col={c} index={this.index}/>)}
        </tr>
    }
}
