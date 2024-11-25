export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

export const logInfo = (message: string | object) => {
  const canLogInfo = process.env.E2E_LOG_INFO || false
  if (canLogInfo) {
    console.log(message)
  }
}
