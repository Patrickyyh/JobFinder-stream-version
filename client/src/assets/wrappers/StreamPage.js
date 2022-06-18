


import styled from 'styled-components'




const Wrapper = styled.main`

  #videos{
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2em;
    /* display: grid;
    grid-template-columns: 1fr;
    height: 100vh;
    overflow:hidden; */
}


.video-player{
    background-color: black;
    width: 100%;
    height: 300px;

}

/* .video-player{
    background-color: black;
    width: 100%;
    height: 100%;
    object-fit: cover;
} */

`

export default Wrapper
