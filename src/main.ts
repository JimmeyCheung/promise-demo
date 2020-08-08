import MyPromise from "./promise.js";

const resolvePromise = new MyPromise((resolve, reject) => {
    setTimeout(() => {
        resolve('成功');
    }, 2000)
}).then((value) => {
    return value
})

const rejectPromise = new MyPromise((resolve, reject) => {
    reject('失败');
}).then((value) => {
}, (error) => {
    return error
})

resolvePromise.then((value) => { print(`resolve:${value}`) }, (err) => { print(`reject:${err}`) })

rejectPromise.then((value) => { print(`resolve:${value}`) }, (err) => { print(`reject:${err}`) })



function print(value) {
    document.querySelector("#output").innerHTML += `<p>${value}</p>`;
}