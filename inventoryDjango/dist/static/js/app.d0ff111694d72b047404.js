webpackJsonp([1],{"2yZZ":function(e,t){},Bog5:function(e,t){},GG51:function(e,t){},KMqg:function(e,t){},NHnr:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=a("7+uW"),n={name:"App",mounted:function(){particlesJS.load("particles","static/particles.json")}},l={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",{attrs:{id:"app"}},[t("div",{attrs:{id:"particles"}}),this._v(" "),t("router-view")],1)},staticRenderFns:[]};var s=a("VU/8")(n,l,!1,function(e){a("GG51")},null,null).exports,o=a("/ocq"),r={data:function(){return{showList:!1,listName:[],searchData:"",showSearch:!1}},mounted:function(){this.showCount()},computed:{pStyle:function(){return["butsP",this.showSearch?"":"butChange"]},sStyle:function(){return["butsP",this.showSearch?"butChange":""]}},methods:{newCount:function(){this.$router.push({name:"drawTable",path:"/drawTable"})},showCount:function(){var e=this;this.showSearch=!1,this.$ajax({method:"get",url:this.$globalUrl+"/api/showFileList"}).then(function(t){e.showList=!0,e.listName=[],e.listName=t.data})},searchCount:function(){this.showSearch=!0,this.showList=!1,this.listName=[]},searchIt:function(){var e=this;this.$ajax({method:"post",url:this.$globalUrl+"/api/showSomeFile",data:{searchData:this.searchData}}).then(function(t){e.showList=!0,e.listName=[],e.listName=t.data,0===t.data.length&&e.$message({showClose:!0,message:"没有找到相关文件",type:"warning",duration:1e3})})},exportExcel:function(e){var t=this.listName[e].id;location.href=this.$globalUrl+"/api/exportExcel/"+t},delateExcel:function(e){var t=this,a=this.listName[e].id;this.$ajax({method:"GET",url:this.$globalUrl+"/api/deleteNum",params:{ids:a}}).then(function(e){"success"===e.data.type&&t.$message({message:"删除成功",showClose:!0,type:"success",duration:1e3}),t.showSearch?t.searchIt():t.showCount()})},printCount:function(e){var t=this.listName[e].id;this.$router.push({name:"printTable",path:"/printTable",params:{ids:t}})}}},c={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"hello"},[a("el-row",{staticStyle:{margin:"0"},attrs:{gutter:24}},[a("el-col",{attrs:{span:5,offset:2}},[a("div",{staticClass:"title"},[a("p",[e._v("永光汽车修理部")]),e._v(" "),a("p",[e._v("结算系统")])])])],1),e._v(" "),a("el-row",{staticStyle:{margin:"0"},attrs:{gutter:24}},[a("el-col",{attrs:{span:6,offset:2}},[a("div",{staticClass:"buts"},[a("p",{class:e.pStyle,on:{click:e.showCount}},[e._v("显示全部清单")]),e._v(" "),a("p",{class:e.sStyle,on:{click:e.searchCount}},[e._v("搜索清单")]),e._v(" "),a("p",{staticClass:"butsP",on:{click:e.newCount}},[e._v("新建清单")])])]),e._v(" "),a("el-col",{attrs:{span:10,offset:0}},[a("div",{staticClass:"leftCon"},[a("div",{directives:[{name:"show",rawName:"v-show",value:e.showSearch,expression:"showSearch"}],staticClass:"search"},[a("el-input",{staticClass:"input-with-select",attrs:{placeholder:"可依据 车型/车主/日期/完整文件名 查询"},model:{value:e.searchData,callback:function(t){e.searchData=t},expression:"searchData"}},[a("el-button",{attrs:{slot:"append",icon:"el-icon-search"},on:{click:e.searchIt},slot:"append"})],1)],1),e._v(" "),a("ul",e._l(e.listName,function(t,i){return e.showList?a("li",{on:{click:function(t){e.printCount(i)}}},[e._v("\n                        "+e._s(t.fileName)+"\n                        "),a("p",[a("a",{on:{click:function(t){t.stopPropagation(),e.exportExcel(i)}}},[e._v("导出")])]),e._v(" "),a("p",[a("span",{on:{click:function(t){t.stopPropagation(),e.delateExcel(i)}}},[e._v("删除")])])]):e._e()}))])])],1)],1)},staticRenderFns:[]};var u=a("VU/8")(r,c,!1,function(e){a("OAa8")},"data-v-8f58d034",null).exports,h=a("mvHQ"),m=a.n(h),p={props:{title:{type:String,default:"标题"},size:{type:String,default:"small"},dialogVisible:{type:Boolean,default:!1},okCallback:{type:Function},cancleCallback:{type:Function}},data:function(){return{showdialog:this.dialogVisible}},watch:{dialogVisible:function(e){this.showdialog=e}},methods:{okFn:function(){this.okCallback&&(this.showdialog=!1,this.okCallback())},closeFn:function(){this.cancleCallback&&(this.showdialog=!1,this.cancleCallback())}}},d={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-dialog",{attrs:{modal:!0,title:e.title,size:e.size,width:"70%",visible:e.showdialog,"before-close":e.closeFn}},[e._t("default"),e._v(" "),a("span",{attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:e.closeFn}},[e._v("取消")]),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:e.okFn}},[e._v("确定")])],1)],2)},staticRenderFns:[]};var v=a("VU/8")(p,d,!1,function(e){a("Bog5")},null,null).exports,f=function(e){var t,a,i,n,l,s,o,r,c,u,h,m,p,d;if(""==(e=e.toString()))return alert("请输入小写金额！"),"";if(null!=e.match(/[^,.\d]/))return alert("小写金额含有无效字符！, 比如负数"),"";if(null==e.match(/^((\d{1,3}(,\d{3})*(.((\d{3},)*\d{1,3}))?)|(\d+(.\d+)?))$/))return alert("小写金额的格式不正确！, 比如负数"),"";if(e=(e=e.replace(/,/g,"")).replace(/^0+/,""),Number(e)>99999999999.99)return alert("金额过大，应小于1000亿元！"),"";if((n=e.split(".")).length>1?(t=n[0],a=(a=n[1]).substr(0,2)):(t=n[0],a=""),l=new Array("零","壹","贰","叁","肆","伍","陆","柒","捌","玖"),s=new Array("","拾","佰","仟"),o=new Array("","万","亿"),r=new Array("角","分"),i="",Number(t)>0){for(c=0,u=0;u<t.length;u++)p=(h=t.length-u-1)/4,d=h%4,"0"==(m=t.substr(u,1))?c++:(c>0&&(i+=l[0]),c=0,i+=l[Number(m)]+s[d]),0==d&&c<4&&(i+=o[p],c=0);i+="元"}if(""!=a)for(u=0;u<a.length;u++)"0"!=(m=a.substr(u,1))&&(i+=l[Number(m)]+r[u]);return""==i&&(i="零元"),""==a&&(i+="整"),i},_=a("M4fF"),b=a.n(_),g={data:function(){return{dialogButsType:"",dialogTitle:"",showDialog:!1,tableTitle:"西安****服务有限公司",liName:[{name:"结算单号",key:"billNum",inputs:""},{name:"进厂日期",key:"incomingDate",inputs:""},{name:"出厂日期",key:"outDate",inputs:""},{name:"结算日期",key:"settlementDate",inputs:""},{name:"车牌",key:"licensePlate",inputs:""},{name:"车型",key:"carModel",inputs:""},{name:"修理类别",key:"fixType",inputs:""},{name:"车主",key:"carOwner",inputs:""},{name:"联系人",key:"carContact",inputs:""},{name:"手机",key:"phoneNumber",inputs:""},{name:"车架号",key:"carFrameCode",inputs:""},{name:"发动机号",key:"engineCode",inputs:""},{name:"备注",key:"remark",inputs:""},{name:"里程数",key:"incomingMileage",inputs:""}],isIndeterminate:!0,checkAll:!1,checkNum:[],allNum:[],opt:{mainProjectArr:[],materialProjectArr:[]},maintenanceFees:"-----",materialFees:"-----",allMoneyChina:"-----",allMoney:"-----",telePhone:"",fax:"",local:"",mainProject:[],fileName:"",fileShow:!0,materialProject:[],values:"1",settlementStatus:!1,options:[{value:"1",label:"未入账"},{value:"2",label:"已入账"}]}},watch:{mainProject:{deep:!0,handler:function(){this.settlementStatus=!1}},materialProject:{deep:!0,handler:function(){this.settlementStatus=!1}}},mounted:function(){this.getProjectNum()},methods:{focusB:function(e){e.target.style.background="#fff"},blurB:function(e){e.target.style.background="none"},pointTwo:function(e){return e=(e=Math.round(100*e)/100).toFixed(2)},settlement:function(){var e=this;this.maintenanceFees=0,this.materialFees=0,this.mainProject.forEach(function(t){return e.maintenanceFees+=+t.inputs,t.inputs=e.pointTwo(t.inputs),t}),this.maintenanceFees=new Number(this.maintenanceFees).toFixed(2),this.materialProject.forEach(function(t){return t.money=+t.inputCount*+t.inputNum,e.materialFees+=+t.money,t.inputNum=e.pointTwo(t.inputNum),t.money=e.pointTwo(t.money),t}),this.allMoney=this.maintenanceFees+this.materialFees,this.allMoneyChina=f(this.allMoney),this.materialFees=this.pointTwo(this.materialFees),this.maintenanceFees=this.pointTwo(this.maintenanceFees),this.allMoney=this.pointTwo(this.allMoney),this.settlementStatus=!0},informationSave:function(){var e=this;this.$ajax({method:"post",url:this.$globalUrl+"/api/insertNum",data:{liName:this.liName,fileName:this.fileName,tableTitle:this.tableTitle,maintenanceFees:this.maintenanceFees,materialFees:this.materialFees,allMoneyChina:this.allMoneyChina,allMoney:this.allMoney,telePhone:this.telePhone,local:this.local,payment:this.values,mainProject:m()(this.mainProject),materialProject:m()(this.materialProject)}}).then(function(t){"success"===t.data.type?(e.$message({message:"文件保存成功",type:"success",duration:1e3}),setTimeout(function(){e.$router.push({name:"Hello",path:"/hello"})},1e3)):e.$alert("文件名冲突, 保存失败")})},getDate:function(){return""+(new Date).getFullYear()+((new Date).getMonth()+1)+(new Date).getDate()},saveIt:function(){var e=0,t=0,a=0;if(this.liName.forEach(function(t){""===t.inputs&&"remark"!==t.key&&(e=1)}),0===e)if(""!==this.tableTitle)if(""!==this.telePhone)if(""!==this.local)if(this.mainProject.forEach(function(e){""===e.inputs&&(t=1)}),0===t)if(this.materialProject.forEach(function(e){""!==e.inputCount&&""!==e.inputNum||(a=1)}),0===a)if(!1!==this.settlementStatus){var i=void 0,n=void 0;this.liName.forEach(function(e){"carOwner"===e.key&&(i=e.inputs),"carModel"===e.key&&(n=e.inputs)}),this.fileName=n+"-"+i+"-"+this.getDate(),this.fileShow=!0,this.informationSave()}else this.$alert("请结算清单",{confirmButtonText:"确定"});else this.$alert("请填写数量或单价",{confirmButtonText:"确定"});else this.$alert("请填写维修费用",{confirmButtonText:"确定"});else this.$alert("请填写地址",{confirmButtonText:"确定"});else this.$alert("请填写电话",{confirmButtonText:"确定"});else this.$alert("请填写公司名称",{confirmButtonText:"确定"});else this.$alert("请填写具体信息",{confirmButtonText:"确定"})},getProjectNum:function(){var e=this;this.$ajax({method:"get",url:this.$globalUrl+"/api/projectlist"}).then(function(t){var a=t.data;a.mainProject.forEach(function(t){t.label=t.mainList,t.inputs="",e.opt.mainProjectArr.push(t)}),a.materialProject.forEach(function(t){t.inputNum="",t.inputCount="",t.label=t.materialList+" - "+t.unt,e.opt.materialProjectArr.push(t)})}).catch(function(e){console.log(e)})},handleCheckAllChange:function(e){this.checkNum=e?this.allNum:[],this.isIndeterminate=!1},handleCheckNumChange:function(e){this.checkAll=e.length===this.allNum.length,this.isIndeterminate=e.length>0&&e.length<this.allNum.length},okFun:function(){this.showDialog=!1,this.checkAll=!1,this.isIndeterminate=!0,1===this.dialogButsType?this.mainProject=this.checkNum:this.materialProject=this.checkNum},cancleFun:function(){this.showDialog=!1,this.checkAll=!1,this.isIndeterminate=!0},mainDialog:function(){this.dialogTitle="维修项目",this.showDialog=!0,this.checkNum=[],this.allNum=[],this.dialogButsType=1,this.allNum=b.a.cloneDeep(this.opt.mainProjectArr)},materialDialog:function(){this.dialogTitle="材料项目",this.showDialog=!0,this.checkNum=[],this.allNum=[],this.dialogButsType=2,this.allNum=b.a.cloneDeep(this.opt.materialProjectArr)},delLi:function(e){this.materialProject.splice(e,1)},delLiM:function(e){this.mainProject.splice(e,1)},addMainProject:function(){this.mainProject.push({name:"",inputs:""})},addMaterialProject:function(){this.materialProject.push({name:"",inputCount:"",unt:"",inputNum:"",money:""})}},components:{sysdialog:v}},k={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"drawTale"},[a("el-row",{staticStyle:{margin:"0"},attrs:{gutter:24}},[a("el-col",{attrs:{span:5,offset:2}},[a("div",{staticClass:"title"},[a("p",[e._v("永光汽车修理部")]),e._v(" "),a("p",[e._v("结算系统")])])]),e._v(" "),a("el-col",{attrs:{span:8,offset:8}},[a("div",{staticClass:"btnBox"},[a("el-button",{staticStyle:{margin:"0 40px 0 0"},on:{click:e.mainDialog}},[e._v("维修项目")]),e._v(" "),a("el-button",{staticStyle:{margin:"0 40px 0 0"},on:{click:e.materialDialog}},[e._v("材料项目")]),e._v(" "),a("el-button",{staticStyle:{margin:"0 40px 0 0"},attrs:{type:"primary"},on:{click:e.saveIt}},[e._v("保存清单")])],1)])],1),e._v(" "),a("el-col",{attrs:{span:20,offset:2}},[a("el-row",[a("p",{staticClass:"titleContent"},[a("el-input",{attrs:{placeholder:"请输入公司名称"},model:{value:e.tableTitle,callback:function(t){e.tableTitle=t},expression:"tableTitle"}})],1),e._v(" "),a("h2",[e._v("结算单")]),e._v(" "),a("div",{staticClass:"tableHead"},[a("ul",{staticClass:"tableHeadUl ulcss"},e._l(e.liName,function(t){return a("li",[a("p",[e._v(e._s(t.name))]),e._v(" "),a("p",[a("el-input",{on:{focus:e.focusB,blur:e.blurB},model:{value:t.inputs,callback:function(a){e.$set(t,"inputs",a)},expression:"item.inputs"}})],1)])}))])]),e._v(" "),a("el-row",[a("div",{staticClass:"tableMiddle"},[a("ul",{staticClass:"middleHead ulcss"},[a("li",[a("p",[e._v("序号")]),e._v(" "),a("p",[e._v("\n                            维修项目\n                            "),a("i",{staticClass:"el-icon-circle-plus",on:{click:e.addMainProject}})]),e._v(" "),a("p",[e._v("修理费")])]),e._v(" "),a("li",[a("p",[e._v("序号")]),e._v(" "),a("p",[e._v("维修项目")]),e._v(" "),a("p",[e._v("修理费")])])]),e._v(" "),a("ul",{staticClass:"middleContent ulcss"},e._l(e.mainProject,function(t,i){return a("li",[a("p",[e._v("\n                            "+e._s(i+1)+"\n                            "),a("i",{staticClass:"el-icon-error",on:{click:function(t){e.delLiM(i)}}})]),e._v(" "),a("p",[a("el-input",{on:{focus:e.focusB,blur:e.blurB},model:{value:t.mainList,callback:function(a){e.$set(t,"mainList",a)},expression:"item.mainList"}})],1),e._v(" "),a("p",[a("el-input",{on:{focus:e.focusB,blur:e.blurB},model:{value:t.inputs,callback:function(a){e.$set(t,"inputs",a)},expression:"item.inputs"}})],1)])})),e._v(" "),a("div",{staticClass:"middleFoot"},[a("span",{staticStyle:{"padding-right":"300px"}},[e._v("维修费小计： "+e._s(e.maintenanceFees))])])])]),e._v(" "),a("el-row",[a("div",{staticClass:"tableBottom"},[a("ul",{staticClass:"bottomHead ulcss"},[a("li",[a("p",[e._v("序号")]),e._v(" "),a("p",[e._v("\n                            材料项目\n                            "),a("i",{staticClass:"el-icon-circle-plus",on:{click:e.addMaterialProject}})]),e._v(" "),a("p",[e._v("数量")]),e._v(" "),a("p",[e._v("单位")]),e._v(" "),a("p",[e._v("单价")]),e._v(" "),a("p",[e._v("金额")])]),e._v(" "),a("li",[a("p",[e._v("序号")]),e._v(" "),a("p",[e._v("材料项目")]),e._v(" "),a("p",[e._v("数量")]),e._v(" "),a("p",[e._v("单位")]),e._v(" "),a("p",[e._v("单价")]),e._v(" "),a("p",[e._v("金额")])])]),e._v(" "),a("ul",{staticClass:"bottomContent ulcss"},e._l(e.materialProject,function(t,i){return a("li",[a("p",{staticClass:"ulcssIndex"},[e._v(" \n                            "+e._s(i+1)+"\n                            "),a("i",{staticClass:"el-icon-error",on:{click:function(t){e.delLi(i)}}})]),e._v(" "),a("p",[a("el-input",{on:{focus:e.focusB,blur:e.blurB},model:{value:t.materialList,callback:function(a){e.$set(t,"materialList",a)},expression:"item.materialList"}})],1),e._v(" "),a("p",[a("el-input",{on:{focus:e.focusB,blur:e.blurB},model:{value:t.inputCount,callback:function(a){e.$set(t,"inputCount",a)},expression:"item.inputCount"}})],1),e._v(" "),a("p",[a("el-input",{on:{focus:e.focusB,blur:e.blurB},model:{value:t.unt,callback:function(a){e.$set(t,"unt",a)},expression:"item.unt"}})],1),e._v(" "),a("p",[a("el-input",{on:{focus:e.focusB,blur:e.blurB},model:{value:t.inputNum,callback:function(a){e.$set(t,"inputNum",a)},expression:"item.inputNum"}})],1),e._v(" "),a("p",[e._v(e._s(t.money))])])})),e._v(" "),a("div",{staticClass:"middleFoot"},[a("span",{staticStyle:{"padding-right":"300px"}},[e._v("材料费小计： "+e._s(e.materialFees))])])])]),e._v(" "),a("el-row",[a("div",{staticClass:"total"},[a("p",[e._v("合计金额："+e._s(e.allMoneyChina))]),e._v(" "),a("p",[e._v("总计："+e._s(e.allMoney))]),e._v(" "),a("p",[a("span",[e._v("入帐方式：")]),e._v(" "),a("el-select",{attrs:{placeholder:"请选择"},model:{value:e.values,callback:function(t){e.values=t},expression:"values"}},e._l(e.options,function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}))],1),e._v(" "),a("p",[a("el-button",{attrs:{type:"primary"},on:{click:e.settlement}},[e._v("结算")])],1)])]),e._v(" "),a("el-row",[a("div",{staticClass:"info",staticStyle:{"margin-bottom":"40px"}},[a("el-col",{staticClass:"userName",attrs:{span:12}},[a("p",[e._v("客户验收及签署：")])]),e._v(" "),a("el-col",{attrs:{span:12}},[a("ul",{staticClass:"ulcss"},[a("li",[a("p",[e._v(e._s(e.tableTitle))])]),e._v(" "),a("li",[a("p",[e._v("电话：")]),e._v(" "),a("p",[a("el-input",{model:{value:e.telePhone,callback:function(t){e.telePhone=t},expression:"telePhone"}})],1),e._v(" "),a("p",[e._v("地址：")]),e._v(" "),a("p",[a("el-input",{model:{value:e.local,callback:function(t){e.local=t},expression:"local"}})],1)])])])],1)]),e._v(" "),a("el-row",[a("el-col",{attrs:{span:4,offset:18}},[a("p",{directives:[{name:"show",rawName:"v-show",value:e.fileShow,expression:"fileShow"}],staticStyle:{"border-bottom":"1px solid #ccc",margin:"0 0 50px 0"},domProps:{textContent:e._s("文件名："+e.fileName)}})])],1)],1),e._v(" "),a("sysdialog",{attrs:{title:e.dialogTitle,dialogVisible:e.showDialog,okCallback:e.okFun,cancleCallback:e.cancleFun}},[a("div",{staticClass:"dialogCheck"},[a("el-checkbox",{attrs:{indeterminate:e.isIndeterminate},on:{change:e.handleCheckAllChange},model:{value:e.checkAll,callback:function(t){e.checkAll=t},expression:"checkAll"}},[e._v("\n                全选\n            ")]),e._v(" "),a("el-checkbox-group",{on:{change:e.handleCheckNumChange},model:{value:e.checkNum,callback:function(t){e.checkNum=t},expression:"checkNum"}},e._l(e.allNum,function(t){return a("el-checkbox",{key:t.ids,attrs:{label:t}},[e._v("\n                    "+e._s(t.label)+"\n                ")])}))],1)])],1)},staticRenderFns:[]};var y=a("VU/8")(g,k,!1,function(e){a("KMqg")},"data-v-8a2b0dec",null).exports,w={data:function(){return{read:!0,dialogButsType:"",dialogTitle:"",showDialog:!1,tableTitle:"西安****服务有限公司",liName:[{name:"结算单号",key:"billNum",inputs:""},{name:"进厂日期",key:"incomingDate",inputs:""},{name:"出厂日期",key:"outDate",inputs:""},{name:"结算日期",key:"settlementDate",inputs:""},{name:"车牌",key:"licensePlate",inputs:""},{name:"车型",key:"carModel",inputs:""},{name:"修理类别",key:"fixType",inputs:""},{name:"车主",key:"carOwner",inputs:""},{name:"联系人",key:"carContact",inputs:""},{name:"手机",key:"phoneNumber",inputs:""},{name:"车架号",key:"carFrameCode",inputs:""},{name:"发动机号",key:"engineCode",inputs:""},{name:"备注",key:"remark",inputs:""},{name:"里程数",key:"incomingMileage",inputs:""}],isIndeterminate:!0,checkAll:!1,checkNum:[],allNum:[],opt:{mainProjectArr:[],materialProjectArr:[]},maintenanceFees:"-----",materialFees:"-----",allMoneyChina:"-----",allMoney:"-----",telePhone:"",fax:"",local:"",mainProject:[],fileName:"",fileShow:!0,materialProject:[],values:"1",settlementStatus:!1,options:[{value:"1",label:"未入账"},{value:"2",label:"已入账"}],oldData:{}}},watch:{mainProject:{deep:!0,handler:function(){this.settlementStatus=!1}},materialProject:{deep:!0,handler:function(){this.settlementStatus=!1}}},mounted:function(){this.getProjectNum(),this.showData()},methods:{focusB:function(e){e.target.style.background="#fff"},blurB:function(e){e.target.style.background="none"},showData:function(){var e=this;this.$ajax({method:"get",url:this.$globalUrl+"/api/searchNum",params:{ids:this.$route.params.ids}}).then(function(t){if("error"===t.data.type)e.$message({showClose:!0,message:t.data.message,type:"warning",duration:2e3});else{e.oldData=t.data;var a=t.data;e.liName.forEach(function(e){e.inputs=a[e.key]}),e.fileName=a.fileName,e.tableTitle=a.tableTitle,e.maintenanceFees=a.maintenanceFees,e.materialFees=a.materialFees,e.allMoneyChina=a.allMoneyChina,e.allMoney=a.allMoney,e.telePhone=a.telePhone,e.local=a.local,e.values=a.payment,e.mainProject=JSON.parse(a.mainProject),e.materialProject=JSON.parse(a.materialProject)}}).catch(function(e){console.log(e)})},pointTwo:function(e){return e=(e=Math.round(100*e)/100).toFixed(2)},settlement:function(){var e=this;this.maintenanceFees=0,this.materialFees=0,this.mainProject.forEach(function(t){return e.maintenanceFees+=+t.inputs,t.inputs=e.pointTwo(t.inputs),t}),this.materialProject.forEach(function(t){return t.money=+t.inputCount*+t.inputNum,e.materialFees+=+t.money,t.inputNum=e.pointTwo(t.inputNum),t.money=e.pointTwo(t.money),t}),this.allMoney=this.maintenanceFees+this.materialFees,this.allMoneyChina=f(this.allMoney),this.materialFees=this.pointTwo(this.materialFees),this.maintenanceFees=this.pointTwo(this.maintenanceFees),this.allMoney=this.pointTwo(this.allMoney),this.settlementStatus=!0},getDate:function(){return""+(new Date).getFullYear()+((new Date).getMonth()+1)+(new Date).getDate()},informationSave:function(){var e=this;this.$ajax({method:"post",url:this.$globalUrl+"/api/updateNum",data:{ids:this.$route.params.ids,liName:this.liName,fileName:this.fileName,tableTitle:this.tableTitle,maintenanceFees:this.maintenanceFees,materialFees:this.materialFees,allMoneyChina:this.allMoneyChina,allMoney:this.allMoney,telePhone:this.telePhone,local:this.local,payment:this.values,mainProject:m()(this.mainProject),materialProject:m()(this.materialProject)}}).then(function(t){"success"===t.data.type?(e.$message({message:"文件保存成功",type:"success",duration:1e3}),setTimeout(function(){e.$router.push({name:"Hello",path:"/hello"})},1e3)):e.$alert("非已有文件，请打开已有文件进行修改")})},saveIt:function(){var e=0,t=0,a=0;if(this.liName.forEach(function(t){""===t.inputs&&"remark"!==t.key&&(e=1)}),0===e)if(""!==this.tableTitle)if(""!==this.telePhone)if(""!==this.local)if(this.mainProject.forEach(function(e){""===e.inputs&&(t=1)}),0===t)if(this.materialProject.forEach(function(e){""!==e.inputCount&&""!==e.inputNum||(a=1)}),0===a)if(!1!==this.settlementStatus){this.fileShow=!0;var i=void 0,n=void 0;this.liName.forEach(function(e){"carOwner"===e.key&&(i=e.inputs),"carModel"===e.key&&(n=e.inputs)}),this.fileName=n+"-"+i+"-"+this.getDate(),this.informationSave()}else this.$alert("请结算清单",{confirmButtonText:"确定"});else this.$alert("请填写数量或单价",{confirmButtonText:"确定"});else this.$alert("请填写维修费用",{confirmButtonText:"确定"});else this.$alert("请填写地址",{confirmButtonText:"确定"});else this.$alert("请填写电话",{confirmButtonText:"确定"});else this.$alert("请填写公司名称",{confirmButtonText:"确定"});else this.$alert("请填写具体信息",{confirmButtonText:"确定"})},getProjectNum:function(){var e=this;this.$ajax({method:"get",url:this.$globalUrl+"/api/projectlist"}).then(function(t){var a=t.data;a.mainProject.forEach(function(t){t.label=t.mainList,t.inputs="",e.opt.mainProjectArr.push(t)}),a.materialProject.forEach(function(t){t.inputNum="",t.inputCount="",t.label=t.materialList+" - "+t.unt,e.opt.materialProjectArr.push(t)})}).catch(function(e){console.log(e)})},handleCheckAllChange:function(e){this.checkNum=e?this.allNum:[],this.isIndeterminate=!1},handleCheckNumChange:function(e){this.checkAll=e.length===this.allNum.length,this.isIndeterminate=e.length>0&&e.length<this.allNum.length},okFun:function(){this.showDialog=!1,this.checkAll=!1,this.isIndeterminate=!0,1===this.dialogButsType?this.mainProject=this.checkNum:this.materialProject=this.checkNum},cancleFun:function(){this.showDialog=!1,this.checkAll=!1,this.isIndeterminate=!0},openEdit:function(){this.read=!1},cancleEdit:function(){var e=this.oldData;this.liName.forEach(function(t){t.inputs=e[t.key]}),this.fileName=e.fileName,this.tableTitle=e.tableTitle,this.maintenanceFees=e.maintenanceFees,this.materialFees=e.materialFees,this.allMoneyChina=e.allMoneyChina,this.allMoney=e.allMoney,this.telePhone=e.telePhone,this.local=e.local,this.values=e.payment,this.mainProject=JSON.parse(e.mainProject),this.materialProject=JSON.parse(e.materialProject),this.read=!0},mainDialog:function(){this.dialogTitle="维修项目",this.showDialog=!0,this.checkNum=[],this.allNum=[],this.dialogButsType=1,this.allNum=b.a.cloneDeep(this.opt.mainProjectArr)},materialDialog:function(){this.dialogTitle="材料项目",this.showDialog=!0,this.checkNum=[],this.allNum=[],this.dialogButsType=2,this.allNum=b.a.cloneDeep(this.opt.materialProjectArr)},delLi:function(e){this.materialProject.splice(e,1)},delLiM:function(e){this.mainProject.splice(e,1)},addMainProject:function(){this.mainProject.push({name:"",inputs:""})},addMaterialProject:function(){this.materialProject.push({name:"",inputCount:"",unt:"",inputNum:"",money:""})}},components:{sysdialog:v}},C={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"printTable"},[a("el-row",{attrs:{gutter:20}},[a("el-col",{attrs:{span:5,offset:2}},[a("div",{staticClass:"title"},[a("p",[e._v("永光汽车修理部")]),e._v(" "),a("p",[e._v("结算系统")])])]),e._v(" "),a("el-col",{attrs:{span:11,offset:6}},[a("div",{staticClass:"btnBox"},[a("el-button",{directives:[{name:"show",rawName:"v-show",value:e.read,expression:"read"}],staticStyle:{"margin-left":"350px"},attrs:{type:"primary"},on:{click:e.openEdit}},[e._v("\n                      编辑  \n                ")]),e._v(" "),a("el-button",{directives:[{name:"show",rawName:"v-show",value:!e.read,expression:"!read"}],on:{click:e.cancleEdit}},[e._v("\n                    取消编辑\n                ")]),e._v(" "),a("el-button",{directives:[{name:"show",rawName:"v-show",value:!e.read,expression:"!read"}],on:{click:e.mainDialog}},[e._v("维修项目")]),e._v(" "),a("el-button",{directives:[{name:"show",rawName:"v-show",value:!e.read,expression:"!read"}],on:{click:e.materialDialog}},[e._v("材料项目")]),e._v(" "),a("el-button",{directives:[{name:"show",rawName:"v-show",value:!e.read,expression:"!read"}],attrs:{type:"primary"},on:{click:e.saveIt}},[e._v("\n                    保存清单\n                ")])],1)])],1),e._v(" "),a("el-row",{attrs:{gutter:24}},[a("el-col",{attrs:{span:20,offset:2}},[a("el-row",[a("p",{staticClass:"titleContent"},[a("el-input",{attrs:{placeholder:"请输入公司名称",disabled:e.read},model:{value:e.tableTitle,callback:function(t){e.tableTitle=t},expression:"tableTitle"}})],1),e._v(" "),a("h2",[e._v("结算单")]),e._v(" "),a("div",{staticClass:"tableHead"},[a("ul",{staticClass:"tableHeadUl ulcss"},e._l(e.liName,function(t){return a("li",[a("p",[e._v(e._s(t.name))]),e._v(" "),a("p",[a("el-input",{attrs:{disabled:e.read},on:{focus:e.focusB,blur:e.blurB},model:{value:t.inputs,callback:function(a){e.$set(t,"inputs",a)},expression:"item.inputs"}})],1)])}))])]),e._v(" "),a("el-row",[a("div",{staticClass:"tableMiddle"},[a("ul",{staticClass:"middleHead ulcss"},[a("li",[a("p",[e._v("序号")]),e._v(" "),a("p",[e._v("\n                                维修项目\n                                "),a("i",{directives:[{name:"show",rawName:"v-show",value:!e.read,expression:"!read"}],staticClass:"el-icon-circle-plus",on:{click:e.addMainProject}})]),e._v(" "),a("p",[e._v("修理费")])]),e._v(" "),a("li",[a("p",[e._v("序号")]),e._v(" "),a("p",[e._v("维修项目")]),e._v(" "),a("p",[e._v("修理费")])])]),e._v(" "),a("ul",{staticClass:"middleContent ulcss"},e._l(e.mainProject,function(t,i){return a("li",[a("p",[e._v("\n                                "+e._s(i+1)+"\n                                "),a("i",{directives:[{name:"show",rawName:"v-show",value:!e.read,expression:"!read"}],staticClass:"el-icon-error",on:{click:function(t){e.delLiM(i)}}})]),e._v(" "),a("p",[a("el-input",{on:{focus:e.focusB,blur:e.blurB},model:{value:t.mainList,callback:function(a){e.$set(t,"mainList",a)},expression:"item.mainList"}})],1),e._v(" "),a("p",[a("el-input",{on:{focus:e.focusB,blur:e.blurB},model:{value:t.inputs,callback:function(a){e.$set(t,"inputs",a)},expression:"item.inputs"}})],1)])})),e._v(" "),a("div",{staticClass:"middleFoot"},[a("span",{staticStyle:{"padding-right":"300px"}},[e._v("维修费小计： "+e._s(e.maintenanceFees))])])])]),e._v(" "),a("el-row",[a("div",{staticClass:"tableBottom"},[a("ul",{staticClass:"bottomHead ulcss"},[a("li",[a("p",[e._v("序号")]),e._v(" "),a("p",[e._v("\n                                材料项目\n                                "),a("i",{directives:[{name:"show",rawName:"v-show",value:!e.read,expression:"!read"}],staticClass:"el-icon-circle-plus",on:{click:e.addMaterialProject}})]),e._v(" "),a("p",[e._v("数量")]),e._v(" "),a("p",[e._v("单位")]),e._v(" "),a("p",[e._v("单价")]),e._v(" "),a("p",[e._v("金额")])]),e._v(" "),a("li",[a("p",[e._v("序号")]),e._v(" "),a("p",[e._v("材料项目")]),e._v(" "),a("p",[e._v("数量")]),e._v(" "),a("p",[e._v("单位")]),e._v(" "),a("p",[e._v("单价")]),e._v(" "),a("p",[e._v("金额")])])]),e._v(" "),a("ul",{staticClass:"bottomContent ulcss"},e._l(e.materialProject,function(t,i){return a("li",[a("p",{staticClass:"ulcssIndex"},[e._v(" \n                                "+e._s(i+1)+"\n                                "),a("i",{directives:[{name:"show",rawName:"v-show",value:!e.read,expression:"!read"}],staticClass:"el-icon-error",on:{click:function(t){e.delLi(i)}}})]),e._v(" "),a("p",[a("el-input",{on:{focus:e.focusB,blur:e.blurB},model:{value:t.materialList,callback:function(a){e.$set(t,"materialList",a)},expression:"item.materialList"}})],1),e._v(" "),a("p",[a("el-input",{on:{focus:e.focusB,blur:e.blurB},model:{value:t.inputCount,callback:function(a){e.$set(t,"inputCount",a)},expression:"item.inputCount"}})],1),e._v(" "),a("p",[a("el-input",{on:{focus:e.focusB,blur:e.blurB},model:{value:t.unt,callback:function(a){e.$set(t,"unt",a)},expression:"item.unt"}})],1),e._v(" "),a("p",[a("el-input",{on:{focus:e.focusB,blur:e.blurB},model:{value:t.inputNum,callback:function(a){e.$set(t,"inputNum",a)},expression:"item.inputNum"}})],1),e._v(" "),a("p",[e._v(e._s(t.money))])])})),e._v(" "),a("div",{staticClass:"middleFoot"},[a("span",{staticStyle:{"padding-right":"300px"}},[e._v("材料费小计： "+e._s(e.materialFees))])])])]),e._v(" "),a("el-row",[a("div",{staticClass:"total"},[a("p",[e._v("合计金额："+e._s(e.allMoneyChina))]),e._v(" "),a("p",[e._v("总计："+e._s(e.allMoney))]),e._v(" "),a("p",[a("span",[e._v("入帐方式：")]),e._v(" "),a("el-select",{attrs:{placeholder:"请选择",disabled:e.read},model:{value:e.values,callback:function(t){e.values=t},expression:"values"}},e._l(e.options,function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}))],1),e._v(" "),a("p",[a("el-button",{directives:[{name:"show",rawName:"v-show",value:!e.read,expression:"!read"}],attrs:{type:"primary"},on:{click:e.settlement}},[e._v("结算")])],1)])]),e._v(" "),a("el-row",[a("div",{staticClass:"info",staticStyle:{"margin-bottom":"40px"}},[a("el-col",{staticClass:"userName",attrs:{span:12}},[a("p",[e._v("客户验收及签署：")])]),e._v(" "),a("el-col",{attrs:{span:12}},[a("ul",{staticClass:"ulcss"},[a("li",[a("p",[e._v(e._s(e.tableTitle))])]),e._v(" "),a("li",[a("p",[e._v("电话：")]),e._v(" "),a("p",[a("el-input",{attrs:{disabled:e.read},model:{value:e.telePhone,callback:function(t){e.telePhone=t},expression:"telePhone"}})],1),e._v(" "),a("p",[e._v("地址：")]),e._v(" "),a("p",[a("el-input",{attrs:{disabled:e.read},model:{value:e.local,callback:function(t){e.local=t},expression:"local"}})],1)])])])],1)]),e._v(" "),a("el-row",[a("el-col",{attrs:{span:5,offset:17}},[a("p",{directives:[{name:"show",rawName:"v-show",value:!e.read,expression:"!read"}],staticStyle:{"border-bottom":"1px solid #ccc",margin:"0 0 50px 0",width:"200px"},domProps:{textContent:e._s("文件名："+e.fileName)}})])],1)],1)],1),e._v(" "),a("sysdialog",{attrs:{title:e.dialogTitle,dialogVisible:e.showDialog,okCallback:e.okFun,cancleCallback:e.cancleFun}},[a("div",{staticClass:"dialogCheck"},[a("el-checkbox",{attrs:{indeterminate:e.isIndeterminate},on:{change:e.handleCheckAllChange},model:{value:e.checkAll,callback:function(t){e.checkAll=t},expression:"checkAll"}},[e._v("\n                全选\n            ")]),e._v(" "),a("el-checkbox-group",{on:{change:e.handleCheckNumChange},model:{value:e.checkNum,callback:function(t){e.checkNum=t},expression:"checkNum"}},e._l(e.allNum,function(t){return a("el-checkbox",{key:t.ids,attrs:{label:t}},[e._v("\n                    "+e._s(t.label)+"\n                ")])}))],1)])],1)},staticRenderFns:[]};var N=a("VU/8")(w,C,!1,function(e){a("sYI/")},"data-v-d92bc228",null).exports,x={data:function(){return{formLabelAlign:{userName:"",passWord:""}}},mounted:function(){var e=this;document.addEventListener("keyup",function(t){e.$refs.enterBtn&&13===t.keyCode&&e.login()},!1)},methods:{login:function(){var e=this;""!==this.formLabelAlign.userName?""!==this.formLabelAlign.passWord?this.$ajax({method:"post",url:this.$globalUrl+"/api/login",data:{userName:this.formLabelAlign.userName,passWord:this.formLabelAlign.passWord}}).then(function(t){"error"===t.data.type?e.$message({showClose:!0,message:t.data.message,type:"warning",duration:1e3}):(sessionStorage.setItem("user","ok"),e.$router.push({path:"/hello",name:"Hello"}))}):this.$message({showClose:!0,message:"请输入密码",type:"warning",duration:1e3}):this.$message({showClose:!0,message:"请输入用户名",type:"warning",duration:1e3})}}},P={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"login"},[a("h1",[e._v("户县永光汽车修理部")]),e._v(" "),a("h2",[e._v("结算系统")]),e._v(" "),a("el-form",{attrs:{"label-position":"left","label-width":"105px",model:e.formLabelAlign}},[a("el-form-item",{attrs:{label:"用户名:"}},[a("el-input",{model:{value:e.formLabelAlign.userName,callback:function(t){e.$set(e.formLabelAlign,"userName",t)},expression:"formLabelAlign.userName"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"密码:"}},[a("el-input",{attrs:{type:"password"},model:{value:e.formLabelAlign.passWord,callback:function(t){e.$set(e.formLabelAlign,"passWord",t)},expression:"formLabelAlign.passWord"}})],1),e._v(" "),a("p",{ref:"enterBtn",staticClass:"loginBtn",on:{click:e.login}},[e._v("登陆")])],1)],1)},staticRenderFns:[]};var j=[{path:"/",redirect:"/login"},{path:"/login",name:"login",component:a("VU/8")(x,P,!1,function(e){a("2yZZ")},null,null).exports},{path:"/hello",name:"Hello",component:u},{path:"/drawTable",name:"drawTable",component:y},{path:"/printTable",name:"printTable",component:N}];i.default.use(o.a);var F=j.map(function(e){return e});F.push({path:"*",redirect:"/"});var T=new o.a({scrollBehavior:function(){return{x:0,y:0}},linkActiveClass:"active",routes:F});T.beforeEach(function(e,t,a){"/login"===e.path&&sessionStorage.removeItem("user"),sessionStorage.getItem("user")||"/login"===e.path?a():a({path:"/"})});var $=T,B=a("zL8q"),M=a.n(B),S=(a("tvR6"),a("NYWk"),a("mtWM")),A=a.n(S),D=a("JAHf"),L=a.n(D);i.default.use(L.a),i.default.config.productionTip=!1,i.default.prototype.$ajax=A.a,i.default.prototype.$globalUrl="http://127.0.0.1:8000",i.default.use(M.a),new i.default({el:"#app",router:$,components:{App:s},template:"<App/>"})},NYWk:function(e,t){},OAa8:function(e,t){},"sYI/":function(e,t){},tvR6:function(e,t){}},["NHnr"]);
//# sourceMappingURL=app.d0ff111694d72b047404.js.map