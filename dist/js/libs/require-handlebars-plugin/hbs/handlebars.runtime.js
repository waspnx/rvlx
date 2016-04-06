/*!

 handlebars v3.0.3

 Copyright (C) 2011-2014 by Yehuda Katz

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.

 @license
 */

!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):"object"==typeof exports?exports.Handlebars=t():e.Handlebars=t()}(this,function(){return function(e){function t(n){if(r[n])return r[n].exports;var a=r[n]={exports:{},id:n,loaded:!1};return e[n].call(a.exports,a,a.exports,t),a.loaded=!0,a.exports}var r={};return t.m=e,t.c=r,t.p="",t(0)}([function(e,t,r){"use strict";function n(){var e=new s.HandlebarsEnvironment;return d.extend(e,s),e.SafeString=u["default"],e.Exception=f["default"],e.Utils=d,e.escapeExpression=d.escapeExpression,e.VM=m,e.template=function(t){return m.template(t,e)},e}var a=r(7)["default"],o=r(8)["default"];t.__esModule=!0;var i=r(1),s=a(i),l=r(2),u=o(l),c=r(3),f=o(c),p=r(4),d=a(p),h=r(5),m=a(h),v=r(6),g=o(v),w=n();w.create=n,g["default"](w),w["default"]=w,t["default"]=w,e.exports=t["default"]},function(e,t,r){"use strict";function n(e,t){this.helpers=e||{},this.partials=t||{},a(this)}function a(e){e.registerHelper("helperMissing",function(){if(1!==arguments.length)throw new f["default"]('Missing helper: "'+arguments[arguments.length-1].name+'"')}),e.registerHelper("blockHelperMissing",function(t,r){var n=r.inverse,a=r.fn;if(t===!0)return a(this);if(t===!1||null==t)return n(this);if(m(t))return t.length>0?(r.ids&&(r.ids=[r.name]),e.helpers.each(t,r)):n(this);if(r.data&&r.ids){var i=o(r.data);i.contextPath=u.appendContextPath(r.data.contextPath,r.name),r={data:i}}return a(t,r)}),e.registerHelper("each",function(e,t){function r(t,r,a){l&&(l.key=t,l.index=r,l.first=0===r,l.last=!!a,c&&(l.contextPath=c+t)),s+=n(e[t],{data:l,blockParams:u.blockParams([e[t],t],[c+t,null])})}if(!t)throw new f["default"]("Must pass iterator to #each");var n=t.fn,a=t.inverse,i=0,s="",l=void 0,c=void 0;if(t.data&&t.ids&&(c=u.appendContextPath(t.data.contextPath,t.ids[0])+"."),v(e)&&(e=e.call(this)),t.data&&(l=o(t.data)),e&&"object"==typeof e)if(m(e))for(var p=e.length;p>i;i++)r(i,i,i===e.length-1);else{var d=void 0;for(var h in e)e.hasOwnProperty(h)&&(d&&r(d,i-1),d=h,i++);d&&r(d,i-1,!0)}return 0===i&&(s=a(this)),s}),e.registerHelper("if",function(e,t){return v(e)&&(e=e.call(this)),!t.hash.includeZero&&!e||u.isEmpty(e)?t.inverse(this):t.fn(this)}),e.registerHelper("unless",function(t,r){return e.helpers["if"].call(this,t,{fn:r.inverse,inverse:r.fn,hash:r.hash})}),e.registerHelper("with",function(e,t){v(e)&&(e=e.call(this));var r=t.fn;if(u.isEmpty(e))return t.inverse(this);if(t.data&&t.ids){var n=o(t.data);n.contextPath=u.appendContextPath(t.data.contextPath,t.ids[0]),t={data:n}}return r(e,t)}),e.registerHelper("log",function(t,r){var n=r.data&&null!=r.data.level?parseInt(r.data.level,10):1;e.log(n,t)}),e.registerHelper("lookup",function(e,t){return e&&e[t]})}function o(e){var t=u.extend({},e);return t._parent=e,t}var i=r(7)["default"],s=r(8)["default"];t.__esModule=!0,t.HandlebarsEnvironment=n,t.createFrame=o;var l=r(4),u=i(l),c=r(3),f=s(c),p="3.0.1";t.VERSION=p;var d=6;t.COMPILER_REVISION=d;var h={1:"<= 1.0.rc.2",2:"== 1.0.0-rc.3",3:"== 1.0.0-rc.4",4:"== 1.x.x",5:"== 2.0.0-alpha.x",6:">= 2.0.0-beta.1"};t.REVISION_CHANGES=h;var m=u.isArray,v=u.isFunction,g=u.toString,w="[object Object]";n.prototype={constructor:n,logger:x,log:y,registerHelper:function(e,t){if(g.call(e)===w){if(t)throw new f["default"]("Arg not supported with multiple helpers");u.extend(this.helpers,e)}else this.helpers[e]=t},unregisterHelper:function(e){delete this.helpers[e]},registerPartial:function(e,t){if(g.call(e)===w)u.extend(this.partials,e);else{if("undefined"==typeof t)throw new f["default"]("Attempting to register a partial as undefined");this.partials[e]=t}},unregisterPartial:function(e){delete this.partials[e]}};var x={methodMap:{0:"debug",1:"info",2:"warn",3:"error"},DEBUG:0,INFO:1,WARN:2,ERROR:3,level:1,log:function(e,t){if("undefined"!=typeof console&&x.level<=e){var r=x.methodMap[e];(console[r]||console.log).call(console,t)}}};t.logger=x;var y=x.log;t.log=y},function(e,t,r){"use strict";function n(e){this.string=e}t.__esModule=!0,n.prototype.toString=n.prototype.toHTML=function(){return""+this.string},t["default"]=n,e.exports=t["default"]},function(e,t,r){"use strict";function n(e,t){var r=t&&t.loc,o=void 0,i=void 0;r&&(o=r.start.line,i=r.start.column,e+=" - "+o+":"+i);for(var s=Error.prototype.constructor.call(this,e),l=0;l<a.length;l++)this[a[l]]=s[a[l]];Error.captureStackTrace&&Error.captureStackTrace(this,n),r&&(this.lineNumber=o,this.column=i)}t.__esModule=!0;var a=["description","fileName","lineNumber","message","name","number","stack"];n.prototype=new Error,t["default"]=n,e.exports=t["default"]},function(e,t,r){"use strict";function n(e){return c[e]}function a(e){for(var t=1;t<arguments.length;t++)for(var r in arguments[t])Object.prototype.hasOwnProperty.call(arguments[t],r)&&(e[r]=arguments[t][r]);return e}function o(e,t){for(var r=0,n=e.length;n>r;r++)if(e[r]===t)return r;return-1}function i(e){if("string"!=typeof e){if(e&&e.toHTML)return e.toHTML();if(null==e)return"";if(!e)return e+"";e=""+e}return p.test(e)?e.replace(f,n):e}function s(e){return e||0===e?m(e)&&0===e.length?!0:!1:!0}function l(e,t){return e.path=t,e}function u(e,t){return(e?e+".":"")+t}t.__esModule=!0,t.extend=a,t.indexOf=o,t.escapeExpression=i,t.isEmpty=s,t.blockParams=l,t.appendContextPath=u;var c={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;"},f=/[&<>"'`]/g,p=/[&<>"'`]/,d=Object.prototype.toString;t.toString=d;var h=function(e){return"function"==typeof e};h(/x/)&&(t.isFunction=h=function(e){return"function"==typeof e&&"[object Function]"===d.call(e)});var h;t.isFunction=h;var m=Array.isArray||function(e){return e&&"object"==typeof e?"[object Array]"===d.call(e):!1};t.isArray=m},function(e,t,r){"use strict";function n(e){var t=e&&e[0]||1,r=v.COMPILER_REVISION;if(t!==r){if(r>t){var n=v.REVISION_CHANGES[r],a=v.REVISION_CHANGES[t];throw new m["default"]("Template was precompiled with an older version of Handlebars than the current runtime. Please update your precompiler to a newer version ("+n+") or downgrade your runtime to an older version ("+a+").")}throw new m["default"]("Template was precompiled with a newer version of Handlebars than the current runtime. Please update your runtime to a newer version ("+e[1]+").")}}function a(e,t){function r(r,n,a){a.hash&&(n=d.extend({},n,a.hash)),r=t.VM.resolvePartial.call(this,r,n,a);var o=t.VM.invokePartial.call(this,r,n,a);if(null==o&&t.compile&&(a.partials[a.name]=t.compile(r,e.compilerOptions,t),o=a.partials[a.name](n,a)),null!=o){if(a.indent){for(var i=o.split("\n"),s=0,l=i.length;l>s&&(i[s]||s+1!==l);s++)i[s]=a.indent+i[s];o=i.join("\n")}return o}throw new m["default"]("The partial "+a.name+" could not be compiled when running in runtime-only mode")}function n(t){var r=void 0===arguments[1]?{}:arguments[1],o=r.data;n._setup(r),!r.partial&&e.useData&&(o=u(t,o));var i=void 0,s=e.useBlockParams?[]:void 0;return e.useDepths&&(i=r.depths?[t].concat(r.depths):[t]),e.main.call(a,t,a.helpers,a.partials,o,s,i)}if(!t)throw new m["default"]("No environment passed to template");if(!e||!e.main)throw new m["default"]("Unknown template object: "+typeof e);t.VM.checkRevision(e.compiler);var a={strict:function(e,t){if(!(t in e))throw new m["default"]('"'+t+'" not defined in '+e);return e[t]},lookup:function(e,t){for(var r=e.length,n=0;r>n;n++)if(e[n]&&null!=e[n][t])return e[n][t]},lambda:function(e,t){return"function"==typeof e?e.call(t):e},escapeExpression:d.escapeExpression,invokePartial:r,fn:function(t){return e[t]},programs:[],program:function(e,t,r,n,a){var i=this.programs[e],s=this.fn(e);return t||a||n||r?i=o(this,e,s,t,r,n,a):i||(i=this.programs[e]=o(this,e,s)),i},data:function(e,t){for(;e&&t--;)e=e._parent;return e},merge:function(e,t){var r=e||t;return e&&t&&e!==t&&(r=d.extend({},t,e)),r},noop:t.VM.noop,compilerInfo:e.compiler};return n.isTop=!0,n._setup=function(r){r.partial?(a.helpers=r.helpers,a.partials=r.partials):(a.helpers=a.merge(r.helpers,t.helpers),e.usePartial&&(a.partials=a.merge(r.partials,t.partials)))},n._child=function(t,r,n,i){if(e.useBlockParams&&!n)throw new m["default"]("must pass block params");if(e.useDepths&&!i)throw new m["default"]("must pass parent depths");return o(a,t,e[t],r,0,n,i)},n}function o(e,t,r,n,a,o,i){function s(t){var a=void 0===arguments[1]?{}:arguments[1];return r.call(e,t,e.helpers,e.partials,a.data||n,o&&[a.blockParams].concat(o),i&&[t].concat(i))}return s.program=t,s.depth=i?i.length:0,s.blockParams=a||0,s}function i(e,t,r){return e?e.call||r.name||(r.name=e,e=r.partials[e]):e=r.partials[r.name],e}function s(e,t,r){if(r.partial=!0,void 0===e)throw new m["default"]("The partial "+r.name+" could not be found");return e instanceof Function?e(t,r):void 0}function l(){return""}function u(e,t){return t&&"root"in t||(t=t?v.createFrame(t):{},t.root=e),t}var c=r(7)["default"],f=r(8)["default"];t.__esModule=!0,t.checkRevision=n,t.template=a,t.wrapProgram=o,t.resolvePartial=i,t.invokePartial=s,t.noop=l;var p=r(4),d=c(p),h=r(3),m=f(h),v=r(1)},function(e,t,r){(function(r){"use strict";t.__esModule=!0,t["default"]=function(e){var t="undefined"!=typeof r?r:window,n=t.Handlebars;e.noConflict=function(){t.Handlebars===e&&(t.Handlebars=n)}},e.exports=t["default"]}).call(t,function(){return this}())},function(e,t,r){"use strict";t["default"]=function(e){if(e&&e.__esModule)return e;var t={};if("object"==typeof e&&null!==e)for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t["default"]=e,t},t.__esModule=!0},function(e,t,r){"use strict";t["default"]=function(e){return e&&e.__esModule?e:{"default":e}},t.__esModule=!0}])});