<template>
  <div class="organization">
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom:10px;">
      <el-breadcrumb-item>
        <img style="width: 16px;vertical-align: middle;margin-right: 5px" src="@/assets/indexPage/location.png"> 系统管理
      </el-breadcrumb-item>
      <el-breadcrumb-item>
        <span style="font-weight:600;">
          组织机构
        </span>
      </el-breadcrumb-item>
    </el-breadcrumb>
    <div class="mainDiv">
      <div class="leftDiv">
        <el-row style="margin-bottom:10px;">
          <el-button type="primary" size="small" @click="openOrgAdd">
            新增
          </el-button>
          <el-button type="primary" size="small" @click="downTemple">
            下载模板
          </el-button>
          <el-button type="primary" size="small" @click="openUpload">
            导入
          </el-button>
        </el-row>
        <div class="custom-tree-container">
          <div class="block">
            <el-tree :data="orgTreeData" node-key="id" default-expand-all :expand-on-click-node="false" @node-click="clickNodeByOrg">
          <span slot-scope="{ node, data }" class="custom-tree-node">
            <span>{{ data.orgName }}</span>
            <span>
              <el-button type="text" size="mini" icon="el-icon-delete" style="color: red;" @click="deleteOrg(data.id)">
              </el-button>
            </span>
          </span>
            </el-tree>
          </div>
        </div>
      </div>
      <div class="rightDiv" v-if="isShowOrgInfo">
        <div class="companyInfo">
          <el-row>
            <span class="title">{{orgFormForDetail.orgName}}</span>
            <el-button type="primary" size="mini" style="float: right" @click="openOrgEdit">
              修改
            </el-button>
          </el-row>
          <el-row class="rowDiv">
            <el-col :span="6">组织机构名称：{{orgFormForDetail.orgName}}</el-col>
            <el-col :span="6">组织机构代码：{{orgFormForDetail.orgCode}}</el-col>
            <el-col :span="6">所在地区：{{orgFormForDetail.province}}</el-col>
            <el-col :span="6">法定代表人：{{orgFormForDetail.legalRepresentative}}</el-col>
          </el-row>
          <el-row class="rowDiv">
            <el-col :span="6">所属上级机构：{{orgFormForDetail.parentName}}</el-col>
            <el-col :span="6">联系人姓名：{{orgFormForDetail.linkman}}</el-col>
            <el-col :span="6">机构建立时间：{{orgFormForDetail.establishTime}}</el-col>
            <el-col :span="6">联系电话：{{orgFormForDetail.telephone}}</el-col>
          </el-row>
          <el-row class="rowDiv">
            <el-col :span="6">注册资本：{{orgFormForDetail.registeredCapital}}</el-col>
            <el-col :span="6">备注：{{orgFormForDetail.introText}}</el-col>
          </el-row>
        </div>
        <div class="departmentInfo">
          <div class="leftDiv1">
            <el-row style="margin-bottom: 10px;">
              <span class="title">部门管理</span>
            </el-row>
            <el-row>
              <el-button type="primary" size="mini" @click="openDepartmentAdd">
                新增
              </el-button>
            </el-row>
            <div class="custom-tree-container">
              <div class="block">
                <el-tree :data="departmentTreeData" node-key="id" default-expand-all :expand-on-click-node="false" @node-click="clickNodeByDepartment">
          <span slot-scope="{ node, data }" class="custom-tree-node">
            <span>{{ data.departName }}</span>
            <span>
              <el-button type="text" size="mini" icon="el-icon-delete" style="color: red;" @click="deleteDepartment(data.id)">
              </el-button>
            </span>
          </span>
                </el-tree>
              </div>
            </div>
          </div>
          <div class="rightDiv1" v-if="isShowOrgInfo && isShowDepartmentInfo">
            <el-row>
              <el-button type="primary" size="mini" style="float: right;" @click="openDepartmentEdit">
                修改
              </el-button>
            </el-row>
            <el-row class="rowDiv">
              <el-col :span="8">部门名称：{{departmentFormForDetail.departName}}</el-col>
              <el-col :span="8">部门负责人：{{departmentFormForDetail.principal}}</el-col>
            </el-row>
            <el-row class="rowDiv">
              <el-col :span="8">联系电话：{{departmentFormForDetail.phone}}</el-col>
              <el-col :span="8">所属上级部门：{{departmentFormForDetail.parentName}}</el-col>
            </el-row>
            <el-row class="rowDiv">
              备注：{{departmentFormForDetail.postscript}}
            </el-row>
          </div>
        </div>
      </div>
    </div>

    <el-dialog  :close-on-click-modal="false" :title="orgTitle" :visible.sync="isShowOrg" width="500px" @close="cancelOrgAdd">
      <el-form ref="addOrg" :model="orgForm" :rules="rulesForOrg" label-width="120px" style="padding-left:40px;">
        <el-form-item label="组织机构名称:" prop="orgName">
          <el-input v-model="orgForm.orgName" size="small" placeholder="请输入组织机构名称" style="width:250px;" />
        </el-form-item>
        <el-form-item label="组织机构代码:" prop="orgCode">
          <el-input v-model="orgForm.orgCode" size="small" placeholder="请输入组织机构代码" style="width:250px;" />
        </el-form-item>
        <el-form-item label="所属上级机构:" prop="parentCode">
          <my-org ref="myOrgTree" :treeData="orgTreeData" :setKeys="setKeys" @getOrgParent="getOrgParent"></my-org>
        </el-form-item>
        <el-form-item label="所在地区:" prop="province">
          <el-input v-model="orgForm.province" size="small" placeholder="请输入所在地区" style="width:250px;" />
        </el-form-item>
        <el-form-item label="联系人姓名:" prop="linkman">
          <el-input v-model="orgForm.linkman" size="small" placeholder="请输入联系人姓名" style="width:250px;" />
        </el-form-item>
        <el-form-item label="联系电话:" prop="telephone">
          <el-input v-model="orgForm.telephone" size="small" placeholder="请输入联系电话" style="width:250px;" />
        </el-form-item>
        <el-form-item label="注册资本:" prop="registeredCapital">
          <el-input v-model="orgForm.registeredCapital" size="small" placeholder="请输入注册资本" style="width:250px;" />
        </el-form-item>
        <el-form-item label="法定代表人:" prop="legalRepresentative">
          <el-input v-model="orgForm.legalRepresentative" size="small" placeholder="请输入法定代表人" style="width:250px;" />
        </el-form-item>
        <el-form-item label="机构建立时间:" prop="establishTime">
          <el-date-picker v-model="orgForm.establishTime" size="small" type="date" style="width:250px;" placeholder="选择日期" />
        </el-form-item>
        <el-form-item label="备注:">
          <el-input v-model="orgForm.introText" type="textarea" size="small" style="width:250px;" :rows="2"
                    placeholder="请输入备注信息" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" size="small" @click="saveOrg">
          确 定
        </el-button>
        <el-button size="small" @click="cancelOrgAdd">
          取 消
        </el-button>
      </div>
    </el-dialog>

    <el-dialog  :close-on-click-modal="false" :title="departmentTitle" :visible.sync="isShowDepartment" width="500px" @close="cancelDepartmentAdd">
      <el-form ref="addDepartment" :model="departmentForm" :rules="rulesForDepartment" label-width="120px" style="padding-left:40px;">
        <el-form-item label="部门名称:" prop="departName">
          <el-input v-model="departmentForm.departName" size="small" placeholder="请输入部门名称" style="width:250px;" />
        </el-form-item>
        <el-form-item label="所属上级部门:" prop="parentId">
          <my-department ref="myDepartmentTree" :setKeys="setKeys" :treeData="departmentTreeData" @getDepartmentParent="getDepartmentParent"></my-department>
        </el-form-item>
        <el-form-item label="联系电话:" prop="phone">
          <el-input v-model="departmentForm.phone" size="small" placeholder="请输入联系电话" style="width:250px;" />
        </el-form-item>
        <el-form-item label="部门负责人:" prop="principal">
          <el-input v-model="departmentForm.principal" size="small" placeholder="请输入部门负责人" style="width:250px;" />
        </el-form-item>
        <el-form-item label="备注:">
          <el-input v-model="departmentForm.postscript" type="textarea" size="small" style="width:250px;" :rows="2"
                    placeholder="请输入描述信息" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" size="small" @click="saveDepartment">
          确 定
        </el-button>
        <el-button size="small" @click="cancelDepartmentAdd">
          取 消
        </el-button>
      </div>
    </el-dialog>

    <el-dialog :close-on-click-modal="false" :visible.sync="uploadDataVisible" title="导入组织机构" width="500px" @close="cancelUpload">
      <el-form label-width="80px">
        <my-file label="选择文件" @fileData="getFile" />
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button :loading="uploadLoading" size="small" type="primary" @click="uploadSubmit">
          确 定
        </el-button>
        <el-button size="small" @click="cancelUpload">
          取 消
        </el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import orgApi from "../../api/org";
  import myOrg from "../../components/common/myOrgTree";
  import myDepartment from "../../components/common/myDepartmentTree";
  import moment from 'moment';
  import config from '../../config/config'
  export default {
    name: "AreaManage",
    components: {
      myOrg,
      myDepartment
    },
    data() {
      var checkPhone = (rule, value, callback) => {
        let reg = /^[1][3-9][0-9]{9}$/
        if (!reg.test(value)) {
          callback(new Error('请输入负责人联系电话'));
        } else {
          callback()
        }
      }
      return {
        isShowOrgInfo: false, // 是否展示组织机构详情
        isShowDepartmentInfo: false, // 是否展示部门详情
        isShowOrg: false, // 是否展示新增公司弹出框
        isShowDepartment: false, // 是否展示新增部门弹出框
        orgForm: { // 公司信息
          orgName: "",//组织机构名称
          orgCode: "",//组织机构代码
          parentCode: "",//所属上级机构id(父ID)
          parentName: "",//所属上级机构名称
          province: "",//所在地区
          linkman: "",//联系人姓名
          telephone: "",//联系电话
          registeredCapital: "",//注册资本
          legalRepresentative: "",//法定代表人
          establishTime: "",//成立时间
          introText: "",//备注
        },
        departmentForm: { // 部门信息
          orgCode: "", //所属单位code
          orgName: "", //所属单位名称
          parentId: "", //上级部门id
          parentName: "", //上级部门名称
          departName: "", //部门名称
          principal: "", //部门负责人
          phone: "", //联系电话
          postscript: "", //备注
        },
        orgFormForDetail: {},
        departmentFormForDetail: {},
        orgId: "",
        orgTreeData: [], //组织机构树列表
        departmentTreeData: [], //部门树列表
        orgTitle: '',
        departmentTitle: '',
        rulesForOrg: {
          orgName: [{
            required: true,
            message: "请输入组织机构名称",
            trigger: "blur"
          }],
          orgCode: [{
            required: true,
            message: "请输入组织机构代码",
            trigger: "blur"
          }],
          parentCode: [{
            required: true,
            message: "请选择所属上级机构",
            trigger: "change"
          }],
          province: [{
            required: true,
            message: "请输入所在地区",
            trigger: "blur"
          }],
          linkman: [{
            required: true,
            message: "请输入联系人姓名",
            trigger: "blur"
          }],
          telephone: [{
            required: true,
            validator: checkPhone,
            trigger: "blur"
          }],
          registeredCapital: [{
            required: true,
            message: "请输入注册资本",
            trigger: "blur"
          }],
          legalRepresentative: [{
            required: true,
            message: "请输入法定代表人",
            trigger: "blue"
          }],
          establishTime: [{
            required: true,
            message: "请选择创建时间",
            trigger: "blue"
          }],
        },
        rulesForDepartment: {
          departName: [{
            required: true,
            message: "请输入部门名称",
            trigger: "blur"
          }],
          parentId: [{
            required: true,
            message: "请选择所属上级部门",
            trigger: "change"
          }],
          phone: [{
            required: true,
            validator: checkPhone,
            trigger: "blur"
          }],
          principal: [{
            required: true,
            message: "请输入部门负责人",
            trigger: "blur"
          }],
        },
        loading: false,
        btnList: JSON.parse(window.localStorage.getItem('btnList')),
        setKeys: [],
        uploadDataVisible: false, //上传弹出框
        uploadLoading: false,
        file: null,

      };
    },
    mounted() {
      this.getList();
    },
    methods: {
      /**
       *获取组织机构树列表
       */
      getList() {
        this.loading = true;
        orgApi
          .getOrgTree()
          .then(res => {
            this.loading = false;
            if (res && res.data.code === 0) {
              this.orgTreeData = res.data.data;
            } else {
              this.$message.error(res.data.msg);
            }
          })
          .catch(err => {
            this.loading = false;
          });
      },
      /**
       *点击组织机构树
       */
      clickNodeByOrg(data){
        if(this.orgId == data.id){
          return
        }
        this.orgId = data.id
        this.isShowOrgInfo = true;
        this.isShowDepartmentInfo = false;
        this.getOrgInfo(data.id); //获取该组织机构的详情
        this.getDepartmentTree(data.orgCode); // 获取该组织机构下的部门列表树
      },
      /**
       *获取该组织机构的详情
       */
      getOrgInfo(orgId){
        let queryData = {
          id : orgId
        }
        orgApi
          .queryOrgById(queryData)
          .then(res => {
            if (res && res.data.code === 0) {
              this.orgFormForDetail = res.data.data
              this.orgFormForDetail.establishTime = moment(this.orgFormForDetail.establishTime).format('YYYY-MM-DD')
            } else {
              this.$message.error(res.data.msg);
            }
          })
          .catch(err => {
            this.loading = false;
          });
      },
      /**
       *获取该组织机构下的部门列表树
       */
      getDepartmentTree(orgCode){
        let queryData = {
          orgCode : orgCode
        }
        orgApi
          .getDepartTreeByOrgCode(queryData)
          .then(res => {
            if (res && res.data.code === 0) {
              this.departmentTreeData = res.data.data
            } else {
              this.$message.error(res.data.msg);
            }
          })
          .catch(err => {
            this.loading = false;
          });
      },
      /**
       *点击部门树
       */
      clickNodeByDepartment(data){
        console.log(data)
        this.isShowDepartmentInfo = true;
        this.getDepartmentInfo(data.id); //获取该部门的详情
      },
      /**
       *获取该部门机构的详情
       */
      getDepartmentInfo(departmentId){
        let queryData = {
          id : departmentId
        }
        orgApi
          .queryDepartById(queryData)
          .then(res => {
            if (res && res.data.code === 0) {
              this.departmentFormForDetail = res.data.data
            } else {
              this.$message.error(res.data.msg);
            }
          })
          .catch(err => {
            this.loading = false;
          });
      },
      /**
       *打开新增组织机构模态框
       */
      openOrgAdd() {
        this.isShowOrg = true
        this.orgTitle = "新增组织机构"
      },
      /**
       *打开编辑组织机构模态框
       */
      openOrgEdit() {
        this.isShowOrg = true
        this.orgForm = this.orgFormForDetail
        this.orgTitle = "修改组织机构"
        this.setKeys = [this.orgForm.parentCode]
        this.$nextTick(() => {
          this.$refs.myOrgTree.setInfoData(this.orgForm.parentCode,this.orgForm.parentName);
        });
      },
      /**
       * 取消组织机构新增
       */
      cancelOrgAdd() {
        this.isShowOrg = false
        this.orgForm = {
          orgName: "",//组织机构名称
          orgCode: "",//组织机构代码
          parentCode: "",//所属上级机构id(父ID)
          parentName: "",//所属上级机构名称
          province: "",//所在地区
          linkman: "",//联系人姓名
          telephone: "",//联系电话
          registeredCapital: "",//注册资本
          legalRepresentative: "",//法定代表人
          establishTime: "",//成立时间
          introText: "",//备注
        };
        this.$refs["addOrg"].clearValidate(); //清空所有校验
        this.$refs.myOrgTree.clearData();
      },
      /**
       *打开新增部门模态框
       */
      openDepartmentAdd() {
        this.isShowDepartment = true
        this.departmentForm.orgCode = this.orgFormForDetail.orgCode
        this.departmentForm.orgName = this.orgFormForDetail.orgName
        this.departmentTitle = "新增部门"
      },
      /**
       *打开编辑部门模态框
       */
      openDepartmentEdit() {
        this.isShowDepartment = true
        this.departmentForm = this.departmentFormForDetail
        this.departmentTitle = "编辑部门"
        this.setKeys = [this.departmentForm.parentId]
        this.$nextTick(() => {
          this.$refs.mydepartmentTree.setInfoData1(this.departmentForm.parentId,this.departmentForm.parentName);
        });
      },
      /**
       * 取消新增部门新增
       */
      cancelDepartmentAdd() {
        this.isShowDepartment = false
        this.departmentForm = {
          orgCode: "", //所属单位code
          orgName: "", //所属单位名称
          parentId: "", //上级部门id
          parentName: "", //上级部门名称
          departName: "", //部门名称
          principal: "", //部门负责人
          phone: "", //联系电话
          postscript: "", //备注
        };
        this.$refs["addDepartment"].clearValidate(); //清空所有校验
        this.$refs.myDepartmentTree.clearData();
      },
      /**
       *选择组织机构树父级回调
       */
      getOrgParent(data){
        this.orgForm.parentCode = data.parentCode
        this.orgForm.parentName = data.parentName
      },
      /**
       *选择部门树父级回调
       */
      getDepartmentParent(data){
        this.departmentForm.parentId = data.parentId
        this.departmentForm.parentName = data.parentName
      },
      /**
       * 保存组织机构
       */
      saveOrg() {
        if(!this.orgForm.parentCode){
          this.$message.warning('请选择上级组织机构')
          return
        }
        this.$refs.addOrg.validate(valid => {
          if (valid) {
            if(this.orgTitle == '新增组织机构'){
              orgApi.insertOrg({
                ...this.orgForm,
                establishTime: moment(this.orgForm.establishTime).format('YYYY-MM-DD'),
              }).then(res => {
                if (res && res.data.code === 0) {
                  this.$message.success("新增组织机构成功");
                  this.isShowOrg = false;
                  this.orgForm = {
                    orgName: "",//组织机构名称
                    orgCode: "",//组织机构代码
                    parentCode: "",//所属上级机构id(父ID)
                    parentName: "",//所属上级机构名称
                    province: "",//所在地区
                    linkman: "",//联系人姓名
                    telephone: "",//联系电话
                    registeredCapital: "",//注册资本
                    legalRepresentative: "",//法定代表人
                    establishTime: "",//成立时间
                    introText: "",//备注
                  };
                  this.getList();
                  this.$refs.myOrgTree.clearData();
                } else {
                  this.$message.error(res.data.msg);
                }
              });
            }else{
              orgApi.updateOrg({
                ...this.orgForm,
                establishTime: moment(this.orgForm.establishTime).format('YYYY-MM-DD'),
              }).then(res => {
                if (res && res.data.code === 0) {
                  this.$message.success("修改成功");
                  this.isShowOrg = false;
                  this.orgForm = {
                    orgName: "",//组织机构名称
                    orgCode: "",//组织机构代码
                    parentCode: "",//所属上级机构id(父ID)
                    parentName: "",//所属上级机构名称
                    province: "",//所在地区
                    linkman: "",//联系人姓名
                    telephone: "",//联系电话
                    registeredCapital: "",//注册资本
                    legalRepresentative: "",//法定代表人
                    establishTime: "",//成立时间
                    introText: "",//备注
                  };
                  this.getList();
                  this.$refs.myOrgTree.clearData();
                } else {
                  this.$message.error(res.data.msg);
                }
              });
            }
          } else {
            console.log("error submit!!");
            return false;
          }
        });
      },
      /**
       * 保存部门
       */
      saveDepartment() {
        if(!this.departmentForm.parentId){
          this.$message.warning('请选择上级部门')
          return
        }
        this.$refs.addDepartment.validate(valid => {
          if (valid) {
            if(this.departmentTitle == '新增部门'){
              orgApi.addDepart({
                ...this.departmentForm
              })
                .then(res => {
                  if (res && res.data.code === 0) {
                    this.$message.success("新增部门成功");
                    this.isShowDepartment = false;
                    this.departmentForm = {
                      orgCode: "", //所属单位code
                      orgName: "", //所属单位名称
                      parentId: "", //上级部门id
                      parentName: "", //上级部门名称
                      departName: "", //部门名称
                      principal: "", //部门负责人
                      phone: "", //联系电话
                      postscript: "", //备注
                    };
                    this.getDepartmentTree(this.orgFormForDetail.orgCode);
                    this.$refs.myDepartmentTree.clearData();
                  } else {
                    this.$message.error(res.data.msg);
                  }
                });
            }else{
              orgApi.updDepartById({
                ...this.departmentForm
              })
                .then(res => {
                  if (res && res.data.code === 0) {
                    this.$message.success("修改成功");
                    this.isShowDepartment = false;
                    this.departmentForm = {
                      orgCode: "", //所属单位code
                      orgName: "", //所属单位名称
                      parentId: "", //上级部门id
                      parentName: "", //上级部门名称
                      departName: "", //部门名称
                      principal: "", //部门负责人
                      phone: "", //联系电话
                      postscript: "", //备注
                    };
                    this.getDepartmentTree(this.orgFormForDetail.orgCode);
                    this.$refs.myDepartmentTree.clearData();
                  } else {
                    this.$message.error(res.data.msg);
                  }
                });
            }
          } else {
            console.log("error submit!!");
            return false;
          }
        });
      },
      /**
       * 删除组织机构
       */
      deleteOrg(id) {
        this.$confirm('是否确认删除选中组织', '确定', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(() => {
          orgApi.deleteOrg({
            id: id
          }).then(res => {
            if (res && res.data.code === 0) {
              this.$message.success('删除成功')
              this.getList()
            } else {
              this.$message.error(res.data.msg)
            }
          })
        }).catch(() => {
          console.log('取消删除')
        })
      },
      /**
       * 删除部门
       */
      deleteDepartment(id) {
        this.$confirm('是否确认删除选中部门', '确定', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(() => {
          orgApi.deleteDepartById({
            id: id
          }).then(res => {
            if (res && res.data.code === 0) {
              this.$message.success('删除成功')
              this.getDepartmentTree(this.orgFormForDetail.orgCode)
            } else {
              this.$message.error(res.data.msg)
            }
          })
        }).catch(() => {
          console.log('取消删除')
        })
      },
      /**
       * 下载模板
       */
      downTemple() {
        window.open(config.url + '/org/downloadTemplate')
      },
      /**
       * 文件组件回调（获取文件）
       */
      getFile(fileList) {
        this.file = fileList[0].raw;
      },
      /**
       * 打开上传模态框
       */
      openUpload() {
        this.uploadDataVisible = true;
      },
      /**
       * 取消上传
       */
      cancelUpload() {
        this.uploadDataVisible = false;
        this.file = null;
      },
      /**
       * 上传提交
       */
      uploadSubmit() {
        if (!this.file) {
          this.$message.error('请选择上传文件')
          return;
        }
        let formData = new FormData();
        formData.append('mfile', this.file);
        orgApi.uploadFile(formData).then(res => {
          this.uploadLoading = false;
          if (res && res.data.code === 0) {
            this.uploadDataVisible = false;
            this.file = null;
            this.$message.success(res.data.msg);
            this.currentPage = 1;
            this.getList();
          } else {
            this.$message.error(res.data.msg);
          }
        }).catch(err => {
          console.log(err)
          this.$message.error('后台错误!')
          this.uploadLoading = false
        })
      },

    }
  };
</script>

<style lang="scss" scoped>
  .organization {
    padding: 10px 20px;
    height: 100%;
    background-color: #FFFFFF;
    .mainDiv {
      display: flex;
      background-color: #FFFFFF;
      .leftDiv {
        flex: 1.1;
        padding: 5px;
        border-right: 1px solid #E8E8E8;
      }
      .rightDiv {
        flex: 5;
        padding: 5px 10px;
        .companyInfo {
          padding: 5px 10px;
          border-bottom: 1px solid #E8E8E8;
          .title {
            font-size: 22px;
            font-weight: bold;
          }
          .rowDiv {
            margin-top: 10px;
          }
        }
        .departmentInfo {
          padding: 5px 10px;
          display: flex;
          .leftDiv1 {
            flex: 1;
            border-right: 1px solid #E8E8E8;
            .title {
              font-size: 22px;
              font-weight: bold;
            }
          }
          .rightDiv1 {
            padding-left: 10px;
            padding-top: 10px;
            flex: 3;
            .rowDiv {
              margin-top: 10px;
            }
          }
        }
      }
    }

    .el-form-item__content {
      height: 40px;
    }

    .searchLine {
      .searchItem {
        display: inline-block;
        vertical-align: top;
      }

      .el-form-item {
        margin-bottom: 5px !important;
      }
    }

    .btn {
      color: #409eff;
      cursor: pointer;
    }

    .pagination {
      margin-top: 20px;
      text-align: center;

      .el-pagination.is-background .btn-next,
      .el-pagination.is-background .btn-prev,
      .el-pagination.is-background .el-pager li {}
    }

    .el-dialog__header {
      border-bottom: 1px solid #fff;
    }

    .dialog-footer {
      text-align: center;
    }

    .el-dialog__body {
      padding-left: 90px;
    }


    .yxDetailsTitle {
      font-weight: bold;
      color: #3977F3;
      line-height: 24px;
      font-size: 18px;
      margin-bottom: 30px;
      margin-top: 20px;
    }

    .detailsRow {
      margin-bottom: 10px;
      font-size: 14px;
    }
  }
</style>
