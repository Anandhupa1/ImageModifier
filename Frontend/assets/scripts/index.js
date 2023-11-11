// let baseUrl = "http://localhost:4500"
let baseUrl = "https://lovely-cow-houndstooth.cyclic.app"
if(!sessionStorage.getItem("token")){window.location.href="./pages/login.html"}
else {


    function fetchImages(page, limit) {
        const token = sessionStorage.getItem('token'); // Assuming the token is stored in sessionStorage
        sessionStorage.setItem("page",page)
        showLoader()
        fetch(`${baseUrl}/image/my-images?page=${page}&limit=${limit}`, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
        .then(response => response.json())
        .then(data => {
            hideLoader()
            displayImages(data.userImages);
            setupPagination(data.currentPage, data.totalPages);
        })
        .catch(error => {
            hideLoader()
            console.error('Error:', error);
        });
    }
    
    function displayImages(images) {
        if(images.length>0){
        const row = document.querySelector('#row');
        row.innerHTML = ''; // Clear existing images
        images.forEach(image => {
            const readableDate = new Date(image.createdAt).toLocaleString();
            const col = document.createElement('div');
            col.className = 'col-md-4 mb-3';
            col.innerHTML = `
                <div style="padding: 15px; border-radius: 20px;" class="card">
                    <img style="border-radius: 20px; cursor: pointer;" src="${image.imageUrl}" class="card-img-top" alt="Image">
                    <div class="card-body p-0 m-0 pt-2 pb-4">
                        <p class="card-text"><small class="text-muted"> ${readableDate}</small></p>
                        <a href="${image.imageUrl}" class="custom-view-more-btn">View</a>
                        <a onclick="delete1('${image._id}')" class="custom-download-btn"><i class="fas fa-trash mr-1"></i> Delete</a>
                    </div>
                </div>
            `;
            row.appendChild(col);
        });
    }
    }







}


document.addEventListener('DOMContentLoaded', function () {
    fetchImages(1, 3); // Fetch first page of images
});




// utility functions--------
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
  
  