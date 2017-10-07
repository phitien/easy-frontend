import React from 'react'
import {Cmp} from 'ezy/common'
import {Checkbox} from '../input'

export class TableHeaderCell extends Cmp {
    get cmpClassName() {return this.owner.cellClassName}
    get owner() {return this.props.owner}
    get cols() {return this.owner.cols}
    get actualCols() {return this.owner.actualCols}
    get rows() {return this.owner.rows}
    get col() {return this.props.col}
    get index() {return this.props.index}
    get subindex() {return this.props.subindex}
    get type() {return this.col.type}
    get data() {return this.col.data}
    get checked() {
        return this.rows.find(r => !r.selected) ? false : true
    }
    renderCell() {
        if (this.props.colSpan) return null
        if (this.type == 'checkbox') return <Checkbox checked={this.checked} onChange={this.owner.selectAll}
            data-index={this.index} data-subindex={this.subindex}/>
        else if (this.type == 'group') return null
        else if (this.type == 'action') return null
        else return <div className={`${this.cmpClassName}-name`} data-index={this.index} data-subindex={this.subindex}>
            {this.col.name || this.col.title || this.col.label}
        </div>
    }
    render() {
        let className = [
            this.className,
            this.col == this.owner.sortby ? this.owner.sortdir : '',
            this.col.localsort && 'localsort' || '',
            this.col.serversort && 'serversort' || '',
            this.col.localfilter && 'localfilter' || '',
            this.col.serverfilter && 'serverfilter' || '',
        ].filter(c => c).join(' ')
        return <td className={className} colSpan={this.props.colSpan || 1} data-index={this.index} data-subindex={this.subindex}>
            <div className={`${this.cmpClassName}-wrapper`} data-index={this.index} data-subindex={this.subindex}
                 onClick={e => this.props.onClick(e)}>
                {this.children || this.renderCell()}
            </div>
        </td>
    }
}
