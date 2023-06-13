<template>
  <div class="papers">
    <div class="paper-tools">
      <el-button type="warning" @click="toAdd">添加</el-button>
    </div>
    <el-table :data="papers" style="width: 100%">
      <el-table-column fixed prop="id" label="ID" width="50"/>
      <el-table-column prop="name" label="论文题目"/>
      <el-table-column prop="publication" label="刊物"/>
      <el-table-column prop="publicationCate" label="刊物种类"/>
      <el-table-column prop="type" label="论文类型"/>
      <el-table-column prop="userId" label="作者"/>
      <el-table-column prop="publishTime" label="发表时间"/>
      <el-table-column prop="count" label="引用次数"/>
      <el-table-column prop="attachment" label="佐证材料"/>

      <el-table-column fixed="right" label="操作" width="120">
        <template #default="scope">
          <el-button link type="primary" size="small" @click="toEdit(scope.row)">更新</el-button>
          <el-button link type="primary" size="small" @click="del(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination layout="prev, pager, next" :page-size="page.size" :total="page.total" @current-change="currentchange"/>
  </div>
  <el-dialog v-model="dialogFormVisible" title="添加论文">
    <el-form :model="paper">
      <el-form-item label="ID" :label-width="formLabelWidth">
        <el-input v-model="paper.id" autocomplete="off"/>
      </el-form-item>
      <el-form-item label="论文题目" :label-width="formLabelWidth">
        <el-input v-model="paper.name" autocomplete="off"/>
      </el-form-item>
      <el-form-item label="刊物" :label-width="formLabelWidth">
        <el-input v-model="paper.publication" autocomplete="off"/>
      </el-form-item>
      <el-form-item label="刊物种类" :label-width="formLabelWidth">
        <el-input v-model="paper.publicationCate" autocomplete="off"/>
      </el-form-item>
      <el-form-item label="论文类型" :label-width="formLabelWidth">
        <el-input v-model="paper.type" autocomplete="off"/>
      </el-form-item>
      <el-form-item label="作者" :label-width="formLabelWidth">
        <el-input v-model="paper.userId" autocomplete="off"/>
      </el-form-item>
      <el-form-item label="发表时间" :label-width="formLabelWidth">
        <el-input v-model="paper.publishTime" autocomplete="off"/>
      </el-form-item>
      <el-form-item label="引用次数" :label-width="formLabelWidth">
        <el-input v-model="paper.count" autocomplete="off"/>
      </el-form-item>
      <el-form-item label="佐证材料" :label-width="formLabelWidth">
        <el-input v-model="paper.attachment" autocomplete="off"/>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="save">保存</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script>
import { defineComponent } from "vue";
import { paperPage, paperAdd, paperDel, paperEdit } from "../../http/paper";
import { ElMessage } from "element-plus";
import { cloneDeep } from "lodash-es";
export default defineComponent({
  data() {
    return {
      papers: [],
      page: {
        "colums": [],
        "current": 0,
        "size": 0
      },
      dialogFormVisible: false,
      paper: {
        attachment: "",
        count: 0,
        id: 0,
        name: "",
        publication: "",
        publicationCate: "",
        publishTime: "",
        type: "",
        userId: 0,
      },
      formLabelWidth: 80,
    };
  },
  mounted() {
    this.getpapersPage(1);
  },
  methods: {
    toEdit(paper) {
      console.log(paper);
      this.dialogFormVisible = true;
      this.paper = cloneDeep(paper);
    },
    getpapersPage(current) {
      const data = {
        current: current,
        size: 10,
      };
      paperPage(data)
        .then((res) => {
          console.log(res);
          const page = res.data.page;
          this.papers = page.records;
          this.page = page;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    currentchange(current) {
      // console.log(current);
      this.getpapersPage(current);
      this.page.current = current; //数据更新目前显示的页面
    },
    del(id) {
      //删除数据
      //模拟删除，服务器进行处理
      //要别人反悔机会
      // 如果只有一条数据，删除数据之后如何处理？
      //人机交互
      console.log(id);
      const params = {
        id: id,
      };
      paperDel(params)
        .then((res) => {
          if (res.success) {
            this.getpapersPage(this.page.current);
            //当前分页数据只剩一条时删除返回上一页
            if (this.page.total % this.page.size == 1)
              this.getAdCatesPage(this.page.current - 1);
            else {
              this.getAdCatesPage(this.page.current);
            }
          } else {
            console.log(res.msg);
            return false;
          }
        })
        .catch((err) => {});
    },
    toAdd() {
      //到添加的页面
      this.dialogFormVisible = true;
      //清空表单
      this.paper = {
        attachment: "",
        count: 0,
        id: 0,
        name: "",
        publication: "",
        publicationCate: "",
        publishTime: "",
        type: "",
        userId: 0,
      };
    },
    save() {
      const paper = this.paper;
      if (paper.id == 0) {
        paperAdd(paper)
          .then((res) => {
            if (res.success) {
              //刷新页面
              this.dialogFormVisible = false;
              this.getpapersPage(this.page.current);
              ElMessage(res.msg);
            } else {
              ElMessage(res.msg);
              return false;
            }
          })
          .catch((err) => {
            ElMessage("网络错误联系管理员");
          });
      } else {
        paperEdit(paper)
          .then((res) => {
            if (res.success) {
              //刷新页面
              this.dialogFormVisible = false;
              this.getpapersPage(this.page.current);
              ElMessage(res.msg);
            } else {
              ElMessage(res.msg);
              return false;
            }
          })
          .catch((err) => {
            ElMessage("网络错误联系管理员");
          });
      }
    },
  },
});
</script>

<style lang="scss" scoped></style>
