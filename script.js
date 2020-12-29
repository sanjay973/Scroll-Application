

let imageContainer=document.getElementById('image-container');
const loader =document.getElementById('image-loader');

let ready=false;
let imagesLoaded=0;
let totalImages=0;
let photosArray=[];



const count=4;
const apiKey='OqZoBTFfX5P7UX4GLHq1RVRm8rE8i8zAcyYZszl0pok';
const apiUrl=`https://api.unsplash.com/photos/random/
?client_id=${apiKey}&count=${count}`;


function imageLoaded(){
    imagesLoaded++;
    if(imagesLoaded===totalImages){
        ready=true;
        loader.hidden=true;
    }
}

//set attribute function
function setAttributes(element,attributes){
    for(const key in attributes){
        element.setAttribute(key,attributes[key]);
    }
}


//Create Elements for links and photos;
function displayphotos(){
    totalImages=photosArray.length;
    imagesLoaded=0;
    console.log("total_image",totalImages)
    photosArray.forEach((photo)=>{
       //create an actor element to link to unsplash
    
        const item=document.createElement('a');
    setAttributes(item,{
        href:photo.links.html,
        target:'_blank',
    })
//        create image for photo
        const img=document.createElement('img');
        
        setAttributes(img,{
            src:photo.urls.regular,
            alt:photo.alt_description,
            title:photo.alt_description,
        })
        
//        Event Listener To check when each is finished loading
        img.addEventListener('load',imageLoaded);
        
        
        //put image inside <a> and put both in image container
        
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}




//get photos from api

async function getPhotos(){
    try{
        const response = await fetch(apiUrl);
        photosArray=await response.json();
        console.log(photosArray)
       displayphotos();
        
    }catch(error){
        
    }
}

//scroll event , load more photos if at bottom of page
//window is grand parent of the body

window.addEventListener('scroll',()=>{
   if(window.innerHeight+window.scrollY>=document.body.offsetHeight-1000
     &&ready){
       ready=false;
       getPhotos();
   }
})

getPhotos();










//lecture 23






















