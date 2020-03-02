using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TesteWilliamDantas.Models;

namespace TesteWilliamDantas.Controllers
{
    public class HomeController : Controller
    {
        EmpresaDB empresa = new EmpresaDB();
        FornecedorDB fornecedor = new FornecedorDB();
        
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult ListEmpresas()
        {
            return Json(empresa.ListAll(), JsonRequestBehavior.AllowGet);
        }

        public JsonResult AddEmpresa(Empresa emp)
        {
            return Json(empresa.Add(emp), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetEmpresa(int ID)
        {
            var Emp = empresa.ListAll().Find(x => x.ID.Equals(ID));
            return Json(Emp, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetFornec(int ID)
        {
            var EmpFor = fornecedor.ListAll().Find(x => x.ID.Equals(ID));
            return Json(EmpFor, JsonRequestBehavior.AllowGet);
        }
        public JsonResult DeleteEmpresa(int ID)
        {
            return Json(empresa.Delete(ID), JsonRequestBehavior.AllowGet);
        }
        public JsonResult AlteraEmpresa(Empresa emp)
        {
            return Json(empresa.Update(emp), JsonRequestBehavior.AllowGet);

        }
        public ActionResult Empresa()
        {
            ViewBag.Message = "Página cadastro de empresas";
            ViewBag.Fornecedores = new SelectList(
           fornecedor.ListAll(),
           "ID",
           "Nome"
           );
            ViewBag.FornecedoresDetalhes = new SelectList(fornecedor.ListAll(),"ID","DataNascimento");
            return View();
        }

        public ActionResult Fornecedor()
        {
            ViewBag.Message = "Página cadastro fornecedores";
       
            return View();
        }
        public JsonResult ListFornecedores()
        {
            return Json(fornecedor.ListAll(), JsonRequestBehavior.AllowGet);
        }
        public JsonResult AddFornecedor(Fornecedor fornec)
        {
            return Json(fornecedor.AdicionaFornecedor(fornec), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetFornecedor(int ID)
        {
            var Fornec = fornecedor.ListAll().Find(x => x.ID.Equals(ID));
            return Json(Fornec, JsonRequestBehavior.AllowGet);
        }
        public JsonResult DeleteFornecedor(int ID)
        {
            return Json(fornecedor.Delete(ID), JsonRequestBehavior.AllowGet);
        }
        public JsonResult AlteraFornecedor(Fornecedor fornec)
        {
            return Json(fornecedor.Update(fornec), JsonRequestBehavior.AllowGet);

        }
        public JsonResult AddEmpXFor(EmpXFor empFor)
        {
            return Json(empresa.AddEmpXFor(empFor), JsonRequestBehavior.AllowGet);
        }
        public JsonResult FornecedorEmpresa(int ID)
        {
            return Json(empresa.ListFornecedorEmpresa(ID), JsonRequestBehavior.AllowGet);
        }
    }
}