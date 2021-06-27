import React, { useState, useEffect } from 'react'
import './App.css'
import AutoComplete from './components/autoComplete'

const url = 'https://jsonplaceholder.typicode.com/photos'

function App() {
  const [photos, setPhotos] = useState([])
  const [photoTitle, setPhotoTitle] = useState([])
  const [selectedPhotoUrl, setSelectedPhotoUrl] = useState()

  const getPhotosFromJson = async () => {
    await fetch(url).then((result) =>
      result.json().then((resp) => setPhotos(resp))
    )
  }

  const getStateUpSelectedTitle = (val) => {
    photos.filter((photo) => {
      let photoUrl
      if (val === photo.title) {
        photoUrl = photo.thumbnailUrl
        setSelectedPhotoUrl(photoUrl)
      }
      return photoUrl
    })
  }

  useEffect(() => {
    getPhotosFromJson()
    let arr = []
    photos.map((photo) => arr.push(photo.title))
    setPhotoTitle(arr)
  }, [photos])

  return (
    <div className='appContainer'>
      <h1>Photos Auto Search</h1>
      <AutoComplete
        items={JSON.stringify(photoTitle)}
        stateUpTitle={getStateUpSelectedTitle}
      />
      <img src={selectedPhotoUrl} alt='' />
    </div>
  )
}

export default App
