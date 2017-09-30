import React from 'react'
import {Cmp} from 'ezy/common'

export class TableFooter extends Cmp {
    get cmpClassName() {return `ezy-table-footer`}
    get owner() {return this.props.owner}
    get cols() {return this.owner.cols}
    get rows() {return this.owner.rows}
    get children() {
        return <table><tfoot><tr><td colSpan={this.cols.length}>
            {this.owner.props.footer}
        </td></tr></tfoot></table>
    }
}
