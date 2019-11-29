/* eslint-disable */
// 参考文档: 
// https://www.npmjs.com/package/xlsx
// https://segmentfault.com/a/1190000014242385
// 安装:
// npm install xlsx
import Vue from "vue";
import {
    utils,
    writeFile
} from "xlsx";

/**
 * 用途:
 *  将绑定的内容转化为 xlsx 格式的文件并下载到本地；
 * TODO:
 *  其他形式文件的下载，比如指定url, 下载为csv文件等
 * 
 * Usage xlsx: 
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
 * Usage txt:
 *  <el v-download:txt="string/json"></el>
 * 
 *  绑定json的情况如下:
 *  json: {
 *      filename: "download.txt", // default: "download.txt"
 *      data: "" // 要下载的内容
 *  }
 * 
 *  绑定 string 的话 === 只填写 json.data 字段
 * 
 *  eg.
 * 
 *  <template>
        <el-card>
            <el-input v-model="xlsx.json.filename" placeholder="请输入下载文件名"></el-input>
            <el-button type="primary" v-download:xlsx="xlsx.json">点击下载xlsx_1</el-button>
            <hr />
            <el-button type="primary" v-download:xlsx="xlsx.array">点击下载xlsx_2</el-button>
            <hr />
            <el-input v-model="txt.json.filename"></el-input>
            <el-button type="primary" v-download:txt="txt.json">点击下载txt_1</el-button>
            <hr />
            <el-button type="primary" v-download:txt="txt.data">点击下载txt_2</el-button>
        </el-card>
    </template>

    <script>
    export default {
        name: "Download",
        data() {
            return {
                xlsx: {
                    json: {
                        filename: "out.xlsx",
                        header: ["标题", "时间", "内容"],
                        data: [
                            { 标题: "测试标题11", 内容: "测试内容1", 时间: "2019-11-27" },
                            { 标题: "测试标题21", 内容: "测试内容2" },
                            { 标题: "测试标题31", 内容: "测试内容3" }
                        ]
                    },
                    array: [
                        { 标题: "测试标题1", 内容: "测试内容1" },
                        { 标题: "测试标题2", 内容: "测试内容2" },
                        { 标题: "测试标题3", 内容: "测试内容3" }
                    ]
                },
                txt: {
                    data: "这是一个要下载文件的文本内容",
                    json: {
                        filename: "123.txt",
                        data: "123456"
                    }
                }
            };
        }
    };
    </script>
 */
Vue.directive("download", {
    bind(el, binding) {
        let data = {};
        let download;
        switch (binding.arg) {
            case "xlsx":
                if (Array.isArray(binding.value)) {
                    data.filename = "download.xlsx";
                    data.header = Object.keys(binding.value[0]);
                    data.data = binding.value;
                } else {
                    data.filename = binding.value.filename || "download.xlsx";
                    data.header = binding.value.header || Object.keys(binding.value.data[0]);
                    data.data = binding.value.data || [];
                }
                download = getXlsxDownload(data.filename, data.header, data.data);
                break;
            case "txt":
                if (typeof binding.value === "string") {
                    data.filename = "download.txt";
                    data.data = binding.value || "";
                } else {
                    data.filename = binding.value.filename || "download.txt";
                    data.data = binding.value.data || "";
                }
                download = getTxtDownload(data.filename, data.data);
                break;
            default:
                console.error(`x-download do not support your arg ${binding.arg}`);
        }
        el.addEventListener("click", download.download);
        el.$_download = download;
    },
    update(el, binding) {
        let data = binding.value;
        switch (binding.arg) {
            case "xlsx":
                if (!Array.isArray(data)) {
                    el.$_download.setFilename(data.filename || "download.xlsx");
                    el.$_download.setHeader(data.header || Object.keys(data.data[0]));
                    data = data.data || [];
                }
                el.$_download.setData(data);
                break;
            case "txt":
                if (!(typeof data === "string")) {
                    el.$_download.setFilename(data.filename || "download.txt");
                    data = data.data || "";
                }
                el.$_download.setData(data);
                break;
            default:
                console.error(`x-download do not support your arg ${binding.arg}`);
        }
    },
    unbind(el, binding) {
        el.removeEventListener("click", el.$_download.download);
    }
});


/**
 * @param {String} filename 
 * @param {String} data 
 */
function getTxtDownload(filename, data) {
    let _data = data;
    let _filename = filename;
    return {
        setData(data) {
            _data = data;
        },
        setFilename(filename) {
            _filename = filename;
        },
        download() {
            // 创建隐藏的可下载链接
            var eleLink = document.createElement("a");
            eleLink.download = _filename;
            eleLink.style.display = "none";
            // 字符内容转变成blob地址
            var blob = new Blob([_data]);
            eleLink.href = URL.createObjectURL(blob);
            // 触发点击
            document.body.appendChild(eleLink);
            eleLink.click();
            // 移除
            document.body.removeChild(eleLink);
        }
    };
}

/**
 * @param {Array} data 
 * @param {String} filename 
 * @param {Array} header 
 */
function getXlsxDownload(filename, header = [], data = []) {
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