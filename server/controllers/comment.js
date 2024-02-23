import { db } from "../connect.js";
import Jwt from "jsonwebtoken";
import moment from "moment";

export const getComments = (req, res) => {
    const q = `SELECT c.*, u.id AS userId, name, profilePic FROM comments AS c JOIN users AS u ON (u.id = c.userId)
        WHERE c.postId = ? ORDER BY c.createdAt DESC`;

    db.query(q, [req.qeury.postId], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data);
    });
};

export const addComment = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("신분인증을 하시오");

    Jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("토큰을 잃어버렸소");

        const q = "INSERT INTO comments(`desc`, `createdAt`, `userId`, `postId`) VALUES (?)";
        const values = [
            req.body.desc,
            moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            userInfo.id,
            req.body.postId
        ];

        db.query(q, [values], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("답글을 생성하였소");
        });
    });
};

export const deleteComment = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("인증되지 않았소");

    Jwt.verify(token, "jwtkey", (err, userInfo) => {
        if (err) return res.status(403).json("토큰을 잃어버렸소");

        const commentId = req.params.id;
        const q = "DELETE FROM comments WHERE `id` = ? AND `userId` = ?";

        db.query(q, [commentId, userInfo.id], (err, data) => {
            if (err) return res.status(500).json(err);
            if (data.affectedRows > 0) return res.json("답글이 삭제되었소");
            return res.status(403).json("백성이 작성한 답글만 삭제할 수 있소");
        });
    });
};