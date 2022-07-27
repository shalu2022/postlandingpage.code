import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import Axios  from 'axios';

const url = "https://jsonplaceholder.typicode.com";

function SinglePost(props) {
    const params = useParams();
    console.log('id =',params.id);
    const [post,setPost] = useState({
        id:"",
        title: "",
        body: "",
        userId: ""
    });
    const [pic,setPic]=useState({
        albumId:"",
        title: "",
        url:"",
        thumbnailUrl:""
    })

    useEffect(() => {
        Axios.get(`${url}/posts/${params.id}`)
            .then(res=> {
                console.log('single item =', res.data);
                setPost(res.data);
            }).catch(err => console.log(err.message));
            
            Axios.get(`${url}/photos/${params.id}`)
            .then(res=> {
                console.log('single item =', res.data);
                setPic(res.data);
            }).catch(err => console.log(err.message));
    },[])
   
    

  return (
    <div className='row' >
        <div className="col-md-6 offset-md-3 mt-3 mb-3 text-center">
            <div className="card">
                <img  className="card-img-top" src={pic.thumbnailUrl} alt="" />
                </div>
                <div class="card-body">
                    <h2 class="text-uppercase">{post.title}</h2>
                </div>
        </div>

    </div>
  )
}

export default SinglePost
