// npm install vue clipboard element-ui --save
import Vue from "vue";
import ClipboardJS from "clipboard";
import {
    Notification
} from "element-ui";

/**
 * Usage: 
 *  <el v-clipboard="text"></el>
 * 
 * eg.
 *  <template>
 *      <el-card>
 *          <el-input v-model="message"></el-input>
 *          <el-button type="primary" v-clipboard="message">点击复制</el-button>
 *      </el-card>
 *  </template>
 *
 *  <script>
 *  export default {
 *      name: "Clipboard",
 *      data() {
 *          return {
 *              message: "123"
 *          };
 *      }
 *  };
 *  </script>
 */
Vue.directive("clipboard", {
    bind(el, binding) {
        let clipboard = new ClipboardJS(el, {
            text: function (trigger) {
                return binding.value;
            }
        });
        clipboard.on("success", function (e) {
            Notification({
                title: "复制到剪切板成功",
                type: "success",
                message: e.text
            });
            e.clearSelection();
        });

        clipboard.on("error", function (e) {
            Notification({
                title: "复制到剪切板失败",
                type: "error",
                message: e.message
            });
        });
        el.$_clipboard = clipboard;
    },
    update(el, binding) {
        el.$_clipboard.text = function () {
            return binding.value;
        };
    },
    unbind(el, binding) {
        el.$_clipboard.destroy();
    }
});