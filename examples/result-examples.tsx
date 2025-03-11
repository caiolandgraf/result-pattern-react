import { Fail, Ok, type Result, ResultUtils } from "../lib/result";
import { Email } from "../lib/validators/email";
import { StrongPassword } from "../lib/validators/strong-password";

export function ExampleUsage() {
	// Exemplo 1: Criação básica de resultados
	const okResult = new Ok<number, string>(42);
	const failResult = new Fail<number, string>("Algo deu errado");

	console.log(
		"Ok result:",
		okResult.isOk ? "Sucesso" : "Falha",
		okResult.value,
	);
	console.log(
		"Fail result:",
		failResult.isFail ? "Falha" : "Sucesso",
		failResult.value,
	);

	// Exemplo 2: Validação de senha
	const password = StrongPassword.try("123");
	console.log("Senha válida?", password.isOk);
	if (password.isFail) {
		console.log("Erros:", password.value);
	}

	// Exemplo 3: Combinando resultados
	const results = [
		new Ok<number, string>(10),
		new Fail<number, string>("user.not-found"),
	];
	const result2 = ResultUtils.combine(...results);
	console.log("Combinação:", result2.isOk ? "Sucesso" : "Falha");

	// Exemplo 4: Usando map para transformar valores
	const nameResult = new Ok<string, string>("john doe");
	const uppercaseName = nameResult.map((name) => name.toUpperCase());
	console.log("Nome em maiúsculas:", uppercaseName.value);

	// Exemplo 5: Usando flatMap para encadear operações
	const validateAndFormat = (name: string): Result<string, string> => {
		if (name.length < 3) return new Fail("Nome muito curto");
		return new Ok(name.trim());
	};

	const nameProcessing = new Ok<string, string>("  John  ")
		.flatMap(validateAndFormat)
		.map((name) => name.toUpperCase());

	console.log("Nome processado:", nameProcessing.value);

	// Exemplo 6: Validação de email e senha
	const email = Email.try("usuario@exemplo.com");
	const password2 = StrongPassword.try("Senha@123");

	// Combinando validações
	const combined = ResultUtils.combine(email, password2);
	if (combined.isOk) {
		const [validEmail, validPassword] = combined.value;
		console.log(
			"Dados válidos:",
			validEmail.toString(),
			validPassword.toString(),
		);
	}

	// Exemplo 7: Usando mapFails para transformar erros
	const errorResult = new Fail<number, string>("erro.simples");
	const detailedError = errorResult.mapFails((err) => `Erro detalhado: ${err}`);
	console.log("Erro transformado:", detailedError.value);

	// Exemplo 8: Usando flip para inverter Ok/Fail
	const flippedOk = okResult.flip(); // Agora é um Fail
	const flippedFail = failResult.flip(); // Agora é um Ok
	console.log(
		"Flipped results:",
		flippedOk.isFail ? "Ok virou Fail" : "Erro",
		flippedFail.isOk ? "Fail virou Ok" : "Erro",
	);
}

// Dummy PersonName validator for demonstration purposes
class PersonName {
	static try(name: string): Result<string, string> {
		if (name && name.length > 0) {
			return new Ok(name);
		} else {
			return new Fail("person.name-invalid");
		}
	}
}
