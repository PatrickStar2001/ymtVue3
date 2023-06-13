<!-- <template>
  <RouterView></RouterView> 
</template>

<script>
import { defineComponent } from "vue"

export default defineComponent({
   

});
</script>

<style lang="scss" scoped></style>
 -->
 <template>
  <div>
      <div>
          <button type="button" @click="preLevel()">返回上一级</button>
      </div>
      <br>
      <div>
          <table border="1">
              <tr>
                  <th>id</th>
                  <th>name</th>
                  <th>level</th>
                  <th>parent_id</th>
                  <th>操作</th>
              </tr>
              <tr v-for="item in tableData" :key="item.id">
                  <td>{{ item.id }}</td>
                  <td>{{ item.name }}</td>
                  <td>{{ item.level }}</td>
                  <td>{{ item.parentId }}</td>
                  <td>
                      <button @click="nextLevel(item.id)">进入下一级</button>
                  </td>
              </tr>
          </table>
      </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { getList } from '@/http/region';
const pid = ref(0);
const pidList = ref([]);
const tableData = ref([]);

loadData();

const preLevel = () => {
  if (pid.value == 0) {
      alert("当前已经是最高级别了。");
  } else {
      pid.value = pidList.value[pidList.value.length - 1];
      pidList.value.pop();
      loadData();
  }

}

const nextLevel = (id) => {
  pidList.value.push(pid.value);
  pid.value = id;
  loadData();
}

function loadData() {
  getList(pid.value).then(res => {
      tableData.value = res.data.regions;
  });
}
</script>

<style></style>
