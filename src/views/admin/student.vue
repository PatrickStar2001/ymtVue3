<template>
    <div>
      <div v-show="isLogin == false">
        账号：<input type="text" v-model="loginForm.email" /> &nbsp; 密码：<input
          type="password"
          v-model="loginForm.password"
        />
        &nbsp;
        <button type="button" @click="toLogin()" v-show="isLogin == false">
          登录
        </button>
      </div>
      <div v-show="isLogin">
        school: <input type="text" v-model="newOne.school" /> &nbsp; depart:
        <input type="text" v-model="newOne.depart" /> &nbsp; studentNo:
        <input type="text" v-model="newOne.studentNo" /> &nbsp; studentName:
        <input type="text" v-model="newOne.studentName" /> &nbsp; major:
        <input type="text" v-model="newOne.major" /> &nbsp; classinfo:
        <input type="text" v-model="newOne.classinfo" /> &nbsp;
        <button type="button" @click="add()">添加</button> &nbsp;
        <button type="button" @click="logOut()">退出登录</button>
      </div>
      <br />
      <div v-show="isLogin">
        <div>
          <table border="1">
            <tr>
              <th>id</th>
              <th>school</th>
              <th>depart</th>
              <th>studentNo</th>
              <th>studentName</th>
              <th>major</th>
              <th>classinfo</th>
              <th>createTime</th>
              <th>updateTime</th>
              <th>操作</th>
            </tr>
            <tr v-for="item in tableData" :key="item.id">
              <td>{{ item.id }}</td>
              <td>{{ item.school }}</td>
              <td>{{ item.depart }}</td>
              <td>{{ item.studentNo }}</td>
              <td>{{ item.studentName }}</td>
              <td>{{ item.major }}</td>
              <td>{{ item.classinfo }}</td>
              <td>{{ item.createTime }}</td>
              <td>{{ item.updateTime }}</td>
              <td>
                <button @click="show(item.id)">更新</button>
                <button @click="del(item.id)">删除</button>
              </td>
            </tr>
          </table>
        </div>
        <br />
        <table>
          <tr>
            <td>id:</td>
            <td><input type="text" v-model="editOne.id" readonly /></td>
          </tr>
          <tr>
            <td>school:</td>
            <td><input type="text" v-model="editOne.school" /></td>
          </tr>
          <tr>
            <td>depart:</td>
            <td><input type="text" v-model="editOne.depart" /></td>
          </tr>
          <tr>
            <td>studentNo:</td>
            <td><input type="text" v-model="editOne.studentNo" /></td>
          </tr>
          <tr>
            <td>studentName:</td>
            <td><input type="text" v-model="editOne.studentName" /></td>
          </tr>
          <tr>
            <td>major:</td>
            <td><input type="text" v-model="editOne.major" /></td>
          </tr>
          <tr>
            <td>classinfo:</td>
            <td><input type="text" v-model="editOne.classinfo" /></td>
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
  
  import { ref } from 'vue'
  import { useUserStore } from '@/store/user'
  import {
    login,
    getAll,
    delOne,
    addOne,
    updateOne,
    getOne,
  } from '@/http/student'
  const stor = useUserStore()
  const isLogin = ref(false)
  const loginForm = ref({
    email: '414090297@qq.com',
    password: '12345678',
  })
  const tableData = ref([])
  const newOne = ref({
    createTime: '',
    depart: '',
    id: 0,
    major: '',
    school: '',
    studentName: '',
    studentNo: '',
    updateTime: '',
    classinfo: '2020软件工程4班',
  })
  const editOne = ref({})
  let userId = ref(2)
  const toLogin = () => {
    let data = loginForm.value
    login(data).then((res) => {
      if (res.code == 1) {
        let token = res.data.userinfo.token
        userId.value = res.data.userinfo.id
        stor.setToken(token)
        isLogin.value = true
        loadData()
      } else {
        alert('登录失败，请检查账号或密码输入是否有误。')
      }
    })
  }
  
  const logOut = () => {
    if (confirm('是否要退出登录？')) {
      stor.setToken('')
      isLogin.value = false
      alert('退出登录成功。')
    }
  }
  
  const add = () => {
    let data = {
      createTime: new Date(),
      depart: newOne.value.depart,
      id: 0,
      major: newOne.value.major,
      school: newOne.value.school,
      studentName: newOne.value.studentName,
      studentNo: newOne.value.studentNo,
      classinfo: newOne.value.classinfo,
      updateTime: new Date(),
      userId: userId.value,
    }
    addOne(data).then((resp) => {
      if (resp.code == 1) {
        alert('添加学生信息成功！')
        loadData()
      }
    })
  }
  
  const show = (id) => {
    getOne(id).then((resp) => {
      let one = resp.data.student
      editOne.value = one
    })
  }
  
  const update = () => {
    if (confirm('是否要进行更新？')) {
      if (editOne.value.id == '') {
        alert('请选择要操作的学生信息。')
      } else {
        let data = {
          createTime: editOne.value.createTime,
          depart: editOne.value.depart,
          id: editOne.value.id,
          major: editOne.value.major,
          school: editOne.value.school,
          studentName: editOne.value.studentName,
          studentNo: editOne.value.studentNo,
          classinfo: editOne.value.classinfo,
          updateTime: new Date(),
          userId: userId.value,
        }
        updateOne(data).then((resp) => {
          if (resp.code == 1) {
            alert('更新成功。')
            toEmpty()
            setTimeout(() => {
              loadData()
            }, 1000)
          }
        })
      }
    }
  }
  
  const toEmpty = () => {
    editOne.value = {
      createTime: '',
      depart: '',
      id: 0,
      major: '',
      school: '',
      studentName: '',
      studentNo: '',
      updateTime: '',
      classinfo: '2020软件工程4班',
    }
  }
  
  const del = (id) => {
    if (confirm('是否要删除该学生信息？')) {
      delOne(id).then((resp) => {
        if (resp.code == 1) {
          alert('成功删除学生信息！')
          loadData()
        }
      })
    }
  }
  
  function loadData() {
    getAll().then((res) => {
      console.log(res)
      tableData.value = res.data.students.filter(
        (item) => item.classinfo === '2020软件工程4班'
      )
    })
  }
  </script>
  
  <style></style>
  