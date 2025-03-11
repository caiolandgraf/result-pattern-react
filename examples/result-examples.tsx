import { Email } from "../lib/validators/email"
import { StrongPassword } from "../lib/validators/strong-password"
import Result from "../lib/result"

export function ExampleUsage() {
  // Exemplo 1: Validação de senha
  const result = Result.try(() => new StrongPassword("123"))
  console.log("Resultado:", result.isSuccess() ? "Sucesso" : "Falha")

  // Exemplo 2: Validação direta
  const password = StrongPassword.try("123")
  console.log("Senha válida?", password.isSuccess())
  if (password.isFailure()) {
    console.log("Erros:", password.getErrorMessage())
  }

  // Exemplo 3: Combinando resultados
  const results = [Result.ok(10), Result.fail("user.not-found")]
  const result2 = Result.combine(results)
  console.log("Combinação:", result2.isSuccess() ? "Sucesso" : "Falha")

  // Exemplo 4: Múltiplos erros
  const result3 = Result.fail([
    { code: "user.not-found" },
    "user.not-authorized",
    { message: "user.not-logged" },
    { error: "user.not-logged" } as any,
  ])
  console.log("Erros múltiplos:", result3.getErrorMessage())

  // Exemplo 5: Validação de email e senha
  const email = Email.try("usuario@exemplo.com")
  const password2 = StrongPassword.try("Senha@123")

  // Combinando validações
  Result.combine([email, password2]).throwErrorIfFailed()

  // Exemplo 6: Validação de formulário
  function validateForm(input: { name: string; email: string; password: string }) {
    const name = PersonName.try(input.name)
    const email = Email.try(input.email)
    const password = StrongPassword.try(input.password)

    return Result.combine([name, email, password])
  }
}

// Dummy PersonName validator for demonstration purposes
class PersonName {
  static try(name: string): Result<string> {
    if (name && name.length > 0) {
      return Result.ok(name)
    } else {
      return Result.fail("person.name-invalid")
    }
  }
}

