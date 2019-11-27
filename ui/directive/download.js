// 参考文档: 
// https://www.npmjs.com/package/xlsx
// https://segmentfault.com/a/1190000014242385
// 安装:
// npm install xlsx
import Vue from "vue";
import { utils, writeFile } from "xlsx";

/**
 * 用途:
 *  将绑定的内容转化为 xlsx 格式的文件并下载到本地；
 * TODO:
 *  其他形式文件的下载，比如指定url, 下载为csv文件, txt文件等
 * 
 * Usage: 
 *  <el v-download:xlsx="json/array"></el>
 *  
 *  绑定json的情况如下:
 *  json: {
 *      filename: "download.xlsx", // 下载后的文件名, 默认为 download.xlsx
 *      data: [
 *          { key1: value1, key2: value2 }
 *      ],
 *      header: [] // excel头, default: Object.keys(data[0])
 *  }
 * 
 *  绑定数组的话 === 只填写 json.data 字段
 * 
 *  eg.
 * 
 *  <template>
 *      <el-card>
 *          <el-input v-model="download.filename" placeholder="请输入下载文件名"></el-input>
 *          <el-button type="primary" v-download:xlsx="download">点击下载1</el-button>
 *          <hr>
 *          <el-button type="primary" v-download:xlsx="array">点击下载2</el-button>
 *      </el-card>
 *  </template>
 *
 *  <script>
 *  export default {
 *      name: "Clipboard",
 *      data() {
 *          return {
 *              download: {
 *                  filename: "out.xlsx",
 *                  header: ["标题", "时间", "内容"],
 *                  data: [
 *                      { 标题: "测试标题11", 内容: "测试内容1", 时间: "2019-11-27" },
 *                      { 标题: "测试标题21", 内容: "测试内容2" },
 *                      { 标题: "测试标题31", 内容: "测试内容3" }
 *                  ]
 *              },
 *              array: [
 *                  { 标题: "测试标题1", 内容: "测试内容1" },
 *                  { 标题: "测试标题2", 内容: "测试内容2" },
 *                  { 标题: "测试标题3", 内容: "测试内容3" }
 *              ]
 *          };
 *      }
 *  };
 *  </script>
 */
Vue.directive("download", {
    bind(el, binding) {
        if (binding.arg === "xlsx") {
            let download;
            if (Array.isArray(binding.value)) {
                download = getDownload("download.xlsx", Object.keys(binding.value[0]), binding.value);
            } else {
                let filename = binding.value.filename || "download.xlsx";
                let data = binding.value.data || [];
                let header = binding.value.header || Object.keys(data[0]);
                download = getDownload(filename, header, data);
            }
            el.addEventListener("click", download.download);
            el.$_download = download;
        }
    },
    update(el, binding) {
        if (binding.arg === "xlsx") {
            let data = binding.value;
            if (!Array.isArray(binding.value)) {
                el.$_download.setFilename(binding.value.filename || "download.xlsx");
                el.$_download.setHeader(binding.value.header || Object.keys(binding.value.data[0]));
                data = binding.value.data;
            }
            el.$_download.setData(data);
        }
    },
    unbind(el, binding) {
        el.removeEventListener("click", el.$_download.download);
    }
});


/**
 * @param {Array} data 
 * @param {String} filename 
 * @param {Array} header 
 */
function getDownload(filename, header = [], data = []) {
    let _data = data;
    let _filename = filename;
    let _header = header;
    return {
        setData(data) {
            _data = data;
        },
        setHeader(header) {
            _header = header;
        },
        setFilename(filename) {
            _filename = filename;
        },
        download() {
            let worksheet = utils.json_to_sheet(_data, {
                header: _header
            });
            let workbook = {
                SheetNames: ["Sheet1"],
                Sheets: {
                    "Sheet1": worksheet
                },
                Props: {}
            };
            writeFile(workbook, _filename);
        }
    };
}