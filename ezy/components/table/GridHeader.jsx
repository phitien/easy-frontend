import React from 'react'
import {Search} from '../input'
import {TableHeader} from './TableHeader'

export class GridHeader extends TableHeader {
    get children() {
        return this.renderFilters()
    }
    renderFilters() {
        this.filters = []
        return this.owner.hasFilters ? <div className={`${this.owner.cmpClassName}-filters`}>
            {this.actualCols.filter(c => c.localfilter || c.serverfilter).map((c,i) => <Search
                key={i}
                icon='search'
                forceOpen={true}
                highlight={true}
                onChange={e => this.owner.localfilter()}
                onEnter={e => c.serverfilter ? this.owner.severfilter() : false}
                placeholder={c.title}
                ref={e => {
                    let o = this.filters.find(o => o.c == c)
                    if (!o) return this.filters.push({c, e})
                    else return o.e = e
                }}
            />)}
        </div> : null
    }
}
