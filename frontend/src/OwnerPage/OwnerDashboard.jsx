
import { LoadingSpinner } from '../CustomerComponents/LoadingSpinner/LoadingSpinner'
import { OwnerFishList } from '../OwnerComponent/OwnerFishList/OwnerFishList'
import { OwnerNavbar } from '../OwnerComponent/OwnerNavbar/OwnerNavbar'
import {getFish} from "../api/owner"
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
export const OwnerDashboard = () => {
const ownerToken = localStorage.getItem("ownerToken")
  const getOwnerFish = useQuery({
      queryKey: ['getFish'],
      queryFn: () => getFish({ownerToken}),
      keepPreviousData: true,
    });
 if (getOwnerFish.isLoading) {
    return <LoadingSpinner/> ;
  }

  return (
    <div>
       <OwnerNavbar/>

        <OwnerFishList  data={getOwnerFish.data} isLoading={getOwnerFish.isLoading} isError={getOwnerFish.isError}/>

    </div>
  )
}
