interface AuthPayload {
  access_token?: string
  refresh_token?: string
}

interface AuthResponseShape {
  success: boolean
  message: string
  data: AuthPayload
}

interface AxiosLikeResponse<T extends AuthResponseShape> {
  data: T
  headers?: Record<string, unknown>
  status?: number
}

function getHeaderValue(
  headers: AxiosLikeResponse<AuthResponseShape>['headers'],
  key: string,
) {
  const value = headers?.[key]

  return typeof value === 'string' ? value : undefined
}

export function normalizeAuthResponse<T extends AuthResponseShape>(
  response: AxiosLikeResponse<T>,
) {
  const headerAccessToken = getHeaderValue(response.headers, 'x-access-token')
  const headerRefreshToken = getHeaderValue(
    response.headers,
    'x-refresh-token',
  )

  return {
    ...response.data,
    data: {
      ...response.data.data,
      access_token:
        headerAccessToken ?? response.data.data.access_token ?? undefined,
      refresh_token:
        headerRefreshToken ?? response.data.data.refresh_token ?? undefined,
    },
    ...(typeof response.status === 'number' ? { status: response.status } : {}),
  }
}
