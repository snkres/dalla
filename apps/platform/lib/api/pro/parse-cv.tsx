import { axiosInstance } from '../instance'


export async function parseCV(cv: File) {
  const formData = new FormData()
  formData.append('file', cv)

  console.log(formData)

  const res: {
    message: string
    url: string
  } = await axiosInstance
    .post('/professionals/parse-resume', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((res) => res.data)

  return res
}
