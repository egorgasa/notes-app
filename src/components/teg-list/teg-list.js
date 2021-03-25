import React,{Fragment} from 'react';
import TegListItem from '../teg-list-item';

const TegList = ({allTegs,deleteTeg}) => {
   const tegs = allTegs.map((item) => {
       const {id,...itemTegs}=item;
       return(
           <div key = {id}>
            <TegListItem
            {...itemTegs}
            deleteTeg={()=>deleteTeg(id)}
            />
           </div>
       )
   })
    return(
        <Fragment>{tegs}</Fragment>
    )
}

export default TegList;