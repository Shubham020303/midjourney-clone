import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { Loader } from '../components'
const DetailedPost = () => {
     const [loading, setLoading] = useState(false)
     const [post, setPost] = useState(null)

     useEffect(() => {
          const fetchPost = async () => {
               setLoading(true)

               try {
                    const response = await fetch("https://midjourney-2-0.onrender.com/api/v1/post/getPost?id=" + id, {
                         method: "GET",
                         headers: {
                              "Content-Type": "application/json"
                         },
                    })

                    if (response.ok) {
                         const result = await response.json()
                         setPost(result.data[0])
                    }
               } catch (error) {
                    alert(error)
               } finally {
                    setLoading(false)
               }
          }
          fetchPost()
     }, [])

     const { id } = useParams("id")

     return (
          <div>
          {post?.name}
          {post?.prompt}
          {post?.dimensions}
          {post?.stylePreset}
          </div>
     )
}

export default DetailedPost