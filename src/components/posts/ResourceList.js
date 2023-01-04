import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import { Posts } from "./Posts"
import { Resources } from "./Resources"


// set state then create useeffect 
export const ResourceList = ({ searchTermState }) => {
    const [posts, setPosts] = useState([])
    const [filteredPosts, setPostList]= useState([])
    const [topics, setTopics] = useState([])
    const navigate = useNavigate()
    const localReconnectUser = localStorage.getItem("reconnect_user")
    const reconnectUserObject = JSON.parse(localReconnectUser)
    



    useEffect(() => {
        fetch(`http://localhost:8088/topics`)
        .then(response => response.json())
        .then((topicsArray) => {
            setTopics(topicsArray)
        })
        
    },
    [] // When this array is empty, you are observing initial component state
        )
    
   

 
    useEffect(
        () => {
            fetch('http://localhost:8088/posts?_expand=topic')
            .then(response => response.json())
            .then((ticketArray) => {
                setPosts(ticketArray)
                return ticketArray
                
            }) .then((ticketArray) => {
                const copyFilter = ticketArray.filter((element) => {return element.isApproved === true && element.isPost === false} )
                setPostList(copyFilter)
            })
        },
    [] 
)

   
    return <>


    <h1>Community Resources</h1>
    <fieldset>
            <div className="form-group">
            <select onChange={(evt) => {
                
                let topicId = parseInt(evt.target.value) 
                if (topicId > 0 ) {
                    const copyFilter = posts.filter((element) => {return element.topicId === topicId} )
                    setPostList(copyFilter)

                } else {
                    const copyFilter = posts.filter((element) => {return element.isApproved === true} )
                    setPostList(copyFilter) 

                }
            }}>
                <option value={0}>Show All</option>
                {topics.map((topic) =>
                <option key={`topicType--${topic.id}`} value={topic.id}>{topic.name}</option>
                )
                }
            </select>
        </div>
        </fieldset>

        <article className='posts'>
            {
                filteredPosts.map(
                    (post) => <Resources key={`post---${post.id}`}
                    post={post}
                    currentUser={reconnectUserObject}
                    setPosts={setPosts}
                    setPostList={setPostList}
                    />
                    
                )
            }
        </article>
        </>
}