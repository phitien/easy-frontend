import React from 'react'
import {Link} from 'react-router'
import {Cmp} from 'ezy/common'

export class Menu extends Cmp {
    get level() {return this.props.level || 0}
    get cmpDefaultData() {return []}
    get children() {
        return this.renderMenu(this.cmpData, this.className, this.props.subMenuClassName)
    }
    get getNodeClassName() {
        return n => `${location.pathname == n.url ? 'active' : ''} level${this.level} ${this.hasChildren(n) ? 'has-children' : ''}`
    }
    get hasChildren() {
        return n => n.children && n.children.length > 0
    }
    renderMenu(items, className, subMenuClassName) {
        if (!Array.isArray(items) || items.length == 0) return null
        return
        <ul className={className}>{items.map((item, i) => {
            return item.html ?
            <li key={i} className={this.getNodeClassName(item)}>{item.html}</li> :
            <li key={i} className={this.getNodeClassName(item)}>
                <Link href={item.url || '#'} onClick={item.onClick || (e => this.utils.history.push(item.url || '#'))}>
                    {item.title}
                </Link>
                {!item.description ? null :
                <div className='description'>{item.description}</div>}
                <Menu cmpData={item.children}
                    level={this.level + 1}
                    className={subMenuClassName}
                    subMenuClassName={subMenuClassName}/>
            </li>
            })}
        </ul>
    }
}
