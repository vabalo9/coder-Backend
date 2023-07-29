const socket= io()
const chatbox= document.getElementById("chatbox")
let user = localStorage.getItem("user") || ''

if (!user) {
Swal.fire({
    title: 'Auth',
    input: 'text',
    text: 'Set username',
    inputValidator: value => {
        return !value.trim() && 'Please. Write a username'
    },
    allowOutsideClick: false
}).then(result => {
    user = result.value
    document.getElementById('userName').innerHTML = user
    localStorage.setItem("user", user)
    socket.emit('new', user)
})
} else {
    document.getElementById('userName').innerHTML=user
    socket.emit('new', user)
}

chatbox.addEventListener('keyup', event =>{
if(event.key=== "Enter"){
    const mesagge = chatbox.value.trim()
    if (mesagge.length >0) {
        socket.emit('mesagge', {
            user,
            mesagge
        })
        chatbox.value= ''
    }
}
})


socket.on('logs', data=>{
    console.log(data)
    const divLogs=document.getElementById('logs')
    let messages= ''
    data.messages.forEach(element => {
        messages = `<p style="color: white;" ><i>${element.user}: </i>${element.message}</p>` + messages
        
    });
    divLogs.innerHTML = messages
}
)