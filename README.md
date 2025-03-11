Esse código define uma classe TypeScript chamada `Result<T>`, que é usada para representar o resultado de uma operação, podendo conter um valor de sucesso (`data`) ou uma lista de erros (`errors`).  

### 📌 **Explicação Geral**  
A classe `Result<T>` encapsula operações que podem falhar, permitindo lidar com erros de forma mais estruturada do que simplesmente usar `try/catch` ou retornar `null/undefined`.  

---

## 🏷️ **O que significa `<T>`?**  
Em TypeScript, `<T>` é um **tipo genérico**. Isso significa que `Result<T>` pode armazenar qualquer tipo de dado (`T` pode ser `string`, `number`, `User`, etc.).  

Por exemplo:
```ts
const success = Result.ok<number>(42)   // Result<number>
const failure = Result.fail<string>("Erro ao carregar os dados") // Result<string>
```

Aqui, `T` define qual será o tipo dos dados armazenados em `Result<T>`. Isso permite criar uma classe reutilizável que pode lidar com qualquer tipo de retorno.

---

## 📌 **Explicação dos métodos**
### 🟢 **Sucesso**
- `Result.ok<T>(data?: T)`: Cria um `Result` bem-sucedido contendo `data`.
- `Result.null()`: Atalho para `Result.ok(null)`.

```ts
const success = Result.ok("Tudo certo!") // Result<string>
console.log(success.data) // "Tudo certo!"
```

---

### 🔴 **Erro**
- `Result.fail<T>(data: ErrorMsg | ErrorMsg[])`: Cria um `Result` com erro(s), processando mensagens de erro para um formato padronizado.
- `Result.getErrors(data)`: Converte diferentes formatos de erro para um array de `Message`.

```ts
const failure = Result.fail("Ocorreu um erro!")
console.log(failure.errors) // [{ message: "Ocorreu um erro!" }]
```

---

### ⏳ **Execução Segura**
- `Result.try<T>(fn: () => T)`: Executa uma função dentro de um `try/catch` e retorna `Result.ok()` ou `Result.fail()` caso haja erro.
- `Result.trySync<T>(fn: () => Promise<T>)`: Versão assíncrona do `try`.

```ts
const result = Result.try(() => JSON.parse("{ invalid json }"))
console.log(result.isFailure()) // true
console.log(result.getErrorMessage()) // Mensagem do erro
```

---

### 📚 **Manipulação de Múltiplos Resultados**
- `Result.combine<T>(results: (Result<T> | null)[])`: Combina múltiplos `Result<T>`, retornando sucesso se todos forem bem-sucedidos, ou os erros caso haja falhas.

```ts
const r1 = Result.ok(1)
const r2 = Result.ok(2)
const r3 = Result.fail("Erro aqui")

const combined = Result.combine([r1, r2, r3])
console.log(combined.isFailure()) // true
console.log(combined.getErrorMessage()) // "Erro aqui"
```

---

### ✅ **Métodos auxiliares**
- `isSuccess()`: Retorna `true` se não houver erros.
- `isFailure()`: Retorna `true` se houver erro(s).
- `throwErrorIfFailed()`: Lança uma exceção caso haja erro.
- `getErrorMessage()`: Retorna todas as mensagens de erro como string.

```ts
const success = Result.ok("Tudo certo!")
console.log(success.isSuccess()) // true
console.log(success.getErrorMessage()) // ""

const failure = Result.fail("Erro crítico!")
console.log(failure.isFailure()) // true
console.log(failure.getErrorMessage()) // "Erro crítico!"
```

---

## **📌 Conclusão**
Essa implementação ajuda a manter um código mais organizado, centralizando o tratamento de erros e facilitando a depuração, especialmente em aplicações TypeScript que lidam com chamadas assíncronas, APIs ou operações sensíveis a falhas. 🚀
