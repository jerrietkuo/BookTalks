const router = require('express').Router();
const { Bookshelf, Book, Conversations, Chat, User } = require('../../models');
// Import the custom middleware
const withAuth = require('../../utils/auth')
const { Op } = require('sequelize');

//chat endpoints

router.get('/users', async (req, res) => {
    var userList = [];
    try{
        const response = await User.findAll({
            where: {username: { [Op.ne]: req.session.username}},
            attributes: ['username'],
            raw: true,
        })

        if(!response){
            console.log(response)
            throw new Error('failed to retrieve user list');
        }
        
        userList = await response;

    } catch(err){
        console.log(err);
        res.status(500).json([]);
        return;
    }

    res.status(200).json(userList);
})

router.get('/metadata/:u', async (req, res) => {
    const headerInfo = {
        convoId: {},
        userId: {},
        otherUserId: {},
    }
    const response = await User.findOne({
        where: {username: req.params.u},
        attributes: ['id'],
        raw: true,
    })
    const myResponse = await User.findOne({
        where: {username: req.session.username},
        attributes: ['id'],
        raw: true,
    })

    if(response === null || myResponse === null){
        res.send(500).json(err);
        return;
    }

    headerInfo.userId = myResponse;
    headerInfo.otherUserId = response;

    const conversationsResponse = await Conversations.findOne(
    {
        where: {[Op.or]: [
            {'1stUserId': myResponse.id, userId: response.id},
            {'1stUserId': response.id, userId: myResponse.id}
        ]},
        attributes: ['id'],
        raw: true,
    }
    )

    if(conversationsResponse === null){
        const convoId = await Conversations.create({
            '1stUserId': response.id,
            userId: myResponse.id,
            signal: 0,
        })
        headerInfo.convoId = convoId;
        res.status(200).json(headerInfo);
        return;
    }

    headerInfo.convoId = conversationsResponse;

    res.status(200).json(headerInfo);
})

router.get('/chatLogs/:id', async (req, res) => {
    const response = await Chat.findAll({
        where: {
        conversationId: req.params.id,
        },
        attributes: ['userId', 'chat'],
        raw: true,
    })

    res.status(200).json(response);
})

router.post('/chatLogs', async (req, res) => {
    const response = await Chat.create({
        chat: req.body.chat,
        conversationId: req.body.conversationId,
        userId: req.body.userId,
    });

    try{
        Conversations.update(
        {signal: req.body.userId},
        {where: {id: req.body.conversationId}}
    )} catch(err){
        res.status(500).json('internal service error')
    }

    res.status(200).json('Good');
})

router.get('/signal/:id', async(req, res) => {
    const conversation = await Conversations.findByPk(req.params.id);

    res.status(200).json(conversation);
})

router.post('/signal', async(req, res) => {
    try{
        Conversations.update(
        {signal: 0},
        {where: {id: req.body.conversationId}}
    )} catch(err){
        res.status(500).json('internal service error')
    }

    res.status(200).json('signal sent');
})

module.exports = router;