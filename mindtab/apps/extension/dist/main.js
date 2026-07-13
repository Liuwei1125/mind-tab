import{j as e,c as z}from"./globals.js";import{r as o,R as T}from"./index.js";import{P as $}from"./PopupPage.js";import{O as A}from"./OptionsPage.js";import"./middleware.js";/**
 * @license lucide-react v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const k=(...a)=>a.filter((t,s,l)=>!!t&&t.trim()!==""&&l.indexOf(t)===s).join(" ").trim();/**
 * @license lucide-react v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const R=a=>a.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase();/**
 * @license lucide-react v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const I=a=>a.replace(/^([A-Z])|[\s-_]+(\w)/g,(t,s,l)=>l?l.toUpperCase():s.toLowerCase());/**
 * @license lucide-react v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const N=a=>{const t=I(a);return t.charAt(0).toUpperCase()+t.slice(1)};/**
 * @license lucide-react v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var y={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const P=a=>{for(const t in a)if(t.startsWith("aria-")||t==="role"||t==="title")return!0;return!1},L=o.createContext({}),E=()=>o.useContext(L),W=o.forwardRef(({color:a,size:t,strokeWidth:s,absoluteStrokeWidth:l,className:c="",children:i,iconNode:n,...h},u)=>{const{size:x=24,strokeWidth:j=2,absoluteStrokeWidth:m=!1,color:r="currentColor",className:p=""}=E()??{},g=l??m?Number(s??j)*24/Number(t??x):s??j;return o.createElement("svg",{ref:u,...y,width:t??x??y.width,height:t??x??y.height,stroke:a??r,strokeWidth:g,className:k("lucide",p,c),...!i&&!P(h)&&{"aria-hidden":"true"},...h},[...n.map(([_,S])=>o.createElement(_,S)),...Array.isArray(i)?i:[i]])});/**
 * @license lucide-react v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const d=(a,t)=>{const s=o.forwardRef(({className:l,...c},i)=>o.createElement(W,{ref:i,iconNode:t,className:k(`lucide-${R(N(a))}`,`lucide-${a}`,l),...c}));return s.displayName=N(a),s};/**
 * @license lucide-react v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const q=[["path",{d:"M12 7v14",key:"1akyts"}],["path",{d:"M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z",key:"ruj8y"}]],f=d("book-open",q);/**
 * @license lucide-react v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const D=[["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M16 2v4",key:"4m81vk"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",key:"1hopcy"}],["path",{d:"M3 10h18",key:"8toen8"}]],b=d("calendar",D);/**
 * @license lucide-react v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const O=[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]],w=d("check",O);/**
 * @license lucide-react v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const V=[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]],Z=d("chevron-down",V);/**
 * @license lucide-react v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const B=[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]],G=d("chevron-right",B);/**
 * @license lucide-react v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const H=[["path",{d:"m18 15-6-6-6 6",key:"153udz"}]],F=d("chevron-up",H);/**
 * @license lucide-react v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const J=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 6v6l4 2",key:"mmk7yg"}]],U=d("clock",J);/**
 * @license lucide-react v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const K=[["path",{d:"M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242",key:"1pljnt"}],["path",{d:"M16 14v6",key:"1j4efv"}],["path",{d:"M8 14v6",key:"17c4r9"}],["path",{d:"M12 16v6",key:"c8a4gj"}]],Q=d("cloud-rain",K);/**
 * @license lucide-react v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const X=[["path",{d:"M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242",key:"1pljnt"}],["path",{d:"M8 15h.01",key:"a7atzg"}],["path",{d:"M8 19h.01",key:"puxtts"}],["path",{d:"M12 17h.01",key:"p32p05"}],["path",{d:"M12 21h.01",key:"h35vbk"}],["path",{d:"M16 15h.01",key:"rnfrdf"}],["path",{d:"M16 19h.01",key:"1vcnzz"}]],Y=d("cloud-snow",X);/**
 * @license lucide-react v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ee=[["path",{d:"M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z",key:"p7xjir"}]],te=d("cloud",ee);/**
 * @license lucide-react v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const se=[["path",{d:"M15 6a9 9 0 0 0-9 9V3",key:"1cii5b"}],["circle",{cx:"18",cy:"6",r:"3",key:"1h7g24"}],["circle",{cx:"6",cy:"18",r:"3",key:"fqmcym"}]],ae=d("git-branch",se);/**
 * @license lucide-react v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ne=[["path",{d:"m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7",key:"132q7q"}],["rect",{x:"2",y:"4",width:"20",height:"16",rx:"2",key:"izxlao"}]],ce=d("mail",ne);/**
 * @license lucide-react v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const oe=[["path",{d:"M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719",key:"1sd12s"}]],C=d("message-circle",oe);/**
 * @license lucide-react v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ie=[["path",{d:"M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401",key:"kfwtm"}]],le=d("moon",ie);/**
 * @license lucide-react v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const re=[["path",{d:"M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z",key:"10ikf1"}]],de=d("play",re);/**
 * @license lucide-react v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const me=[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]],he=d("plus",me);/**
 * @license lucide-react v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ue=[["path",{d:"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",key:"1357e3"}],["path",{d:"M3 3v5h5",key:"1xhq8a"}]],pe=d("rotate-ccw",ue);/**
 * @license lucide-react v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const xe=[["path",{d:"M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915",key:"1i5ecw"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]],je=d("settings",xe);/**
 * @license lucide-react v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ge=[["path",{d:"M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z",key:"1s2grr"}],["path",{d:"M20 2v4",key:"1rf3ol"}],["path",{d:"M22 4h-4",key:"gwowj6"}],["circle",{cx:"4",cy:"20",r:"2",key:"6kqj1y"}]],ve=d("sparkles",ge);/**
 * @license lucide-react v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ye=[["circle",{cx:"12",cy:"12",r:"4",key:"4exip2"}],["path",{d:"M12 2v2",key:"tus03m"}],["path",{d:"M12 20v2",key:"1lh1kg"}],["path",{d:"m4.93 4.93 1.41 1.41",key:"149t6j"}],["path",{d:"m17.66 17.66 1.41 1.41",key:"ptbguv"}],["path",{d:"M2 12h2",key:"1t8f8n"}],["path",{d:"M20 12h2",key:"1q8mjw"}],["path",{d:"m6.34 17.66-1.41 1.41",key:"1m8zz5"}],["path",{d:"m19.07 4.93-1.41 1.41",key:"1shlcs"}]],v=d("sun",ye);/**
 * @license lucide-react v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ne=[["path",{d:"M10 11v6",key:"nco0om"}],["path",{d:"M14 11v6",key:"outv1u"}],["path",{d:"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6",key:"miytrc"}],["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2",key:"e791ji"}]],ke=d("trash-2",Ne);/**
 * @license lucide-react v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const fe=[["path",{d:"m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5",key:"ftymec"}],["rect",{x:"2",y:"6",width:"14",height:"12",rx:"2",key:"158x01"}]],be=d("video",fe);/**
 * @license lucide-react v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const we=[["path",{d:"M12.8 19.6A2 2 0 1 0 14 16H2",key:"148xed"}],["path",{d:"M17.5 8a2.5 2.5 0 1 1 2 4H2",key:"1u4tom"}],["path",{d:"M9.8 4.4A2 2 0 1 1 11 8H2",key:"75valh"}]],Ce=d("wind",we);/**
 * @license lucide-react v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Me=[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]],_e=d("x",Me);/**
 * @license lucide-react v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Se=[["path",{d:"M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",key:"1xq2db"}]],ze=d("zap",Se),M=o.createContext({theme:"light",toggleTheme:()=>{}}),Te=()=>o.useContext(M),$e=({children:a})=>{const[t,s]=o.useState(()=>typeof window<"u"&&localStorage.getItem("mindtab-theme")||"light");o.useEffect(()=>{document.documentElement.setAttribute("data-theme",t),localStorage.setItem("mindtab-theme",t)},[t]);const l=()=>{s(c=>c==="light"?"dark":"light")};return e.jsx(M.Provider,{value:{theme:t,toggleTheme:l},children:a})},Ae=()=>{const[a,t]=o.useState(()=>{const i=localStorage.getItem("mindtab-todos");return i?JSON.parse(i):[{id:"1",text:"完成状态管理方案对比文档",completed:!1},{id:"2",text:"重构 CartContext 为 Zustand store",completed:!1},{id:"3",text:"编写单元测试覆盖 useReducer 逻辑",completed:!1}]});return o.useEffect(()=>{localStorage.setItem("mindtab-todos",JSON.stringify(a))},[a]),{todos:a,addTodo:i=>{i.trim()&&t([...a,{id:Date.now().toString(),text:i,completed:!1}])},toggleTodo:i=>{t(a.map(n=>n.id===i?{...n,completed:!n.completed}:n))},deleteTodo:i=>{t(a.filter(n=>n.id!==i))}}},Re=()=>{const[a,t]=o.useState([]),[s,l]=o.useState(!1),[c,i]=o.useState("GPT-4o"),[n,h]=o.useState("");return{messages:a,isLoading:s,selectedModel:c,setSelectedModel:i,models:["GPT-4o","Claude 3.5","Gemini 1.5","Llama 3"],sendMessage:async j=>{if(j.trim()){t([...a,{role:"user",content:j}]),l(!0),h("");try{await new Promise(p=>setTimeout(p,500));const m=["我已经分析了您的工作上下文，关于 React 状态管理，我推荐使用 Zustand，它简洁高效。","好的，我来帮您总结今天的研究内容，并提供学习建议。","理解了！我来帮您整理相关的学习资源和最佳实践。","根据您的工作记忆，我整理了以下几点建议供您参考："],r=m[Math.floor(Math.random()*m.length)];for(let p=0;p<=r.length;p++)await new Promise(g=>setTimeout(g,30)),h(r.slice(0,p));t(p=>[...p,{role:"assistant",content:r}])}catch{t(r=>[...r,{role:"assistant",content:"抱歉，暂时无法获取回答。"}])}finally{l(!1),h("")}}},currentResponse:n}},Ie=()=>{const[a,t]=o.useState("下午工作模式");return o.useEffect(()=>{const s=new Date().getHours();s>=5&&s<12?t("上午工作模式"):s>=12&&s<14?t("午休时间"):s>=14&&s<18?t("下午工作模式"):s>=18&&s<22?t("晚间模式"):t("深夜模式")},[]),e.jsxs("div",{className:"period-badge",children:[e.jsx("span",{className:"dot"}),a]})},Pe=()=>{const[a,t]=o.useState(!1),[s,l]=o.useState(!1),c=[{title:"React 官方文档 - useState & useReducer",domain:"react.dev",summary:"深入理解 React Hooks 的基本用法和最佳实践"},{title:"Zustand vs Jotai vs Redux Toolkit - 2024 对比",domain:"dev.to",summary:"三大状态管理方案的优缺点对比分析"},{title:"Stack Overflow - React State Management",domain:"stackoverflow.com",summary:"社区热议的状态管理解决方案"}];return a?null:e.jsxs("div",{className:`ai-context-card ${a?"dismissed":""}`,children:[e.jsxs("div",{className:"ai-context-header",children:[e.jsxs("div",{className:"ai-context-title",children:[e.jsx("span",{className:"icon",children:"✨"}),e.jsx("span",{children:"AI 工作记忆"})]}),e.jsx("span",{className:"ai-context-timestamp",children:"5 分钟前更新"})]}),e.jsxs("div",{className:"ai-context-body",children:[e.jsx("span",{className:"line",children:"您今天在研究 React 状态管理"}),e.jsxs("span",{className:"line",children:["我已整理 ",c.length," 个相关页面摘要和资源"]})]}),e.jsxs("div",{className:"ai-context-actions",children:[e.jsxs("button",{className:"btn btn-primary btn-sm",onClick:()=>l(!s),children:[s?"收起详情":"查看详情",s?e.jsx(F,{size:14}):e.jsx(Z,{size:14})]}),e.jsx("button",{className:"btn btn-sm",onClick:()=>t(!0),children:"忽略"})]}),e.jsx("div",{className:`ai-context-details ${s?"expanded":""}`,children:c.map((i,n)=>e.jsx("div",{className:"detail-item",children:e.jsxs("div",{children:[e.jsx("div",{className:"detail-title",children:i.title}),e.jsx("div",{className:"detail-domain",children:i.domain}),e.jsx("div",{className:"detail-summary",children:i.summary})]})},n))})]})},Le=()=>{const{messages:a,isLoading:t,selectedModel:s,setSelectedModel:l,models:c,sendMessage:i,currentResponse:n}=Re(),[h,u]=o.useState(""),x=async m=>{m.preventDefault(),await i(h),u("")},j=a.length>0?a[a.length-1]:null;return e.jsxs("div",{className:"ai-dialog-section",children:[e.jsxs("div",{className:"ai-context-hint",children:[e.jsx("span",{children:"AI 已理解你今天的工作上下文"})," · React 状态管理"]}),e.jsxs("form",{onSubmit:x,className:"dialog-input-wrapper",children:[e.jsx("input",{type:"text",value:h,onChange:m=>u(m.target.value),placeholder:"问我任何问题，或输入指令...",className:"dialog-input"}),e.jsxs("div",{className:"model-selector",children:[e.jsx("select",{value:s,onChange:m=>l(m.target.value),className:"model-select",children:c.map(m=>e.jsx("option",{value:m,children:m},m))}),e.jsx("button",{type:"submit",className:"send-btn",disabled:t||!h.trim(),children:e.jsx(G,{size:16})})]})]}),e.jsx("div",{className:"quick-commands",children:["总结今天的研究","我接下来该做什么","整理我的标签页","推荐学习资源"].map((m,r)=>e.jsx("button",{onClick:()=>u(m),className:"quick-cmd",children:m},r))}),e.jsxs("div",{className:"ai-response-area",children:[t&&n&&e.jsxs("div",{className:"ai-response visible",children:[e.jsx("span",{children:n}),e.jsx("span",{className:"typing-cursor"})]}),!t&&j&&j.role==="assistant"&&e.jsx("div",{className:"ai-response visible",children:j.content})]})]})},Ee=()=>{const a=[{title:"React 官方文档 - useState & useReducer",domain:"react.dev"},{title:"Zustand vs Jotai vs Redux Toolkit - 2024 对比",domain:"dev.to"}],t=[{time:"10:00",title:"产品评审会"},{time:"14:00",title:"代码审查"},{time:"16:30",title:"团队周会"}];return e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"column-card card",children:[e.jsx("div",{className:"section-title",children:"工作记忆详情"}),a.map((s,l)=>e.jsxs("div",{className:"memory-page",children:[e.jsx("div",{className:"page-title",children:s.title}),e.jsx("div",{className:"page-domain",children:s.domain})]},l))]}),e.jsxs("div",{className:"column-card card",children:[e.jsx("div",{className:"section-title",children:"今日日程"}),t.map((s,l)=>e.jsxs("div",{className:"schedule-item",children:[e.jsx("span",{className:"schedule-time",children:s.time}),e.jsx("span",{className:"schedule-title",children:s.title})]},l))]})]})},We=()=>{const{todos:a,addTodo:t,toggleTodo:s,deleteTodo:l}=Ae(),[c,i]=o.useState(""),[n,h]=o.useState(25*60),[u,x]=o.useState(!1);o.useEffect(()=>{let r;return u&&n>0?r=setInterval(()=>h(p=>p-1),1e3):n===0&&x(!1),()=>clearInterval(r)},[u,n]);const j=r=>{const p=Math.floor(r/60),g=r%60;return`${p.toString().padStart(2,"0")}:${g.toString().padStart(2,"0")}`},m=r=>{r.preventDefault(),t(c),i("")};return e.jsx(e.Fragment,{children:e.jsxs("div",{className:"column-card card",children:[e.jsxs("div",{className:"module-title",children:[e.jsx(w,{size:16,style:{color:"var(--accent-purple)"}}),"待办事项"]}),a.map(r=>e.jsxs("div",{className:"todo-item",children:[e.jsx("div",{className:`todo-checkbox ${r.completed?"checked":""}`,onClick:()=>s(r.id)}),e.jsx("span",{className:`todo-text ${r.completed?"completed":""}`,children:r.text}),e.jsx("button",{onClick:()=>l(r.id),style:{opacity:.5,cursor:"pointer"},children:e.jsx(ke,{size:14})})]},r.id)),e.jsxs("form",{onSubmit:m,className:"todo-add",children:[e.jsx("input",{type:"text",value:c,onChange:r=>i(r.target.value),placeholder:"添加新待办..."}),e.jsx("button",{type:"submit",className:"btn btn-primary btn-sm",children:e.jsx(he,{size:14})})]}),e.jsxs("div",{className:"pomodoro",children:[e.jsx("div",{className:"pomodoro-label",children:"番茄钟"}),e.jsx("div",{className:"pomodoro-time",children:j(n)}),e.jsxs("div",{className:"pomodoro-controls",children:[e.jsxs("button",{onClick:()=>x(!0),disabled:u,className:"btn btn-primary btn-sm",children:[e.jsx(de,{size:12})," 开始"]}),e.jsxs("button",{onClick:()=>{x(!1),h(25*60)},className:"btn btn-sm",children:[e.jsx(pe,{size:12})," 重置"]})]})]})]})})},qe=()=>{const[a,t]=o.useState(new Date),[s,l]=o.useState({temperature:22,condition:"cloudy",city:"北京",high:26,low:15});o.useEffect(()=>{const n=setInterval(()=>t(new Date),1e3);return()=>clearInterval(n)},[]),o.useEffect(()=>{(async()=>{try{const u=await(await fetch("https://api.open-meteo.com/v1/forecast?latitude=39.9042&longitude=116.4074&current=temperature_2m,weather_code&daily=temperature_2m_max,temperature_2m_min&timezone=Asia/Shanghai")).json(),x={0:"clear",1:"clear",2:"cloudy",3:"cloudy",45:"foggy",51:"rainy",61:"rainy",71:"snowy",95:"thunder"};l({temperature:Math.round(u.current.temperature_2m),condition:x[u.current.weather_code]||"clear",city:"北京",high:Math.round(u.daily.temperature_2m_max[0]),low:Math.round(u.daily.temperature_2m_min[0])})}catch(h){console.error("Failed to fetch weather:",h)}})()},[]);const c=()=>{const n={size:20};switch(s.condition){case"clear":return e.jsx(v,{...n,style:{color:"#fbbf24"}});case"cloudy":return e.jsx(te,{...n,style:{color:"#9ca3af"}});case"rainy":return e.jsx(Q,{...n,style:{color:"#60a5fa"}});case"snowy":return e.jsx(Y,{...n,style:{color:"#67e8f9"}});case"foggy":return e.jsx(Ce,{...n,style:{color:"#9ca3af"}});default:return e.jsx(v,{...n,style:{color:"#fbbf24"}})}},i=[{title:"React 状态管理完全指南",source:"react.dev",reason:"官方推荐方案"},{title:"Zustand 实战技巧",source:"dev.to",reason:"最受欢迎的状态库"}];return e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"column-card card",children:[e.jsxs("div",{className:"module-title",children:[e.jsx(U,{size:16,style:{color:"var(--accent-purple)"}}),"时间和天气"]}),e.jsx("div",{style:{fontSize:"2rem",fontWeight:700,marginBottom:"4px"},children:a.toLocaleTimeString("zh-CN",{hour:"2-digit",minute:"2-digit"})}),e.jsx("div",{style:{fontSize:"0.85rem",color:"var(--text-secondary)",marginBottom:"12px"},children:a.toLocaleDateString("zh-CN",{month:"long",day:"numeric",weekday:"long"})}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"8px",marginBottom:"8px"},children:[e.jsx(c,{}),e.jsxs("span",{style:{fontSize:"1.5rem",fontWeight:600},children:[s.temperature,"°"]}),e.jsx("span",{style:{color:"var(--text-secondary)",fontSize:"0.85rem"},children:s.city})]}),e.jsxs("div",{style:{fontSize:"0.8rem",color:"var(--text-muted)"},children:[s.low,"° / ",s.high,"°"]})]}),e.jsxs("div",{className:"column-card card",children:[e.jsx("div",{className:"section-title",children:"相关资料"}),i.map((n,h)=>e.jsxs("div",{className:"resource-item",children:[e.jsx("div",{className:"res-title",children:n.title}),e.jsx("div",{className:"res-source",children:n.source}),e.jsx("div",{className:"res-reason",children:n.reason})]},h))]}),e.jsxs("div",{className:"column-card card",children:[e.jsx("div",{className:"section-title",children:"知识卡片"}),e.jsxs("div",{className:"knowledge-card",children:[e.jsx("div",{className:"knowledge-term",children:"Zustand"}),e.jsx("div",{className:"knowledge-desc",children:"一个轻量、简洁的状态管理解决方案，基于 React hooks"})]})]})]})},De=({isOpen:a,onClose:t})=>{const[s,l]=o.useState("general");return a?e.jsx("div",{className:"settings-overlay",onClick:t,children:e.jsxs("div",{className:"settings-panel",onClick:c=>c.stopPropagation(),children:[e.jsxs("div",{className:"settings-header",children:[e.jsx("h3",{children:"设置"}),e.jsx("button",{onClick:t,className:"btn btn-sm",children:e.jsx(_e,{size:16})})]}),e.jsx("div",{className:"settings-tabs",children:[{id:"general",label:"基本设置"},{id:"widgets",label:"小组件"},{id:"layout",label:"布局"}].map(c=>e.jsx("button",{onClick:()=>l(c.id),className:`settings-tab ${s===c.id?"active":""}`,children:c.label},c.id))}),e.jsxs("div",{className:"settings-content",children:[s==="general"&&e.jsxs("div",{className:"settings-section",children:[e.jsxs("div",{className:"settings-field",children:[e.jsx("label",{children:"AI 模型"}),e.jsxs("select",{className:"settings-input",children:[e.jsx("option",{value:"gpt4",children:"GPT-4o"}),e.jsx("option",{value:"claude",children:"Claude 3.5"}),e.jsx("option",{value:"gemini",children:"Gemini 1.5"})]})]}),e.jsxs("div",{className:"settings-field",children:[e.jsx("label",{children:"API Key"}),e.jsx("input",{type:"password",placeholder:"sk-...",className:"settings-input"})]}),e.jsxs("div",{className:"settings-item",children:[e.jsx("span",{children:"标签页访问权限"}),e.jsx("span",{className:"badge-success",children:"已授权"})]})]}),s==="widgets"&&e.jsx("div",{className:"settings-section",children:[{id:"weather",name:"天气",icon:v},{id:"memory",name:"工作记忆",icon:ve},{id:"todo",name:"待办清单",icon:w},{id:"pomodoro",name:"番茄钟",icon:ze},{id:"habit",name:"习惯打卡",icon:b},{id:"notes",name:"知识卡片",icon:f}].map(c=>e.jsxs("div",{className:"widget-item",children:[e.jsxs("div",{className:"widget-info",children:[e.jsx(c.icon,{size:16}),e.jsx("span",{children:c.name})]}),e.jsx("button",{className:"btn-link-danger",children:"移除"})]},c.id))}),s==="layout"&&e.jsxs("div",{className:"settings-section",children:[e.jsxs("div",{className:"settings-field",children:[e.jsx("label",{children:"布局预览"}),e.jsx("div",{className:"layout-preview",children:["左栏","中栏","右栏"].map((c,i)=>e.jsx("div",{className:`layout-col ${i===1?"active":""}`,children:c},c))})]}),e.jsxs("div",{className:"settings-field",children:[e.jsx("label",{children:"显示比例"}),e.jsxs("select",{className:"settings-input",children:[e.jsx("option",{value:"1:1:1",children:"1:1:1 均等"}),e.jsx("option",{value:"1:2:1",children:"左:中:右 1:2:1"}),e.jsx("option",{value:"2:1:1",children:"左:中:右 2:1:1"})]})]})]})]}),e.jsxs("div",{className:"settings-footer",children:[e.jsx("button",{className:"btn btn-sm",children:"创建组件"}),e.jsx("button",{className:"btn btn-sm",children:"我的组件"}),e.jsxs("button",{className:"btn btn-primary btn-sm",children:[e.jsx(C,{size:14})," AI 工坊"]})]})]})}):null},Oe=()=>{const a=[{icon:ae,href:"https://github.com",label:"GitHub"},{icon:be,href:"https://youtube.com",label:"YouTube"},{icon:C,href:"https://twitter.com",label:"Twitter"},{icon:ce,href:"https://mail.google.com",label:"Gmail"},{icon:b,href:"https://calendar.google.com",label:"Calendar"},{icon:f,href:"https://chrome.google.com/webstore",label:"Chrome Store"}];return e.jsx("div",{className:"quick-links",children:a.map((t,s)=>e.jsx("a",{href:t.href,target:"_blank",rel:"noopener noreferrer",className:"quick-link",title:t.label,children:e.jsx(t.icon,{size:18})},s))})};function Ve(){const[a,t]=o.useState(!1),{theme:s,toggleTheme:l}=Te();return e.jsxs("div",{className:"app-container",children:[e.jsxs("div",{className:"top-bar",children:[e.jsx(Ie,{}),e.jsxs("div",{className:"top-bar-actions",children:[e.jsxs("button",{className:`theme-toggle-btn ${s==="dark"?"active":""}`,onClick:l,"aria-label":"切换主题",children:[e.jsx(v,{size:16,className:"theme-icon-light"}),e.jsx(le,{size:16,className:"theme-icon-dark"})]}),e.jsx("button",{onClick:()=>t(!0),className:"btn btn-sm","aria-label":"打开设置",children:e.jsx(je,{size:14})})]})]}),e.jsx(Pe,{}),e.jsx(Le,{}),e.jsxs("div",{className:"three-columns",children:[e.jsx(Ee,{}),e.jsx(We,{}),e.jsx(qe,{})]}),e.jsx(Oe,{}),e.jsx(De,{isOpen:a,onClose:()=>t(!1)})]})}function Ze(){return e.jsx($e,{children:e.jsx(Ve,{})})}function Be(){o.useEffect(()=>{console.log("[MindTab] Application mounted")},[]);const a=window.location.pathname;return a.includes("popup")?e.jsx($,{}):a.includes("options")?e.jsx(A,{}):e.jsx(Ze,{})}z.createRoot(document.getElementById("root")).render(e.jsx(T.StrictMode,{children:e.jsx(Be,{})}));
