import styled from "styled-components";

export const Container = styled.li`
    display: flex;
    width: 17rem;
    background: #fff;
    border-radius: 4px;
    flex-direction: column;
    margin: .5rem;
    overflow: hidden;
    box-shadow: 0 0 15px 3px #ddd
`

export const Thumbnail = styled.div<{img: string}>`
    position: relative;    
    width: 140%;
    height: 12rem;
    background-image: url("${props => props.img}");
    background-position: center;
    background-repeat: no-repeat;
    background-size: 100% auto;
    border-radius-top-left: 4px;
    border-radius-top-right: 4px;
`

export const PhotoCount = styled.div`
    position: absolute;
    top: 1rem;
    left: 1rem;
    font-size: .7rem;
    padding: 0.4rem 1rem;
    border-radius: 2rem;
    color: #fff;
    background: rgba(0, 0, 0, 0.4);
`

export const Description = styled.div`
    display: flex;
    justify-content: center;
    padding: 1rem 0 1.2rem 0;
`

export const Add = styled.div<{h?: string}>`
    display: flex;
    width: 100%;
    height: ${props => props.h ? props.h : '100%' };
    justify-content: center;
    align-items: center;
    flex-direction: column;
    cursor: pointer
`