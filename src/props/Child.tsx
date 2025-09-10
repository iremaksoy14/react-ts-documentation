
interface ChildProps{
  color:string,
  onClick:()=>void,
  children:React.ReactNode
  

}
// export const Child=({color}:ChildProps)=>{
//   return <div>
//     test
//   </div>
// }


export const Child:React.FC<ChildProps>=({color,onClick,children})=>{
  return <div>
    <button onClick={onClick}>click me </button>
    {children}

  </div>
} 