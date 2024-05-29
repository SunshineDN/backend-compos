const fs = require('fs');
const path = require('path');
const mediaFolder = path.join(__dirname,'..' ,'..' ,'public' ,'media');

class Media {
    async getMedia(req, res) {
        fs.readdir(mediaFolder, (err, files) => {
            if (err) {
                console.log(err)
                return res.status(500).json({ error: 'Failed to read media directory' });
            }
            // Filtra apenas imagens e vídeos (extensões podem ser ajustadas conforme necessário)
            const mediaFiles = files.filter(file => /\.(jpg|jpeg|png|gif|mp4|mov|avi)$/.test(file));
            res.json({ files: mediaFiles });
        });
    }

    async sendMedia(req, res) {
        const { filename } = req.params;
        const filePath = path.join(mediaFolder, filename);
        fs.access(filePath, fs.constants.F_OK, err => {
            if (err) {
                return res.status(404).json({ error: 'File not found' });
            }
            res.sendFile(filePath);
        });
    }
}

module.exports = new Media();