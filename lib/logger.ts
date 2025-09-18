type LogLevel = 'debug' | 'info' | 'warn' | 'error'

interface LogEntry {
  level: LogLevel
  message: string
  timestamp: Date
  data?: any
  userId?: string
  marketId?: string
  error?: Error
}

class Logger {
  private static instance: Logger
  private logs: LogEntry[] = []
  private maxLogs = 1000

  static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger()
    }
    return Logger.instance
  }

  private log(level: LogLevel, message: string, data?: any, userId?: string, marketId?: string, error?: Error) {
    const entry: LogEntry = {
      level,
      message,
      timestamp: new Date(),
      data,
      userId,
      marketId,
      error,
    }

    this.logs.unshift(entry)

    // Keep only the last maxLogs entries
    if (this.logs.length > this.maxLogs) {
      this.logs = this.logs.slice(0, this.maxLogs)
    }

    // Console output for development
    const consoleMethod = level === 'error' ? 'error' : level === 'warn' ? 'warn' : 'log'
    console[consoleMethod](`[${level.toUpperCase()}] ${message}`, {
      data,
      userId,
      marketId,
      error: error?.stack,
    })
  }

  debug(message: string, data?: any, userId?: string, marketId?: string) {
    this.log('debug', message, data, userId, marketId)
  }

  info(message: string, data?: any, userId?: string, marketId?: string) {
    this.log('info', message, data, userId, marketId)
  }

  warn(message: string, data?: any, userId?: string, marketId?: string) {
    this.log('warn', message, data, userId, marketId)
  }

  error(message: string, error?: Error, data?: any, userId?: string, marketId?: string) {
    this.log('error', message, data, userId, marketId, error)
  }

  getLogs(level?: LogLevel, limit: number = 100): LogEntry[] {
    let filteredLogs = this.logs

    if (level) {
      filteredLogs = this.logs.filter(log => log.level === level)
    }

    return filteredLogs.slice(0, limit)
  }

  getRecentLogs(minutes: number = 60): LogEntry[] {
    const cutoff = new Date(Date.now() - minutes * 60 * 1000)
    return this.logs.filter(log => log.timestamp >= cutoff)
  }

  getUserLogs(userId: string, limit: number = 50): LogEntry[] {
    return this.logs
      .filter(log => log.userId === userId)
      .slice(0, limit)
  }

  getMarketLogs(marketId: string, limit: number = 50): LogEntry[] {
    return this.logs
      .filter(log => log.marketId === marketId)
      .slice(0, limit)
  }

  clearLogs() {
    this.logs = []
  }
}

export const logger = Logger.getInstance()

