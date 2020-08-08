// 使用Promise封装异步操作
function MyPromise(executor) {
    // 初始化状态为等待状态pending
    this.status = "pending";
    // 执行成功返回值
    this.value = undefined;
    // 执行失败返回值
    this.error = undefined;
    // 存放
    this.successCallback = [];
    this.failCallback = [];
    const resolve = (data) => {
        if (this.status === "pending") {
            this.status = "fulfilled";
            this.data = data;
        }
    }
    const reject = (error) => {
        if (this.status === "pending") {
            this.status = "rejected";
            this.error = error;
        }
    }
    try {
        executor(resolve, reject);
    } catch (err) {
        reject(err);
    }
}

// 实现Promise的then方法
MyPromise.prototype.then = function (successFn = (value) => { }, failFn = (error) => { }) {
    if (this.status === "fulfilled") {
        successFn(this.value);
    } else if (this.status === "rejected") {
        failFn(this.error);
    } else if (this.status === "pending") {

    }
};

export default MyPromise;