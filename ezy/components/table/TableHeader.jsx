import React from 'react'
import {FlexCmp, Cmp} from 'ezy/common'
import {TableHeaderCell} from './TableHeaderCell'

export class TableHeader extends Cmp {
    get cmpClassName() {return this.owner.headerClassName}
    get owner() {return this.props.owner}
    get cols() {return this.owner.cols}
    get actualCols() {return this.owner.actualCols}
    get rows() {return this.owner.rows}
    get children() {
        return <table ref={e => this.table = e}><thead>
            {this.utils.array(this.renderGroups(), this.renderColumns())}
        </thead></table>
    }
    renderGroups() {
        return this.owner.hasGroup ? <tr key={0} className='header-group'>
            {this.cols.map((c,i) =>
            <TableHeaderCell key={i} owner={this.owner} col={c} index={i} colSpan={c.type != 'group' && 1 || c.children.length}>
                {c.type == 'group' && c.title || ''}
            </TableHeaderCell>)}
        </tr> : null
    }
    renderColumns() {
        return <tr key={1}>
            {this.actualCols.map((c,i) => <TableHeaderCell className={c.type || ''} key={i} owner={this.owner} col={c} index={i}/>)}
        </tr>
    }
}
