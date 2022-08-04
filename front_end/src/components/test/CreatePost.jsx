import { useState } from 'react'
import axios from 'axios'

const Form = () => {
  // a local state to store the currently selected file.
  const [selectedFile, setSelectedFile] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('selectedFile', selectedFile)
    try {
      const res = await axios({
        method: 'post',
        url: `${process.env.REACT_APP_API_URL}articles`,
        data: formData,
        headers: { 'Content-Type': 'multipart/form-data' },
      })
    } catch (error) {
      console.log(error)
    }
  }
  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0])

    return (
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileSelect} />
        <input type="submit" value="Upload File" />
      </form>
    )
  }
}

export default Form
