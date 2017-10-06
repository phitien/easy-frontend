import React from 'react'
import {Cmp} from 'ezy/common'
import {TableRow} from './TableRow'

export class TableBody extends Cmp {
    get cmpClassName() {return this.owner.bodyClassName}
    get owner() {return this.props.owner}
    get cols() {return this.owner.cols}
    get rows() {return this.owner.rows}
    get children() {
        return <table ref={e => this.table = e}><tbody>
            {this.rows.map((r,i) => <TableRow key={i} owner={this.owner} row={r} index={i} data-index={i}/>)}
        </tbody></table>
    }
}
