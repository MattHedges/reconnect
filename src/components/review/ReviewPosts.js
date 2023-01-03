import { useNavigate, useParams } from "react-router-dom"
import "./Reviews.css"


export const ReviewPosts = ({post, getAllPosts, currentUser, setPosts, setPostList}) => { 
    const navigate = useNavigate()
    
    const handleEdit = (click) => {
        click.preventDefault()
        navigate(`postEdit/${post.id}`)
    }
    
    const ApprovedPosts = (post) => {
       const payLoad= { 
        userId: post.userId,
        isPost: post.isPost,
        topicId: post.topicId,
        dateSubmitted: post.dateSubmitted,
        content: post.content,
        isApproved: post.isApproved,
        anonymous: post.anonymous,
        moderatorId: currentUser.id,
        id: post.id
    }
    
        fetch(`http://localhost:8088/posts/${post.id}` , {
            method: "PUT",
            headers: {
            "Content-Type": "application/json"
        },
            body: JSON.stringify(payLoad)
    })
        .then(response => response.json())
        .then(() => {
            fetch('http://localhost:8088/posts?_expand=topic')
                    .then(response => response.json())
                    .then((ticketArray) => {
                        setPosts(ticketArray)
                        return ticketArray
                        
                    }) .then((ticketArray) => {
                        const copyFilter = ticketArray.filter((element) => {return element.isApproved === false} )
                        setPostList(copyFilter)
                    })
        })   
        
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
                        const copyFilter = ticketArray.filter((element) => {return element.isApproved === false} )
                        setPostList(copyFilter)
                    })
                })
        }} className="post__finish">Delete</button>
    }
    else {
        return ""
    }
}

return <>
<div className="content_container">
    <div>Content: {post.content}</div> <div>Topic: {post?.topic?.name}</div>
    {
        deleteButton()
    }
    {
        
    }
    
       
<fieldset>
<div className="form-group">
    <label htmlFor="name">Approve:</label>
    <input type="checkbox"
        value={post.isPost}
        onChange={
            (evt) => {
                // copy variable below creates a copy of existing state... shorthand notation for copying the existing state is {...ticket}
                const copy = {...post}
                // modifying the copy of the existing state. new value of description property should be whatever the current value of the input value is. whatever is currently in the input field
                copy.isApproved = !post.isApproved
                ApprovedPosts(copy)
                getAllPosts()
            }
        } />
</div>
</fieldset>
    </div>
    </>
}



