<template>
  <div class="myOrgTree">
    <div @click="openArea">
      <el-input
        v-model="orgName"
        size="small"
        placeholder="请选择上级组织机构"
        style="width:250px;"
        :disabled="true"
      />
    </div>
    <el-dialog
      :modal="false"
      title="选择组织机构"
      :visible.sync="isShowOrg"
      width="60%"
      @close="isShowOrg = false"
      :close-on-click-modal="false"
    >
      <div class="custom-tree-container">
        <div class="block">
          <el-tree
            ref="orgTree"
            :data="treeData"
            node-key="id"
            show-checkbox
            check-strictly
            default-expand-all
            @check="getOrgData"
            :default-checked-keys="setKeys"
          >
            <span slot-scope="{ node, data }" class="custom-tree-node">
              <span>{{ data.orgName }}</span>
            </span>
          </el-tree>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" size="small" @click="saveOrg('0')">
          无
        </el-button>
        <el-button type="primary" size="small" @click="saveOrg('1')">
          确 定
        </el-button>
        <el-button size="small" @click="isShowOrg = false">
          取 消
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "myOrgTree",
  props: {
    treeData: Array,
    setKeys: Array
  },
  data() {
    return {
      orgName: "", //区域名称
      isShowOrg: false, //是否显示区域列表
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
      this.isShowOrg = true;
    },
    getOrgData(data, checked, node) {
      if (checked) {
        this.$refs["orgTree"].setCheckedNodes([]);
        this.$refs["orgTree"].setCheckedNodes([data]);
      } else {
        this.$refs["orgTree"].setCheckedNodes([]);
      }
      this.data = data;
    },
    saveOrg(type) {
      let queryData = {};
      if(type == '0'){ //无
        this.orgName = "无";
        queryData = {
          parentCode: '0',
          parentName: '无'
        }
        this.$emit("getOrgParent", queryData);
      }else{
        this.orgName = this.data.orgName;
        queryData = {
          parentCode: this.data.id,
          parentName: this.data.orgName
        }
        this.$emit("getOrgParent", queryData);
      }
      this.isShowOrg = false;
    },
    clearData(data) {
      this.orgName = data;
      if (data) {
        this.$refs["areaTree"].setCheckedNodes([]);
      }
    },
    setInfoData(id,name){
      this.orgName = name;
      // this.data.id = id;
      // this.data.orgName = name;
    },
    clearData(){
      this.orgName = ''
      this.data = {}
      this.$refs["orgTree"].setCheckedNodes([]);
    }
  }
};
</script>

<style lang="scss">
.myOrgTree {
  padding-bottom: 30px;
  .el-tree-node .el-tree-node .el-tree-node {
    display: inline-block;
    float: left;
    width: 100%;
  }
}
</style>
