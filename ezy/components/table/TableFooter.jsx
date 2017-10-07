import React from 'react'
import {Cmp} from 'ezy/components/cmp'

export class TableFooter extends Cmp {
    get cmpClassName() {return this.owner.footerClassName}
    get owner() {return this.props.owner}
    get cols() {return this.owner.cols}
    get actualCols() {return this.owner.actualCols}
    get rows() {return this.owner.rows}
    get children() {
        return <table ref={e => this.table = e}><tfoot><tr>
            <td colSpan={this.actualCols.length}>
                {this.owner.props.footer}
            </td>
        </tr></tfoot></table>
    }
}
