using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace TesteWilliamDantas.Models
{
    public class FornecedorDB
    {
        string cs = "Data Source=127.0.0.1;" +
                    "Initial Catalog=EMPRESAS;" +
                    "User id=sa;" +
                    "Password=123456;";
        public List<Fornecedor> ListAll()
        {
            List<Fornecedor> lst = new List<Fornecedor>();
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
               SqlCommand com = new SqlCommand("ListaFornecedores", con);
                com.CommandType = CommandType.StoredProcedure;
                SqlDataReader rdr = com.ExecuteReader();
                while (rdr.Read())
                {
                    lst.Add(new Fornecedor
                    {
                        ID = Convert.ToInt32(rdr["ID"]),
                        Nome = rdr["NOME"].ToString(),
                        CNPJ_CPF = rdr["CNPJ_CPF"].ToString(),
                        RG = rdr["RG"].ToString(),
                        TipoPessoa = rdr["TP_PESSOA"].ToString(),
                        DataNascimento = rdr["DATANASCIMENTO"].ToString(),
                        DataCadastro = rdr["DATACADASTRO"].ToString(),
                        Telefones = rdr["TELEFONES"].ToString()
                    });
                }
                return lst;
            }
        }

        public int AdicionaFornecedor(Fornecedor fornec)
        {
            int i;
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("InsereFornecedor", con);
                com.CommandType = CommandType.StoredProcedure;
                com.Parameters.AddWithValue("@Nome", fornec.Nome);
                com.Parameters.AddWithValue("@CNPJ", fornec.CNPJ_CPF);
                com.Parameters.AddWithValue("@DataCadastro", DateTime.Now.ToShortDateString());
                com.Parameters.AddWithValue("@DataNascimento", fornec.DataNascimento);
                com.Parameters.AddWithValue("@RG", fornec.RG);
                com.Parameters.AddWithValue("@Telefones", fornec.Telefones);
                com.Parameters.AddWithValue("@TipoPessoa", fornec.TipoPessoa);
                i = com.ExecuteNonQuery();

                //SqlCommand com1 = new SqlCommand("InsereEmpresaFornecedor", con);
                //com.CommandType = CommandType.StoredProcedure;
                //foreach (Empresa emp in fornec.emp)
                //{
                //    com1.Parameters.AddWithValue("@IdEmpresa", emp.ID);
                //    com1.Parameters.AddWithValue("@IdFornecedor", fornec.ID);
                //    com1.ExecuteNonQuery();

                //}
            }
            return i;
        }
        public int Delete(int ID)
        {
            int i;
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("ApagaFornecedor", con);
                com.CommandType = CommandType.StoredProcedure;
                com.Parameters.AddWithValue("@Id", ID);
                i = com.ExecuteNonQuery();
            }
            return i;
        }
        public int Update(Fornecedor fornec)
        {
            int i;
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("AlteraFornecedor", con);
                com.CommandType = CommandType.StoredProcedure;
                com.Parameters.AddWithValue("@Id", fornec.ID);
                com.Parameters.AddWithValue("@Nome", fornec.Nome);
                com.Parameters.AddWithValue("@CNPJ", fornec.CNPJ_CPF);
                com.Parameters.AddWithValue("@DataCadastro", DateTime.Now.ToShortDateString());
                com.Parameters.AddWithValue("@DataNascimento", fornec.DataNascimento);
                com.Parameters.AddWithValue("@RG", fornec.RG);
                com.Parameters.AddWithValue("@Telefones", fornec.Telefones);
                com.Parameters.AddWithValue("@TipoPessoa", fornec.TipoPessoa);
                i = com.ExecuteNonQuery();
            }
            return i;
        }
    }
}