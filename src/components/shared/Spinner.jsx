import { ClipLoader } from 'react-spinners'

const Spinner = ({ login=false }) => {
  return (
    <ClipLoader color={login ? "currentColor" : "#C97817"} size={login ? 23 : 125} />
  )
}

export default Spinner