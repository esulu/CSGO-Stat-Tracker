const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

router.get('/:id', async (req, res) => { 
    try {
        const headers = {
            'TRN-Api-Key': process.env.TRACKER_API_KEY
        }

        const { userId } = req.params;

        const response = await fetch(
            `${process.env.TRACKER_API_URL}/profile/steam/${userId}`, {
            headers
        });

        const data = await response.json();

        if (data.errors && data.errors.length > 0) {
            return res.status(404).json({
                message: 'Profile not found'
            });
        }

        res.json(data);

    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'Internal Server Error'
        });
    }
});

module.exports = router;