import SideNav, {
    Toggle,
    NavItem, 
    NavIcon, 
    NavText,
} from '@trendmicro/react-sidenav'

import '@trendmicro/react-sidenav/dist/react-sidenav.css'
import { useNavigate } from 'react-router-dom';
function MySideNav(){
    const navigate = useNavigate();
    
    return <SideNav
        onSelect={selected=> {
            console.log(selected);
            navigate('/'+selected)
        }}
        clasName='mysidenav'
        >
            <SideNav.Toggle />
            <SideNav.Nav defaultSelected = "home">
                <NavItem eventKey="home">
                    <NavIcon>
                        <i className="fa fa-fw fa-home" style={{fontSize: "1.5em"}} />
                    </NavIcon>
                    <NavText>Home</NavText>
                </NavItem>  
                <NavItem eventKey="viewsboms">
                    <NavIcon>
                        <i className="fa fa-fw fa-eye" style={{fontSize: "1.5em"}} />
                    </NavIcon>
                    <NavText>View SBOMs</NavText>
                </NavItem>
                <NavItem eventKey="generatesboms">
                    <NavIcon>
                    <i className="fa fa-fw fa-screwdriver-wrench" style={{fontSize: "1.5em"}} />
                    </NavIcon>
                    <NavText>Generate SBOMs</NavText>
                </NavItem>
                <NavItem eventKey="Profile">
                    <NavIcon>
                        <i className="fa fa-fw fa-user" style={{fontSize: "1.5em" }}></i>
                    </NavIcon>
                    <NavText>Profile</NavText>
                </NavItem>
                <NavItem eventKey="Logout">
                    <NavIcon>
                        <i className="fa fa-fw fa-right-from-bracket" style={{fontSize: "1.5em"}}></i>
                    </NavIcon>
                    <NavText>Logout</NavText>
                </NavItem>
            </SideNav.Nav>
        </SideNav>
}
export default MySideNav;