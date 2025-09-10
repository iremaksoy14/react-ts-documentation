import React,{useState} from "react";
// import { useActions } from "../hooks/useactions";
// import { useSelector } from "../hooks/useTypeSelector";
import { useAppSelector ,useAppDispatch} from "../redux-store/hooks";
import { addTodo } from "../redux-store/reducers/todoReducer";
const Repositorieslist: React.FC = () => {
  const [ term, setTerm]=useState("")
  // const {searchRepositories}=useActions()
  const dispatch = useAppDispatch();

  //useselector ,redux mağazamızın içinde ne tür veirler olduğu hakkında bir fikre sahip değil
  // const {data,error,loading}=useSelector((state)=>state.repositories)
  
  const onSubmit=(event:React.FormEvent<HTMLFormElement> )=>{
    event.preventDefault();
    dispatch(addTodo({id:"test",title:term}));
    // searchRepositories(term)
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input  value={term}  onChange={e =>  setTerm(e.target.value)}/>
        <button>Search</button>
      </form> 
      {/* {error && <div>{error}</div>}
     {loading && <div>Loading...</div>}
     {!error && !loading && data.map((item)=><div>{item}</div>)} */}
    </div>
  );
}; 

export default Repositorieslist;
