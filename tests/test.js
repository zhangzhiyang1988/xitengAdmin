/**
 *@description 获取自然数
 */
// function *getNaturalNumber(){
//   var seed = 0;
//   while(true) {
//     yield seed ++;
//   }
// }
// var gen = getNaturalNumber();// 实例化一个Generator
// /* 启动Generator */
// console.log(gen.next()) //{value: 0, done: false}
// console.log(gen.next()) //{value: 1, done: false}
// console.log(gen.next()) //{value: 2, done: false}

/**
 * @description 处理输入和输出
 */
function * input(){
  let array = [];
  while(true) {
    array.push(yield array);
  }
}
var gen = input();
console.log(gen.next("西")) // { value: [], done: false }
console.log(gen.next("部")) // { value: [ '部' ], done: false }
console.log(gen.next("世")) // { value: [ '部', '世' ], done: false }
console.log(gen.next("界")) // { value: [ '部', '世', '界' ], done: false }

