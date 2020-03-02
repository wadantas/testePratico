using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TesteWilliamDantas.Models
{
    public interface IObjetoEmpresa
    {
        int ID { get; set; }
        string NomeFantasia { get; set; }
        string CNPJ { get; set; }
        string UF { get; set; }

    }
    public class Fornecedor
    {
        //private IObjetoEmpresa _empresa;
        //public Fornecedor(IObjetoEmpresa obj)
        //{
        //    _empresa = obj;
    
        //}
        public int ID { get; set; }
        public string Nome { get; set; }
        public string TipoPessoa { get; set; }
        public string CNPJ_CPF { get; set; }
        public string RG { get; set; }
        public string DataNascimento { get; set; }
        public string DataCadastro { get; set; }
        public string Telefones { get; set; }
        
    }

}