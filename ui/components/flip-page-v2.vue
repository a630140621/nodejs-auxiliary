<template>
  <!-- 
    Usage:
      <filp-page :load-func="getList" keydown-event></filp-page>
    props:
      load-func: 应该返回一个 Promise.resolve(int) 作为翻页组件总数
      keydown-event: 是否开启 keydown 翻页和回车事件, 目前内部定义方向键的左右作为翻页按钮，暂不提供自定义；仅在 mounted 时传入才会注册

    注: 第一次加载该组件时会立即调用传入的 load-func

    思考: 
      1. 传入一个函数并且利用函数的返回值来进行一些页面显示操作，是否加重了 父子组件间的耦合呢？——虽然这样做可以让子组件封装更多的内容，而父组件只需要定义函数并按照要求返回即可。
      2. 该组件是否与 table 过于耦合？——还会有其他地方会用到翻页吗？

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
    },
    keydownEvent: Boolean
  },
  data() {
    return {
      pagenum: 1,
      pagesize: 10,
      total: 0,
      keydownHandler: null
    };
  },
  methods: {
    handleSizeChange(size) {
      console.log(`每页 ${size} 条`);
    },
    async handleCurrentChange(pagenum) {
      this.total = await this.loadFunc(pagenum);
    },
    register() {
      this.keydownHandler = async e => {
        switch (e.keyCode) {
          case 13:
            await this.loadFunc(this.pagenum);
            break;
          case 37: // ArrowLeft
            // case 38: // ArrowUp
            if (this.pagenum > 1) {
              this.pagenum--;
              await this.loadFunc(this.pagenum);
            }
            break;
          case 39: // ArrowRight
            // case 40: // ArrowDown
            if (this.pagenum < Math.ceil(this.total / this.pagesize)) {
              this.pagenum++;
              await this.loadFunc(this.pagenum);
            }
            break;
        }
      };
      document.addEventListener("keydown", this.keydownHandler);
    },
    unregister() {
      document.removeEventListener("keydown", this.keydownHandler);
      this.keydownHandler = null;
    }
  },
  async mounted() {
    this.total = await this.loadFunc(this.pagenum);
    if (this.keydownEvent) {
      console.log("register");
      this.register();
    }
  },
  beforeDestroy() {
    if (this.keydownEvent) {
      console.log("before destroy");
      this.unregister();
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
