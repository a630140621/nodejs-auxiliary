<template>
  <!-- 
    Usage:
      <filp-page :load-func="getList"></filp-page>
    注: function getList 应该返回一个 Promise.resolve(int) 作为 total; 第一次加载该组件时会立即调用传入的 load-func

    思考: 传入一个函数并且利用函数的返回值来进行一些页面显示操作，是否加重了 父子组件间的耦合呢？——虽然这样做可以让子组件封装更多的内容，而父组件只需要定义函数并按照要求返回即可。

    eg: 父组件引用如下，其中父组件的 getList 函数可以修改任意父组件状态
      <flip-page-v2 :load-func="getList"></flip-page-v2>
      methods: {
        async getList(pagenum) {
          let url = `/user/fecurrency/list?user_id=${this.$route.query.user_id}&pagenum=${pagenum}&end_time=${this.fe_currency_table.query.end_time}`;
          let resp = await this.$axios.get(url); // resp: { list: [], count: 10 }, list 供父组件显示, count 供翻页组件显示
          this.fe_currency_table.list = resp.list;

          // 此处必须返回 count, 以供 filp-page-v2 组件内部显示
          return resp.count;
        }
      }
  -->
  <el-pagination
    class="center"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="pagenum"
    :page-size="pagesize"
    layout="total, prev, pager, next"
    :total="total"
    :hide-on-single-page="true"
  ></el-pagination>
</template>

<script>
export default {
  name: "FlipPageV2",
  props: {
    loadFunc: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      pagenum: 1,
      pagesize: 10,
      total: 0
    };
  },
  methods: {
    handleSizeChange(size) {
      console.log(`每页 ${size} 条`);
    },
    async handleCurrentChange(pagenum) {
      this.total = await this.loadFunc(pagenum);
    }
  },
  async mounted() {
    this.total = await this.loadFunc(this.pagenum);
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
