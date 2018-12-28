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
                            {{item.fileName}}
                        </li>
                    </ul>    
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                showList: false,
                listName: [
                ],
                searchData: '',
                showSearch:false
            }
        },
        mounted () {
            this.showCount();
        },
        computed: {
            pStyle () {
                return ['butsP', !this.showSearch ? 'butChange' : '']
            },
            sStyle () {
                return ['butsP', this.showSearch ? 'butChange' : '']
            }
        },
        methods: {
            newCount () {
                this.$router.push({name: 'drawTable', path: '/drawTable'})
            },
            // 加载所有文件列表
            showCount () {
                this.showSearch = false;
                this.$ajax({
                    method: 'get',
                    url: `${this.$globalUrl}/api/showFileList`
                }).then(e => {
                    this.showList = true
                    this.listName = []
                    this.listName = e.data
                })
            },
            // 显示搜索框
            searchCount () {
                this.showSearch = true;
                this.showList = false;
                this.listName = [];
            },
            // 搜索部分文件
            searchIt () {
                this.$ajax({
                    method: 'post',
                    url: `${this.$globalUrl}/api/showSomeFile`,
                    data: {
                        searchData: this.searchData
                    }
                }).then(e => {
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
                    }
                })
            },
            // 显示某文件
            printCount (val) {
                let ids = this.listName[val].id;
                this.$router.push({name: 'printTable', path: '/printTable', params: {ids: ids}})
            }
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
</style>