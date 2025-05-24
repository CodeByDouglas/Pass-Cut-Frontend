export function validarNome(nome: string): boolean {
  // Verifica tamanho
  if (typeof nome !== 'string' || nome.length < 1 || nome.length > 100) {
    return false;
  }

  // Regex para bloquear SQL injection, scripts e caracteres suspeitos
  const regexMalicioso = /(\b(select|insert|update|delete|drop|alter|create|truncate|exec|union|script|iframe)\b|['";<>\\\/`]|--)/i;

  if (regexMalicioso.test(nome)) {
    return false;
  }

  return true;
}