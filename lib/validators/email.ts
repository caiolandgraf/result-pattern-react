import Result from "../result"

export class Email {
  private constructor(public readonly value: string) {}

  static try(value: string): Result<Email> {
    if (!value) {
      return Result.fail("Email é obrigatório")
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(value)) {
      return Result.fail("Email inválido")
    }

    return Result.ok(new Email(value))
  }

  toString(): string {
    return this.value
  }
}

