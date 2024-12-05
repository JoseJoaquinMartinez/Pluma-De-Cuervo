import React from 'react'
import { AllChaptersComponent } from '../../../../../chapters/chapter/components/AllChaptersComponent'

export default function Capitulos({ params }: { params: {bookId: string} }) {
    const bookId = parseInt(params.bookId)

    

  return (
    <div className="flex flex-col items-center justify-center pb-8 px-4">
      <AllChaptersComponent bookId={bookId} />
    </div>
  )
}
