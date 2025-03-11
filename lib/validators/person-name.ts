import { Fail, Ok, type Result } from "../result";

export class PersonName {
	private constructor(public readonly value: string) {}

	static try(value: string): Result<PersonName, string> {
		if (!value) {
			return new Fail("Nome é obrigatório");
		}

		if (value.length < 3) {
			return new Fail("O nome deve ter pelo menos 3 caracteres");
		}

		if (value.length > 100) {
			return new Fail("O nome deve ter no máximo 100 caracteres");
		}

		// Verifica se contém apenas letras, espaços e alguns caracteres especiais comuns em nomes
		const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/;
		if (!nameRegex.test(value)) {
			return new Fail("O nome contém caracteres inválidos");
		}

		return new Ok(new PersonName(value));
	}

	toString(): string {
		return this.value;
	}
}
