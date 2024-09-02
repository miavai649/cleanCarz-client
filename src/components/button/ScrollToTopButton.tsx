import React, { useState, useEffect } from 'react'
import { FaArrowUp } from 'react-icons/fa'

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false)

  // Show or hide the button based on the scroll position
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)

    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <div>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className='fixed bottom-8 right-8 bg-primary-500 text-white p-3 rounded-full shadow-lg hover:bg-primary-600 transition duration-300 ease-in-out'>
          <FaArrowUp size={20} />
        </button>
      )}
    </div>
  )
}

export default ScrollToTopButton
