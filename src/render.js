/*
 * @Author: your name
 * @Date: 2020-12-03 20:42:46
 * @LastEditTime: 2020-12-03 20:46:51
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /request/src/render.js
 */
const fs = require('fs')
module.exports = function render(page) {
    return new Promise((resolve, reject) => {
        let viewUrl = `view/${page}`
        fs.readFile(viewUrl, 'binary', (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}