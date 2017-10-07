import React from 'react'
import {TableBody} from './TableBody'
import {TableRow} from './TableRow'
import {Button} from '../input'

export class GridCard extends TableRow {
    get renderCard() {return this.owner.renderCard}
    render() {
        return <div className={`${this.className} ${this.row.selected ? 'selected' : ''}`} data-index={this.index} onClick={e => this.owner.onRowClick(e, this.row)}>
            <div className={`${this.cmpClassName}-wrapper`} dangerouslySetInnerHTML={{__html: this.renderCard(this.row)}}/>
            <div className={`${this.cmpClassName}-actions`}>
                {this.actualCols.filter(c => c.type == 'action').map((c,i) =>
                <Button key={i} icon={c.action} onClick={e => this.owner.onCellClick(e, this.row, c)}/>)}
            </div>
        </div>
    }
}

export class GridBody extends TableBody {
    get children() {
        return this.rows.map((r,i) => <GridCard key={i} owner={this.owner} row={r} index={i} data-index={i}/>)
    }
}
