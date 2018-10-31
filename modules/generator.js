//export function generateID(){
Vue.prototype.generateID  = function () {    
  //生成ID
    return unfetch({
        url:'/generator/id',
        method: 'get'
    });
}