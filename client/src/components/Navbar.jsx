import React  from 'react';
//import './style.css';
import { Badge } from '@mui/material';
//import Navbar from '../components/Navbar'
import styled from 'styled-components';
import { Search, ShoppingCartOutlined } from '@mui/icons-material';
import {mobile} from '../responsive'

const Container = styled.div`
  height: 60px;
  ${mobile({height:"50px"})}
`; 

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items:center;
  ${mobile({padding:"10px 0px"})}
`;

const Left= styled.div`{
  flex:1;
  display:flex;
  align-items:center;
}`;

const Logo = styled.h1`
  font-weight:bold;
  ${mobile({fontSize:"24px"})}
`;

const Input =styled.input`
  border:none;
  ${mobile({width:"50px"})}
`;

const Language = styled.span`
    font-size : 14px;
    cursor :pointer;
    ${mobile({display:"none"})}
`;

const Right= styled.div`{
  flex:2;
  display:flex;
  align-items:center;
  justify-content:flex-end;
  ${mobile({justifyContent:"Center",flex:2})}
}`;

const Center= styled.div`{
  flex:1;
  text-align:center;
}`;

const SearchContainer =styled.div`{
  border:0.5px solid lightgray; 
  display:flex;
  align-items:center;
  margin-left:10px;
  padding: 5px;
  cursor:pointer;
}`;

const MenuItem =styled.div`
  font-size:14px;
  cursor:pointer;
  margin-left:25px;
  ${mobile({fontSize:"12px",marginLeft:"10px"})}
`;

const Navbar = () => {
  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>EN</Language>
          <SearchContainer>
            <Input placeholder='Search'/> 
            <Search style={{color:"gray",fontSize:16}}/>
          </SearchContainer>
          </Left>
        <Center>
          <Logo>NIKHIL.</Logo>
        </Center>
        <Right>
          <MenuItem>REGISTER</MenuItem>
          <MenuItem>SIGN IN</MenuItem>
          <MenuItem> 
            <Badge badgeContent={4} color="primary">
              <ShoppingCartOutlined />
            </Badge>
          </MenuItem>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
