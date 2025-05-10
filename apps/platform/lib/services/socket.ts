import { io, Socket } from 'socket.io-client'
import { axiosInstance } from '@lib/api/instance'

let socket: Socket | null = null

const getAuthToken = (): string | null => {
  return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFtcnRhbWVydGViYUBnbWFpbC5jb20iLCJ1c2VySWQiOiJja19kWjRvYWEzMnRiSDZhTnZnIiwidHlwZSI6ImNvbXBhbnkiLCJpYXQiOjE3NDY4ODU5NzYsImV4cCI6MTc0Njk3MjM3Nn0.h1bWUaqx8XMYWONnqdkYsNrM_CxYZR8BfzVMk9R1bQ4'
}

export const initializeSocket = (): Socket => {
  if (!socket) {
    const baseURL = axiosInstance.defaults.baseURL || 'http://localhost:3000'

    const socketOptions = {
      withCredentials: true,
      autoConnect: true,
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      transports: ['websocket'],
      timeout: 10000,
      path: '/socket.io/',
    }

    try {
      console.log('Initializing socket connection to:', baseURL)
      socket = io(baseURL, socketOptions)

      socket.on('connect', () => {
        console.log('Socket connected successfully:', socket?.id)
      })

      socket.on('disconnect', (reason: string) => {
        console.log('Socket disconnected:', reason)
        if (reason === 'transport error' || reason === 'transport close') {
          reconnectSocket()
        }
      })

      socket.on('connect_error', (error: Error) => {
        console.error('Socket connection error:', error.message)
        if (socket && socket.io) {
          console.log('Retrying with polling transport only...')
          disconnectSocket()

          const pollingOptions = { ...socketOptions }
          pollingOptions.transports = ['polling']

          console.log('Reconnecting with polling only')
          socket = io(baseURL, pollingOptions)
        }
      })

      socket.io.on('reconnect_attempt', () => {
        console.log('Attempting to reconnect socket...')
        const freshToken = getAuthToken()
        if (freshToken && socket?.io?.opts?.extraHeaders) {
          socket.io.opts.extraHeaders.Authorization = `Bearer ${freshToken}`
        }
      })
    } catch (err) {
      console.error('Error initializing socket:', err)
      return null as any
    }
  }

  return socket
}

export const disconnectSocket = (): void => {
  if (socket) {
    try {
      socket.disconnect()
    } catch (err) {
      console.error('Error disconnecting socket:', err)
    } finally {
      socket = null
    }
  }
}

export const getSocket = (): Socket | null => {
  return socket
}

export const reconnectSocket = (): void => {
  if (socket && !socket.connected) {
    try {
      console.log('Attempting to reconnect existing socket')
      socket.connect()
    } catch (err) {
      console.error('Error reconnecting socket:', err)
      disconnectSocket()
      initializeSocket()
    }
  } else if (!socket) {
    console.log('Creating new socket connection')
    initializeSocket()
  } else {
    console.log('Socket already connected, no need to reconnect')
  }
}
