const sendEL=document.getElementById("send_btn");
const formEL=document.getElementById("form_m");

formEL.addEventListener('submit',(e)=>{
    e.preventDefault();
    const form=new FormData(formEL);
    const data={};
    form.forEach((value,key)=>{
        data[key]=value;
    })
    let dataString = `Name: ${data.Name}<br/>Email: ${data.Email}<br/>Message: ${data.Message}`;
    sendmail(dataString);
    //console.log(dataString);
    
})

function sendmail(str){
    Email.send({
        SecureToken : "0d96edda-3227-4cee-b5e3-07b9d12663f4",
        To : 'smallbrother849@gmail.com',
        From : "smallbrother849@gmail.com",
        Subject : "PUCIT GPA CALCULATOR",
        Body : str
    }).then(
      message => alert(message)
    );
}
