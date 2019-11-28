// 参考文档: 
// https://www.npmjs.com/package/qrcode
// 安装:
// npm i qrcode
import Vue from "vue";
import QRCode from "qrcode";


/**
 * 用途:
 *  鼠标悬停在指定所在触发区域时，显示指定的二维码
 * 
 * Usage: 
 *  <el v-qrcode="string"></el>
 * 
 * eg.
 *  <template>
 *      <div>
 *          <a target="_blank" :href="url1" v-qrcode="url1">{{url1}}</a>
 *          <br />
 *          <a target="_blank" :href="url2" v-qrcode="url2">{{url2}}</a>
 *      </div>
 *  </template>
 *
 *  <script>
 *  export default {
 *      name: "QRCode",
 *      data() {
 *          return {
 *              url1: "http://www.baidu.com",
 *              url2: "https://developer.mozilla.org/zh-CN/docs/Web/API/Element"
 *          };
 *      }
 *  };
 *  </script>
 */
Vue.directive("qrcode", {
    bind(el, binding) {
        let canvas = document.createElement("canvas");
        document.body.appendChild(canvas);
        let bind = {
            el: el,
            canvas: canvas,
            text: binding.value
        };
        el.addEventListener("mouseover", _onMouseover.bind(bind));
        el.addEventListener("mouseleave", _onMouseleave.bind(bind));
        el.dataset._url = binding.value;
    },
    update(el, binding) {
        el.dataset._url = binding.value;
    },
    unbind(el, binding) {
        el.removeEventListener("mouseover", _onMouseover);
        el.removeEventListener("mouseleave", _onMouseleave);
        console.log("unbind");
    }
});

function _onMouseover(event) {
    QRCode.toCanvas(this.canvas, this.text, {
        errorCorrectionLevel: "L", // 纠错功能可以在即使符号变脏或损坏的情况下，依然能够成功扫描二维码；等级越高纠错能力越强（显示器上一般不需要高等级）；L、M、Q、H
        margin: 2,
        width: 132
    }, error => {
        if (error) console.error(error);
        _showCanvas(this.canvas, event.y, event.x);
        console.log("generate qrcode success!");
    });
}

function _onMouseleave(event) {
    _hideCanvas(this.canvas);
}

function _showCanvas(canvas, top, left) {
    canvas.style.display = "";
    canvas.style.position = "fixed";
    canvas.style.top = top + "px";
    canvas.style.left = left + "px";
}

function _hideCanvas(canvas) {
    canvas.style.display = "none";
}


// <div id="hover" style="width: 100px; height: 100px; background-color: red;"></div>

// let hover = document.getElementById("hover");
// hover.addEventListener("mousedown", event => {
//     console.log("mousedown");
// });
// hover.addEventListener("mouseenter", event => {
//     console.log("mouseenter");
// });
// hover.addEventListener("mouseleave", event => {
//     console.log("mouseleave");
// });
// hover.addEventListener("mousemove", event => {
//     console.log("mousemove");
// });
// hover.addEventListener("mouseout", event => {
//     console.log("mouseout");
// });
// hover.addEventListener("mouseover", event => {
//     console.log("mouseover");
// });
// hover.addEventListener("mouseup", event => {
//     console.log("mouseup");
// });

// 鼠标事件
// 触发顺序: mouseover -> mouseenter -> mousemove(区域内持续触发) -> mouseout -> mouseleave
// 区域内点击: mousedown -> mouseup