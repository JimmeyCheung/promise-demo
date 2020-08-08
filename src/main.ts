import MyPromise from "./promise.js";


const p1 = new MyPromise((resolve, reject) => {
    setTimeout(() => { resolve(1) }, 1000)
})
const p2 = new MyPromise((resolve, reject) => {
    resolve(2)
})
const p3 = new MyPromise((resolve, reject) => {
    resolve(3)
})
MyPromise.all([p1, p2, p3]).then((v) => { print(`resolve:${v.join(",")}`) }, (e) => { print(`reject:${e}`) })


function print(value) {
    document.querySelector("#output").innerHTML += `<p>${value}</p>`;
}