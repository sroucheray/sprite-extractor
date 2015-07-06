/* */ 
class ImageLoader {
    load(param){
        //TODO: handle FileList
        if(!Array.isArray(param)){
            param = [param];
        }

        let promises = param.map((url)=>{
            if(url instanceof File){
                return this.getURLFromFile(url).then(this.getImageFromURL);
            }

            return this.getImageFromURL(url);
        });

        return Promise.all(promises).then((images)=>{
            this.images = images;
            return this;
        });
    }

    getURLFromFile(file){
        return new Promise(function(resolve, reject){
            let reader = new FileReader();
            reader.onload = (e) => {
                resolve(e.target.result)
            }
            reader.onerror = (error) => {
                reject(error);
            }

            reader.readAsDataURL(file);
        });
    }

    getImageFromURL(url){
        return new Promise(function(resolve, reject){
            let img = new Image();
            img.onload = () => {
                resolve(img)
            }
            img.onerror = (message) => {
                reject(message)
            }
            img.src = url;
        });
    }

    imagesData(){
        return this.images.map((image)=>{
            let canvas = document.createElement("canvas");
            canvas.width = image.width;
            canvas.height = image.height;
            let context = canvas.getContext("2d");
            context.drawImage(image, 0, 0);
            return context.getImageData(0, 0, image.width, image.height);
        });
    }
}

export default ImageLoader;