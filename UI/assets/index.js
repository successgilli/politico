let headerCenterDiv=document.getElementById('headerCenterDiv');
let signinDiv=document.getElementById('signinDiv');
let modalBackground=document.getElementById('modalBackground');
let navBar=document.getElementById('navBarDiv');
let asideModal=document.getElementById('asideModal');
let aside=document.getElementsByTagName('aside')[0];
let loginButton=document.getElementById('submitButton');
let modalContent=document.getElementById('modalContent');
let loginForm=document.getElementById('loginForm');
let formInputs=document.getElementById('formInputs');
let loginName=document.getElementById('loginName');
let loginPassword=document.getElementById('loginPassword');
let closeX=document.getElementsByClassName('close');
let forgotPassword=document.getElementById('forgotPassword');
let xPoint;
let ypoint;
let prevx;


window.addEventListener('hashchange',()=>{
    window.scrollTo(window.scrollX,window.scrollY-70);
})

forgotPassword.addEventListener('click',()=>{
    document.getElementById('resetPasswordModalBackground').style.display='flex';
})

//close forget password popup
for(i=0;i<closeX.length;i++){
    closeX[i].addEventListener('click',()=>{
        resetPasswordModalBackground.style.display='none';

    })
}
//go to user page onClick
loginButton.addEventListener('click',(e)=>{
    e.preventDefault();
    location='./userPage.html';
})
modalBackground.addEventListener('click',(e)=>{
    let target=e.target;
    console.log(target)
    //ensure loginForm is not closed when clicked on except the 
    //click happened on the modal directly
    if(target===modalBackground){
        //ensure the loginForm dosnt close when inputs are in the form
        if(loginName.value.trim()===""&&loginPassword.value.trim()===""){
            modalBackground.style.display='none';
            headerCenterDiv.style.backgroundColor='rgb(77, 68, 68)';
            headerCenterDiv.style.color='grey';
            //reset the colors of the small screenPage signin Icon when modal is clicked
            signinDiv.style.backgroundColor='rgb(77, 68, 68)';
            signinDiv.style.color='grey';
        }
        
    }
    
})

navBar.addEventListener('click',()=>{
    if(window.getComputedStyle(asideModal).getPropertyValue('display')==='none'){
        asideModal.style.display='block';
        aside.style.marginLeft='0px';
        modalBackground.style.display='none';
        signinDiv.style.backgroundColor='rgb(77, 68, 68)';
        signinDiv.style.color='grey';
    }
    else{
        asideModal.style.display='none';
        aside.style.marginLeft='-170px';
    }
})

asideModal.addEventListener('click',()=>{
    asideModal.style.display='none';
    aside.style.marginLeft='-170px';
})
aside.addEventListener('click',()=>{
    asideModal.style.display='none';
    aside.style.marginLeft='-170px';
})
signinDiv.addEventListener('click',()=>{
    if(window.getComputedStyle(asideModal).getPropertyValue('display')!=='none'){
        asideModal.style.display='none';
        aside.style.marginLeft='-170px';
    }
    
})
headerCenterDiv.addEventListener('click',()=>{
    if(window.innerWidth>=769){
        if(window.getComputedStyle(modalBackground).getPropertyValue('display')==='none'){
            modalBackground.style.display='block';
            headerCenterDiv.style.backgroundColor='white';
            headerCenterDiv.style.color='black';
            document.getElementById('modalContent').style.left=headerCenterDiv.offsetLeft+'px';
        }else{
            modalBackground.style.display='none';
            headerCenterDiv.style.backgroundColor='rgb(77, 68, 68)';
            headerCenterDiv.style.color='grey';
        }

    }   
})
signinDiv.addEventListener('click',()=>{
    if(window.innerWidth>450){
        if(window.getComputedStyle(modalBackground).getPropertyValue('display')==='none'){
            modalBackground.style.display='block';
            signinDiv.style.backgroundColor='white';
            signinDiv.style.color='black';
            document.getElementById('modalContent').style.left=signinDiv.offsetLeft+'px';
        }else{
            modalBackground.style.display='none';
            signinDiv.style.backgroundColor='rgb(77, 68, 68)';
            signinDiv.style.color='grey';
        }
    }
    if(window.innerWidth<450){
        if(window.getComputedStyle(modalBackground).getPropertyValue('display')==='none'){
            modalBackground.style.display='block';
            signinDiv.style.backgroundColor='white';
            signinDiv.style.color='black';
            document.getElementById('modalContent').style.left=0+'px';
        }else{
            modalBackground.style.display='none';
            signinDiv.style.backgroundColor='rgb(77, 68, 68)';
            signinDiv.style.color='grey';
        }
    }
})
window.addEventListener('resize',()=>{
    if(window.getComputedStyle(modalBackground).getPropertyValue('display')!=='none'){
        document.getElementById('modalContent').style.left=headerCenterDiv.offsetLeft+'px';
        headerCenterDiv.style.backgroundColor='white';
        headerCenterDiv.style.color='black';
        if(window.innerWidth>450 && window.innerWidth<=768){
            modalBackground.style.display='block';
            signinDiv.style.backgroundColor='white';
            signinDiv.style.color='black';
            document.getElementById('modalContent').style.left=signinDiv.offsetLeft+'px';
        }
        else if(window.innerWidth<=450){
            modalBackground.style.display='block';
            signinDiv.style.backgroundColor='white';
            signinDiv.style.color='black';
            document.getElementById('modalContent').style.left=0+'px';
        }
    }
    
})