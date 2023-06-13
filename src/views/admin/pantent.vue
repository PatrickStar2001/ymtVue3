<template>
    <div>
        <el-input v-model="searchText" placeholder="请输入搜索关键字" clearable @clear="clearSearch" @keyup.enter="performSearch"
            style="margin-bottom: 20px;">
            <template #append>
                <el-button circle type="danger" @click="Getone(this.searchText)">
                    <el-icon>
                        <Search />
                    </el-icon>
                </el-button>
            </template>
        </el-input>
    </div>
    <div>
        <el-table :data="paginatedData" style="width: 100%">
            <el-table-column prop="id" label="编号"></el-table-column>
            <el-table-column prop="name" label="专利名称"></el-table-column>
            <el-table-column prop="userId" label="发明人"></el-table-column>
            <el-table-column prop="type" label="专利类型"></el-table-column>
            <el-table-column prop="empowerTime" label="授权时间"></el-table-column>
            <el-table-column prop="attachment" label="佐证材料"></el-table-column>
            <el-table-column prop="address" label="地址"></el-table-column>
            <el-table-column prop="patentNo" label="专利号"></el-table-column>


            <el-table-column label="操作">
                <template #default="{ row }">
                    <el-button v-if="row.isNew" class="custom-button" type="success" circle @click="Insert(row)">
                        <el-icon>
                            <Position />
                        </el-icon>
                    </el-button>

                    <el-button v-else class="custom-button" type="warning" circle @click="Alter(row)">
                        <el-icon>
                            <Position />
                        </el-icon>
                    </el-button>

                    <el-button type="primary" circle @click="openEditDialog(row)">
                        <el-icon>
                            <EditPen />
                        </el-icon>

                    </el-button>

                    <el-button type="danger" v-if="row.isNew" circle @click="deleteData(row)"><el-icon>
                            <Delete />
                        </el-icon>
                    </el-button>
                    <el-button type="danger" v-else circle @click="deletePat(row)"><el-icon>
                            <Delete />
                        </el-icon>
                    </el-button>

                </template>
            </el-table-column>
        </el-table>
        <el-pagination :current-page="currentPage" :page-size="pageSize" :total="filteredPatentList.length"
            @current-change="handlePageChange">
        </el-pagination>
        <el-button type="primary" circle @click="addPat" style="margin-top: 10px;">
            <el-icon>
                <CirclePlusFilled />
            </el-icon>
        </el-button>

        <el-button type="primary" circle @click="GetAll" style="margin-top: 10px;">
            <el-icon>
                <RefreshRight />
            </el-icon>

        </el-button>

        <el-dialog v-model="editDialogVisible" title="专利编辑" center width="50%">
            <el-form :model="editedPat" label-width="100px">

                <el-form-item label="编号">
                    <el-input v-model="editedPat.id" disabled></el-input>
                </el-form-item>

                <el-form-item label="专利名称">
                    <el-input v-model="editedPat.name"></el-input>
                </el-form-item>

                <el-form-item label="发明人">
                    <el-input v-model="editedPat.uesrId"></el-input>
                </el-form-item>

                <el-form-item label="专利类型">
                    <el-input v-model="editedPat.type"></el-input>
                </el-form-item>

                <el-form-item label="授权时间">
                    <el-input v-model="editedPat.empowerTime"></el-input>
                </el-form-item>

                <el-form-item label="佐证材料">
                    <el-input v-model="editedPat.attachment"></el-input>
                </el-form-item>

                <el-form-item label="地址">
                    <el-input v-model="editedPat.address"></el-input>
                </el-form-item>

                <el-form-item label="专利号">
                    <el-input v-model="editedPat.patentNo"></el-input>
                </el-form-item>

            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="Cancel">取消</el-button>
                    <el-button type="primary" @click="Save">
                        保存
                    </el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>
    
<script>
import { ElMessageBox, ElMessage } from 'element-plus';

export default {
    created() {
        this.GetAll();
    },
    computed: {
        paginatedData() {
            const startIndex = (this.currentPage - 1) * this.pageSize;
            const endIndex = startIndex + this.pageSize;
            return this.filteredPatentList.slice(startIndex, endIndex);
        },
        filteredPatentList() {
            if (this.searchText && this.patList) {
                // 使用 Array.prototype.filter() 方法过滤数据
                return this.patList.filter(item => {
                    return item.id == this.searchText;
                });
            } else {
                // 如果搜索条件为空，返回原始数据源
                return this.patList;
            }
        }
    },


    data() {
        return {
            editedPat: {},//当前数据缓存
            editDialogVisible: false,//修改弹窗显示
            currentPage: 1, // 当前页码
            pageSize: 5, // 每页显示的数据条数
            searchText: '', // 搜索关键字
            patList: [], // 原始数据列表
        };
    },
    methods: {
        handlePageChange(currentPage) {
            this.currentPage = currentPage;
        },
        // 清空搜索关键字
        clearSearch() {
            this.searchText = '';
        },
        Cancel() {
            this.editDialogVisible = false;
            ElMessage.info('保存取消！');

        },
        Getone(id) {
            this.patList = [],
                pat.getOneData(id)
                    .then(response => {
                        console.log("搜索成功！");
                        ElMessage.success('搜索成功！');
                        const patents = response.data.patent;
                        this.patList.push(patents);
                    })
                    .catch(error => {
                        ElMessage.error('搜索失败！');
                        console.log("搜索失败！");
                    });
        },
        Save() {
            // 保存编辑后的数据
            console.log('Saving Pat:', this.editedPat);
            const index = this.patList.findIndex(item => item.id === this.editedPat.id);
            if (index !== -1) {
                // 替换原有的数据
                this.patList.splice(index, 1, this.editedPat);
            } else {
                // 添加编辑后的数据
                this.patList.push(this.editedPat);
            }
            this.editDialogVisible = false;
            ElMessage.success('保存成功！');

        },
        openEditDialog(row) {
            this.editedPat = { ...row };
            this.editDialogVisible = true;
        },

        editPat(pat) {
            // 处理编辑逻辑，可以在这里打开编辑对话框或跳转到编辑页面
            console.log("编辑 Pat", pat);
        },
        deletePat(row) {
            ElMessageBox.confirm('确定要删除吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            }).then(() => {
                pat.delData(row.id)
                    .then(response => {
                        if (response.success) {
                            // 处理删除成功的情况
                            // 用户点击了确定按钮，执行删除操作
                            const index = this.patList.findIndex(pat => pat.id === row.id);
                            if (index !== -1) {
                                this.patList.splice(index, 1); // 从数据源中删除Pat对象
                            }
                            console.log('删除成功');
                            ElMessage.success('删除成功！');

                        } else {
                            // 处理删除失败的情况
                            ElMessage.error(response.msg);

                            console.error(response.msg);
                        }
                    })
                    .catch(error => {
                        // 处理请求异常
                        console.error(error);
                    });
                console.log("删除 Pat");

            }).catch((e) => {
                // 取消删除操作
                console.log("不删除 Pat", e);
            });
        },
        deleteData(row) {
            // 在这里处理删除逻辑，可以在确认后从数据源中删除Pat对象或向服务器发送删除请求
            // 这里使用 Element Plus 的 ElMessageBox 弹窗组件来确认删除操作
            ElMessageBox.confirm('确定要删除吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            })
                .then(() => {
                    // 用户点击了确定按钮，执行删除操作
                    const index = this.patList.findIndex(pat => pat.id === row.id);
                    if (index !== -1) {
                        this.patList.splice(index, 1); // 从数据源中删除Pat对象
                    }
                    ElMessage.success('删除成功！');

                })

                .catch(() => {
                    ElMessage.error('删除失败！');

                    // 用户点击了取消按钮，取消删除操作
                    console.log('取消删除 Pat', row);
                });
        },

        // 可以添加其他方法来实现创建和查看功能
        addPat() {
            ElMessage.success("添加数据ing");
            const newPat = {
                "id": 0,
                "name": "",
                "uesrId": 0,
                "type": "",
                "empowerTime": "",
                "attachment": "",
                "address": "",
                "patentNo": "",
            };
            this.patList.push(newPat);
        },
        async GetAll() {
            try {
                this.clearSearch();
                const data = {
                    "colums": [],
                    "current": 1,
                    "size": 99
                }
                const response = await pat.getPageData(data);
                if (response.success) {
                    // 获取返回的数据
                    console.log( response.data);
                    const patents = response.data.page.records;

                    // 在这里处理获取到的数据，可以进行赋值或其他操作
                    this.patList = patents;
                    ElMessage.success('刷新成功！');

                } else {
                    // 处理请求失败的情况
                    ElMessage.error('请求失败！');

                    console.error(response.msg);
                }
            } catch (error) {
                // 处理请求异常
                console.error(error);
            }
        },

        Insert(row) {
            pat.addData(row)
                .then(response => {
                    delete row.isNew;
                    ElMessage.success('添加成功！');

                    console.log("添加成功！");
                })
                .catch(error => {
                    ElMessage.error('添加失败！');

                    console.log("添加失败！");
                    // 添加失败后的处理逻辑
                });
        },
        Alter(row) {
            pat.editData(row)
                .then(response => {
                    console.log("修改成功！");
                    ElMessage.success('修改成功！');

                })
                .catch(error => {
                    console.log("修改失败！");
                    ElMessage.error('修改失败！');

                    // 添加失败后的处理逻辑
                });
        },

    },


};
</script>
<style lang = "scss" scoped></style>