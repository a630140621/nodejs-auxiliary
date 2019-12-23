<template>
  <div>
    <el-card class="box-card">
      <div slot="header">
        <span>列表页</span>
      </div>
      <el-form :model="query" ref="query" label-width="100px" label-position="right">
        <el-row>
          <el-col :span="6">
            <el-form-item label="名称">
              <el-input v-model.trim="query.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="审核状态">
              <el-select v-model="query.audit_status">
                <el-option label="全部" value></el-option>
                <el-option label="待审核" value="waiting"></el-option>
                <el-option label="通过" value="pass"></el-option>
                <el-option label="未通过" value="reject"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="时间范围">
              <el-date-picker
                v-model="query.start_time"
                type="datetime"
                placeholder="选择开始时间"
                :clearable="false"
                value-format="timestamp"
              ></el-date-picker>到
              <el-date-picker
                v-model="query.end_time"
                type="datetime"
                placeholder="选择结束时间"
                :clearable="false"
                value-format="timestamp"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item>
          <el-button type="success" @click="search('query')">搜索</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- table -->
    <el-table :data="tableData" stripe size="medium">
      <el-table-column prop="name" label="名称" min-width="80"></el-table-column>
    </el-table>
    <!-- 翻页 -->
    <flip-page :pagenum.sync="query.pagenum" :total="total"></flip-page>
  </div>
</template>

<script>
import qs from "querystringify";

export default {
  name: "TemplateList",
  data() {
    return {
      query: {
        pagenum: 1,
        name: "",
        audit_status: "",
        start_time: "",
        end_time: new Date().getTime()
      },
      total: 0,
      tableData: []
    };
  },
  watch: {
    ["query.pagenum"]() {
      this.search();
    }
  },
  methods: {
    async getQuerystring() { // 用于当页面的搜索条件（非页码）改变时，自动更新 pagenum = 1
      if (!("$_last_query" in this)) {
        this.$_last_query = {};
      }

      for (let [k, v] of Object.entries(this.query)) {
        if (!(k in this.$_last_query)) this.$_last_query[k] = v;
        if (this.$_last_query[k] !== v) {
          // 有部分 query 发生改变
          this.$_last_query[k] = v;
          if (k === "pagenum") continue; // 改变的是页码
          this.query.pagenum = 1;
          this.$_last_query.pagenum = 1;
        }
      }

      return qs.stringify(this.$_last_query[name]);
    },
    async search() {
      let url = `/permission/partner/list?${this.getQuerystring()}`;
      let resp = await this.$axios.get(url);
      this.total = resp.count;
      // 清空 table
      this.tableData = [];
      for (let item of resp.list) {
        this.tableData.push({
          _id: item._id,
          domain: item.domain,
          name: item.name,
          create_time: item.create_time,
        });
      }
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.search();
      // 通过 `vm` 访问组件实例
      vm.keydownHandler = e => {
        switch (e.keyCode) {
          case 13:
            vm.search();
            break;
          case 37: // ArrowLeft
            // case 38: // ArrowUp
            if (vm.query.pagenum > 1) vm.query.pagenum--;
            break;
          case 39: // ArrowRight
            // case 40: // ArrowDown
            vm.query.pagenum++;
            break;
        }
      };
      document.addEventListener("keydown", vm.keydownHandler);
    });
  },
  beforeRouteLeave(to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
    // 释放内存
    document.removeEventListener("keydown", this.keydownHandler);
    this.keydownHandler = null;
    next();
  }
};
</script>
