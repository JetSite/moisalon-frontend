import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  white-space: nowrap;
  width: 1440px;
  margin-top: 100px;
`;

export const Item = styled.span`
  display: flex;
  width: 173px;
  border: 1px solid #000000;
  border-radius: 50px;
  height: 36px;
  align-items: center;
  justify-content: center;
  position: relative;
  cursor: pointer;
  margin-right: 25px;
  flex-shrink: 0;
  transition: 0.3s;
  background: ${(props) => `${props.openTab !== props.active ? '#fff' : '#f03'}`};
  p {
    color: ${(props) => `${props.openTab !== props.active ? '#000' : '#FFF'}`};
  }

  &:last-child {
    margin-right: 0;
  }

  &:hover {
    background: #f03;
    border: 1px solid #f03;

    p {
      color: #fff;
    }
  }
`;

export const Count = styled.div`
  font-size: 12px;
  height: 26px;
  width: 26px;
  background: #f0f0f0;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 7px;
  color: #000;
`;

export const Text = styled.p`
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
`;
export const TabBody = styled.div`
  margin-top: 75px;
  display: ${(props) => `${props.openTab !== props.tabId ? 'none' : 'block'}`};
`;
export const Tab = styled.div`
  display: flex;
  justify-content: space-between;
`;
export const ImageBox = styled.div`
  width: 40%;
  height: 300px;

  & > img {
    width: 100%;
    height: 100%;
  }
`;
export const DescriptionBox = styled.div`
  width: 50%;
  font-size: 14px;
  line-height: 25px;
  color: #000000;
`;