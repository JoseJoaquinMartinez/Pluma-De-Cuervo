'use client'
import React from 'react'
import { AllChaptersComponent } from '../../../../../chapters/components/AllChaptersComponent'
import { useSelector } from 'react-redux'
import { RootState } from "@/store/store";

export default function Capitulos() {
  const {
    data: book,
    loading,
    error,
  } = useSelector((state: RootState) => state.singleBook);
  if(book){
    return (
      <div className="flex flex-col items-center justify-center px-4">
        <AllChaptersComponent bookId={book.id} />
      </div>
    )
  }
}
