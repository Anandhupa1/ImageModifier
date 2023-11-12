let baseUrl = "http://localhost:4500";
// let baseUrl = "https://lovely-cow-houndstooth.cyclic.app"
document.addEventListener('DOMContentLoaded', function (e) {
    e.preventDefault()
    var image = document.getElementById('image'); // Image where we'll set the source
    var input = document.getElementById('imageInput'); // File input element
    var cropButton = document.getElementById('cropButton'); // Button to trigger cropping
    var cropper; // Cropper.js instance
    var imageContainer = document.querySelector('.img-container'); // Container for the image preview

    // Event listener for when a file is selected
    input.addEventListener('change', function (e) {
        e.preventDefault();
        var files = e.target.files;
        var file = files && files.length > 0 ? files[0] : null;

        // Check if an image file is selected
        if (file && file.type.startsWith('image/')) {
            var reader = new FileReader();
            reader.onload = function (e) {
                // Set the image source to the selected file
                image.src = e.target.result;

                // Initialize Cropper.js on the image
                if (cropper) {
                    cropper.destroy();
                }
                cropper = new Cropper(image, {
                    aspectRatio: 16 / 9,
                    viewMode: 3,
                });

                // Show the image container
                imageContainer.classList.remove('d-none');

                // Show the crop button
                cropButton.classList.remove('d-none');
            };

            // Read the selected image file as a Data URL
            reader.readAsDataURL(file);
        } else {
            // If a non-image file is selected or no file is selected, reset the UI
            if (cropper) {
                cropper.destroy();
                cropper = null;
                image.src = '';
            }
            imageContainer.classList.add('d-none');
            cropButton.classList.add('d-none');
        }
    });

    // Event listener for the crop button
    cropButton.addEventListener('click', function (e) {
        if (cropper) {
            e.preventDefault();
            showLoader()
            cropper.getCroppedCanvas().toBlob(function (blob) {
                var formData = new FormData();
                formData.append('image', blob, 'cropped-image.png');
    
                // Retrieve your token from where it is stored
                var token = sessionStorage.getItem("token"); // Replace with your actual token retrieval logic
    
                fetch(`${baseUrl}/image/upload`, {
                    method: 'POST',
                    headers: {
                        'Authorization': 'Bearer ' + token  // Add Authorization header with Bearer token
                    },
                    body: formData
                })
                .then(response => response.json())
                .then(data => {
                    hideLoader()
                    window.location.href="./gallery.html"
                    // showAlert("Success","Image saved successfully","success")
                    
        
                })
                .catch((error) => {
                    hideLoader()

                    showAlert("Error","Something went wrong, please try again later.","error")
                    console.error('Error:', error);
                });
            });
        }
    });
    





});







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
  
  