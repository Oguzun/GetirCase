import Pagination from "@material-ui/lab/Pagination";
import Hidden from "@material-ui/core/Hidden";
import React,{Fragment} from 'react';


export default function CustomPagination({
  itemsPerPage,
  totalItems,
  paginate,
}) {
  const LastPage = Math.ceil(totalItems / itemsPerPage);

  return (
    <Fragment>
    <Hidden smDown>
      <Pagination
        size="large"
        count={LastPage}
        onChange={paginate}
        showFirstButton
        showLastButton
      />
    </Hidden>
     <Hidden smUp>
     <Pagination
       size="small"
       count={LastPage}
       onChange={paginate}
       showFirstButton
       showLastButton
     />
   </Hidden>
   </Fragment>
  );
}
