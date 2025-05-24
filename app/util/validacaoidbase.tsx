export function validarIdBase(idbase: string): boolean {
  // Converte a string para número inteiro
  const idbaseNum = Number(idbase);

  // Verifica se a conversão foi bem-sucedida e se é um número inteiro com exatamente 10 dígitos
  if (
    isNaN(idbaseNum) ||
    !Number.isInteger(idbaseNum) ||
    idbaseNum < 1000000000 ||
    idbaseNum > 9999999999
  ) {
    return false;
  }

  // Verifica se há caracteres suspeitos na string original (por segurança)
  const regexMalicioso = /(\b(select|insert|update|delete|drop|alter|create|truncate|exec|union|script|iframe)\b|['";<>\\\/`]|--)/i;

  if (regexMalicioso.test(idbase)) {
    return false;
  }

  return true;
}