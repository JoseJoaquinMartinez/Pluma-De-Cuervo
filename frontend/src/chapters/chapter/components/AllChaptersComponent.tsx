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
    //TODO COMPROBAR LA LLAMADA QUE RECIBE PARA COMPARAR EL ID DEL LIBRO
    /* if(!chapters){
      dispatch(fetchAllChaptersFromABook(bookId));
    }  */
   dispatch(fetchAllChaptersFromABook(bookId))
  },[]);
  
  if (loading) {
    return <BookLoaderComponent />;
  }
  if (error) {
    return <p>{error}</p>;
  }
  

    if(chapters){
      return (
        <section>
          <h2>Capítulos</h2>
          {chapters && chapters.length === 0 && <p>No hay capítulos que mostrar</p>}
          {
            chapters.map(({id, title, createdAt, estimatedReadTime, imagen})=>(
              <ChapterCard 
                key={id} 
                id={id} 
                imagen={imagen} 
                createdAt={createdAt}
                estimatedReadTime={estimatedReadTime}
                title={title}
                />
            ))
          }
        </section>
      )
    }
}
