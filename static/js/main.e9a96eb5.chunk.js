(this.webpackJsonpincrementalsudoku=this.webpackJsonpincrementalsudoku||[]).push([[0],{12:function(e,t,n){},13:function(e,t,n){},15:function(e,t,n){"use strict";n.r(t);var c=n(1),r=n.n(c),a=n(6),u=n.n(a),o=(n(12),n(7)),l=n(2),s=(n(13),n(0));function i(e){var t=Object(c.useState)(),n=Object(l.a)(t,2),r=n[0],a=n[1],u=[],o=[],i=[];return Object(c.useEffect)((function(){for(var t=0;t<e.squares;t++)o.push(Object(s.jsx)("col",{},"colG"+t));for(var n=0;n<e.size/e.squares;n++)u.push(Object(s.jsx)("colgroup",{children:o},"colG"+n));for(var c=function(t){for(var n=[],c=function(c){n.push(Object(s.jsx)("td",{onClick:function(){return e.callBack(t,c)},children:e.value[t][c]},"tdK".concat(t).concat(c)))},r=0;r<e.size;r++)c(r);i.push(Object(s.jsx)("tr",{children:n},"trK"+t)),t%e.squares==e.squares-1&&(u.push(Object(s.jsx)("tbody",{children:i},"tb"+t)),i=[]),a(u)},r=0;r<e.size;r++)c(r)}),[e.value]),Object(s.jsx)("table",{className:"sudokuTable",children:r})}function f(e){var t=[];return t.push(Object(s.jsx)("input",{type:"radio",id:"num"+e.value,name:"radioNumber",value:e.value,checked:e.selectedNumber==e.value,onChange:e.callBack},"input"+e.value)),t.push(Object(s.jsxs)("label",{htmlFor:"num"+e.value,children:[" ",e.value," "]},"labl"+e.value)),t}function d(e){for(var t=[],n=0;n<e.size;n++)t.push(Object(s.jsx)(f,{selectedNumber:e.selectedNumber,callBack:e.callBack,value:n+1}));return Object(s.jsxs)("div",{className:"radio-toolbar",children:[" ",t," "]})}function b(e){return Object(s.jsx)("div",{children:Object(s.jsx)(d,{selectedNumber:e.selectedNumber,size:e.size,callBack:e.callBack})})}function j(e){return Object(s.jsxs)("div",{className:"buttonList",children:[e.solved?Object(s.jsx)("button",{className:"button",type:"button",children:"Complete"}):Object(s.jsx)("button",{className:"button",type:"button",disabled:!0,children:"Incomplete"}),Object(s.jsx)("button",{className:"button",type:"button",onClick:function(){return e.newGame(4,2)},children:"New Sudoku"})]})}function h(e){return[1,2,3,4,5,6,7,8,9].splice(0,e)}function v(e,t,n){for(var c=h(n),r=h(n),a=function(n){c=c.filter((function(c){return c!=t[e][n]})),r=r.filter((function(c){return c!=t[n][e]}))},u=0;u<n;u++)a(u);return 0==c.length&&0==r.length}function O(e,t,n,c,r){for(var a=h(t),u=function(t){for(var u=function(n){a=a.filter((function(a){return a!=e[t+r][n+c]}))},o=0;o<n;o++)u(o)},o=0;o<n;o++)u(o);return 0==a.length}function p(e,t,n){for(var c=0;c<e;c++)if(!v(c,t,e))return!1;for(var r=0;r<n;r++)for(var a=0;a<n;a++)if(!O(t,e,n,r*n,a*n))return!1;return!0}function m(e,t){for(var n,c,r=h(e),a=Array(e).fill(null).map((function(){return Array(e).fill(r)})),u=[[Math.floor(Math.random()*e),Math.floor(Math.random()*e)]],o=[],l=!0;l;)u.sort((function(e,t){return e.length-t.length})),0,u.length>0&&(a[u[0][0]][u[0][1]].length>1&&(c=Math.floor(Math.random()*a[u[0][0]][u[0][1]].length),n=a[u[0][0]][u[0][1]][c],a[u[0][0]][u[0][1]]=[n],x(u[0][0],u[0][1],a,e,n,t,o,u)),u.splice(0,1),o.splice(0,1)),u.length<=0&&(l=!1);return p(e,a,t)?a:m(e,t)}function x(e,t,n,c,r,a,u,o){for(var l=0;l<c;l++)n[e][l].length>1&&(n[e][l]=n[e][l].filter((function(e){return e!=r})),n[e][l].length<=1?(x(e,l,n,c,n[e][l][0],a,u,o),u.includes("".concat(e).concat(l))&&(o.splice(u.indexOf("".concat(e).concat(l)),1),u.splice(u.indexOf("".concat(e).concat(l)),1))):u.includes("".concat(e).concat(l))||(u.push("".concat(e).concat(l)),o.push([e,l]))),n[l][t].length>1&&(n[l][t]=n[l][t].filter((function(e){return e!=r})),n[l][t].length<=1?(x(l,t,n,c,n[l][t][0],a,u,o),u.includes("".concat(l).concat(t))&&(o.splice(u.indexOf("".concat(l).concat(t)),1),u.splice(u.indexOf("".concat(l).concat(t)),1))):u.includes("".concat(l).concat(t))||(u.push("".concat(l).concat(t)),o.push([l,t])));for(var s=Math.floor(e/a)*a,i=Math.floor(t/a)*a,f=0;f<a;f++)for(var d=0;d<a;d++)n[f+s][d+i].length>1&&(n[f+s][d+i]=n[f+s][d+i].filter((function(e){return e!=r})),n[f+s][d+i].length<=1?(x(f+s,d+i,n,c,n[f+s][d+i][0],a,u,o),u.includes("".concat(f+s).concat(d+i))&&(o.splice(u.indexOf("".concat(f+s).concat(d+i)),1),u.splice(u.indexOf("".concat(f+s).concat(d+i)),1))):u.includes("".concat(f+s).concat(d+i))||(u.push("".concat(f+s).concat(d+i)),o.push([f+s,d+i])))}function k(e,t){var n=e.length,c=function(e,t){for(var n=[],c=[],r=0;r<e*e;r++)n.push(r);n.sort((function(){return Math.random()>.5?1:-1}));for(var a=0;a<t;a++)c.push(n[a]);return c}(n,t);return c.forEach((function(t){var c=function(e,t){return[Math.floor(t/e),t%e]}(n,t);e[c[0]][c[1]]=[]})),e}function g(e){return Object(s.jsx)("div",{className:"topBar",children:Object(s.jsx)("span",{className:"topText",children:"Idel Sudoku"})})}var N=1;var y=function(){var e=Object(c.useState)(N),t=Object(l.a)(e,2),n=t[0],r=t[1],a=Object(c.useState)(4),u=Object(l.a)(a,2),f=u[0],d=(u[1],Object(c.useState)(2)),h=Object(l.a)(d,2),v=h[0],O=(h[1],Object(c.useState)(Array(f).fill(Array(f).fill(null)))),x=Object(l.a)(O,2),y=x[0],M=x[1],B=Object(c.useState)(!1),S=Object(l.a)(B,2),z=S[0],E=S[1];function w(e,t){var n=m(e,t);n=k(n,1),M(n)}return Object(c.useEffect)((function(){E(p(f,y,v))}),[y]),Object(c.useEffect)((function(){w(f,v)}),[]),Object(c.useEffect)((function(){var e=function(e){e.key<=f&&0!=e.key&&(r(e.key),N=e.key)};return document.addEventListener("keydown",e),function(){document.removeEventListener("keydown",e)}}),[]),Object(s.jsxs)("div",{children:[Object(s.jsx)(g,{}),Object(s.jsxs)("div",{className:"game",children:[Object(s.jsx)(b,{selectedNumber:n,size:f,callBack:function(e){N=e.target.value,r(e.target.value)}}),Object(s.jsxs)("div",{className:"sudoku",children:[Object(s.jsx)(i,{size:f,squares:v,callBack:function(e,t){if(null!=y){var n=Object(o.a)(y);n[e][t]=Number(N),M(n)}},value:y}),Object(s.jsx)(j,{solved:z,newGame:w})]})]})]})};u.a.render(Object(s.jsx)(r.a.StrictMode,{children:Object(s.jsx)(y,{})}),document.getElementById("root"))}},[[15,1,2]]]);
//# sourceMappingURL=main.e9a96eb5.chunk.js.map