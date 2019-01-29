let headerCenterDiv=document.getElementById('headerCenterDiv');
let signinDiv=document.getElementById('signinDiv');
let modalBackground=document.getElementById('modalBackground');
let loginButton=document.getElementById('submitButton');
let closeX=document.getElementsByClassName('close');
let forgotPassword=document.getElementById('forgotPassword');
let loginName=document.getElementById('loginName');
let loginPassword=document.getElementById('loginPassword');



forgotPassword.addEventListener('click',()=>{
    document.getElementById('resetPasswordModalBackground').style.display='flex';
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
        
        }
        
    }
    
})


loginButton.addEventListener('click',(e)=>{
    e.preventDefault();
    location='./userPage.html';
})

headerCenterDiv.addEventListener('click',()=>{
    
    if(window.getComputedStyle(modalBackground).getPropertyValue('display')==='none'){
        if(window.innerWidth>=901){
            modalBackground.style.display='block';
            headerCenterDiv.style.backgroundColor='white';
            headerCenterDiv.style.color='black';
            document.getElementById('modalContent').style.left=headerCenterDiv.offsetLeft+'px';
        }else if(window.innerWidth<901 && window.innerWidth>450 ){
            modalBackground.style.display='block';
            headerCenterDiv.style.backgroundColor='white';
            headerCenterDiv.style.color='black';
            document.getElementById('modalContent').style.left=((headerCenterDiv.offsetLeft +130)-270)+'px';
        }else{
            modalBackground.style.display='block';
            headerCenterDiv.style.backgroundColor='white';
            headerCenterDiv.style.color='black';
            document.getElementById('modalContent').style.left='0px';
        }
    }else{
        modalBackground.style.display='none';
        headerCenterDiv.style.backgroundColor='rgb(77, 68, 68)';
        headerCenterDiv.style.color='grey';
    }

      
})

window.addEventListener('resize',()=>{
    if(window.getComputedStyle(modalBackground).getPropertyValue('display')!=='none'){
        if(window.innerWidth>=901){
    
            document.getElementById('modalContent').style.left=headerCenterDiv.offsetLeft+'px';
            headerCenterDiv.style.backgroundColor='white';
            headerCenterDiv.style.color='black';
            
        }
        else if(window.innerWidth<901 && window.innerWidth>450 ){
            headerCenterDiv.style.backgroundColor='white';
            headerCenterDiv.style.color='black';
            document.getElementById('modalContent').style.left=((headerCenterDiv.offsetLeft +130)-270)+'px';
        }else{
            headerCenterDiv.style.backgroundColor='white';
            headerCenterDiv.style.color='black';
            document.getElementById('modalContent').style.left='0px';
        }
    
}   
    
})