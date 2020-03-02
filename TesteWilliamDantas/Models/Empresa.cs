using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TesteWilliamDantas.Models
{
    public class Empresa: IObjetoEmpresa
    {
        public int ID { get; set; }
        public string NomeFantasia { get; set; }
        public string CNPJ { get; set; }
        public string UF { get; set; }
    }
}