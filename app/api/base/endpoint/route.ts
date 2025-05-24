import { NextRequest, NextResponse } from 'next/server';
import { validarIdBase } from '../../../util/validacaoidbase';
import { validarNome } from '../../../util/validacaonome';
import { redirecionamentoinicial } from '../../../../API/Redirecionamento inicial/requisicao';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const idbase = searchParams.get('idbase');
  const nome = searchParams.get('nome');

  if (!idbase || !nome) {
    return NextResponse.json({ erro: 'Parâmetros idbase e nome são obrigatórios.' }, { status: 400 });
  }

  const idbaseNum = String(idbase);

  if (!validarIdBase(idbaseNum)) {
    return NextResponse.json({ erro: 'Dado idbase inválido.' }, { status: 401 });
  }

  if (!validarNome(String(nome))) {
    return NextResponse.json({ erro: 'Dado nome inválido.' }, { status: 401 });
  }

  try {
    const resultado = await redirecionamentoinicial(String(nome), idbaseNum);

    // Exibe o resultado no terminal, independente do valor
    console.log('Resultado da função redirecionamentoinicial:', resultado);

    if (resultado && resultado.success && resultado.token) {
      return NextResponse.json({ token: resultado.token }, { status: 200 });
    } else {
      return NextResponse.json({ erro: resultado }, { status: 401 });
    }
  } catch (erro) {
    console.error('Erro na requisição ao backend:', erro);
    return NextResponse.json({ erro: 'Erro interno ao processar a requisição.' }, { status: 500 });
  }
}