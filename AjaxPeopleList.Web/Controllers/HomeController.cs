using AjaxPeopleList.Data;
using AjaxPeopleList.Web.Models;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

namespace AjaxPeopleList.Web.Controllers
{
    public class HomeController : Controller
    {
        private string _connectionString = @"Data Source=.\sqlexpress;Initial Catalog=PeopleDB;Integrated Security=true;";
        public IActionResult Index()
        {
            return View();
        }
        public IActionResult GetPeople()
        {
            var repo = new PeopleRepository(_connectionString);
            List<Person> people = repo.GetAll();
            return Json(people);
        }

        [HttpPost]
        public void AddPerson(Person person)
        {
            var repo = new PeopleRepository(_connectionString);
            repo.Add(person);
        }
        [HttpPost]
        public void DeletePerson(int id)
        {
            var repo = new PeopleRepository(_connectionString);
            repo.Delete(id);
        }
        public IActionResult GetPersonToEdit(int id)
        {
            var repo = new PeopleRepository(_connectionString);
            var person = repo.GetPersonById(id);
            return Json(person);
        }
        [HttpPost]
        public void UpdatePerson(Person person)
        {
            var repo = new PeopleRepository(_connectionString);
            repo.Update(person);
        }
    }
}