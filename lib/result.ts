type ErrorMsg = string | Message | { message: string } | ErrorMsg[]

interface Message {
  code?: string
  message?: string
  error?: any
}

export default class Result<T> {
  constructor(
    readonly data?: T | null,
    readonly errors: Message[] = [],
  ) {}

  static ok<T>(data?: T): Result<T> {
    return new Result<T>(data ?? null)
  }

  static null(): Result<null> {
    return Result.ok()
  }

  static fail<T>(data: ErrorMsg | ErrorMsg[]): Result<T> {
    return new Result<T>(undefined, Result.getErrors(data))
  }

  static try<T>(fn: () => T): Result<T> {
    try {
      return Result.ok<T>(fn())
    } catch (e: any) {
      return Result.fail<T>(e)
    }
  }

  static async trySync<T>(fn: () => Promise<T>): Promise<Result<T>> {
    try {
      return Result.ok<T>(await fn())
    } catch (e: any) {
      return Result.fail<T>(e)
    }
  }

  static combine<T>(results: (Result<T> | null)[]): Result<T[]> {
    const validResults: Result<T>[] = results.filter((result): result is Result<T> => result !== null)

    if (validResults.length === 0) {
      return Result.ok<T[]>([])
    }

    const errors: Message[] = []
    const data: T[] = []

    for (const result of validResults) {
      if (result.isSuccess() && result.data !== null) {
        data.push(result.data)
      }

      if (result.isFailure()) {
        errors.push(...result.errors)
      }
    }

    if (errors.length > 0) {
      return new Result<T[]>(undefined, errors)
    }

    return Result.ok<T[]>(data)
  }

  static getErrors(data: ErrorMsg | ErrorMsg[]): Message[] {
    if (Array.isArray(data)) {
      return data.flatMap((item) => Result.getErrors(item))
    }

    if (typeof data === "string") {
      return [{ message: data }]
    }

    if (data && typeof data === "object" && "message" in data) {
      return [{ message: data.message }]
    }

    return [data as Message]
  }

  isSuccess(): boolean {
    return this.errors.length === 0
  }

  isFailure(): boolean {
    return !this.isSuccess()
  }

  throwErrorIfFailed(): T | null {
    if (this.isFailure()) {
      throw new Error(this.errors.map((error) => error.message || error.code || JSON.stringify(error)).join(", "))
    }

    return this.data
  }

  getErrorMessage(): string {
    return this.errors.map((error) => error.message || error.code || JSON.stringify(error)).join(", ")
  }
}

