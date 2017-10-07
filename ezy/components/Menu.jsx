import React from 'react'
import {Link} from 'react-router-dom'
import {Cmp} from 'ezy/components/cmp'

export class Menu extends Cmp {
    get cmpClassName() {return ``}
    get level() {return this.props.level || 0}
    get getNodeClassName() {
        return n => {
            let url = `${this.root}${(n.url || '').replace(/^\//g, '')}`.replace(/\/$/g, '')
            return `${location.pathname == url ? 'active' : ''} level${this.level} ${this.hasChildren(n) ? 'has-children' : ''}`
        }
    }
    get hasChildren() {
        return n => n.children && n.children.length
    }
    get root() {return `${this.props.root || ''}/`}
    renderMenu(items, className) {
        items = [].concat(items).filter(item => item)
        if (!items.length) return null
        return <ul className={this.className}>{items.map((item, i) => {
            let url = `${this.root}${(item.url || '#').replace(/^\//g, '')}`.replace(/\/$/g, '')
            return item.html ?
            <li key={i} className={this.getNodeClassName(item)}>{item.html}</li> :
            <li key={i} className={this.getNodeClassName(item)}>
                <Link to={url} onClick={item.onClick || (e => this.utils.history.push(url))}>
                    {item.title}
                </Link>
                {!item.description ? null :
                <div className='description'>{item.description}</div>}
                <Menu cmpData={item.children}
                    level={this.level + 1}/>
            </li>
            })}
        </ul>
    }
    render() {
        return this.renderMenu(this.cmpData, this.className)
    }
}
