import "@/css/homepage.scss";
import '@/assets/iconfont/iconfont'
import axios from 'axios'
import '@/assets/iconfont/iconfont.css'
const arr = [new Promise(() => {}), new Promise(() => {})];

arr.map(item => {
  console.log(item);
});
arr.map(item => {
  console.log(item);
});


axios.get('/api/info').then(res=>{
console.log(res)
})

var btn = document.createElement("button");
btn.innerHTML = "新增";
document.body.appendChild(btn);
btn.onclick = function() {
  var div = document.createElement("div");
  div.innerHTML = "item";
  document.body.appendChild(div);
}
cons.log(1)