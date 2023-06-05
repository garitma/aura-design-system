import{r as g,a as t,j as f}from"./index-ad667e82.js";import{I as r}from"./input-0045801e.js";import{S as E}from"./select-b738adb7.js";import{B as L}from"./button-3c92f482.js";import{A as I}from"./alert-f78e3c08.js";import{G as x}from"./grid-ffaafa59.js";import{C as F}from"./checkbox-63b2dcd4.js";import"./MenuIcon-d3eda921.js";import"./CloseIcon-e14bf381.js";const A=e=>{const[s,a]=g.useState(e),[o,d]=g.useState(null),[l,m]=g.useState(!1);return{value:s,onChange:N=>{a(N.target.value),!l&&m(!0)},error:o,touch:l,reset:()=>a(e),dialog:d,setTouch:m,setValue:a,helpText:o,isHelping:Boolean(o&&l)}},v=e=>{const s={};for(const a in e)s[a]=A(e[a]);return s},T=(e,s)=>{const[a,o]=g.useState(!1);return g.useEffect(()=>{o(s(e))},[e,s]),a},w=()=>{const[e,s]=g.useState({isLoading:!1,isSubmited:!1,info:{isError:!1,message:null}}),a=n=>s(i=>({...i,isLoading:n})),o=n=>s(i=>({...i,isSubmited:n})),d=n=>s(i=>({...i,info:{...i.info,isError:n}})),l=n=>s(i=>({...i,info:{...i.info,message:n}})),m=()=>{s({isLoading:!1,isSubmited:!1,info:{isError:!1,message:null}})};return{state:e,message:e.info.message,setStatus:s,setMessage:l,setIsLoading:a,setSubmited:o,setIsError:d,resetStatus:m}},y=e=>Object.values(e).some(s=>s===!1),z=()=>{const e=v({firstName:"",lastName:"",email:"",options:"",accept:!1}),{firstName:s,lastName:a,email:o,options:d,accept:l}=e;return t("div",{children:f("form",{children:[t(r,{placeholder:"Name",...s}),t(r,{placeholder:"Last name",...a}),t(r,{placeholder:"Email",...o}),f(E,{...d,children:[t("option",{children:"Foo"}),t("option",{children:"Foo2"})]}),t(F,{label:"Accept terms and conditions.",...l})]})})},B=()=>{const e=v({firstName:"",lastName:"",email:""}),{firstName:s,lastName:a,email:o}=e;return t("div",{children:t("form",{children:f(x,{col:"two",children:[t(r,{placeholder:"Name",...s}),t(r,{placeholder:"Last name",...a}),t(r,{placeholder:"Email",...o,classNameContainer:"span-2"})]})})})},G=()=>{const e=w(),s=v({firstName:"",lastName:"",email:""}),{firstName:a,lastName:o,email:d}=s,l=async n=>{n.preventDefault(),e.resetStatus(),e.setIsLoading(!0);const b=await new Promise((N,u)=>{setTimeout(()=>{const p=Math.random()<.5;N({ok:p})},600)});m(b)},m=n=>{if(e.setIsLoading(!1),e.setSubmited(!0),!n.ok){e.setIsError(!0),e.setMessage("An unexpected error has occurred.");return}e.setMessage("Everything has gone well.")};return f("div",{children:[f("form",{onSubmit:l,children:[t(r,{placeholder:"Name",...a}),t(r,{placeholder:"Last name",...o}),t(r,{placeholder:"Email",...d}),t("div",{className:"inputer",children:t(L,{label:"Submit",isLoadingText:"Loading...",isLoading:e.state.isLoading})})]}),t(I,{state:e.state,isPushTop:!0})]})},Z=()=>{const e=w(),s=v({firstName:"",lastName:"",email:"",options:""}),{firstName:a,lastName:o,email:d,options:l}=s,m=/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,i=T(s,({firstName:u,lastName:p,email:h,options:S})=>{let c={};return u.value?(c.firstName=!0,u.dialog(null)):(u.dialog("Name is required."),c.firstName=!1),p.value?(c.lastName=!0,p.dialog(null)):(p.dialog("Name is required."),c.lastName=!1),S.value?(c.options=!0,S.dialog(null)):(S.dialog("Options is required."),c.options=!1),h.value?m.test(h.value)?(c.email=!0,h.dialog(null)):(h.dialog("Email is not valid."),c.email=!1):(h.dialog("Email is required."),c.email=!1),!y(c)}),b=async u=>{u.preventDefault(),e.resetStatus(),e.setIsLoading(!0);const h=await new Promise((S,c)=>{setTimeout(()=>{const k=Math.random()<.5;S({ok:k})},600)});N(h)},N=u=>{if(e.setIsLoading(!1),e.setSubmited(!0),!u.ok){e.setIsError(!0),e.setMessage("An unexpected error has occurred.");return}e.setMessage("Everything has gone well.")};return f("div",{children:[f("form",{onSubmit:b,children:[t(r,{placeholder:"Name",...a}),t(r,{placeholder:"Last name",...o}),t(r,{placeholder:"Email",...d}),f(E,{placeholder:"Select an option",...l,children:[t("option",{children:"Foo"}),t("option",{children:"Foo2"})]}),t("div",{className:"inputer",children:t(L,{label:"Submit",isLoadingText:"Loading...",isLoading:e.state.isLoading,isDisabled:!i})})]}),t(I,{state:e.state,isPushTop:!0})]})};typeof window<"u"&&window.document&&window.document.createElement&&document.documentElement.setAttribute("data-storyloaded","");export{B as WithGrid,z as WithHook,G as WithStatus,Z as WithValidator};