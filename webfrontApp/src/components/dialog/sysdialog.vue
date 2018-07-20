<template>
    <el-dialog
        :modal="true"
        :title="title"
        :size="size"
        width="70%"
        :visible="showdialog"
        :before-close="closeFn">
        <slot></slot>
        <span slot="footer">
            <el-button @click="closeFn">取消</el-button>
            <el-button type="primary" @click="okFn">确定</el-button>
        </span>
    </el-dialog>
</template>
<script>
    export default {
        props: {
            title: {
                type: String,
                default: '标题'
            },
            size: {
                type: String,
                default: 'small'
            },
            dialogVisible: {
                type: Boolean,
                default: false
            },
            okCallback: {
                type: Function
            },
            cancleCallback: {
                type: Function
            }
        },
        data () {
            return {
                showdialog: this.dialogVisible
            }
        },
        watch: {
            dialogVisible (val) {
                this.showdialog = val;
            }
        },
        methods: {
            okFn () {
                if (this.okCallback) {
                    this.showdialog = false
                    this.okCallback();
                }
            },
            closeFn () {
                if (this.cancleCallback) {
                    this.showdialog = false
                    this.cancleCallback();
                }
            }
        }
    }
</script>
<style>
    
</style>