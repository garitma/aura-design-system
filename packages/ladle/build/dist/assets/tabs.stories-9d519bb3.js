import{r as u,j as c,a as e}from"./index-c7c1c8b6.js";import{B as v}from"./button-9fe5bae3.js";const N=({children:a,data:l,className:n,classNameWrapper:o,classNameNav:i,classNameContainer:d})=>{const[s,r]=u.useState(0),m=Array.isArray(a)?a:[a];return c("div",{className:o,children:[e("nav",{className:i,children:e("ul",{className:[n,"nav-list","start"].join(" ").trim(),children:l.map((h,t)=>e("li",{children:e(v,{mode:"link",className:t===s?"active":"",onClick:()=>r(t),...h})},t))})}),e("div",{className:d,children:m[s]})]})},p=()=>c(N,{data:[{label:"One"},{label:"Two"},{label:"Three"}],children:[e("div",{className:"mod-detail one",children:"One"}),e("div",{className:"mod-detail two",children:"Two"}),e("div",{className:"mod-detail three",children:"Three"})]});typeof window<"u"&&window.document&&window.document.createElement&&document.documentElement.setAttribute("data-storyloaded","");export{p as Basic};
