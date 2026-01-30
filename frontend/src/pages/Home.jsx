import React from 'react'
import Navbar from '../components/Navbar.jsx'
import Header from '../components/Header.jsx'
import Bloglist from '../components/Bloglist.jsx'
import BlogCard from '../components/BlogCard.jsx'
import NewsLetter from '../components/NewsLetter.jsx'
import Footer from '../components/Footer.jsx'

function Home() {
  return (
    <div>
      <Navbar />
      <Header />
      <Bloglist />
      {/* <BlogCard /> */}
      <NewsLetter />
      <Footer />
    </div>
  )
}

export default Home