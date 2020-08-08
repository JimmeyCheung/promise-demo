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
            this.successCallback.forEach(fn => {
                fn(data);
            });
        }
    }
    const reject = (error) => {
        if (this.status === "pending") {
            this.status = "rejected";
            this.error = error;
            this.failCallback.forEach(fn => {
                fn(error);
            });
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
    const self = this;
    if (this.status === "fulfilled") {
        return new MyPromise((resolve, reject) => {
            try {
                const x = successFn(self.value);
                resolve(x);
            } catch (err) {
                reject(err);
            }
        })
    } else if (this.status === "rejected") {
        return new MyPromise((resolve, reject) => {
            try {
                const x = failFn(self.error);
                reject(x);
            } catch (err) {
                reject(err);
            }
        })
    } else if (this.status === "pending") {
        // 如果当前promise处于等待状态，由于无法判断执行失败或是成功回调
        // 需要先将两个回调放入到promise的回调数组中，在resolve或者reject时执行
        return new MyPromise((resolve, reject) => {
            self.successCallback.push(function () {
                try {
                    const x = successFn(self.data);
                    resolve(x);
                } catch (err) {
                    reject(err);
                }
            });
            self.failCallback.push(function () {
                try {
                    const x = failFn(self.error);
                    reject(x);
                } catch (err) {
                    reject(err);
                }
            });
        })
    }
};

export default MyPromise;