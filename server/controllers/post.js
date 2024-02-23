import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import moment from "moment";

export const getPosts = (req, res) => {
    const userId = req.query.userId;
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("신분인증을 하시오");

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).josn("토큰을 잃어버렸소");

        console.log(userId);

        const q =
        userId !== "undefined"
            ? `SELECT p.*, u.id AS userId, name, profilePic FROM posts AS p JOIN users AS u ON (u.id = p.userId) WHERE p.userId = ? ORDER BY p.createdAt DESC`
            : `SELECT p.*, u.id AS userId, name, profilePic FROM posts AS p JOIN users AS u ON (u.id = p.userId)
        LEFT JOIN relationships AS r ON (p.userId = r.followedUserId) WHERE r.followerUserId= ? OR p.userId =?
        ORDER BY p.createdAt DESC`;

        const values = 
            userId !== "undefined" ? [userId] : [userInfo.indexOf, userInfo.id];

        db.query(q, values, (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json(data);
        });
    });
};

export const addPost = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("신분인증을 하시오");

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("토큰을 잃어버렸소");

        const q =
            "INSERT INTO posts(`desc`, `img`, `createdAt`, `userid`) VALUES (?)";
        const values = [
            req.body.desc,
            req.body.img,
            moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            userInfo.id,
        ];

        db.query(q, [values], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("게시물을 생성하였소");
        });
    });
};

export const deletePost = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("신분인증을 하시오");

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("토큰을 잃어버렸소");

        const q =
            "DELETE FROM posts WHERE `id`=? AND `userId` = ?";

        db.query(q, [req.params.id, userInfo.id], (err, data) => {
            if (err) return res.status(500).json(err);
            if (data.affectedRows>0) return res.status(200).json("게시물을 삭제하였소");
            return res.status(403).json("백성이 작성한 게시물만 삭제할 수 있소")
        });
    });
};