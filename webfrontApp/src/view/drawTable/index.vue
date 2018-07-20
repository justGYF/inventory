<template>
    <div class="drawTabel">
        <el-row :gutter="20">
            <el-col :span="19">
                <el-row>
                    <p class="titleContent">
                        <el-input placeholder="请输入公司名称" v-model="tableTitle"></el-input>
                    </p>
                    <h2>结算单</h2>
                    <div class="tableHead">
                        <ul class="tableHeadUl ulcss">
                            <li v-for="item in liName">
                                <p>{{item.name}}</p>
                                <p>
                                    <el-input v-model="item.inputs"></el-input>
                                </p>
                            </li>
                        </ul>
                    </div>
                </el-row>
                <el-row>
                    <div class="tableMiddle">
                        <ul class="middleHead ulcss">
                            <li>
                                <p>序号</p>
                                <p>维修项目</p>
                                <p>修理费</p>
                            </li>
                            <li>
                                <p>序号</p>
                                <p>维修项目</p>
                                <p>修理费</p>
                            </li>
                        </ul>
                        <ul class="middleContent ulcss">
                            <li v-for="(item, index) in mainProject">
                                <p>{{index+1}}</p>
                                <p>{{item.mainList}}
                                </p><p>
                                    <el-input v-model="item.inputs"></el-input>
                                </p>
                            </li>
                        </ul>
                        <div class="middleFoot">
                            <span style="padding-right: 300px;">维修费小计： {{maintenanceFees}}</span>
                        </div>
                    </div>
                </el-row>
                <el-row>
                    <div class="tableBottom">
                        <ul class="bottomHead ulcss">
                            <li>
                                <p>序号</p>
                                <p>材料项目</p>
                                <p>数量</p>
                                <p>单位</p>
                                <p>单价</p>
                                <p>金额</p>
                            </li>
                            <li>
                                <p>序号</p>
                                <p>材料项目</p>
                                <p>数量</p>
                                <p>单位</p>
                                <p>单价</p>
                                <p>金额</p>
                            </li>
                        </ul>
                        <ul class="bottomContent ulcss">
                            <li v-for="(item, index) in materialProject">
                                <p>{{index+1}}</p>
                                <p>{{item.materialList}}</p>
                                <p>
                                    <el-input v-model="item.inputCount"></el-input>
                                </p>
                                <p>{{item.unt}}</p>
                                <p>
                                    <el-input v-model="item.inputNum"></el-input>
                                </p>
                                <p>{{item.money}}</p>
                            </li>
                        </ul>
                        <div class="middleFoot">
                            <span style="padding-right: 300px;">材料费小计： {{materialFees}}</span>
                        </div>
                    </div>
                </el-row>
                <el-row>
                    <div class="total">
                        <p>合计金额：{{allMoneyChina}}</p>
                        <p>总计：{{allMoney}}</p>
                        <p>
                            <span>入帐方式：</span>
                            <el-select v-model="values" placeholder="请选择">
                                <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </p>
                        <p>
                            <el-button type="primary" @click="settlement">结算</el-button>
                        </p>
                        
                    </div>
                </el-row>
                <el-row>
                    <div class="info" style="margin-bottom: 40px;">
                        <el-col :span="12" class="userName">
                            <p>客户验收及签署：</p>
                            <!-- 暂时不开发此功能 -->
                            <!-- <el-input></el-input> -->
                        </el-col>
                        <el-col :span="12">
                            <ul class="ulcss">
                                <li>
                                    <p>{{tableTitle}}</p>
                                </li>
                                <li>
                                    <p>电话：</p>
                                    <p><el-input v-model="telePhone"></el-input></p>
<!--                                     <p>传真：</p>
                                    <p><el-input v-model="inputFax"></el-input></p> -->
                                    <p>地址：</p>
                                    <p><el-input v-model="local"></el-input></p>
                                </li>
                            </ul>
                        </el-col>
                    </div>
                </el-row>
            </el-col>
            <el-col :span="3" :offset="1">
                <el-button @click="mainDialog" style="margin: 150px 70px 50px 30px;">维修项目</el-button>
                <el-button @click="materialDialog" style="margin: 50px 70px 50px 30px;">材料项目</el-button>
                <el-button @click="saveIt" type="primary" style="margin: 50px 70px 20px 30px;">保存清单</el-button>
                <p style="border-bottom: 1px solid #ccc; width: 90%;" v-show="fileShow">
                    <el-input v-model="fileName" placeholder="请输入文件名"></el-input>
                </p>
            </el-col>
        </el-row>
        <sysdialog
            :title="dialogTitle"
            :dialogVisible="showDialog"
            :okCallback="okFun"
            :cancleCallback="cancleFun">
            <div class="dialogCheck">
                <el-checkbox
                    :indeterminate="isIndeterminate"
                    v-model="checkAll"
                    @change="handleCheckAllChange">
                    全选
                </el-checkbox>
                <el-checkbox-group
                    v-model="checkNum"
                    @change="handleCheckNumChange">
                    <!-- lable为选中状态的值…… -->
                    <el-checkbox
                    v-for="item in allNum"
                    :label="item"
                    :key="item.ids">
                        {{item.label}}
                    </el-checkbox>
                </el-checkbox-group>
            </div>
        </sysdialog>
    </div>
</template>

<script>
    import sysdialog from '@/components/dialog/sysdialog.vue'
    import { convertCurrency, thousandBitSeparator } from '@/utils/index.js'
    export default {
        data () {
            return {
                // 弹窗按钮状态
                // 1 -- 维修项目； 2 -- 材料项目
                dialogButsType: '',
                // 弹窗相关
                dialogTitle: '',
                showDialog: false,
                tableTitle: '西安****服务有限公司',
                // inputPhone: '1888299629',
                // inputFax: '0021-2526',
                // inputAdress: '西安*****',
                // 基本信息
                liName: [
                    { name: '结算单号', key: 'billNum', inputs: '' },
                    { name: '进厂日期', key: 'incomingDate', inputs: '' },
                    { name: '出厂日期', key: 'outDate', inputs: '' },
                    { name: '结算日期', key: 'settlementDate', inputs: '' },
                    { name: '业务员', key: 'worker', inputs: '' },
                    { name: '车牌', key: 'licensePlate', inputs: '' },
                    { name: '车型', key: 'carModel', inputs: '' },
                    { name: '修理类别', key: 'fixType', inputs: '' },
                    { name: '进厂里程', key: 'incomingMileage', inputs: '' },
                    { name: '车主', key: 'carOwner', inputs: '' },
                    { name: '联系人', key: 'carContact', inputs: '' },
                    { name: '固话', key: 'fixedLine', inputs: '' },
                    { name: '手机', key: 'phoneNumber', inputs: '' },
                    { name: '车架号', key: 'carFrameCode', inputs: '' },
                    { name: '发动机号', key: 'engineCode', inputs: '' },
                    { name: '自编号', key: 'selfEditedCode', inputs: '' },
                    { name: '备注', key: 'remark', inputs: '' }
                ],
                // 弹框中的多选框
                isIndeterminate: true,
                checkAll: false,
                checkNum: [],
                allNum: [],
                // 树形控件的绑定数据
                opt: {
                    mainProjectArr: [],
                    materialProjectArr: []
                },
                // 维修费
                maintenanceFees: '-----',
                // 材料费
                materialFees: '-----',
                // 合计金额
                allMoneyChina: '-----',
                // 总计
                allMoney: '-----',
                // 电话
                telePhone: '-----',
                // 传真
                fax: '-----',
                // 地址
                local: '-----',
                // 维修项目
                mainProject: [
                    // { name: '拆装----', inputs: '' }
                ],
                // 文件名
                fileName: '',
                fileShow: true,
                // 材料项目
                materialProject: [
                    // { name: '轮胎----', inputCount: '', unt: '个', inputNum : '', money: '' }
                ],
                // 入账方式
                values: '',
                // 是否结算的状态
                settlementStatus: false,
                options: [
                    { value: '1', label: '未付款' },
                    { value: '2', label: '信用卡' },
                    { value: '3', label: '支付宝' },
                    { value: '4', label: '微信' },
                    { value: '5', label: '现金' }
                ],
            }
        },
        watch: {
            // 动态结算
            mainProject: {
                deep: true,
                handler () {
                    this.settlementStatus = false
                }
            },
            materialProject: {
                deep: true,
                handler () {
                    this.settlementStatus = false
                }
            }
        },
        mounted () {
            this.getProjectNum()
        },
        methods: {
            // 结算
            settlement () {
                this.maintenanceFees = 0;
                this.materialFees = 0;
                this.mainProject.forEach(item => {
                    this.maintenanceFees+=(+item.inputs);
                })
                this.maintenanceFees = new Number(this.maintenanceFees).toFixed(2)
                this.materialProject.forEach(item => {
                    item.money = +item.inputCount * (+item.inputNum);
                    this.materialFees += (+item.money)
                    return item;
                })
                this.materialFees = new Number(this.materialFees).toFixed(2)
                let num = new Number(+this.maintenanceFees + (+this.materialFees));
                this.allMoney = thousandBitSeparator(num.toFixed(2));
                this.allMoneyChina = convertCurrency(num.toFixed(2));
                this.settlementStatus = true;
            },
            // axios for information
            informationSave () {
                // 保存清单明细数据
                this.$ajax({
                    method: 'post',
                    url: `${this.$globalUrl}/api/insertNum`,
                    data: {
                        liName: this.liName,
                        fileName: this.fileName,
                        tableTitle: this.tableTitle,
                        maintenanceFees: this.maintenanceFees,
                        materialFees: this.materialFees,
                        allMoneyChina: this.allMoneyChina,
                        allMoney: this.allMoney,
                        telePhone: this.telePhone,
                        local: this.local,
                        payment: this.values,
                        mainProject: JSON.stringify(this.mainProject),
                        materialProject: JSON.stringify(this.materialProject)
                    }
                }).then(e => {
                    if (e.data.type === 'success') {
                        this.$alert('文件保存成功')
                    } else {
                        this.$alert('文件名冲突, 保存失败')
                    }
                })
            },
            // 保存清单
            saveIt () {
                // 判断是否有未填项
                // if (this.fileName === '') {
                //     this.$alert('请填写文件名', {
                //         confirmButtonText: '确定'
                //     })
                //     return
                // }if (this.settlementStatus === false) {
                //     this.$alert('请结算清单', {
                //         confirmButtonText: '确定'
                //     })
                //     return
                // }
                // if (this.tableTitle === '') {
                //     this.$alert('请填写公司名称', {
                //         confirmButtonText: '确定'
                //     })
                //     return
                // } else if (this.inputPhone === '') {
                //     this.$alert('请填写电话', {
                //         confirmButtonText: '确定'
                //     })
                //     return
                // } else if (this.inputAdress === '') {
                //     this.$alert('请填写地址', {
                //         confirmButtonText: '确定'
                //     })
                //     return
                // } else if (this.value === '') {
                //     this.$alert('请选择入帐方式', {
                //         confirmButtonText: '确定'
                //     })
                //     return
                // }
                // this.liName.forEach(item => {
                //     if (item.inputs === '') {
                //         this.$alert('请填写具体信息', {
                //             confirmButtonText: '确定'
                //         })
                //     }
                //     return
                // })
                // this.mainProject.forEach(item => {
                //     if (item.inputs === '') {
                //         this.$alert('请填写维修费用', {
                //             confirmButtonText: '确定'
                //         })
                //     }
                //     return
                // })
                // this.materialProject.forEach(item => {
                //     if (item.inputCount === '' || item.inputNum === '') {
                //         this.$alert('请填写数量或单价', {
                //             confirmButtonText: '确定'
                //         })
                //     }
                //     return
                // })
                this.fileShow = true;
                this.informationSave()
            },
            // 获取多选框数据
            getProjectNum () {
                this.$ajax({
                    method: 'get',
                    url: `${this.$globalUrl}/api/projectlist`,
                }).then(resp => {
                    let data = resp.data;
                    data.mainProject.forEach(item => {
                        item.label = item.mainList;
                        item.inputs = '';
                        this.opt.mainProjectArr.push(item)
                    })
                    data.materialProject.forEach(item => {
                        item.inputNum = '';
                        item.inputCount = '';
                        item.label = `${item.materialList} - ${item.unt}`;
                        this.opt.materialProjectArr.push(item)
                    })
                }).catch(err => {
                    console.log(err)
                })
            },
            // 多选框数据渲染状态
            handleCheckAllChange (val) {
                this.checkNum = val ? this.allNum : [];
                this.isIndeterminate = false;
            },
            handleCheckNumChange (val) {
                this.checkAll = val.length === this.allNum.length;
                this.isIndeterminate = val.length > 0 && val.length < this.allNum.length;
            },
            // 弹窗确定按钮 ---
            okFun () {
                this.showDialog = false;
                this.checkAll = false;
                this.isIndeterminate = true;
                if (this.dialogButsType === 1) {
                    this.mainProject = this.checkNum
                } else {
                    this.materialProject = this.checkNum
                }  
            },
            // 弹窗取消按钮 ---
            cancleFun () {
                this.showDialog = false;
                this.checkAll = false;
                this.isIndeterminate = true;
            },
            // 维修项目列表显示
            mainDialog () {
                this.dialogTitle = '维修项目'
                this.showDialog = true;
                this.checkNum = [];
                this.allNum = [];
                this.dialogButsType = 1;
                this.allNum = this.opt.mainProjectArr;
            },
            // 材料项目列表显示
            materialDialog () {
                this.dialogTitle = '材料项目'
                this.showDialog = true;
                this.checkNum = [];
                this.allNum = [];
                this.dialogButsType = 2;
                this.allNum = this.opt.materialProjectArr;
            }
         },
        components: {
            sysdialog
        }
    }
</script>

<style scoped>
    /*多选框相关*/
    .el-checkbox {
        width: 45%;
    }
    .el-checkbox-group .el-checkbox:nth-child(1) {
        margin-left: 30px;
    }
    .dialogCheck {
        width: 100%;
        height: 300px;
        overflow-y: scroll;
    }
    h2 {
        text-align: center;
    }
    .titleContent {
        width: 300px;
        margin: 0 auto;
        border-bottom: 1px solid #ccc;
        text-align: center;
    }
    .tableHead {
        width: 90%;
        height: auto;
        border-top: 1px solid #ccc;
        border-left: 1px solid #ccc;
        margin: 0 auto;
        text-align: center;
    }
    .tableMiddle, .tableBottom {
        width: 90%;
        height: auto;
        margin: 0 auto;
        border-left: 1px solid #ccc;
        text-align: center;
    }
    .ulcss {
        list-style: none;
        width: 100%;
        height: 100%;
        padding: 0;
        overflow: hidden;
        margin: 0;
        font-size: 13px;
        text-align: center;
    }
    /**
     * css博大精深，天下无敌，学不来啊
     * flaot + BFC 两列布局
     * 再次感慨css博大精深
     */
    .middleFoot {
        width: 100%;
        height: auto;
        margin: 0 auto;
        line-height: 30px;
        border-right: 1px solid #ccc;
        border-bottom: 1px solid #ccc;
        color: #399CFC;
    }
    .tableHeadUl li {
        float: left;
        height: 32px;
        line-height: 30px;
        margin: 0;
    }
    .tableHeadUl li p {
        margin-top: 1px;
        margin-bottom: 0;
        border-right: 1px solid #ccc;
        border-bottom: 1px solid #ccc;
    }
    .tableHeadUl li p:nth-child(1) {
        width: 70px;
        float: left;
    }
    .tableHeadUl li p:nth-child(2) {
        overflow: hidden;
    }
    .tableHeadUl li:nth-child(1) {
        width: 25%;
    }
    .tableHeadUl li:nth-child(2), .tableHeadUl li:nth-child(3), .tableHeadUl li:nth-child(4) {
        width: 20%;
    }
    .tableHeadUl li:nth-child(5) {
        width: 15%;
    }
    .tableHeadUl li:nth-child(6) {
        width: 25%;
    }
    .tableHeadUl li:nth-child(7) {
        width: 40%;
    }
    .tableHeadUl li:nth-child(8) {
        width: 20%;
    }
    .tableHeadUl li:nth-child(9) {
        width: 15%;
    }
    .tableHeadUl li:nth-child(10) {
        width: 40%;
    }
    .tableHeadUl li:nth-child(11) {
        width: 15%;
    }
    .tableHeadUl li:nth-child(12) {
        width: 27%;
    }
    .tableHeadUl li:nth-child(13) {
        width: 18%;
    }
    .tableHeadUl li:nth-child(14) {
        width: 40%;
    }
    .tableHeadUl li:nth-child(15) {
        width: 42%;
    }
    .tableHeadUl li:nth-child(16) {
        width: 18%;
    }
    .tableHeadUl li:nth-child(17) {
        width: 100%;
    }
    .middleHead li, .middleContent li, .bottomHead li, .bottomContent li {
        float: left;
        height: 32px;
        width: 50%;
        line-height: 30px;
        margin: 0;
    }
    .middleHead li p, .middleContent li p, .bottomHead li p, .bottomContent li p {
        margin-top: 0px;
        margin-bottom: 1px; 
        min-height: 30px;
        border-right: 1px solid #ccc; 
        border-bottom: 1px solid #ccc; 
    }
    /**
     *  再再再次感叹css的神奇，跪了，不停的颠覆之前的东西
     */
    .middleHead li p:nth-child(1), .middleContent li p:nth-child(1) {
        width: 10%;
        float: left;
    }
    .middleHead li p:nth-child(2), .middleContent li p:nth-child(2) {  
        width: 65%;
        float: left;
    }
    .middleHead li p:nth-child(3), .middleContent li p:nth-child(3) {
        overflow: hidden;
    }
    /*底部表格*/
    .bottomHead li p:nth-child(1), .bottomContent li p:nth-child(1) {
        width: 10%;
        float: left;
    }
    .bottomHead li p:nth-child(2), .bottomContent li p:nth-child(2) {
        width: 40%;
        float: left;
    }
    .bottomHead li p:nth-child(3), .bottomContent li p:nth-child(3) {
        width: 10%;
        float: left;
        padding-right: 3px;
    }
    .bottomHead li p:nth-child(4), .bottomContent li p:nth-child(4) {
        width: 10%;
        float: left;
    }
    .bottomHead li p:nth-child(5), .bottomContent li p:nth-child(5) {
        width: 10%;
        float: left;
        padding-right: 3px;
    }
    .bottomHead li p:nth-child(6), .bottomContent li p:nth-child(6) {
        overflow: hidden;
        background: #C1C1C1;
    }
    /*总计*/
    .total, .info {
        width: 90%;
        height: auto;
        margin: 0 auto;
        border-right: 1px solid #ccc;
        border-bottom: 1px solid #ccc;
        border-left: 1px solid #ccc;
        overflow: hidden;
    }
    .total p {
        margin: 0;
        width: 45%;
        float: left;
        height: 45px;
        line-height: 45px;
        padding-left: 50px;
    }
    .info {
        padding-bottom: 20px;
    }
    .info p {
        margin: 0;
        text-align: left; 
        height: 30px;
        line-height: 30px;
    }
    .userName p:nth-child(1) {
        padding-left: 50px;
        float: left;
        text-align: left; 
    }
    /*基本信息*/
    .info ul li {
        width: 100%;
        height: auto;
        line-height: 30px;
        margin: 0;
        overflow: hidden;
    }
    .info ul li:nth-child(1) p {
        font-size: 16px;
        padding-right: 50px; 
    }
    .info ul li:nth-child(2) p {
        float: left;
    }
    .info ul li:nth-child(2) p:nth-child(2n+1) {
        float: left;
        width: 20%;
    }
    .info ul li:nth-child(2) p:nth-child(2n+2) {
        float: left;
        width: 70%;
        border-bottom: 1px solid #ccc; 
    }
</style>