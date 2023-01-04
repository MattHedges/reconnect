import { useNavigate, useParams } from "react-router-dom"
import "./Posts.css"

export const Posts = ({post, setPosts, setPostList, currentUser}) => { 
    const navigate = useNavigate()
    const handleEdit = (click) => {
        click.preventDefault()
        navigate(`postEdit/${post.id}`)
    }
    


const deleteButton = () => {
    if (currentUser.staff || currentUser.id === post.userId) {
        return <button onClick={() => {
            fetch(`http://localhost:8088/posts/${post.id}`, {
                method: "DELETE"
            })
                .then(() => {
                    fetch('http://localhost:8088/posts?_expand=topic')
                    .then(response => response.json())
                    .then((ticketArray) => {
                        setPosts(ticketArray)
                        return ticketArray
                        
                    }) .then((ticketArray) => {
                        const copyFilter = ticketArray.filter((element) => {return element.isApproved === true} )
                        setPostList(copyFilter)
                    })
                })
                
        }} className="button">Delete</button>
    }
    else {
        return ""
    }
}

const EditButton = () => {
    if (currentUser.staff === true || currentUser.id === post.userId) {
        return <button onClick={() => { navigate(`/posts/postEdit/${post.id}`)
            // fetch(`http://localhost:8088/posts/pos${post.id}`, {
            //     method: "PUT",
            //     headers: {
            //         "Content-Type": "application/json"
            //     },
            //     body: JSON.stringify()
            // })
            //     .then(() => {
            //         getAllPosts()
            //     })
        }} className="button">Edit</button>
    }
    else {
        return ""
    }
}
// const closeTicket = () => {
//     const copy = {
//         userId: post.userId,
//         description: post.content,
//         dateCompleted: new Date()
//     }
//     return fetch(`http://localhost:8088/posts/${post.id}`, {
    
//         method: "PUT",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify(copy)
//     })
//         .then(response => response.json())
//         .then(getAllPosts())
// }
return <>
<div className="content_container">
    <div className="content">Content: {post.content}</div> <div className="content">Topic: {post?.topic?.name}</div>
    {
        EditButton()
    }
    {
        
        deleteButton()
    }   
    </div>
    </>
}