import{j as e,r as C}from"./index-C35-ezKL.js";import{B as n}from"./button-CYh1CGT3.js";import{G as N}from"./grid-CYBj8plT.js";import{c as b}from"./react-icons.esm-D_ZbEdxz.js";const v=({isVisible:o,onClose:s,firstButton:a,secondButton:t,title:l,description:i,children:c,classNameDialog:d,classNameOverley:m,classNameMod:u,classNameModDetail:h})=>{const r=a&&t,j=[d,"hold","top","left","b0","right","bottom","p0","z10"],x=[m,"overley","black","disabled"],p=[u,"valign","smash","mod"],f=[h,"mod-detail"];return e.jsxs(e.Fragment,{children:[o&&e.jsx("div",{className:x.join(" ").trim(),"data-aria-hidden":"true","aria-hidden":"true"}),e.jsx("dialog",{className:j.join(" ").trim(),open:o,children:e.jsx("div",{className:p.join(" ").trim(),children:e.jsxs("div",{className:"anchor",children:[e.jsx(n,{className:"pin right top",mode:"link",onClick:s,children:e.jsx(b,{})}),e.jsxs("div",{className:f.join(" ").trim(),children:[l&&e.jsx("h2",{className:"h6 mb13",children:l}),i&&e.jsx("p",{children:i}),c,e.jsx("hr",{className:"upan-pad"}),e.jsxs(N,{col:r?"two":"one",children:[a&&e.jsx(n,{mode:r?"pill":"fill",...a}),t&&e.jsx(n,{...t})]})]})]})})})]})},D=()=>{const[o,s]=C.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(n,{onClick:()=>s(!0),label:"Delete Account"}),e.jsx(v,{isVisible:o,title:"Are you absolutely sure?",firstButton:{label:"Cancel",onClick:()=>s(!1)},secondButton:{label:"Yes, delete account",onClick:()=>s(!1)},onClose:()=>s(!1),children:"This action cannot be undone. This will permanently delete your account and remove your data from our servers."})]})};typeof window<"u"&&window.document&&window.document.createElement&&document.documentElement.setAttribute("data-storyloaded","");export{D as DefaultConfig};
