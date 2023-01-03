import { Outlet, Route, Routes } from "react-router-dom"

import { Home } from "../home/Home"
import { EditForm } from "../posts/PostEdit";

import { PostList } from "../posts/PostList"
import { ResourceList } from "../posts/ResourceList";


import { Reviews } from "../review/Reviews";





export const EmployeeViews = () => {
	return (
        <Routes>
            <Route path="/" element={
                <>
                   

                    <Outlet />
                </>
            }>
                <Route path="/home" element={ < Home />}/>

                <Route path="/review" element={ < Reviews />}/>

                <Route path="/posts" element={ < PostList />}/>

                    <Route path="/resources" element={ < ResourceList />}/>

                    <Route path="/posts/postEdit/:postId" element={ < EditForm />}/>
                


               
            </Route>
        </Routes>
    )
}

