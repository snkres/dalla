import { axiosInstance } from '../instance'

export interface Notification {
  id: string
  userId: string
  type: 'EVENT' | 'MESSAGE'
  title: string
  content: string
  metadata?: Record<string, any>
  isRead: boolean
  createdAt: Date
  updatedAt: Date
}

export type GetAllNotificationResponse = {
  statusCode: number
  success: boolean
  message: string
  data: {
    items: Array<Notification>
    meta: {
      isFirstPage: boolean
      isLastPage: boolean
      currentPage: number
      previousPage: any
      nextPage: any
      pageCount: number
      totalCount: number
    }
  }
  error: any
  path: string
  timestamp: string
}

/**
 * Get all notifications with pagination support
 */
export const getAllNotifications = async (
  page = 1,
  limit = 10,
): Promise<GetAllNotificationResponse> => {
  const response = await axiosInstance.get('/notifications', {
    params: { page, limit },
  })
  return response.data
}

/**
 * Get unread notifications with pagination support
 */
export const getUnreadNotifications = async (page = 1, limit = 10) => {
  const response = await axiosInstance.get('/notifications/unread', {
    params: { page, limit },
  })
  return response.data
}

/**
 * Mark a notification as read
 */
export const markNotificationAsRead = async (id: string) => {
  const response = await axiosInstance.patch(`/notifications/${id}/read`)
  return response.data
}

/**
 * Mark all notifications as read
 */
export const markAllNotificationsAsRead = async () => {
  const response = await axiosInstance.patch('/notifications/read-all')
  return response.data
}
