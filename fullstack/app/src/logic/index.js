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
import toggleFavPost from './toggleFavPost'
import toggleLikePost from './toggleLikePost'
import updatePostText from './updatePostText'

const logic = {
    registerUser,
    loginUser,
    logoutUser,
    retrieveUser,
    changeUserEmail,
    changeUserPassword,
    isUserLoggedIn,

    publishPost,
    retrieveFavPosts,
    retrievePosts,
    toggleFavPost,
    toggleLikePost,
    updatePostText
}

export default logic

