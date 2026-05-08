import{j as e,c as z}from"./globals.js";import{r as c,R as T}from"./index.js";import{P as $}from"./PopupPage.js";import{O as A}from"./OptionsPage.js";import"./middleware.js";/**
 * @license lucide-react v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const k=(...s)=>s.filter((t,a,i)=>!!t&&t.trim()!==""&&i.indexOf(t)===a).join(" ").trim();/**
 * @license lucide-react v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const R=s=>s.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase();/**
 * @license lucide-react v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const I=s=>s.replace(/^([A-Z])|[\s-_]+(\w)/g,(t,a,i)=>i?i.toUpperCase():a.toLowerCase());/**
 * @license lucide-react v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const N=s=>{const t=I(s);return t.charAt(0).toUpperCase()+t.slice(1)};/**
 * @license lucide-react v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var y={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const P=s=>{for(const t in s)if(t.startsWith("aria-")||t==="role"||t==="title")return!0;return!1},L=c.createContext({}),E=()=>c.useContext(L),W=c.forwardRef(({color:s,size:t,strokeWidth:a,absoluteStrokeWidth:i,className:d="",children:o,iconNode:n,...m},u)=>{const{size:x=24,strokeWidth:j=2,absoluteStrokeWidth:h=!1,color:l="currentColor",className:p=""}=E()??{},g=i??h?Number(a??j)*24/Number(t??x):a??j;return c.createElement("svg",{ref:u,...y,width:t??x??y.width,height:t??x??y.height,stroke:s??l,strokeWidth:g,className:k("lucide",p,d),...!o&&!P(m)&&{"aria-hidden":"true"},...m},[...n.map(([_,S])=>c.createElement(_,S)),...Array.isArray(o)?o:[o]])});/**
 * @license lucide-react v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const r=(s,t)=>{const a=c.forwardRef(({className:i,...d},o)=>c.createElement(W,{ref:o,iconNode:t,className:k(`lucide-${R(N(s))}`,`lucide-${s}`,i),...d}));return a.displayName=N(s),a};/**
 * @license lucide-react v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const q=[["path",{d:"M12 7v14",key:"1akyts"}],["path",{d:"M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z",key:"ruj8y"}]],f=r("book-open",q);/**
 * @license lucide-react v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const D=[["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M16 2v4",key:"4m81vk"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",key:"1hopcy"}],["path",{d:"M3 10h18",key:"8toen8"}]],b=r("calendar",D);/**
 * @license lucide-react v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const O=[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]],w=r("check",O);/**
 * @license lucide-react v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const V=[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]],Z=r("chevron-down",V);/**
 * @license lucide-react v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const B=[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]],G=r("chevron-right",B);/**
 * @license lucide-react v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const H=[["path",{d:"m18 15-6-6-6 6",key:"153udz"}]],F=r("chevron-up",H);/**
 * @license lucide-react v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const J=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 6v6l4 2",key:"mmk7yg"}]],U=r("clock",J);/**
 * @license lucide-react v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const K=[["path",{d:"M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242",key:"1pljnt"}],["path",{d:"M16 14v6",key:"1j4efv"}],["path",{d:"M8 14v6",key:"17c4r9"}],["path",{d:"M12 16v6",key:"c8a4gj"}]],Q=r("cloud-rain",K);/**
 * @license lucide-react v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const X=[["path",{d:"M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242",key:"1pljnt"}],["path",{d:"M8 15h.01",key:"a7atzg"}],["path",{d:"M8 19h.01",key:"puxtts"}],["path",{d:"M12 17h.01",key:"p32p05"}],["path",{d:"M12 21h.01",key:"h35vbk"}],["path",{d:"M16 15h.01",key:"rnfrdf"}],["path",{d:"M16 19h.01",key:"1vcnzz"}]],Y=r("cloud-snow",X);/**
 * @license lucide-react v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ee=[["path",{d:"M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z",key:"p7xjir"}]],te=r("cloud",ee);/**
 * @license lucide-react v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const se=[["path",{d:"M15 6a9 9 0 0 0-9 9V3",key:"1cii5b"}],["circle",{cx:"18",cy:"6",r:"3",key:"1h7g24"}],["circle",{cx:"6",cy:"18",r:"3",key:"fqmcym"}]],ae=r("git-branch",se);/**
 * @license lucide-react v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ne=[["path",{d:"m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7",key:"132q7q"}],["rect",{x:"2",y:"4",width:"20",height:"16",rx:"2",key:"izxlao"}]],ce=r("mail",ne);/**
 * @license lucide-react v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const oe=[["path",{d:"M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719",key:"1sd12s"}]],M=r("message-circle",oe);/**
 * @license lucide-react v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ie=[["path",{d:"M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401",key:"kfwtm"}]],le=r("moon",ie);/**
 * @license lucide-react v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const re=[["path",{d:"M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z",key:"10ikf1"}]],de=r("play",re);/**
 * @license lucide-react v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const me=[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]],he=r("plus",me);/**
 * @license lucide-react v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ue=[["path",{d:"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",key:"1357e3"}],["path",{d:"M3 3v5h5",key:"1xhq8a"}]],pe=r("rotate-ccw",ue);/**
 * @license lucide-react v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const xe=[["path",{d:"M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915",key:"1i5ecw"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]],je=r("settings",xe);/**
 * @license lucide-react v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ge=[["path",{d:"M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z",key:"1s2grr"}],["path",{d:"M20 2v4",key:"1rf3ol"}],["path",{d:"M22 4h-4",key:"gwowj6"}],["circle",{cx:"4",cy:"20",r:"2",key:"6kqj1y"}]],ve=r("sparkles",ge);/**
 * @license lucide-react v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ye=[["circle",{cx:"12",cy:"12",r:"4",key:"4exip2"}],["path",{d:"M12 2v2",key:"tus03m"}],["path",{d:"M12 20v2",key:"1lh1kg"}],["path",{d:"m4.93 4.93 1.41 1.41",key:"149t6j"}],["path",{d:"m17.66 17.66 1.41 1.41",key:"ptbguv"}],["path",{d:"M2 12h2",key:"1t8f8n"}],["path",{d:"M20 12h2",key:"1q8mjw"}],["path",{d:"m6.34 17.66-1.41 1.41",key:"1m8zz5"}],["path",{d:"m19.07 4.93-1.41 1.41",key:"1shlcs"}]],v=r("sun",ye);/**
 * @license lucide-react v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ne=[["path",{d:"M10 11v6",key:"nco0om"}],["path",{d:"M14 11v6",key:"outv1u"}],["path",{d:"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6",key:"miytrc"}],["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2",key:"e791ji"}]],ke=r("trash-2",Ne);/**
 * @license lucide-react v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const fe=[["path",{d:"m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5",key:"ftymec"}],["rect",{x:"2",y:"6",width:"14",height:"12",rx:"2",key:"158x01"}]],be=r("video",fe);/**
 * @license lucide-react v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const we=[["path",{d:"M12.8 19.6A2 2 0 1 0 14 16H2",key:"148xed"}],["path",{d:"M17.5 8a2.5 2.5 0 1 1 2 4H2",key:"1u4tom"}],["path",{d:"M9.8 4.4A2 2 0 1 1 11 8H2",key:"75valh"}]],Me=r("wind",we);/**
 * @license lucide-react v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ce=[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]],_e=r("x",Ce);/**
 * @license lucide-react v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Se=[["path",{d:"M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",key:"1xq2db"}]],ze=r("zap",Se),C=c.createContext({theme:"light",toggleTheme:()=>{}}),Te=()=>c.useContext(C),$e=({children:s})=>{const[t,a]=c.useState(()=>localStorage.getItem("mindtab-theme")||"light");c.useEffect(()=>{document.documentElement.setAttribute("data-theme",t),localStorage.setItem("mindtab-theme",t)},[t]);const i=()=>{a(d=>d==="light"?"dark":"light")};return e.jsx(C.Provider,{value:{theme:t,toggleTheme:i},children:s})},Ae=()=>{const[s,t]=c.useState(()=>{const o=localStorage.getItem("mindtab-todos");return o?JSON.parse(o):[{id:"1",text:"完成状态管理方案对比文档",completed:!1},{id:"2",text:"重构 CartContext 为 Zustand store",completed:!1},{id:"3",text:"编写单元测试覆盖 useReducer 逻辑",completed:!1}]});return c.useEffect(()=>{localStorage.setItem("mindtab-todos",JSON.stringify(s))},[s]),{todos:s,addTodo:o=>{o.trim()&&t([...s,{id:Date.now().toString(),text:o,completed:!1}])},toggleTodo:o=>{t(s.map(n=>n.id===o?{...n,completed:!n.completed}:n))},deleteTodo:o=>{t(s.filter(n=>n.id!==o))}}},Re=()=>{const[s,t]=c.useState([]),[a,i]=c.useState(!1),[d,o]=c.useState("GPT-4o"),[n,m]=c.useState("");return{messages:s,isLoading:a,selectedModel:d,setSelectedModel:o,models:["GPT-4o","Claude 3.5","Gemini 1.5","Llama 3"],sendMessage:async j=>{if(j.trim()){t([...s,{role:"user",content:j}]),i(!0),m("");try{await new Promise(p=>setTimeout(p,500));const h=["我已经分析了您的工作上下文，关于 React 状态管理，我推荐使用 Zustand，它简洁高效。","好的，我来帮您总结今天的研究内容，并提供学习建议。","理解了！我来帮您整理相关的学习资源和最佳实践。","根据您的工作记忆，我整理了以下几点建议供您参考："],l=h[Math.floor(Math.random()*h.length)];for(let p=0;p<=l.length;p++)await new Promise(g=>setTimeout(g,30)),m(l.slice(0,p));t(p=>[...p,{role:"assistant",content:l}])}catch{t(l=>[...l,{role:"assistant",content:"抱歉，暂时无法获取回答。"}])}finally{i(!1),m("")}}},currentResponse:n}},Ie=()=>{const[s,t]=c.useState("下午工作模式");return c.useEffect(()=>{const a=new Date().getHours();a>=5&&a<12?t("上午工作模式"):a>=12&&a<14?t("午休时间"):a>=14&&a<18?t("下午工作模式"):a>=18&&a<22?t("晚间模式"):t("深夜模式")},[]),e.jsxs("div",{className:"period-badge",children:[e.jsx("span",{className:"dot"}),s]})},Pe=()=>{const[s,t]=c.useState(!1),[a,i]=c.useState(!1),d=[{title:"React 官方文档 - useState & useReducer",domain:"react.dev",summary:"深入理解 React Hooks 的基本用法和最佳实践"},{title:"Zustand vs Jotai vs Redux Toolkit - 2024 对比",domain:"dev.to",summary:"三大状态管理方案的优缺点对比分析"},{title:"Stack Overflow - React State Management",domain:"stackoverflow.com",summary:"社区热议的状态管理解决方案"}];return s?null:e.jsxs("div",{className:`ai-context-card ${s?"dismissed":""}`,children:[e.jsxs("div",{className:"ai-context-header",children:[e.jsxs("div",{className:"ai-context-title",children:[e.jsx("span",{className:"icon",children:"✨"}),e.jsx("span",{children:"AI 工作记忆"})]}),e.jsx("span",{className:"ai-context-timestamp",children:"5 分钟前更新"})]}),e.jsxs("div",{className:"ai-context-body",children:[e.jsx("span",{className:"line",children:"您今天在研究 React 状态管理"}),e.jsxs("span",{className:"line",children:["我已整理 ",d.length," 个相关页面摘要和资源"]})]}),e.jsxs("div",{className:"ai-context-actions",children:[e.jsxs("button",{className:"btn btn-primary btn-sm",onClick:()=>i(!a),children:[a?"收起详情":"查看详情",a?e.jsx(F,{size:14}):e.jsx(Z,{size:14})]}),e.jsx("button",{className:"btn btn-sm",onClick:()=>t(!0),children:"忽略"})]}),e.jsx("div",{className:`ai-context-details ${a?"expanded":""}`,children:d.map((o,n)=>e.jsx("div",{className:"detail-item",children:e.jsxs("div",{children:[e.jsx("div",{className:"detail-title",children:o.title}),e.jsx("div",{className:"detail-domain",children:o.domain}),e.jsx("div",{className:"detail-summary",children:o.summary})]})},n))})]})},Le=()=>{const{messages:s,isLoading:t,selectedModel:a,setSelectedModel:i,models:d,sendMessage:o,currentResponse:n}=Re(),[m,u]=c.useState(""),x=async h=>{h.preventDefault(),await o(m),u("")},j=s.length>0?s[s.length-1]:null;return e.jsxs("div",{className:"ai-dialog-section",children:[e.jsxs("div",{className:"ai-context-hint",children:[e.jsx("span",{children:"AI 已理解你今天的工作上下文"})," · React 状态管理"]}),e.jsxs("form",{onSubmit:x,className:"dialog-input-wrapper",children:[e.jsx("input",{type:"text",value:m,onChange:h=>u(h.target.value),placeholder:"问我任何问题，或输入指令...",className:"dialog-input"}),e.jsxs("div",{className:"model-selector",children:[e.jsx("select",{value:a,onChange:h=>i(h.target.value),className:"model-select",children:d.map(h=>e.jsx("option",{value:h,children:h},h))}),e.jsx("button",{type:"submit",className:"send-btn",disabled:t||!m.trim(),children:e.jsx(G,{size:16})})]})]}),e.jsx("div",{className:"quick-commands",children:["总结今天的研究","我接下来该做什么","整理我的标签页","推荐学习资源"].map((h,l)=>e.jsx("button",{onClick:()=>u(h),className:"quick-cmd",children:h},l))}),e.jsxs("div",{className:"ai-response-area",children:[t&&n&&e.jsxs("div",{className:"ai-response visible",children:[e.jsx("span",{children:n}),e.jsx("span",{className:"typing-cursor"})]}),!t&&j&&j.role==="assistant"&&e.jsx("div",{className:"ai-response visible",children:j.content})]})]})},Ee=()=>{const s=[{title:"React 官方文档 - useState & useReducer",domain:"react.dev"},{title:"Zustand vs Jotai vs Redux Toolkit - 2024 对比",domain:"dev.to"}],t=[{time:"10:00",title:"产品评审会"},{time:"14:00",title:"代码审查"},{time:"16:30",title:"团队周会"}];return e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"column-card card",children:[e.jsx("div",{className:"section-title",children:"工作记忆详情"}),s.map((a,i)=>e.jsxs("div",{className:"memory-page",children:[e.jsx("div",{className:"page-title",children:a.title}),e.jsx("div",{className:"page-domain",children:a.domain})]},i))]}),e.jsxs("div",{className:"column-card card",children:[e.jsx("div",{className:"section-title",children:"今日日程"}),t.map((a,i)=>e.jsxs("div",{className:"schedule-item",children:[e.jsx("span",{className:"schedule-time",children:a.time}),e.jsx("span",{className:"schedule-title",children:a.title})]},i))]})]})},We=()=>{const{todos:s,addTodo:t,toggleTodo:a,deleteTodo:i}=Ae(),[d,o]=c.useState(""),[n,m]=c.useState(25*60),[u,x]=c.useState(!1);c.useEffect(()=>{let l;return u&&n>0?l=setInterval(()=>m(p=>p-1),1e3):n===0&&x(!1),()=>clearInterval(l)},[u,n]);const j=l=>{const p=Math.floor(l/60),g=l%60;return`${p.toString().padStart(2,"0")}:${g.toString().padStart(2,"0")}`},h=l=>{l.preventDefault(),t(d),o("")};return e.jsx(e.Fragment,{children:e.jsxs("div",{className:"column-card card",children:[e.jsxs("div",{className:"module-title",children:[e.jsx(w,{size:16,style:{color:"var(--accent-purple)"}}),"待办事项"]}),s.map(l=>e.jsxs("div",{className:"todo-item",children:[e.jsx("div",{className:`todo-checkbox ${l.completed?"checked":""}`,onClick:()=>a(l.id)}),e.jsx("span",{className:`todo-text ${l.completed?"completed":""}`,children:l.text}),e.jsx("button",{onClick:()=>i(l.id),style:{opacity:.5,cursor:"pointer"},children:e.jsx(ke,{size:14})})]},l.id)),e.jsxs("form",{onSubmit:h,className:"todo-add",children:[e.jsx("input",{type:"text",value:d,onChange:l=>o(l.target.value),placeholder:"添加新待办..."}),e.jsx("button",{type:"submit",className:"btn btn-primary btn-sm",children:e.jsx(he,{size:14})})]}),e.jsxs("div",{className:"pomodoro",children:[e.jsx("div",{className:"pomodoro-label",children:"番茄钟"}),e.jsx("div",{className:"pomodoro-time",children:j(n)}),e.jsxs("div",{className:"pomodoro-controls",children:[e.jsxs("button",{onClick:()=>x(!0),disabled:u,className:"btn btn-primary btn-sm",children:[e.jsx(de,{size:12})," 开始"]}),e.jsxs("button",{onClick:()=>{x(!1),m(25*60)},className:"btn btn-sm",children:[e.jsx(pe,{size:12})," 重置"]})]})]})]})})},qe=()=>{const[s,t]=c.useState(new Date),[a,i]=c.useState({temperature:22,condition:"cloudy",city:"北京",high:26,low:15});c.useEffect(()=>{const n=setInterval(()=>t(new Date),1e3);return()=>clearInterval(n)},[]),c.useEffect(()=>{(async()=>{try{const u=await(await fetch("https://api.open-meteo.com/v1/forecast?latitude=39.9042&longitude=116.4074&current=temperature_2m,weather_code&daily=temperature_2m_max,temperature_2m_min&timezone=Asia/Shanghai")).json(),x={0:"clear",1:"clear",2:"cloudy",3:"cloudy",45:"foggy",51:"rainy",61:"rainy",71:"snowy",95:"thunder"};i({temperature:Math.round(u.current.temperature_2m),condition:x[u.current.weather_code]||"clear",city:"北京",high:Math.round(u.daily.temperature_2m_max[0]),low:Math.round(u.daily.temperature_2m_min[0])})}catch(m){console.error("Failed to fetch weather:",m)}})()},[]);const d=()=>{const n={size:20};switch(a.condition){case"clear":return e.jsx(v,{...n,style:{color:"#fbbf24"}});case"cloudy":return e.jsx(te,{...n,style:{color:"#9ca3af"}});case"rainy":return e.jsx(Q,{...n,style:{color:"#60a5fa"}});case"snowy":return e.jsx(Y,{...n,style:{color:"#67e8f9"}});case"foggy":return e.jsx(Me,{...n,style:{color:"#9ca3af"}});default:return e.jsx(v,{...n,style:{color:"#fbbf24"}})}},o=[{title:"React 状态管理完全指南",source:"react.dev",reason:"官方推荐方案"},{title:"Zustand 实战技巧",source:"dev.to",reason:"最受欢迎的状态库"}];return e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"column-card card",children:[e.jsxs("div",{className:"module-title",children:[e.jsx(U,{size:16,style:{color:"var(--accent-purple)"}}),"时间和天气"]}),e.jsx("div",{style:{fontSize:"2rem",fontWeight:700,marginBottom:"4px"},children:s.toLocaleTimeString("zh-CN",{hour:"2-digit",minute:"2-digit"})}),e.jsx("div",{style:{fontSize:"0.85rem",color:"var(--text-secondary)",marginBottom:"12px"},children:s.toLocaleDateString("zh-CN",{month:"long",day:"numeric",weekday:"long"})}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"8px",marginBottom:"8px"},children:[e.jsx(d,{}),e.jsxs("span",{style:{fontSize:"1.5rem",fontWeight:600},children:[a.temperature,"°"]}),e.jsx("span",{style:{color:"var(--text-secondary)",fontSize:"0.85rem"},children:a.city})]}),e.jsxs("div",{style:{fontSize:"0.8rem",color:"var(--text-muted)"},children:[a.low,"° / ",a.high,"°"]})]}),e.jsxs("div",{className:"column-card card",children:[e.jsx("div",{className:"section-title",children:"相关资料"}),o.map((n,m)=>e.jsxs("div",{className:"resource-item",children:[e.jsx("div",{className:"res-title",children:n.title}),e.jsx("div",{className:"res-source",children:n.source}),e.jsx("div",{className:"res-reason",children:n.reason})]},m))]}),e.jsxs("div",{className:"column-card card",children:[e.jsx("div",{className:"section-title",children:"知识卡片"}),e.jsxs("div",{className:"knowledge-card",children:[e.jsx("div",{className:"knowledge-term",children:"Zustand"}),e.jsx("div",{className:"knowledge-desc",children:"一个轻量、简洁的状态管理解决方案，基于 React hooks"})]})]})]})},De=({isOpen:s,onClose:t})=>{const[a,i]=c.useState("general"),{theme:d,toggleTheme:o}=Te();return s?e.jsx("div",{className:"settings-overlay",onClick:t,children:e.jsxs("div",{className:"settings-panel",onClick:n=>n.stopPropagation(),children:[e.jsxs("div",{className:"settings-header",children:[e.jsx("h3",{children:"设置"}),e.jsx("button",{onClick:t,className:"btn btn-sm",children:e.jsx(_e,{size:16})})]}),e.jsx("div",{className:"settings-tabs",children:[{id:"general",label:"基本设置"},{id:"widgets",label:"小组件"},{id:"layout",label:"布局"}].map(n=>e.jsx("button",{onClick:()=>i(n.id),className:`settings-tab ${a===n.id?"active":""}`,children:n.label},n.id))}),e.jsxs("div",{className:"settings-content",children:[a==="general"&&e.jsxs("div",{className:"settings-section",children:[e.jsxs("div",{className:"settings-item",children:[e.jsxs("div",{className:"settings-item-content",children:[e.jsx("span",{className:"settings-item-label",children:"主题模式"}),e.jsx("span",{className:"settings-item-desc",children:d==="light"?"浅色模式":"深色模式"})]}),e.jsxs("button",{className:`theme-toggle-btn ${d==="dark"?"active":""}`,onClick:o,"aria-label":"切换主题",children:[e.jsx(v,{size:16,className:"theme-icon-light"}),e.jsx(le,{size:16,className:"theme-icon-dark"})]})]}),e.jsxs("div",{className:"settings-field",children:[e.jsx("label",{children:"AI 模型"}),e.jsxs("select",{className:"settings-input",children:[e.jsx("option",{value:"gpt4",children:"GPT-4o"}),e.jsx("option",{value:"claude",children:"Claude 3.5"}),e.jsx("option",{value:"gemini",children:"Gemini 1.5"})]})]}),e.jsxs("div",{className:"settings-field",children:[e.jsx("label",{children:"API Key"}),e.jsx("input",{type:"password",placeholder:"sk-...",className:"settings-input"})]}),e.jsxs("div",{className:"settings-item",children:[e.jsx("span",{children:"标签页访问权限"}),e.jsx("span",{className:"badge-success",children:"已授权"})]})]}),a==="widgets"&&e.jsx("div",{className:"settings-section",children:[{id:"weather",name:"天气",icon:v},{id:"memory",name:"工作记忆",icon:ve},{id:"todo",name:"待办清单",icon:w},{id:"pomodoro",name:"番茄钟",icon:ze},{id:"habit",name:"习惯打卡",icon:b},{id:"notes",name:"知识卡片",icon:f}].map(n=>e.jsxs("div",{className:"widget-item",children:[e.jsxs("div",{className:"widget-info",children:[e.jsx(n.icon,{size:16}),e.jsx("span",{children:n.name})]}),e.jsx("button",{className:"btn-link-danger",children:"移除"})]},n.id))}),a==="layout"&&e.jsxs("div",{className:"settings-section",children:[e.jsxs("div",{className:"settings-field",children:[e.jsx("label",{children:"布局预览"}),e.jsx("div",{className:"layout-preview",children:["左栏","中栏","右栏"].map((n,m)=>e.jsx("div",{className:`layout-col ${m===1?"active":""}`,children:n},n))})]}),e.jsxs("div",{className:"settings-field",children:[e.jsx("label",{children:"显示比例"}),e.jsxs("select",{className:"settings-input",children:[e.jsx("option",{value:"1:1:1",children:"1:1:1 均等"}),e.jsx("option",{value:"1:2:1",children:"左:中:右 1:2:1"}),e.jsx("option",{value:"2:1:1",children:"左:中:右 2:1:1"})]})]})]})]}),e.jsxs("div",{className:"settings-footer",children:[e.jsx("button",{className:"btn btn-sm",children:"创建组件"}),e.jsx("button",{className:"btn btn-sm",children:"我的组件"}),e.jsxs("button",{className:"btn btn-primary btn-sm",children:[e.jsx(M,{size:14})," AI 工坊"]})]})]})}):null},Oe=()=>{const s=[{icon:ae,href:"https://github.com",label:"GitHub"},{icon:be,href:"https://youtube.com",label:"YouTube"},{icon:M,href:"https://twitter.com",label:"Twitter"},{icon:ce,href:"https://mail.google.com",label:"Gmail"},{icon:b,href:"https://calendar.google.com",label:"Calendar"},{icon:f,href:"https://chrome.google.com/webstore",label:"Chrome Store"}];return e.jsx("div",{className:"quick-links",children:s.map((t,a)=>e.jsx("a",{href:t.href,target:"_blank",rel:"noopener noreferrer",className:"quick-link",title:t.label,children:e.jsx(t.icon,{size:18})},a))})};function Ve(){const[s,t]=c.useState(!1);return e.jsx($e,{children:e.jsxs("div",{className:"app-container",children:[e.jsx(Ie,{}),e.jsx(Pe,{}),e.jsx(Le,{}),e.jsxs("div",{className:"three-columns",children:[e.jsx(Ee,{}),e.jsx(We,{}),e.jsx(qe,{})]}),e.jsx(Oe,{}),e.jsx("div",{className:"settings-trigger",children:e.jsx("button",{onClick:()=>t(!0),className:"btn btn-sm","aria-label":"打开设置",children:e.jsx(je,{size:14})})}),e.jsx(De,{isOpen:s,onClose:()=>t(!1)})]})})}function Ze(){c.useEffect(()=>{console.log("[MindTab] Application mounted")},[]);const s=window.location.pathname;return s.includes("popup")?e.jsx($,{}):s.includes("options")?e.jsx(A,{}):e.jsx(Ve,{})}z.createRoot(document.getElementById("root")).render(e.jsx(T.StrictMode,{children:e.jsx(Ze,{})}));
