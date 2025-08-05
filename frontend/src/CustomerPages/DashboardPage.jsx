import React, { useContext, useState } from 'react'
import { Navbar } from '../CustomerComponents/Navbar/Navbar'
import { ShopsSection } from '../CustomerComponents/ShopsSection/ShopsSection'
import { TopSelling } from '../CustomerComponents/TopSelling/TopSelling'
import { HomeFishesList } from '../CustomerComponents/HomeFishesList/HomeFishesList'
import { HomeBanner } from '../CustomerComponents/HomeBanner/HomeBanner'
import {Footer} from "../CustomerComponents/Footer/Footer"
import {PreBook} from "../CustomerComponents/PreBook/PreBook"
import { ContextAPI } from '../Context/ContextAPI'
import { getFishesByPincode, getFishWithHighRating, getShopsByPincode } from '../api/auth'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import {LoadingSpinner} from "../CustomerComponents/LoadingSpinner/LoadingSpinner"
export const DashboardPage = () => {
  const {zipCode,setZipCode} = useContext(ContextAPI)
 const [showAll, setShowAll] = useState(false);
  const limit = showAll ? 10 : 3;
const [skip, setSkip] = useState(0);
    const shopsQuery = useInfiniteQuery({
   queryKey: ['shops',zipCode, showAll],
    queryFn: ({ pageParam = 0 }) => getShopsByPincode({ pageParam, limit, zipCode }),
    getNextPageParam: (lastPage) => lastPage.hasMore ? lastPage.nextPage : undefined,
    enabled: !!zipCode,
})

const topSellingQuery = useQuery({
    queryKey: ['topRatedFishes', zipCode, skip],
    queryFn: () => getFishWithHighRating({ zipCode, skip }),
    keepPreviousData: true,
  });

  const fishQuery = useQuery({
          queryKey: ['fishListByPincode', zipCode],
          queryFn: () => getFishesByPincode({ zipCode }),
          keepPreviousData: true,
        });


const isLoading = shopsQuery.isLoading || topSellingQuery.isLoading || fishQuery.isLoading

  if (isLoading) {
    return <LoadingSpinner/> ;
  }


  return (

    <div>
        <Navbar/>
        <HomeBanner/>
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
        <TopSelling data={topSellingQuery.data} isLoading={topSellingQuery.isLoading} isError={topSellingQuery.isError}/>
        <HomeFishesList data={fishQuery.data} isLoading={fishQuery.isLoading} isError={fishQuery.isError} />
        <PreBook/>
        <Footer/>
    </div>
  )
}
