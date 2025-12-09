import React, { useState, useEffect, useRef } from 'react'
import { HiMagnifyingGlass, HiXMark } from 'react-icons/hi2'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { fetchProductsByFilters } from '../../redux/slices/productSlice'

const SearchBar = ({ variant = 'default' }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [isOpen, setIsOpen] = useState(variant === 'navbar')
  const [showResults, setShowResults] = useState(false)
  const inputRef = useRef(null)
  const resultsRef = useRef(null)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { products, loading } = useSelector((state) => state.products)

  // Debounce search
  useEffect(() => {
    if (!searchTerm.trim()) {
      setShowResults(false)
      return
    }

    const debounceTimer = setTimeout(() => {
      dispatch(fetchProductsByFilters({ search: searchTerm.trim(), limit: 5 }))
      setShowResults(true)
    }, 300)

    return () => clearTimeout(debounceTimer)
  }, [searchTerm, dispatch])

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
        setShowResults(false)
      }
    }
    document.addEventListener('keydown', handleEsc)
    return () => document.removeEventListener('keydown', handleEsc)
  }, [])

  // Close results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        resultsRef.current &&
        !resultsRef.current.contains(event.target) &&
        inputRef.current &&
        !inputRef.current.contains(event.target)
      ) {
        setShowResults(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      setIsOpen(false)
      setShowResults(false)
      navigate(`/collections/all?search=${encodeURIComponent(searchTerm.trim())}`)
      setSearchTerm('')
    }
  }

  const handleProductClick = (productId) => {
    setIsOpen(false)
    setShowResults(false)
    setSearchTerm('')
    navigate(`/product/${productId}`)
  }

  const handleClear = () => {
    setSearchTerm('')
    setShowResults(false)
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  const renderSearchInput = () => (
    <form onSubmit={handleSubmit} className="relative w-full transition-all duration-300">
      <input
        ref={inputRef}
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className={`w-full text-gray-900 pr-10 pl-9 py-2 rounded-full border shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 text-sm transition ${
          variant === 'navbar' ? 'bg-gray-200 border-gray-200' : 'bg-gray-100 border-gray-300 rounded-lg'
        }`}
      />

      <HiMagnifyingGlass className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />

      <button
        type="button"
        onClick={() => {
          if (searchTerm) {
            handleClear()
          } else if (variant !== 'navbar') {
            setIsOpen(false)
            setShowResults(false)
          }
        }}
        className="absolute right-3 top-2 text-gray-500 hover:text-black transition"
        aria-label="Clear search"
      >
        <HiXMark className="h-4 w-4" />
      </button>
    </form>
  )

  return (
    <div className="flex items-center justify-center w-full relative">
      {isOpen ? (
        <div className="relative w-full max-w-md">
          {renderSearchInput()}

          {showResults && searchTerm.trim() && (
            <div
              ref={resultsRef}
              className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto"
            >
              {loading ? (
                <div className="p-4 text-center text-gray-500">
                  <p>Searching...</p>
                </div>
              ) : products && products.length > 0 ? (
                <>
                  <div className="p-2 border-b border-gray-200">
                    <p className="text-xs text-gray-500">
                      {products.length} result{products.length !== 1 ? 's' : ''} found
                    </p>
                  </div>
                  <div className="py-2">
                    {products.map((product) => (
                      <button
                        key={product._id}
                        onClick={() => handleProductClick(product._id)}
                        className="w-full px-4 py-3 hover:bg-gray-50 transition-colors text-left flex items-center gap-3"
                      >
                        <img
                          src={product.images?.[0]?.url || '/placeholder-image.jpg'}
                          alt={product.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {product.name}
                          </p>
                          <p className="text-xs text-gray-500 truncate">
                            {product.description?.substring(0, 50)}
                            {product.description?.length > 50 ? '...' : ''}
                          </p>
                          <p className="text-sm font-semibold text-gray-900 mt-1">
                            ₹{product.price?.toLocaleString()}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                  {searchTerm.trim() && (
                    <div className="p-2 border-t border-gray-200">
                      <button
                        onClick={handleSubmit}
                        className="w-full text-center text-sm text-gray-600 hover:text-black font-medium py-2"
                      >
                        View all results for "{searchTerm}"
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className="p-4 text-center text-gray-500">
                  <p className="text-sm">No products found</p>
                  <p className="text-xs mt-1">Try a different search term</p>
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="p-1.5 rounded-full hover:bg-gray-200 transition"
          aria-label="Open search"
        >
          <HiMagnifyingGlass className="h-5 w-5 text-gray-700" />
        </button>
      )}
    </div>
  )
}

export default SearchBar
