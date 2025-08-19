using EmailOtpApi.Services;
using Microsoft.AspNetCore.Mvc;

namespace EmailOtpApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OtpController : ControllerBase
    {
        private readonly OtpService _otpService;

        public OtpController(OtpService otpService)
        {
            _otpService = otpService;
        }
        [HttpPost("send-otp")]
        public IActionResult SendOtp([FromBody] string email)
        {
            String otp = _otpService.SendOtp(email);
            Console.WriteLine(otp);
            if (!"0".Equals(otp))
            {
                return Ok(otp);
            }

            return StatusCode(500, "Failed to send OTP.");
        }
        [HttpPost("send-Email")]
        public IActionResult SendEmail([FromBody] EmailBody request)
        { 
            if (_otpService.SendEmail(request.RecipientEmail, request.Subject, request.Body))
            {
                return Ok("Email sent successfully.");
            }

            return StatusCode(500, "Failed to send OTP.");
        }
    }

    public class EmailBody
    {
        public string RecipientEmail { get; set; }
        public string Subject { get; set; }
        public string Body { get; set; }
    } 
}
