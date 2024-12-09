"use client"
import ChapterCard from '@/app/(un-auth-regular-user)/ultimos-capitulos/components/ChapterCard'
import { BookLoaderComponent } from '@/components/shared/BookLoader'
import { fetchAllChaptersFromABook } from '@/store/slices/singleBook/thunk/fetchAllChaptersFromABook'
import {RootState, AppDispatch } from '@/store/store'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export const AllChaptersComponent = ({bookId} : {bookId: number}) => {
    const dispatch = useDispatch<AppDispatch>();
    const {
      data: chapters,
      loading,
      error,
    } = useSelector((state: RootState) => state.getAllChaptersFromABook);
    
  useEffect(()=>{
    
    if(chapters?.length=== 0){
      dispatch(fetchAllChaptersFromABook(bookId));
    }
   
  },[chapters, bookId, dispatch]);
  
  if (loading) {
    return <BookLoaderComponent />;
  }
  if (error) {
    return <p>{error}</p>;
  }
  

    if(chapters){
      return (
        <section className='flex flex-col max-w-screen-lg'>
          <h2 className='text-xl text-encabezados self-start'>Capítulos</h2>
          {chapters && chapters.length === 0 && <p>No hay capítulos que mostrar</p>}
          <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3'>
          {
            chapters.map(({id, title, createdAt, estimatedReadTime, imagen})=>(
              <ChapterCard 
                key={id} 
                id={id} 
                imagen={imagen} 
                createdAt={createdAt}
                estimatedReadTime={estimatedReadTime}
                title={title}
                bookId={bookId}
                />
            ))
          }
          </div>
        </section>
      )
    }
}
