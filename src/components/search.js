import React, { useState } from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import Button from "../styles/button/button"

const SearchFilters = styled.form`
  display: flex;
  justify-content: space-between;
  flex-flow: row wrap;
  margin-bottom: 1.5rem;
  input {
    flex: 1;
    padding: 0.5rem 1rem;
  }
  ${Button} {
    margin-left: 1rem;
  }
`
const SearchHeading = styled.label`
  flex-basis: 100%;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  opacity: 0.8;
  font-size: 0.875rem;
  font-weight: bold;
`

function Search({ fullGuide, setGuide, setNoResults }) {
  const [searchTerm, setSearchTerm] = useState("")

  const handleChange = event => {
    setSearchTerm(event.target.value)
  }

  return (
    <SearchFilters
      onSubmit={e => {
        e.preventDefault()
        const filteredMethodList = Object.keys(fullGuide).filter(methodId =>
          methodId.toLowerCase().includes(searchTerm.toLowerCase())
        )
        if (filteredMethodList.length) {
          const newGuide = {}
          filteredMethodList.forEach(id => (newGuide[id] = fullGuide[id]))
          setGuide(newGuide)
        } else {
          setNoResults(true)
          setTimeout(() => {
            setNoResults(false)
          }, 5000)
          setSearchTerm("")
        }
      }}
    >
      <SearchHeading htmlFor="search" id="search">
        Search
      </SearchHeading>
      <input
        name="search"
        type="text"
        value={searchTerm}
        onChange={handleChange}
        placeholder="Search method titles"
      />
      <Button
        type="submit"
        size="xlarge"
        variation="base-raised-semidark"
        title="Enter search terms"
      >
        Search
      </Button>
    </SearchFilters>
  )
}

Search.propTypes = {
  fullGuide: PropTypes.object,
  setGuide: PropTypes.function,
  setNoResults: PropTypes.function,
}

export default Search
