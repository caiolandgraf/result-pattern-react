import { Fail, Ok, type Result } from "../result";

export class StrongPassword {
	private constructor(public readonly value: string) {}

	static try(value: string): Result<StrongPassword, string[]> {
		if (!value) {
			return new Fail(["Senha é obrigatória"]);
		}

		if (value.length < 8) {
			return new Fail(["A senha deve ter pelo menos 8 caracteres"]);
		}

		const hasUpperCase = /[A-Z]/.test(value);
		const hasLowerCase = /[a-z]/.test(value);
		const hasNumbers = /\d/.test(value);
		const hasSpecialChar = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(value);

		const errors: string[] = [];
		if (!hasUpperCase)
			errors.push("A senha deve conter pelo menos uma letra maiúscula");
		if (!hasLowerCase)
			errors.push("A senha deve conter pelo menos uma letra minúscula");
		if (!hasNumbers) errors.push("A senha deve conter pelo menos um número");
		if (!hasSpecialChar)
			errors.push("A senha deve conter pelo menos um caractere especial");

		if (errors.length > 0) {
			return new Fail(errors);
		}

		return new Ok(new StrongPassword(value));
	}

	toString(): string {
		return this.value;
	}
}
