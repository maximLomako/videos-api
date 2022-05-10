"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const error_helper_1 = require("./helpers/error.helper");
const app = (0, express_1.default)();
const port = 3002;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
let videos = [
    { id: 1, title: 'About JS - 01', author: 'it-incubator.eu' },
    { id: 2, title: 'About JS - 02', author: 'it-incubator.eu' },
    { id: 3, title: 'About JS - 03', author: 'it-incubator.eu' },
    { id: 4, title: 'About JS - 04', author: 'it-incubator.eu' },
    { id: 5, title: 'About JS - 05', author: 'it-incubator.eu' },
];
app.get('/videos', (req, res) => {
    res.status(200).send(videos);
});
app.post('/videos', (req, res) => {
    const title = req.body.title;
    if (title) {
        const newVideo = {
            id: +(new Date()),
            title: req.body.title,
            author: 'it-incubator.eu'
        };
        videos.push(newVideo);
        res.status(201).send(newVideo);
    }
    else {
        res.status(404).send({
            "errorsMessages": [
                (0, error_helper_1.getErrorAnswer)('Input title pls', 'title')
            ],
            "resultCode": 1
        });
    }
});
app.get('/videos/:videoId', (req, res) => {
    const id = parseInt(req.params.videoId);
    if (!id) {
        res.sendStatus(404);
        return;
    }
    const video = videos.find((video) => (video === null || video === void 0 ? void 0 : video.id) === id);
    if (video) {
        res.status(200).send(video);
    }
    else {
        res.sendStatus(404);
    }
});
app.put('/videos/:id', (req, res) => {
    const id = +req.params.id;
    const title = req.body.title;
    const video = videos.find((video) => (video === null || video === void 0 ? void 0 : video.id) === id);
    if (typeof title !== "string" && Number.isNaN(id)) {
        res.status(400).send(res.status(404).send({
            "errorsMessages": [
                (0, error_helper_1.getErrorAnswer)('Input title pls', 'title'),
                (0, error_helper_1.getErrorAnswer)('Input id pls', 'id'),
            ],
            "resultCode": 1
        }));
        return;
    }
    if (typeof title !== "string") {
        res.status(400).send(res.status(404).send({
            "errorsMessages": [
                (0, error_helper_1.getErrorAnswer)('Input title pls', 'title')
            ],
            "resultCode": 1
        }));
        return;
    }
    if (Number.isNaN(id)) {
        res.status(400).send(res.status(404).send({
            "errorsMessages": [
                (0, error_helper_1.getErrorAnswer)('Input id pls', 'id')
            ],
            "resultCode": 2
        }));
        return;
    }
    if (video) {
        video.title = title;
        res.sendStatus(204);
    }
    else {
        res.sendStatus(404);
    }
});
app.delete('/videos/:id', (req, res) => {
    const id = +req.params.id;
    const newVideos = videos.filter((video) => video.id !== id);
    if (newVideos.length < videos.length) {
        videos = [...newVideos];
        res.sendStatus(204);
    }
    else {
        res.sendStatus(404);
    }
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
//# sourceMappingURL=index.js.map