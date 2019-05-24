<template>
    <div class="rightMenu" :style="boxStyle">
        <ul>
            <li v-for="(item, index) in list"
            @click="giveValue(index)">{{ item.value }}</li>
        </ul>
    </div>
</template>

<script>
    /**
     * 自定义右键弹窗组件
     * 宽，高，位置，内容由父元素控制
     * 需要返回选择的内容
     */
    export default {
        props: {
            width: {
                type: Number,
                default: 150
            },
            height: {
                type: Number,
                default: 60
            },
            top: {
                type: Number,
                default: 50
            },
            left: {
                type: Number,
                default: 50
            },
            list: {
                type: Array,
                default: () => ([{ value:'1', type: '2' }])
            }
        },
        data () {
            return {
            }
        },
        computed: {
            boxStyle () {
                return {
                    width: this.width + 'px',
                    height: this.height + 'px',
                    top: this.top + 'px',
                    left: this.left + 'px'
                }
            }
        },
        methods: {
            giveValue (index) {
                this.$emit('giveValue', this.list[index].type)
            }
        }
    }
</script>

<style scoped>
    .rightMenu {
        position: fixed;
        background: #fff;
        border-radius: 3px;
        padding: 10px;
        box-shadow: 1px 1px 1px #ccc;
        /*box-sizing: border-box;*/
    }
    .rightMenu ul {
        width: 100%;
        height: 100%;
        list-style: none;
        margin: 0;
        padding: 0;
    }
    .rightMenu ul li {
        width: 100%;
        height: 30px;
        cursor: pointer;
        line-height: 30px;
        font-size: 13px;
        text-align: center;
    }
    .rightMenu ul li:hover {
        background: #ccc;
        color: #fff;
    }
</style>