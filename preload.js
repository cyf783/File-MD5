"use strict";
window.preload = Object.create(null);
const fs = require('fs'); // 引入文件系统模块
const crypto = require('crypto'); // 引入加密模块
window.preload = {
    createMd5: function (file) {
        return new Promise((resolve) => {
            // 创建一个哈希对象
            const hash = crypto.createHash('md5');
            // 创建一个可读流来读取文件
            const readStream = fs.createReadStream(file);
            // 监听数据事件，逐块读取文件内容并更新哈希值
            readStream.on('data', (chunk) => {
                hash.update(chunk);
            });
            // 监听结束事件，当文件读取完毕后计算MD5值
            readStream.on('end', () => {
                resolve(hash.digest('hex'));
            });
            // 监听错误事件，处理读取文件时可能发生的错误
            readStream.on('error', (err) => {
                resolve(`An error occurred: ${err}`);
            });
        });
    }
};