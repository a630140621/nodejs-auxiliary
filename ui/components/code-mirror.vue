<template>
  <!--
    npm install codemirror csslint file system jsonlint --save

    Usage:
        <code-mirror v-model="content" mode='"application/json", "text/css", "text/html", "application/javascript", "text/plain", "application/xml"'></code-mirror>
  -->
  <div class="editor">
    <textarea ref="textarea"></textarea>
  </div>
</template>

<script>
import CodeMirror from "codemirror";
import "codemirror/lib/codemirror.css";
// json-lint
import jsonlint from "jsonlint";
window.jsonlint = jsonlint;
// css-lint
import { CSSLint } from "csslint";
window.CSSLint = CSSLint;
// lint
import "codemirror/addon/lint/lint.js";
import "codemirror/addon/lint/lint.css";
import "codemirror/addon/lint/css-lint.js";
import "codemirror/addon/lint/javascript-lint.js";
import "codemirror/addon/lint/json-lint";
// hint
import "codemirror/addon/hint/show-hint.js";
import "codemirror/addon/hint/show-hint.css";
import "codemirror/addon/hint/css-hint.js";
// theme
import "codemirror/theme/night.css";
// mode
import "codemirror/mode/css/css";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/cypher/cypher";
import "codemirror/mode/markdown/markdown";
import "codemirror/mode/python/python";
import "codemirror/mode/htmlembedded/htmlembedded";
import "codemirror/mode/htmlmixed/htmlmixed";

export default {
  name: "CodeMirror",
  props: {
    value: String,
    mode: {
      type: String,
      default: "text/plain" // "application/json", "text/css", "text/html", "application/javascript", "text/plain", "application/xml"
    }
  },
  data() {
    return {
      editor: null
    };
  },
  watch: {
    value() {
      const editor_value = this.editor.getValue();
      if (editor_value !== this.value) { // 初始化
        this.editor.setValue(this.value);
      }
    },
    mode() {
      this.editor.setOption("mode", this.mode);
    }
  },
  mounted() {
    this.editor = CodeMirror.fromTextArea(this.$refs.textarea, {
      lineNumbers: true,
      mode: this.mode,
      theme: "night",
      spellcheck: true,
      autocorrect: true,
      lint: true,
      gutters: ["CodeMirror-lint-markers"],
      tabSize: 4,
      indentUnit: 4
    });

    this.editor.on("change", cm => {
      this.$emit("input", cm.getValue());
    });
  },
  beforeDestroy() {
    // 垃圾回收
    this.editor = null;
  }
};
</script>

<style scoped>
.editor {
  height: 100%;
  position: relative;
}
.editor >>> .CodeMirror {
  height: auto;
  min-height: 300px;
}
.editor >>> .CodeMirror-scroll {
  min-height: 300px;
}
.editor >>> .cm-s-rubyblue span.cm-string {
  color: #f08047;
}
</style>