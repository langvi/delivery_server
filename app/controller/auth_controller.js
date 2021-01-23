const jwtHelper = require("../helper/jwt_helper");
const db = require("../models");
const User = db.User;
const bcrypt = require('bcrypt');
const accessTokenLife = process.env.ACCESS_TOKEN_LIFE || "30d";
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || "access-token-secret";
const refreshTokenLife = process.env.REFRESH_TOKEN_LIFE || "3650d";
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET || "refresh-token-secret";
let login = async (req, res) => {
    try {
        var data = await User.findOne().where('accountName').equals(req.body.accountName);
        if (!data) {
            res.send({
                message: 'Tài khoản không tồn tại'
            });
        } else {
            const user1 = {
                accountName: req.body.accountName,
                password: req.body.password,
            };
            const accessToken = await jwtHelper.generateToken(user1, accessTokenSecret, accessTokenLife);

            const refreshToken = await jwtHelper.generateToken(user1, refreshTokenSecret, refreshTokenLife);
            // var salt = bcrypt.genSaltSync(10);
            // var hash = bcrypt.hashSync(req.body.password, salt);
            var isPassTrue = await bcrypt.compare(req.body.password, data.password);
            if (!isPassTrue) {
                res.send({
                    message: 'Mật khẩu sai',
                    isSuccess: false,
                    data: null
                });
            }
            return res.status(200).json({
                message: 'Thành công',
                isSuccess: true,
                data: accessToken
            });


        }

    } catch (error) {
        // res.send({
        //     message: 'Lỗi',
        //     isSuccess: false,
        //     data: null
        // }).status(500);
        console.log('error');
    }
}
let refreshToken = async (req, res) => {
    // User gửi mã refresh token kèm theo trong body
    const refreshTokenFromClient = req.body.refreshToken;

    if (refreshTokenFromClient && (tokenList[refreshTokenFromClient])) {
        try {
            const decoded = await jwtHelper.verifyToken(refreshTokenFromClient, refreshTokenSecret);
            const userFakeData = decoded.data;
            const accessToken = await jwtHelper.generateToken(userFakeData, accessTokenSecret, accessTokenLife);
            // gửi token mới về cho người dùng
            return res.status(200).json({ accessToken });
        } catch (error) {
            res.status(403).json({
                message: 'Invalid refresh token.',
            });
        }
    } else {
        // Không tìm thấy token trong request
        return res.status(403).send({
            message: 'No token provided.',
        });
    }
};
module.exports = {
    login: login,
    refreshToken: refreshToken,
}