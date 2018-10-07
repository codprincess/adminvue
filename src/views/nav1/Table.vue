<template>
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom:0px">
            <el-form :inline="true" :model="filters">
                <el-form-item>
                    <el-input v-model="filters.name" placeholder="姓名"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary">查询</el-button>
                </el-form-item>
                <el-form-item>
                   <el-button type="primary" @click="handleAdd">新增</el-button>
                </el-form-item>
            </el-form>
        </el-col>
        <!--列表-->
        <el-table :data="users" v-loading="listLoading" style="width:100%">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column type="index" width="60"></el-table-column>
            <el-table-column prop="name" label="姓名" width="100" sortable></el-table-column>
            <el-table-column prop="sex" label="性别" width="100" :formatter="formatSex" sortable></el-table-column>
            <el-table-column prop="age" label="年龄" width="100" sortable></el-table-column>
            <el-table-column prop="birth" label="生日" width="120" sortable></el-table-column>
            <el-table-column prop="addr" label="地址" min-width="180" sortable></el-table-column>
            <el-table-column label="操作" width="150">
                <template>
                    <el-button size="small">编辑</el-button>
                    <el-button type="danger" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!--工具条-->
        <el-col :span="24" class="toolbar">
            <el-button type="danger">批量删除</el-button>
            <el-pagination layout="prev,pager,next" :page-size="20" :total="total" style="float:right"></el-pagination>
        </el-col>

        <!--编辑页面-->
        <el-dialog title="编辑">
            <el-form label-width="80px">
                <el-form-item label="姓名">
                    <el-input></el-input>
                </el-form-item>
                <el-form-item label="性别">
                    <el-radio-group>
                        <el-radio class="radio" :label="1">男</el-radio>
                        <el-radio class="radio" :label="0">女</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="年龄">
                    <el-input-number :min="0" max="200"></el-input-number>
                </el-form-item>
                <el-form-item label="生日">
                    <el-date-picker type="date" placeholder="选择日期"></el-date-picker>
                </el-form-item>
                <el-form-item label="地址">
                    <el-input type="texteare"></el-input>
                </el-form-item>
            </el-form>
            <div class="dialog-footer">
                <el-button>取消</el-button>
                <el-button type="primary">提交</el-button>
            </div>
        </el-dialog>

        <!--新增界面-->
        <el-dialog title="新增" v-model="addFormVisible" :close-on-click-modal="false">
             <el-form :model="addForm" ref="addForm" :rules="addFormRules" label-width="80px">
                <el-form-item label="姓名" prop="name">
                    <el-input v-model="addForm.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="性别">
                    <el-radio-group v-model="addForm.sex">
                        <el-radio class="radio" :label="1">男</el-radio>
                        <el-radio class="radio" :label="0">女</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="年龄">
                    <el-input-number v-model="addForm.age" :min="0" max="200"></el-input-number>
                </el-form-item>
                <el-form-item label="生日">
                    <el-date-picker v-model="addForm.birth" type="date" placeholder="选择日期"></el-date-picker>
                </el-form-item>
                <el-form-item label="地址">
                    <el-input v-model="addForm.addr" type="texteare"></el-input>
                </el-form-item>
            </el-form>
            <div class="dialog-footer">
                <el-button @click.native="addFormVisible=false">取消</el-button>
                <el-button type="primary">提交</el-button>
            </div>
        </el-dialog>
    </section>
</template>
<script>
import util from '../../common/js/util'
import { getUserListPage, removeUser, batchRemoveUser, editUser, addUser } from '../../api/api';
export default {
    data(){
        return{
            users:[],
            total:0,
            page:1,
            listLoading:false,
            addFormVisible:false,
            addFormRules:{
                name:[
                    {required:true,message:'请输入名字',trigger:'blur'}
                ]
            },
            //新增页面数据
            addForm:{
                name:'',
                sex:-1,
                age:0,
                birth:'',
                addr:'',
            }

        }
    },
    methods:{
        //性别显示转换
        formatSex:function(row,column){
            return row.sex == 1?'男':row.sex==0?'女':'未知'
        },
        //获取用户列表
        getUsers(){
            let para = {
                page:this.page,
                name:this.filters.name
            };
            this.listLoading = true;
            getUserListPage(para).then((res)=>{
                
            })
        },
        //显示新添页面
        handleAdd:function(){
            //alert(111);
            this.addFormVisible = true;
            this.addForm = {
                name:'',
                sex:-1,
                age:0,
                birth:'',
                addr:'',
            }
        },
        //显示编辑页面

    }
}
</script>

