import React from 'react'

export default function Capitulos({ params }: { params: {bookId: string} }) {
    const bookId = parseInt(params.bookId)


  return (
    <div>Capitulos</div>
  )
}
