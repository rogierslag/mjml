import { MJMLElement, helpers } from 'mjml-core'
import React, { Component } from 'react'

const tagName = 'mj-button'
const parentTag = ['mj-column', 'mj-hero-content']
const endingTag = true
const defaultMJMLDefinition = {
  content: '',
  attributes: {
    "background-color": "#414141",
    "border": "none",
    "border-bottom": null,
    "border-left": null,
    "border-radius": "3px",
    "border-right": null,
    "border-top": null,
    "container-background-color": null,
    "font-style": null,
    "font-size": "13px",
    "font-weight": "normal",
    "font-family": "Ubuntu, Helvetica, Arial, sans-serif",
    "color": "#ffffff",
    "text-decoration": "none",
    "text-transform": "none",
    "align": "center",
    "vertical-align": "middle",
    "href": null,
    "inner-padding": "10px 25px",
    'padding': '10px 25px',
    "padding-top": null,
    "padding-bottom": null,
    "padding-left": null,
    "padding-right": null,
    "width": null,
    "height": null
  }
}
const baseStyles = {
  table: {
    borderCollapse: 'separate'
  },
  a: {
    textDecoration: 'none',
    lineHeight: '100%'
  }
}
const heightFromBorder = (borderDef) => {
  // So we can handle `1px black solid` and `solid 2px black`
  return borderDef.split(' ')
    .filter(e => e !== '')
    .filter(e => e.endsWith('px'))
    .map(parseInt)
    .reduce((e, val) => e + val, 0)
}

@MJMLElement
class Button extends Component {

  styles = this.getStyles()

  getStyles () {
    const { mjAttribute, defaultUnit } = this.props

    return helpers.merge({}, baseStyles, {
      table: {
        width: defaultUnit(mjAttribute('width'), "px")
      },
      td: {
        // padding: defaultUnit(mjAttribute('padding'), "px"),
        borderRadius: defaultUnit(mjAttribute('border-radius'), "px"),
        width: defaultUnit(mjAttribute('width'), "px"),
        cursor: 'pointer'
      },
      a: {
        color: mjAttribute('color'),
        display: 'block',
        backgroundColor: this.bgColor(),
        border: this.border('border'),
        borderBottom: this.border('border-bottom'),
        borderLeft: this.border('border-left'),
        borderRight: this.border('border-right'),
        borderTop: this.border('border-top'),
        borderRadius: defaultUnit(mjAttribute('border-radius'), "px"),
        height: this.height(),
        fontFamily: mjAttribute('font-family'),
        fontSize: defaultUnit(mjAttribute('font-size'), "px"),
        fontStyle: mjAttribute('font-style'),
        fontWeight: mjAttribute('font-weight'),
        padding: defaultUnit(mjAttribute('inner-padding'), "px"),
        textDecoration: mjAttribute('text-decoration'),
        textTransform: mjAttribute('text-transform'),
        verticalAlign: mjAttribute('vertical-align'),
        margin: '0px'
      }
    })
  }

  border (type) {
    const { mjAttribute } = this.props
    return mjAttribute(type) === "none" ? `solid 1px ${this.bgColor()}` : mjAttribute(type)
  }

  bgColor () {
    const { mjAttribute } = this.props

    return mjAttribute('background-color') === "none" ? "" : mjAttribute('background-color')
  }

  height () {
    const { mjAttribute } = this.props

    const intendedHeight = mjAttribute('height')
    const verticalPaddings = parseInt(mjAttribute('inner-padding')) * 2 // top and bottom

    const topBorderToUse = mjAttribute('border-top') !== "none" ? 'border-top' : 'border'
    const topBorder = this.border(topBorderToUse) ? heightFromBorder(this.border(topBorderToUse)) : heightFromBorder(this.border('border'))
    const bottomBorderToUse = mjAttribute('border-bottom') !== "none" ? 'border-bottom' : 'border'
    const bottomBorder = this.border(bottomBorderToUse) ? heightFromBorder(this.border(bottomBorderToUse)) : heightFromBorder(this.border('border'))

    return intendedHeight - verticalPaddings - topBorder - bottomBorder
  }

  renderButton () {
    const { mjContent, mjAttribute } = this.props

    if (mjAttribute('href')) {
      return (
        <a
          dangerouslySetInnerHTML={{ __html: mjContent() }}
          href={mjAttribute('href')}
          style={this.styles.a}
          target="_blank" />
      )
    }

    return (
      <p
        dangerouslySetInnerHTML={{ __html: mjContent() }}
        style={this.styles.a} />
    )
  }

  render () {
    const { mjAttribute } = this.props

    return (
      <table
        role="presentation"
        cellPadding="0"
        cellSpacing="0"
        data-legacy-align={mjAttribute('align')}
        data-legacy-border="0"
        style={this.styles.table}>
        <tbody>
          <tr>
            <td>
              <table border="0" cellSpacing="0" cellPadding="0">
                <tbody>
                  <tr>
                    <td
                      data-legacy-align="center"
                      data-legacy-bgcolor={this.bgColor()}
                      data-legacy-valign={mjAttribute('vertical-align')}
                      style={this.styles.td}>
                      {this.renderButton()}
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    )
  }

}

Button.tagName = tagName
Button.parentTag = parentTag
Button.endingTag = endingTag
Button.defaultMJMLDefinition = defaultMJMLDefinition
Button.baseStyles = baseStyles

export default Button
