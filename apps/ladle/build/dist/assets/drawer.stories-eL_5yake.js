import{r as T,j as c,e as i}from"./index-ZUrBV4M6.js";import{c as Vt,u as je,P as ge,a as pe,b as ke,R as Yt,S as qt,h as Xt,d as Gt,F as Kt,D as Jt,e as Zt,f as Qt,g as Ne,i as en}from"./index-bNpZL0VU.js";import{B as tn}from"./button-VG9UYSJz.js";import{S as nn}from"./section-Cr-j7D5J.js";var Le="Dialog",[nt,Kn]=Vt(Le),[rn,X]=nt(Le),rt=e=>{const{__scopeDialog:n,children:t,open:a,defaultOpen:o,onOpenChange:r,modal:s=!0}=e,l=T.useRef(null),w=T.useRef(null),[b=!1,v]=Qt({prop:a,defaultProp:o,onChange:r});return c.jsx(rn,{scope:n,triggerRef:l,contentRef:w,contentId:Ne(),titleId:Ne(),descriptionId:Ne(),open:b,onOpenChange:v,onOpenToggle:T.useCallback(()=>v(g=>!g),[v]),modal:s,children:t})};rt.displayName=Le;var at="DialogTrigger",ot=T.forwardRef((e,n)=>{const{__scopeDialog:t,...a}=e,o=X(at,t),r=je(n,o.triggerRef);return c.jsx(ge.button,{type:"button","aria-haspopup":"dialog","aria-expanded":o.open,"aria-controls":o.contentId,"data-state":Be(o.open),...a,ref:r,onClick:pe(e.onClick,o.onOpenToggle)})});ot.displayName=at;var Fe="DialogPortal",[an,it]=nt(Fe,{forceMount:void 0}),st=e=>{const{__scopeDialog:n,forceMount:t,children:a,container:o}=e,r=X(Fe,n);return c.jsx(an,{scope:n,forceMount:t,children:T.Children.map(a,s=>c.jsx(ke,{present:t||r.open,children:c.jsx(en,{asChild:!0,container:o,children:s})}))})};st.displayName=Fe;var Re="DialogOverlay",lt=T.forwardRef((e,n)=>{const t=it(Re,e.__scopeDialog),{forceMount:a=t.forceMount,...o}=e,r=X(Re,e.__scopeDialog);return r.modal?c.jsx(ke,{present:a||r.open,children:c.jsx(on,{...o,ref:n})}):null});lt.displayName=Re;var on=T.forwardRef((e,n)=>{const{__scopeDialog:t,...a}=e,o=X(Re,t);return c.jsx(Yt,{as:qt,allowPinchZoom:!0,shards:[o.contentRef],children:c.jsx(ge.div,{"data-state":Be(o.open),...a,ref:n,style:{pointerEvents:"auto",...a.style}})})}),ne="DialogContent",ut=T.forwardRef((e,n)=>{const t=it(ne,e.__scopeDialog),{forceMount:a=t.forceMount,...o}=e,r=X(ne,e.__scopeDialog);return c.jsx(ke,{present:a||r.open,children:r.modal?c.jsx(sn,{...o,ref:n}):c.jsx(ln,{...o,ref:n})})});ut.displayName=ne;var sn=T.forwardRef((e,n)=>{const t=X(ne,e.__scopeDialog),a=T.useRef(null),o=je(n,t.contentRef,a);return T.useEffect(()=>{const r=a.current;if(r)return Xt(r)},[]),c.jsx(ct,{...e,ref:o,trapFocus:t.open,disableOutsidePointerEvents:!0,onCloseAutoFocus:pe(e.onCloseAutoFocus,r=>{var s;r.preventDefault(),(s=t.triggerRef.current)==null||s.focus()}),onPointerDownOutside:pe(e.onPointerDownOutside,r=>{const s=r.detail.originalEvent,l=s.button===0&&s.ctrlKey===!0;(s.button===2||l)&&r.preventDefault()}),onFocusOutside:pe(e.onFocusOutside,r=>r.preventDefault())})}),ln=T.forwardRef((e,n)=>{const t=X(ne,e.__scopeDialog),a=T.useRef(!1),o=T.useRef(!1);return c.jsx(ct,{...e,ref:n,trapFocus:!1,disableOutsidePointerEvents:!1,onCloseAutoFocus:r=>{var s,l;(s=e.onCloseAutoFocus)==null||s.call(e,r),r.defaultPrevented||(a.current||(l=t.triggerRef.current)==null||l.focus(),r.preventDefault()),a.current=!1,o.current=!1},onInteractOutside:r=>{var w,b;(w=e.onInteractOutside)==null||w.call(e,r),r.defaultPrevented||(a.current=!0,r.detail.originalEvent.type==="pointerdown"&&(o.current=!0));const s=r.target;((b=t.triggerRef.current)==null?void 0:b.contains(s))&&r.preventDefault(),r.detail.originalEvent.type==="focusin"&&o.current&&r.preventDefault()}})}),ct=T.forwardRef((e,n)=>{const{__scopeDialog:t,trapFocus:a,onOpenAutoFocus:o,onCloseAutoFocus:r,...s}=e,l=X(ne,t),w=T.useRef(null),b=je(n,w);return Gt(),c.jsxs(c.Fragment,{children:[c.jsx(Kt,{asChild:!0,loop:!0,trapped:a,onMountAutoFocus:o,onUnmountAutoFocus:r,children:c.jsx(Jt,{role:"dialog",id:l.contentId,"aria-describedby":l.descriptionId,"aria-labelledby":l.titleId,"data-state":Be(l.open),...s,ref:b,onDismiss:()=>l.onOpenChange(!1)})}),c.jsxs(c.Fragment,{children:[c.jsx(un,{titleId:l.titleId}),c.jsx(dn,{contentRef:w,descriptionId:l.descriptionId})]})]})}),He="DialogTitle",dt=T.forwardRef((e,n)=>{const{__scopeDialog:t,...a}=e,o=X(He,t);return c.jsx(ge.h2,{id:o.titleId,...a,ref:n})});dt.displayName=He;var ft="DialogDescription",mt=T.forwardRef((e,n)=>{const{__scopeDialog:t,...a}=e,o=X(ft,t);return c.jsx(ge.p,{id:o.descriptionId,...a,ref:n})});mt.displayName=ft;var pt="DialogClose",gt=T.forwardRef((e,n)=>{const{__scopeDialog:t,...a}=e,o=X(pt,t);return c.jsx(ge.button,{type:"button",...a,ref:n,onClick:pe(e.onClick,()=>o.onOpenChange(!1))})});gt.displayName=pt;function Be(e){return e?"open":"closed"}var ht="DialogTitleWarning",[Jn,wt]=Zt(ht,{contentName:ne,titleName:He,docsSlug:"dialog"}),un=({titleId:e})=>{const n=wt(ht),t=`\`${n.contentName}\` requires a \`${n.titleName}\` for the component to be accessible for screen reader users.

If you want to hide the \`${n.titleName}\`, you can wrap it with our VisuallyHidden component.

For more information, see https://radix-ui.com/primitives/docs/components/${n.docsSlug}`;return T.useEffect(()=>{e&&(document.getElementById(e)||console.error(t))},[t,e]),null},cn="DialogDescriptionWarning",dn=({contentRef:e,descriptionId:n})=>{const a=`Warning: Missing \`Description\` or \`aria-describedby={undefined}\` for {${wt(cn).contentName}}.`;return T.useEffect(()=>{var r;const o=(r=e.current)==null?void 0:r.getAttribute("aria-describedby");n&&o&&(document.getElementById(n)||console.warn(a))},[a,e,n]),null},fn=rt,mn=ot,pn=st,gn=lt,hn=ut,wn=dt,vn=mt,yn=gt;function bn(e){if(typeof document>"u")return;let n=document.head||document.getElementsByTagName("head")[0],t=document.createElement("style");t.type="text/css",n.appendChild(t),t.styleSheet?t.styleSheet.cssText=e:t.appendChild(document.createTextNode(e))}const vt=i.createContext({drawerRef:{current:null},overlayRef:{current:null},onPress:()=>{},onRelease:()=>{},onDrag:()=>{},onNestedDrag:()=>{},onNestedOpenChange:()=>{},onNestedRelease:()=>{},openProp:void 0,dismissible:!1,isOpen:!1,isDragging:!1,keyboardIsOpen:{current:!1},snapPointsOffset:null,snapPoints:null,handleOnly:!1,modal:!1,shouldFade:!1,activeSnapPoint:null,onOpenChange:()=>{},setActiveSnapPoint:()=>{},closeDrawer:()=>{},direction:"bottom",shouldScaleBackground:!1,setBackgroundColorOnScale:!0,noBodyStyles:!1,container:null,autoFocus:!1}),oe=()=>{const e=i.useContext(vt);if(!e)throw new Error("useDrawerContext must be used within a Drawer.Root");return e};bn(`[data-vaul-drawer]{touch-action:none;will-change:transform;transition:transform .5s cubic-bezier(.32, .72, 0, 1);animation-duration:.5s;animation-timing-function:cubic-bezier(0.32,0.72,0,1)}[data-vaul-drawer][data-vaul-snap-points=false][data-vaul-drawer-direction=bottom][data-state=open]{animation-name:slideFromBottom}[data-vaul-drawer][data-vaul-snap-points=false][data-vaul-drawer-direction=bottom][data-state=closed]{animation-name:slideToBottom}[data-vaul-drawer][data-vaul-snap-points=false][data-vaul-drawer-direction=top][data-state=open]{animation-name:slideFromTop}[data-vaul-drawer][data-vaul-snap-points=false][data-vaul-drawer-direction=top][data-state=closed]{animation-name:slideToTop}[data-vaul-drawer][data-vaul-snap-points=false][data-vaul-drawer-direction=left][data-state=open]{animation-name:slideFromLeft}[data-vaul-drawer][data-vaul-snap-points=false][data-vaul-drawer-direction=left][data-state=closed]{animation-name:slideToLeft}[data-vaul-drawer][data-vaul-snap-points=false][data-vaul-drawer-direction=right][data-state=open]{animation-name:slideFromRight}[data-vaul-drawer][data-vaul-snap-points=false][data-vaul-drawer-direction=right][data-state=closed]{animation-name:slideToRight}[data-vaul-drawer][data-vaul-snap-points=true][data-vaul-drawer-direction=bottom]{transform:translate3d(0,100%,0)}[data-vaul-drawer][data-vaul-snap-points=true][data-vaul-drawer-direction=top]{transform:translate3d(0,-100%,0)}[data-vaul-drawer][data-vaul-snap-points=true][data-vaul-drawer-direction=left]{transform:translate3d(-100%,0,0)}[data-vaul-drawer][data-vaul-snap-points=true][data-vaul-drawer-direction=right]{transform:translate3d(100%,0,0)}[data-vaul-drawer][data-vaul-delayed-snap-points=true][data-vaul-drawer-direction=top]{transform:translate3d(0,var(--snap-point-height,0),0)}[data-vaul-drawer][data-vaul-delayed-snap-points=true][data-vaul-drawer-direction=bottom]{transform:translate3d(0,var(--snap-point-height,0),0)}[data-vaul-drawer][data-vaul-delayed-snap-points=true][data-vaul-drawer-direction=left]{transform:translate3d(var(--snap-point-height,0),0,0)}[data-vaul-drawer][data-vaul-delayed-snap-points=true][data-vaul-drawer-direction=right]{transform:translate3d(var(--snap-point-height,0),0,0)}[data-vaul-overlay][data-vaul-snap-points=false]{animation-duration:.5s;animation-timing-function:cubic-bezier(0.32,0.72,0,1)}[data-vaul-overlay][data-vaul-snap-points=false][data-state=open]{animation-name:fadeIn}[data-vaul-overlay][data-state=closed]{animation-name:fadeOut}[data-vaul-overlay][data-vaul-snap-points=true]{opacity:0;transition:opacity .5s cubic-bezier(.32, .72, 0, 1)}[data-vaul-overlay][data-vaul-snap-points=true]{opacity:1}[data-vaul-drawer]:not([data-vaul-custom-container=true])::after{content:'';position:absolute;background:inherit;background-color:inherit}[data-vaul-drawer][data-vaul-drawer-direction=top]::after{top:initial;bottom:100%;left:0;right:0;height:200%}[data-vaul-drawer][data-vaul-drawer-direction=bottom]::after{top:100%;bottom:initial;left:0;right:0;height:200%}[data-vaul-drawer][data-vaul-drawer-direction=left]::after{left:initial;right:100%;top:0;bottom:0;width:200%}[data-vaul-drawer][data-vaul-drawer-direction=right]::after{left:100%;right:initial;top:0;bottom:0;width:200%}[data-vaul-overlay][data-vaul-snap-points=true]:not([data-vaul-snap-points-overlay=true]):not(
[data-state=closed]
){opacity:0}[data-vaul-overlay][data-vaul-snap-points-overlay=true]{opacity:1}[data-vaul-handle]{display:block;position:relative;opacity:.7;background:#e2e2e4;margin-left:auto;margin-right:auto;height:5px;width:32px;border-radius:1rem;touch-action:pan-y}[data-vaul-handle]:active,[data-vaul-handle]:hover{opacity:1}[data-vaul-handle-hitarea]{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:max(100%,2.75rem);height:max(100%,2.75rem);touch-action:inherit}@media (hover:hover) and (pointer:fine){[data-vaul-drawer]{user-select:none}}@media (pointer:fine){[data-vaul-handle-hitarea]:{width:100%;height:100%}}@keyframes fadeIn{from{opacity:0}to{opacity:1}}@keyframes fadeOut{to{opacity:0}}@keyframes slideFromBottom{from{transform:translate3d(0,100%,0)}to{transform:translate3d(0,0,0)}}@keyframes slideToBottom{to{transform:translate3d(0,100%,0)}}@keyframes slideFromTop{from{transform:translate3d(0,-100%,0)}to{transform:translate3d(0,0,0)}}@keyframes slideToTop{to{transform:translate3d(0,-100%,0)}}@keyframes slideFromLeft{from{transform:translate3d(-100%,0,0)}to{transform:translate3d(0,0,0)}}@keyframes slideToLeft{to{transform:translate3d(-100%,0,0)}}@keyframes slideFromRight{from{transform:translate3d(100%,0,0)}to{transform:translate3d(0,0,0)}}@keyframes slideToRight{to{transform:translate3d(100%,0,0)}}`);const Dn=24,Rn=typeof window<"u"?T.useLayoutEffect:T.useEffect;function Ze(...e){return(...n)=>{for(let t of e)typeof t=="function"&&t(...n)}}function xn(){return We(/^Mac/)}function En(){return We(/^iPhone/)}function Qe(){return/^((?!chrome|android).)*safari/i.test(navigator.userAgent)}function Sn(){return We(/^iPad/)||xn()&&navigator.maxTouchPoints>1}function yt(){return En()||Sn()}function We(e){return typeof window<"u"&&window.navigator!=null?e.test(window.navigator.platform):void 0}const _e=typeof document<"u"&&window.visualViewport;function et(e){let n=window.getComputedStyle(e);return/(auto|scroll)/.test(n.overflow+n.overflowX+n.overflowY)}function bt(e){for(et(e)&&(e=e.parentElement);e&&!et(e);)e=e.parentElement;return e||document.scrollingElement||document.documentElement}const Tn=new Set(["checkbox","radio","range","color","file","image","button","submit","reset"]);let be=0,Pe;function Cn(e={}){let{isDisabled:n}=e;Rn(()=>{if(!n)return be++,be===1&&yt()&&(Pe=On()),()=>{be--,be===0&&(Pe==null||Pe())}},[n])}function On(){let e,n=0,t=g=>{e=bt(g.target),!(e===document.documentElement&&e===document.body)&&(n=g.changedTouches[0].pageY)},a=g=>{if(!e||e===document.documentElement||e===document.body){g.preventDefault();return}let y=g.changedTouches[0].pageY,L=e.scrollTop,U=e.scrollHeight-e.clientHeight;U!==0&&((L<=0&&y>n||L>=U&&y<n)&&g.preventDefault(),n=y)},o=g=>{let y=g.target;Me(y)&&y!==document.activeElement&&(g.preventDefault(),y.style.transform="translateY(-2000px)",y.focus(),requestAnimationFrame(()=>{y.style.transform=""}))},r=g=>{let y=g.target;Me(y)&&(y.style.transform="translateY(-2000px)",requestAnimationFrame(()=>{y.style.transform="",_e&&(_e.height<window.innerHeight?requestAnimationFrame(()=>{tt(y)}):_e.addEventListener("resize",()=>tt(y),{once:!0}))}))},s=()=>{window.scrollTo(0,0)},l=window.pageXOffset,w=window.pageYOffset,b=Ze(Nn(document.documentElement,"paddingRight",`${window.innerWidth-document.documentElement.clientWidth}px`));window.scrollTo(0,0);let v=Ze(de(document,"touchstart",t,{passive:!1,capture:!0}),de(document,"touchmove",a,{passive:!1,capture:!0}),de(document,"touchend",o,{passive:!1,capture:!0}),de(document,"focus",r,!0),de(window,"scroll",s));return()=>{b(),v(),window.scrollTo(l,w)}}function Nn(e,n,t){let a=e.style[n];return e.style[n]=t,()=>{e.style[n]=a}}function de(e,n,t,a){return e.addEventListener(n,t,a),()=>{e.removeEventListener(n,t,a)}}function tt(e){let n=document.scrollingElement||document.documentElement;for(;e&&e!==n;){let t=bt(e);if(t!==document.documentElement&&t!==document.body&&t!==e){let a=t.getBoundingClientRect().top,o=e.getBoundingClientRect().top,r=e.getBoundingClientRect().bottom;const s=t.getBoundingClientRect().bottom+Dn;r>s&&(t.scrollTop+=o-a)}e=t.parentElement}}function Me(e){return e instanceof HTMLInputElement&&!Tn.has(e.type)||e instanceof HTMLTextAreaElement||e instanceof HTMLElement&&e.isContentEditable}function _n(e,n){typeof e=="function"?e(n):e!=null&&(e.current=n)}function Pn(...e){return n=>e.forEach(t=>_n(t,n))}function Dt(...e){return T.useCallback(Pn(...e),e)}const Rt=new WeakMap;function _(e,n,t=!1){if(!e||!(e instanceof HTMLElement))return;let a={};Object.entries(n).forEach(([o,r])=>{if(o.startsWith("--")){e.style.setProperty(o,r);return}a[o]=e.style[o],e.style[o]=r}),!t&&Rt.set(e,a)}function An(e,n){if(!e||!(e instanceof HTMLElement))return;let t=Rt.get(e);t&&(e.style[n]=t[n])}const P=e=>{switch(e){case"top":case"bottom":return!0;case"left":case"right":return!1;default:return e}};function De(e,n){if(!e)return null;const t=window.getComputedStyle(e),a=t.transform||t.webkitTransform||t.mozTransform;let o=a.match(/^matrix3d\((.+)\)$/);return o?parseFloat(o[1].split(", ")[P(n)?13:12]):(o=a.match(/^matrix\((.+)\)$/),o?parseFloat(o[1].split(", ")[P(n)?5:4]):null)}function In(e){return 8*(Math.log(e+1)-2)}function Ae(e,n){if(!e)return()=>{};const t=e.style.cssText;return Object.assign(e.style,n),()=>{e.style.cssText=t}}function Mn(...e){return(...n)=>{for(const t of e)typeof t=="function"&&t(...n)}}const O={DURATION:.5,EASE:[.32,.72,0,1]},xt=.4,$n=.25,jn=100,Et=8,te=16,$e=26,Ie="vaul-dragging";function St(e){const n=i.useRef(e);return i.useEffect(()=>{n.current=e}),i.useMemo(()=>(...t)=>n.current==null?void 0:n.current.call(n,...t),[])}function kn({defaultProp:e,onChange:n}){const t=i.useState(e),[a]=t,o=i.useRef(a),r=St(n);return i.useEffect(()=>{o.current!==a&&(r(a),o.current=a)},[a,o,r]),t}function Tt({prop:e,defaultProp:n,onChange:t=()=>{}}){const[a,o]=kn({defaultProp:n,onChange:t}),r=e!==void 0,s=r?e:a,l=St(t),w=i.useCallback(b=>{if(r){const g=typeof b=="function"?b(e):b;g!==e&&l(g)}else o(b)},[r,e,o,l]);return[s,w]}function Ln({activeSnapPointProp:e,setActiveSnapPointProp:n,snapPoints:t,drawerRef:a,overlayRef:o,fadeFromIndex:r,onSnapPointChange:s,direction:l="bottom",container:w,snapToSequentialPoint:b}){const[v,g]=Tt({prop:e,defaultProp:t==null?void 0:t[0],onChange:n}),[y,L]=i.useState(typeof window<"u"?{innerWidth:window.innerWidth,innerHeight:window.innerHeight}:void 0);i.useEffect(()=>{function p(){L({innerWidth:window.innerWidth,innerHeight:window.innerHeight})}return window.addEventListener("resize",p),()=>window.removeEventListener("resize",p)},[]);const U=i.useMemo(()=>v===(t==null?void 0:t[t.length-1])||null,[t,v]),N=i.useMemo(()=>t==null?void 0:t.findIndex(p=>p===v),[t,v]),V=t&&t.length>0&&(r||r===0)&&!Number.isNaN(r)&&t[r]===v||!t,h=i.useMemo(()=>{const p=w?{width:w.getBoundingClientRect().width,height:w.getBoundingClientRect().height}:typeof window<"u"?{width:window.innerWidth,height:window.innerHeight}:{width:0,height:0};var E;return(E=t==null?void 0:t.map(D=>{const j=typeof D=="string";let u=0;if(j&&(u=parseInt(D,10)),P(l)){const I=j?u:y?D*p.height:0;return y?l==="bottom"?p.height-I:-p.height+I:I}const M=j?u:y?D*p.width:0;return y?l==="right"?p.width-M:-p.width+M:M}))!=null?E:[]},[t,y,w]),F=i.useMemo(()=>N!==null?h==null?void 0:h[N]:null,[h,N]),A=i.useCallback(p=>{var E;const D=(E=h==null?void 0:h.findIndex(j=>j===p))!=null?E:null;s(D),_(a.current,{transition:`transform ${O.DURATION}s cubic-bezier(${O.EASE.join(",")})`,transform:P(l)?`translate3d(0, ${p}px, 0)`:`translate3d(${p}px, 0, 0)`}),h&&D!==h.length-1&&D!==r&&D<r?_(o.current,{transition:`opacity ${O.DURATION}s cubic-bezier(${O.EASE.join(",")})`,opacity:"0"}):_(o.current,{transition:`opacity ${O.DURATION}s cubic-bezier(${O.EASE.join(",")})`,opacity:"1"}),g(t==null?void 0:t[Math.max(D,0)])},[a.current,t,h,r,o,g]);i.useEffect(()=>{if(v||e){var p;const E=(p=t==null?void 0:t.findIndex(D=>D===e||D===v))!=null?p:-1;h&&E!==-1&&typeof h[E]=="number"&&A(h[E])}},[v,e,t,h,A]);function m({draggedDistance:p,closeDrawer:E,velocity:D,dismissible:j}){if(r===void 0)return;const u=l==="bottom"||l==="right"?(F??0)-p:(F??0)+p,M=N===r-1,I=N===0,H=p>0;if(M&&_(o.current,{transition:`opacity ${O.DURATION}s cubic-bezier(${O.EASE.join(",")})`}),!b&&D>2&&!H){j?E():A(h[0]);return}if(!b&&D>2&&H&&h&&t){A(h[t.length-1]);return}const B=h==null?void 0:h.reduce((W,Q)=>typeof W!="number"||typeof Q!="number"?W:Math.abs(Q-u)<Math.abs(W-u)?Q:W),J=P(l)?window.innerHeight:window.innerWidth;if(D>xt&&Math.abs(p)<J*.4){const W=H?1:-1;if(W>0&&U){A(h[t.length-1]);return}if(I&&W<0&&j&&E(),N===null)return;A(h[N+W]);return}A(B)}function $({draggedDistance:p}){if(F===null)return;const E=l==="bottom"||l==="right"?F-p:F+p;(l==="bottom"||l==="right")&&E<h[h.length-1]||(l==="top"||l==="left")&&E>h[h.length-1]||_(a.current,{transform:P(l)?`translate3d(0, ${E}px, 0)`:`translate3d(${E}px, 0, 0)`})}function K(p,E){if(!t||typeof N!="number"||!h||r===void 0)return null;const D=N===r-1;if(N>=r&&E)return 0;if(D&&!E)return 1;if(!V&&!D)return null;const u=D?N+1:N-1,M=D?h[u]-h[u-1]:h[u+1]-h[u],I=p/Math.abs(M);return D?1-I:I}return{isLastSnapPoint:U,activeSnapPoint:v,shouldFade:V,getPercentageDragged:K,setActiveSnapPoint:g,activeSnapPointIndex:N,onRelease:m,onDrag:$,snapPointsOffset:h}}const Fn=()=>()=>{};function Hn(){const{direction:e,isOpen:n,shouldScaleBackground:t,setBackgroundColorOnScale:a,noBodyStyles:o}=oe(),r=i.useRef(null),s=T.useMemo(()=>document.body.style.backgroundColor,[]);function l(){return(window.innerWidth-$e)/window.innerWidth}i.useEffect(()=>{if(n&&t){r.current&&clearTimeout(r.current);const w=document.querySelector("[data-vaul-drawer-wrapper]")||document.querySelector("[vaul-drawer-wrapper]");if(!w)return;Mn(a&&!o?Ae(document.body,{background:"black"}):Fn,Ae(w,{transformOrigin:P(e)?"top":"left",transitionProperty:"transform, border-radius",transitionDuration:`${O.DURATION}s`,transitionTimingFunction:`cubic-bezier(${O.EASE.join(",")})`}));const b=Ae(w,{borderRadius:`${Et}px`,overflow:"hidden",...P(e)?{transform:`scale(${l()}) translate3d(0, calc(env(safe-area-inset-top) + 14px), 0)`}:{transform:`scale(${l()}) translate3d(calc(env(safe-area-inset-top) + 14px), 0, 0)`}});return()=>{b(),r.current=window.setTimeout(()=>{s?document.body.style.background=s:document.body.style.removeProperty("background")},O.DURATION*1e3)}}},[n,t,s])}let fe=null;function Bn({isOpen:e,modal:n,nested:t,hasBeenOpened:a,preventScrollRestoration:o,noBodyStyles:r}){const[s,l]=i.useState(()=>typeof window<"u"?window.location.href:""),w=i.useRef(0),b=i.useCallback(()=>{if(Qe()&&fe===null&&e&&!r){fe={position:document.body.style.position,top:document.body.style.top,left:document.body.style.left,height:document.body.style.height,right:"unset"};const{scrollX:g,innerHeight:y}=window;document.body.style.setProperty("position","fixed","important"),Object.assign(document.body.style,{top:`${-w.current}px`,left:`${-g}px`,right:"0px",height:"auto"}),window.setTimeout(()=>window.requestAnimationFrame(()=>{const L=y-window.innerHeight;L&&w.current>=y&&(document.body.style.top=`${-(w.current+L)}px`)}),300)}},[e]),v=i.useCallback(()=>{if(Qe()&&fe!==null&&!r){const g=-parseInt(document.body.style.top,10),y=-parseInt(document.body.style.left,10);Object.assign(document.body.style,fe),window.requestAnimationFrame(()=>{if(o&&s!==window.location.href){l(window.location.href);return}window.scrollTo(y,g)}),fe=null}},[s]);return i.useEffect(()=>{function g(){w.current=window.scrollY}return g(),window.addEventListener("scroll",g),()=>{window.removeEventListener("scroll",g)}},[]),i.useEffect(()=>{t||!a||(e?(!window.matchMedia("(display-mode: standalone)").matches&&b(),n||window.setTimeout(()=>{v()},500)):v())},[e,a,s,n,t,b,v]),{restorePositionSetting:v}}function Ct({open:e,onOpenChange:n,children:t,onDrag:a,onRelease:o,snapPoints:r,shouldScaleBackground:s=!1,setBackgroundColorOnScale:l=!0,closeThreshold:w=$n,scrollLockTimeout:b=jn,dismissible:v=!0,handleOnly:g=!1,fadeFromIndex:y=r&&r.length-1,activeSnapPoint:L,setActiveSnapPoint:U,fixed:N,modal:V=!0,onClose:h,nested:F,noBodyStyles:A,direction:m="bottom",defaultOpen:$=!1,disablePreventScroll:K=!0,snapToSequentialPoint:p=!1,preventScrollRestoration:E=!1,repositionInputs:D=!0,onAnimationEnd:j,container:u,autoFocus:M=!1}){var I,H;const[B=!1,J]=Tt({defaultProp:$,prop:e,onChange:d=>{n==null||n(d),!d&&!F&&kt(),setTimeout(()=>{j==null||j(d)},O.DURATION*1e3),d&&!V&&typeof window<"u"&&window.requestAnimationFrame(()=>{document.body.style.pointerEvents="auto"}),d||(document.body.style.pointerEvents="auto")}}),[W,Q]=i.useState(!1),[ie,xe]=i.useState(!1),[Pt,Ue]=i.useState(!1),re=i.useRef(null),he=i.useRef(null),Ee=i.useRef(null),Se=i.useRef(null),we=i.useRef(null),se=i.useRef(!1),Te=i.useRef(null),Ce=i.useRef(0),ae=i.useRef(!1),ze=i.useRef(0),f=i.useRef(null),Ve=i.useRef(((I=f.current)==null?void 0:I.getBoundingClientRect().height)||0),Ye=i.useRef(((H=f.current)==null?void 0:H.getBoundingClientRect().width)||0),Oe=i.useRef(0),At=i.useCallback(d=>{r&&d===ue.length-1&&(he.current=new Date)},[]),{activeSnapPoint:It,activeSnapPointIndex:le,setActiveSnapPoint:qe,onRelease:Mt,snapPointsOffset:ue,onDrag:$t,shouldFade:Xe,getPercentageDragged:jt}=Ln({snapPoints:r,activeSnapPointProp:L,setActiveSnapPointProp:U,drawerRef:f,fadeFromIndex:y,overlayRef:re,onSnapPointChange:At,direction:m,container:u,snapToSequentialPoint:p});Cn({isDisabled:!B||ie||!V||Pt||!W||!D||!K});const{restorePositionSetting:kt}=Bn({isOpen:B,modal:V,nested:F,hasBeenOpened:W,preventScrollRestoration:E,noBodyStyles:A});function ve(){return(window.innerWidth-$e)/window.innerWidth}function Lt(d){var R,S;!v&&!r||f.current&&!f.current.contains(d.target)||(Ve.current=((R=f.current)==null?void 0:R.getBoundingClientRect().height)||0,Ye.current=((S=f.current)==null?void 0:S.getBoundingClientRect().width)||0,xe(!0),Ee.current=new Date,yt()&&window.addEventListener("touchend",()=>se.current=!1,{once:!0}),d.target.setPointerCapture(d.pointerId),Ce.current=P(m)?d.pageY:d.pageX)}function Ge(d,R){var S,C;let x=d;const Y=(S=window.getSelection())==null?void 0:S.toString(),k=f.current?De(f.current,m):null,z=new Date;if(x.hasAttribute("data-vaul-no-drag")||x.closest("[data-vaul-no-drag]"))return!1;if(m==="right"||m==="left")return!0;if(he.current&&z.getTime()-he.current.getTime()<500)return!1;if(k!==null&&(m==="bottom"?k>0:k<0))return!0;if(Y&&Y.length>0)return!1;if(z.getTime()-((C=we.current)==null?void 0:C.getTime())<b&&k===0||R)return we.current=z,!1;for(;x;){if(x.scrollHeight>x.clientHeight){if(x.scrollTop!==0)return we.current=new Date,!1;if(x.getAttribute("role")==="dialog")return!0}x=x.parentNode}return!0}function Ft(d){if(f.current&&ie){const R=m==="bottom"||m==="right"?1:-1,S=(Ce.current-(P(m)?d.pageY:d.pageX))*R,C=S>0,x=r&&!v&&!C;if(x&&le===0)return;const Y=Math.abs(S),k=document.querySelector("[data-vaul-drawer-wrapper]"),z=m==="bottom"||m==="top"?Ve.current:Ye.current;let q=Y/z;const ee=jt(Y,C);if(ee!==null&&(q=ee),x&&q>=1||!se.current&&!Ge(d.target,C))return;if(f.current.classList.add(Ie),se.current=!0,_(f.current,{transition:"none"}),_(re.current,{transition:"none"}),r&&$t({draggedDistance:S}),C&&!r){const G=In(S),ye=Math.min(G*-1,0)*R;_(f.current,{transform:P(m)?`translate3d(0, ${ye}px, 0)`:`translate3d(${ye}px, 0, 0)`});return}const Z=1-q;if((Xe||y&&le===y-1)&&(a==null||a(d,q),_(re.current,{opacity:`${Z}`,transition:"none"},!0)),k&&re.current&&s){const G=Math.min(ve()+q*(1-ve()),1),ye=8-q*8,Je=Math.max(0,14-q*14);_(k,{borderRadius:`${ye}px`,transform:P(m)?`scale(${G}) translate3d(0, ${Je}px, 0)`:`scale(${G}) translate3d(${Je}px, 0, 0)`,transition:"none"},!0)}if(!r){const G=Y*R;_(f.current,{transform:P(m)?`translate3d(0, ${G}px, 0)`:`translate3d(${G}px, 0, 0)`})}}}i.useEffect(()=>{var d;function R(){if(!f.current||!D)return;const S=document.activeElement;if(Me(S)||ae.current){var C;const x=((C=window.visualViewport)==null?void 0:C.height)||0,Y=window.innerHeight;let k=Y-x;const z=f.current.getBoundingClientRect().height||0,q=z>Y*.8;Oe.current||(Oe.current=z);const ee=f.current.getBoundingClientRect().top;if(Math.abs(ze.current-k)>60&&(ae.current=!ae.current),r&&r.length>0&&ue&&le){const Z=ue[le]||0;k+=Z}if(ze.current=k,z>x||ae.current){const Z=f.current.getBoundingClientRect().height;let G=Z;Z>x&&(G=x-(q?ee:$e)),N?f.current.style.height=`${Z-Math.max(k,0)}px`:f.current.style.height=`${Math.max(G,x-ee)}px`}else f.current.style.height=`${Oe.current}px`;r&&r.length>0&&!ae.current?f.current.style.bottom="0px":f.current.style.bottom=`${Math.max(k,0)}px`}}return(d=window.visualViewport)==null||d.addEventListener("resize",R),()=>{var S;return(S=window.visualViewport)==null?void 0:S.removeEventListener("resize",R)}},[le,r,ue]);function ce(d){Ht(),h==null||h(),d||J(!1),setTimeout(()=>{r&&qe(r[0])},O.DURATION*1e3)}function Ke(){if(!f.current)return;const d=document.querySelector("[data-vaul-drawer-wrapper]"),R=De(f.current,m);_(f.current,{transform:"translate3d(0, 0, 0)",transition:`transform ${O.DURATION}s cubic-bezier(${O.EASE.join(",")})`}),_(re.current,{transition:`opacity ${O.DURATION}s cubic-bezier(${O.EASE.join(",")})`,opacity:"1"}),s&&R&&R>0&&B&&_(d,{borderRadius:`${Et}px`,overflow:"hidden",...P(m)?{transform:`scale(${ve()}) translate3d(0, calc(env(safe-area-inset-top) + 14px), 0)`,transformOrigin:"top"}:{transform:`scale(${ve()}) translate3d(calc(env(safe-area-inset-top) + 14px), 0, 0)`,transformOrigin:"left"},transitionProperty:"transform, border-radius",transitionDuration:`${O.DURATION}s`,transitionTimingFunction:`cubic-bezier(${O.EASE.join(",")})`},!0)}function Ht(){!ie||!f.current||(f.current.classList.remove(Ie),se.current=!1,xe(!1),Se.current=new Date)}function Bt(d){if(!ie||!f.current)return;f.current.classList.remove(Ie),se.current=!1,xe(!1),Se.current=new Date;const R=De(f.current,m);if(!Ge(d.target,!1)||!R||Number.isNaN(R)||Ee.current===null)return;const S=Se.current.getTime()-Ee.current.getTime(),C=Ce.current-(P(m)?d.pageY:d.pageX),x=Math.abs(C)/S;if(x>.05&&(Ue(!0),setTimeout(()=>{Ue(!1)},200)),r){Mt({draggedDistance:C*(m==="bottom"||m==="right"?1:-1),closeDrawer:ce,velocity:x,dismissible:v}),o==null||o(d,!0);return}if(m==="bottom"||m==="right"?C>0:C<0){Ke(),o==null||o(d,!0);return}if(x>xt){ce(),o==null||o(d,!1);return}var Y;const k=Math.min((Y=f.current.getBoundingClientRect().height)!=null?Y:0,window.innerHeight);var z;const q=Math.min((z=f.current.getBoundingClientRect().width)!=null?z:0,window.innerWidth),ee=m==="left"||m==="right";if(Math.abs(R)>=(ee?q:k)*w){ce(),o==null||o(d,!1);return}o==null||o(d,!0),Ke()}i.useEffect(()=>(B&&(_(document.documentElement,{scrollBehavior:"auto"}),he.current=new Date),()=>{An(document.documentElement,"scrollBehavior")}),[B]);function Wt(d){const R=d?(window.innerWidth-te)/window.innerWidth:1,S=d?-te:0;Te.current&&window.clearTimeout(Te.current),_(f.current,{transition:`transform ${O.DURATION}s cubic-bezier(${O.EASE.join(",")})`,transform:`scale(${R}) translate3d(0, ${S}px, 0)`}),!d&&f.current&&(Te.current=setTimeout(()=>{const C=De(f.current,m);_(f.current,{transition:"none",transform:P(m)?`translate3d(0, ${C}px, 0)`:`translate3d(${C}px, 0, 0)`})},500))}function Ut(d,R){if(R<0)return;const S=(window.innerWidth-te)/window.innerWidth,C=S+R*(1-S),x=-te+R*te;_(f.current,{transform:P(m)?`scale(${C}) translate3d(0, ${x}px, 0)`:`scale(${C}) translate3d(${x}px, 0, 0)`,transition:"none"})}function zt(d,R){const S=P(m)?window.innerHeight:window.innerWidth,C=R?(S-te)/S:1,x=R?-te:0;R&&_(f.current,{transition:`transform ${O.DURATION}s cubic-bezier(${O.EASE.join(",")})`,transform:P(m)?`scale(${C}) translate3d(0, ${x}px, 0)`:`scale(${C}) translate3d(${x}px, 0, 0)`})}return i.createElement(fn,{defaultOpen:$,onOpenChange:d=>{!v&&!d||(d?Q(!0):ce(!0),J(d))},open:B},i.createElement(vt.Provider,{value:{activeSnapPoint:It,snapPoints:r,setActiveSnapPoint:qe,drawerRef:f,overlayRef:re,onOpenChange:n,onPress:Lt,onRelease:Bt,onDrag:Ft,dismissible:v,handleOnly:g,isOpen:B,isDragging:ie,shouldFade:Xe,closeDrawer:ce,onNestedDrag:Ut,onNestedOpenChange:Wt,onNestedRelease:zt,keyboardIsOpen:ae,modal:V,snapPointsOffset:ue,direction:m,shouldScaleBackground:s,setBackgroundColorOnScale:l,noBodyStyles:A,container:u,autoFocus:M}},t))}const Ot=i.forwardRef(function({...e},n){const{overlayRef:t,snapPoints:a,onRelease:o,shouldFade:r,isOpen:s,modal:l}=oe(),w=Dt(n,t),b=a&&a.length>0;return l?i.createElement(gn,{onMouseUp:o,ref:w,"data-vaul-overlay":"","data-vaul-snap-points":s&&b?"true":"false","data-vaul-snap-points-overlay":s&&r?"true":"false",...e}):(typeof window<"u"&&window.requestAnimationFrame(()=>{document.body.style.pointerEvents="auto"}),null)});Ot.displayName="Drawer.Overlay";const Nt=i.forwardRef(function({onPointerDownOutside:e,style:n,onOpenAutoFocus:t,...a},o){const{drawerRef:r,onPress:s,onRelease:l,onDrag:w,keyboardIsOpen:b,snapPointsOffset:v,modal:g,isOpen:y,direction:L,snapPoints:U,container:N,handleOnly:V,autoFocus:h}=oe(),[F,A]=i.useState(!1),m=Dt(o,r),$=i.useRef(null),K=i.useRef(null),p=i.useRef(!1),E=U&&U.length>0;Hn();const D=(u,M,I=0)=>{if(p.current)return!0;const H=Math.abs(u.y),B=Math.abs(u.x),J=B>H,W=["bottom","right"].includes(M)?1:-1;if(M==="left"||M==="right"){if(!(u.x*W<0)&&B>=0&&B<=I)return J}else if(!(u.y*W<0)&&H>=0&&H<=I)return!J;return p.current=!0,!0};i.useEffect(()=>{E&&window.requestAnimationFrame(()=>{A(!0)})},[]);function j(u){$.current=null,p.current=!1,l(u)}return i.createElement(hn,{"data-vaul-drawer-direction":L,"data-vaul-drawer":"","data-vaul-delayed-snap-points":F?"true":"false","data-vaul-snap-points":y&&E?"true":"false","data-vaul-custom-container":N?"true":"false",...a,ref:m,style:v&&v.length>0?{"--snap-point-height":`${v[0]}px`,...n}:n,onPointerDown:u=>{V||(a.onPointerDown==null||a.onPointerDown.call(a,u),$.current={x:u.pageX,y:u.pageY},s(u))},onOpenAutoFocus:u=>{t==null||t(u),h||u.preventDefault()},onPointerDownOutside:u=>{if(e==null||e(u),!g||u.defaultPrevented){u.preventDefault();return}b.current&&(b.current=!1)},onFocusOutside:u=>{if(!g){u.preventDefault();return}},onPointerMove:u=>{if(K.current=u,V||(a.onPointerMove==null||a.onPointerMove.call(a,u),!$.current))return;const M=u.pageY-$.current.y,I=u.pageX-$.current.x,H=u.pointerType==="touch"?10:2;D({x:I,y:M},L,H)?w(u):(Math.abs(I)>H||Math.abs(M)>H)&&($.current=null)},onPointerUp:u=>{a.onPointerUp==null||a.onPointerUp.call(a,u),$.current=null,p.current=!1,l(u)},onPointerOut:u=>{a.onPointerOut==null||a.onPointerOut.call(a,u),j(K.current)},onContextMenu:u=>{a.onContextMenu==null||a.onContextMenu.call(a,u),j(K.current)}})});Nt.displayName="Drawer.Content";const Wn=250,Un=120,_t=i.forwardRef(function({preventCycle:e=!1,children:n,...t},a){const{closeDrawer:o,isDragging:r,snapPoints:s,activeSnapPoint:l,setActiveSnapPoint:w,dismissible:b,handleOnly:v,isOpen:g,onPress:y,onDrag:L}=oe(),U=i.useRef(null),N=i.useRef(!1);function V(){if(N.current){A();return}window.setTimeout(()=>{h()},Un)}function h(){if(r||e||N.current){A();return}if(A(),(!s||s.length===0)&&b){o();return}if(l===s[s.length-1]&&b){o();return}const $=s.findIndex(p=>p===l);if($===-1)return;const K=s[$+1];w(K)}function F(){U.current=window.setTimeout(()=>{N.current=!0},Wn)}function A(){window.clearTimeout(U.current),N.current=!1}return i.createElement("div",{onClick:V,onPointerCancel:A,onPointerDown:m=>{v&&y(m),F()},onPointerMove:m=>{v&&L(m)},ref:a,"data-vaul-drawer-visible":g?"true":"false","data-vaul-handle":"","aria-hidden":"true",...t},i.createElement("span",{"data-vaul-handle-hitarea":"","aria-hidden":"true"},n))});_t.displayName="Drawer.Handle";function zn({onDrag:e,onOpenChange:n,...t}){const{onNestedDrag:a,onNestedOpenChange:o,onNestedRelease:r}=oe();if(!a)throw new Error("Drawer.NestedRoot must be placed in another drawer");return i.createElement(Ct,{nested:!0,onClose:()=>{o(!1)},onDrag:(s,l)=>{a(s,l),e==null||e(s,l)},onOpenChange:s=>{s&&o(s)},onRelease:r,...t})}function Vn(e){const n=oe(),{container:t=n.container,...a}=e;return i.createElement(pn,{container:t,...a})}const me={Root:Ct,NestedRoot:zn,Content:Nt,Overlay:Ot,Trigger:mn,Portal:Vn,Handle:_t,Close:yn,Title:wn,Description:vn},Zn=()=>c.jsxs("div",{className:"relative",children:[c.jsxs("p",{children:[c.jsxs("span",{className:"info info-text wall-pad",children:["External library ",c.jsx("span",{className:"font-bold",children:"$ pnpm i vaul"})]})," ","Drawer component for React."," ",c.jsx("a",{href:"https://vaul.emilkowal.ski/",className:"underline",target:"_blank",children:"All documentaiton"})," ","made by"," ",c.jsx("a",{href:"https://emilkowal.ski/",className:"underline",target:"_blank",children:"Emil Kowalski"}),"."]}),c.jsx("div",{children:c.jsxs(me.Root,{shouldScaleBackground:!0,children:[c.jsx(me.Trigger,{asChild:!0,children:c.jsx(tn,{children:"Open Drawer"})}),c.jsx(me.Overlay,{className:"fixed inset-0 bg-black/40"}),c.jsx(me.Portal,{children:c.jsxs(me.Content,{className:"bg-gray-100 flex flex-col rounded-t-[10px] h-full mt-24 max-h-[96%] fixed bottom-0 left-0 right-0",children:[c.jsx("div",{className:"mx-auto w-6 h-0.5 flex-shrink-0 rounded-full bg-accents-3 mb-2 mt-1"}),c.jsx(nn,{passDiv:!0,container:"smash",children:c.jsxs("div",{children:[c.jsx("h2",{children:"Drawer for React."}),c.jsx("p",{children:"This component can be used as a Dialog replacement on mobile and tablet devices."}),c.jsxs("p",{children:["It comes unstyled, has gesture-driven animations, and is made by"," ",c.jsx("a",{href:"https://emilkowal.ski/",className:"underline",target:"_blank",children:"Emil Kowalski"}),"."]}),c.jsxs("p",{children:["It uses"," ",c.jsx("a",{href:"https://www.radix-ui.com/docs/primitives/components/dialog",className:"underline",target:"_blank",children:"Radix's Dialog primitive"})," ","under the hood and is inspired by"," ",c.jsx("a",{href:"https://twitter.com/devongovett/status/1674470185783402496",className:"underline",target:"_blank",children:"this tweet."})]})]})})]})})]})})]});typeof window<"u"&&window.document&&window.document.createElement&&document.documentElement.setAttribute("data-storyloaded","");export{Zn as Default};
