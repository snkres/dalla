import { axiosInstance } from '../instance'

export async function uploadImage(image: File) {
  const formData = new FormData()
  formData.append('file', image)

  console.log(formData)

  const res: {
    message: string
    data: {
      fileUrl: string
    }
  } = await axiosInstance
    .post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((res) => res.data)

  return res
}
