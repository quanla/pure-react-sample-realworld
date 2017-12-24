//
// function number(num) {
//     if (num == null) {
//         return null;
//     }
//
//     num = Math.round(num * 1000)/1000;
//
//     let str = "" + num;
//     let ret = "";
//     for (let i = 0; i < str.length; i++) {
//         if (i % 3 == 0 && ret.length) {
//             ret = "," + ret;
//         }
//         ret = str[str.length - 1 - i] + ret;
//     }
//     return ret;
// }
//
// function money(num) {
//     return <span className="format-money">{number(num)} <span className="unit up">VND</span></span>;
// }
//
// const Format = {
//     money,
//     number,
// };
//
// exports.Format = Format;