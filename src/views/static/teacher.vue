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
        <div v-show="isLogin == false">
            账号：<input type="text" v-model="loginForm.email"> &nbsp;
            密码：<input type="password" v-model="loginForm.password"> &nbsp;
            <button type="button" @click="toLogin()" v-show="isLogin == false">登录</button>
        </div>
        <div v-show="isLogin">
            school: <input type="text" v-model="newOne.school"> &nbsp;
            depart: <input type="text" v-model="newOne.depart"> &nbsp;
            teacherNo: <input type="text" v-model="newOne.teacherNo"> &nbsp;
            teacherName: <input type="text" v-model="newOne.teacherName"> &nbsp;
            professional: <input type="text" v-model="newOne.professional"> &nbsp;
            <button type="button" @click="add()">添加</button> &nbsp;
            <button type="button" @click="logOut()">退出登录</button>
        </div>
        <br>
        <div v-show="isLogin">
            <div>
                <table border="1">
                    <tr>
                        <th>id</th>
                        <th>school</th>
                        <th>depart</th>
                        <th>teacherNo</th>
                        <th>teacherName</th>
                        <th>professional</th>
                        <th>createTime</th>
                        <th>updateTime</th>
                        <th>操作</th>
                    </tr>
                    <tr v-for="item in tableData" :key="item.id">
                        <td>{{ item.id }}</td>
                        <td>{{ item.school }}</td>
                        <td>{{ item.depart }}</td>
                        <td>{{ item.teacherNo }}</td>
                        <td>{{ item.teacherName }}</td>
                        <td>{{ item.professional }}</td>
                        <td>{{ item.createTime }}</td>
                        <td>{{ item.updateTime }}</td>
                        <td>
                            <button @click="show(item.id)">更新</button>
                            <button @click="del(item.id)">删除</button>
                        </td>
                    </tr>
                </table>
            </div>
            <br>
            <table>
                <tr>
                    <td>id:</td>
                    <td><input type="text" v-model="editOne.id" readonly></td>
                </tr>
                <tr>
                    <td>school:</td>
                    <td><input type="text" v-model="editOne.school"></td>
                </tr>
                <tr>
                    <td>depart:</td>
                    <td><input type="text" v-model="editOne.depart"></td>
                </tr>
                <tr>
                    <td>teacherNo:</td>
                    <td><input type="text" v-model="editOne.teacherNo"></td>
                </tr>
                <tr>
                    <td>teacherName:</td>
                    <td><input type="text" v-model="editOne.teacherName"></td>
                </tr>
                <tr>
                    <td>professional:</td>
                    <td><input type="text" v-model="editOne.professional"></td>
                </tr>
                <tr>
                    <td colspan="2">
                        <button type="button" @click="update()">更新</button>
                        <button type="button" @click="toEmpty()">清空</button>
                    </td>
                </tr>
            </table>
        </div>
    </div>
</template>
  
<script setup>
import { ref } from 'vue';
import { useUserStore } from "@/store/user";
import { login, getAll, delOne, addOne, updateOne, getOne } from '@/http/teacher';
const stor = useUserStore();
const isLogin = ref(false);
const loginForm = ref({
    email: "414090297@qq.com",
    password: "12345678"
});
const tableData = ref([]);
const newOne = ref({
    createTime: "",
    depart: "",
    id: 0,
    professional: "",
    school: "",
    teacherName: "",
    teacherNo: "",
    updateTime: "",
    userId: 2
});
const editOne = ref({});

const toLogin = () => {
    let data = loginForm.value;
    login(data).then((res) => {
        if (res.code == 1) {
            let token = res.data.userinfo.token;
            stor.setToken(token);
            isLogin.value = true;
            loadData();
        } else {
            alert("登录失败，请检查账号或密码输入是否有误。");
        }
    });
}

const logOut = () => {
    if (confirm('是否要退出登录？')) {
        stor.setToken('');
        isLogin.value = false;
        alert('退出登录成功。');
    }
}

const add = () => {
    let data = {
        createTime: new Date(),
        depart: newOne.value.depart,
        id: 0,
        professional: newOne.value.professional,
        school: newOne.value.school,
        teacherName: newOne.value.teacherName,
        teacherNo: newOne.value.teacherNo,
        updateTime: new Date(),
        userId: 2
    };
    addOne(data).then(resp => {
        if (resp.code == 1) {
            alert('添加教师信息成功！');
            loadData();
        }
    });
}

const show = (id) => {
    getOne(id).then(resp => {
        let one = resp.data.teacher;
        editOne.value = one;
    });
}

const update = () => {
    if (confirm("是否要进行更新？")) {
        if (editOne.value.id == '') {
            alert('请选择要操作的教师信息。');
        } else {
            let data = {
                createTime: editOne.value.createTime,
                depart: editOne.value.depart,
                id: editOne.value.id,
                professional: editOne.value.professional,
                school: editOne.value.school,
                teacherName: editOne.value.teacherName,
                teacherNo: editOne.value.teacherNo,
                updateTime: new Date(),
                userId: 2
            };
            updateOne(data).then(resp => {
                if (resp.code == 1) {
                    alert('更新成功。');
                    toEmpty();
                    loadData();
                }
            });
        }
    }

}

const toEmpty = () => {
    editOne.value = {
        createTime: "",
        depart: "",
        id: '',
        professiona: " ",
        school: "",
        teacherName: "",
        teacherNo: "",
        updateTime: "",
        userId: ''
    }
}

const del = (id) => {
    if (confirm("是否要删除该教师信息？")) {
        delOne(id).then(resp => {
            if (resp.code == 1) {
                alert('成功删除教师信息！');
                loadData();
            }
        });
    }
}

function loadData() {
    getAll().then((res) => {
        console.log(res);
        tableData.value = res.data.teachers;
    });
}
</script>
  
<style></style>