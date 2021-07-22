import Pagination from "@material-ui/lab/Pagination";

export default function CustomPagination({ itemsPerPage, totalItems, paginate }) {

  const LastPage = Math.ceil(totalItems /itemsPerPage );

 
  return <Pagination size='large' count={LastPage} onChange={paginate} showFirstButton showLastButton  />;
}
