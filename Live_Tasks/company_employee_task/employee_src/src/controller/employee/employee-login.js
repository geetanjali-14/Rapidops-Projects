module.exports = function makeEmployeeLogin({
  employeeLogin,
  insertAccessToken,
  geoip,
  employeeIdByEmployeeEmail,
}) {
  return async function createEmployeeLogin(req, res) {
    console.log("Entering employee login Controller with input as ");
    try {
      const {employeeEmail} = req.body;
      const {password} = req.body;
      const deviceName = req.device.type;
      const browserName = req.useragent.browser;

      // const ipAddressList = [
      //   "103.238.107.135",
      //   "223.196.172.139",
      //   "106.198.211.97",
      //   "43.250.158.185",
      //   "123.201.3.127",
      //   "219.91.163.223",
      //   "103.217.84.112",
      //   "103.217.84.112",
      //   "223.196.172.139",
      //   "103.238.107.135",
      // ];

      const ipAddress = "103.238.107.135";
      const geoInfo = geoip.lookup(ipAddress);
      console.log(geoInfo);
      const { city, region, country } = geoInfo;
      const state = region;

      const result = await employeeLogin({
        employeeEmail,
        password,
      });
      const employeeId = await employeeIdByEmployeeEmail({ employeeEmail });
      
      const accessToken = result.result.accessToken;
      const accessTokenDetails = result.result;
      console.info("Login Employee Controller with accessToken ");

      await insertAccessToken({
        employeeId,
        accessTokenDetails,
        ipAddress,
        city,
        state,
        country,
        deviceName,
        browserName,
      });

      res.status(200).json({
        status: "Success",
        message: "Employee Logged In",
        accessToken: accessToken,
      });
    } catch (error) {
      res.status(500).json({
        status: "Error",
        message: error.message,
      });
    }
  };
};
