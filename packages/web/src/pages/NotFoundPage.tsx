import React from 'react'
import { Helmet } from 'react-helmet-async'

export const NotFoundPage: React.FC = () => (
  <div className="container py-28">
    <Helmet><title>404 - Not Found</title></Helmet>
    <h1 className="text-3xl font-bold">404</h1>
    <p className="mt-4">This page could not be found.</p>
  </div>
)
