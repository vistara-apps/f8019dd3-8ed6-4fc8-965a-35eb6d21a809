export class AppError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode: number = 500,
    public details?: any
  ) {
    super(message)
    this.name = 'AppError'
  }
}

export function handleApiError(error: unknown): {
  success: false
  error: string
  code?: string
  details?: any
} {
  if (error instanceof AppError) {
    return {
      success: false,
      error: error.message,
      code: error.code,
      details: error.details,
    }
  }

  if (error instanceof Error) {
    return {
      success: false,
      error: error.message,
      code: 'INTERNAL_ERROR',
    }
  }

  return {
    success: false,
    error: 'An unexpected error occurred',
    code: 'UNKNOWN_ERROR',
  }
}

export function validateRequired(value: any, fieldName: string): void {
  if (value === null || value === undefined || value === '') {
    throw new AppError(`${fieldName} is required`, 'VALIDATION_ERROR', 400)
  }
}

export function validateNumber(value: any, fieldName: string, min?: number, max?: number): void {
  const num = Number(value)
  if (isNaN(num)) {
    throw new AppError(`${fieldName} must be a valid number`, 'VALIDATION_ERROR', 400)
  }

  if (min !== undefined && num < min) {
    throw new AppError(`${fieldName} must be at least ${min}`, 'VALIDATION_ERROR', 400)
  }

  if (max !== undefined && num > max) {
    throw new AppError(`${fieldName} must be at most ${max}`, 'VALIDATION_ERROR', 400)
  }
}

export function validateDate(value: any, fieldName: string): Date {
  const date = new Date(value)
  if (isNaN(date.getTime())) {
    throw new AppError(`${fieldName} must be a valid date`, 'VALIDATION_ERROR', 400)
  }
  return date
}

export function validateArray(value: any, fieldName: string, minLength: number = 1): void {
  if (!Array.isArray(value)) {
    throw new AppError(`${fieldName} must be an array`, 'VALIDATION_ERROR', 400)
  }

  if (value.length < minLength) {
    throw new AppError(`${fieldName} must contain at least ${minLength} items`, 'VALIDATION_ERROR', 400)
  }
}

export function validateWalletAddress(address: string): void {
  if (!address || typeof address !== 'string') {
    throw new AppError('Wallet address is required', 'VALIDATION_ERROR', 400)
  }

  // Basic Ethereum address validation
  if (!/^0x[a-fA-F0-9]{40}$/.test(address)) {
    throw new AppError('Invalid wallet address format', 'VALIDATION_ERROR', 400)
  }
}

export function validateFarcasterId(farcasterId: string): void {
  if (!farcasterId || typeof farcasterId !== 'string') {
    throw new AppError('Farcaster ID is required', 'VALIDATION_ERROR', 400)
  }

  // Basic validation - should be a string
  if (farcasterId.trim().length === 0) {
    throw new AppError('Farcaster ID cannot be empty', 'VALIDATION_ERROR', 400)
  }
}

