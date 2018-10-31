// import io from '../../node_modules/socket.io-client'
import { Notification } from 'element-ui'
import { stringify } from 'querystring';


window.Notification.requestPermission()
const token = nenv.storage.userStorage.token;


const path = `${location.pathname}`;
const user = localStorage.getItem(path + '/user.profile')
    // const socket = io.connect(`${process.env.SOCKET_URL}?sa=${token}`)
    //socket.emit('joinRoom', '11E787B2A7179B4E9911D583E7E8BEA9')
    //debugger
if (user != null) {
    let obj = JSON.parse(user)
        // socket.emit('joinRoom', obj.userName)
}

// socket.on('connect', () => {
//     console.log(socket.id); // 'G5p5...'
// })

// socket.on('receiveMessage', function(data) {
//     //debugger
//     const { title, type, content, url, pushId } = data
//     var localPushId = localStorage.getItem('pushId');
//     if (localPushId && localPushId === pushId) {
//         //防止重复消息
//     } else {
//         localStorage.setItem('pushId', pushId);
//         notity(title, content, url)
//     }


// })

function notity(title, content, url) {

    new Notification({
        type: 'success',
        title: title,
        message: content,
        position: 'bottom-right',
        dangerouslyUseHTMLString: true,
        onClick: function() {
            console.log(this)
        }
    })

    // (new Promise((resolve, reject) => {
    //     if (window.Notification) {
    //         window.Notification.requestPermission((result) => {
    //             if (result === 'denied') {
    //                 reject()
    //             } else {
    //                 resolve()
    //             }
    //         })
    //     } else {
    //         reject()
    //     }
    // })).then(() => {
    //     const notity = new window.Notification(title, {
    //         dir: 'auto',
    //         body: content,
    //         silent: true,
    //         icon: '/static/notity.jpg'
    //     })
    //     notity.onclick = function() {
    //         if (url) {
    //             unfetch.open(url)
    //         }
    //         notity.close()
    //     }
    // }).catch(() => {
    //     new Notification({
    //         type: 'success',
    //         title: title,
    //         message: content,
    //         onClick: function() {
    //             console.log(this)
    //         }
    //     })
    // })
}