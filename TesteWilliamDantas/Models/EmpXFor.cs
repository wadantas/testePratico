using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TesteWilliamDantas.Models
{
    public class EmpXFor
    {
        public int IDEmpresa { get; set; }
        public int IDFornecedor { get; set; }
        public string Nome { get; set; }
        public string CNPJ { get; set; }
        public string TipoPessoa { get; set; }
        public string Telefone { get; set; }
    }
}