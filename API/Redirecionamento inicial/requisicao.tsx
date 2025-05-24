import axios from 'axios';

const ENDPOINT_URL = 'https://bug-free-barnacle-4jgqxqx5rvpxhp4x-5000.app.github.dev/api/redirecionamento_inicial';
const TOKEN = "gAAAAABoEvKq_srcpjfhkuK3LEAw7VY_5W2r-fCi3xbE9X8vr7jw0eyfQT9mGpJepyr5oNckeZ2WZAGViwJ7JwSXyF6ZoZYRX0f4D6dHs5Qztwpk4wBV9-xe7fBqMlhP0yBvvlcylBtbkPDKRn6z1T9mE7g3DQ5b2LENnVLOSxEWk-9v9yCvIOzPk3ofSXJW4DEM8D4sr6US0D80r9HVUDu-NLJFChn8YA==";

export async function redirecionamentoinicial(nome: string, idBase: string) {
  try {
    const dados = {
      nome: nome,
      IDbase: idBase
    };

    const resposta = await axios.post(ENDPOINT_URL, dados, {
      headers: {
        Authorization: TOKEN, // Passa o token diretamente como string
      },
      validateStatus: () => true // Permite tratar todos os status manualmente
    });

    if (resposta.status !== 200) {
      return false; // Retorna a mensagem recebida em caso de erro
    }

    // Sucesso: exibe o token no terminal e retorna
    return { success: true, token: resposta.data.Token };
  } catch (erro) {
    throw erro;
  }
}

