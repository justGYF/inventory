<template>
    <div class="hello">
        <div class="buts">
            <el-button type="primary" @click="showCount">查看清单</el-button>
            <el-button type="primary" @click="newCount">新建清单</el-button>
        </div>
        <ul>
            <li v-for="(item, index) in listName"
                @click="printCount(index)"
                v-if="showList">
                {{item.fileName}}
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                showList: false,
                listName: [
                ]
            }
        },
        methods: {
            newCount () {
                this.$router.push({name: 'drawTable', path: '/drawTable'})
            },
            // 加载文件列表
            showCount () {
                this.$ajax({
                    method: 'get',
                    url: `${this.$globalUrl}/api/showFileList`
                }).then(e => {
                    this.showList = true
                    this.listName = []
                    this.listName = e.data
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
    .buts {
        width: 300px;
        height: 50px;
        text-align: center;
        margin: 20px auto;
    }
    ul {
        list-style: none;
        width: 700px;
        margin: 0 auto;
    }
    ul li {
        width: 100%;
        height: 30px;
        line-height: 30px;
        border-bottom: 1px solid #ccc;
        cursor: pointer;
    }
    ul li:hover {
        color: #66B1FF;
        border-bottom: 1px solid #66B1FF;
    }
</style>