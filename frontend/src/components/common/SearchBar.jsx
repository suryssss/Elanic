import React, { useState, useEffect, useRef } from 'react'
import { HiMagnifyingGlass, HiXMark } from 'react-icons/hi2'

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const inputRef = useRef(null)

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        setIsOpen(false)
        setSearchTerm('')
      }
    }
    document.addEventListener('keydown', handleEsc)
    return () => document.removeEventListener('keydown', handleEsc)
  }, [])

  return (
    <div className="flex items-center justify-center w-full">
      {isOpen ? (
        <form
          onSubmit={(e) => {
            e.preventDefault()
            console.log('Searching for:', searchTerm)
          }}
          className="relative w-full max-w-md transition-all duration-300"
        >
          <input
            ref={inputRef}
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-gray-100 text-gray-900 px-3 py-1.5 pr-10 pl-9 rounded-lg border border-gray-300 shadow-sm 
                       focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 text-sm transition"
          />

          {/* Search icon */}
          <HiMagnifyingGlass className="absolute left-2.5 top-2 h-4 w-4 text-gray-400" />

          {/* Single X button */}
          <button
            type="button"
            onClick={() => {
              if (searchTerm) {
                setSearchTerm('')
              } else {
                setIsOpen(false)
              }
            }}
            className="absolute right-2 top-2 text-gray-500 hover:text-black transition"
          >
            <HiXMark className="h-4 w-4" />
          </button>
        </form>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="p-1.5 rounded-full hover:bg-gray-200 transition"
        >
          <HiMagnifyingGlass className="h-5 w-5 text-gray-700" />
        </button>
      )}
    </div>
  )
}

export default SearchBar
