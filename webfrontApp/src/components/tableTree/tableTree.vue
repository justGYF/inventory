<template>
    <div>
        <p>请选择具体的项目</p>
        <el-tree
            :data="dataTree"
            show-checkbox
            :default-expand-all='true'
            node-key="id"
            ref="tree"
            highlight-current
            :props="defaultProps">
        </el-tree>
    </div>
</template>

<script>
    export default {
        props: ['option'],
        data () {
            return {
                dataTree: [
                    {
                        label: '维修项目',
                        id: 'a',
                        children: []
                    },
                    {
                        label: '材料项目',
                        id: 'b',
                        children: []
                    }
                ],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                }
            }
        },
        watch: {
            option: {
                deep: true,
                handler (val) {
                    this.dataTree[0].children = val.mainProjectArr;
                    this.dataTree[1].children = val.materialProjectArr;
                }
            }
        },
        mounted () {
        }
    }
</script>

<style>
    
</style>