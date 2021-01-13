const jwtHelper = require("../helper/jwt_helper");
const db = require("../models");
const User = db.User;
const bcrypt = require('bcrypt');
const accessTokenLife = process.env.ACCESS_TOKEN_LIFE || "30d";
// Mã secretKey này phải được bảo mật tuyệt đối, các bạn có thể lưu vào biến môi trường hoặc file
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || "access-token-secret";
// Thời gian sống của refreshToken
const refreshTokenLife = process.env.REFRESH_TOKEN_LIFE || "3650d";
// Mã secretKey này phải được bảo mật tuyệt đối, các bạn có thể lưu vào biến môi trường hoặc file
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
            // const user2 = new User(
            //     {
            //         accountName: req.body.accountName,
            //         password: hash,
            //     }
            // );
            // await user2.save(user2);
            // userFakeData.save()
            // Lưu lại 2 mã access & Refresh token, với key chính là cái refreshToken để đảm bảo unique và không sợ hacker sửa đổi dữ liệu truyền lên.
            // lưu ý trong dự án thực tế, nên lưu chỗ khác, có thể lưu vào Redis hoặc DB
            // tokenList[refreshToken] = { accessToken, refreshToken };


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
    // debug("tokenList: ", tokenList);

    // Nếu như tồn tại refreshToken truyền lên và nó cũng nằm trong tokenList của chúng ta
    if (refreshTokenFromClient && (tokenList[refreshTokenFromClient])) {
        try {
            // Verify kiểm tra tính hợp lệ của cái refreshToken và lấy dữ liệu giải mã decoded 
            const decoded = await jwtHelper.verifyToken(refreshTokenFromClient, refreshTokenSecret);
            // Thông tin user lúc này các bạn có thể lấy thông qua biến decoded.data
            // có thể mở comment dòng debug bên dưới để xem là rõ nhé.
            // debug("decoded: ", decoded);
            const userFakeData = decoded.data;
            const accessToken = await jwtHelper.generateToken(userFakeData, accessTokenSecret, accessTokenLife);
            // gửi token mới về cho người dùng
            return res.status(200).json({ accessToken });
        } catch (error) {
            // Lưu ý trong dự án thực tế hãy bỏ dòng debug bên dưới, mình để đây để debug lỗi cho các bạn xem thôi
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