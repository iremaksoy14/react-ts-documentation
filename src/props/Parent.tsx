import { Child } from "./Child";
const Parent = () => {
  return (
    <Child color="red" onClick={() => console.log("test")}>
      children props
    </Child>
  );
};

export default Parent;
