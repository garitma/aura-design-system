import React from "react"

import Grid from "../packages/layout/grid"
import SpriteProvider from "../packages/provider/spriteProvider"

export default {
  title: "Layout/Grid",
}

export const Default = () => (
  <div className="aureole">
    <div className="pad blue" />
    <div className="pad blue" />
    <div className="pad blue" />
  </div>
)

export const withTwoColumns = () => (
  <div className="aureole two">
    <div className="pad blue" />
    <div className="pad blue" />
  </div>
)

export const withFourdColumns = () => (
  <div className="aureole fourd">
    <div className="pad blue" />
    <div className="pad blue" />
    <div className="pad blue" />
    <div className="pad blue" />
  </div>
)

export const withTwoColumnsFixed = () => (
  <div className="aureole two fixed">
    <div className="pad blue" />
    <div className="pad blue" />
  </div>
)

export const withBlog = () => (
  <div className="aureole blog">
    <div className="pad blue" />
    <div className="pad blue" />
  </div>
)

export const withDocs = () => (
  <div className="aureole docs">
    <div className="pad blue" />
    <div className="pad blue" />
  </div>
)
