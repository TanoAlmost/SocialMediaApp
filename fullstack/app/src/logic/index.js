import registerUser from './registerUser'
import loginUser from './loginUser'
import logoutUser from './logoutUser'
import retrieveUser from './retrieveUser'
import changeUserEmail from './changeUserEmail'
import changeUserPassword from './changeUserPassword'
import isUserLoggedIn from './isUserLoggedIn'

import publishPost from './publishPost'
import retrieveFavPosts from './retrieveFavPosts'
import retrievePosts from './retrievePosts'
import retrieveUserPosts from './retrieveUserPosts'
import toggleFavPost from './toggleFavPost'
import toggleLikePost from './toggleLikePost'
import updatePostText from './updatePostText'
import deletePost from './deletePost'
import deleteUser from './deleteUser'


const logic = {
    registerUser,
    loginUser,
    logoutUser,
    retrieveUser,
    changeUserEmail,
    changeUserPassword,
    isUserLoggedIn,
    deleteUser,

    publishPost,
    retrieveFavPosts,
    retrievePosts,
    retrieveUserPosts,
    toggleFavPost,
    toggleLikePost,
    updatePostText,
    deletePost,

}

export default logic

