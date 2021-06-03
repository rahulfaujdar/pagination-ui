# pagination-ui

### installation

`npm i pagination-ui --save`

### Example 

      import {Pagination} from "pagination-ui";
      
      <Pagination total={100} />
      
#### Options
      
      const [page, setPage] = useState(1);
      const [limit, setLimit] = useState(10);
      const [total, setTotal] = useState(100);

      <Pagination limit={limit} limitRange total={1000} page={page} onPageChange={setPage} onLimitChange={setLimit}/>

if you show limit, write limitRange
default
 
      <Pagination limitRange />
      
by default limitRange = 10, 20, 30
      
custom

      <Pagination limitRange={[20, 40, 60]} />

if you want show only pages, write pagesOnly

      <Pagination pagesOnly />
