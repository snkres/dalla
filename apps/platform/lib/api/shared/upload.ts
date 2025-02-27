import { axiosInstance } from '../instance'

export type ImageFile = {
  file: File
  preview: string
}

export async function uploadImage(image: ImageFile) {
  const formData = new FormData()
  formData.append('file', image.file)

  console.log(formData)

  const res: {
    message: string
    url: string
  } = await axiosInstance
    .post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((res) => res.data)

  return res
}
