import React from 'react'
import {FlexCmp, Cmp} from 'ezy/common'
import {Checkbox} from './Checkbox'
import {Space} from './Space'
import {Select} from './Select'

export class Table extends FlexCmp {
    static autoProps() {return super.autoProps().concat([
        {section: 'cmp', name: 'showControl', title: 'Show Control', type: 'SelectField', value: true, required: false, desc: null, options: [true, false]},
        {section: 'cmp', name: 'controlPos', title: 'Control Position', type: 'SelectField', value: 'top', required: false, desc: null, options: ['top', 'bottom']},
        {section: 'cmp', name: 'showPageSize', title: 'Show Page Size', type: 'SelectField', value: true, required: false, desc: null, options: [true, false]},
        {section: 'cmp', name: 'showPagination', title: 'Show Pagination', type: 'SelectField', value: true, required: false, desc: null, options: [true, false]},
        {section: 'cmp', name: 'showPageInfo', title: 'Show Page Info', type: 'SelectField', value: true, required: false, desc: null, options: [true, false]},
        {section: 'cmp', name: 'showColumnsSetting', title: 'Show Columns Setting', type: 'SelectField', value: true, required: false, desc: null, options: [true, false]},
        {section: 'cmp', name: 'showHeader', title: 'Show Header', type: 'SelectField', value: true, required: false, desc: null, options: [true, false]},
        {section: 'cmp', name: 'showBody', title: 'Show Body', type: 'SelectField', value: true, required: false, desc: null, options: [true, false]},
        {section: 'cmp', name: 'showFooter', title: 'Show Footer', type: 'SelectField', value: true, required: false, desc: null, options: [true, false]},
        {section: 'cmp', name: 'columns', title: 'Columns', type: 'TextField', value: [], required: false, desc: null},
    ])}
    get cmpClassName() {return `ezy-table`}
    get cols(){return [].concat((this.cmpData ? this.cmpData.columns : null) || this.columns).filter(c => c && c.show)}
    get rows() {return [].concat(this.cmpData ? this.cmpData.rows : null).filter(r => r && !r.hidden)}
    get totalPage() {return this.cmpData ? Math.ceil(this.cmpData.total/(this.cmpData.size || this.cmpData.total)) : 0}
    get pageSize() {return this.cmpData ? this.cmpData.size || 20 : 20}
    get page() {return this.cmpData ? this.cmpData.page || 1 : 1}
    get total() {return this.cmpData ? this.cmpData.total || this.cmpData.rows.length : 0}
    get selectAll() {
        return v => {
            this.rows.map(r => r.selected = v)
            this.refresh()
        }
    }
    get children() {
        return [
            this.showControl && this.controlPos == 'top' ? <TableControll owner={this}/> : null,
            this.showHeader ? <TableHeader owner={this}/> : null,
            this.showBody ? <TableBody owner={this}/> : null,
            this.showFooter ? <TableFooter owner={this}/> : null,
            this.showControl && this.controlPos != 'top' ? <TableControll owner={this}/> : null,
        ]
    }
}
export class TableControll extends Cmp {
    get cmpClassName() {return `ezy-table-control`}
    get owner() {return this.props.owner}
    get cols(){return this.owner.cols}
    get rows() {return this.owner.rows}
    renderPageSize() {
        return <div className='ezy-table-page-size'>
            <input type='text' ref={e => this.pageSize = e} step={5} defaultValue={this.owner.pageSize}/> per page
        </div>
    }
    renderPageInfo() {
        return <div className='ezy-table-page-info'>
                Total: <span className='ezy-table-page-info-total'>{this.owner.total}</span>
            </div>
    }
    renderPagination() {
        return <div className='ezy-table-pagination'>
                <i className='material-icons'>first_page</i>
                <i className='material-icons'>chevron_left</i>
                <Select options={Array.from({length: this.owner.totalPage}, (c,i) => i + 1)}
                    value={this.owner.page}
                    searchable={true}/>
                <i className='material-icons'>chevron_right</i>
                <i className='material-icons'>last_page</i>
            </div>
    }
    renderColumnsSetting() {
        return <div className='ezy-table-columns-settings'>
                <i className='material-icons'>settings</i>
            </div>
    }
    get children() {
        return [].concat(
            this.owner.showPageSize ? this.renderPageSize() : <Space/>,
            <Space/>,
            this.owner.showPageInfo ? this.renderPageInfo() : <Space/>,
            <Space/>,
            this.owner.showPagination ? this.renderPagination() : null,
            this.owner.showColumnsSetting ? this.renderColumnsSetting() : null,
        )
    }
}
export class TableHeader extends Cmp {
    get cmpClassName() {return `ezy-table-header`}
    get owner() {return this.props.owner}
    get cols(){return this.owner.cols}
    get rows() {return this.owner.rows}
    get children() {
        return <table><thead><tr>
            {this.cols.map((c,i) => <TableCol key={i} owner={this.owner} col={c} index={i} data-index={i}/>)}
        </tr></thead></table>
    }
}
export class TableCol extends Cmp {
    get cmpClassName() {return `ezy-table-col`}
    get owner() {return this.props.owner}
    get cols(){return this.owner.cols}
    get rows() {return this.owner.rows}
    get col() {return this.props.col}
    get type() {return this.col.type}
    get data() {return this.col.data}
    renderCol() {
        if (this.type == 'checkbox') return <Checkbox onChange={this.owner.selectAll}/>
        else return this.col.name || this.col.title || this.col.label
    }
    render() {
        return <th className={this.className}>{this.renderCol()}</th>
    }
}
export class TableBody extends Cmp {
    get cmpClassName() {return `ezy-table-body`}
    get owner() {return this.props.owner}
    get cols(){return this.owner.cols}
    get rows() {return this.owner.rows}
    get children() {
        return <table><tbody>
            {this.rows.map((r,i) => <TableRow key={i} owner={this.owner} row={r} index={i} data-index={i}/>)}
        </tbody></table>
    }
}
export class TableRow extends Cmp {
    get cmpClassName() {return `ezy-table-row`}
    get owner() {return this.props.owner}
    get cols(){return this.owner.cols}
    get rows() {return this.owner.rows}
    get row() {return this.props.row}
    get index() {return this.props.index}
    render() {
        return <tr className={this.className} data-index={this.index}>
            {this.cols.map((c,i) => <TableCell key={i} owner={this.owner} row={this.row} col={c} index={i} data-index={i}/>)}
        </tr>
    }
}
export class TableCell extends Cmp {
    get cmpClassName() {return `ezy-table-cell`}
    get owner() {return this.props.owner}
    get cols(){return this.owner.cols}
    get rows() {return this.owner.rows}
    get row() {return this.props.row}
    get col() {return this.props.col}
    get type() {return this.col.type}
    get data() {return this.col.data}
    get field() {return this.col.field}
    get selected() {return this.row.selected}
    get onSelect() {
        return v => this.row.selected = v
    }
    renderCell() {
        if (this.type == 'checkbox') return <Checkbox checked={this.selected} onChange={this.onSelect}/>
        else {
            let data = function(f) {return this.row[f]}.bind(this)
            if (this.data) {
                let rs
                eval(`rs = ${this.data}`)
                return rs || null
            }
            else return data(this.field)
        }
    }
    render() {
        return <td className={this.className}>{this.renderCell()}</td>
    }
}
export class TableFooter extends Cmp {
    get cmpClassName() {return `ezy-table-footer`}
    get owner() {return this.props.owner}
    get cols(){return this.owner.cols}
    get rows() {return this.owner.rows}
    get children() {
        return <table><tfoot><tr><td colSpan={this.cols.length}>
            {this.owner.props.footer}
        </td></tr></tfoot></table>
    }
}
