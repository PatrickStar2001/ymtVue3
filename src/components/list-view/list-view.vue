<template>
    <div class="big">
        <div class="small">
            <p v-if="!!title">{{ title }}</p>
            <div class="tb">
                <el-table :data="data" border>
                    <template v-for="col, index in column">
                        <el-table-column :prop="col.prop" :label="col.label" :width="col.width">
                        </el-table-column>
                    </template>
                    <slot>

                    </slot>
                </el-table>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "listView",
    props: ['data', 'column', 'title'],
    data() {
        return {
        }
    },
    created() {
    },
    computed: {
    },
    methods: {
    },
}
</script>
<style scoped>
.tb {
    width: 100%;
    display: flex;
    justify-content: center;
}

.small {
    /* margin-left: 25%; */
    /* width: 30%; */
    display: inline-block;
}

.big {
    width: 100%;
}
</style>
