const express = require('express')

const { userAuth } = require('../Middleware/userAuth')
const { sendFriendRequest, acceptfriendrequest, rejectFriendRequest, friendList, removeFriend, getReceivedFriendRequests, getSentFriendRequests, cancelSendFriendRequest, searchUsers, suggestFriends, suggestUsingHobbies } = require('../Controller/friendBookController')
const router = express.Router()
router.get('/api/v1/friendbook/sendfriendrequest/:friendid',userAuth,sendFriendRequest)
router.get('/api/v1/friendbook/friendlist/:id',userAuth,friendList)

router.get('/api/v1/friendbook/acceptfriendrequest/:friendid',userAuth,acceptfriendrequest)
router.get('/api/v1/friendbook/rejectfriendrequest/:friendid',userAuth,rejectFriendRequest)
router.delete('/api/v1/friendbook/removefriend/:friendid',userAuth,removeFriend)
router.get('/api/v1/friendbook/getreceivedfriendlist',userAuth,getReceivedFriendRequests)
router.get('/api/v1/friendbook/getsendrequestfriendlist',userAuth,getSentFriendRequests)
router.post('/api/v1/friendbook/cancelsendrequest/:friendid',userAuth,cancelSendFriendRequest)
router.get('/api/v1/friendbook/suggestusersusingfriends',userAuth,suggestFriends)
router.get('/api/v1/friendbook/suggestuserusinghobbies',userAuth,suggestUsingHobbies)

router.get('/api/v1/friendbook/users/search',searchUsers)



module.exports = router