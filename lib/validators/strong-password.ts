import Result from "../result"

export class StrongPassword {
  private constructor(public readonly value: string) {}

  static try(value: string): Result<StrongPassword> {
    if (!value) {
      return Result.fail("Senha é obrigatória")
    }

    if (value.length < 8) {
      return Result.fail("A senha deve ter pelo menos 8 caracteres")
    }

    const hasUpperCase = /[A-Z]/.test(value)
    const hasLowerCase = /[a-z]/.test(value)
    const hasNumbers = /\d/.test(value)
    const hasSpecialChar = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(value)

    const errors = []
    if (!hasUpperCase) errors.push("A senha deve conter pelo menos uma letra maiúscula")
    if (!hasLowerCase) errors.push("A senha deve conter pelo menos uma letra minúscula")
    if (!hasNumbers) errors.push("A senha deve conter pelo menos um número")
    if (!hasSpecialChar) errors.push("A senha deve conter pelo menos um caractere especial")

    if (errors.length > 0) {
      return Result.fail(errors)
    }

    return Result.ok(new StrongPassword(value))
  }

  toString(): string {
    return this.value
  }
}

