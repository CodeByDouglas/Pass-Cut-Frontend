import { NextRequest, NextResponse } from 'next/server';
import { autenticarUsuario } from '../../../../API/autenticaruser/autenticar';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get('email');
  const senha = searchParams.get('senha');

  if (!email || !senha) {
    return NextResponse.json({ erro: 'Parâmetros email e senha são obrigatórios.' }, { status: 400 });
  }

  try {
    const resultado = await autenticarUsuario(email, senha);
    return NextResponse.json(resultado, { status: 200 });
  } catch (erro) {
    return NextResponse.json({ erro: 'Erro ao autenticar usuário.' }, { status: 500 });
  }
}