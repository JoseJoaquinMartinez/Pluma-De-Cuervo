import React from 'react'

export default function Capitulo ({ params }: { params: { id: string } })  {
  const chapterId = parseInt(params.id);
  console.log("el id del capitulo es:", chapterId)
  return (
    <div>Capitulo {chapterId}</div>
  )
}
