import * as React from "react";
import { NavLink } from "react-router-dom";
import styled  from 'styled-components'

const Nav = styled.nav`
width: 100%;
float: left;
background: 
`;

const List = styled.ul`
list-style: none;
margin: 0;
padding: 0;
`;

const LinkStyled = styled(NavLink)`
    color: palevioletred;
    font-size: 14px;
    line-height: 2rem;
    margin-left: 1rem;
    padding: 0.0rem 0rem;
    border: none;
    border-radius: 3px;
    float: left;
    text-decoration: none;
    &:hover{
        color: red;
    }
    &.active {
        color: red;
        font-weight: 700;
    }
`;

export default class Navbar extends React.Component {

    public render(){
        return <Nav>
            <List>
                {
                    this.getRoutes().map((definition, index) => {
                        return <li key={index}>
                            <LinkStyled exact={true}
                                        activeClassName={'active'}
                                        to={definition.path}

                            >{definition.title}</LinkStyled>
                        </li>
                    })
                }
            </List>
        </Nav>
    }

    private getRoutes(){
        return [
            {
                path: '/',
                title: 'Stickers'
            },
            {
                path: '/pendulum',
                title: 'Pendulum'
            },
            {
                path: '/about',
                title: 'About'
            }
        ]
    }
}