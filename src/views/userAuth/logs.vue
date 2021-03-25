<template>
  <div class="logs">
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom:10px;">
      <el-breadcrumb-item>
        <img style="width: 16px;vertical-align: middle;margin-right: 5px" src="@/assets/indexPage/location.png"> 系统管理
      </el-breadcrumb-item>
      <el-breadcrumb-item>
        <span style="font-weight:600;">
          日志中心
        </span>
      </el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-col>
        <el-form ref="form" :inline="true" :model="form" label-width="80px" size="small" class="searchLine">
          <el-form-item label="IP">
            <el-input v-model="form.ip" size="small" placeholder="请输入用户姓名" class="searchItemWidth" />
          </el-form-item>
          <el-form-item label="用户">
            <el-input v-model="form.userName" size="small" placeholder="请输入用户姓名" class="searchItemWidth" />
          </el-form-item>
          <el-form-item label="时间">
            <el-date-picker
              v-model="timeList"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col style="margin-bottom:10px;">
        <el-button type="primary" size="small" @click="exportLogs">
          导出
        </el-button>
        <el-button size="small" style="float:right;margin-left:10px;" @click="reset">
          重置
        </el-button>
        <el-button type="primary" icon="el-icon-search" size="small" style="float:right;" @click="listSearch">
          查询
        </el-button>
      </el-col>
    </el-card>
    <el-table ref="table" v-loading="loading" :data="tableData" size="small" tooltip-effect="dark" :stripe="true"
      :border="true" style="width: 100%; margin-top:10px;" max-height="550">
      <el-table-column label="ip" prop="ip" :resizable="false" />
      <el-table-column label="用户" prop="userName" :resizable="false" show-overflow-tooltip />
      <el-table-column prop="time" show-overflow-tooltip :resizable="false" label="时间" />
      <el-table-column prop="uri" show-overflow-tooltip :resizable="false" label="路径" />
      <el-table-column prop="params" :resizable="false" show-overflow-tooltip label="请求参数" />
    </el-table>
    <el-row class="pagination">
      <el-pagination background :current-page.sync="currentPage" :page-size="pageSize" layout="total, prev, pager, next, jumper"
        :total="total" @current-change="handleCurrentChange" />
    </el-row>
  </div>
</template>
<script>
  import authorityApi from "../../api/authority";
  import utils from "../../utils/index";
  import config from "../../config/config";
  export default {
    name: 'logs',
    data: () => {
      return {
        btnList: JSON.parse(window.localStorage.getItem('btnList')),
        form: {
          ip: '',//ip
          userName: '',//用户
          startTime: '',//开始时间
          endTime: '',//结束时间
        },
        timeList: [],
        tableData: [],
        loading: false,
        currentPage: 1,
        pageSize: 10,
        total: 0,
        dialogFormVisible: false,
        title: '',
        selection: [],
        tree: [],
      }
    },
    mounted() {
      this.getList();
    },
    methods: {
      listSearch() {
        this.currentPage = 1;
        this.getList();
      },
      exportLogs() {
        let obj = {
          ...this.form
        }
        let paramStr = utils.jsonToQuery(obj)
        window.open(config.url + 'sysLog/exportSysLog?' + paramStr)
      },
      reset() {
        this.timeList = [];
        this.form = {
          ip: '',//ip
          userName: '',//用户
          startTime: '',//开始时间
          endTime: '',//结束时间
        };
        this.currentPage = 1;
        this.getList();
      },
      getList() {
        this.loading = true;
        if(this.timeList.length == 2){
          this.form.startTime = this.timeList[0];
          this.form.endTime = this.timeList[1];
        }
        authorityApi.getJournalList({
          userName: this.form.userName,
          ip: this.form.ip,
          startTime: this.form.startTime,
          endTime: this.form.endTime,
          page: this.currentPage,
          limit: this.pageSize
        }).then(res => {
          this.loading = false;
          if (res && res.data.code === 0) {
            this.tableData = res.data.data.records;
            this.total = Number(res.data.data.total);
          } else {
            this.$message.error(res.data.msg)
          }
        }).catch(err => {
          this.loading = false
        })
      },
      handleCurrentChange(currentPage) {
        this.currentPage = currentPage
        this.getList()
      }
    }
  }
</script>
<style lang="scss" scoped>
  .logs {
    padding: 10px 20px;

    .searchLine {
      .el-form-item {
        margin-bottom: 3px !important;
      }
    }

    .pagination {
      text-align: center;
      margin-top: 20px;
    }

    .btn {
      color: #409EFF;
      cursor: pointer;
    }
  }
</style>
