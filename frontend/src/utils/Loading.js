import { css } from '@emotion/react';
import RiseLoader from 'react-spinners/CircleLoader';

const override = css`

display: block;
margin: 0 auto;
border-color: purple;
`

const Loading = () => {
  return (
    < div className='flex items-center justify-center'>
    <RiseLoader  color='purple' loading={true} css={override}/>
    </div>
    
  )
}
export default Loading