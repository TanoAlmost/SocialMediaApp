import registerUser from './registerUser.js'
import authenticateUser from './authenticateUser.js'
import retrieveUser from './retrieveUser.js'
import retrieveUserProfile from './retrieveUserProfile.js'
import updateUserProfile from './updateUserProfile.js'
import changeUserEmail from './changeUserEmail.js'
import changeUserPassword from './changeUserPassword.js'
import createPost from './createPost.js'
import retrieveFavPosts from './retrieveFavPosts.js'
import retrievePosts from './retrievePosts.js'
import retrieveUserPosts from './retrieveUserPosts.js'
import toggleFavPost from './toggleFavPost.js'
import toggleLikePost from './toggleLikePost.js'
import deletePost from './deletePost.js'
import updatePostText from './updatePostText.js'
import deleteUser from './deleteUser.js'
import addCommentToPost from './addCommentToPost.js'
import getCommentsFromPost from './getCommentsFromPost.js'

const logic = {
    registerUser,
    authenticateUser,
    retrieveUser,
    retrieveUserProfile,
    updateUserProfile,

    addCommentToPost,
    getCommentsFromPost,



    changeUserEmail,
    changeUserPassword,
    deleteUser,

    createPost,
    retrieveFavPosts,
    retrievePosts,
    retrieveUserPosts,
    toggleFavPost,
    toggleLikePost,
    deletePost,
    updatePostText
}

export default logic