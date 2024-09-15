
const User = require('../Schema/userSchema')

const sendFriendRequest = async(req,res)=>{

   const friendid = req.params.friendid
   const senderid = req.user.id
   console.log(friendid)
   console.log(senderid)
  
   const user = await User.findById(req.user.id)
   const friend = await User.findOne({_id:friendid})
  
//    console.log(friend)
   if(!user || !friend){
    return res.status(404).json({message:'User not found'})
    }
    if(user.friendRequests.includes(friendid)){
        return res.status(400).json({message:'You have already send request'})
        }
        if(friend.receivedFriendRequests.includes(senderid)){
            return res.status(400).json({message:'You have already received request'})
            }
            user.friendRequests.push(friendid)
            friend.receivedFriendRequests.push(senderid)
            await user.save()
            await friend.save()
            res.status(200).json({message:'Friend request sent successfully'})
  

}

const acceptfriendrequest = async(req,res)=>{
    try {
        const  id  = req.user._id; // The user accepting the friend request
        const requesterId  = req.params.friendid; // The user who sent the friend request
    
        // Check if both users exist
        const user = await User.findById(id);
        // console.log(user)
       
        const requester = await User.findById(requesterId);

        //  console.log(requester)
    
        if (!user || !requester) {
          return res.status(404).json({ message: 'User not found' });
        }
    
        // Check if the requester is in the receivedFriendRequests array
        if (!user.receivedFriendRequests.includes(requesterId)) {
          return res.status(400).json({ message: 'Friend request not found' });
        }
    
        // Add each other to their friend lists
        user.friendlist.push(requesterId);
        requester.friendlist.push(id);
    
        // Remove the friend request from both users
        user.receivedFriendRequests = user.receivedFriendRequests.filter(
          request => request.toString() !== requesterId
        );

     
        requester.friendRequests = requester.friendRequests.filter(
          request => request.toString() !== id.toString()
        );

     
        // Save both users
        await user.save();
        await requester.save();
    
        return res.status(200).json({ message: 'Friend request accepted successfully', friends: user.friendlist });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
      }
}



const rejectFriendRequest = async (req, res) => {
    try {
      const id  = req.user._id; // The user rejecting the friend request
      const  requesterId  = req.params.friendid; // The user who sent the friend request
  
      // Check if both users exist
      const user = await User.findById(id);
      const requester = await User.findById(requesterId);
  
      if (!user || !requester) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Check if the friend request exists in the receivedFriendRequests array
      if (!user.receivedFriendRequests.includes(requesterId)) {
        return res.status(400).json({ message: 'Friend request not found' });
      }
  
      // Remove the friend request from the user's receivedFriendRequests
      user.receivedFriendRequests = user.receivedFriendRequests.filter(
        request => request.toString() !== requesterId
      );
  
      // Remove the request from the requester's sent friend requests
      requester.friendRequests = requester.friendRequests.filter(
        request => request.toString() !== id.toString()
      );
  
      // Save both users
      await user.save();
      await requester.save();
  
      return res.status(200).json({ message: 'Friend request rejected successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server error' });
    }
  };


  const friendList = async (req, res) => {
    try {
      const { id } = req.params; // The user's ID
      const { query } = req.query; // The search query from the request
  
      // Find the user and populate the friendlist with friend details
      const user = await User.findById(id);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // If no query is provided, return the full friendlist
      let friends = user.friendlist;
  
      if (query) {
        // Search for friends by username, name, or phoneno
        friends = await User.find({
          _id: { $in: user.friendlist },
          $or: [
            { username: { $regex: query, $options: 'i' } },
            { name: { $regex: query, $options: 'i' } },
            { phoneno: { $regex: query, $options: 'i' } },
          ],
        }).select('username avatar email phoneno');
      } else {
        // Populate the friendlist with full details if no query is present
        friends = await User.find({ _id: { $in: user.friendlist } })
          .select('username avatar email phoneno');
      }
  
      return res.status(200).json({ friends });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server error' });
    }
  };


  const removeFriend =async (req,res)=>{
    try {
        const  id  = req.user.id; // The user removing a friend
        const  friendId  = req.params.friendid; // The friend to be removed
    
        // Check if both users exist
        const user = await User.findById(id);
        const friend = await User.findById(friendId);
    
        if (!user || !friend) {
          return res.status(404).json({ message: 'User not found' });
        }
    
        // Check if they are actually friends
        if (!user.friendlist.includes(friendId) || !friend.friendlist.includes(id)) {
          return res.status(400).json({ message: 'Users are not friends' });
        }
    
        // Remove the friendId from the user's friendlist
        user.friendlist = user.friendlist.filter(
          friend => friend.toString() !== friendId
        );
    
        // Remove the id from the friend's friendlist
        friend.friendlist = friend.friendlist.filter(
          friend => friend.toString() !== id
        );
    
        // Save both users
        await user.save();
        await friend.save();
    
        return res.status(200).json({ message: 'Friend removed successfully' });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
      }
  }
  

  const getReceivedFriendRequests = async (req, res) => {
    try {
      const id  = req.user.id; // The user's ID
  
      // Find the user and populate the receivedFriendRequests array
      const user = await User.findById(id).populate('receivedFriendRequests', 'username avatar email');
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      return res.status(200).json({
        receivedRequests: user.receivedFriendRequests,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server error' });
    }
  };

  const getSentFriendRequests = async (req, res) => {
    try {
      const  id  = req.user.id; // The user's ID
  
      // Find the user and populate the friendRequests (outgoing requests)
      const user = await User.findById(id).populate('friendRequests', 'username avatar email');
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      return res.status(200).json({
        sentRequests: user.friendRequests,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server error' });
    }
  };

  const cancelSendFriendRequest = async (req, res) => {
    try {
      const id  = req.user.id; // The user's ID who wants to cancel the request
      const  friendId  = req.params.friendid; // The friend request to be canceled (the recipient's ID)
  
      // Find the user and the friend
      const user = await User.findById(id);
      const friend = await User.findById(friendId);
  
      if (!user || !friend) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Check if the friendId is in the user's friendRequests (sent requests)
      if (!user.friendRequests.includes(friendId)) {
        return res.status(400).json({ message: 'Friend request not found' });
      }
  
      // Remove the friendId from the user's friendRequests
      user.friendRequests = user.friendRequests.filter(
        request => request.toString() !== friendId
      );
  
      // Remove the user's ID from the friend's receivedFriendRequests
      friend.receivedFriendRequests = friend.receivedFriendRequests.filter(
        request => request.toString() !== id
      );
  
      // Save both users
      await user.save();
      await friend.save();
  
      return res.status(200).json({ message: 'Friend request canceled successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server error' });
    }
  };
  

  const searchUsers = async (req, res) => {
    try {
      const { query } = req.query; // The search query from the request
  
      if (!query) {
        return res.status(400).json({ message: 'Query parameter is required' });
      }
  
      // Search for users whose username, name, or phoneno contains the query (case-insensitive)
      const users = await User.find({
        $or: [
          { username: { $regex: query, $options: 'i' } }, // Search by username
          { name: { $regex: query, $options: 'i' } },     // Search by name
          { phoneno: { $regex: query, $options: 'i' } },  // Search by phoneno
        ],
      }).select('username name phoneno avatar email'); // Select the fields you want to return
  
      return res.status(200).json({ users });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server error' });
    }
  };


  const suggestFriends = async (req, res) => {
    try {
      const  id  = req.user.id; 
      const limit = parseInt(req.query.limit) || 10; 
  
      // Find the user and populate the friendlist
      const user = await User.findById(id).populate('friendlist', 'friendlist');
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Get the list of friends' IDs
      const friendsIds = user.friendlist.map(friend => friend._id);
  
      // Find the friends of the user's friends
      const friendsOfFriends = await User.find({
        _id: { $in: friendsIds },
      }).populate('friendlist', 'username avatar email phoneno');
  
  
      const friendsOfFriendsIds = friendsOfFriends.flatMap(friend => friend.friendlist);
  
     
      const suggestedFriends = await User.find({
        _id: { $in: friendsOfFriendsIds },
        _id: { $ne: id }, // Exclude the current user
        _id: { $nin: friendsIds } // Exclude existing friends
      }).select('username avatar email phoneno')
        .limit(limit); 
  
      return res.status(200).json({ suggestions: suggestedFriends });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server error' });
    }
  };
  
  const suggestUsingHobbies = async (req, res) => {
    try {
      const  id  = req.user.id; // The user's ID
      const limit =   10; 
  
      // Find the user and populate their hobbies
      const user = await User.findById(id).select('hobbies friendlist');
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Get the list of friends' IDs
      const friendsIds = user.friendlist;
  
      // Find the friends of the user's friends, excluding the user and existing friends
      const friendsOfFriends = await User.find({
        _id: { $in: friendsIds },
      }).populate('friendlist', 'username avatar email phoneno hobbies');
  
      // Extract the IDs of the friends of friends and their hobbies
      const friendsOfFriendsIds = friendsOfFriends.flatMap(friend => friend.friendlist.map(f => ({
        id: f._id,
        hobbies: f.hobbies
      })));
  
      // Remove the current user's ID and existing friends' IDs from the suggestions
      const suggestedFriends = await User.find({
        _id: { $in: friendsOfFriendsIds.map(friend => friend.id) },
        _id: { $ne: id }, // Exclude the current user
        _id: { $nin: friendsIds } // Exclude existing friends
      }).select('username avatar email phoneno hobbies')
        .lean(); // Convert to plain JavaScript object
  
      // Filter the suggested friends to include only those with at least one hobby in common
      const filteredSuggestions = suggestedFriends.filter(suggestedFriend => 
        suggestedFriend.hobbies.some(hobby => user.hobbies.includes(hobby))
      );
  
      // Limit the number of suggestions
      const limitedSuggestions = filteredSuggestions.slice(0, limit);
  
      return res.status(200).json({ suggestions: limitedSuggestions });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server error' });
    }
  };
  module.exports = { searchUsers };
module.exports = {sendFriendRequest,acceptfriendrequest,rejectFriendRequest,friendList,removeFriend,getReceivedFriendRequests,getSentFriendRequests,cancelSendFriendRequest,searchUsers,suggestFriends,suggestUsingHobbies}