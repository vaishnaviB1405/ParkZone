using Microsoft.AspNetCore.Mvc;
using System.Diagnostics.Contracts;
using System.Net;
using System.Net.Mail;
using static System.Net.WebRequestMethods;

namespace EmailOtpApi.Services
{
    public class OtpService
    {
        String senderEmail = "vaishnavibhosale145@gmail.com";
        String senderPassword = "ngxo rdbd azlk fmqk";
        public String SendOtp(string recipientEmail)
        {
            try
            {

                var otp = new Random().Next(1000, 9999).ToString();

                var smtpClient = new SmtpClient("smtp.gmail.com")
                {
                    Port = 587,
                    Credentials = new NetworkCredential(senderEmail, senderPassword),
                    EnableSsl = true,
                };

                var mailMessage = new MailMessage
                {
                    From = new MailAddress(senderEmail),
                    Subject = "Your OTP Code",
                    Body = $"Your OTP is: {otp}",
                    IsBodyHtml = true,
                };

                mailMessage.To.Add(recipientEmail);

                smtpClient.Send(mailMessage);

                Console.WriteLine(otp);
                return otp;
            }
            catch
            {
                return "0";
            }
        }

        internal bool SendEmail(string recipientEmail, string subject, string body)
        {
            try 
            {
                var smtpClient = new SmtpClient("smtp.gmail.com")
                {
                    Port = 587,
                    Credentials = new NetworkCredential(senderEmail, senderPassword),
                    EnableSsl = true,
                };

                var mailMessage = new MailMessage
                {
                    From = new MailAddress(senderEmail),
                    Subject = subject,
                    Body = body,
                    IsBodyHtml = true,
                };

                mailMessage.To.Add(recipientEmail);

                smtpClient.Send(mailMessage);

                return true;
            }
            catch
            {
                return false;
            }
        }
    }
}
