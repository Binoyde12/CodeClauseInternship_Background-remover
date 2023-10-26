const canvas = document.getElementById("outputCanvas");
if (canvas.getContext) {
    const context = canvas.getContext("2d");
    let imageURL; 
    function submitHandler() {
        const fileInput = document.getElementById('fileInput');
        const image = fileInput.files[0];
        
        const formData = new FormData();
        formData.append('image_file', image);
        formData.append('size', 'auto');

        const apiKey = 'oSRA3MeR6T4WzN855ubsmsmA';

        fetch('https://api.remove.bg/v1.0/removebg', {
            method: 'POST',
            headers: {
                'X-Api-Key': apiKey
            },
            body: formData
        })
        .then(function(response) {
            return response.blob();
        })
        .then(function(blob) {
            const url = URL.createObjectURL(blob);
            imageURL = url;
            const img = new Image();
            img.src = url;
            img.onload = function() {
                canvas.width = img.width;
                canvas.height = img.height;
                context.drawImage(img, 0, 0, img.width, img.height);
            };
        })
        .catch(error => console.error('An error occurred:', error));
    }

    function downloadFile() {
        if (imageURL) {
            const a = document.createElement('a');
            a.href = imageURL;
            a.download = 'processed_image.jpg';
            document.body.appendChild(a);

            a.click();

            document.body.removeChild(a);
        }
    }

} else {
    console.error("Canvas is not supported in this browser.");
}
