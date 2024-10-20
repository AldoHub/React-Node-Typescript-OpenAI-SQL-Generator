interface CodeDisplayProps {
    text: string
}

const CodeDisplay = ({text}: CodeDisplayProps)  =>{
 
    return (
        <div>
           <div className="code-output">
            <p>{text}</p>
           </div>
        </div>
    )
  }
  
  export default CodeDisplay
  