import React from 'react'
import {Cmp} from 'ezy/components/cmp'
import {TableHeaderCell} from './TableHeaderCell'
import {Search} from '../input'

export class TableHeader extends Cmp {
    get cmpClassName() {return this.owner.headerClassName}
    get owner() {return this.props.owner}
    get cols() {return this.owner.cols}
    get actualCols() {return this.owner.actualCols}
    get rows() {return this.owner.rows}
    get output() {
        return this.filters && this.filters.filter(o => o.e.output) || []
    }
    get children() {
        return <table ref={e => this.table = e}><thead>
            {this.utils.array(
                this.renderGroups(),
                this.renderColumns(),
                this.renderFilters()
            )}
        </thead></table>
    }
    get onSort() {
        return (e) => {
            let index = e.target.getAttribute('data-index')
            let col = this.actualCols[index]
            this.owner.sortby = col
            this.owner.sortdir = !this.owner.sortdir ? 'asc' : this.owner.sortdir == 'asc' ? 'desc' : ''
            if (col.localsort) this.owner.localsort()
            else if (col.serversort) this.owner.serversort()
        }
    }
    renderGroups() {
        return this.owner.hasGroup ? <tr key={0} className={`${this.owner.rowClassName} header-group`}>
            {this.cols.map((c,i) =>
            <td key={i} colSpan={c.type != 'group' && 1 || c.children.length}>
                {c.type == 'group' && c.title || ''}
            </td>)}
        </tr> : null
    }
    renderColumns() {
        return <tr key={1} className='actual-cols'>
            {this.actualCols.map((c,i) => <TableHeaderCell
                onClick={this.onSort}
                className={c.type || ''} key={i} owner={this.owner} col={c} index={i}/>)}
        </tr>
    }
    renderFilters() {
        this.filters = []
        return this.owner.hasFilters ? <tr key={2} className={`${this.owner.rowClassName} filters`}>
            {this.actualCols.map((c,i) => <td key={i}><div>
                {c.localfilter || c.serverfilter ? <Search
                    icon='search'
                    forceOpen={true}
                    highlight={true}
                    onChange={e => this.owner.localfilter()}
                    onEnter={e => c.serverfilter ? this.owner.severfilter() : false}
                    ref={e => {
                        let o = this.filters.find(o => o.c == c)
                        if (!o) return this.filters.push({c, e})
                        else return o.e = e
                    }}
                    /> : null}
            </div></td>)}
        </tr> : null
    }
}
