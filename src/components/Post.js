import React,{useState, useEffect, useMemo} from 'react'
import Axios from 'axios'
import { NavLink } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import {debounce} from 'lodash';

const url = "https://jsonplaceholder.typicode.com";

function Post({itemsPerPage}) {
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPost, setFilteredPost] = useState([]);



  useEffect(() => {
    Axios.get(`${url}/posts`)
        .then(res=> {
    //      console.log('posts =', res.data);
            setFilteredPost(res.data);
        }).catch(err => console.log(err.message));
},[]) 
    useEffect(() => {
      const endOffset = itemOffset + itemsPerPage;
     // console.log(`Loading items from ${itemOffset} to ${endOffset}`);
      setCurrentItems(filteredPost.slice(itemOffset, endOffset));
      setPageCount(Math.ceil(filteredPost.length / itemsPerPage));
      //console.log("currentItems=", currentItems)
    }, [itemOffset, itemsPerPage,filteredPost]);

    useEffect(() => {
      return () => {
        debouncedResults.cancel();
      };
    },[]);


    const handlePageClick = (event) => {
      const newOffset = (event.selected * itemsPerPage) % filteredPost.length;
      setItemOffset(newOffset);
    };



    const searchTermHandler = (e)=>{
     setSearchTerm(e.target.value)
    // console.log(searchTerm)
      if(searchTerm){       
        const result = filteredPost.filter((item)=>{
        return Object.values(item).join('').toLowerCase().includes(searchTerm.toLocaleLowerCase())
      })
      setFilteredPost(result)
  //  console.log("filteredPost = ", filteredPost)
      } else {
          setFilteredPost(filteredPost)
      }
        
          } 

      const debouncedResults = useMemo(() => {
        return debounce(searchTermHandler, 300);
      }, []);

   //   console.log(debouncedResults);

  return (
    <div className='container'> 
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h3 className="display-3 text-center text-success">Seach Posts</h3>
        </div>
      </div>
      <div className="row ">
        <div className="col-md-8  offset-md-2 mt-3 mb-3">
            <input className="form-control" type="text" placeholder='Search Here.....' value={searchTerm} onChange={searchTermHandler} />
         
        </div>
      </div>
      <div className="row">
        <div className="col-md-8 offset-md-2 mt-3 mb-3">            
          { currentItems && currentItems.map((item, index) =>{
            return (

              <div className="card" key ={index}>
                  <div className="card-header">
                       <h6 className="text-uppercase"><NavLink className="text-decoration-none" to={`/singlepost/${item.id}` }>{item.id}--{item.title} </NavLink></h6>
                  </div>
                  <div className="card-body">
                       <p >{item.body}</p>
                  </div>
                </div>
            
            )
          })
        }
        </div>
      </div>
      <div className="row ">
        <div className=" mt-3 mb-3 d-flex justify-content-center">            
            <ReactPaginate
              nextLabel="next >"
              onPageChange={handlePageClick}
              pageRangeDisplayed={3}
              pageCount={pageCount}
              previousLabel="< previous"
              renderOnZeroPageCount={null}

              className="pagination"
              pageClassName='page-item'
              nextLinkClassName='page-link'
              pageLinkClassName='page-link'
              previousLinkClassName='page-link'
              activeClassName='active'
              activeLinkClassName='active'
          />
        </div>
      </div>
      
    </div>
  )
}

export default Post