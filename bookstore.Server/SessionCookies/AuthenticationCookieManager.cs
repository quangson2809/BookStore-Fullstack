﻿using bookstore.Server.Services.implementations;
using bookstore.Server.Entities;
using System.Security.Claims;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication;
namespace bookstore.Server.SessionCookies
{
    public class AuthenticationCookieManager 
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        public AuthenticationCookieManager(IHttpContextAccessor httpContextAccessor) { 
            _httpContextAccessor = httpContextAccessor;
        }

        public async Task Set(User user)
        {
            var claims = new List<Claim>()
            {
                new Claim(ClaimTypes.Name, user.FirstName+user.LastName),
                new Claim(ClaimTypes.Role, user.Role.RoleName)
            };

            var claimsIdentity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);
            var claimsPrincipal = new ClaimsPrincipal(claimsIdentity);

            await _httpContextAccessor.HttpContext.SignInAsync(
                CookieAuthenticationDefaults.AuthenticationScheme,
                claimsPrincipal
                );
            Console.WriteLine("===============================set cookie " + user.FirstName + ":" + user.Role.RoleName);

        }
        public int Get()
        {
            throw new NotImplementedException();
        }
        public async void Clear()
        {
            await _httpContextAccessor.HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            Console.WriteLine("===============================clear cookie done!");
        }
    }
}
