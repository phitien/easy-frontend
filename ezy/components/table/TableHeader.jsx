import React from 'react'
import {FlexCmp, Cmp} from 'ezy/common'
import {TableHeaderCell} from './TableHeaderCell'

export class TableHeader extends Cmp {
    get cmpClassName() {return `ezy-table-header`}
    get owner() {return this.props.owner}
    get cols() {return this.owner.cols}
    get rows() {return this.owner.rows}
    get children() {
        return <table><thead><tr>
            {this.cols.map((c,i) => <TableHeaderCell key={i} owner={this.owner} col={c} index={i}/>)}
        </tr></thead></table>
    }
}
