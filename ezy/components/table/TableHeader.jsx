import React from 'react'
import {FlexCmp, Cmp} from 'ezy/common'
import {TableHeaderCell} from './TableHeaderCell'

export class TableHeader extends Cmp {
    get cmpClassName() {return this.owner.headerClassName}
    get owner() {return this.props.owner}
    get cols() {return this.owner.cols}
    get rows() {return this.owner.rows}
    get children() {
        return <table ref={e => this.table = e}><thead><tr>
            {this.cols.map((c,i) => <TableHeaderCell key={i} owner={this.owner} col={c} index={i}/>)}
        </tr></thead></table>
    }
}
