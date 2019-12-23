<template>
  <!-- 
    Usage:
      <filp-page :pagenum.sync="query.pagenum" :pagesize="10" :total="50"></filp-page>
    
    eg: 父组件一般使用如下，更详细的例子参考 ui/template/list.vue
      <flip-page :pagenum.sync="pagenum" :total="total"></flip-page>
      
      data() {
        return {
          pagenum: 1,
          total: 10
        }
      },
      watch: {
        pagenum() {
          this.getList()
        }
      },
      methods: {
        async getList() {
          // 当页码改变时加载一些业务信息
        }
      }
  -->
  <div class="center">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-size="pagesize"
      layout="total, prev, pager, next"
      :total="total"
      :hide-on-single-page="true"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  name: "FlipPage",
  props: {
    total: {
      type: Number,
      default: 0
    },
    pagesize: {
      type: Number,
      default: 10
    },
    pagenum: {
      type: Number,
      default: 1
    }
  },
  watch: {
    pagenum(){
      if (this.pagenum > Math.ceil(this.total / this.pagesize)) {
        this.$emit("update:pagenum", this.pagenum - 1);
      }
    }
  },
  methods: {
    handleSizeChange(size) {
      console.log(`每页 ${size} 条`);
    },
    handleCurrentChange(pagenum) {
      this.$emit("update:pagenum", pagenum);
    }
  }
};
</script>

<style scoped>
.center {
  display: flex;
  justify-content: center;

  margin: 10px 0;
}
</style>
