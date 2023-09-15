const express = require('express');
const router = express.Router();
const { Reply } = require('../../models');

router.get('/', async (req, res) => {
    try {
        const replyData = await Reply.findAll();
        const replies = replyData.map((reply) => reply.get({ plain: true }));
        res.json(replies);
    } catch (err) {
        res.status(500).json(err);
    }
});


// Route to create a new reply for a reply
router.post('/:post_id', async (req, res) => {
    // console.log(req.body);   
    try {
        const newReply = await Reply.create({
            replies_content: req.body.replies_content,
            user_id: req.body.user_id,
            // user_id: req.session.userId, // Assuming you have user authentication
            post_id: req.params.post_id
        });
        res.status(201).json(newReply);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to create a new reply' });
    }
});

// Route to update a reply
router.put('/:id', async (req, res) => {
    try {
        const updatedReply = await Reply.update(
            {
                replies_content: req.body.replies_content,
            },
            {
                where: {
                    id: req.params.id,
                    // user_id: req.session.userId, // Ensure the user owns the post
                },
            }
        );

        if (updatedReply[0] === 0) {
            res.status(404).json({ error: 'Reply not found or unauthorized' });
        } else {
            res.status(200).json(updatedReply);
        }        
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to update the reply' });
    }
});

// Route to delete a reply
router.delete('/:id', async (req, res) => {
    try {
        const deletedReply = await Reply.destroy({
            where: {
                id: req.params.id,
                // user_id: req.session.userId, // Ensure the user owns the reply
            },
        });

        if (!deletedReply) {
            res.status(404).json({ error: 'Reply not found or unauthorized' });
        } else {
            res.status(204).end();
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to delete the reply' });
    }
});

module.exports = router;