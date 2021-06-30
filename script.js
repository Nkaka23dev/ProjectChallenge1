const userList=document.querySelector('#user-display'); 
const userPosts=document.querySelector('#userPost') 
const userCloseButton=document.getElementById('user-close-btn')
const userDetailContent=document.querySelector('#userPost')
let output='' 
// let posts=''
const userDetail=document.querySelector('user-posts-btn')

userCloseButton.addEventListener('click',()=>{
    userDetailContent.parentElement.classList.remove('showDetail');
})

const renderUser=(data)=>{
    data.forEach(user=>{
        output+=`
        <div class="data-items" data-id=${user.id}>
        <h2 class="user-name">${user.name}</h2>
        <h4 class="user-email">${user.email}</h4>
        <a href="#" id="user-posts" class="user-posts-btn">Get User's Posts</a>
        </div>`;
    })
   userList.innerHTML=output

}
    //fetching the data
fetch('https://jsonplaceholder.typicode.com/users')
.then(response=>{
    // console.log(response)
    if (!response.ok){
    throw Error('ERROR OCURRED')
    }
    return response.json();
})
.then(
    data=>renderUser(data)
    )
.catch(error=>{
    console.log('error:',error)
})

userList.addEventListener('click',getAllPost)

// get user's post 
function getAllPost(e){
    e.preventDefault();
    let getUserPostClicked=e.target.id=='user-posts'
    if(getUserPostClicked){
      let userPost=e.target.parentElement.dataset.id
       fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userPost}`)
       .then(response=>{

        if (!response.ok){
            throw Error('ERROR OCURRED')
         }
        return response.json()
       })
       .then(data=>{
           posts=data
           .map(post=>{
               return`
            <h1 class="post-title">${post.title}</h1>
            <hr style="background-color: royalblue; font-weight: 900;">
            <div class="post-body">
            <p>${post.body}</p>
             </div>
                       `
           }).join("")
        //    console.log(posts)
           userDetailContent.innerHTML=posts
           userDetailContent.parentElement.classList.add('showDetail')
       })
       .catch(error=>{
           console.log(error)
       })
}

    } 

    
    






