import React from 'react'
import {TableBody} from './TableBody'
import {TableRow} from './TableRow'

export class GridCard extends TableRow {
    get renderCard() {return this.owner.renderCard}
    render() {
        return <div className={`${this.className} ${this.row.selected ? 'selected' : ''}`} data-index={this.index} onClick={e => this.owner.onRowClick(e, this.row)}>
            <div className={`${this.cmpClassName}-wrapper`} dangerouslySetInnerHTML={{__html: this.renderCard(this.row)}}/>
        </div>
    }
}

export class GridBody extends TableBody {
    get children() {
        return this.rows.map((r,i) => <GridCard key={i} owner={this.owner} row={r} index={i} data-index={i}/>)
    }
}
