import React from 'react'
import { Helmet } from 'react-helmet-async'
import { usePageData } from '@/hooks/usePageData'
import { CollectionArchive } from '@/components/CollectionArchive'

export const SearchPage: React.FC = () => {
  const data = usePageData()

  return (
    <div className="pt-24 pb-24">
      <Helmet><title>Search | Payload Website Template</title></Helmet>
      <div className="container mb-16">
        <h1 className="text-3xl font-bold">Search Results</h1>
        {data?.query && <p className="text-muted-foreground mt-2">Showing results for "{data.query}"</p>}
      </div>
      <div className="container">
        {data?.results?.docs && <CollectionArchive posts={data.results.docs} />}
      </div>
    </div>
  )
}
