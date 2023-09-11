import{r as d,_ as L,e as c,j as U,a as N}from"./index-c7c1c8b6.js";import{$ as $t,a as Ce,b as ae,c as re,d as Oe,e as wt,f as yt,g as Et,h as xt,i as Dt,j as Rt,k as At,l as Ct,m as we}from"./index-878efdee.js";import{B as Ot}from"./button-9fe5bae3.js";import{S as Pt}from"./section-2783ac98.js";const Ue="Dialog",[qe,zn]=$t(Ue),[Tt,j]=qe(Ue),St=e=>{const{__scopeDialog:n,children:t,open:a,defaultOpen:o,onOpenChange:r,modal:i=!0}=e,l=d.useRef(null),s=d.useRef(null),[h=!1,p]=Ct({prop:a,defaultProp:o,onChange:r});return d.createElement(Tt,{scope:n,triggerRef:l,contentRef:s,contentId:we(),titleId:we(),descriptionId:we(),open:h,onOpenChange:p,onOpenToggle:d.useCallback(()=>p(u=>!u),[p]),modal:i},t)},Nt="DialogTrigger",Mt=d.forwardRef((e,n)=>{const{__scopeDialog:t,...a}=e,o=j(Nt,t),r=Ce(n,o.triggerRef);return d.createElement(ae.button,L({type:"button","aria-haspopup":"dialog","aria-expanded":o.open,"aria-controls":o.contentId,"data-state":Pe(o.open)},a,{ref:r,onClick:re(e.onClick,o.onOpenToggle)}))}),We="DialogPortal",[kt,Ve]=qe(We,{forceMount:void 0}),_t=e=>{const{__scopeDialog:n,forceMount:t,children:a,container:o}=e,r=j(We,n);return d.createElement(kt,{scope:n,forceMount:t},d.Children.map(a,i=>d.createElement(Oe,{present:t||r.open},d.createElement(wt,{asChild:!0,container:o},i))))},De="DialogOverlay",It=d.forwardRef((e,n)=>{const t=Ve(De,e.__scopeDialog),{forceMount:a=t.forceMount,...o}=e,r=j(De,e.__scopeDialog);return r.modal?d.createElement(Oe,{present:a||r.open},d.createElement(Ft,L({},o,{ref:n}))):null}),Ft=d.forwardRef((e,n)=>{const{__scopeDialog:t,...a}=e,o=j(De,t);return d.createElement(yt,{as:Et,allowPinchZoom:!0,shards:[o.contentRef]},d.createElement(ae.div,L({"data-state":Pe(o.open)},a,{ref:n,style:{pointerEvents:"auto",...a.style}})))}),oe="DialogContent",Lt=d.forwardRef((e,n)=>{const t=Ve(oe,e.__scopeDialog),{forceMount:a=t.forceMount,...o}=e,r=j(oe,e.__scopeDialog);return d.createElement(Oe,{present:a||r.open},r.modal?d.createElement(jt,L({},o,{ref:n})):d.createElement(Bt,L({},o,{ref:n})))}),jt=d.forwardRef((e,n)=>{const t=j(oe,e.__scopeDialog),a=d.useRef(null),o=Ce(n,t.contentRef,a);return d.useEffect(()=>{const r=a.current;if(r)return xt(r)},[]),d.createElement(Ye,L({},e,{ref:o,trapFocus:t.open,disableOutsidePointerEvents:!0,onCloseAutoFocus:re(e.onCloseAutoFocus,r=>{var i;r.preventDefault(),(i=t.triggerRef.current)===null||i===void 0||i.focus()}),onPointerDownOutside:re(e.onPointerDownOutside,r=>{const i=r.detail.originalEvent,l=i.button===0&&i.ctrlKey===!0;(i.button===2||l)&&r.preventDefault()}),onFocusOutside:re(e.onFocusOutside,r=>r.preventDefault())}))}),Bt=d.forwardRef((e,n)=>{const t=j(oe,e.__scopeDialog),a=d.useRef(!1),o=d.useRef(!1);return d.createElement(Ye,L({},e,{ref:n,trapFocus:!1,disableOutsidePointerEvents:!1,onCloseAutoFocus:r=>{var i;if((i=e.onCloseAutoFocus)===null||i===void 0||i.call(e,r),!r.defaultPrevented){var l;a.current||(l=t.triggerRef.current)===null||l===void 0||l.focus(),r.preventDefault()}a.current=!1,o.current=!1},onInteractOutside:r=>{var i,l;(i=e.onInteractOutside)===null||i===void 0||i.call(e,r),r.defaultPrevented||(a.current=!0,r.detail.originalEvent.type==="pointerdown"&&(o.current=!0));const s=r.target;((l=t.triggerRef.current)===null||l===void 0?void 0:l.contains(s))&&r.preventDefault(),r.detail.originalEvent.type==="focusin"&&o.current&&r.preventDefault()}}))}),Ye=d.forwardRef((e,n)=>{const{__scopeDialog:t,trapFocus:a,onOpenAutoFocus:o,onCloseAutoFocus:r,...i}=e,l=j(oe,t),s=d.useRef(null),h=Ce(n,s);return Dt(),d.createElement(d.Fragment,null,d.createElement(Rt,{asChild:!0,loop:!0,trapped:a,onMountAutoFocus:o,onUnmountAutoFocus:r},d.createElement(At,L({role:"dialog",id:l.contentId,"aria-describedby":l.descriptionId,"aria-labelledby":l.titleId,"data-state":Pe(l.open)},i,{ref:h,onDismiss:()=>l.onOpenChange(!1)}))),!1)}),zt="DialogTitle",Ht=d.forwardRef((e,n)=>{const{__scopeDialog:t,...a}=e,o=j(zt,t);return d.createElement(ae.h2,L({id:o.titleId},a,{ref:n}))}),Ut="DialogDescription",qt=d.forwardRef((e,n)=>{const{__scopeDialog:t,...a}=e,o=j(Ut,t);return d.createElement(ae.p,L({id:o.descriptionId},a,{ref:n}))}),Wt="DialogClose",Vt=d.forwardRef((e,n)=>{const{__scopeDialog:t,...a}=e,o=j(Wt,t);return d.createElement(ae.button,L({type:"button"},a,{ref:n,onClick:re(e.onClick,()=>o.onOpenChange(!1))}))});function Pe(e){return e?"open":"closed"}const Yt=St,Gt=Mt,Xt=_t,Kt=It,Zt=Lt,Jt=Ht,Qt=qt,en=Vt;function Ge(e){let n=c.useRef(e);return c.useEffect(()=>{n.current=e}),c.useMemo(()=>(...t)=>{var a;return(a=n.current)==null?void 0:a.call(n,...t)},[])}function tn({defaultProp:e,onChange:n}){let t=c.useState(e),[a]=t,o=c.useRef(a),r=Ge(n);return c.useEffect(()=>{o.current!==a&&(r(a),o.current=a)},[a,o,r]),t}function Xe({prop:e,defaultProp:n,onChange:t=()=>{}}){let[a,o]=tn({defaultProp:n,onChange:t}),r=e!==void 0,i=r?e:a,l=Ge(t),s=c.useCallback(h=>{if(r){let p=typeof h=="function"?h(e):h;p!==e&&l(p)}else o(h)},[r,e,o,l]);return[i,s]}var Ke=c.createContext({drawerRef:{current:null},overlayRef:{current:null},scaleBackground:()=>{},onPress:()=>{},onRelease:()=>{},onDrag:()=>{},onNestedDrag:()=>{},onNestedOpenChange:()=>{},onNestedRelease:()=>{},dismissible:!1,isOpen:!1,keyboardIsOpen:{current:!1},experimentalSafariThemeAnimation:!1,snapPointsOffset:null,snapPoints:null,modal:!1,shouldFade:!1,activeSnapPoint:null,setActiveSnapPoint:()=>{},visible:!1,closeDrawer:()=>{},setVisible:()=>{}}),Te=()=>c.useContext(Ke);function nn(e,{insertAt:n}={}){if(!e||typeof document>"u")return;let t=document.head||document.getElementsByTagName("head")[0],a=document.createElement("style");a.type="text/css",n==="top"&&t.firstChild?t.insertBefore(a,t.firstChild):t.appendChild(a),a.styleSheet?a.styleSheet.cssText=e:a.appendChild(document.createTextNode(e))}nn(`[vaul-drawer]{touch-action:none;transform:translate3d(0,100%,0);transition:transform .5s cubic-bezier(.32,.72,0,1)}[vaul-drawer][vaul-drawer-visible=true]{transform:translate3d(0,var(--snap-point-height, 0),0)}[vaul-overlay]{opacity:0;transition:opacity .5s cubic-bezier(.32,.72,0,1)}[vaul-overlay][vaul-drawer-visible=true]{opacity:1}[vaul-drawer]:after{content:"";position:absolute;top:100%;background:inherit;background-color:inherit;left:0;right:0;height:200%}[vaul-overlay][vaul-snap-points=true]:not([vaul-snap-points-overlay="true"]):not([data-state="closed"]){opacity:0}[vaul-overlay][vaul-snap-points-overlay=true]:not([vaul-drawer-visible="false"]){opacity:1}@keyframes fake-animation{}@keyframes show-theme-overlay{0%{background:var(--vaul-overlay-background-start)}to{background:var(--vaul-overlay-background-end)}}@keyframes hide-theme-overlay{0%{background:var(--vaul-overlay-background-end)}to{background:var(--vaul-overlay-background-start)}}@media (hover: hover) and (pointer: fine){[vaul-drawer]{user-select:none}}
`);var rn=typeof window<"u"?d.useLayoutEffect:d.useEffect;function Re(...e){return(...n)=>{for(let t of e)typeof t=="function"&&t(...n)}}function on(){return Ne(/^Mac/)}function an(){return Ne(/^iPhone/)}function ln(){return/^((?!chrome|android).)*safari/i.test(navigator.userAgent)}function cn(){return Ne(/^iPad/)||on()&&navigator.maxTouchPoints>1}function Se(){return an()||cn()}function Ne(e){return typeof window<"u"&&window.navigator!=null?e.test(window.navigator.platform):void 0}var ye=typeof document<"u"&&window.visualViewport;function je(e){let n=window.getComputedStyle(e);return/(auto|scroll)/.test(n.overflow+n.overflowX+n.overflowY)}function Ze(e){for(je(e)&&(e=e.parentElement);e&&!je(e);)e=e.parentElement;return e||document.scrollingElement||document.documentElement}var un=new Set(["checkbox","radio","range","color","file","image","button","submit","reset"]),fe=0,Ee;function sn(e={}){let{isDisabled:n}=e;rn(()=>{if(!n)return fe++,fe===1&&(Se()?Ee=fn():Ee=dn()),()=>{fe--,fe===0&&Ee()}},[n])}function dn(){return Re(ge(document.documentElement,"paddingRight",`${window.innerWidth-document.documentElement.clientWidth}px`),ge(document.documentElement,"overflow","hidden"))}function fn(){let e,n=0,t=u=>{e=Ze(u.target),!(e===document.documentElement&&e===document.body)&&(n=u.changedTouches[0].pageY)},a=u=>{if(!e||e===document.documentElement||e===document.body){u.preventDefault();return}let f=u.changedTouches[0].pageY,C=e.scrollTop,T=e.scrollHeight-e.clientHeight;T!==0&&((C<=0&&f>n||C>=T&&f<n)&&u.preventDefault(),n=f)},o=u=>{let f=u.target;Ae(f)&&f!==document.activeElement&&(u.preventDefault(),f.style.transform="translateY(-2000px)",f.focus(),requestAnimationFrame(()=>{f.style.transform=""}))},r=u=>{let f=u.target;Ae(f)&&(f.style.transform="translateY(-2000px)",requestAnimationFrame(()=>{f.style.transform="",ye&&(ye.height<window.innerHeight?requestAnimationFrame(()=>{Be(f)}):ye.addEventListener("resize",()=>Be(f),{once:!0}))}))},i=()=>{window.scrollTo(0,0)},l=window.pageXOffset,s=window.pageYOffset,h=Re(ge(document.documentElement,"paddingRight",`${window.innerWidth-document.documentElement.clientWidth}px`),ge(document.documentElement,"overflow","hidden"));window.scrollTo(0,0);let p=Re(Q(document,"touchstart",t,{passive:!1,capture:!0}),Q(document,"touchmove",a,{passive:!1,capture:!0}),Q(document,"touchend",o,{passive:!1,capture:!0}),Q(document,"focus",r,!0),Q(window,"scroll",i));return()=>{h(),p(),window.scrollTo(l,s)}}function ge(e,n,t){let a=e.style[n];return e.style[n]=t,()=>{e.style[n]=a}}function Q(e,n,t,a){return e.addEventListener(n,t,a),()=>{e.removeEventListener(n,t,a)}}function Be(e){let n=document.scrollingElement||document.documentElement;for(;e&&e!==n;){let t=Ze(e);if(t!==document.documentElement&&t!==document.body&&t!==e){let a=t.getBoundingClientRect().top,o=e.getBoundingClientRect().top,r=e.getBoundingClientRect().bottom,i=t.getBoundingClientRect().bottom;r>i&&(t.scrollTop+=o-a)}e=t.parentElement}}function Ae(e){return e instanceof HTMLInputElement&&!un.has(e.type)||e instanceof HTMLTextAreaElement||e instanceof HTMLElement&&e.isContentEditable}function pn(e,n){typeof e=="function"?e(n):e!=null&&(e.current=n)}function mn(...e){return n=>e.forEach(t=>pn(t,n))}function Je(...e){return d.useCallback(mn(...e),e)}var gn=4,bn=.001,hn=1e-7,vn=10,ne=11,pe=1/(ne-1),$n=typeof Float32Array=="function";function Qe(e,n){return 1-3*n+3*e}function et(e,n){return 3*n-6*e}function tt(e){return 3*e}function be(e,n,t){return((Qe(n,t)*e+et(n,t))*e+tt(n))*e}function nt(e,n,t){return 3*Qe(n,t)*e*e+2*et(n,t)*e+tt(n)}function wn(e,n,t,a,o){var r,i,l=0;do i=n+(t-n)/2,r=be(i,a,o)-e,r>0?t=i:n=i;while(Math.abs(r)>hn&&++l<vn);return i}function yn(e,n,t,a){for(var o=0;o<gn;++o){var r=nt(n,t,a);if(r===0)return n;var i=be(n,t,a)-e;n-=i/r}return n}function En(e){return e}function xn(e,n,t,a){if(!(0<=e&&e<=1&&0<=t&&t<=1))throw new Error("bezier x values must be in [0, 1] range");if(e===n&&t===a)return En;for(var o=$n?new Float32Array(ne):new Array(ne),r=0;r<ne;++r)o[r]=be(r*pe,e,t);function i(l){for(var s=0,h=1,p=ne-1;h!==p&&o[h]<=l;++h)s+=pe;--h;var u=(l-o[h])/(o[h+1]-o[h]),f=s+u*pe,C=nt(f,e,t);return C>=bn?yn(l,f,e,t):C===0?f:wn(l,s,s+pe,e,t)}return function(l){return l===0||l===1?l:be(i(l),n,a)}}var Dn=xn(.32,.72,0,1);function Rn(e){let n=e.match(/rgba?\((\d+),\s*(\d+),\s*(\d+),\s*(\d*(?:\.\d+)?)\)/);if(!n)throw new Error("Invalid color string");return[Number(n[1]),Number(n[2]),Number(n[3]),Number(n[4])]}function An(e,n){let[t,a,o,r]=Rn(e);return[Math.round(r*t+(1-r)*Number(n[0])),Math.round(r*a+(1-r)*Number(n[1])),Math.round(r*o+(1-r)*Number(n[2]))]}function Cn(e){return Dn(e)}function On(e,n,t,a){arguments.length<3&&(t=.5);let o=e.slice();for(let r=0;r<3;r++){let i=n[r]-e[r],l=a?e[r]+t*i:e[r]+Cn(t)*i;o[r]=Math.round(l),o[r]<0&&(o[r]=0),o[r]>255&&(o[r]=255)}return o}function ee(e,n,t,a){let o=1/(t-1),r=[];for(let i=0;i<t;i++)r.push(On(e,n,o*i,!!a));return r}function Pn(e,n,t,a){let[o,r]=c.useState([255,255,255]),[i,l]=c.useState([153,153,153]),[s,h]=c.useState(!1),[p,u]=c.useState(null),[f,C]=c.useState(null),T=c.useMemo(()=>Se()&&ln()&&a,[a]),H=c.useMemo(()=>o&&i?ee(o,i,50):null,[i,o]),_=c.useMemo(()=>o&&i?ee(i,o,50):null,[i,o]),v=c.useMemo(()=>o&&i?ee(i,o,50,!0):null,[i,o]);c.useEffect(()=>{if(!T)return;let $=getComputedStyle(document.documentElement),D=$.getPropertyValue("--vaul-overlay-background").split(",").map(F=>Number(F)),S=$.getPropertyValue("--vaul-overlay-background-end"),O=An(S,D);r(D),l(O)},[T]),c.useEffect(()=>{if(T&&!p){let $=document.querySelector('meta[name="theme-color"]');$?u($.getAttribute("content")):($=document.createElement("meta"),$.name="theme-color",document.getElementsByTagName("head")[0].appendChild($)),C($)}},[p,T]);let m=d.useCallback($=>{let D,S;function O(F){D||(D=F);let B=F-D,q=Math.floor(B/10);if(n.current&&$&&!s&&e.current){if(e.current.style.transform==="translateY(0px)"&&e.current.getAttribute("vaul-clicked-outside")!=="true")return;if(q<$.length){let ie=$[q];f==null||f.setAttribute("content",`rgb(${ie.join(",")})`),q===$.length-1&&p&&!t&&(f==null||f.setAttribute("content",p)),S=requestAnimationFrame(O)}}}return S=requestAnimationFrame(O),S},[e,t,f,s,p,n]);c.useEffect(()=>{if(!T||!H||!_)return;let $=m(t?H:_);return t&&h(!1),()=>{$&&cancelAnimationFrame($)}},[t,T,m,H,_]);function w($){let D=document.querySelector('meta[name="theme-color"]');if(!T||!D||!v)return;let S=Math.floor($*v.length);S=Math.max(0,Math.min(v.length-1,S));let O=v[S];D.setAttribute("content",`rgb(${O.join(",")})`)}function A($){let D=document.querySelector('meta[name="theme-color"]');if(!D||!T)return;h(!0);let S=D.getAttribute("content").match(/\d+/g).map(Number),O=ee(S,i,50);!$&&o&&(O=ee(S,o,50)),m(O)}return{onDrag:w,onRelease:A}}var V=null;function Tn({isOpen:e,modal:n,nested:t}){let a=c.useRef(0);function o(){if(V===null){V={position:document.body.style.position,top:document.body.style.top,left:document.body.style.left};let{scrollX:i,innerHeight:l}=window;document.body.style.setProperty("position","fixed","important"),document.body.style.top=`${-a.current}px`,document.body.style.left=`${-i}px`,document.body.style.right="0px",setTimeout(()=>requestAnimationFrame(()=>{let s=l-window.innerHeight;s&&a.current>=l&&(document.body.style.top=`${-(a.current+s)}px`)}),300)}}function r(){if(V!==null){let i=-parseInt(document.body.style.top,10),l=-parseInt(document.body.style.left,10);document.body.style.position=V.position,document.body.style.top=V.top,document.body.style.left=V.left,document.body.style.right="unset",requestAnimationFrame(()=>{window.scrollTo(l,i)}),V=null}}c.useEffect(()=>{function i(){a.current=window.scrollY}return i(),window.addEventListener("scroll",i),()=>{window.removeEventListener("scroll",i)}},[]),c.useEffect(()=>{!Se()||t||(e?(o(),n||setTimeout(()=>{r()},500)):r())},[e])}var rt=new WeakMap;function R(e,n,t=!1){if(!e||!(e instanceof HTMLElement)||!n)return;let a={};Object.entries(n).forEach(([o,r])=>{if(o.startsWith("--")){e.style.setProperty(o,r);return}a[o]=e.style[o],e.style[o]=r}),!t&&rt.set(e,a)}function xe(e,n){if(!e||!(e instanceof HTMLElement))return;let t=rt.get(e);if(!t){e.style={};return}n?e.style[n]=t[n]:Object.entries(t).forEach(([a,o])=>{e.style[a]=o})}function me(e){let n=window.getComputedStyle(e),t=n.transform||n.webkitTransform||n.mozTransform,a=t.match(/^matrix3d\((.+)\)$/);return a?parseFloat(a[1].split(", ")[13]):(a=t.match(/^matrix\((.+)\)$/),a?parseFloat(a[1].split(", ")[5]):null)}function Sn(e){return 8*(Math.log(e+1)-2)}var E={DURATION:.5,EASE:[.32,.72,0,1]},ot=.4;function Nn({activeSnapPointProp:e,setActiveSnapPointProp:n,snapPoints:t,drawerRef:a,overlayRef:o,fadeFromIndex:r}){let[i,l]=Xe({prop:e,defaultProp:t==null?void 0:t[0],onChange:n}),s=c.useMemo(()=>i===(t==null?void 0:t[t.length-1]),[t,i]),h=t&&t.length>0&&r&&t[r]===i||!t,p=c.useMemo(()=>{var v;return(v=t==null?void 0:t.findIndex(m=>m===i))!=null?v:null},[t,i]),u=c.useMemo(()=>{var v;return(v=t==null?void 0:t.map(m=>{let w=typeof window<"u",A=typeof m=="string",$=0;A&&($=parseInt(m,10));let D=A?$:w?m*window.innerHeight:0;return w?window.innerHeight-D:D}))!=null?v:[]},[t]),f=c.useMemo(()=>p!==null?u==null?void 0:u[p]:null,[u,p]),C=c.useCallback(v=>{var m;let w=(m=u==null?void 0:u.findIndex(A=>A===v))!=null?m:null;R(a.current,{transition:`transform ${E.DURATION}s cubic-bezier(${E.EASE.join(",")})`,transform:`translate3d(0, ${v}px, 0)`}),u&&w!==u.length-1&&w!==r?R(o.current,{transition:`opacity ${E.DURATION}s cubic-bezier(${E.EASE.join(",")})`,opacity:"0"}):R(o.current,{transition:`opacity ${E.DURATION}s cubic-bezier(${E.EASE.join(",")})`,opacity:"1"}),l(w!==null?t==null?void 0:t[w]:null)},[a,t,u,r,o,l]);c.useEffect(()=>{var v;if(e){let m=(v=t==null?void 0:t.findIndex(w=>w===e))!=null?v:null;u&&m&&u[m]&&C(u[m])}},[e,t,u,C]);function T({draggedDistance:v,closeDrawer:m,velocity:w}){if(typeof f!="number"||r===void 0)return;let A=f-v,$=p===r-1,D=p===0;if($&&R(o.current,{transition:`opacity ${E.DURATION}s cubic-bezier(${E.EASE.join(",")})`}),w>2&&v<0){m();return}if(w>2&&v>0&&u&&t){C(u[t.length-1]);return}let S=u==null?void 0:u.reduce((O,F)=>typeof O!="number"||typeof F!="number"?O:Math.abs(F-A)<Math.abs(O-A)?F:O);if(w>ot&&Math.abs(v)<window.innerHeight*.4){let O=v>0?1:-1;if(O>0&&s||(D&&O<0&&m(),p===null))return;C(u[p+O]);return}C(S)}function H({draggedDistance:v}){var m;if(f===null)return;let w=f-v;if(w<u[u.length-1]){l((m=t==null?void 0:t[t.length-1])!=null?m:null),R(a.current,{transform:"translate3d(0, 0px, 0)"});return}R(a.current,{transform:`translate3d(0, ${w}px, 0)`})}function _(v,m){if(!t||!p||!u||r===void 0)return null;let w=p===r-1;if(p>=r&&m)return 0;if(w&&!m)return 1;if(!h&&!w)return null;let A=w?p+1:p-1,$=w?u[A]-u[A-1]:u[A+1]-u[A],D=v/Math.abs($);return w?1-D:D}return{isLastSnapPoint:s,activeSnapPoint:i,shouldFade:h,getPercentageDragged:_,setActiveSnapPoint:l,activeSnapPointIndex:p,onRelease:T,onDrag:H,snapPointsOffset:u}}var Mn=.25,kn=500,_n=501,ze=8,Y=16,He=26;function at({open:e,defaultOpen:n,onOpenChange:t,children:a,shouldScaleBackground:o,onDrag:r,onRelease:i,experimentalSafariThemeAnimation:l,snapPoints:s,nested:h,closeThreshold:p=Mn,scrollLockTimeout:u=kn,dismissible:f=!0,fadeFromIndex:C=s&&(s==null?void 0:s.length)-1,activeSnapPoint:T,setActiveSnapPoint:H,modal:_=!0,onClose:v}){let[m=!1,w]=Xe({prop:e,defaultProp:n,onChange:t}),[A,$]=c.useState(!1),[D,S]=c.useState(!1),[O,F]=c.useState(!1),B=c.useRef(null),q=c.useRef(null),ie=c.useRef(null),Z=c.useRef(null),he=c.useRef(null),ve=c.useRef(0),G=c.useRef(!1),Me=c.useRef(0),b=c.useRef(null),{onDrag:ct,onRelease:le}=Pn(b,B,m,l),{activeSnapPoint:ut,activeSnapPointIndex:ce,setActiveSnapPoint:ke,onRelease:st,snapPointsOffset:ue,onDrag:dt,shouldFade:_e,getPercentageDragged:ft}=Nn({snapPoints:s,activeSnapPointProp:T,setActiveSnapPointProp:H,drawerRef:b,fadeFromIndex:C,overlayRef:B});sn({isDisabled:!m||D||!_||O}),Tn({isOpen:m,modal:_,nested:h});function se(){return(window.innerWidth-He)/window.innerWidth}function pt(g){f&&(b.current&&!b.current.contains(g.target)||(S(!0),q.current=new Date,g.target.setPointerCapture(g.pointerId),ve.current=g.clientY))}function Ie(g,y){var x;let P=g,z=new Date,k=(x=window.getSelection())==null?void 0:x.toString(),I=b.current?me(b.current):null;if(k&&k.length>0)return!1;if(Z.current&&z.getTime()-Z.current.getTime()<u&&I===0)return Z.current=new Date,!1;for(;P;){if(P.scrollHeight>P.clientHeight){if(P.getAttribute("role")==="dialog")return!0;if(P.scrollTop!==0)return Z.current=new Date,!1;if(y&&P!==document.body&&!I&&I!==0)return Z.current=new Date,!1}P=P.parentNode}return!0}function mt(g){var y;if(D){let x=ve.current-g.clientY,P=x>0;if(!Ie(g.target,P))return;let z=((y=b.current)==null?void 0:y.getBoundingClientRect().height)||0;if(R(b.current,{transition:"none"}),R(B.current,{transition:"none"}),s&&dt({draggedDistance:x}),x>0&&!s){let X=Sn(x);console.log(Math.min(X*-1,0),0),R(b.current,{transform:`translate3d(0, ${Math.min(X*-1,0)}px, 0)`});return}let k=Math.abs(x),I=document.querySelector("[vaul-drawer-wrapper]"),M=k/z,W=ft(k,P);W!==null&&(M=W);let $e=1-M;if((_e||C&&ce===C-1)&&(ct(M),r==null||r(g,M),R(B.current,{opacity:`${$e}`,transition:"none"},!0)),I&&B.current&&o){let X=Math.min(se()+M*(1-se()),1),K=8-M*8,de=Math.max(0,14-M*14);R(I,{borderRadius:`${K}px`,transform:`scale(${X}) translate3d(0, ${de}px, 0)`,transition:"none"},!0)}s||R(b.current,{transform:`translate3d(0, ${k}px, 0)`})}}c.useEffect(()=>{var g;function y(){var x,P,z,k;if(!b.current)return;let I=document.activeElement;if(Ae(I)||G.current){let M=((x=window.visualViewport)==null?void 0:x.height)||0,W=window.innerHeight-M,$e=((P=b.current)==null?void 0:P.getBoundingClientRect().height)||0,X=(z=b.current)==null?void 0:z.getBoundingClientRect().top;if(Math.abs(Me.current-W)>60&&(G.current=!G.current),s&&s.length>0&&ue&&ce){let K=ue[ce]||0;W+=K}if(Me.current=W,$e>M||G.current){let K=(k=b.current)==null?void 0:k.getBoundingClientRect().height,de=K;K>M&&(de=M-He),b.current.style.height=`${Math.max(de,M-X)}px`}else b.current.style.height="initial";s&&s.length>0&&!G.current?b.current.style.bottom="0px":b.current.style.bottom=`${Math.max(W,0)}px`}}return(g=window.visualViewport)==null||g.addEventListener("resize",y),()=>{var x;return(x=window.visualViewport)==null?void 0:x.removeEventListener("resize",y)}},[ce,s,ue]);function J(){!f||!b.current||(v==null||v(),b.current&&(R(b.current,{transform:"translate3d(0, 100%, 0)",transition:`transform ${E.DURATION}s cubic-bezier(${E.EASE.join(",")})`}),R(B.current,{opacity:"0",transition:`opacity ${E.DURATION}s cubic-bezier(${E.EASE.join(",")})`}),Le(!1)),setTimeout(()=>{w(!1),$(!1),s&&ke(s[0])},_n))}c.useEffect(()=>{if(!m&&o){let g=setTimeout(()=>{xe(document.body)},200);return()=>clearTimeout(g)}},[m,o]);function Fe(){if(!b.current)return;let g=document.querySelector("[vaul-drawer-wrapper]"),y=me(b.current);R(b.current,{transform:"translate3d(0, 0, 0)",transition:`transform ${E.DURATION}s cubic-bezier(${E.EASE.join(",")})`}),R(B.current,{transition:`opacity ${E.DURATION}s cubic-bezier(${E.EASE.join(",")})`,opacity:"1"}),o&&y&&y>0&&m&&R(g,{borderRadius:`${ze}px`,overflow:"hidden",transform:`scale(${se()}) translate3d(0, calc(env(safe-area-inset-top) + 14px), 0)`,transformOrigin:"top",transitionProperty:"transform, border-radius",transitionDuration:`${E.DURATION}s`,transitionTimingFunction:`cubic-bezier(${E.EASE.join(",")})`},!0)}function gt(g){var y;if(!D||!b.current)return;S(!1),ie.current=new Date;let x=me(b.current);if(!Ie(g.target,!1)||!x||Number.isNaN(x)||q.current===null)return;let P=g.clientY,z=ie.current.getTime()-q.current.getTime(),k=ve.current-P,I=Math.abs(k)/z;if(I>.05&&(F(!0),setTimeout(()=>{F(!1)},200)),s){st({draggedDistance:k,closeDrawer:J,velocity:I});return}if(k>0){Fe(),i==null||i(g,!0),le(!0);return}if(I>ot){J(),i==null||i(g,!1),le(!1);return}let M=Math.min(((y=b.current)==null?void 0:y.getBoundingClientRect().height)||0,window.innerHeight);if(x>=M*p){J(),i==null||i(g,!1),le(!1);return}i==null||i(g,!0),le(!0),Fe()}function Le(g){let y=document.querySelector("[vaul-drawer-wrapper]");!y||!o||(g?(R(document.body,{background:"black"},!0),R(y,{borderRadius:`${ze}px`,overflow:"hidden",transform:`scale(${se()}) translate3d(0, calc(env(safe-area-inset-top) + 14px), 0)`,transformOrigin:"top",transitionProperty:"transform, border-radius",transitionDuration:`${E.DURATION}s`,transitionTimingFunction:`cubic-bezier(${E.EASE.join(",")})`})):(xe(y,"transform"),xe(y,"borderRadius"),R(y,{transitionProperty:"transform, border-radius",transitionDuration:`${E.DURATION}s`,transitionTimingFunction:`cubic-bezier(${E.EASE.join(",")})`})))}function bt(g){let y=g?(window.innerWidth-Y)/window.innerWidth:1,x=g?-Y:0;he.current&&window.clearTimeout(he.current),R(b.current,{transition:`transform ${E.DURATION}s cubic-bezier(${E.EASE.join(",")})`,transform:`scale(${y}) translate3d(0, ${x}px, 0)`}),!g&&b.current&&(he.current=setTimeout(()=>{R(b.current,{transition:"none",transform:`translate3d(0, ${me(b.current)}px, 0)`})},500))}function ht(g,y){if(y<0)return;let x=(window.innerWidth-Y)/window.innerWidth,P=x+y*(1-x),z=-Y+y*Y;R(b.current,{transform:`scale(${P}) translate3d(0, ${z}px, 0)`,transition:"none"})}function vt(g,y){let x=y?(window.innerWidth-Y)/window.innerWidth:1,P=y?-Y:0;y&&R(b.current,{transition:`transform ${E.DURATION}s cubic-bezier(${E.EASE.join(",")})`,transform:`scale(${x}) translate3d(0, ${P}px, 0)`})}return c.createElement(Yt,{open:m,onOpenChange:g=>{g?w(g):J()},modal:_},c.createElement(Ke.Provider,{value:{visible:A,activeSnapPoint:ut,snapPoints:s,setActiveSnapPoint:ke,drawerRef:b,overlayRef:B,scaleBackground:Le,onPress:pt,setVisible:$,onRelease:gt,onDrag:mt,dismissible:f,isOpen:m,shouldFade:_e,closeDrawer:J,onNestedDrag:ht,onNestedOpenChange:bt,onNestedRelease:vt,keyboardIsOpen:G,modal:_,snapPointsOffset:ue,experimentalSafariThemeAnimation:l}},a))}var it=c.forwardRef(function({children:e,style:n,...t},a){let{overlayRef:o,snapPoints:r,onRelease:i,experimentalSafariThemeAnimation:l,shouldFade:s,isOpen:h,visible:p}=Te(),u=Je(a,o),f=r&&r.length>0;return c.createElement(Kt,{onMouseUp:i,ref:u,"vaul-overlay":"","vaul-snap-points":h&&f?"true":"false","vaul-theme-transition":l?"true":"false","vaul-snap-points-overlay":h&&s?"true":"false","vaul-drawer-visible":p?"true":"false",...t})});it.displayName="Drawer.Overlay";var lt=c.forwardRef(function({children:e,onOpenAutoFocus:n,onPointerDownOutside:t,onAnimationEnd:a,style:o,...r},i){let{drawerRef:l,onPress:s,onRelease:h,onDrag:p,dismissible:u,isOpen:f,keyboardIsOpen:C,snapPointsOffset:T,visible:H,setVisible:_,closeDrawer:v,scaleBackground:m}=Te(),w=Je(i,l);return c.useEffect(()=>{_(!0),m(!0)},[]),c.createElement(Zt,{onPointerDown:s,onPointerUp:h,onPointerMove:p,onOpenAutoFocus:A=>{n?n(A):A.preventDefault()},onPointerDownOutside:A=>{C.current&&(C.current=!1),A.preventDefault(),u&&(v(),t==null||t(A))},ref:w,style:T?{"--snap-point-height":`${T[0]}px`,...o}:o,...r,"vaul-drawer":"","vaul-drawer-visible":H?"true":"false"},e)});lt.displayName="Drawer.Content";function In({children:e,onDrag:n,onOpenChange:t}){let{onNestedDrag:a,onNestedOpenChange:o,onNestedRelease:r}=Te();if(!a)throw new Error("Drawer.NestedRoot must be placed in another drawer");return c.createElement(at,{onDrag:(i,l)=>{a(i,l),n==null||n(i,l)},onClose:()=>{o(!1)},nested:!0,onOpenChange:i=>{i&&o(i),t==null||t(i)},onRelease:r},e)}var te=Object.assign({},{Root:at,NestedRoot:In,Content:lt,Overlay:it,Trigger:Gt,Portal:Xt,Close:en,Title:Jt,Description:Qt});const Hn=()=>U("div",{className:"relative",children:[U("p",{children:[U("span",{className:"info info-text wall-pad",children:["External library ",N("span",{className:"font-bold",children:"$ pnpm i vaul"})]})," ","Drawer component for React."," ",N("a",{href:"https://vaul.emilkowal.ski/",className:"underline",target:"_blank",children:"All documentaiton"})," ","made by"," ",N("a",{href:"https://emilkowal.ski/",className:"underline",target:"_blank",children:"Emil Kowalski"}),"."]}),N("p",{}),N("div",{children:U(te.Root,{shouldScaleBackground:!0,children:[N(te.Trigger,{asChild:!0,children:N(Ot,{children:"Open Drawer"})}),N(te.Overlay,{className:"fixed inset-0 bg-black/40"}),N(te.Portal,{children:U(te.Content,{className:"bg-gray-100 flex flex-col rounded-t-[10px] h-full mt-24 max-h-[96%] fixed bottom-0 left-0 right-0",children:[N("div",{className:"mx-auto w-6 h-0.5 flex-shrink-0 rounded-full bg-accents-3 mb-2 mt-1"}),N(Pt,{passDiv:!0,container:"smash",children:U("div",{children:[N("h2",{children:"Drawer for React."}),N("p",{children:"This component can be used as a Dialog replacement on mobile and tablet devices."}),U("p",{children:["It comes unstyled, has gesture-driven animations, and is made by"," ",N("a",{href:"https://emilkowal.ski/",className:"underline",target:"_blank",children:"Emil Kowalski"}),"."]}),U("p",{children:["It uses"," ",N("a",{href:"https://www.radix-ui.com/docs/primitives/components/dialog",className:"underline",target:"_blank",children:"Radix's Dialog primitive"})," ","under the hood and is inspired by"," ",N("a",{href:"https://twitter.com/devongovett/status/1674470185783402496",className:"underline",target:"_blank",children:"this tweet."})]})]})})]})})]})})]});typeof window<"u"&&window.document&&window.document.createElement&&document.documentElement.setAttribute("data-storyloaded","");export{Hn as Default};
