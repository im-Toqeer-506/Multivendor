//create Token and saving the cookies
const sendShopToken = (seller, statusCode, res) => {
  const token = seller.getJwtToken();
  //options for cookies
  const options = {
    expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };
  res.status(statusCode).cookie("shop_token", token, options).json({
    success: true,
    seller,
    token,
  });
};
module.exports = sendShopToken;
