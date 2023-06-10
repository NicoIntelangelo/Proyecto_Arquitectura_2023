﻿using Agenda_Back_Tup1.Entities;
using Agenda_Back_Tup1.Models.DTO;
using Agenda_Back_Tup1.Repository.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.OpenApi.Any;
using System.Security.Claims;

namespace Agenda_Back_Tup1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]//******* para que tengamos que tener un token valido para acceder
    public class ContactoController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IContactoRepository _contactoRepository;
        private readonly IAgendaRepository _agendaRepository;
        private readonly IAgendaUserRepository _agendaUserRepository;

        public ContactoController(IMapper mapper, IContactoRepository contactoRepository, IAgendaRepository agendaRepository, IAgendaUserRepository agendaUserRepository) //inyeccion del automapper
        {
            _mapper = mapper;
            _contactoRepository = contactoRepository;
            _agendaRepository = agendaRepository;
            _agendaUserRepository = agendaUserRepository;
        }

        
        [HttpGet("agenda/{agendaId}")]
        public IActionResult GetAgenda(int agendaId)
        {
            try
            {
                var listaContactos = _contactoRepository.GetListContactos(agendaId);

                var listaContactosDTO = _mapper.Map<IEnumerable<ContactoDTO>>(listaContactos);

                return Ok(listaContactosDTO);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{id}")]//getContact/
        public IActionResult GetContact(int id)
        {
            try 
            { 
          
                 var contacto = _contactoRepository.GetContacto(id); 

                 if (contacto == null)
                 {
                     return NotFound();
                 }

                 var contactoDto = _mapper.Map<ContactoDTO>(contacto); 

                 return Ok(contactoDto);
           
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }


        }


        [HttpPost] //("newContact")
        public IActionResult CreateContact(ContactoDTO contactoDto)
        {
            try
            {

                var contacto = _mapper.Map<Contacto>(contactoDto);

                int userId = Int32.Parse(HttpContext.User.Claims.SingleOrDefault(c => c.Type == ClaimTypes.NameIdentifier).Value); // toma el id del usuario desde el token

                var listAgenda = _agendaUserRepository.GetAgendasUser(userId);


                foreach (var agendaId in listAgenda)
                {
                    if (contacto.AgendaId == agendaId.AgendaId)
                    {
                        var contactoCreated = _contactoRepository.AddContacto(contacto);

                        var contactoItemDto = _mapper.Map<ContactoDTO>(contactoCreated);

                        return Created("Created", contactoItemDto);
                    }
                }

                return Unauthorized(); //"Id de agenda Inexistente"

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpDelete("{id}")]//deleteContact/
        public IActionResult DeleteContact(int id)
        {
            try
            {
                int userId = Int32.Parse(HttpContext.User.Claims.SingleOrDefault(c => c.Type == ClaimTypes.NameIdentifier).Value); // toma el id del usuario desde el token

                var listAgenda = _agendaUserRepository.GetAgendasUser(userId);

                var contacto = _contactoRepository.GetContacto(id);
                
                if (contacto == null)
                {
                    return NotFound();
                }
                
                foreach(var agendaUser in listAgenda)
                {
                    if(agendaUser.AgendaId == contacto.AgendaId)
                    {
                        _contactoRepository.DeleteContact(contacto);

                        return NoContent();
                    }
                }
                return Unauthorized();
                

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

        [HttpPut("{id}")] //editContact/
        public IActionResult EditContact(int id, ContactoDTO contactoDTO)
        {
            try
            {

                var contacto = _mapper.Map<Contacto>(contactoDTO);

                if (id != contacto.Id)
                {
                    return NotFound();
                }

                var contactoItem = _contactoRepository.GetContacto(id);

                if (contactoItem == null)
                {
                    return NotFound();
                }

                _contactoRepository.UpdateContact(contacto);

                var contactoModificado = _contactoRepository.GetContacto(id);

                var contactoModificadoDto = _mapper.Map<ContactoDTO>(contactoModificado);

                return Ok(contactoModificadoDto);

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }


        }

    }

}
