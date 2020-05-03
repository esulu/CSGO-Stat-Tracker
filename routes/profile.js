const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

router.get('/:userId', async (req, res) => { 
    try {

        // Get steam ID from username 
        const username = req.params.userId;

        const steamResponse = await fetch(
            `${process.env.STEAM_API_URL}/?key=${process.env.STEAM_API_KEY}&vanityurl=${username}`, {
        });

        const steamData = await steamResponse.json();
        var userId = steamData.response.steamid;
        
        if (steamData.response.success != 1) { // assume user entered ID instead of username 
            userId = username; 
        }

        // Get user data
        const headers = {
            'TRN-Api-Key': process.env.TRACKER_API_KEY
        }

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
        res.status(500).json({
            message: 'Internal Server Error'
        });
    }
});

module.exports = router;