import { Outlet, Route, Routes } from "react-router-dom"
import { ContributeForm } from "../contribute/ContributeForm"
import { Home } from "../home/Home"
import { Learning } from "../learning/Learning"
import { EditForm } from "../posts/PostEdit"
import { PostList } from "../posts/PostList"
import { ResourceList } from "../posts/ResourceList"





export const CustomerViews = () => {
	return (
        <Routes>
            <Route path="/" element={
                <>
                   

                    <Outlet />
                </>
            }>
                <Route path="home" element={ < Home />}/>

                <Route path="resources" element={ < ResourceList />}/>

                <Route path="contribute" element={ < ContributeForm />}/>

                <Route path="posts" element={ < PostList />}/>
                
                <Route path="/posts/postEdit/:postId" element={ < EditForm />}/>

                <Route path="learning" element={ <Learning /> } />

            </Route>
        </Routes>
    )
}

