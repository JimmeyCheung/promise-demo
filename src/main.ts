import MyPromise from "./promise.js";

new MyPromise((resolve, reject) => {
    setTimeout(() => {
        resolve('成功');
    }, 2000)
}).then((value) => {
    print(`resolve:${value}`);
})

// new MyPromise((resolve, reject) => {
//     reject('异步操作执行完成');
// }).then((value) => {
//     print(`resolve:${value}`);
// }, (error) => {
//     print(`reject:${error}`);
// })


function print(value) {
    document.querySelector("#output").innerHTML = value;
}