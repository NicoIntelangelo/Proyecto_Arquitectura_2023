﻿using Agenda_Back_Tup1.Entities;
using Agenda_Back_Tup1.Models.DTO;
using Agenda_Back_Tup1.Repository.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Agenda_Back_Tup1.Controllers
{
    [Route("api/authentication")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly IConfiguration _config;
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        

        public AuthenticationController(IConfiguration config, IUserRepository userRepository, IMapper mapper)
        {
            _config = config; 
            this._userRepository = userRepository;
            _mapper = mapper;   

        }

        [HttpPost("authenticate")]
        public ActionResult<string> Autenticar(AuthenticationRequestBody authenticationRequestBody) //Enviamos como parámetro la clase que creamos arriba
        {
            // //Validamos las credenciales
            // var user = _userRepository.ValidateUser(authenticationRequestBody); //Lo primero que hacemos es llamar a una función que valide los parámetros que enviamos.

            // if (user is null) //Si el la función de arriba no devuelve nada es porque los datos son incorrectos, por lo que devolvemos un Unauthorized (un status code 401).
            //     return Unauthorized();

            // //creacion del token
            // var securityPassword = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(_config["Authentication:SecretForKey"])); //Traemos la SecretKey del Json. agregar antes: using Microsoft.IdentityModel.Tokens;

            // var credentials = new SigningCredentials(securityPassword, SecurityAlgorithms.HmacSha256);

            // //Los claims son datos en clave->valor que nos permite guardar data del usuario.
            // var claimsForToken = new List<Claim>();
            // claimsForToken.Add(new Claim("sub", user.Id.ToString())); //"sub" convencion para id de usuario 
            // claimsForToken.Add(new Claim("given_name", user.Nombre)); //convenciones para nombre y apellido
            // claimsForToken.Add(new Claim("family_name", user.Email)); 

            // var jwtSecurityToken = new JwtSecurityToken( //agregar using System.IdentityModel.Tokens.Jwt; Acá es donde se crea el token con toda la data que le pasamos antes.
            //   _config["Authentication:Issuer"],
            //   _config["Authentication:Audience"],
            //   claimsForToken,
            //   DateTime.UtcNow,
            //   DateTime.UtcNow.AddHours(1),
            //   credentials);

            // var tokenToReturn = new JwtSecurityTokenHandler() //Pasamos el token a string
            //     .WriteToken(jwtSecurityToken);
            if(authenticationRequestBody.Email == "arquitectura@gmail.com" & authenticationRequestBody.Password == "arquitectura"){
                return Ok("Pasa rey");
            }

           return BadRequest();
            
        }

        [HttpPost]//("newuser")
        public IActionResult PostUser(UserDTOCreacion userDtoCreacion)
        {
            try
            {
                // var user = _mapper.Map<User>(userDtoCreacion);

                // var usersActivos = _userRepository.GetListUser();

                // foreach(var userActivo in usersActivos)
                // {
                //     if(user.Email == userActivo.Email)
                //     {
                //         return BadRequest("El email ingresado ya es utilizado en una cuenta activa");
                //     }
                // }
                
                // var userItem = _userRepository.AddUser(user);

                // var userItemDto = _mapper.Map<UserDTO>(userItem);

                // return Created("Created", userItemDto); ///*************
                if(userDtoCreacion.Email == "arquitectura@gmail.com"){
                    return Ok();
                }
                return BadRequest();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("userId")]//Test
        public IActionResult GetUserId()
        {
            try
            {
                int userSesionId = Int32.Parse(HttpContext.User.Claims.SingleOrDefault(c => c.Type == ClaimTypes.NameIdentifier).Value);

                return Ok(userSesionId); ///*************
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


    }
}
