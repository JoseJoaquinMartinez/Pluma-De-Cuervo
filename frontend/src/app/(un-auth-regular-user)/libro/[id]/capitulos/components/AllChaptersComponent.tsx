"use client"
import { AppDispatch } from '@/store/store'
import { RootState } from '@reduxjs/toolkit/query'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

export const AllChaptersComponent = ({bookId} : {bookId: number}) => {
    const dispatch = useDispatch<AppDispatch>();
    const {
        data: chapters,
        loading,
        error,
    } = useSelector((state: RootState) => )
  return (
    <div>AllChaptersComponent</div>
  )
}
