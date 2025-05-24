export async function autenticarUsuario(email: string, senha: string) {
  const ENDPOINT_URL = 'https://jubilant-adventure-q79vr767pj7pf4v66-5000.app.github.dev/api/autenticar_user';
  const TOKEN = 'gAAAAABoEvE47ot3lq42F1SmaqpA1EFwxun12dYCiMzYzvB9J0CVG-szB5TNKqq_Eac7SgPplgimGb4gn-ixUrdNOifZ1qdxGtPDMt5RSZi8_uFhpilJ30vwCcc1RPJHmr_bt00FqKZAgjgyAzdK8Ukq1GfLt-9DeNd9TDPK-u4gYWdRK9-DbcXNOA5Aid5oOikhBff7VEXxp6q1_RqNZwz7BPsLK6FQ==';

  try {
    const response = await fetch(ENDPOINT_URL, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': TOKEN,
      },
      body: JSON.stringify({
        login: email,
        senha: senha,
      }),
    });

    const data = await response.json();
    console.log('Retorno da autenticação:', data);
    return data;
  } catch (error) {
    console.error('Erro na autenticação:', error);
    throw error;
  }
}