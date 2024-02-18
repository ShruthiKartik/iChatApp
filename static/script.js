document.querySelector('.chatroom').classList.add('notActive');
document.querySelector('.chatroom').classList.remove('active');
// const socket = io('https://ichatapp-h3jz.onrender.com/');
const socket = io('http://localhost:3000');

let join=document.getElementsByClassName('join')[0];
// console.log(join);

let joinBtn=document.getElementById('join-btn');


joinBtn.addEventListener('click',()=>{

    let username=document.querySelector('[name="username"]').value;
    if(username.length==0){
        //console.log("hi")
        let element=document.createElement('div');
        element.innerHTML="Please join with a proper username";
        element.classList.add('font-color');
        document.querySelector('.join-input').append(element);
        return;
    }
    join.classList.remove('active');
    join.classList.add('notActive');
    document.querySelector('.chatroom').classList.add('active');
    document.querySelector('.chatroom').classList.remove('notActive');

    socket.emit("new-user-joined",username);
    document.getElementById('user').innerHTML=username;
})

let messages=document.querySelector(".messages");
let sendBtn=document.getElementById("send-btn");
let mobileSendBtn=document.querySelector(".mobile-send-btn");

sendBtn.addEventListener('click',()=>{
    let inputVal=document.getElementById('send').value;
    if(inputVal.length==0) return;
    let element=document.createElement('div');
    element.innerHTML=`
    <div class="message">
        <div class="name text-green">You</div>
        <div class="text ">${inputVal}</div>
    </div>
    `;
    element.classList.add("my-message");
    messages.append(element);
    socket.emit("send",inputVal);
    document.getElementById('send').value="";
});
mobileSendBtn.addEventListener('click',()=>{
    let inputVal=document.getElementById('send').value;
    if(inputVal.length==0) return;
    let element=document.createElement('div');
    element.innerHTML=`
    <div class="message">
        <div class="name text-green">You</div>
        <div class="text ">${inputVal}</div>
    </div>
    `;
    element.classList.add("my-message");
    messages.append(element);
    socket.emit("send",inputVal);
    document.getElementById('send').value="";
});

socket.on("user-joined",(name,info)=>{
    let displayEle=document.createElement('div');
    displayEle.setAttribute("class","display");
    displayEle.innerHTML=name+" " +info;
    messages.append(displayEle);
    // console.log(name)
});

socket.on("receive",(name,msg)=>{
    let element=document.createElement('div');
    element.innerHTML=`
    <div class="message">
        <div class="name text-red">${name}</div>
        <div class="text ">${msg}</div>
    </div>
    `;
    element.classList.add("other-message");
    messages.append(element);
});

let exitBtn=document.getElementById('exit-btn');
exitBtn.addEventListener('click',()=>{
    window.location.href=window.location.href;
})
let mobileExitBtn=document.querySelector('.mobile-exit-btn');
mobileExitBtn.addEventListener('touchstart',()=>{
    window.location.href=window.location.href;
})


socket.on("exit",(name,msg)=>{
    if(name===null) return;
    let displayEle=document.createElement('div');
    displayEle.setAttribute("class","display");
    displayEle.innerHTML=name+" " +msg;
    messages.append(displayEle);
    
})



