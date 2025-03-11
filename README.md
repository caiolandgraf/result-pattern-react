# 🚀 **Result Pattern - Uma abordagem mais segura para retorno de funções em TypeScript**  

## 📌 **Por que usar o Result Pattern?**  

Quando escrevemos código em TypeScript, o tratamento de erros pode ser um problema. Diferente de linguagens como Java e C#, TypeScript **não oferece uma forma de saber quais erros uma função pode lançar**, o que torna o rastreamento e a depuração mais difíceis.  

O **Result Pattern** resolve esse problema ao fornecer um **padrão estruturado para retornos**, garantindo que todas as operações tenham um resultado previsível:  

✅ **Fácil rastreamento de erros**  
✅ **Código mais limpo e organizado (sem `try/catch` em todo lugar)**  
✅ **Agrupamento de múltiplos erros, melhorando a experiência do usuário**  
✅ **Eliminação do aninhamento excessivo (`if/else`, `try/catch` dentro de `try/catch`)**  

---

## 🛠️ **Como funciona?**  

O **Result Pattern** encapsula um **valor de sucesso** ou uma **lista de erros**, garantindo que o código sempre tenha um retorno consistente.  

```ts
const sucesso = new Ok("Tudo certo!") // Result<string>
console.log(sucesso.isOk) // true
console.log(sucesso.value) // "Tudo certo!"

const erro = new Fail("Ocorreu um erro!")
console.log(erro.isFail) // true
console.log(erro.value) // "Ocorreu um erro!"
```

Agora, em vez de lidar com exceções espalhadas pelo código, podemos **tratar os erros de forma estruturada e previsível**.

---

## 🔥 **Rastreamento de erros simplificado**  

Imagine que temos uma função que pode falhar ao carregar um usuário.  

### ❌ Sem Result Pattern (método tradicional)  
```ts
function getUser(id: number): User {
  if (id <= 0) throw new Error("ID inválido!")
  return { id, name: "Caio" }
}

try {
  const user = getUser(-1)
  console.log(user)
} catch (e) {
  console.error("Erro:", e.message)
}
```
Problema: ❌ **Não sabemos quais erros podem ser lançados sem olhar o código**.  

---

### ✅ Com Result Pattern (abordagem estruturada)  
```ts
function getUser(id: number): Result<User, string> {
  if (id <= 0) return new Fail("ID inválido!")
  return new Ok({ id, name: "Caio" })
}

const result = getUser(-1)

if (result.isFail) {
  console.error("Erro:", result.value) // "Erro: ID inválido!"
} else {
  console.log(result.value)
}
```
✅ **Fácil rastreamento de erro** – Qualquer função que retorne `Result<T, E>` **não lança exceções**, tornando o fluxo de erro mais previsível.  

---

## 📦 **Agrupamento de múltiplos erros**  

Se você precisar **coletar vários erros de diferentes partes do sistema** antes de retornar um erro final, o **Result Pattern** torna isso super fácil.  

```ts
const r1 = new Fail("Erro no banco de dados!")
const r2 = new Fail("Falha ao autenticar usuário!")
const r3 = new Ok(42)

const combinado = ResultUtils.combine([r1, r2, r3])

console.log(combinado.isFail) // true
console.log(combinado.value) 
// ["Erro no banco de dados!", "Falha ao autenticar usuário!"]
```

Isso melhora a **experiência do usuário** porque ele recebe **todos os erros de uma só vez**, em vez de corrigir um erro e só depois descobrir que existem mais problemas.

---

## ✨ **Código mais limpo e sem aninhamento desnecessário**  

Sem **Result Pattern**, um código assíncrono pode virar um **monstro de `try/catch`**:  
```ts
try {
  const user = await getUser()
  try {
    const orders = await getOrders(user.id)
    try {
      const invoice = await generateInvoice(orders)
      console.log(invoice)
    } catch (e) {
      console.error("Erro ao gerar fatura:", e.message)
    }
  } catch (e) {
    console.error("Erro ao buscar pedidos:", e.message)
  }
} catch (e) {
  console.error("Erro ao buscar usuário:", e.message)
}
```

🛑 **Isso é horrível para manutenção!**  

---

### ✅ **Com Result Pattern: Zero aninhamento, muito mais legível**  
```ts
const user = await Result.trySync(() => getUser())
if (user.isFail) return console.error(user.value)

const orders = await Result.trySync(() => getOrders(user.value.id))
if (orders.isFail) return console.error(orders.value)

const invoice = await Result.trySync(() => generateInvoice(orders.value))
if (invoice.isFail) return console.error(invoice.value)

console.log(invoice.value)
```
✨ **Muito mais limpo, fácil de entender e sem aninhamento desnecessário!**  

---

## 🎯 **Conclusão**  

O **Result Pattern** **deveria ser obrigatório** em projetos TypeScript porque:  

✅ **Facilita o rastreamento de erros**  
✅ **Elimina aninhamentos desnecessários**  
✅ **Permite agrupar erros e fornecer feedback melhor ao usuário**  
✅ **Evita exceções inesperadas, tornando o código previsível e confiável**  

Se você quer um código mais **limpo, escalável e fácil de depurar**, **o Result Pattern é a solução!** 🚀

---

Com 💜 [@caiolandgraf](https://eicode.com.br)
