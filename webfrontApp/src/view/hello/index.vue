<template>
    <div class="hello">
        <el-row :gutter="24" style="margin: 0;">
            <el-col :span="5" :offset="2">
                <div class="title">
                    <p>永光汽车修理部</p>
                    <p>结算系统</p>
                </div>
            </el-col>
        </el-row>
        <el-row :gutter="24" style="margin: 0;">
            <el-col :span="6" :offset="2">
                <div class="buts">
                    <p @click="showCount" :class="pStyle">显示全部清单</p>
                    <p @click="searchCount" :class="sStyle">搜索清单</p>
                    <p @click="newCount" class="butsP">新建清单</p>
                </div>
            </el-col>
            <el-col :span="10" :offset="0">
                <div class="leftCon">
                    <div class="search" v-show="showSearch">
                        <el-input placeholder="可依据 车型/车主/日期/完整文件名 查询" v-model="searchData" class="input-with-select">
                            <el-button slot="append" icon="el-icon-search" @click="searchIt"></el-button>
                        </el-input>
                    </div>
                    <ul>
                        <li v-for="(item, index) in listName"
                            @click="printCount(index)"
                            v-if="showList">
                            <span :title= item.fileName>{{item.fileName}}</span>
                            <p>
                                <a @click.stop="exportExcel(index)">导出</a>
                            </p>
                            <p>
                                <a @click.stop="delateExcel(index)">删除</a>
                            </p>
                            <div 
                                v-text="payType(item.payment, item.allMoney)"
                                @click.right="change($event, index)">
                            </div>
                        </li>
                    </ul>    
                </div>
                <div class="leftBottom">
                    已入账：{{payedMoney}} &nbsp;&nbsp;未入账：{{nopayMoney}} &nbsp;&nbsp; 共 {{listLength}} 条
                </div>
            </el-col>
        </el-row>
        <RightMenu 
            red="rightMenu"
            :top = "contextTop"
            :left = "contextLeft"
            :list = "contextList"
            :width = "contextWidth"
            :height = "contextHeight"
            @giveValue = "getIndex"
            v-show="showRight">
        </RightMenu>
    </div>
</template>

<script>
    import RightMenu from '@/components/rightMenu'
    export default {
        data () {
            return {
                showList: false,
                listName: [
                ],
                searchData: '',
                showSearch:false,
                // 总共条数，入账总数，未入账总数
                listLength: '',
                payedMoney: 0,
                nopayMoney: 0,
                payTitle: '',

                // 右键弹窗相关
                showRight: false,
                contextWidth: 150,
                contextHeight: 60,
                contextTop: 0,
                contextLeft: 0,
                contextList: [
                    { value: '更改为：已入账', type: '2' },
                    { value: '更改为：未入账', type: '1' }
                ],
                contextIndex: 0,
                // window可视区域的宽高
                windowWidth: document.documentElement.clientWidth,
                windowHeight: document.documentElement.clientHeight
            }
        },
        mounted () {
            this.showCount();
            // 窗口改变，重置宽高值 --- this的指向很重要
            // 三个window监听都是为了右键弹框，很有问题！！！
            window.onresize = () => {
                this.windowWidth = document.documentElement.clientWidth;
                this.windowHeight = document.documentElement.clientHeight;
            }
            window.onscroll = () => {
                if(this.showRight) {
                    this.showRight = false
                }
            }
            window.addEventListener('click', (e) => {
                if (e.target !== this.$refs.rightMenu && this.showRight)  {
                    this.showRight = false
                }
            })
        },
        computed: {
            pStyle () {
                return ['butsP', !this.showSearch ? 'butChange' : '']
            },
            sStyle () {
                return ['butsP', this.showSearch ? 'butChange' : '']
            },
            // 闭包 -- 计算属性传参
            payType () {
                return function (a, b) {
                    if (a === '2') {
                        return `已入账：${b}`
                    } else {
                        return `未入账：${b}`
                    }
                }
             }
        },
        methods: {
            getIndex (val) {
                this.$ajax.post(`api/changePayType`, {
                    ids: this.contextIndex,
                    payment: val
                })
                    .then(e => {
                        if (e.data.type === 'success') {
                            this.$message({
                                showClose: true,
                                message: `更改成功`,
                                type: 'success',
                                duration: 1000
                            })
                            this.showRight = false;
                            if (this.showSearch) {
                                // 根据搜索条件加载文件
                                this.searchIt();
                            } else {
                                // 加载所有文件
                                this.showCount();
                            }
                        }
                    })
            },
            change ($event, index) {
                // 保存右键弹框的id
                this.contextIndex = this.listName[index].id;
                // 阻止默认弹框的显示
                $event.preventDefault()

                /**
                 * 定位弹框位置
                 * X > 0 --- 右转左
                 * Y > 0 --- 下转上
                 * X > 0 && Y > 0  右下转左上
                 */
                let X = $event.clientX + this.contextWidth - this.windowWidth;
                let Y = $event.clientY + this.contextHeight - this.windowHeight;

                if (X > 0 && Y <= 0) {
                    this.contextLeft = $event.clientX - this.contextWidth;
                    this.contextTop = $event.clientY;
                } else if (X <= 0 && Y > 0) {
                    this.contextTop = $event.clientY - this.contextHeight;
                    this.contextLeft = $event.clientX;
                } else if ( X > 0 && Y > 0) {
                    this.contextLeft = $event.clientX - this.contextWidth;
                    this.contextTop = $event.clientY - this.contextHeight;
                } else {
                    this.contextLeft = $event.clientX;
                    this.contextTop = $event.clientY;
                }
                

                this.showRight = true;
            },
            // 新建文件
            newCount () {
                this.$router.push({name: 'drawTable', path: '/drawTable'})
            },
            // 精确到小数点后两位
            pointTwo (num) {
                num = Math.round(num*100) / 100;
                num = num.toFixed(2)
                return num
            },
            // 计算所有的money总数
            getMoney (list) {
                this.payedMoney = 0;
                this.nopayMoney = 0;
                list.forEach(item => {
                    if (item.payment - 0 === 2) {
                        this.payedMoney += Number(item.allMoney)
                    } else {
                        this.nopayMoney += Number(item.allMoney)
                    }
                })
                this.payedMoney = this.pointTwo(this.payedMoney)
                this.nopayMoney = this.pointTwo(this.nopayMoney)
            },
            // 加载所有文件列表
            showCount () {
                this.showSearch = false;
                this.$ajax.get(`api/showFileList`)
                    .then(e => {
                        this.showList = true
                        this.listName = []
                        this.listName = e.data

                        this.getMoney(this.listName)
                        this.listLength = this.listName.length
                    })
            },
            // 显示搜索框
            searchCount () {
                this.showSearch = true;
                this.showList = false;
                this.listName = [];
                this.listLength = 0;
                this.payedMoney = 0;
                this.nopayMoney = 0;
                this.searchData = '';
            },
            // 搜索部分文件
            searchIt () {
                this.$ajax.post(`api/showSomeFile`, {
                    searchData: this.searchData
                })
                .then(e => {
                    this.showList = true
                    this.listName = []
                    this.listName = e.data
                    if (e.data.length === 0) {
                        this.$message({
                            showClose: true,
                            message: `没有找到相关文件`,
                            type: 'warning',
                            duration: 1000
                        })
                        this.payedMoney = '0.00'
                        this.nopayMoney = '0.00'
                    } else {
                        this.getMoney(this.listName)
                    }
                    this.listLength = this.listName.length
                })
            },
            // 导出某文件
            exportExcel (index) {
                let ids = this.listName[index].id;
                location.href = `${this.$globalUrl}/api/exportExcel/${ids}`
            },
            // 删除某文件
            delateExcel (index) {
                let ids = this.listName[index].id;
                this.$ajax.get(`api/deleteNum?ids=` + ids)
                .then((e) => {
                    if (e.data.type === 'success') {
                        this.$message({
                            message: '删除成功',
                            showClose: true,
                            type: 'success',
                            duration: 1000
                        })
                    }
                    if (this.showSearch) {
                        // 根据搜索条件加载文件
                        this.searchIt();    
                    } else {
                        // 加载所有文件
                        this.showCount();
                    }
                })
            },
            // 显示某文件
            printCount (val) {
                let ids = this.listName[val].id;
                this.$router.push({name: 'printTable', path: '/printTable', params: {ids: ids}})
            }
        },
        components: {
            RightMenu
        }
    }
</script>

<style scoped>
    .hello {
        margin: 0;
        padding: 0;
    }
    .hello .title {
        width: 100%;
        height: 120px;
        margin-top: 20px;
    }
    .title p {
        margin: 0 0 0 20px;
        font-size: 30px;
        width: 250px;
        text-align: right;
        line-height: 58px;
        color: #D6D1D1;
    }
    .title p:last-child {
        font-size: 25px;
    }
    .buts {
        width: 200px;
        height: 300px;
        text-align: center;
        float: left;
        margin-left: 70px;
    }
    .butsP {
        width: 200px;
        height: 50px;
        background: #fff;
        line-height: 50px;
        text-align: center;
        font-size: 16px;
        border-radius: 5px;
        cursor: pointer;
        color: #66B1FF;
        margin-top: 50px; 
    }
    .butChange {
        background: #66B1FF;
        color: #fff;
    }
    .leftCon {
        width: 700px;
        height: auto;
        margin: 0 auto;
    }
    .leftBottom {
        width: 700px;
        height: 30px;
        line-height: 30px;
        font-size: 14px;
        color: #ccc;
        text-align: right;
    }
    .search {
        width: 700px;
        height: 40px;
        margin: 10px auto;
    }
    ul {
        list-style: none;
        width: 700px;
        max-height: 430px;
        margin: 30px auto;
        overflow-y: scroll;
        padding: 0;
    }
    ul li {
        width: 100%;
        height: 30px;
        line-height: 30px;
        border-bottom: 1px solid #ccc;
        cursor: pointer;
        color: #D6D1D1;
    }
    ul li:first-child {
        border-top: 1px dashed #ccc;
    }
    ul li:last-child {
        border-bottom: 1px dashed #ccc;
    }
    ul li:hover {
        color: #66B1FF;
        border-bottom: 1px solid #66B1FF;
    }
    ul li p {
        width: 50px;
        height: 20px;
        line-height: 20px;
        text-align: center;
        background: #66B1FF;
        color: #fff;
        float: right;
        margin: 5px 5px;
        font-size: 14px;
        border-radius: 5px;
    }
    ul li div {
        width: 200px;
        height: 20px;
        line-height: 20px;
        text-align: left;
        text-indent: 10px;
        background: #66B1FF;
        color: #fff;
        float: right;
        margin: 5px 5px;
        font-size: 14px;
        border-radius: 5px;
    }
    ul li div:hover {
        background: #2C2E5D;
    }
    li span {
        display: block;
        overflow:hidden;
        text-overflow:ellipsis;
        white-space:nowrap;
        width: 300px;
        float: left;
    }
</style>