let headerCenterDiv=document.getElementById('headerCenterDiv');
let signinDiv=document.getElementById('signinDiv');
let modalBackground=document.getElementById('modalBackground');
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