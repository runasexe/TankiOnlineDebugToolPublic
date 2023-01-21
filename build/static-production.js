(()=>{var __webpack_modules__={522:e=>{e.exports={debugName:"tankiOnlineDebug",styleLoggerProject:"color: blue;",styleLoggerModule:"color: green;"}},312:e=>{e.exports={moduleListenerName:"tankiOnlineDebugModuleListener"}},185:e=>{e.exports={projectName:"Tanki Online Debug"}},166:(e,t,n)=>{const{Module:l}=n(305);e.exports={moduleCreateCore:(...e)=>{const t=new l("core",{loaded:!0,info:{versionProduction:null,versionDevelopment:null}});return t.exports=t,Object.defineProperty(t,"__isCore",{writable:!1,value:!0}),Object.defineProperty(t,"__isModule",{writable:!1,value:!0}),Object.defineProperty(t,"__dataType",{writable:!1,value:"Module"}),e.map((e=>e.call(t,t,t))),t}}},725:(e,t,n)=>{const l=n(598);l.info.versionProduction=!0,e.exports=l},598:(e,t,n)=>{const{moduleCreateCore:l}=n(166),{defaultModuleCreateSignals:s}=n(262);e.exports=l((e=>{e.info.name="Tanki Online: Core",e.info.version="1.0.1",e.info.versionAlpha=!0,e.info.versionBeta=!1,e.units.register(n(38)),e.units.register(n(334)),e.units.register(n(305)),e.units.register(n(267)),e.units.register(n(453)),e.units.register(n(324)),e.units.register(n(446)),e.units.register(n(737))}),s)},324:(e,t,n)=>{const{getInterpreterType:l}=n(134),s={application:e=>{e.units.signal("application"+l()),e.units.destroy()},applicationUnknown:e=>{consoleContext.error("Can't actions to run: Unknown interpreter")}};e.exports={unitSignals:s}},446:(e,t,n)=>{const{globalContext:l}=n(134),{CoreEvent:s}=n(334);class a extends s{constructor(){super("moduleListenerStop",{cancelable:!0})}}a.eventType="core.moduleListenerStop";const o={applicationBrowser:e=>{e.units.signal("applicationPrev");const t=async()=>{await e.modules.signals.signalModulesLoad(e),e.event.dispatchEvent(new e.ModuleListenerStopEvent)&&e.moduleListener.listenStop(),e.units.signal("applicationPost")};l instanceof EventTarget?l.document&&l.document.readyState&&"complete"==l.document.readyState?t():l.addEventListener("load",t):t()}};e.exports={ModuleListenerStopEvent:a,unitSignals:o}},737:(e,t,n)=>{const{consoleContext:l}=n(134),s={applicationNodeJS:e=>{l.error("Can't actions to run in NodeJS")}};e.exports={unitSignals:s}},334:(e,t,n)=>{const{consoleContext:l}=n(134);class s extends EventTarget{}class a extends Event{detail=null;constructor(e,t){let n=null;t&&t.detail&&(n=t.detail,delete t.detail),super(e,t),this.detail=n}}class o extends a{module=null;constructor(e,t,n){e&&e.id?super(e.id+"."+t,n):(l.error("Send ModuleEvent with empty module:",e),super("NoModuleEvent",n),this.eventName=t),this.module=e}}class r extends o{constructor(e,t){super(r.coreContext,e,t)}}const i={init:e=>{r.coreContext=e,e.event=new e.EventManager}};e.exports={EventManager:s,GlobalEvent:a,ModuleEvent:o,CoreEvent:r,unitSignals:i}},453:(e,t,n)=>{const{getValue:l}=n(134),s=n(354);const a={init:e=>{e.i18n=new e.Translator},load:e=>{e.i18n.mutate(s),e.i18n.mutateUpdate()}};e.exports={Translator:class{languareData=null;languareCurrent=null;languareMutations=null;constructor(e){var t;this.languareData={},this.languareMutations={},this.languareCurrent=e||((t=l("navigator"))?t.language:null)||"default"}import(e){let t=null,n=null;for(let l in e){for(t=!0,n=e[l];t;){t=!1;for(let e in n)if("string"==typeof n[e]||"number"==typeof n[e])n[e.toLocaleLowerCase()]=n[e],delete n[e];else if("object"==typeof n[e]&&null!==n[e]){t=!0;for(let t in n[e])n[e.toLocaleLowerCase()+"."+t.toLocaleLowerCase()]=n[e][t],delete n[e][t]}}this.languareData[l]=this.languareData[l]||{},Object.assign(this.languareData[l],n)}}mutate(e){Object.assign(this.languareMutations,e),this.languare=this.languare}mutateUpdate(e){for(e=e||this.languareCurrent;e in this.languareMutations;)e=this.languareMutations[e];this.languareCurrent=e}get languare(){return this.languareCurrent}set languare(e){this.mutateUpdate(e)}get(e){return this.languareData[this.languareCurrent]=this.languareData[this.languareCurrent]||{},this.languareData[this.languareCurrent][e]||null}set(e,t){this.languareData[this.languareCurrent]=this.languareData[this.languareCurrent]||{},this.languareData[this.languareCurrent][e]=t}},unitSignals:a}},38:(e,t,n)=>{const{projectName:l}=n(185),{styleLoggerProject:s,styleLoggerModule:a}=n(522),{consoleContext:o}=n(134);const r={init:e=>{e.logger=new e.LoggerBrowser(l,null,s)},event:e=>{e.event.addEventListener(e.ModuleImportEvent.eventType,(t=>{let n=t.module||null;n&&(n.logger=new e.LoggerBrowser(n.id,e.logger,a))}))}};e.exports={LoggerBrowser:class{outData=null;console=null;outStyle=null;constructor(e,t,n){this.outData=e||null,this.console=t||o||null,this.outStyle=n||null;let l={};Object.getOwnPropertyNames(this.console).filter((e=>"function"==typeof this.console[e]),this).map((e=>{let t=l[e]={writable:!1};-1!=["log","info","warn","error"].indexOf(e)?t.value=((...t)=>{let n=t;this.outData&&n.length&&(n="string"==typeof n[0]?["%c["+this.outData+"]%c "+n[0],this.outStyle,null].concat(n.slice(1)):["%c["+this.outData+"]%c",this.outStyle,null].concat(n)),this.console[e].apply(this.console,n)}).bind(this):t.value=((...t)=>{this.console[e].apply(this.console,t)}).bind(this)}),this),Object.defineProperties(this,l)}},unitSignals:r}},267:(e,t,n)=>{const{connectContext:l,globalContext:s}=n(134),{Module:a}=n(305),{moduleListenerName:o}=n(312),{GlobalEvent:r,CoreEvent:i}=n(334),{sharedCore:u}=n(841);class c extends i{recv=null;recvPrevious=null;constructor(e,t){super("ModuleListener.recv",{cancelable:!0}),this.recv=e||null,this.recvPrevious=t||null}}c.eventType="core.ModuleListener.recv";class d extends i{module=null;recvPrevious=null;constructor(e,t){super("ModuleListener.recvModule",{cancelable:!0}),this.module=e||null,this.recvPrevious=t||null}}d.eventType="core.ModuleListener.recvModule";class p extends i{moduleTemplate=null;recvPrevious=null;constructor(e,t){super("ModuleListener.recvModuleTemplate",{cancelable:!0}),this.moduleTemplate=e||null,this.recvPrevious=t||null}}p.eventType="core.ModuleListener.recvModuleTemplate";class g extends i{data=null;recvPrevious=null;constructor(e,t){super("ModuleListener.recvData",{cancelable:!0}),this.data=e||null,this.recvPrevious=t||null}}g.eventType="core.ModuleListener.recvData";class h extends i{module=null;recvPrevious=null;constructor(e,t){super("ModuleListener.processModule",{cancelable:!0}),this.module=e||null,this.recvPrevious=t||null}}h.eventType="core.ModuleListener.processModule";class m extends r{constructor(e,t){super(e+"ModuleRequest",{cancelable:!0}),this.registerCallback=t}}class b extends i{module=null;constructor(e){super("moduleImport",{cancelable:!0}),this.module=e}}b.eventType="core.moduleImport";class f extends i{module=null;constructor(e){super("signalModuleImport",{cancelable:!0}),this.module=e}}f.eventType="core.signalModuleImport";class _ extends EventTarget{coreContext=null;constructor(e){super(),this.coreContext=e}listenStart(){}listenStop(){}callRecvObject(e){this.dispatchEvent(new c(e,null))&&this.onRecvDefault(e,null)}onRecvDefault(e,t){e&&(e.__isModuleTemplate||"ModuleTemplate"==e.__dataType?this.dispatchEvent(new p(e,t))&&this.onRecvModuleTemplateDefault(e,t):e.__isModule||"Module"==e.__dataType?this.dispatchEvent(new d(e,t))&&this.onRecvModuleDefault(e,t):this.dispatchEvent(new g(e,t))&&this.onRecvDataDefault(e,t))}onRecvModuleTemplateDefault(e,t){if(!e.id)return;let n=new a(e.id);Object.defineProperty(n,"__isModule",{writable:!1,value:!0}),Object.defineProperty(n,"__dataType",{writable:!1,value:"Module"}),e.constructors&&e.constructors instanceof Array&&e.constructors.filter((e=>"function"==typeof e)).map((e=>e.call(n,n,this.coreContext))),this.dispatchEvent(new h(n,t))}onRecvModuleDefault(e,t){this.dispatchEvent(new h(e,t))}onRecvDataDefault(e,t){}}class x extends _{globalObject=null;listenerName=null;listenerCallback=null;constructor(e,t,n){super(e),this.globalObject=t||null,this.listenerName=n||null,this.listenerCallback=null}listenStart(e){this.listenerCallback||(e=e||{},this.globalObject.addEventListener(this.listenerName,this.listenerCallback=e=>{"status"in e&&(e.status=!0);let t=e.moduleTemplate||e.transferObject||null;t?this.dispatchEvent(new c(t,!1))&&this.onRecvDefault(t,!1):e.preventDefault()}),this.globalObject.dispatchEvent(new m(this.listenerName,(e=>{this.dispatchEvent(new c(e,!0))&&this.onRecvDefault(e,!0)}).bind(this))))}listenStop(){this.listenerCallback&&(this.globalObject.removeEventListener(this.listenerName,this.listenerCallback),this.listenerCallback=null)}}class v extends _{globalObject=null;listenerName=null;constructor(e,t,n){super(e),this.globalObject=t||null,this.listenerName=n||null}listenStart(e){if(e=e||{},this.globalObject[this.listenerName]){if(!(this.globalObject[this.listenerName]instanceof Array))return;this.globalObject[this.listenerName].map((e=>{this.dispatchEvent(new c(e,!0))&&this.onRecvDefault(e,!0)}),this),this.globalObject[this.listenerName]=null,delete this.globalObject[this.listenerName]}Object.defineProperty(this.globalObject,this.listenerName,{enumerable:!1,configurable:!e.permanent,writable:!1,value:(e=>{this.dispatchEvent(new c(e,!1))&&this.onRecvDefault(e,!1)}).bind(this)})}listenStop(){return delete this.globalObject[this.listenerName]}}class w extends _{constructor(e){super(e)}listenStart(e){u.coreContext=this.coreContext}installModuleTemplate(e){this.callRecvObject(e)}}_.getModuleListener=(e,t)=>u.enabled&&!u.coreContext?new w(e):l instanceof EventTarget?new x(e,l,t):new v(e,l,t);const C={init:e=>{e.moduleListener=e.ModuleListener.getModuleListener(e,o)},event:e=>{e.moduleListener.addEventListener(e.ListenerProcessModuleEvent.eventType,(async t=>{let n=t.module||null;if(n&&e.event.dispatchEvent(new e.ModuleImportEvent(n))&&(e.modules.installModule(n),e.event.dispatchEvent(new e.ProcessModuleImportEvent(n))))for(var l=0;l<e.modules.signals.signalAutoloadList.length;l++)await Promise.all(n.signals.signal(e.modules.signals.signalAutoloadList[l],e))}))},applicationPrev:e=>{e.moduleListener.listenStart()}};e.exports={ModuleListener:_,ContextModuleListener:v,EventModuleListener:x,ListenerRecvEvent:c,ListenerRecvModuleEvent:d,ListenerRecvModuleTemplateEvent:p,ListenerRecvDataEvent:g,ListenerProcessModuleEvent:h,ListenerModuleRequestEvent:m,ModuleImportEvent:b,ProcessModuleImportEvent:f,unitSignals:C}},305:e=>{class t extends Error{moduleId=null;moduleManager=null;constructor(e,t){super('Module "'+e.toString()+'" not found in ModuleManager'),this.moduleId=e||null,this.moduleManager=t||null}}class n{signals=null;moduleContext=null;constructor(e){this.signals={},this.moduleContext=e}register(e){if(e.unitSignals){for(let t in e.unitSignals)this.signals[t]=this.signals[t]||[],e.unitSignals[t]instanceof Array?this.signals[t]=this.signals[t].concat(e.unitSignals[t].filter((e=>e)).filter((e=>"function"==typeof e))):"function"==typeof e.unitSignals[t]&&this.signals[t].push(e.unitSignals[t]);delete e.unitSignals}Object.assign(this.moduleContext,e)}signal(e,...t){if(!(e in this.signals))return[];const n=this.signals[e].filter((e=>"function"==typeof e)).map((e=>e.call(this.moduleContext,this.moduleContext,...t))).filter((e=>e instanceof Promise));return delete this.signals[e],n}destroy(){this.signals={}}}class l{signals=null;moduleContext=null;constructor(e){this.signals={},this.moduleContext=e}register(e,...t){this.signals[e]=this.signals[e]||[],this.signals[e]=this.signals[e].concat(t.filter((e=>e)).filter((e=>"function"==typeof e)))}signal(e,...t){if(!(e in this.signals))return[];const n=this.signals[e].filter((e=>"function"==typeof e)).map((e=>e.call(this.moduleContext,this.moduleContext,...t))).filter((e=>e instanceof Promise));return delete this.signals[e],n}destroy(){this.signals={}}}class s{coreContext=null;moduleManager=null;signalAutoloadList=null;constructor(e,t){this.coreContext=e,this.moduleManager=t,this.signalAutoloadList=[]}signal(e,...t){let n=[];for(const l in this.moduleManager.modules)n=n.concat(this.moduleManager.modules[l].signals.signal(e,...t));return n}async signalModulesLoad(){await Promise.all(this.callModuleSignal("init")),await Promise.all(this.callModuleSignal("event")),await Promise.all(this.callModuleSignal("load")),await Promise.all(this.callModuleSignal("launch")),await Promise.all(this.callModuleSignal(["application","app","run"]))}callModuleSignal(e){"string"==typeof e&&(e=[e]),this.signalAutoloadList=this.signalAutoloadList.concat(e);let t=[];return e.map((e=>{t=t.concat(this.signal(e,this.coreContext))}),this),e.map((e=>{this.coreContext.event.dispatchEvent(new this.coreContext.CoreEvent("modules.globalTarget."+e))}),this),t}}e.exports={ModuleNotFoundError:t,UnitSignalManager:n,ModuleSignalManager:l,ModuleManagerSignalManager:s,Module:class{id=null;require=null;loaded=null;info=null;exports=null;events=null;units=null;signals=null;constructor(e,t){t=t||{},this.id=e||null,this.require=t.require||(e=>{e.exports=e}),this.loaded=t.loaded||!1,this.info=t.info||{},this.exports={},this.events=new EventTarget,this.units=new n(this),this.signals=new l(this)}},ModuleManager:class{modules=null;state=null;signals=null;coreContext=null;constructor(e){this.modules={},this.state={},this.coreContext=e,this.signals=new s(e,this),this.require=(e=>{if(!(e in this.modules))throw new t(e,this);return this.modules[e].loaded||(this.modules[e].exports={},this.modules[e].require&&this.modules[e].require.call(this.modules[e].exports,this.modules[e],this.modules[e].exports,this.require),this.modules[e].loaded=!0),this.modules[e].exports}).bind(this),this.coreContext&&this.installModule(this.coreContext)}installModule(e,t){this.modules[e.id]=e,Object.defineProperty(this,e.id,{writable:!1,value:e}),Object.defineProperty(e,"moduleManager",{writable:!1,value:this}),t&&this.require(e.id)}},unitSignals:{init:e=>{e.modules=new e.ModuleManager(e)},load:e=>{e.modules.signals.signalAutoloadList.push("preinit")}}}},784:(e,t,n)=>{e.exports=n(412).send()},412:(e,t,n)=>{const{moduleCreate:l}=n(262);e.exports=l("libHelper",((e,t)=>{e.units.register(n(865)),e.units.register(n(451)),e.units.register(n(629)),e.units.register(n(571))}))},451:e=>{class t{originalFunction=null;this=null;args=null;result=void 0;constructor(e,t,n){this.originalFunction=e,this.runtimeThis=t,this.args=n,this.result=void 0}callOriginal(){this.result=this.originalFunction.apply(this.this,this.args)}}e.exports={FunctionHook:t,FunctionHelper:class{static pathFunction(e,n,l){if(!(n in e)||"function"!=typeof e[n])return!1;const s=e[n];e[n]=function(...e){let n=new t(s,this,e);return l(n),n.result}}static pathFunctionSimpleBefore(e,t,n){if(!(t in e)||"function"!=typeof e[t])return!1;const l=e[t];e[t]=function(...e){return n.apply(this,e),l.apply(this,e)}}static pathFunctionSimpleAfter(e,t,n){if(!(t in e)||"function"!=typeof e[t])return!1;const l=e[t];e[t]=function(...e){let t=l.apply(this,e);return n.apply(this,e),t}}}}},571:(e,t,n)=>{const{domContext:l}=n(134);class s{static getRoot(e){const t=/^(?:[^\/]*:\/\/)?[^\/]+/.exec(e);return t?t[0]:e}static getBase(e){const t=/^[^?#]+\//.exec(e);return t?t[0]:e}static linkAbsolute(e,t){return e&&t?e.startsWith("//")?"https://"+e.slice(2):e.startsWith("/")?s.getRoot(t)+e:s.getBase(t)+e:null}static linkWithoutPage(e){let t=/^.*\//.exec(e);return t?t[0]:e}static getSearchInURL(e){if(!e)return null;const t=/\?([^#]*)/.exec(e);return t?t[1]:null}static getQueryVariable(e,t){let n=(s.getSearchInURL(t)||l.location.search).substring(1).split("&");for(let t=0;t<n.length;t++){let l=n[t].split("=");if(decodeURIComponent(l[0])==e)return decodeURIComponent(l[1])}return null}}e.exports={LinkHelper:s}},865:e=>{e.exports={ObjectHelper:class{static getPropertyName(e,t,n){const l=Object.getOwnPropertyNames(e).filter((e=>e.startsWith(t)));return n?l.length?l[0]:null:l}static getProperty(e,t,n){const l=Object.getOwnPropertyNames(e).filter((e=>e.startsWith(t))).map((t=>e[t]));return n?l.length?l[0]:null:l}}}},629:e=>{e.exports={FormatString:class{sourceString=null;constructor(e){this.sourceString=e||null}formatValuePython(e){return this.sourceString.replace(/{(\d+)}/g,((t,n)=>void 0!==e[n]?e[n]:t))}formatValue(e){return this.sourceString.replace(/%(\d+)/g,((t,n)=>void 0!==e[n]?e[n]:t))}toString(){return this.sourceString}}}},303:(e,t,n)=>{e.exports=n(100).send()},100:(e,t,n)=>{const{moduleCreate:l}=n(262);e.exports=l("libWebpack",((e,t)=>{e.units.register(n(315)),e.units.register(n(828))}))},828:(e,t,n)=>{const{WebpackModuleManager:l}=n(315);e.exports={AdvancedWebpackModuleManager:class extends l{getExports(e,t){const n=e.split(".").pop();this.webpackRequireList(this.searchMetadataClass(n));const l=this.searchExports(e,t);if(t)return l;const s=[];for(const e in l)s.push(l[e]);return s}searchMetadataClass(e,t){return this.searchSource('simpleName:"'+e+'"',t)}searchMetadataClassRegEx(e,t){return this.searchSourceRegEx(new RegExp('\\$metadata\\$={(?:kind:[^:]+,)?simpleName:"(?:'+(e||"[^{}]+")+')"(?:,interfaces:)?'),t)}searchSource(e,t){const n=[];for(const t in this.modules)-1!=this.modules[t].toString().indexOf(e)&&n.push(t);return t?n.shift():n}searchSourceRegEx(e,t){const n=[];for(const t in this.modules)e.test(this.modules[t].toString())&&n.push(t);return t?n.shift():n}searchExports(e,t){"string"==typeof e&&(e=e.split("."));let n={};const l=Array.from(e);let s=null;for(const e in this.installedModules)null!==this.installedModules[e].exports&&("object"!=typeof this.installedModules[e].exports&&"function"!=typeof this.installedModules[e].exports||(n[e]=this.installedModules[e].exports));for(;s=l.shift();){const e={};for(const t in n)Object.hasOwnProperty.call(n[t],s)&&null!==typeof n[t][s]&&("object"!=typeof n[t][s]&&"function"!=typeof n[t][s]||(e[t]=n[t][s]));n=e}if(t)for(const e in n)return n[e];return n}}}},315:e=>{e.exports={WebpackModuleManager:class{installedModules=null;modules=null;constructor(e){this.modules=e||{},this.installedModules=[];const t=function(e){if(this.installedModules[e])return this.installedModules[e].exports;let n=this.installedModules[e]={i:e,l:!1,exports:{}};return this.modules[e].call(n.exports,n,n.exports,t),n.l=!0,n.exports}.bind(this);t.m=this.modules,t.c=this.installedModules,this.harmonyExport=this.export=t.d=function(e,n,l){t.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:l})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,n){if(1&n&&(e=t(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;let l=Object.create(null);if(t.r(l),Object.defineProperty(l,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(let n in e)t.d(l,n,function(t){return e[t]}.bind(null,n));return l},this.getDefaultExport=t.n=function(e){let n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t.s=null,this.webpackRequire=this.__webpack_require__=t}installModule(e,t,n){if(this.modules[e]=t,n)return this.webpackRequire(e)}get __webpack_public_path__(){return this.__webpack_require__.p}set __webpack_public_path__(e){this.__webpack_require__.p=e}get publicPath(){return this.__webpack_require__.p}set publicPath(e){this.__webpack_require__.p=e}get __webpack_entry__(){return this.__webpack_require__.s}set __webpack_entry__(e){this.__webpack_require__.s=e}get entry(){return this.__webpack_require__.s}set entry(e){this.__webpack_require__.s=e}get entryModule(){return this.__webpack_require__.s}set entryModule(e){this.__webpack_require__.s=e}loadEntryModule(e){e&&(this.__webpack_require__.s=e),this.webpackRequire(this.__webpack_require__.s)}webpackRequireList(e){let t={};return e.map((e=>{t[e]=this.__webpack_require__(e)})),t}}}},127:(e,t,n)=>{e.exports=n(912).send()},912:(e,t,n)=>{const{moduleCreate:l,defaultModuleCreateSignals:s}=n(262);e.exports=l("tankionlineHooks",((e,t)=>{e.units.register(n(948)),e.units.register(n(231)),e.units.register(n(766))}),s)},948:e=>{e.exports={unitSignals:{init:(e,t)=>{e.hooks=[]},event:(e,t)=>{t.event.addEventListener("tankionlineLoader.entry.launch",(n=>{const l=t.modules.require("tankionlineWebpack").webpackData;for(const t in e.hooks){const n=e.hooks[t];n&&n.enabled&&n.callback&&n.callback(l,n)}}))}}}},766:e=>{const t={load:(e,t)=>{e.hooks.BattleMessagesHook={enabled:!0,callback:(e,n)=>{const l=t.modules.require("libHelper").FormatString,s=t.modules.require("libHelper").FunctionHelper,a=t.modules.require("libHelper").ObjectHelper,o={notifyFlagDropped:{playerMessage:new l("%0 потерял флаг"),defaultMessage:new l("Флаг потерян")},notifyFlagReturned:{playerMessage:new l("%0 возвратил флаг"),defaultMessage:new l("Флаг возвращен")}},r=e.getExports("tanks.client.battle.objects.modes.ctf.component.CaptureFlagComponent",!0),i=e.getExports("projects.tanks.multiplatform.battleservice.model.battle.team.BattleTeam",!0),u=e.getExports("tanks.client.lobby.redux.battle.hud.TeamRelation",!0),c=e.getExports("tanks.client.lobby.redux.battle.hud.BattleMessageType",!0),d=e.getExports("tanks.client.battle.hud.BattleMessagesComponent",!0),p=e.getExports("com.alternativaplatform.redux.react.LocalizedComponent",!0),g=d.prototype.getLocalizedKeyByBattleMessage_0;d.prototype.getLocalizedKeyByBattleMessage_0=function(e,...t){return e instanceof l?e:g.call(this,e,...t)};a.getPropertyName(p.prototype,"getText_").map((e=>{let t=p.prototype[e];p.prototype[e]=function(...e){return e.length&&e[0]instanceof l?e[0].formatValue(e.slice(1)):t.apply(this,e)}}));const h=a.getPropertyName(c.Companion.__proto__,"getType",!0);for(const e in o)s.pathFunctionSimpleBefore(r.prototype,a.getPropertyName(r.prototype,e,!0),(function(t,n){function l(e,t,n){return n==function(e,t){return e===t&&e!==i.NONE}(e,t)?u.ALLY:u.ENEMY}const s=(a=this.gameMode_0,r=t.teamType,d=!1,a&&a.possesedTankTeam?l(a.possesedTankTeam,r,d):null);var a,r,d;n?this.addBattleLogMessage_0(o[e].playerMessage,n,null!==s?c.Companion[h].call(c.Companion,s,!1):c.WHITE):this.addBattleLogMessage_1(o[e].defaultMessage,null!==s?c.Companion[h].call(c.Companion,s,!1):c.WHITE)}))}}}};e.exports={unitSignals:t}},231:e=>{e.exports={unitSignals:{load:(e,t)=>{e.hooks.FastOpenContainerHook={enabled:!0,callback:(e,t)=>{const n=e.getExports("tanks.clients.html5.lobby.containers.AnimationOpenContainerComponent",!0);t.onContainerAccelerateCalc=(...e)=>1,n.prototype.accelerate_0=(...e)=>t.onContainerAccelerateCalc.apply(null,e)}}}}}},900:(e,t,n)=>{const{domContext:l}=n(134),s="https://tankionline.com/play/";e.exports={paramOriginalScript:"forceScript",paramOriginalPage:"forcePage",mutatePage:(e,t)=>{let n;return(n=/^([^\/]+?:\/\/[^\/]+)\/hook(\/.*)$/.exec(t))?n[1]+n[2]:(n=/^([^\/]+?:\/\/[^\/]+\/.*\/)hook\/?$/.exec(t))?n[1]:e},mutateScript:(e,t,n)=>e,getGameInfo:()=>({linkGamePage:s,linkReferer:s}),getPageContentRewriteStatus:()=>!0,getBaseRewriteStatus:()=>!0}},110:(e,t,n)=>{e.exports=n(697).send()},697:(e,t,n)=>{const{moduleCreate:l,defaultModuleCreateSignals:s}=n(262);e.exports=l("tankionlineLoader",((e,t)=>{e.units.register(n(158)),e.units.register(n(9))}),s)},158:(module,__unused_webpack_exports,__webpack_require__)=>{const{getDocument}=__webpack_require__(134),{getPageContentRewriteStatus,getBaseRewriteStatus}=__webpack_require__(900),unitSignals={init:(e,t)=>{e.libHelper=null,e.webpackData=null,e.webpackSource=null},moduleLoad:async(e,t)=>{e.libHelper=t.modules.require("libHelper");let n=t.modules.require("tankionlineWebpack");e.webpackData=n.webpackData,e.webpackSource=n.webpackSource,await e.ScriptLoader.getMainScriptContentAuto(e.webpackSource,e.libHelper)},moduleApplication:(moduleContext,coreContext)=>{if(!moduleContext.webpackSource.mainScriptWebpackElements||!moduleContext.webpackSource.mainScriptWebpackPath||!moduleContext.webpackSource.mainScriptWebpackEntry)return void moduleContext.logger.error("Fail: webpackSource is corrupted: %O",moduleContext.webpackSource);const document=getDocument();if(getPageContentRewriteStatus()&&moduleContext.webpackSource.pageContent&&coreContext.event.dispatchEvent(new coreContext.ModuleEvent(moduleContext,"htmlRewrite.fullDocument",{cancelable:!0}))&&(document.firstChild.innerHTML=moduleContext.webpackSource.pageContent),getBaseRewriteStatus()&&moduleContext.webpackSource.linkBase&&coreContext.event.dispatchEvent(new coreContext.ModuleEvent(moduleContext,"htmlRewrite.headBase",{cancelable:!0}))){Array.from(document.getElementsByTagName("base")).map((e=>e.remove()));let e=document.head;if(!e){let t=document.getElementsByTagName("head");t.length?e=t[0]:moduleContext.logger.warn("DOM base element load error: document.head")}if(e){let t=document.createElement("base");t.setAttribute("href",moduleContext.webpackSource.linkBase),e.insertBefore(t,e.firstChild||null)}}if(coreContext.event.dispatchEvent(new coreContext.ModuleEvent(moduleContext,"dataLoad",{cancelable:!0}))&&(moduleContext.webpackData.modules=eval(moduleContext.webpackSource.mainScriptWebpackElements),moduleContext.webpackData.publicPath=moduleContext.webpackSource.mainScriptWebpackPath,moduleContext.webpackData.entryModule=moduleContext.webpackSource.mainScriptWebpackEntry),moduleContext.webpackData.modules){const e=moduleContext.webpackData.entryModule;if(coreContext.event.dispatchEvent(new coreContext.ModuleEvent(moduleContext,"dataLoaded",{cancelable:!1,detail:{webpackData:moduleContext.webpackData}})),coreContext.event.dispatchEvent(new coreContext.ModuleEvent(moduleContext,"entry.launch",{cancelable:!0,detail:{webpackData:moduleContext.webpackData}}))){const t=moduleContext.webpackData.loadEntryModule();coreContext.event.dispatchEvent(new coreContext.ModuleEvent(moduleContext,"entry.launched",{cancelable:!1,detail:{returnValue:t,isOriginalModule:e==moduleContext.webpackData.entryModule}}))}}}};module.exports={unitSignals}},9:(e,t,n)=>{const{paramOriginalScript:l,paramOriginalPage:s,mutatePage:a,mutateScript:o,getGameInfo:r}=n(900),{getDocument:i,domContext:u}=n(134);class c{static async getContent(e,t){let n=await fetch(e,{referrer:t,referrerPolicy:"strict-origin-when-cross-origin",body:null,method:"GET",mode:"cors",credentials:"omit"});if(200!==n.status)return null;let l=await n.text();return l||null}}class d{libHelper=null;linkGamePage=null;linkReferer=null;constructor(e,t,n){this.libHelper=e,this.linkGamePage=t,this.linkReferer=n}getGamePage(){const e=this.libHelper.LinkHelper.getQueryVariable(s);return e||(this.linkGamePage?a(this.linkGamePage,u.location.href):null)}getGameScript(e){const t=this.libHelper.LinkHelper.getQueryVariable(l);return t||(e?o(e,this.getGamePage(),u.location.href):null)}getGameInfo(){return null}}class p extends d{getGameInfo(){const e=this.getGameScript();return e?{linkScript:this.libHelper.LinkHelper.linkAbsolute(e,this.getGamePage()),linkBase:this.libHelper.LinkHelper.getBase(this.getGamePage())}:null}}class g extends d{async getGameInfo(){const e=await c.getContent(this.getGamePage(),this.linkReferer);if(!e)return;const t=/<script[^>]+src="([^">]+main.[0-9a-f]{8}.js)"[^>]*><\/script>/i.exec(e);return t?{linkScript:this.getGameScript(this.libHelper.LinkHelper.linkAbsolute(t[1],this.getGamePage())),linkBase:this.libHelper.LinkHelper.getBase(this.getGamePage()),pageContent:e.replace(/<script[^>]+src="[^">]+"[^>]*><\/script>/i,"")}:null}}class h{static parseMainScript(e){if(!e)return null;let t=e.indexOf("}([function(t,e,n){")+2,n={mainScriptWebpackElements:e.substring(t,e.lastIndexOf("]")+1),mainScriptWebpackPath:null,mainScriptWebpackEntry:null};return e=e.substring(0,t),n.mainScriptWebpackPath=e.substring(e.lastIndexOf(',n.p="')+6,e.lastIndexOf('",n(n.s=')),n.mainScriptWebpackEntry=parseInt(e.substring(e.lastIndexOf('",n(n.s=')+8,e.lastIndexOf(")"))),n}static async getMainScriptContentAuto(e,t){const{linkGamePage:n,linkReferer:l}=r(),s=[new p(t,n,l),new g(t,n,l)];let a,o=null;for(let e=0;e<s.length;e++)if(a=s[e].getGameInfo(),a instanceof Promise&&(a=await a),a&&a.linkScript&&!a.scriptLoaded){o=a;break}if(!o)return;const i=h.parseMainScript(await c.getContent(o.linkScript,l));i&&Object.assign(o,i),Object.assign(e,o)}}e.exports={ScriptLoader:h}},114:(e,t,n)=>{e.exports=n(301).send()},301:(e,t,n)=>{const{moduleCreate:l,defaultModuleCreateSignals:s}=n(262);e.exports=l("tankionlineWebpack",((e,t)=>{e.units.register(n(707))}),s)},707:e=>{e.exports={unitSignals:{moduleInit:(e,t)=>{let n=t.modules.require("libWebpack");e.webpackData=new n.AdvancedWebpackModuleManager,e.webpackSource={}}}}},134:e=>{const t=(()=>{try{return globalContext}catch(e){}return globalThis})(),n=(()=>{try{return packageContext}catch(e){}return{}})(),l=(()=>{try{return runtimeContext}catch(e){}return{}})(),s=(()=>{try{return connectContext}catch(e){}return l||n||t})(),a=(()=>{try{return domContext}catch(e){}return t})(),o=e=>{try{return debugContext}catch(e){}return e?t:{}},r=e=>e in l?l[e]:e in n?n[e]:e in t?t[e]:e in globalThis?globalThis[e]:void 0;e.exports={globalContext:t,packageContext:n,runtimeContext:l,connectContext:s,domContext:a,consoleContext:r("console"),forceDebugContext:o(!0),debugContext:o(!1),getDocument:()=>a.document,getValue:r,getInterpreterType:()=>globalThis.constructor&&globalThis.constructor.name&&"window"==globalThis.constructor.name.toLowerCase()||globalThis instanceof EventTarget||globalThis.navigator&&globalThis.navigator.userAgent||globalThis.navigator&&globalThis.navigator.cookieEnabled?"Browser":globalThis.performance&&globalThis.performance.nodeTiming?"NodeJS":"Unknown"}},841:e=>{e.exports={sharedCore:{enabled:!0,coreContext:null}}},262:function(e,t,n){const{connectContext:l}=n(134),{moduleListenerName:s}=n(312),{sharedCore:a}=n(841);class o extends Event{status=null;transferObject=null;constructor(e){super(e),this.status=!1,this.transferObject=null}}class r extends o{moduleTemplate=null;constructor(e,t){super(e),this.transferObject=this.moduleTemplate=t}}const i=(e,t,n)=>{a.enabled&&a.coreContext?(e=>{a.coreContext.moduleListener.installModuleTemplate(e)})(n):e instanceof EventTarget?((e,t,n)=>{let l=new r(t,n);e.dispatchEvent(l);let s=l=>{let a=l.registerCallback||null;a&&"function"==typeof a&&(e.removeEventListener(t+"ModuleRequest",s),a(n))};l.status||e.addEventListener(t+"ModuleRequest",s)})(e,t,n):((e,t,n)=>{e[t]=e[t]||[],e[t]instanceof Array?e[t].push(n):e[t](n)})(e,t,n)};e.exports={moduleCreate:(e,...t)=>{let n={id:e,constructors:t,send:()=>(i(l,s,n),this)};return Object.defineProperty(n,"__dataType",{writable:!1,value:"ModuleTemplate"}),Object.defineProperty(n,"__isModuleTemplate",{writable:!1,value:!0}),n},defaultModuleCreateSignals:(e,t)=>{e.units.signal("init",t),e.units.signal("event",t),e.units.signal("load",t),e.units.signal("launch",t),e.units.signal("application",t),e.signals.register("init",(async(e,t)=>await Promise.all(e.units.signal("moduleInit",t)))),e.signals.register("event",(async(e,t)=>await Promise.all(e.units.signal("moduleEvent",t)))),e.signals.register("load",(async(e,t)=>await Promise.all(e.units.signal("moduleLoad",t)))),e.signals.register("launch",(async(e,t)=>await Promise.all(e.units.signal("moduleLaunch",t)))),e.signals.register("application",(async(e,t)=>await Promise.all(e.units.signal("moduleApplication",t))))}}},354:e=>{"use strict";e.exports=JSON.parse('{"ru":"ru-RU","en":"en-US","default":"ru"}')}},__webpack_module_cache__={};function __webpack_require__(e){var t=__webpack_module_cache__[e];if(void 0!==t)return t.exports;var n=__webpack_module_cache__[e]={exports:{}};return __webpack_modules__[e].call(n.exports,n,n.exports,__webpack_require__),n.exports}__webpack_require__(725),__webpack_require__(784),__webpack_require__(303),__webpack_require__(127),__webpack_require__(110);var __webpack_exports__=__webpack_require__(114)})();
//# sourceMappingURL=static-production.js.map