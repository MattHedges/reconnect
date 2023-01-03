import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import { ReviewPosts } from "./ReviewPosts"


// set state then create useeffect 
export const Reviews = ({ searchTermState }) => {
    const [posts, setPosts] = useState([])
    const [filteredPosts, setPostList]= useState([])
    const navigate = useNavigate()
    const localReconnectUser = localStorage.getItem("reconnect_user")
    const reconnectUserObject = JSON.parse(localReconnectUser)



     const getAllPosts = () => {
        fetch('http://localhost:8088/posts?_expand=topic')
            .then(response => response.json())
            .then((ticketArray) => {
                setPosts(ticketArray)
                const copy=[...posts]
                const copyFilter= copy.filter(element => element.isApproved === false)
                setPostList(copyFilter)
            
            })
    }
    useEffect(
        () => {
            // getAllPosts()
            fetch('http://localhost:8088/posts?_expand=topic')
            .then(response => response.json())
            .then((ticketArray) => {
                setPosts(ticketArray)
                return ticketArray
                
            }) .then((ticketArray) => {
                const copyFilter = ticketArray.filter((element) => {return element.isApproved === false} )
                setPostList(copyFilter)
            })
        },
    [] 
)



   

    return <>

    <h2>Reviews</h2>

        <article className='posts'>
            {
                filteredPosts.map(
                    (post) => <ReviewPosts key={`post---${post.id}`}
                    post={post}
                    currentUser={reconnectUserObject}
                    getAllPosts={getAllPosts}
                    setPosts = {setPosts}
                    setPostList = {setPostList}
                    />
                    
                )
            }
        </article>
        </>
}