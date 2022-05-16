import Home from "../pages"
import Article from "../pages/article"
import Person from "../pages/Person"
import Board from "../pages/board"
import ArticleDetail from "../pages/article/articleDetali"

export const routes=[
    {
        name:'首页',
        path:'/',
        element:<Home></Home>
    },{
        name:'文章列表',
        path:'/article',
        element:<Article></Article>,
        children:[
            {
                path:'detail',
                element:<ArticleDetail></ArticleDetail>
            }
        ]
    },{
        name:'留言板',
        path:'/board',
        element:<Board></Board>
    },{
        name:'个人中心',
        path:'/person',
        element:<Person></Person>
    },
]