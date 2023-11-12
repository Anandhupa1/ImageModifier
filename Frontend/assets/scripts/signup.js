let baseUrl ="http://localhost:4500"
// let baseUrl = "https://lovely-cow-houndstooth.cyclic.app"
let form = document.getElementById("form");

form.addEventListener("submit",async(e)=>{

        e.preventDefault();
        try {
            showLoader()
            let obj = {
                email:form.email.value,
                password:form.password.value,
                name : form.name.value,
                cPassword:form.cPassword.value,
               }
            
            let res = await fetch(`${baseUrl}/user/register`, {
                method: 'POST',
                body: JSON.stringify(obj),
                headers: {
                  'Content-type': 'application/json; charset=UTF-8',
                },
              })
            let data = await res.json();
            hideLoader();
          
            if(res.status=="201"){
                showAlert("success",data.message,"success");
                setTimeout(()=>{
                    window.location.href="pages/login.html"
                },3000)
            }
            else if(res.status=="500"){
              showAlert("Error","sorry, currently we are not able to process your request, please try after some time.","error")
            }
            else if(res.status=="409"){
              showAlert("Please Login",data.message,"warning")
              setTimeout(()=>{
                window.location.href="pages/login.html"
            },3000)
            }
            else {
              showAlert("",data.message,"warning")
            }
            
    } catch (error) {
        hideLoader()
        showAlert("error",error,"error")
    }
})



// utility funcitons--------

function showAlert(title,message,icon) {
    let obj ={
      // title: '<strong>Your Title</strong>',
      // html: 'Your <b>HTML</b> content goes here.',
      // icon: 'success',
      showCloseButton: true,
      showCancelButton: false,
      focusConfirm: false,
      confirmButtonText: 'okay',
      confirmButtonAriaLabel: 'okay',
      cancelButtonText: '<i class="fa fa-thumbs-down"></i>',
      cancelButtonAriaLabel: 'Thumbs down',
      customClass: {
        popup: 'max-w-sm w-full bg-zinc-800 rounded-xl p-8 shadow-md',
        title: 'text-2xl font-bold text-center mb-4 text-white',
        htmlContainer: 'text-white',
        confirmButton: 'w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition',
      },
      background: 'rgba(31, 41, 55, 0.8)',
      position: 'center',
      showConfirmButton: true,
      // timer: 3000
    }

    if(title){obj.title=`<strong>${title}</strong>`}
    if(message){obj.text=message}
    if(icon){obj.icon=icon}
    
    
    
    
    swal.fire(obj);
      
      

}

function showLoader() {
    document.querySelector('.loader').style.display = 'inline-block';
    document.querySelector('.loader-overlay').style.display = 'block';
}

function hideLoader() {
    document.querySelector('.loader').style.display = 'none';
    document.querySelector('.loader-overlay').style.display = 'none';
}
