(this.webpackJsonpfront=this.webpackJsonpfront||[]).push([[0],{50:function(e,t,n){},55:function(e,t,n){"use strict";n.r(t);var c,a=n(0),r=n.n(a),s=n(20),o=n.n(s),i=n(4),d=n(3),l=n(21),b=n(6),u=n.n(b),j="/api/warehouse/",h={fetch:function(e){return console.log("Fetching ".concat(e," data!")),u.a.get("".concat(j).concat(e)).then((function(e){return e.data}))},info:function(){return u.a.get("".concat(j,"info")).then((function(e){return e.data}))}},O=n(7),p=n(22),f=(n(50),n(1)),x=p.a.div(c||(c=Object(l.a)(["\n  padding: 1rem;\n\n  table {\n\tborder-collapse: collapse;\n    margin: 0 auto;\n    font-size: 1em;\n    font-family: sans-serif;\n    min-width: 400px;\n    box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);\n\n\ttr {\n\t  :last-child {\n\t\ttd {\n\t\t  border-bottom: 0;\n\t\t}\n\t  }\n\t  :nth-child(even) {background-color: #f2f2f2;}\n\t}\n\n\tth,\n\ttd {\n\t\tpadding: 10px 15px;\n\t\ttext-align: left;\n\t  \tborder-bottom: 1px solid black;\n\t  \tborder-right: 1px solid black;\n\n\t  :last-child {\n\t\tborder-right: 0;\n\t  }\n\t}\n\t}\n\ttfoot {\n\t\ttd {\n\t\t\tborder-bottom: 0px;\n\t  \t\tborder-right: 0px;\n\t\t}\n\t}\n\t"])));function g(e){var t=e.columns,n=e.data,c=Object(O.useTable)({columns:t,data:n,initialState:{pageIndex:0}},O.usePagination),a=c.getTableProps,r=c.getTableBodyProps,s=c.headerGroups,o=c.prepareRow,i=c.page,l=c.canPreviousPage,b=c.canNextPage,u=c.nextPage,j=c.pageCount,h=c.previousPage,p=c.setPageSize,x=c.state,g=x.pageIndex,m=x.pageSize;return Object(f.jsx)("div",{className:"datatable",children:Object(f.jsxs)("table",Object(d.a)(Object(d.a)({},a()),{},{children:[Object(f.jsx)("thead",{children:s.map((function(e){return Object(f.jsx)("tr",Object(d.a)(Object(d.a)({},e.getHeaderGroupProps()),{},{children:e.headers.map((function(e){return Object(f.jsx)("th",Object(d.a)(Object(d.a)({},e.getHeaderProps()),{},{children:e.render("Header")}))}))}))}))}),Object(f.jsxs)("tbody",Object(d.a)(Object(d.a)({},r()),{},{children:[i.map((function(e,t){return o(e),Object(f.jsx)("tr",Object(d.a)(Object(d.a)({},e.getRowProps()),{},{children:e.cells.map((function(e){return Object(f.jsx)("td",Object(d.a)(Object(d.a)({},e.getCellProps()),{},{children:e.render("Cell")}))}))}))})),Object(f.jsx)("tfoot",{children:Object(f.jsxs)("tr",{children:[Object(f.jsxs)("td",{colSpan:"10",children:[Object(f.jsx)("button",{className:"pageBtn",onClick:function(){return h()},disabled:!l,children:"<"})," "]}),Object(f.jsxs)("td",{children:["Page ",g+1," of ",j+1]}),Object(f.jsx)("td",{children:Object(f.jsx)("select",{className:"pageMenu",value:m,onChange:function(e){p(Number(e.target.value))},children:[10,20,30,40,50].map((function(e){return Object(f.jsxs)("option",{value:e,children:["Show ",e," items"]},e)}))})}),Object(f.jsxs)("td",{children:[Object(f.jsx)("button",{className:"pageBtn",onClick:function(){return u()},disabled:!b,children:">"})," "]})]})})]}))]}))})}var m=function(){var e=Object(a.useState)("beanies"),t=Object(i.a)(e,2),n=t[0],c=t[1],s=Object(a.useState)([]),o=Object(i.a)(s,2),d=o[0],l=o[1],b=Object(a.useState)({updateTime:"Unknown"}),u=Object(i.a)(b,2),j=u[0],O=u[1],p=r.a.useMemo((function(){return[{Header:"NAME",accessor:"name"},{Header:"MANUFACTURER",accessor:"manufacturer"},{Header:"AVAILABILITY",accessor:"availability"},{Header:"COLOR",accessor:"color"},{Header:"PRICE",accessor:"price"},{Header:"ID",accessor:"id"}]}),[]);Object(a.useEffect)((function(){h.fetch(n).then((function(e){var t=[];for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.push(e[n]);l(t)})).catch((function(e){return console.log(e)}))}),[n]),Object(a.useEffect)((function(){h.info().then((function(e){O(e)})).catch((function(e){return console.log(e)}))}),[]);var m=function(e){c(e)};return console.log("Rendering..."),Object(f.jsxs)("div",{children:[Object(f.jsx)("h1",{children:"Reaktor Warehouse"}),Object(f.jsxs)("div",{className:"update",children:[Object(f.jsxs)("h3",{children:["Last update: ",j.updateTime]}),Object(f.jsxs)("h3",{children:["Status: ",j.status]})]}),Object(f.jsxs)("div",{className:"categories",children:[Object(f.jsx)("h2",{children:"Switch category"}),Object(f.jsx)("button",{className:"catBtn",onClick:function(){return m("beanies")},children:"Beanies"})," ",Object(f.jsx)("button",{className:"catBtn",onClick:function(){return m("gloves")},children:"Gloves"})," ",Object(f.jsx)("button",{className:"catBtn",onClick:function(){return m("facemasks")},children:"Facemasks"})," "]}),Object(f.jsxs)("h2",{children:["Current category: ",n]}),Object(f.jsx)(x,{children:Object(f.jsx)(g,{columns:p,data:d})})]})};o.a.render(Object(f.jsx)(m,{}),document.getElementById("root"))}},[[55,1,2]]]);
//# sourceMappingURL=main.64fd1340.chunk.js.map