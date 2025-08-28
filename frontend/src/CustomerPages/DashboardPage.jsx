import React, { useContext, useState } from 'react'
import { Navbar } from '../CustomerComponents/Navbar/Navbar'
import { ShopsSection } from '../CustomerComponents/ShopsSection/ShopsSection'
import { TopSelling } from '../CustomerComponents/TopSelling/TopSelling'
import { HomeFishesList } from '../CustomerComponents/HomeFishesList/HomeFishesList'
import { HomeBanner } from '../CustomerComponents/HomeBanner/HomeBanner'
import {Footer} from "../CustomerComponents/Footer/Footer"
import {PreBook} from "../CustomerComponents/PreBook/PreBook"
import { ContextAPI } from '../Context/ContextAPI'
import { getFishesByPincode, getFishWithHighRating, getShopBySearch, getShopsByPincode } from '../api/auth'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import {LoadingSpinner} from "../CustomerComponents/LoadingSpinner/LoadingSpinner"
import { SearchSection } from '../CustomerComponents/SearchSection/SearchSection'
export const DashboardPage = () => {
const [searchTerm, setSearchTerm] = useState("");

const lat = localStorage.getItem("lat")
const lng = localStorage.getItem("lng")

 const [showAll, setShowAll] = useState(false);
  const limit = showAll ? 10 : 3;
const [skip, setSkip] = useState(0);
    const shopsQuery = useInfiniteQuery({
   queryKey: ['shops',lat, lng, showAll],
    queryFn: ({ pageParam = 0 }) => getShopsByPincode({ pageParam, limit, lat, lng }),
    getNextPageParam: (lastPage) => lastPage.hasMore ? lastPage.nextPage : undefined,
    enabled: !!lat && !!lng,
})

const searchShopsQuery = useQuery({
  queryKey: ['searchShops', searchTerm, lat, lng],
  queryFn: () => getShopBySearch({ lat, lng, search: searchTerm }),
  enabled: !!searchTerm, 
});


const topSellingQuery = useQuery({
    queryKey: ['topRatedFishes', lat, lng, skip],
    queryFn: () => getFishWithHighRating({ lat, lng, skip }),
    keepPreviousData: true,
  });

  const fishQuery = useQuery({
          queryKey: ['fishListByPincode', lat, lng],
          queryFn: () => getFishesByPincode({ lat, lng }),
          keepPreviousData: true,
        });


const isLoading = shopsQuery.isLoading || topSellingQuery.isLoading || fishQuery.isLoading

  if (isLoading) {
    return <LoadingSpinner/> ;
  }


  return (

  //   <div>
  //     
  //       <ShopsSection
  //       data={shopsQuery.data}
  //       fetchNextPage={shopsQuery.fetchNextPage}
  //       hasNextPage={shopsQuery.hasNextPage}
  //       isFetchingNextPage={shopsQuery.isFetchingNextPage}
  //       refetch={shopsQuery.refetch}
  //       showAll={showAll}
  // setShowAll={setShowAll}
  // isLoading={shopsQuery.isLoading}
  //       />
  //       <TopSelling data={topSellingQuery.data} isLoading={topSellingQuery.isLoading} isError={topSellingQuery.isError}/>
  //       <HomeFishesList data={fishQuery.data} isLoading={fishQuery.isLoading} isError={fishQuery.isError} />
  //       <PreBook/>
  //       <Footer/>
  //   </div>


<>
  <Navbar/>
    <HomeBanner searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

{searchTerm ? (
  <SearchSection
    data={searchShopsQuery.data}
    isLoading={searchShopsQuery.isLoading}
    isError={searchShopsQuery.isError}
    fetchNextPage={() => {}} // no infinite scroll for search
    hasNextPage={false}
    isFetchingNextPage={false}
    refetch={searchShopsQuery.refetch}
    showAll={false}
    setShowAll={() => {}}
  />
) : (
  <>
    <ShopsSection
      data={shopsQuery.data}
      fetchNextPage={shopsQuery.fetchNextPage}
      hasNextPage={shopsQuery.hasNextPage}
      isFetchingNextPage={shopsQuery.isFetchingNextPage}
      refetch={shopsQuery.refetch}
      showAll={showAll}
      setShowAll={setShowAll}
      isLoading={shopsQuery.isLoading}
    />
    <TopSelling
      data={topSellingQuery.data}
      isLoading={topSellingQuery.isLoading}
      isError={topSellingQuery.isError}
    />
    <HomeFishesList
      data={fishQuery.data}
      isLoading={fishQuery.isLoading}
      isError={fishQuery.isError}
    />
    <PreBook/>
       <Footer/>
  </>
)}

</>
  )
}
