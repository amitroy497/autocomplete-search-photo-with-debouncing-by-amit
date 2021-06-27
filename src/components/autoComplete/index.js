import React, { useState } from 'react'
import './index.css'

const AutoComplete = ({ items, stateUpTitle }) => {
  const [suggestions, setSuggestions] = useState([])
  const [text, setText] = useState('')

  const getSuggestion = (e) => {
    const value = e.target.value
    let time
    clearTimeout(time)
    let data = []
    time = setTimeout(() => {
      if (value.length > 0) {
        const regEx = new RegExp(`${value}`, 'i')
        data = JSON.parse(items).filter((v) => regEx.test(v))
      }
      setSuggestions(data)
    }, 3000)
    setText(value)
  }

  const suggestionSelected = (value) => {
    setText(value)
    setSuggestions([])
  }
  const renderSuggestions = () => {
    if (suggestions.length === 0) {
      return null
    }
    return (
      <section className='autoCompleteSection'>
        {suggestions.map((item, index) => (
          <div
            className='autoCompleteField'
            key={index}
            onClick={() => {
              suggestionSelected(item)
              stateUpTitle(item)
            }}
          >
            {item}
          </div>
        ))}
      </section>
    )
  }
  return (
    <article className='autoCompleteContainer'>
      <input type='text' value={text} onChange={getSuggestion} />
      {renderSuggestions()}
    </article>
  )
}

export default AutoComplete
