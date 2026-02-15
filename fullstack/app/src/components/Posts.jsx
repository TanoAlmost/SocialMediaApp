import { useEffect, useState } from 'react'
import Post from './Post'
import { useContext } from '../hooks'

function Posts(props) {
    console.log('Posts')

    const [posts, setPosts] = useState([])

    const context = useContext()

    const refreshPosts = async () => {
        try {
            props.loadPosts((error, posts) => {
                if (error) {
                    console.error('Error al cargar posts:', error);
                    context.handleError(error);
                    return;
                }

                console.log('Posts actualizados desde el servidor:', posts);
                setPosts(posts.slice().reverse());

            });
        } catch (error) {
            console.error('Error inesperado al refrescar posts:', error);
            context.handleError(error);
        }
    };


    useEffect(() => {
        console.log('Posts effect')

        refreshPosts()

        const intervalId = setInterval(() => {
            refreshPosts()
        }, 3000
        ) // cada 3s (ajusta si quieres)

        return () => clearInterval(intervalId)
    }, [props.stamp])


    return <div className="posts">
        {posts.map(post =>

            <Post
                key={post.id}
                post={post}
                onToggleLikeClick={refreshPosts}
                onToggleFavClick={refreshPosts}
                onPostTextUpdate={refreshPosts}
                onDeletePost={refreshPosts} // Nueva prop para eliminar 
                onError={props.onError} />)}

    </div>
}

export default Posts