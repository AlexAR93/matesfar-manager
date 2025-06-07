
export const Loading = ({text}) => {
    
  return (
    text?(
        <div className="d-flex vh-100 justify-content-center align-items-center">
                <p className='mx-3'>{text}</p>
            <div className="spinner-border text-info" role="status">
                <p><span className="sr-only text-center"></span></p>
            </div>
        </div>
    ):(
        <div className="d-flex justify-content-center mt-3">
            <div className="spinner-border text-info" role="status">
                <p><span className="sr-only text-center"></span></p>
            </div>
        </div>
    )
  )
}
