<template>
  <div class="myDepartmentTree">
    <div @click="openArea">
      <el-input
        v-model="departmentName"
        size="small"
        placeholder="请选择上级部门"
        style="width:250px;"
        :disabled="true"
      />
    </div>
    <el-dialog
      :modal="false"
      title="选择部门"
      :visible.sync="isShowDepartment"
      width="60%"
      @close="isShowDepartment = false"
      :close-on-click-modal="false"
    >
      <div class="custom-tree-container">
        <div class="block">
          <el-tree
            ref="departmentTree"
            :data="treeData"
            node-key="id"
            show-checkbox
            check-strictly
            default-expand-all
            @check="getDepartmentData"
            :default-checked-keys="setKeys"
          >
            <span slot-scope="{ node, data }" class="custom-tree-node">
              <span>{{ data.departName }}</span>
            </span>
          </el-tree>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" size="small" @click="saveDepartment('0')">
          无
        </el-button>
        <el-button type="primary" size="small" @click="saveDepartment('1')">
          确 定
        </el-button>
        <el-button size="small" @click="isShowDepartment = false">
          取 消
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "MyDepartmentTree",
  props: {
    treeData: Array,
    setKeys: Array
  },
  data() {
    return {
      departmentName: "", //区域名称
      isShowDepartment: false, //是否显示区域列表
      data: {},
    };
  },
  watch: {},
  mounted() {
  },
  methods: {
    /**
     * 打开区域选择模态框
     */
    openArea() {
      if (this.disabled) {
        return;
      }
      this.isShowDepartment = true;
    },
    getDepartmentData(data, checked, node) {
      if (checked) {
        this.$refs["departmentTree"].setCheckedNodes([]);
        this.$refs["departmentTree"].setCheckedNodes([data]);
      } else {
        this.$refs["departmentTree"].setCheckedNodes([]);
      }
      this.data = data;
    },
    saveDepartment(type) {
      let queryData = {};
      if(type == '0'){ //无
        this.departmentName = "无";
        queryData = {
          parentId: '0',
          parentName: '无'
        }
        this.$emit("getOrgParent", queryData);
      }else{
        this.departmentName = this.data.departName;
        queryData = {
          parentId: this.data.id,
          parentName: this.data.departName
        }
        this.$emit("getDepartmentParent", queryData);
      }
      this.isShowDepartment = false;
    },
    setInfoData1(id,name){
      this.departmentName = name;
      // this.data.id = id;
      // this.data.orgName = name;
    },
    clearData(){
      console.log(1112222)
      this.departmentName = ''
      this.data = {}
      this.$refs["departmentTree"].setCheckedNodes([]);
    }
  }
};
</script>

<style lang="scss">
.myDepartmentTree {
  padding-bottom: 30px;
  .el-tree-node .el-tree-node .el-tree-node {
    display: inline-block;
    float: left;
    width: 100%;
  }
}
</style>
