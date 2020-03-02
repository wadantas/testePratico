using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace TesteWilliamDantas.Models
{
    public class EmpresaDB
    {

        string cs ="Data Source=127.0.0.1;" +
                    "Initial Catalog=EMPRESAS;" +
                    "User id=sa;" +
                    "Password=123456;";
        public List<Empresa> ListAll()
        {
            List<Empresa> lst = new List<Empresa>();
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("ListaEmpresas", con);
                com.CommandType = CommandType.StoredProcedure;
                SqlDataReader rdr = com.ExecuteReader();
                while (rdr.Read())
                {
                    lst.Add(new Empresa
                    {
                        ID = Convert.ToInt32(rdr["ID"]),
                        NomeFantasia = rdr["NOMEFANTASIA"].ToString(),
                        CNPJ = rdr["CNPJ"].ToString(),
                        UF = rdr["UF"].ToString(),
                    });
                }
                return lst;
            }
        }
        
        public int Add(Empresa emp)
        {
            int i;
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("InsereEmpresa", con);
                com.CommandType = CommandType.StoredProcedure;
                com.Parameters.AddWithValue("@NomeFantasia", emp.NomeFantasia);
                com.Parameters.AddWithValue("@CNPJ", emp.CNPJ);
                com.Parameters.AddWithValue("@UF", emp.UF);
                i = com.ExecuteNonQuery();
            }
            return i;
        }

        public int Update(Empresa emp)
        {
            int i;
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("AlteraEmpresa", con);
                com.CommandType = CommandType.StoredProcedure;
                com.Parameters.AddWithValue("@Id", emp.ID);
                com.Parameters.AddWithValue("@NomeFantasia", emp.NomeFantasia);
                com.Parameters.AddWithValue("@CNPJ", emp.CNPJ);
                com.Parameters.AddWithValue("@UF", emp.UF);
                i = com.ExecuteNonQuery();
            }
            return i;
        }

        public int Delete(int ID)
        {
            int i;
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("ApagaEmpresa", con);
                com.CommandType = CommandType.StoredProcedure;
                com.Parameters.AddWithValue("@Id", ID);
                i = com.ExecuteNonQuery();
            }
            return i;
        }

        public int AddEmpXFor(EmpXFor empFor)
        {
            int i;
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("InsereEmpFor", con);
                com.CommandType = CommandType.StoredProcedure;
                com.Parameters.AddWithValue("@IdEmpresa", empFor.IDEmpresa);
                com.Parameters.AddWithValue("@IdFornecedor", empFor.IDFornecedor);
                i = com.ExecuteNonQuery();
            }
            return i;
        }
        public List<EmpXFor> ListFornecedorEmpresa(int id)
        {
            List<EmpXFor> lst = new List<EmpXFor>();
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("ListaFornecedorEmpresa", con);
                com.CommandType = CommandType.StoredProcedure;
                com.Parameters.AddWithValue("@IdEmpresa", id);
                SqlDataReader rdr = com.ExecuteReader();
                while (rdr.Read())
                {
                    lst.Add(new EmpXFor
                    {
                        IDEmpresa = Convert.ToInt32(rdr["IDEMPRESA"]),
                        IDFornecedor = Convert.ToInt32(rdr["ID"].ToString()),
                        CNPJ = rdr["CNPJ_CPF"].ToString(),
                        Nome = rdr["NOME"].ToString(),
                        TipoPessoa = rdr["TP_PESSOA"].ToString(),
                        Telefone = rdr["TELEFONES"].ToString(),
                    });
                }
                return lst;
            }
        }
    }
}