import { axiosInstance } from '../instance'

export type ImageFile = {
  file: File
  preview: string
}

export async function uploadImage(image: File) {
  const formData = new FormData()
  formData.append('file', image)

  console.log(formData)

  const res = await axiosInstance
    .post<{
      success: boolean
      message: string
      data: {
        fileUrl: string
      }
    }>('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((res) => res.data)

  return res
}
