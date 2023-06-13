<template>
   <div>home</div>
</template>
<script>
import { storeToRefs } from "pinia";
import { defineComponent } from "vue"
import { useUserStore } from '../../store/user'
export default defineComponent({
    setup() {

        //组合api
        const store = useUserStore();
        const { count } = storeToRefs(store);
        console.log(count)
        return {
            count,

        }
    },
    data() {
        return {
            msg: 'this is vue app',
            msgHtml: '<h3>this is v-html 指令</h3>',
            home: 'home',
            ok: true,
            number1: 1,//数量增加
            data: [],
            obj: {
                name: 'rose',
                children: {
                    name: '22'
                }
            },
            product: {
                name: 'mac book',
                price: 99,
                count: 10,
                total: 0
            }
        }
    },
    computed: {
        //商品的价格计算
        //简单数字计算
        sum() {
            this.product.total = this.product.price * this.product.count;
            return this.product.total;
        }


    },
    mounted() {
        // this.increate();
        // this.sum();

    },
    methods: {
        componentEvent(data) {
            console.log('组件自定义事件', data)
        },
        componentEmitEvent(data) {
            console.log('$emit组件自定义事件', data)
        },
        btnTemple() {
            let str = 'home';
            let str1 = `this is vue string temple ${str}`//字符串模板写法
            console.log(str1);
        },
        // increate() {
        //     this.number1++
        // },
        btnDeep() {
            this.obj.children.age = 23
        },
        // sum() {
        //     this.product.total = this.product.price * this.product.count;
        // }


    },
    components: {
        //HelloWorld
    }
});

</script>

<style lang="scss" scoped>
.home {
    background-color: $blue;
}

.index {
    background-color: red;
}
</style>
