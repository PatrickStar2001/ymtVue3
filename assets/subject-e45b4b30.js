import{aj as m,_ as j,d as k,o as C,c as E,a as f,b as l,w as o,F as y,E as u,e as L,f as U,g as W,h as p,i as F,j as P,k as v,l as z}from"./index-cc83c9fb.js";import{E as N}from"./el-pagination-4a604fda.js";import{c as I}from"./cloneDeep-d03ca120.js";const $=e=>m.request({url:"api/subject/add",method:"post",data:e}),A=e=>m.request({url:"api/subject/delete",params:e}),q=e=>m.request({url:"api/subject/edit",method:"post",data:e}),B=e=>m.request({url:"api/subject/page",method:"post",data:e}),D=k({data(){return{subject:[],page:{total:0,current:1,size:10},dialogFormVisible:!1,data:{attachment:"",fee:0,finished:"",id:0,name:"",origin:"",participant:"",period:"",rank:"",subjectNo:"",type:"",userId:""},formLabelWidth:80}},mounted(){this.getsubjectPage(1)},methods:{toEdit(e){console.log(e),this.dialogFormVisible=!0,this.data=I(e)},getsubjectPage(e){B({current:e,size:2}).then(n=>{console.log(n);const b=n.data.page;this.subject=b.records,this.page=b}).catch(n=>{console.log(n)})},currentchange(e){this.getsubjectPage(e),this.page.current=e},del(e){console.log(e),A({id:e}).then(n=>{if(n.success)this.getsubjectPage(this.page.current),this.page.total%this.page.size==1?this.getAdCatesPage(this.page.current-1):this.getAdCatesPage(this.page.current);else return console.log(n.msg),!1}).catch(n=>{})},toAdd(){this.dialogFormVisible=!0,this.data={attachment:"",fee:0,finished:"",id:0,name:"",origin:"",participant:"",period:"",rank:"",subjectNo:"",type:"",userId:""}},save(){const e=this.data;e.id==0?$(e).then(a=>{if(a.success)this.dialogFormVisible=!1,this.getsubjectPage(this.page.current),u(a.msg);else return u(a.msg),!1}).catch(a=>{u("网络错误联系管理员")}):q(e).then(a=>{if(a.success)this.dialogFormVisible=!1,this.getsubjectPage(this.page.current),u(a.msg);else return u(a.msg),!1}).catch(a=>{u("网络错误联系管理员")})}}}),T={class:"subject"},M={class:"data-tools"},G={class:"dialog-footer"};function H(e,a,n,b,J,K){const r=L,d=F,g=U,h=N,i=P,s=v,V=z,w=W;return C(),E(y,null,[f("div",T,[f("div",M,[l(r,{type:"warning",onClick:e.toAdd},{default:o(()=>[p("添加")]),_:1},8,["onClick"])]),l(g,{data:e.subject,style:{width:"100%"}},{default:o(()=>[l(d,{fixed:"",prop:"id",label:"#",width:"50"}),l(d,{prop:"attachment",label:"佐证材料"}),l(d,{prop:"fee",label:"课题费用"}),l(d,{prop:"finished",label:"是否结项"}),l(d,{prop:"id",label:"编号"}),l(d,{prop:"name",label:"课题名称"}),l(d,{prop:"origin",label:"课题来源"}),l(d,{prop:"participant",label:"参与者"}),l(d,{prop:"period",label:"课题周期"}),l(d,{prop:"rank",label:"课题等级"}),l(d,{prop:"subjectNo",label:"课题编号"}),l(d,{prop:"type",label:"课题类型"}),l(d,{prop:"userId",label:"负责人"}),l(d,{fixed:"right",label:"操作",width:"120"},{default:o(t=>[l(r,{link:"",type:"primary",size:"small",onClick:c=>e.toEdit(t.row)},{default:o(()=>[p("更新")]),_:2},1032,["onClick"]),l(r,{link:"",type:"primary",size:"small",onClick:c=>e.del(t.row.id)},{default:o(()=>[p("删除")]),_:2},1032,["onClick"])]),_:1})]),_:1},8,["data"]),l(h,{layout:"prev, pager, next","page-size":e.page.size,total:e.page.total,onCurrentChange:e.currentchange},null,8,["page-size","total","onCurrentChange"])]),l(w,{modelValue:e.dialogFormVisible,"onUpdate:modelValue":a[13]||(a[13]=t=>e.dialogFormVisible=t),title:"课题编辑"},{footer:o(()=>[f("span",G,[l(r,{onClick:a[12]||(a[12]=t=>e.dialogFormVisible=!1)},{default:o(()=>[p("Cancel")]),_:1}),l(r,{type:"primary",onClick:e.save},{default:o(()=>[p(" 保存 ")]),_:1},8,["onClick"])])]),default:o(()=>[l(V,{model:e.data},{default:o(()=>[l(s,{label:"佐证材料","label-width":e.formLabelWidth},{default:o(()=>[l(i,{modelValue:e.data.attachment,"onUpdate:modelValue":a[0]||(a[0]=t=>e.data.attachment=t),autocomplete:"off"},null,8,["modelValue"])]),_:1},8,["label-width"]),l(s,{label:"课题费用","label-width":e.formLabelWidth},{default:o(()=>[l(i,{modelValue:e.data.fee,"onUpdate:modelValue":a[1]||(a[1]=t=>e.data.fee=t),autocomplete:"off"},null,8,["modelValue"])]),_:1},8,["label-width"]),l(s,{label:"是否结项","label-width":e.formLabelWidth},{default:o(()=>[l(i,{modelValue:e.data.finished,"onUpdate:modelValue":a[2]||(a[2]=t=>e.data.finished=t),autocomplete:"off"},null,8,["modelValue"])]),_:1},8,["label-width"]),l(s,{label:"编号","label-width":e.formLabelWidth},{default:o(()=>[l(i,{modelValue:e.data.id,"onUpdate:modelValue":a[3]||(a[3]=t=>e.data.id=t),autocomplete:"off"},null,8,["modelValue"])]),_:1},8,["label-width"]),l(s,{label:"课题名称","label-width":e.formLabelWidth},{default:o(()=>[l(i,{modelValue:e.data.name,"onUpdate:modelValue":a[4]||(a[4]=t=>e.data.name=t),autocomplete:"off"},null,8,["modelValue"])]),_:1},8,["label-width"]),l(s,{label:"课题来源","label-width":e.formLabelWidth},{default:o(()=>[l(i,{modelValue:e.data.origin,"onUpdate:modelValue":a[5]||(a[5]=t=>e.data.origin=t),autocomplete:"off"},null,8,["modelValue"])]),_:1},8,["label-width"]),l(s,{label:"参与者","label-width":e.formLabelWidth},{default:o(()=>[l(i,{modelValue:e.data.participant,"onUpdate:modelValue":a[6]||(a[6]=t=>e.data.participant=t),autocomplete:"off"},null,8,["modelValue"])]),_:1},8,["label-width"]),l(s,{label:"课题周期","label-width":e.formLabelWidth},{default:o(()=>[l(i,{modelValue:e.data.period,"onUpdate:modelValue":a[7]||(a[7]=t=>e.data.period=t),autocomplete:"off"},null,8,["modelValue"])]),_:1},8,["label-width"]),l(s,{label:"课题等级","label-width":e.formLabelWidth},{default:o(()=>[l(i,{modelValue:e.data.rank,"onUpdate:modelValue":a[8]||(a[8]=t=>e.data.rank=t),autocomplete:"off"},null,8,["modelValue"])]),_:1},8,["label-width"]),l(s,{label:"课题编号","label-width":e.formLabelWidth},{default:o(()=>[l(i,{modelValue:e.data.subjectNo,"onUpdate:modelValue":a[9]||(a[9]=t=>e.data.subjectNo=t),autocomplete:"off"},null,8,["modelValue"])]),_:1},8,["label-width"]),l(s,{label:"课题类型","label-width":e.formLabelWidth},{default:o(()=>[l(i,{modelValue:e.data.type,"onUpdate:modelValue":a[10]||(a[10]=t=>e.data.type=t),autocomplete:"off"},null,8,["modelValue"])]),_:1},8,["label-width"]),l(s,{label:"负责人","label-width":e.formLabelWidth},{default:o(()=>[l(i,{modelValue:e.data.userId,"onUpdate:modelValue":a[11]||(a[11]=t=>e.data.userId=t),autocomplete:"off"},null,8,["modelValue"])]),_:1},8,["label-width"])]),_:1},8,["model"])]),_:1},8,["modelValue"])],64)}const S=j(D,[["render",H]]);export{S as default};
